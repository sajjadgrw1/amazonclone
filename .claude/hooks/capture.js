#!/usr/bin/env node
'use strict';
/*
 * Capture hook for the 8x assignment.
 * Invoked by Claude Code on UserPromptSubmit and Stop events.
 * Appends a PROMPT or RESPONSE entry to a per-session log file under .agent-logs/,
 * in the exact format specified by the assignment brief.
 *
 * Usage: node capture.js <prompt|stop>
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const LOG_DIR = path.join(ROOT, '.agent-logs');
const STATE_DIR = path.join(LOG_DIR, '.state');
const INDEX_PATH = path.join(STATE_DIR, 'session-index.json');
// Debug dump of raw hook payloads lives outside the repo entirely (troubleshooting only).
const DEBUG_PATH = path.join(os.tmpdir(), 'claude-capture-debug.log');

const eventKind = process.argv[2]; // 'prompt' or 'stop'

function readStdinSync() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (e) {
    return '';
  }
}

function pad(n) {
  return String(n).padStart(2, '0');
}
function fileTs(d) {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}_${pad(
    d.getUTCHours()
  )}-${pad(d.getUTCMinutes())}-${pad(d.getUTCSeconds())}`;
}
function isoNow() {
  return new Date().toISOString();
}

function ensureDirs() {
  fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.mkdirSync(STATE_DIR, { recursive: true });
}

function loadIndex() {
  try {
    return JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  } catch (e) {
    return {};
  }
}
function saveIndex(idx) {
  fs.writeFileSync(INDEX_PATH, JSON.stringify(idx, null, 2));
}

function debugDump(kind, payload) {
  try {
    fs.appendFileSync(
      DEBUG_PATH,
      `\n----- ${isoNow()} ${kind} -----\n${JSON.stringify(payload, null, 2)}\n`
    );
  } catch (e) {
    // best-effort only
  }
}

function detectAuthor() {
  try {
    const name = execSync('git config user.name', { cwd: ROOT }).toString().trim();
    if (name) return name;
  } catch (e) {
    // ignore
  }
  return process.env.USERNAME || process.env.USER || 'unknown';
}

function extractPromptText(payload) {
  return (
    payload.prompt_text ??
    payload.prompt ??
    payload.user_prompt ??
    payload.text ??
    payload.input ??
    ''
  );
}

function extractResponseText(payload) {
  return (
    payload.last_assistant_message ??
    payload.response ??
    payload.message ??
    payload.final_message ??
    ''
  );
}

function modelFromTranscript(transcriptPath) {
  if (!transcriptPath) return null;
  try {
    const content = fs.readFileSync(transcriptPath, 'utf8');
    const lines = content.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (!line) continue;
      let entry;
      try {
        entry = JSON.parse(line);
      } catch (e) {
        continue;
      }
      if (entry.type === 'assistant' && entry.message && entry.message.model) {
        return entry.message.model;
      }
    }
  } catch (e) {
    // transcript not readable yet - fall through
  }
  return null;
}

function extractModel(payload) {
  return (
    modelFromTranscript(payload.transcript_path) ||
    payload.model ||
    payload.model_name ||
    process.env.CLAUDE_MODEL ||
    'unknown'
  );
}

function buildHeader(meta) {
  return [
    '---',
    `session_id: ${meta.session_id}`,
    `date: ${meta.date}`,
    `author: ${meta.author}`,
    `model: ${meta.model}`,
    'tool: claude-code',
    `project: ${meta.project}`,
    `total_exchanges: ${meta.count}`,
    `first_prompt_time: ${meta.first_prompt_time}`,
    `last_prompt_time: ${meta.last_prompt_time}`,
    '---',
    '',
    `# Session Log - ${meta.date}`,
    '',
    `Session: \`${meta.session_id}\` | Project: \`${meta.project}\` | Author: \`${meta.author}\``,
    '',
    '---',
    ''
  ].join('\n');
}

function splitBody(content) {
  const entryIdx = content.indexOf('[LOG_ENTRY');
  if (entryIdx === -1) return '';
  const lineStart = content.lastIndexOf('\n', entryIdx) + 1;
  return content.slice(lineStart).replace(/\s+$/, '');
}

function main() {
  ensureDirs();
  const raw = readStdinSync();
  let payload = {};
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    payload = {};
  }

  debugDump(eventKind, payload);

  const sessionId = payload.session_id || 'unknown-session';
  const idx = loadIndex();

  const now = new Date();
  const nowIso = isoNow();

  let sess = idx[sessionId];
  if (!sess) {
    sess = {
      session_id: sessionId,
      date: nowIso.slice(0, 10),
      author: detectAuthor(),
      model: extractModel(payload),
      project: path.basename(ROOT),
      count: 0,
      first_prompt_time: nowIso,
      last_prompt_time: nowIso,
      filePath: path.join(LOG_DIR, `${fileTs(now)}_${sessionId}.md`)
    };
    idx[sessionId] = sess;
  }

  const modelNow = extractModel(payload);
  if (modelNow && modelNow !== 'unknown') sess.model = modelNow;

  let entryBlock;
  if (eventKind === 'prompt') {
    sess.count += 1;
    sess.last_prompt_time = nowIso;
    const text = extractPromptText(payload);
    entryBlock = `[LOG_ENTRY type=PROMPT num=${sess.count} session=${sessionId}]\ntimestamp: ${nowIso}\nmodel: ${sess.model}\n\n${text}\n`;
  } else {
    sess.last_prompt_time = nowIso;
    const text = extractResponseText(payload);
    entryBlock = `[LOG_ENTRY type=RESPONSE num=${sess.count} session=${sessionId}]\ntimestamp: ${nowIso}\nmodel: ${sess.model}\n\n${text}\n`;
  }

  let existingBody = '';
  if (fs.existsSync(sess.filePath)) {
    const content = fs.readFileSync(sess.filePath, 'utf8');
    existingBody = splitBody(content);
  }

  const header = buildHeader(sess);
  const newBody = existingBody ? `${existingBody}\n\n${entryBlock}` : entryBlock;
  fs.writeFileSync(sess.filePath, header + newBody);

  saveIndex(idx);
}

main();

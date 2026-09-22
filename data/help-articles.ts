export interface HelpArticle {
  id: string;
  topic: string;
  title: string;
  body: string;
}

export const helpArticles: HelpArticle[] = [
  { id: "help-1", topic: "Orders", title: "Track your order", body: "Go to Your Orders and select Track order (mock) on any order card." },
  { id: "help-2", topic: "Orders", title: "Cancel an order", body: "Orders that are pending or processing can be cancelled from Your Orders." },
  { id: "help-3", topic: "Returns & Refunds", title: "Start a return", body: "Delivered orders show a Return items action on the order card." },
  { id: "help-4", topic: "Returns & Refunds", title: "Refund timing", body: "In this prototype, refunds are mock actions and are not actually processed." },
  { id: "help-5", topic: "Delivery", title: "Delivery estimates", body: "Estimated delivery windows are shown on each product page and at checkout." },
  { id: "help-6", topic: "Delivery", title: "Change delivery address", body: "Add or select a different address during checkout, or manage addresses from Your Account." },
  { id: "help-7", topic: "Account & Payment", title: "Update your profile", body: "Visit Your Account to update your mock profile details." },
  { id: "help-8", topic: "Account & Payment", title: "Payment methods", body: "Payment methods in this prototype are mock placeholders — no real cards are stored." },
];

export function searchHelpArticles(query: string): HelpArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return helpArticles;
  return helpArticles.filter(
    (a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q) || a.topic.toLowerCase().includes(q)
  );
}

export function getArticlesByTopic(topic: string): HelpArticle[] {
  return helpArticles.filter((a) => a.topic === topic);
}

# Search Results Specification

## Visual structure
1. Shared header
2. Breadcrumb and query heading
3. result count
4. filter/sort toolbar
5. desktop sidebar or mobile drawer
6. product grid/list
7. pagination or load more
8. footer

## Functional behavior
- read q, category, sort, minPrice, maxPrice, rating, and page from URL
- search input updates q
- filters can be combined
- clear all resets filters
- sorting updates result order
- product cards link to /product/[id]
- no-results state offers alternative search or category links

## Implementation
- keep filter state synchronized with URLSearchParams
- use a typed filter object
- create reusable ProductGrid and FilterControls
- show skeletons while mock data is loading
- mobile Apply button commits pending filters

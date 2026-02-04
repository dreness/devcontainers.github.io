# Search Functionality Setup

This fork has been configured with optional search functionality using [Lunr.js](https://lunrjs.com/), a lightweight full-text search library for JavaScript.

## Features Added

1. **Search Index Generation** (`search.json`)
   - Jekyll template that generates a JSON search index from all site content
   - Includes pages, posts, documentation, and implementor content
   - Automatically regenerated when the site is built

2. **Search UI** (in navigation bar)
   - Search input box in the top navigation
   - Dropdown results display
   - Responsive design for mobile and desktop

3. **Search Functionality** (`js/search.js`)
   - Lazy-loading of search index (only loads when search box is focused)
   - Real-time search with debouncing (300ms delay)
   - Results show title, category, and content preview
   - Boosts title and category in search relevance

4. **Styling** (in `css/main.scss`)
   - Clean, modern search interface
   - Dropdown results with hover effects
   - Responsive layout for mobile devices

## How to Enable GitHub Pages for This Fork

To enable GitHub Pages on your fork of devcontainers.github.io:

1. Go to your repository on GitHub: https://github.com/dreness/devcontainers.github.io
2. Click on **Settings** (in the repository menu)
3. Scroll down to the **Pages** section in the left sidebar
4. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**

The site will be published to: `https://dreness.github.io/devcontainers.github.io/`

## Testing Locally

To test the search functionality locally:

```bash
# Install dependencies
bundle install

# Build and serve the site
bundle exec jekyll serve

# Visit http://localhost:4000 in your browser
```

Once the site loads, you should see a search box in the top navigation bar. Type a query to see the search in action.

## How the Search Works

1. When a user focuses on the search input, the search index is loaded from `search.json`
2. As the user types, Lunr.js searches the index and returns matching results
3. Results are displayed in a dropdown below the search input
4. Clicking a result navigates to that page

## Customization

### Adjusting Search Boost Values

In `js/search.js`, you can adjust the boost values to change search relevance:

```javascript
this.field('title', { boost: 10 });     // Titles are very important
this.field('category', { boost: 5 });   // Categories are somewhat important
this.field('content');                   // Content has default weight
```

### Excluding Content from Search

In `search.json`, you can add more exclusions to the `unless` conditions:

```liquid
{% unless page.url contains '/static/' or page.url contains '/css/' or page.url contains '/js/' %}
```

### Styling

Search styles are in `css/main.scss` under the "Search functionality styles" comment.

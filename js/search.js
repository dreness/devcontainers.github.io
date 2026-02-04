// Site search using lunr.js
(function() {
  var searchIndex;
  var searchData;
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchContainer = document.getElementById('search-container');

  if (!searchInput) return; // Exit if search input doesn't exist

  // Load search data and build index
  function loadSearch() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', baseurl + '/search.json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        searchData = JSON.parse(xhr.responseText);
        searchIndex = lunr(function() {
          this.ref('url');
          this.field('title', { boost: 10 });
          this.field('category', { boost: 5 });
          this.field('content');

          searchData.forEach(function(doc) {
            this.add(doc);
          }, this);
        });
      }
    };
    xhr.send();
  }

  // Perform search
  function performSearch(query) {
    if (!searchIndex || !query) {
      if (searchResults) {
        searchResults.innerHTML = '';
      }
      return;
    }

    var results = searchIndex.search(query);
    displayResults(results);
  }

  // Display search results
  function displayResults(results) {
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
      return;
    }

    var html = '<div class="search-results-list">';
    results.slice(0, 10).forEach(function(result) {
      var item = searchData.find(function(d) { return d.url === result.ref; });
      if (item) {
        var snippet = item.content.substring(0, 150) + '...';
        html += '<div class="search-result-item">';
        html += '<h4><a href="' + item.url + '">' + item.title + '</a></h4>';
        if (item.category) {
          html += '<span class="search-result-category">' + item.category + '</span>';
        }
        html += '<p>' + snippet + '</p>';
        html += '</div>';
      }
    });
    html += '</div>';
    searchResults.innerHTML = html;
  }

  // Handle search input
  if (searchInput) {
    // Load search index when user focuses on search input
    var searchLoaded = false;
    searchInput.addEventListener('focus', function() {
      if (!searchLoaded) {
        loadSearch();
        searchLoaded = true;
      }
    });

    // Debounce search input
    var searchTimeout;
    searchInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function() {
        performSearch(e.target.value);
      }, 300);
    });

    // Show/hide search results
    searchInput.addEventListener('focus', function() {
      if (searchContainer) {
        searchContainer.classList.add('search-active');
      }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      if (searchContainer && !searchContainer.contains(e.target)) {
        searchContainer.classList.remove('search-active');
      }
    });
  }
})();

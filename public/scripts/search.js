(function () {
  const input = document.getElementById('recipe-search');
  const allGrid = document.getElementById('all-grid');
  const featuredGrid = document.getElementById('featured-grid');
  const allEmpty = document.getElementById('all-empty');
  const featuredEmpty = document.getElementById('featured-empty');
  const pager = document.getElementById('recipe-pager');

  if (!input || !allGrid) return;

  const cards = Array.from(allGrid.querySelectorAll('.recipe-card'));
  const itemsPerPage = 6;
  let currentPage = 1;
  let currentMatches = cards.slice();

  function debounce(fn, wait = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  function renderPage(page = 1) {
    const total = currentMatches.length;
    const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
    currentPage = Math.min(Math.max(1, page), totalPages);

    // hide all cards first
    cards.forEach(c => (c.style.display = 'none'));

    // show slice for current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    currentMatches.slice(start, end).forEach(c => (c.style.display = ''));

    // update empty message
    if (allEmpty) allEmpty.style.display = total === 0 ? 'block' : 'none';

    // update pager UI
    if (pager) {
      pager.innerHTML = '';
      if (totalPages > 1) {
        const prev = document.createElement('button');
        prev.textContent = '← Prev';
        prev.disabled = currentPage === 1;
        prev.onclick = () => renderPage(currentPage - 1);
        pager.appendChild(prev);

        const pageInfo = document.createElement('span');
        pageInfo.style.padding = '0 12px';
        pageInfo.textContent = `${currentPage} / ${totalPages}`;
        pager.appendChild(pageInfo);

        const next = document.createElement('button');
        next.textContent = 'Next →';
        next.disabled = currentPage === totalPages;
        next.onclick = () => renderPage(currentPage + 1);
        pager.appendChild(next);
      }
    }
  }

  function updateFeaturedVisibility(q) {
    // Keep featured grid visible but optionally hide featured cards that don't match query
    if (!featuredGrid) return;
    const fcards = Array.from(featuredGrid.querySelectorAll('.recipe-card'));
    const matches = fcards.filter(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      return q === '' || title.includes(q) || tags.includes(q);
    });
    // show matching featured cards, hide others
    fcards.forEach(c => (c.style.display = matches.includes(c) ? '' : 'none'));
    if (featuredEmpty) featuredEmpty.style.display = matches.length === 0 ? 'block' : 'none';
  }

  function doSearch() {
    const q = input.value.trim().toLowerCase();

    // filter all-grid cards
    currentMatches = cards.filter(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      return q === '' || title.includes(q) || tags.includes(q);
    });

    // reset to page 1
    renderPage(1);

    // also update featured grid visibility
    updateFeaturedVisibility(q);
  }

  const debounced = debounce(doSearch, 150);
  input.addEventListener('input', debounced);

  // initial render
  renderPage(1);
})();

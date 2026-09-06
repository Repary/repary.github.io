(function () {
  'use strict';

  var theme = localStorage.getItem('repary-theme') || 'dark';
  var lang = document.documentElement.lang || 'en';

  // --- SVG icons (24x24 line icons) ---
  var icons = {
    plumbing:    '<path d="M12 3v6m0 0a3 3 0 0 1 3 3v3a3 3 0 0 1-6 0v-3a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    electrical:  '<path d="M13 2L4.09 12.63a1 1 0 0 0 .77 1.62H11l-1 7.75L19.91 11.37a1 1 0 0 0-.77-1.62H13l1-7.75Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    painting:    '<path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM12 11v5m0 0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1h10v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    masonry:     '<path d="M3 6h18M3 12h18M3 18h18M9 3v6M15 9v6M9 15v6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    carpentry:   '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94L6.73 20.2a2 2 0 0 1-2.83 0l-.1-.1a2 2 0 0 1 0-2.83l6.83-6.83A6 6 0 0 1 18.57 2.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    hvac:        '<path d="M12 2a5 5 0 0 0-5 5c0 2 1.5 3.5 3 5s3 3 3 5a5 5 0 0 0 5-5c0-2-1.5-3.5-3-5s-3-3-3-5Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    locksmith:   '<path d="M12 10V6a4 4 0 0 1 8 0v4M5 10h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Zm7 5v2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    windows:     '<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="1.5"/>',
    bathroom:    '<path d="M4 12h16a1 1 0 0 1 1 1v1a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-1a1 1 0 0 1 1-1ZM6 12V5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    kitchen:     '<path d="M3 7h18M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    renovation:  '<path d="M2 20h20M4 20V8l8-5 8 5v12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="9" y="13" width="6" height="7" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    cleaning:    '<path d="M12 2v6m0 0l-5 14h10L12 8Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    gardening:   '<path d="M12 22V12m0 0c-3-3-7-3-9-1m9 1c3-3 7-3 9-1M12 12c0-4-2-8-6-10m6 10c0-4 2-8 6-10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    pest:        '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    antenna:     '<path d="M12 18v-6m0 0l-6-6m6 6l6-6M8 22h8" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 8a10 10 0 0 1 14 0" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M8 5a14 14 0 0 1 8 0" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    appliances:  '<rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="13" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 6h2m4 0h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    roofing:     '<path d="M3 12l9-8 9 8M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    tiling:      '<rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    smarthome:   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="17" cy="17" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M17 15v2l1.5 1" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    moving:      '<path d="M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    furniture:   '<rect x="4" y="4" width="16" height="12" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 16v4m8-4v4M6 20h12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    heating:     '<path d="M12 22a7 7 0 0 0 7-7c0-3-2-5-4-7l-3 3-3-3c-2 2-4 4-4 7a7 7 0 0 0 7 7Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    handyman:    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94L6.73 20.2a2 2 0 0 1-2.83 0l-.1-.1a2 2 0 0 1 0-2.83l6.83-6.83A6 6 0 0 1 18.57 2.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    waterproof:  '<path d="M12 2l5 9a5 5 0 0 1-10 0l5-9Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 19h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 22h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  };

  var categories = [
    { key: 'plumbing',    en: 'Plumbing',            it: 'Idraulica' },
    { key: 'electrical',  en: 'Electrical',           it: 'Elettricista' },
    { key: 'painting',    en: 'Painting',             it: 'Imbiancatura' },
    { key: 'masonry',     en: 'Masonry',              it: 'Muratura' },
    { key: 'carpentry',   en: 'Carpentry',            it: 'Falegnameria' },
    { key: 'hvac',        en: 'HVAC',                 it: 'Climatizzazione' },
    { key: 'locksmith',   en: 'Locksmith',            it: 'Fabbro' },
    { key: 'windows',     en: 'Windows & Doors',      it: 'Serramenti' },
    { key: 'bathroom',    en: 'Bathroom',             it: 'Bagno' },
    { key: 'kitchen',     en: 'Kitchen',              it: 'Cucina' },
    { key: 'renovation',  en: 'Renovation',           it: 'Ristrutturazione' },
    { key: 'cleaning',    en: 'Cleaning',             it: 'Pulizie' },
    { key: 'gardening',   en: 'Gardening',            it: 'Giardinaggio' },
    { key: 'pest',        en: 'Pest Control',         it: 'Disinfestazione' },
    { key: 'antenna',     en: 'Antenna & Satellite',  it: 'Antenne' },
    { key: 'appliances',  en: 'Appliances',           it: 'Elettrodomestici' },
    { key: 'roofing',     en: 'Roofing',              it: 'Tetti' },
    { key: 'tiling',      en: 'Tiling & Floors',      it: 'Pavimenti' },
    { key: 'smarthome',   en: 'Smart Home',           it: 'Domotica' },
    { key: 'moving',      en: 'Moving',               it: 'Traslochi' },
    { key: 'furniture',   en: 'Furniture Assembly',    it: 'Montaggio Mobili' },
    { key: 'heating',     en: 'Heating & Boilers',    it: 'Caldaie' },
    { key: 'handyman',    en: 'Handyman',             it: 'Tuttofare' },
    { key: 'waterproof',  en: 'Waterproofing',        it: 'Impermeabilizzazione' },
  ];

  function svg(key) {
    return '<svg class="cat__icon" viewBox="0 0 24 24" width="18" height="18">' + icons[key] + '</svg>';
  }

  function renderCategories() {
    var grid = document.getElementById('cats');
    if (!grid) return;
    grid.innerHTML = categories.map(function (c) {
      return '<div class="cat">' + svg(c.key) + '<span>' + c[lang] + '</span></div>';
    }).join('');
  }

  function applyTheme(t) {
    theme = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('repary-theme', t);
  }

  function init() {
    applyTheme(theme);
    renderCategories();
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', function () {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();

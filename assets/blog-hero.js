/*
  Blastwave blog hero component.
  Renders a 3D-card style SVG icon for blog post headers and index thumbnails.
  Usage: <div class="blog-hero" data-blog-hero="phone-blocked"></div>
  All colors reference the site's live CSS custom properties, so icons
  automatically match light/dark theme.
*/
(function () {
  var TEXT = 'var(--color-text)';
  var INV_SURFACE = 'var(--color-inverse-surface)';
  var INV_TEXT = 'var(--color-inverse-text)';
  var OK = 'var(--color-ok)';
  var WARN = 'var(--color-warn)';
  var BAD = 'var(--color-bad)';

  function stroke(d, w) {
    return '<path d="' + d + '" fill="none" stroke="' + TEXT + '" stroke-width="' + (w || 4.5) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function strokeColor(d, color, w) {
    return '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + (w || 4.5) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function fillColor(d, color) {
    return '<path d="' + d + '" fill="' + color + '"/>';
  }
  function rect(x, y, w, h, r) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r || 8) + '" fill="none" stroke="' + TEXT + '" stroke-width="4.5" stroke-linejoin="round"/>';
  }
  function circle(cx, cy, r, filled) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (filled ? TEXT : 'none') + '" stroke="' + TEXT + '" stroke-width="4.5"/>';
  }

  // ── Badge accents (small corner marker) ──────────────────────────
  var BADGES = {
    blocked: function () { return '<circle cx="146" cy="60" r="17" fill="' + BAD + '"/><circle cx="146" cy="60" r="10" fill="none" stroke="' + INV_TEXT + '" stroke-width="3.4"/>' + strokeColor('M139,53 L153,67', INV_TEXT, 3.4); },
    check: function () { return '<circle cx="146" cy="60" r="17" fill="' + OK + '"/>' + strokeColor('M138,60 L144,66 L156,52', INV_TEXT, 4); },
    warning: function () { return '<circle cx="146" cy="60" r="17" fill="' + WARN + '"/>' + strokeColor('M146,52 L146,63', INV_TEXT, 4) + '<circle cx="146" cy="69" r="2.4" fill="' + INV_TEXT + '"/>'; },
    x: function () { return '<circle cx="146" cy="60" r="17" fill="' + BAD + '"/>' + strokeColor('M139,53 L153,67 M153,53 L139,67', INV_TEXT, 4); },
    plus: function () { return '<circle cx="146" cy="60" r="17" fill="' + OK + '"/>' + strokeColor('M146,52 L146,68 M138,60 L154,60', INV_TEXT, 4); },
    coin: function () { return '<circle cx="146" cy="60" r="17" fill="' + WARN + '"/><circle cx="146" cy="60" r="8" fill="none" stroke="' + INV_TEXT + '" stroke-width="3"/>'; },
    spark: function () { return '<circle cx="146" cy="60" r="17" fill="' + OK + '"/>' + fillColor('M146,49 L149,57 L157,60 L149,63 L146,71 L143,63 L135,60 L143,57 Z', INV_TEXT); },
    tag: function () { return '<circle cx="146" cy="60" r="17" fill="' + INV_SURFACE + '"/>' + strokeColor('M139,66 L153,52', INV_TEXT, 4) + '<circle cx="151" cy="55" r="2.2" fill="' + INV_TEXT + '"/>'; },
    magnifier: function () { return '<circle cx="146" cy="60" r="17" fill="' + INV_SURFACE + '"/><circle cx="143" cy="57" r="5.5" fill="none" stroke="' + INV_TEXT + '" stroke-width="3"/>' + strokeColor('M147,61 L152,66', INV_TEXT, 3); },
    key: function () { return '<circle cx="146" cy="60" r="17" fill="' + INV_SURFACE + '"/><circle cx="141" cy="57" r="4.5" fill="none" stroke="' + INV_TEXT + '" stroke-width="3"/>' + strokeColor('M144,60 L153,69 M149,64 L152,67 M153,60 L153,69', INV_TEXT, 3); },
    swap: function () { return '<circle cx="146" cy="60" r="17" fill="' + INV_SURFACE + '"/>' + strokeColor('M138,56 L154,56 M150,52 L154,56 L150,60', INV_TEXT, 3) + strokeColor('M154,64 L138,64 M142,60 L138,64 L142,68', INV_TEXT, 3); },
    cap: function () { return '<circle cx="146" cy="60" r="17" fill="' + INV_SURFACE + '"/>' + fillColor('M146,52 L157,58 L146,64 L135,58 Z', INV_TEXT) + strokeColor('M146,64 L146,69', INV_TEXT, 3); },
    dots: function () { return '<circle cx="146" cy="60" r="17" fill="' + INV_SURFACE + '"/><circle cx="140" cy="60" r="2.6" fill="' + INV_TEXT + '"/><circle cx="146" cy="60" r="2.6" fill="' + INV_TEXT + '"/><circle cx="152" cy="60" r="2.6" fill="' + INV_TEXT + '"/>'; },
    arrow: function () { return '<circle cx="146" cy="60" r="17" fill="' + OK + '"/>' + strokeColor('M139,64 Q139,52 151,52 M146,48 L151,52 L146,56', INV_TEXT, 3.4); }
  };

  // ── Base glyphs (centered roughly on 60,60 to 140,140) ───────────
  var GLYPHS = {
    'phone': function () { return rect(78, 44, 44, 76, 12) + '<circle cx="100" cy="106" r="3.2" fill="' + TEXT + '"/>' + stroke('M86,58 L114,58', 4); },
    'card': function () { return rect(52, 68, 96, 60, 10) + stroke('M52,90 L148,90', 4) + '<rect x="66" y="102" width="24" height="10" rx="3" fill="' + TEXT + '"/>'; },
    'bubble': function () { return rect(48, 52, 104, 68, 18) + fillColor('M78,120 L78,136 L98,120 Z', TEXT).replace('fill="' + TEXT + '"', 'fill="none" stroke="' + TEXT + '" stroke-width="4.5" stroke-linejoin="round"'); },
    'bubble-segments': function () { return rect(44, 54, 112, 64, 16) + stroke('M44,86 L156,86', 4) + fillColor('M74,118 L74,132 L92,118 Z', 'none').replace('fill="none"', 'fill="none" stroke="' + TEXT + '" stroke-width="4.5" stroke-linejoin="round"'); },
    'envelope': function () { return rect(46, 58, 108, 76, 10) + stroke('M46,64 L100,104 L154,64', 4); },
    'phone-envelope': function () { return rect(50, 56, 34, 58, 9) + '<circle cx="67" cy="102" r="2.6" fill="' + TEXT + '"/>' + rect(96, 66, 56, 40, 8) + strokeColor('M96,70 L124,90 L152,70', TEXT, 3.6); },
    'three-channels': function () { return rect(46, 78, 30, 48, 8) + rect(84, 60, 34, 46, 12) + fillColor('M92,106 L92,116 L102,106 Z', 'none').replace('fill="none"', 'fill="none" stroke="' + TEXT + '" stroke-width="4" stroke-linejoin="round"') + rect(128, 82, 30, 40, 6) + stroke('M128,88 L143,100 L158,88', 3.6); },
    'shield': function () { return stroke('M100,46 L142,60 L142,96 Q142,128 100,146 Q58,128 58,96 L58,60 Z', 4.5); },
    'bell': function () { return stroke('M76,108 Q76,66 100,60 Q124,66 124,108 L132,118 L68,118 Z', 4.5) + '<circle cx="100" cy="128" r="6" fill="' + TEXT + '"/>'; },
    'cart': function () { return stroke('M52,58 L68,58 L86,108 L138,108 L150,74 L78,74', 4.5) + circle(86, 126, 8) + circle(130, 126, 8); },
    'calendar': function () { return rect(50, 54, 100, 90, 10) + stroke('M50,80 L150,80', 4) + stroke('M74,44 L74,62', 4.5) + stroke('M126,44 L126,62', 4.5); },
    'house': function () { return stroke('M52,100 L100,58 L148,100', 4.5) + rect(70, 100, 60, 48, 6) + rect(92, 122, 16, 26, 3); },
    'plate': function () { return circle(100, 100, 46) + circle(100, 100, 26); },
    'wallet': function () { return rect(48, 66, 104, 68, 12) + stroke('M48,86 L152,86', 4) + circle(130, 106, 7); },
    'truck': function () { return rect(44, 78, 66, 42, 8) + stroke('M110,92 L142,92 L154,108 L154,120 L110,120 Z', 4) + circle(72, 128, 10) + circle(132, 128, 10); },
    'ticket': function () { return stroke('M50,72 Q60,72 60,82 Q60,92 50,92 L50,120 Q60,120 60,130 Q60,140 50,140 L150,140 Q140,140 140,130 Q140,120 150,120 L150,92 Q140,92 140,82 Q140,72 150,72 Z', 4) + stroke('M100,80 L100,132', 3.5); },
    'clock': function () { return circle(100, 100, 48) + stroke('M100,74 L100,102 L122,114', 4.5); },
    'bubble-stack': function () { return rect(60, 46, 90, 40, 14) + rect(50, 92, 90, 40, 14) + fillColor('M74,132 L74,144 L88,132 Z', 'none').replace('fill="none"', 'fill="none" stroke="' + TEXT + '" stroke-width="4" stroke-linejoin="round"'); },
    'list-bars': function () { return stroke('M56,66 L110,66', 6) + stroke('M56,100 L134,100', 6) + stroke('M56,134 L96,134', 6); },
    'two-bubbles': function () { return '<rect x="42" y="58" width="70" height="46" rx="14" fill="none" stroke="' + OK + '" stroke-width="4.5"/>' + '<rect x="88" y="96" width="70" height="46" rx="14" fill="none" stroke="' + WARN + '" stroke-width="4.5" stroke-dasharray="7 6"/>'; },
    'funnel': function () { return stroke('M52,56 L148,56 L112,104 L112,140 L88,148 L88,104 Z', 4.5); },
    'ring-progress': function () { return '<circle cx="100" cy="100" r="46" fill="none" stroke="var(--color-border)" stroke-width="9"/><circle cx="100" cy="100" r="46" fill="none" stroke="' + OK + '" stroke-width="9" stroke-linecap="round" stroke-dasharray="216 289" transform="rotate(-90 100 100)"/>' + strokeColor('M84,100 L96,112 L118,88', OK, 5); },
    'scale': function () { return stroke('M100,50 L100,142 M64,150 L136,150', 4.5) + stroke('M56,72 L100,58 L144,72', 4.5) + '<circle cx="56" cy="90" r="16" fill="none" stroke="' + TEXT + '" stroke-width="4"/><circle cx="144" cy="90" r="16" fill="none" stroke="' + TEXT + '" stroke-width="4"/>'; }
  };

  var ICONS = {
    'card-swap': { glyph: 'card', badge: 'coin' },
    'bubble-spark': { glyph: 'bubble', badge: 'spark' },
    'phone-envelope': { glyph: 'phone-envelope', badge: null },
    'envelope': { glyph: 'envelope', badge: null },
    'bubble-coin': { glyph: 'bubble', badge: 'coin' },
    'phone-blocked': { glyph: 'phone', badge: 'blocked' },
    'bubble-tag': { glyph: 'bubble', badge: 'tag' },
    'bubble-segments': { glyph: 'bubble-segments', badge: null },
    'shield-check': { glyph: 'shield', badge: 'check' },
    'envelope-warning': { glyph: 'envelope', badge: 'warning' },
    'phone-error': { glyph: 'phone', badge: 'x' },
    'envelope-swap': { glyph: 'envelope', badge: 'swap' },
    'three-channels': { glyph: 'three-channels', badge: null },
    'bubble-magnifier': { glyph: 'bubble', badge: 'magnifier' },
    'bell-cap': { glyph: 'bell', badge: 'cap' },
    'bell': { glyph: 'bell', badge: null },
    'cart-return': { glyph: 'cart', badge: 'arrow' },
    'calendar-clock': { glyph: 'calendar', badge: null },
    'house-key': { glyph: 'house', badge: 'key' },
    'plate-bubble': { glyph: 'plate', badge: 'tag' },
    'wallet-clock': { glyph: 'wallet', badge: null },
    'truck-check': { glyph: 'truck', badge: 'check' },
    'ticket': { glyph: 'ticket', badge: null },
    'clock': { glyph: 'clock', badge: null },
    'bubble-stack-warning': { glyph: 'bubble-stack', badge: 'warning' },
    'list-plus': { glyph: 'list-bars', badge: 'plus' },
    'two-bubbles': { glyph: 'two-bubbles', badge: null },
    'funnel-dots': { glyph: 'funnel', badge: 'dots' },
    'ring-check': { glyph: 'ring-progress', badge: null },
    'scale': { glyph: 'scale', badge: null }
  };

  function cardFrame(uid) {
    return '' +
      '<defs><filter id="bwb-' + uid + '" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter></defs>' +
      '<rect x="36" y="44" width="128" height="128" rx="22" transform="rotate(-7 100 108)" style="fill:' + INV_SURFACE + ';opacity:.14" filter="url(#bwb-' + uid + ')"/>' +
      '<rect x="32" y="32" width="128" height="128" rx="22" transform="rotate(-7 96 96)" style="fill:var(--color-surface-3);stroke:var(--color-border);stroke-width:1.5"/>' +
      '<rect x="40" y="40" width="128" height="128" rx="22" style="fill:var(--color-surface-2);stroke:var(--color-border);stroke-width:1.5"/>';
  }

  function render(el, key) {
    var def = ICONS[key];
    if (!def) return;
    var uid = key + '-' + Math.random().toString(36).slice(2, 8);
    var glyphFn = GLYPHS[def.glyph];
    var badgeFn = def.badge ? BADGES[def.badge] : null;
    var svg = '<svg viewBox="0 0 200 200" class="w-full h-full" aria-hidden="true" focusable="false">' +
      cardFrame(uid) +
      (glyphFn ? glyphFn() : '') +
      (badgeFn ? badgeFn() : '') +
      '</svg>';
    el.innerHTML = svg;
  }

  function init() {
    document.querySelectorAll('[data-blog-hero]').forEach(function (el) {
      render(el, el.getAttribute('data-blog-hero'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.BlastwaveBlogHero = { render: render, icons: Object.keys(ICONS) };
})();

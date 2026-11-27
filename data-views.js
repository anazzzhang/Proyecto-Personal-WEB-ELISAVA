/* Vistas de datos reales — ECHOES OF WHO I WAS
   Lee window.ECHOES_DATA (data/echoes-data.js), generado por herramientas/procesar_datos.py.
   Gráficos en SVG sin dependencias. Monocromo: la identidad se marca con tono + etiqueta + leyenda,
   nunca solo con el color. Todos los gráficos tienen tooltip y funcionan con teclado o toque. */
(() => {
  const D = window.ECHOES_DATA;
  if (!D) return;

  /* ------------------------------------------------------------ utilidades */
  const $ = s => document.querySelector(s);
  const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });
  const nf1 = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1, useGrouping: 'always' });
  const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const monthLabel = ym => { const [y, m] = ym.split('-'); return `${MONTHS[+m - 1]} ${y}`; };
  const fmtDate = iso => iso.split('-').reverse().join('.');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const bind = (key, html) => document.querySelectorAll(`[data-bind="${key}"]`).forEach(n => { n.innerHTML = html; });
  const SVG = 'http://www.w3.org/2000/svg';
  const sv = (tag, attrs = {}, parent) => { const n = document.createElementNS(SVG, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  /* Nombres silenciados por decisión de la autora: se mantienen en los datos (no se altera el ranking)
     pero se muestran desenfocados y se anuncian como «nombre silenciado». */
  const SIL = /jung ?kook|jungkook|정국|^jk$/i;
  const an = name => SIL.test(name) ? `<span class="silenced" aria-hidden="true">${esc(name)}</span><span class="sr-only">nombre silenciado</span>` : esc(name);
  const at = name => SIL.test(name) ? 'nombre silenciado' : name;
  const monthRange = (from, to) => { const out = []; let [y, m] = from.split('-').map(Number); const [ty, tm] = to.split('-').map(Number); while (y < ty || (y === ty && m <= tm)) { out.push(`${y}-${String(m).padStart(2, '0')}`); m++; if (m > 12) { m = 1; y++; } } return out; };

  /* Tooltip único */
  const tip = $('#tip');
  const showTip = (html, x, y) => {
    tip.innerHTML = html; tip.classList.add('on'); tip.setAttribute('aria-hidden', 'false');
    const r = tip.getBoundingClientRect();
    let left = x + 16, top = y + 16;
    if (left + r.width > innerWidth - 8) left = x - r.width - 16;
    if (top + r.height > innerHeight - 8) top = y - r.height - 16;
    tip.style.transform = `translate(${Math.max(8, left)}px,${Math.max(8, top)}px)`;
  };
  const hideTip = () => { tip.classList.remove('on'); tip.setAttribute('aria-hidden', 'true'); };
  const tipAt = (node, html) => { const r = node.getBoundingClientRect(); showTip(html, r.left + r.width / 2, r.top); };
  const hoverTip = (node, html) => {
    node.addEventListener('pointerenter', e => showTip(html, e.clientX, e.clientY));
    node.addEventListener('pointermove', e => showTip(html, e.clientX, e.clientY));
    node.addEventListener('pointerleave', hideTip);
    node.addEventListener('focus', () => tipAt(node, html));
    node.addEventListener('blur', hideTip);
  };

  /* Redibujado al cambiar de ancho */
  const renderers = [];
  const register = (node, fn) => { if (!node) return; renderers.push(() => fn(node)); fn(node); };
  let rT, lastW = innerWidth;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { if (innerWidth !== lastW) { lastW = innerWidth; renderers.forEach(f => f()); } }, 150); });

  /* Contadores */
  const counts = { 'sp-hours': D.spotify.totalHours, 'pt-pins': D.pinterest.totalPins };
  const countEls = document.querySelectorAll('[data-count]');
  countEls.forEach(n => { n.textContent = nf.format(counts[n.dataset.count]); });
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, o) => entries.forEach(e => {
      if (!e.isIntersecting) return; o.unobserve(e.target);
      const n = e.target, target = counts[n.dataset.count], t0 = performance.now();
      const step = t => { const k = Math.min(1, (t - t0) / 1400); n.textContent = nf.format(Math.round(target * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: .6 });
    countEls.forEach(n => io.observe(n));
  }

  /* ================================================================ SPOTIFY */
  const sp = D.spotify;
  const firstYear = sp.years[0], lastYear = sp.years[sp.years.length - 1];
  bind('sp-range', `${sp.range[0].slice(0, 4)}—${sp.range[1].slice(0, 4)}`);
  bind('sp-first', `«${esc(sp.firstTrack.name)}», el ${fmtDate(sp.firstTrack.date)}`);
  bind('sp-plays', nf.format(sp.totalPlays));
  bind('sp-partial', `${firstYear.year} empieza el ${fmtDate(sp.range[0])} y ${lastYear.year} termina el ${fmtDate(sp.range[1])}, fecha de la exportación: son años incompletos.`);

  /* --- FIG 02.1A · Río de artistas (áreas apiladas, horas/mes) --- */
  const riverSeries = sp.river.filter(s => s.name !== 'Otros');
  // Tono fijo por entidad (nunca por rango); alterna claro/oscuro para separar vecinos.
  const TONES = [.92, .34, .74, .2, .58, .44, .84, .27];
  let riverFocus = null, riverPaths = [], riverMode = 'hours';
  const otherSeries = sp.river.find(s => s.name === 'Otros');
  const monthTotal = sp.months.map((_, j) => sp.river.reduce((a, s) => a + s.hours[j], 0));
  const rv = (s, j) => riverMode === 'share' ? (monthTotal[j] ? s.hours[j] / monthTotal[j] * 100 : 0) : s.hours[j];
  const rfmt = v => riverMode === 'share' ? nf1.format(v) + ' %' : nf1.format(v) + ' h';
  const legend = $('#river-legend');
  function applyRiverFocus(hover) {
    const f = hover != null ? hover : riverFocus;
    riverPaths.forEach((p, i) => { p.classList.toggle('dim', f != null && i !== f); p.classList.toggle('hi', f === i); });
  }
  riverSeries.forEach((s, i) => {
    const b = el('button', 'legend-item', `<i style="--o:${TONES[i]}"></i>${an(s.name)}`);
    b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => { riverFocus = riverFocus === i ? null : i; legend.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === riverFocus))); applyRiverFocus(); });
    b.addEventListener('mouseenter', () => applyRiverFocus(i));
    b.addEventListener('mouseleave', () => applyRiverFocus());
    legend.appendChild(b);
  });
  const riverNode = $('#river-chart');
  document.querySelectorAll('.seg [data-mode]').forEach(b => b.addEventListener('click', () => {
    riverMode = b.dataset.mode;
    document.querySelectorAll('.seg [data-mode]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    drawRiver(riverNode);
  }));
  function drawRiver(node) {
    node.innerHTML = '';
    const W = node.clientWidth, H = W < 600 ? 300 : 420, m = { t: 12, r: 8, b: 30, l: 44 };
    const svg = sv('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}` }, node);
    const months = sp.months, n = months.length;
    const stack = months.map((_, j) => { let acc = 0; return riverSeries.map(s => { const y0 = acc; acc += rv(s, j); return [y0, acc]; }); });
    const maxY = riverMode === 'share' ? 100 : Math.max(...stack.map(c => c[c.length - 1][1]));
    const x = j => m.l + (j / (n - 1)) * (W - m.l - m.r);
    const y = v => H - m.b - (v / maxY) * (H - m.t - m.b);
    const g = sv('g', { class: 'axis' }, svg);
    const step = riverMode === 'share' ? 25 : 20;
    for (let v = 0; v <= maxY; v += step) { sv('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), class: 'grid' }, g); sv('text', { x: m.l - 8, y: y(v) + 3, 'text-anchor': 'end' }, g).textContent = v + (riverMode === 'share' ? ' %' : ' h'); }
    months.forEach((ym, j) => { if (ym.endsWith('-01')) { sv('line', { x1: x(j), x2: x(j), y1: m.t, y2: H - m.b, class: 'grid grid-v' }, g); sv('text', { x: x(j) + 4, y: H - m.b + 18 }, g).textContent = ym.slice(0, 4); } });
    riverPaths = riverSeries.map((s, i) => {
      let d = `M${x(0)},${y(stack[0][i][1])}`;
      for (let j = 1; j < n; j++) d += `L${x(j)},${y(stack[j][i][1])}`;
      for (let j = n - 1; j >= 0; j--) d += `L${x(j)},${y(stack[j][i][0])}`;
      return sv('path', { d: d + 'Z', class: 'band', style: `--o:${TONES[i]}` }, svg);
    });
    // Etiquetas directas en el pico de las 4 franjas mayores.
    if (W >= 600) riverSeries.forEach((s, i) => {
      let jm = 0; stack.forEach((c, j) => { if (c[i][1] - c[i][0] > stack[jm][i][1] - stack[jm][i][0]) jm = j; });
      if (y(stack[jm][i][0]) - y(stack[jm][i][1]) < 16 || SIL.test(s.name)) return;
      const yy = (y(stack[jm][i][0]) + y(stack[jm][i][1])) / 2;
      const t = sv('text', { x: Math.min(W - 70, Math.max(m.l + 40, x(jm))), y: yy + 4, class: 'band-label', 'text-anchor': 'middle' }, svg); t.textContent = s.name;
    });
    const cross = sv('line', { class: 'cross', y1: m.t, y2: H - m.b }, svg);
    applyRiverFocus();
    const hit = sv('rect', { x: m.l, y: m.t, width: W - m.l - m.r, height: H - m.t - m.b, fill: 'transparent' }, svg);
    hit.addEventListener('pointermove', ev => {
      const r = svg.getBoundingClientRect(), px = ev.clientX - r.left, py = ev.clientY - r.top;
      const j = Math.max(0, Math.min(n - 1, Math.round((px - m.l) / (W - m.l - m.r) * (n - 1))));
      const v = (H - m.b - py) / (H - m.t - m.b) * maxY;
      const i = stack[j].findIndex(([a, b]) => v >= a && v <= b);
      cross.setAttribute('x1', x(j)); cross.setAttribute('x2', x(j)); cross.classList.add('on');
      if (riverFocus == null) applyRiverFocus(i >= 0 ? i : undefined);
      const rows = riverSeries.map((s, k) => ({ k, name: s.name, h: rv(s, j) })).filter(o => o.h >= .1).sort((a, b) => b.h - a.h);
      showTip(`<b>${monthLabel(months[j])}</b>${rows.map(o => `<span class="${o.k === i ? 'tip-hi' : ''}">${esc(at(o.name))}<em>${rfmt(o.h)}</em></span>`).join('') || '<span>—</span>'}<span class="tip-muted">resto de artistas<em>${rfmt(rv(otherSeries, j))}</em></span><span class="tip-muted">total del mes<em>${nf1.format(monthTotal[j])} h</em></span>`, ev.clientX, ev.clientY);
    });
    hit.addEventListener('pointerleave', () => { hideTip(); cross.classList.remove('on'); applyRiverFocus(); });
  }
  register(riverNode, drawRiver);

  /* --- FIG 02.1B · Tira de años + detalle --- */
  const strip = $('#year-strip'), detail = $('#year-detail');
  const maxH = Math.max(...sp.years.map(y => y.hours));
  const showYear = (y, btn) => {
    strip.querySelectorAll('button').forEach(b => { const on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    const isNow = y.year === lastYear.year;
    detail.innerHTML = `
      <div class="yd-main"><span class="yd-year">${y.year}</span><p class="yd-track">«${esc(y.topTrack.name)}»<span>${an(y.topTrack.artist)} · canción más escuchada</span></p></div>
      <ol class="yd-artists">${y.topArtists.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><b>${an(a.name)}</b><i style="--w:${(a.hours / y.topArtists[0].hours * 100).toFixed(1)}"></i><em>${nf.format(Math.round(a.hours))} h</em><small class="${isNow || a.nowHours >= 5 ? 'stay' : 'gone'}">${isNow ? 'AHORA' : a.nowHours >= 5 ? `SIGUE · ${nf.format(Math.round(a.nowHours))} H EN ${lastYear.year}` : 'EN SILENCIO'}</small></li>`).join('')}</ol>
      <dl class="yd-facts"><div><dt>HORAS</dt><dd>${nf.format(y.hours)}</dd></div><div><dt>ARTISTAS DISTINTOS</dt><dd>${nf.format(y.artists)}</dd></div><div><dt>CANCIONES SALTADAS</dt><dd>${y.skipShare ? Math.round(y.skipShare * 100) + '%' : '—'}</dd></div></dl>`;
  };
  sp.years.forEach((y, i) => {
    const b = el('button', 'year-col');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'year-detail');
    b.style.setProperty('--h', (y.hours / maxH * 100).toFixed(1) + '%');
    b.innerHTML = `<span class="yc-bar"><span class="yc-hours">${nf.format(y.hours)} h</span></span><span class="yc-artist">${an(y.topArtists[0].name)}</span><span class="yc-year">${y.year}</span>`;
    b.addEventListener('click', () => showYear(y, b));
    b.addEventListener('keydown', e => {
      const btns = [...strip.querySelectorAll('button')], cur = btns.indexOf(b);
      const k = cur + (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0);
      if (k !== cur && btns[k]) { e.preventDefault(); btns[k].focus(); btns[k].click(); }
    });
    strip.appendChild(b);
    if (i === 0) showYear(y, b);
  });

  /* --- FIG 02.1C · Mapa de calor hora × año --- */
  register($('#heat-chart'), node => {
    node.innerHTML = '';
    const W = node.clientWidth, rows = sp.hourMatrix, m = { t: 26, r: 4, b: 26, l: 40 };
    const cw = (W - m.l - m.r) / 24, ch = Math.max(24, Math.min(38, cw * 1.25)), H = m.t + rows.length * ch + m.b;
    const svg = sv('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}` }, node);
    const maxS = Math.max(...rows.flatMap(r => r.share));
    sv('rect', { x: m.l - 3, y: m.t - 4, width: cw * 5 + 6, height: rows.length * ch + 8, class: 'heat-night' }, svg);
    sv('text', { x: m.l, y: m.t - 10, class: 'heat-note' }, svg).textContent = '00—05 H';
    rows.forEach((r, ri) => {
      sv('text', { x: m.l - 8, y: m.t + ri * ch + ch / 2 + 3, 'text-anchor': 'end', class: 'axis-t' }, svg).textContent = r.year;
      r.share.forEach((v, h) => {
        const c = sv('rect', { x: m.l + h * cw + 1, y: m.t + ri * ch + 1, width: Math.max(1, cw - 2), height: ch - 2, rx: 2, class: 'cell', style: `--o:${(0.04 + 0.96 * v / maxS).toFixed(3)}`, tabindex: 0 }, svg);
        hoverTip(c, `<b>${r.year} · ${String(h).padStart(2, '0')}:00</b><span>${nf1.format(v * 100)} % de las escuchas del año</span>`);
      });
    });
    [0, 6, 12, 18, 23].forEach(h => { sv('text', { x: m.l + h * cw + cw / 2, y: H - 8, 'text-anchor': 'middle', class: 'axis-t' }, svg).textContent = String(h).padStart(2, '0') + 'h'; });
  });
  bind('sp-night', `En ${firstYear.year}, ${Math.round(firstYear.nightShare * 100)} de cada 100 canciones sonaban de madrugada; en ${lastYear.year}, ${Math.round(lastYear.nightShare * 100)}.`);

  /* --- El número uno (calculado) --- */
  const ones = sp.years.map(y => y.topArtists[0].name);
  const distinct = new Set(ones).size;
  bind('sp-constant', String(distinct));
  bind('sp-constant-copy', `números uno distintos en ${sp.years.length} años. El artista que más escucho cambia casi cada año: ninguna versión de mí dura mucho en lo más alto.`);

  /* --- Canciones olvidadas --- */
  const fl = $('#forgotten-list');
  sp.forgotten.slice(0, 10).forEach((t, i) => {
    const li = el('li', 'fg-item');
    li.tabIndex = 0;
    li.innerHTML = `<span class="fg-n">${String(i + 1).padStart(2, '0')}</span><span class="fg-name memory-blur">${esc(t.name)}<i>${an(t.artist)} · ${nf1.format(t.hours)} h</i></span><span class="fg-date">${fmtDate(t.last)}</span>`;
    const tog = () => li.classList.toggle('is-recalled');
    li.addEventListener('click', tog);
    li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
    fl.appendChild(li);
  });

  /* --- Daylists con filtro por palabra --- */
  const dl = sp.daylists || [];
  const dlTitle = $('#daylist-title'), dlBtn = $('#daylist-btn'), dlTags = $('#daylist-tags');
  if (dl.length) {
    let pool = dl, idx = Math.floor(Math.random() * dl.length), active = null;
    const setCount = () => bind('sp-daylists', active ? `${pool.length} DAYLISTS CON «${esc(active.toUpperCase())}» · PULSA DE NUEVO PARA VER TODAS` : `${dl.length} NOMBRES DISTINTOS · ${fmtDate(sp.daylistRange[0])} — ${fmtDate(sp.daylistRange[1])}`);
    const show = () => {
      const t = pool[idx % pool.length];
      dlTitle.classList.remove('is-in'); void dlTitle.offsetWidth;
      dlTitle.innerHTML = active ? esc(t).replace(new RegExp(`(${active.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'), '<u>$1</u>') : esc(t);
      dlTitle.classList.add('is-in');
    };
    const maxT = Math.max(...sp.daylistTags.map(t => t.n));
    sp.daylistTags.forEach(t => {
      const matches = dl.filter(x => x.toLowerCase().includes(t.tag.toLowerCase()));
      if (!matches.length) return;
      const b = el('button', 'dl-tag', `${esc(t.tag)}<sup>${t.n}</sup>`);
      b.type = 'button'; b.style.setProperty('--s', (0.8 + 0.8 * Math.sqrt(t.n / maxT)).toFixed(2)); b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        if (active === t.tag) { active = null; pool = dl; } else { active = t.tag; pool = matches; }
        dlTags.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b && active === t.tag)));
        idx = 0; setCount(); show();
      });
      dlTags.appendChild(b);
    });
    setCount(); show();
    dlBtn.addEventListener('click', () => { idx = pool.length > 1 ? (idx + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length : 0; show(); });
  } else $('.daylist')?.remove();

  /* ============================================================== PINTEREST */
  const pt = D.pinterest;
  const pmKeys = Object.keys(pt.perMonth).sort();
  const ptMonths = monthRange(pmKeys[0], pmKeys[pmKeys.length - 1]);

  /* --- FIG 02.2A · Pines por mes --- */
  register($('#pins-chart'), node => {
    node.innerHTML = '';
    const W = node.clientWidth, H = W < 600 ? 230 : 290, m = { t: 34, r: 8, b: 28, l: 40 };
    const svg = sv('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}` }, node);
    const vals = ptMonths.map(k => pt.perMonth[k] || 0), maxV = Math.max(...vals);
    const bw = (W - m.l - m.r) / vals.length, y = v => H - m.b - v / maxV * (H - m.t - m.b);
    const g = sv('g', { class: 'axis' }, svg);
    const st = maxV > 400 ? 200 : 100;
    for (let v = 0; v <= maxV; v += st) { sv('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), class: 'grid' }, g); sv('text', { x: m.l - 8, y: y(v) + 3, 'text-anchor': 'end' }, g).textContent = v; }
    ptMonths.forEach((k, j) => { if (k.endsWith('-01')) sv('text', { x: m.l + j * bw, y: H - 8 }, g).textContent = k.slice(0, 4); });
    let peak = 0; vals.forEach((v, j) => { if (v > vals[peak]) peak = j; });
    vals.forEach((v, j) => {
      const bwid = Math.max(1, bw - 2);
      if (v) sv('rect', { x: m.l + j * bw + 1, y: y(v), width: bwid, height: H - m.b - y(v), rx: Math.min(2, bwid / 2), class: 'bar' + (j === peak ? ' bar-peak' : '') }, svg);
      const hit = sv('rect', { x: m.l + j * bw, y: m.t, width: bw, height: H - m.t - m.b, fill: 'transparent' }, svg);
      if (v) { hit.setAttribute('tabindex', 0); hoverTip(hit, `<b>${monthLabel(ptMonths[j])}</b><span>${nf.format(v)} pines guardados</span>`); }
    });
    const pk = ptMonths[peak];
    const who = pt.boards.map(b => [b.name, b.months[pk] || 0]).sort((a, b) => b[1] - a[1])[0];
    const ax = m.l + peak * bw + bw / 2, right = ax > W - 320;
    sv('line', { x1: ax, x2: ax, y1: y(vals[peak]) - 4, y2: m.t - 14, class: 'annot-line' }, svg);
    sv('text', { x: right ? ax - 6 : ax + 6, y: m.t - 16, class: 'annot', 'text-anchor': right ? 'end' : 'start' }, svg).textContent = `${monthLabel(pk).toUpperCase()} · ${nf.format(vals[peak])} PINES · ${who[1]} EN ${who[0]}`;
  });

  /* --- FIG 02.2B · Vida de cada tablero --- */
  register($('#boards-chart'), node => {
    node.innerHTML = '';
    const boards = pt.boards, W = Math.max(760, node.clientWidth), rowH = 22, m = { t: 24, r: 18, b: 8, l: 150 };
    const H = m.t + boards.length * rowH + m.b;
    const svg = sv('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}` }, node);
    const n = ptMonths.length, cell = (W - m.l - m.r) / n, x = j => m.l + (j + .5) * cell;
    ptMonths.forEach((k, j) => { if (k.endsWith('-01')) { const gx = m.l + j * cell; sv('line', { x1: gx, x2: gx, y1: m.t - 6, y2: H - m.b, class: 'grid grid-v' }, svg); sv('text', { x: gx + 4, y: m.t - 10, class: 'axis-t' }, svg).textContent = k.slice(0, 4); } });
    const maxC = Math.max(...boards.flatMap(b => Object.values(b.months)));
    boards.forEach((b, i) => {
      const yy = m.t + i * rowH + rowH / 2;
      const rowG = sv('g', { class: 'brow' + (b.numbered ? ' brow-num' : ''), tabindex: 0 }, svg);
      sv('rect', { x: 0, y: yy - rowH / 2, width: W, height: rowH, class: 'brow-bg' }, rowG);
      const ks = Object.keys(b.months).sort();
      sv('line', { x1: x(ptMonths.indexOf(ks[0])), x2: x(ptMonths.indexOf(ks[ks.length - 1])), y1: yy, y2: yy, class: 'life' }, rowG);
      const lab = sv('text', { x: m.l - 12, y: yy + 3, 'text-anchor': 'end', class: 'blabel' }, rowG); lab.textContent = b.name;
      ks.forEach(k => {
        const c = b.months[k];
        const dot = sv('circle', { cx: x(ptMonths.indexOf(k)), cy: yy, r: Math.max(2.5, Math.sqrt(c / maxC) * 13), class: 'bdot' }, rowG);
        dot.addEventListener('pointerenter', e => showTip(`<b>${esc(b.name)}</b><span>${monthLabel(k)} · ${nf.format(c)} pines</span>`, e.clientX, e.clientY));
        dot.addEventListener('pointermove', e => showTip(`<b>${esc(b.name)}</b><span>${monthLabel(k)} · ${nf.format(c)} pines</span>`, e.clientX, e.clientY));
        dot.addEventListener('pointerleave', hideTip);
      });
      const sum = `<b>${esc(b.name)}</b><span>${nf.format(b.pins)} pines</span><span>${fmtDate(b.first)} → ${fmtDate(b.last)}</span><span class="tip-muted">${b.numbered ? 'tablero sin nombre' : 'tablero con nombre'}</span>`;
      rowG.addEventListener('focus', () => tipAt(lab, sum)); rowG.addEventListener('blur', hideTip);
      lab.addEventListener('pointerenter', e => showTip(sum, e.clientX, e.clientY)); lab.addEventListener('pointerleave', hideTip);
    });
  });

  /* ============================================================== INSTAGRAM */
  const ig = D.instagram;
  const row = (n, label) => `<div><dt>${label}</dt><dd>${nf.format(n)}</dd></div>`;
  $('#ledger-me').innerHTML = row(ig.posts, 'PUBLICACIONES EN MI PERFIL') + row(ig.stories, 'HISTORIAS (2025—2026)') + row(ig.saved, 'PUBLICACIONES GUARDADAS');
  $('#ledger-them').innerHTML =
    row(ig.postsViewed, `PUBLICACIONES QUE VI · ${fmtDate(ig.viewWindow[0])}—${fmtDate(ig.viewWindow[1])}`) +
    row(ig.videosWatched, 'VÍDEOS QUE VI · MISMAS DOS SEMANAS') +
    row(ig.liked, 'ME GUSTA REGISTRADOS') +
    row(ig.advertisers, 'ANUNCIANTES CON LISTAS QUE COINCIDEN CON MI PERFIL');

  /* --- FIG 02.3A · Múltiplos pequeños (cada fila con su escala, nunca doble eje) --- */
  register($('#ig-chart'), node => {
    node.innerHTML = '';
    const series = [['liked', 'ME GUSTA', 'consumo'], ['saved', 'GUARDADOS', 'consumo'], ['stories', 'HISTORIAS', 'muestro']];
    const all = series.flatMap(([k]) => Object.keys(ig.monthly[k])).sort();
    const months = monthRange(all[0], all[all.length - 1]);
    const narrow = W => W < 600;
    const W = node.clientWidth, rowH = narrow(W) ? 80 : 104, gap = 26, m = { t: 8, r: 8, b: 28, l: narrow(W) ? 84 : 150 };
    const H = m.t + series.length * (rowH + gap) + m.b;
    const svg = sv('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}` }, node);
    const bw = (W - m.l - m.r) / months.length;
    series.forEach(([k, label, kind], si) => {
      const vals = months.map(mm => ig.monthly[k][mm] || 0), maxV = Math.max(...vals), top = m.t + si * (rowH + gap), base = top + rowH;
      sv('line', { x1: m.l, x2: W - m.r, y1: base, y2: base, class: 'base' }, svg);
      sv('text', { x: 0, y: top + 14, class: 'sm-label' }, svg).textContent = label;
      sv('text', { x: 0, y: top + 30, class: 'axis-t' }, svg).textContent = `${kind.toUpperCase()} · MÁX ${maxV}`;
      vals.forEach((v, j) => { if (v) { const h = v / maxV * (rowH - 6); sv('rect', { x: m.l + j * bw + 1, y: base - h, width: Math.max(1, bw - 2), height: h, rx: 2, class: 'bar' + (kind === 'muestro' ? ' bar-open' : '') }, svg); } });
    });
    months.forEach((mm, j) => { if (mm.endsWith('-01') || j === 0) sv('text', { x: m.l + j * bw, y: H - 8, class: 'axis-t' }, svg).textContent = monthLabel(mm); });
    const cross = sv('rect', { class: 'cross-band', y: m.t, height: H - m.t - m.b, width: bw }, svg);
    const hit = sv('rect', { x: m.l, y: m.t, width: W - m.l - m.r, height: H - m.t - m.b, fill: 'transparent' }, svg);
    hit.addEventListener('pointermove', e => {
      const r = svg.getBoundingClientRect(), j = Math.max(0, Math.min(months.length - 1, Math.floor((e.clientX - r.left - m.l) / bw)));
      cross.setAttribute('x', m.l + j * bw); cross.classList.add('on');
      showTip(`<b>${monthLabel(months[j])}</b>${series.map(([k, label]) => `<span>${label.toLowerCase()}<em>${nf.format(ig.monthly[k][months[j]] || 0)}</em></span>`).join('')}`, e.clientX, e.clientY);
    });
    hit.addEventListener('pointerleave', () => { hideTip(); cross.classList.remove('on'); });
  });

  const algoTags = ['fyp', 'explore', 'viral', 'reels', 'reel', 'trending', 'explorepage', 'relatable', 'aesthetic', 'foryou', 'foryoupage'];
  const cloud = (ul, list) => list.forEach((t, i) => ul.appendChild(el('li', '', `#${esc(t)}`)).style.setProperty('--i', i));
  cloud($('#tags-me'), ig.topHashtags.filter(t => !algoTags.includes(t)).slice(0, 22));
  cloud($('#tags-algo'), ig.topHashtags.filter(t => algoTags.includes(t)));

  /* ========================================================= RECONSTRUCCIÓN */
  const years = sp.years.map(y => y.year);
  const range = $('#recon-range'), ry = $('#recon-years'), grid = $('#recon-grid');
  range.max = years.length - 1;
  const follow = Object.fromEntries(ig.followingPerYear.map(f => [f.year, f.n]));
  const maxFollow = Math.max(...Object.values(follow));
  const pinsYear = Object.fromEntries(pt.perYear.map(p => [p.year, p.pins]));
  const boardsIn = yr => pt.boards.map(b => [b, Object.entries(b.months).filter(([k]) => k.startsWith(yr)).reduce((a, [, v]) => a + v, 0)]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  years.forEach((y, i) => { const b = el('button', '', y); b.type = 'button'; b.addEventListener('click', () => { range.value = i; renderRecon(); }); ry.appendChild(b); });
  function renderRecon() {
    const i = +range.value, yr = years[i], Y = sp.years[i], isNow = yr === lastYear.year;
    range.setAttribute('aria-valuetext', String(yr));
    ry.querySelectorAll('button').forEach((b, j) => b.classList.toggle('on', j === i));
    const bs = boardsIn(String(yr));
    const stay = Y.topArtists.filter(a => a.nowHours >= 5).length;
    const named = bs.filter(([b]) => !b.numbered).length;
    grid.innerHTML = `
      <article class="recon-card"><span class="rc-top">ESCUCHABA <i>SPOTIFY</i></span>
        <strong>${an(Y.topArtists[0].name)}</strong>
        <p>«${esc(Y.topTrack.name)}» · ${an(Y.topTrack.artist)}</p>
        <ul>${Y.topArtists.map(a => `<li class="${isNow || a.nowHours >= 5 ? '' : 'faded'}">${an(a.name)}<em>${nf.format(Math.round(a.hours))} h</em></li>`).join('')}</ul>
        <small>${isNow ? 'Así suena ahora.' : `${stay} de 5 siguen sonando en ${lastYear.year}. Los atenuados, ya no.`}</small></article>
      <article class="recon-card"><span class="rc-top">GUARDABA <i>PINTEREST</i></span>
        <strong>${nf.format(pinsYear[yr] || 0)} <span>pines</span></strong>
        <p>${bs.length} tableros activos · ${named} con nombre</p>
        <ul>${bs.slice(0, 5).map(([b, n]) => `<li class="${b.numbered ? 'faded' : ''}">${esc(b.name)}<em>${n}</em></li>`).join('') || '<li>—</li>'}</ul>
        <small>Los tableros atenuados no tienen nombre: solo números.</small></article>
      <article class="recon-card"><span class="rc-top">SEGUÍA <i>INSTAGRAM</i></span>
        <strong>${follow[yr] || 0} <span>cuentas</span></strong>
        <div class="rc-meter" aria-hidden="true"><i style="width:${((follow[yr] || 0) / maxFollow * 100).toFixed(0)}%"></i></div>
        <p>${follow[yr] === maxFollow ? 'El año en que más cuentas empecé a seguir.' : 'Cuentas que empecé a seguir este año y que todavía sigo.'}</p>
        <small>La exportación solo conserva a quien sigo hoy: las que dejé de seguir ya no están en el archivo.</small></article>`;
  }
  range.addEventListener('input', renderRecon);
  renderRecon();

  /* ================================================================== ECOS: lo que sigue ahí */
  const echo = $('#echo-grid');
  const y0 = sp.years[0];
  const stay0 = y0.topArtists.filter(a => a.nowHours >= 5).length;
  const lastYr = String(lastYear.year);
  const longest = pt.boards.filter(b => !b.numbered && b.last.startsWith(lastYr)).sort((a, b) => a.first.localeCompare(b.first))[0];
  const cards = [
    ['SPOTIFY', `${stay0} de ${y0.topArtists.length}`, `artistas de mi top de ${y0.year} siguen sonando en ${lastYear.year}. El resto se quedó en esa versión de mí.`],
    longest && ['PINTEREST', esc(longest.name), `es el único tablero con nombre que me acompaña desde ${longest.first.slice(0, 4)}: ${nf.format(longest.pins)} imágenes guardadas hasta ${fmtDate(longest.last)}.`],
    ['INSTAGRAM', nf.format(ig.designSaved), `de mis ${nf.format(ig.saved)} guardados llevan etiquetas de diseño, tipografía o ilustración. Lo que estudio también es lo que guardo.`],
  ].filter(Boolean);
  cards.forEach(([p, n, t], i) => echo.appendChild(el('article', 'echo-card', `<span class="echo-top">${p}<i>0${i + 1}</i></span><strong>${n}</strong><p>${t}</p>`)));
})();

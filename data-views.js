/* Vistas de datos reales. Lee window.ECHOES_DATA (data/echoes-data.js),
   generado por herramientas/procesar_datos.py. Solo datos agregados. */
(() => {
  const D = window.ECHOES_DATA;
  if (!D) return;
  const $ = s => document.querySelector(s);
  const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });
  const fmtDate = iso => iso.split('-').reverse().join('.');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const bind = (key, html) => document.querySelectorAll(`[data-bind="${key}"]`).forEach(n => { n.innerHTML = html; });

  /* Contadores que suben al entrar en pantalla */
  const counts = { 'sp-hours': D.spotify.totalHours, 'pt-pins': D.pinterest.totalPins };
  const countEls = document.querySelectorAll('[data-count]');
  const runCount = n => {
    const target = counts[n.dataset.count];
    if (reduceMotion) { n.textContent = nf.format(target); return; }
    const t0 = performance.now(), dur = 1400;
    const step = t => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      n.textContent = nf.format(Math.round(target * e));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  countEls.forEach(n => { n.textContent = nf.format(counts[n.dataset.count]); });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, o) => entries.forEach(e => { if (e.isIntersecting) { runCount(e.target); o.unobserve(e.target); } }), { threshold: .6 });
    countEls.forEach(n => io.observe(n));
  }

  /* ---------------- SPOTIFY ---------------- */
  const sp = D.spotify;
  const lastYear = sp.years[sp.years.length - 1];
  const firstYear = sp.years[0];
  bind('sp-range', `${sp.range[0].slice(0, 4)}—${sp.range[1].slice(0, 4)}`);
  bind('sp-first', `«${esc(sp.firstTrack.name)}» de ${esc(sp.firstTrack.artist)}, el ${fmtDate(sp.firstTrack.date)}`);
  bind('sp-plays', nf.format(sp.totalPlays));
  bind('sp-partial', `${firstYear.year} empieza el ${fmtDate(sp.range[0])} y ${lastYear.year} termina el ${fmtDate(sp.range[1])}, fecha de la exportación: son años incompletos.`);

  const strip = $('#year-strip'), detail = $('#year-detail');
  const maxH = Math.max(...sp.years.map(y => y.hours));
  const showYear = (y, btn) => {
    strip.querySelectorAll('button').forEach(b => { const on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    detail.innerHTML = `
      <div class="yd-main"><span class="yd-year">${y.year}</span><p class="yd-track">«${esc(y.topTrack.name)}»<span>${esc(y.topTrack.artist)} · canción más escuchada</span></p></div>
      <ol class="yd-artists">${y.topArtists.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><b>${esc(a.name)}</b><i style="--w:${(a.hours / y.topArtists[0].hours * 100).toFixed(1)}"></i><em>${nf.format(Math.round(a.hours))} h</em></li>`).join('')}</ol>
      <dl class="yd-facts"><div><dt>HORAS</dt><dd>${nf.format(y.hours)}</dd></div><div><dt>ARTISTAS DISTINTOS</dt><dd>${nf.format(y.artists)}</dd></div><div><dt>CANCIONES SALTADAS</dt><dd>${y.skipShare ? Math.round(y.skipShare * 100) + '%' : '—'}</dd></div></dl>`;
  };
  sp.years.forEach((y, i) => {
    const b = el('button', 'year-col');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'year-detail');
    b.style.setProperty('--h', (y.hours / maxH * 100).toFixed(1) + '%');
    b.innerHTML = `<span class="yc-bar"><span class="yc-hours">${nf.format(y.hours)} h</span></span><span class="yc-artist">${esc(y.topArtists[0].name)}</span><span class="yc-year">${y.year}</span>`;
    b.addEventListener('click', () => showYear(y, b));
    b.addEventListener('keydown', e => {
      const btns = [...strip.querySelectorAll('button')];
      const k = btns.indexOf(b) + (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0);
      if (k !== btns.indexOf(b) && btns[k]) { e.preventDefault(); btns[k].focus(); btns[k].click(); }
    });
    strip.appendChild(b);
    if (i === 0) showYear(y, b);
  });

  const night = $('#night-bars');
  const maxN = Math.max(...sp.years.map(y => y.nightShare));
  sp.years.forEach(y => {
    night.appendChild(el('div', 'nb', `<span class="nb-bar" style="--h:${(y.nightShare / maxN * 100).toFixed(1)}%"></span><b>${Math.round(y.nightShare * 100)}%</b><span>${y.year}</span>`));
  });
  bind('sp-night', `En ${firstYear.year}, ${Math.round(firstYear.nightShare * 100)} de cada 100 canciones sonaban de madrugada; en ${lastYear.year}, ${Math.round(lastYear.nightShare * 100)}.`);

  // La constante: artista presente en el top 3 de todos los años (calculado, no escrito a mano).
  const inTop = sp.years.map(y => y.topArtists.slice(0, 3).map(a => a.name));
  const constant = inTop[0].find(name => inTop.every(list => list.includes(name)));
  if (constant) {
    const at = sp.allTime.find(a => a.name === constant);
    bind('sp-constant', esc(constant));
    bind('sp-constant-copy', `Es el único artista que está entre mis tres más escuchados todos los años, de ${firstYear.year} a ${lastYear.year}. ${at ? nf.format(Math.round(at.hours)) + ' horas en total.' : ''} Todo lo demás cambia; esto se queda.`);
  } else {
    $('.constant')?.remove();
  }

  const fl = $('#forgotten-list');
  sp.forgotten.slice(0, 10).forEach((t, i) => {
    const li = el('li', 'fg-item');
    li.tabIndex = 0;
    li.innerHTML = `<span class="fg-n">${String(i + 1).padStart(2, '0')}</span><span class="fg-name memory-blur">${esc(t.name)}<i>${esc(t.artist)}</i></span><span class="fg-date">${fmtDate(t.last)}</span>`;
    li.addEventListener('click', () => li.classList.toggle('is-recalled'));
    li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.classList.toggle('is-recalled'); } });
    fl.appendChild(li);
  });

  const dl = sp.daylists || [];
  const dlTitle = $('#daylist-title'), dlBtn = $('#daylist-btn');
  if (dl.length) {
    bind('sp-daylists', `${dl.length} NOMBRES DISTINTOS · ${fmtDate(sp.daylistRange[0])} — ${fmtDate(sp.daylistRange[1])}`);
    let idx = Math.floor(Math.random() * dl.length);
    const show = () => {
      dlTitle.classList.remove('is-in'); void dlTitle.offsetWidth;
      dlTitle.textContent = dl[idx]; dlTitle.classList.add('is-in');
    };
    show();
    dlBtn.addEventListener('click', () => { idx = (idx + 1 + Math.floor(Math.random() * (dl.length - 1))) % dl.length; show(); });
  } else {
    $('.daylist')?.remove();
  }

  /* ---------------- PINTEREST ---------------- */
  const pt = D.pinterest;
  const py = $('#pins-year');
  const maxP = Math.max(...pt.perYear.map(p => p.pins));
  pt.perYear.forEach(p => py.appendChild(el('div', 'py', `<span class="py-bar" style="--w:${(p.pins / maxP * 100).toFixed(1)}%"></span><b>${p.year}</b><em>${nf.format(p.pins)}</em>`)));

  const boards = $('#boards');
  pt.boards.forEach(b => {
    const size = Math.max(70, Math.min(230, Math.sqrt(b.pins) * 9));
    const n = el('div', 'board' + (b.numbered ? ' board-num memory-blur' : ''));
    n.style.setProperty('--s', size.toFixed(0) + 'px');
    n.tabIndex = 0;
    n.setAttribute('aria-label', `${b.name}: ${b.pins} pines, ${b.first.slice(0, 4)}`);
    n.innerHTML = `<b>${esc(b.name)}</b><span>${nf.format(b.pins)}</span><i>${b.first.slice(0, 4)}</i>`;
    boards.appendChild(n);
  });

  /* ---------------- INSTAGRAM ---------------- */
  const ig = D.instagram;
  const row = (n, label) => `<div><dt>${label}</dt><dd>${nf.format(n)}</dd></div>`;
  $('#ledger-me').innerHTML = row(ig.posts, 'PUBLICACIONES EN MI PERFIL') + row(ig.stories, 'HISTORIAS (2025—2026)') + row(ig.saved, 'PUBLICACIONES GUARDADAS');
  $('#ledger-them').innerHTML =
    row(ig.postsViewed, `PUBLICACIONES QUE VI · ${fmtDate(ig.viewWindow[0])}—${fmtDate(ig.viewWindow[1])}`) +
    row(ig.videosWatched, 'VÍDEOS QUE VI · MISMAS DOS SEMANAS') +
    row(ig.liked, 'ME GUSTA REGISTRADOS') +
    row(ig.advertisers, 'ANUNCIANTES CON LISTAS QUE COINCIDEN CON MI PERFIL');

  const algoTags = ['fyp', 'explore', 'viral', 'reels', 'reel', 'trending', 'explorepage', 'relatable', 'aesthetic', 'foryou', 'foryoupage'];
  const meTags = ig.topHashtags.filter(t => !algoTags.includes(t)).slice(0, 22);
  const algo = ig.topHashtags.filter(t => algoTags.includes(t));
  const cloud = (ul, list) => list.forEach((t, i) => ul.appendChild(el('li', '', `#${esc(t)}`)).style.setProperty('--i', i));
  cloud($('#tags-me'), meTags);
  cloud($('#tags-algo'), algo);

  const fb = $('#following-bars');
  const maxF = Math.max(...ig.followingPerYear.map(f => f.n));
  ig.followingPerYear.forEach(f => fb.appendChild(el('div', 'fb', `<span class="fb-bar" style="--h:${(f.n / maxF * 100).toFixed(1)}%"></span><b>${f.n}</b><span>${f.year}</span>`)));

  /* ---------------- ECOS ---------------- */
  const echo = $('#echo-grid');
  const cards = [
    ['SPOTIFY', `${nf.format(Math.round(sp.echoHours))} h`, `escuchando a BTS y a sus miembros en solitario. La primera canción del archivo ya era suya: «${esc(sp.firstTrack.name)}».`],
    ['INSTAGRAM', nf.format(ig.echoSaved), 'publicaciones guardadas con etiquetas de BTS o Jungkook, entre las más repetidas de mis guardados.'],
    ['PINTEREST', nf.format(pt.echoSearches), 'búsquedas con el nombre de Jungkook: zapatillas, botas, iconos. La obsesión también se convierte en imagen.'],
  ];
  cards.forEach(([p, n, t], i) => echo.appendChild(el('article', 'echo-card reveal is-visible', `<span class="echo-top">${p}<i>0${i + 1}</i></span><strong>${n}</strong><p>${t}</p>`)));
})();

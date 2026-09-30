// the confession booth. the banner opens a window holding the write box and
// everything other people have left.
//
// confessions live on the same val that keeps the congregation count. the
// ?confessor= key in the url, given once, is what makes the delete crosses
// appear - the val checks it before it removes anything.
(function () {
  const ENDPOINT = 'https://unlikelyarchivist--ac445c40b04711f1a2641607ee4eb77e.web.val.run/confessions';
  const LIMIT = 300;
  const KEY_STORE = 'circuit-cathedral-confessor';

  const open = document.getElementById('boothOpen');
  const win = document.getElementById('boothWindow');
  if (!open || !win) return;

  const frame = win.querySelector('.booth-frame');
  const closeButton = win.querySelector('.booth-close');
  const form = document.getElementById('boothForm');
  const text = document.getElementById('boothText');
  const count = document.getElementById('boothCount');
  const status = document.getElementById('boothStatus');
  const list = document.getElementById('boothList');

  // the delete key arrives once as ?confessor=... and is remembered after, so
  // the crosses only ever appear for whoever opened that link
  const fromUrl = new URLSearchParams(location.search).get('confessor');
  if (fromUrl) {
    try { localStorage.setItem(KEY_STORE, fromUrl); } catch (e) { /* private window */ }
  }
  function confessorKey() {
    try { return localStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; }
  }

  function load() {
    return cathedralJsonp(ENDPOINT).then(function (d) { return d.entries || []; });
  }

  function send(body) {
    return cathedralJsonp(ENDPOINT, { do: 'confess', text: body })
      .then(function (d) {
        if (d.error) throw new Error(d.error === 'refused' ? 'refused' : 'failed');
        if (d.entries) render(d.entries);
      });
  }

  function remove(id) {
    return cathedralJsonp(ENDPOINT, { do: 'delete', id: id, key: confessorKey() })
      .then(function (d) {
        if (d.error) throw new Error('refused');
        if (d.entries) render(d.entries);
      });
  }

  function render(rows) {
    list.textContent = '';
    if (!rows.length) {
      const empty = document.createElement('p');
      empty.className = 'panel-note';
      empty.textContent = 'no one has confessed yet.';
      list.appendChild(empty);
      return;
    }
    const canDelete = !!confessorKey();
    rows.forEach(function (row) {
      const item = document.createElement('div');
      item.className = 'confession panel-note';
      const body = document.createElement('p');
      body.textContent = row.text;
      item.appendChild(body);
      if (canDelete) {
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'confession-delete';
        del.title = 'delete';
        del.setAttribute('aria-label', 'delete this confession');
        del.textContent = '✕';
        del.addEventListener('click', function () {
          remove(row.id).then(refresh).catch(function () {
            status.textContent = 'that one would not delete.';
          });
        });
        item.appendChild(del);
      }
      list.appendChild(item);
    });
  }

  function refresh() {
    return load().then(render).catch(function () {
      list.textContent = '';
      const failed = document.createElement('p');
      failed.className = 'panel-note';
      failed.textContent = 'the record is unreachable right now.';
      list.appendChild(failed);
    });
  }

  // every confession is answered with a penance. it names the other two things
  // the priest is waiting on, so the booth is also where you learn them.
  function penance() {
    return 'go and listen to the music, and read scripture.';
  }

  let lastFocus = null;

  function show() {
    lastFocus = document.activeElement;
    win.hidden = false;
    status.textContent = '';
    refresh();
    text.focus();
  }

  function hide() {
    win.hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  open.addEventListener('click', show);
  closeButton.addEventListener('click', hide);
  win.addEventListener('click', function (e) {
    if (!frame.contains(e.target)) hide();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !win.hidden) hide();
  });

  text.addEventListener('input', function () {
    count.textContent = (LIMIT - text.value.length) + ' left';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const body = text.value.trim();
    if (!body) return;
    send(body).then(function () {
      text.value = '';
      count.textContent = LIMIT + ' left';
      status.textContent = penance();
      // the priest in the sidebar is watching for this: a confession is what
      // turns his light green
      document.dispatchEvent(new CustomEvent('cc-confessed'));
      refresh();
    }).catch(function (err) {
      status.textContent = err.message === 'refused'
        ? 'that one the cathedral will not hold.'
        : 'that did not go through. try again.';
    });
  });
}());

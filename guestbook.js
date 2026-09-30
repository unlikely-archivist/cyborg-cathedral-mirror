// the guestbook. same val as the counter and the confession booth; the
// ?confessor= key is what makes the delete crosses appear.
(function () {
  const ENDPOINT = 'https://unlikelyarchivist--ac445c40b04711f1a2641607ee4eb77e.web.val.run/guestbook';
  const LIMIT = 500;
  const KEY_STORE = 'circuit-cathedral-confessor';

  const form = document.getElementById('gbForm');
  if (!form) return;

  const name = document.getElementById('gbName');
  const url = document.getElementById('gbUrl');
  const message = document.getElementById('gbMessage');
  const count = document.getElementById('gbCount');
  const status = document.getElementById('gbStatus');
  const list = document.getElementById('gbList');

  const fromUrl = new URLSearchParams(location.search).get('confessor');
  if (fromUrl) {
    try { localStorage.setItem(KEY_STORE, fromUrl); } catch (e) { /* private window */ }
  }
  function key() {
    try { return localStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; }
  }

  function when(iso) {
    const d = new Date(iso);
    return isNaN(d) ? '' : d.toISOString().slice(0, 10);
  }

  function render(rows) {
    list.textContent = '';
    if (!rows.length) {
      const empty = document.createElement('p');
      empty.className = 'panel-note';
      empty.textContent = 'no one has signed yet.';
      list.appendChild(empty);
      return;
    }
    const canDelete = !!key();
    rows.forEach(function (row) {
      const entry = document.createElement('div');
      entry.className = 'gb-entry panel-note';

      const head = document.createElement('p');
      head.className = 'gb-who';
      if (row.url) {
        const link = document.createElement('a');
        link.href = row.url;
        link.rel = 'nofollow noopener';
        link.textContent = row.name;
        head.appendChild(link);
      } else {
        head.appendChild(document.createTextNode(row.name));
      }
      const date = document.createElement('span');
      date.className = 'gb-date';
      date.textContent = when(row.at);
      head.appendChild(date);
      entry.appendChild(head);

      const body = document.createElement('p');
      body.className = 'gb-message';
      body.textContent = row.message;
      entry.appendChild(body);

      if (canDelete) {
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'confession-delete';
        del.title = 'delete';
        del.setAttribute('aria-label', 'delete this entry');
        del.textContent = '✕';
        del.addEventListener('click', function () {
          cathedralJsonp(ENDPOINT, { do: 'delete', id: row.id, key: key() })
            .then(function (d) {
              if (d.entries) render(d.entries); else refresh();
            });
        });
        entry.appendChild(del);
      }

      list.appendChild(entry);
    });
  }

  function refresh() {
    return cathedralJsonp(ENDPOINT).then(function (d) { render(d.entries || []); })
      .catch(function () {
        list.textContent = '';
        const failed = document.createElement('p');
        failed.className = 'panel-note';
        failed.textContent = 'the book is unreachable right now.';
        list.appendChild(failed);
      });
  }

  message.addEventListener('input', function () {
    count.textContent = (LIMIT - message.value.length) + ' left';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    cathedralJsonp(ENDPOINT, {
      do: 'sign',
      name: name.value.trim(),
      url: url.value.trim(),
      message: message.value.trim()
    }).then(function (d) {
      if (d.error) throw new Error(d.error === 'refused' ? 'refused' : 'failed');
      if (d.entries) render(d.entries);
      name.value = '';
      url.value = '';
      message.value = '';
      count.textContent = LIMIT + ' left';
      status.textContent = 'signed. thank you for coming.';
    }).catch(function (err) {
      status.textContent = err.message === 'refused'
        ? 'that one the cathedral will not hold.'
        : 'that did not go through. try again.';
    });
  });

  refresh();
}());

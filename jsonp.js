// Neocities serves every page with `connect-src 'self'`, which forbids fetch()
// to any other domain - so every call to the val goes out as a <script> tag
// and comes back as a function call instead. `script-src` is a wildcard, which
// is why this gets through where fetch does not.
window.cathedralJsonp = function (url, params) {
  return new Promise(function (resolve, reject) {
    const name = '__cc' + Math.random().toString(36).slice(2);
    const search = new URLSearchParams(params || {});
    search.set('callback', name);

    const tag = document.createElement('script');
    let settled = false;

    function cleanup() {
      settled = true;
      try { delete window[name]; } catch (e) { window[name] = undefined; }
      if (tag.parentNode) tag.parentNode.removeChild(tag);
    }

    window[name] = function (data) {
      if (settled) return;
      cleanup();
      resolve(data || {});
    };

    tag.onerror = function () {
      if (settled) return;
      cleanup();
      reject(new Error('unreachable'));
    };

    setTimeout(function () {
      if (settled) return;
      cleanup();
      reject(new Error('timeout'));
    }, 12000);

    tag.src = url + (url.indexOf('?') === -1 ? '?' : '&') + search.toString();
    document.head.appendChild(tag);
  });
};

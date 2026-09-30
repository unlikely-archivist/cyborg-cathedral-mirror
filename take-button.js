// copy the "take my button" embed code to the clipboard
//
// One of these per button on offer, so the panel can hold as many as it likes:
// each row carries its own code, copy button and status.
(function () {
  document.querySelectorAll('.take-body').forEach(function (row) {
    const code = row.querySelector('.take-code');
    const copy = row.querySelector('.take-copy');
    const status = row.querySelector('.take-status');
    if (!code || !copy || !status) return;

    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.value);
        status.textContent = 'copied';
      } catch (err) {
        code.select();
        status.textContent = 'press ctrl+c';
      }
    });
  });
})();

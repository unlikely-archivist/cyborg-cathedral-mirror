// copy an adoptable's embed code to the clipboard. each button carries the
// code on a data attribute, so one handler serves every adoptable on a page.
(function () {
  const buttons = document.querySelectorAll('.adopt-copy');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const status = button.parentElement.querySelector('.adopt-status');
      try {
        await navigator.clipboard.writeText(button.dataset.code);
        status.textContent = 'copied';
      } catch (err) {
        status.textContent = 'copy failed - the code is under the picture';
      }
    });
  });
})();

document.addEventListener('keydown', (event) => {
  window.parent.postMessage(event.key);
});
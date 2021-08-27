window.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    if (link.href && link.href.indexOf('http') === 0) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
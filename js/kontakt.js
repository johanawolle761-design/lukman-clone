// Kontaktformular für die statische GitHub-Pages-Spiegelung.
// Das Original sendet an /api/kontakt inkl. Cloudflare Turnstile.
// Hier öffnet Absenden den Mail-Client mit vorausgefüllter Nachricht.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var button = document.getElementById('contact-submit');
  var status = document.getElementById('contact-status');

  function setStatus(text, type) {
    status.textContent = text;
    status.className = 'form-status' + (type ? ' is-' + type : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    if (data.get('website')) {
      setStatus('Absenden fehlgeschlagen.', 'error');
      return;
    }

    var name = String(data.get('name') || '').trim();
    var email = String(data.get('email') || '').trim();
    var nachricht = String(data.get('nachricht') || '').trim();

    var subject = encodeURIComponent('Kontaktanfrage von ' + name);
    var body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'E-Mail: ' + email + '\n\n' +
      nachricht
    );

    button.disabled = true;
    setStatus('Mail-Programm wird geöffnet …');
    window.location.href = 'mailto:kontakt@lukmanhussein.de?subject=' + subject + '&body=' + body;

    setTimeout(function () {
      button.disabled = false;
      setStatus('Wenn kein Mail-Programm geöffnet wurde, schreib an kontakt@lukmanhussein.de', 'ok');
    }, 600);
  });
})();

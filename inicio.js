// Mensual / Anual: cambia precios y ligas de pago; OXXO solo en anual (Stripe no lo acepta en suscripciones)
// (En archivo aparte y no dentro de index.html: la política de seguridad del sitio, en vercel.json, solo
// deja correr scripts del propio sitio.)
(function () {
  var botones = document.querySelectorAll('.periodo button');
  function elegir(periodo) {
    botones.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.periodo === periodo)); });
    document.querySelectorAll('.precio').forEach(function (p) {
      p.firstChild.textContent = p.dataset[periodo] + ' ';
      p.querySelector('small').textContent = periodo === 'anual' ? '/año' : '/mes';
    });
    document.querySelectorAll('.plan .boton').forEach(function (a) { a.href = a.dataset[periodo]; });
    document.querySelectorAll('.plan .oxxo').forEach(function (a) { a.hidden = periodo !== 'anual'; });
  }
  botones.forEach(function (b) { b.addEventListener('click', function () { elegir(b.dataset.periodo); }); });

  // Regreso desde Stripe
  var pago = new URLSearchParams(location.search).get('pago');
  if (pago === 'ok' || pago === 'oxxo') {
    var aviso = document.createElement('div');
    aviso.className = 'aviso-pago';
    aviso.setAttribute('role', 'status');
    aviso.innerHTML = pago === 'ok'
      ? '<b>¡Gracias por tu pago!</b> Tu licencia se activa sola: entra a READ con el correo con el que pagaste.'
      : '<b>¡Listo!</b> Paga tu ficha en cualquier OXXO. Cuando se acredite (hasta 1 día hábil) tu licencia se activa sola: entra a READ con el correo que usaste.';
    document.body.insertBefore(aviso, document.querySelector('header'));
    history.replaceState(null, '', location.pathname);
  }
})();

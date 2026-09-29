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
    // Descuento de bienvenida (20 % el primer mes, primera compra): solo en el plan mensual
    document.querySelectorAll('.plan .oferta').forEach(function (p) { p.hidden = periodo !== 'mensual'; });
  }
  botones.forEach(function (b) { b.addEventListener('click', function () { elegir(b.dataset.periodo); }); });

  // Regreso desde Stripe: el servidor (.htaccess) manda /?pago=ok a /gracias y /?pago=oxxo a /gracias-oxxo.
  // Esto es solo el respaldo por si esa regla no corre (p. ej. en la vista previa local).
  var pago = new URLSearchParams(location.search).get('pago');
  if (pago === 'ok') location.replace('gracias.html');
  else if (pago === 'oxxo') location.replace('gracias-oxxo.html');
})();

// Aviso de bienvenida al abrir la página: «Reclama tu 20 % de bienvenida en tu primer mes».
// Sale una vez por visita (no vuelve a salir al recargar en la misma pestaña) y nunca al regresar de Stripe.
// Se arma aquí mismo (sin tocar index.html) y va en archivo aparte porque la política de seguridad del
// sitio solo deja correr scripts del propio sitio.
(function () {
  var CLAVE = 'read-bienvenida-vista';
  if (typeof HTMLDialogElement !== 'function') return;
  if (new URLSearchParams(location.search).get('pago')) return;
  try { if (sessionStorage.getItem(CLAVE)) return; } catch (e) { /* sin almacenamiento: se muestra */ }

  var dialogo = document.createElement('dialog');
  dialogo.className = 'bienvenida';
  dialogo.setAttribute('aria-labelledby', 'bienvenida-titulo');
  dialogo.innerHTML =
    '<div class="caja">' +
      '<button type="button" class="cerrar" data-cerrar aria-label="Cerrar">&times;</button>' +
      '<div class="sello" aria-hidden="true">20 %</div>' +
      '<h2 id="bienvenida-titulo">Reclama tu 20 % de bienvenida en tu primer mes</h2>' +
      '<p>Por ser tu primera compra de READ en cualquier plan mensual. El descuento ya va aplicado al contratar.</p>' +
      '<a class="boton naranja" href="#planes" data-reclamar>Reclamar mi 20 %</a>' +
      '<button type="button" class="ahora-no" data-cerrar>Ahora no</button>' +
    '</div>';
  document.body.appendChild(dialogo);

  function marcarVisto() {
    try { sessionStorage.setItem(CLAVE, '1'); } catch (e) { /* nada */ }
  }
  function cerrar() { marcarVisto(); dialogo.close(); }

  dialogo.querySelectorAll('[data-cerrar]').forEach(function (b) { b.addEventListener('click', cerrar); });
  dialogo.querySelector('[data-reclamar]').addEventListener('click', function () {
    cerrar();
    // Deja elegido el plan mensual, que es donde aplica el descuento
    var mensual = document.querySelector('.periodo button[data-periodo="mensual"]');
    if (mensual) mensual.click();
  });
  dialogo.addEventListener('click', function (e) { if (e.target === dialogo) cerrar(); }); // clic fuera
  dialogo.addEventListener('cancel', marcarVisto); // tecla Esc

  setTimeout(function () { if (document.body.contains(dialogo)) dialogo.showModal(); }, 700);
})();

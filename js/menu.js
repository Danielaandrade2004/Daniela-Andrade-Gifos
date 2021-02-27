// APERTURA Y CIERRE DE MENU HAMBURGUESA
document.getElementById("btn-menu").addEventListener("click", mostrarMenu);
function mostrarMenu(){
  let menu = document.getElementById("lista");
  let boton = document.getElementById("brgr");

  if (menu.classList.contains("disable-menu")) {
    menu.classList.remove("disable-menu");
    menu.classList.add("enable-menu");
    boton.classList.remove("fa-bars");
    boton.classList.add("fa-times");
  } else {
    menu.classList.remove("enable-menu");
    menu.classList.add("disable-menu");
    boton.classList.remove("fa-times");
    boton.classList.add("fa-bars");
  }
}
// EJECUCION DE CARGA
window.onload = inicio;
function inicio() {
  seteoDark();
  document.getElementById("input-srch").value = "";
  document.getElementById("input-srch-top").value = "";
  document.getElementById("grabargif").style.display = "none";
  trending();
}
var offsetSearch = 0;
const desktop = 820;
var offsetFav = 12;

// RECARGA PAGINA LOGO
document.getElementById("logo").addEventListener("click", recargar);
function recargar() {
  location.reload();
  document.getElementById("input-srch").value = "";
  document.getElementById("input-srch-top").value = "";
}

// BUSQUEDA FOCO
document.getElementById("input-srch").addEventListener("focus", inputBuqueda);
function inputBuqueda() {
  if (screen.width < desktop) {
    document.getElementById("img-header").style.display = "none";
    document.getElementById("p-title").style.display = "none";
    document.getElementById("search").style.marginTop = "17px";
    document.getElementById("srch-btn").classList.add("fa-times");
    document.getElementById("srch-btn").classList.remove("fa-search");
  } else {
    document.getElementById("srch-btn").classList.add("fa-times");
    document.getElementById("srch-btn").classList.remove("fa-search");
  }
}
document.getElementById("input-srch-top").addEventListener("focus", inputBuquedaTop);
function inputBuquedaTop() {
  if (screen.width < desktop) {
    document.getElementById("srch-drk-top-faw").classList.add("fa-times");
    document.getElementById("srch-drk-top-faw").classList.remove("fa-search");
  } else {
    document.getElementById("srch-drk-top-faw").classList.add("fa-times");
    document.getElementById("srch-drk-top-faw").classList.remove("fa-search");
  }
}

// CERRAR BUSQUEDA
document.getElementById("sp-srch-btn").addEventListener("click", outputBuqueda);
function outputBuqueda() {
  document.getElementById("img-header").style.display = "initial";
  document.getElementById("p-title").style.display = "block";
  document.getElementById("search").style.marginTop = "0px";
  document.getElementById("input-srch").setAttribute("placeholder", "Busca GIFOS y más");
  document.getElementById("input-srch").value = "";
  document.getElementById("srch-btn").classList.remove("fa-times");
  document.getElementById("srch-btn").classList.add("fa-search");
  document.getElementById("srch-opc").style.display = "none";
  document.getElementById("srch-btn-lft").style.visibility = "hidden";
  document.getElementById("sugerir").style.display = "none";
  document.getElementById("p-trending").style.display = "block";
  document.getElementById("title-trending").style.display = "block";
  eliminarSugerencias();
}
document.getElementById("srch-drk-top").addEventListener("click", outputBuquedaTop);
function outputBuquedaTop() {
  document.getElementById("img-header").style.display = "initial";
  document.getElementById("p-title").style.display = "block";
  document.getElementById("search").style.marginTop = "0px";
  document.getElementById("input-srch-top").setAttribute("placeholder", "Busca GIFOS y más");
  document.getElementById("input-srch-top").value = "";
  document.getElementById("srch-drk-top-faw").classList.remove("fa-times");
  document.getElementById("srch-drk-top-faw").classList.add("fa-search");
  document.getElementById("srch-opc").style.display = "none";
  document.getElementById("sugerir").style.display = "none";
  document.getElementById("p-trending").style.display = "none";
  document.getElementById("title-trending").style.display = "none";
  eliminarSugerencias();
}

// BUSQUEDA CON ENTER
document.getElementById("input-srch").addEventListener("keydown", resultadoBusqueda);
function resultadoBusqueda() {
  let srchOpc = document.getElementById("srch-opc");
  let textoIntoducido = document.getElementById("input-srch").value;
  if (event.which === 13 || event.keyCode == 13 || enter === true) {
    if (textoIntoducido.length != 0) {
      document.getElementById("title-srch").textContent = textoIntoducido;
      document.getElementById("input-srch").setAttribute("placeholder", "Busca GIFOS y más");
      srchOpc.style.display = "initial";
      arregloGifsSearch.length = 0;
      offsetSearch = 0;
      eliminarGrid();
      search(textoIntoducido);
      eliminarSugerencias();
      document.getElementById("sugerir").style.display = "none";
      document.getElementById("p-trending").style.display = "block";
      document.getElementById("title-trending").style.display = "block";
      document.getElementById("input-srch-top").value = "";
      document.getElementById("srch-drk-top-faw").classList.remove("fa-times");
      document.getElementById("srch-drk-top-faw").classList.add("fa-search");
    } else {
      document.getElementById("input-srch").setAttribute("placeholder", "Alguien olvido escribir aqui...");
      srchOpc.style.display = "none";
    }
  }
}
document.getElementById("input-srch-top").addEventListener("keydown", resultadoBusquedaTop);
function resultadoBusquedaTop() {
  let srchOpc = document.getElementById("srch-opc");
  let textoIntoducido = document.getElementById("input-srch-top").value;
  if (event.which === 13 || event.keyCode == 13) {
    if (textoIntoducido.length != 0) {
      document.getElementById("title-srch").textContent = textoIntoducido;
      document.getElementById("input-srch-top").setAttribute("placeholder", "Busca GIFOS y más");
      srchOpc.style.display = "initial";
      arregloGifsSearch.length = 0;
      offsetSearch = 0;
      eliminarGrid();
      search(textoIntoducido);
      eliminarSugerencias();
      document.getElementById("title-misgifos").style.display = "none";
      document.getElementById("icon-misgifos").style.display = "none";
      document.getElementById("title-favoritos").style.display = "none";
      document.getElementById("icon-favoritos").style.display = "none";
      document.getElementById("fav-sincontenido").style.display = "none";
      document.getElementById("text-fav-sc").style.display = "none";
      document.getElementById("input-srch").value = "";
      document.getElementById("srch-btn").classList.remove("fa-times");
      document.getElementById("srch-btn").classList.add("fa-search");
    } else {
      document.getElementById("input-srch-top").setAttribute("placeholder", "Alguien olvido escribir aqui...");
      srchOpc.style.display = "none";
    }
  }
}

// BUSQUEDA INPUT
document.getElementById("input-srch").addEventListener("input", inputTextBusqueda);
const apiKey = "0m6p9UIK0QqEfA8GmlLnGoKcW873s8Ld";
let enter = false;
function inputTextBusqueda() {
  let botonLupa = document.getElementById("srch-btn");
  if (document.getElementById("input-srch").value.length != 0) {
    botonLupa.classList.add("fa-times");
    botonLupa.classList.remove("fa-search");
    document.getElementById("title-misgifos").style.display = "none";
    document.getElementById("icon-misgifos").style.display = "none";
    document.getElementById("title-favoritos").style.display = "none";
    document.getElementById("icon-favoritos").style.display = "none";
    document.getElementById("p-trending").style.display = "none";
    document.getElementById("title-trending").style.display = "none";
    document.getElementById("sugerir").style.display = "flex";
    document.getElementById("srch-btn-lft").style.visibility = "initial";
  } else {
    botonLupa.classList.remove("fa-search");
    botonLupa.classList.add("fa-times");
    document.getElementById("sugerir").style.display = "none";
    document.getElementById("srch-btn-lft").style.visibility = "hidden";
    document.getElementById("p-trending").style.display = "block";
    document.getElementById("title-trending").style.display = "block";
  }
  suggestion();
}

// SUGERENCIAS
function suggestion() {
  let buscarSugerencia = document.getElementById("input-srch").value;
  const apiSuggestion = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${buscarSugerencia}`;
  fetch(apiSuggestion)
    .then(response => {
      return response.json();
    })
    .then(json => {
      /* console.log(json); */
      eliminarSugerencias();
      if (document.getElementById("input-srch").value.length != 0) {
        for (i = 0; i < json.data.length; i++) {
          let palabraSug = document.createElement("label");
          document.getElementById("sugerir").appendChild(palabraSug);
          palabraSug.setAttribute("class", "sugerencia");
          palabraSug.setAttribute("title", json.data[i].name)
          palabraSug.textContent = json.data[i].name;
          palabraSug.addEventListener("click", function () {
            document.getElementById("input-srch").value
            document.getElementById("input-srch").value = event.target.title;
            /* console.log(event.target); */
            enter = true;
            resultadoBusqueda();
            enter = false;
          });
        };
      } else {
        eliminarSugerencias();
      }
    })
    .catch(err => console.log(err));
}

// CONEXION GIPHY PARA BUSQUEDA
function search(busqueda) {
  let palabraClave = busqueda;
  const cantidadResultados = 12;
  const apiSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${palabraClave}&limit=${cantidadResultados}&offset=${offsetSearch}&rating=g&lang=es`;

  fetch(apiSearch)
    .then(response => {
      return response.json();
    })
    .then(json => {
      if (json.data.length !== 0) {
        textoIntoducido = palabraClave;
        for (i = 0; i < cantidadResultados; i++) {
          function objetoGif(url, username, title, id) {
            this.url = url;
            this.username = username;
            this.title = title;
            this.id = id;
          };
          let usernameCompleto;
          if (json.data[i].username.length != 0) {
            usernameCompleto = json.data[i].username;
          } else {
            usernameCompleto = "Usuario desconocido";
          };
          let objetoArray = new objetoGif(json.data[i].images.original.url, usernameCompleto, json.data[i].title, json.data[i].id);
          arregloGifsSearch.push(objetoArray);
        }
        for (i = offsetSearch; i < cantidadResultados + offsetSearch; i++) {
          let gifSearch = document.createElement("img");
          if (screen.width >= desktop) {
            let hoverSearch = document.createElement("div");
            document.getElementById("grid-srch").appendChild(hoverSearch);
            hoverSearch.setAttribute("id", "hoverS" + i)
            hoverSearch.setAttribute("class", "contenedorSearch");
            document.getElementById("hoverS" + i).appendChild(gifSearch);
            hoverCardsS(arregloGifsSearch[i].id, arregloGifsSearch[i].url, arregloGifsSearch[i].title, arregloGifsSearch[i].username, i);
          } else {
            document.getElementById("grid-srch").appendChild(gifSearch);
          }
          gifSearch.setAttribute("src", "/assets/trabajando.png")
          gifSearch.setAttribute("class", "img-srch");
          gifSearch.setAttribute("id", arregloGifsSearch[i].id);
          gifSearch.setAttribute("src", arregloGifsSearch[i].url);
          gifSearch.setAttribute("title", arregloGifsSearch[i].title);
          gifSearch.setAttribute("alt", arregloGifsSearch[i].username);
          if (screen.width >= desktop) {
            precargaFavSea(arregloGifsSearch[i].id, i);
          }
          gifSearch.addEventListener("click", function () {
            if (screen.width <= desktop) {
              abrirGifosMax();
            }
          });
        }
        document.getElementById("search-sinresultado").style.display = "none";
        document.getElementById("text-sinresultado").style.display = "none";
        document.getElementById("ver-mas").style.display = "block";
      } else {
        document.getElementById("search-sinresultado").style.display = "block";
        document.getElementById("text-sinresultado").style.display = "block";
        document.getElementById("ver-mas").style.display = "none";
      }
      document.getElementById("ver-mas-fav").style.display = "none";
    })
    .catch(err => console.log(err));
}
let arregloGifsSearch = [];

// CONEXION GIPHY PARA TRENDING
function trending() {
  const apiTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`;

  fetch(apiTrending)
    .then(response => {
      return response.json();
    })
    .then(json => {
      /* console.log(json) */
      for (i = 0; i < 25; i++) {
        function objetoTrending(url, username, title, id) {
          this.url = url;
          this.username = username;
          this.title = title;
          this.id = id;
        }
        let usernameCompleto;
        if (json.data[i].username.length != 0) {
          usernameCompleto = json.data[i].username;
        } else {
          usernameCompleto = "Usuario desconocido";
        }
        let objetoArrayT = new objetoTrending(json.data[i].images.original.url, usernameCompleto, json.data[i].title, json.data[i].id)
        arregloGifsTrending.push(objetoArrayT)
      }
      /* console.log(arregloGifsTrending); */
      for (i = 0; i < 25; i++) {
        let gifTrending = document.createElement("img");
        if (screen.width >= desktop) {
          let hoverTrending = document.createElement("div");
          document.getElementById("trndng-view").appendChild(hoverTrending);
          hoverTrending.setAttribute("id", "hoverT" + i)
          hoverTrending.setAttribute("class", "contenedorTrending");
          document.getElementById("hoverT" + i).appendChild(gifTrending);
          hoverCardsT(arregloGifsTrending[i].id, arregloGifsTrending[i].url, arregloGifsTrending[i].title, arregloGifsTrending[i].username, i);
        } else {
          document.getElementById("trndng-view").appendChild(gifTrending);
        }
        gifTrending.setAttribute("src", "/assets/trabajando.png")
        gifTrending.setAttribute("class", "img-trndng");
        gifTrending.setAttribute("id", arregloGifsTrending[i].id);
        gifTrending.setAttribute("src", arregloGifsTrending[i].url);
        gifTrending.setAttribute("title", arregloGifsTrending[i].title);
        gifTrending.setAttribute("alt", arregloGifsTrending[i].username);
        if (screen.width >= desktop) {
          precargaFavTre(arregloGifsTrending[i].id, i);
        }
        gifTrending.addEventListener("click", function () {
          if (screen.width <= desktop) {
            abrirGifosMax();
          }
        });
      }
    })
    .catch(err => console.log(err));
}
let arregloGifsTrending = [];

// VER MAS
document.getElementById("ver-mas").addEventListener("click", verMas);
function verMas() {
  offsetSearch = offsetSearch + 12
  search(textoIntoducido);
}

// ELIMINAR ELEMENTOS CREADOS
function eliminarGrid() {
  let borraGridSearch = document.getElementById("grid-srch");
  while (borraGridSearch.firstChild) {
    borraGridSearch.removeChild(borraGridSearch.firstChild);
  }
}
function eliminarSugerencias() {
  while (document.getElementById("sugerir").firstChild) {
    document.getElementById("sugerir").removeChild(document.getElementById("sugerir").firstChild);
  }
}

// DESPLAZAMIENTO TRENDING
document.getElementById("scroll-right").addEventListener("click", function () {
  if (screen.width >= desktop && screen.width < 1280) {
    document.getElementById("trndng-view").scrollLeft += 658;
  }
  if ((screen.width >= 1280)) {
    document.getElementById("trndng-view").scrollLeft += 1158;
  }
})
document.getElementById("scroll-left").addEventListener("click", function () {
  if (screen.width >= desktop && screen.width < 1280) {
    document.getElementById("trndng-view").scrollLeft -= 658;
  }
  if ((screen.width >= 1280)) {
    document.getElementById("trndng-view").scrollLeft -= 1158;
  }
})

// SCROLL VERTICAL
window.onscroll = function () {
  if (screen.width >= desktop) {
    var scroll = document.documentElement.scrollTop;
    if (scroll > 10) {
      document.getElementById("header").style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
      document.getElementById("li-agregar-gif").style.visibility = "hidden";
      if (screen.width >= 1280 && scroll > 350) {
        document.getElementById("nav-search").style.visibility = "visible";
      } else {
        document.getElementById("nav-search").style.visibility = "hidden";
      }
    } else {
      document.getElementById("header").style.boxShadow = "";
      document.getElementById("li-agregar-gif").style.visibility = "visible";
      document.getElementById("nav-search").style.visibility = "hidden";
    }
  }
}
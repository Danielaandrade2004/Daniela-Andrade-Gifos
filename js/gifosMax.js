// GIFOS MAX
let eventoMax;
function abrirGifosMax() {
  document.getElementById("home").style.display = "none";
  document.getElementById("trending").style.display = "none";
  document.getElementById("footer").style.display = "none";
  document.getElementById("grabargif").style.display = "none";
  document.getElementById("misgifos").style.display = "none";
  document.getElementById("btn-menu").style.display = "none";
  document.getElementById("gifosmax").style.display = "grid";
  document.getElementById("nav-search").style.visibility = "hidden";
  imgmax.src = event.target.src;
  usermax.textContent = event.target.alt;
  titlemax.textContent = event.target.title;
  eventoMax = event.target.id;

  if (JSON.stringify(arregloFavoritos).includes(JSON.stringify(eventoMax))) {
    document.getElementById("botonFavorito").removeAttribute("class", "far");
    document.getElementById("botonFavorito").setAttribute("class", "fas");
  } else {
    document.getElementById("botonFavorito").removeAttribute("class", "fas");
    document.getElementById("botonFavorito").setAttribute("class", "far");
  }

  // DESCARGA GIFOS MAX
  document.getElementById("downmax-box").addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(imgmax.src);
    console.log(response);
    let gif = await response.blob();
    a.download = 'Gif';
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  })
};

// PRECARGA FAVORITOS
function precargaFavTre(id, posicion) {
  if (arregloFavoritos.length != 0) {
    if (localStorage.getItem("arregloFav").includes(JSON.stringify(id))) {
      document.getElementById("favHovT" + posicion).removeAttribute("class", "far fa-heart");
      document.getElementById("favHovT" + posicion).setAttribute("class", "fas fa-heart");
    } else {
      document.getElementById("favHovT" + posicion).removeAttribute("class", "fas fa-heart");
      document.getElementById("favHovT" + posicion).setAttribute("class", "far fa-heart");
    }
  }
}
function precargaFavSea(id, posicion) {
  if (arregloFavoritos.length != 0) {
    if (localStorage.getItem("arregloFav").includes(JSON.stringify(id))) {
      document.getElementById("favHovS" + posicion).removeAttribute("class", "far fa-heart");
      document.getElementById("favHovS" + posicion).setAttribute("class", "fas fa-heart");
    } else {
      document.getElementById("favHovS" + posicion).removeAttribute("class", "fas fa-heart");
      document.getElementById("favHovS" + posicion).setAttribute("class", "far fa-heart");
    }
  }
}
function precargaFavFav(id, posicion) {
  if (arregloFavoritos.length != 0) {
    if (localStorage.getItem("arregloFav").includes(JSON.stringify(id))) {
      document.getElementById("favHovF" + posicion).removeAttribute("class", "far fa-heart");
      document.getElementById("favHovF" + posicion).setAttribute("class", "fas fa-heart");
    } else {
      document.getElementById("favHovF" + posicion).removeAttribute("class", "fas fa-heart");
      document.getElementById("favHovF" + posicion).setAttribute("class", "far fa-heart");
    }
  }
}

// FAVORITO GIFOS MAX
document.getElementById("favmax-box").addEventListener("click", function () {
  function objetoFav(url, username, title, id) {
    this.url = url;
    this.username = username;
    this.title = title;
    this.id = id;
  };
  let imgEvento = document.getElementById(eventoMax);
  let objetoArray = new objetoFav(imgEvento.src, imgEvento.alt, imgEvento.title, imgEvento.id);
  if (arregloFavoritos.length === 0) {
    arregloFavoritos.push(objetoArray);
    localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
    document.getElementById("botonFavorito").removeAttribute("class", "far");
    document.getElementById("botonFavorito").setAttribute("class", "fas");
  } else {
    if (JSON.stringify(arregloFavoritos).indexOf(JSON.stringify(objetoArray.id)) == -1) {
      arregloFavoritos.push(objetoArray);
      localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      document.getElementById("botonFavorito").removeAttribute("class", "far");
      document.getElementById("botonFavorito").setAttribute("class", "fas");
    } else {
      for (i = 0; i < arregloFavoritos.length; i++) {
        if (JSON.stringify(arregloFavoritos[i].id) === JSON.stringify(objetoArray.id)) {
          arregloFavoritos.splice(i, 1);
          localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
          document.getElementById("botonFavorito").removeAttribute("class", "fas");
          document.getElementById("botonFavorito").setAttribute("class", "far");
        }
      }
    }
  }
  if (arregloFavoritos.length !== 0) {
    document.getElementById("fav-sincontenido").style.display = "none";
    document.getElementById("text-fav-sc").style.display = "none";
  } else {
    document.getElementById("fav-sincontenido").style.display = "block";
    document.getElementById("text-fav-sc").style.display = "block";
  }
});

let arregloFavoritos = [];
if (localStorage.getItem("arregloFav") != null) {
  arregloFavoritos = JSON.parse(localStorage.getItem("arregloFav"));
}

// CERRAR GIFOS MAX
document.getElementById("close-btn").addEventListener("click", function () {
  document.getElementById("home").style.display = "initial";
  document.getElementById("trending").style.display = "block";
  if (window.screen < desktop) {
    document.getElementById("footer").style.display = "initial";
  } else {
    document.getElementById("footer").style.display = "grid";
  }
  document.getElementById("btn-menu").style.display = "initial";
  document.getElementById("gifosmax").style.display = "none";
});

// HOVER CARDS
function hoverCardsT(id, url, title, username, posicionT) {
  let usuarioHover = document.createElement("h4");
  document.getElementById("hoverT" + i).appendChild(usuarioHover);
  usuarioHover.setAttribute("id", "usuarioHoverT" + i)
  usuarioHover.setAttribute("class", "usuarioHoverT");
  usuarioHover.textContent = arregloGifsTrending[i].username;

  let tituloHover = document.createElement("p");
  document.getElementById("hoverT" + i).appendChild(tituloHover);
  tituloHover.setAttribute("id", "tituloHoverT" + i)
  tituloHover.setAttribute("class", "tituloHoverT");
  tituloHover.textContent = arregloGifsTrending[i].title;

  let contFavHover = document.createElement("div");
  let favHover = document.createElement("i");
  document.getElementById("hoverT" + i).appendChild(contFavHover).appendChild(favHover);
  contFavHover.setAttribute("id", "favHoverT" + i)
  contFavHover.setAttribute("class", "favHoverT");
  favHover.setAttribute("class", "far fa-heart");
  favHover.setAttribute("id", "favHovT" + i)

  let contDowHover = document.createElement("div");
  let downHover = document.createElement("i");
  document.getElementById("hoverT" + i).appendChild(contDowHover).appendChild(downHover);
  contDowHover.setAttribute("id", "downHoverT" + i)
  contDowHover.setAttribute("class", "downHoverT");
  downHover.setAttribute("class", "fas fa-download");

  let contMaxHover = document.createElement("div");
  let maxHover = document.createElement("i");
  document.getElementById("hoverT" + i).appendChild(contMaxHover).appendChild(maxHover);
  contMaxHover.setAttribute("id", "maxHoverT" + i)
  contMaxHover.setAttribute("class", "maxHoverT");
  maxHover.setAttribute("class", "fas fa-expand-alt");

  contFavHover.addEventListener("click", function () {
    function objetoFav(url, username, title, id) {
      this.url = url;
      this.username = username;
      this.title = title;
      this.id = id;
    };
    let objetoArray = new objetoFav(url, username, title, id);
    if (arregloFavoritos.length === 0) {
      arregloFavoritos.push(objetoArray);
      localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      document.getElementById("favHovT" + posicionT).removeAttribute("class", "far");
      document.getElementById("favHovT" + posicionT).setAttribute("class", "fas");
    } else {
      if (JSON.stringify(arregloFavoritos).indexOf(JSON.stringify(objetoArray.id)) == -1) {
        arregloFavoritos.push(objetoArray);
        localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
        document.getElementById("favHovT" + posicionT).removeAttribute("class", "far");
        document.getElementById("favHovT" + posicionT).setAttribute("class", "fas");
      } else {
        for (i = 0; i < arregloFavoritos.length; i++) {
          if (JSON.stringify(arregloFavoritos[i].id) === JSON.stringify(objetoArray.id)) {
            arregloFavoritos.splice(i, 1);
            localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
            document.getElementById("favHovT" + posicionT).removeAttribute("class", "fas");
            document.getElementById("favHovT" + posicionT).setAttribute("class", "far");
          }
        }
      }
    }
    document.getElementById("fav-sincontenido").style.display = "none";
    document.getElementById("text-fav-sc").style.display = "none"
  });

  contDowHover.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(url);
    console.log(response);
    let gif = await response.blob();
    a.download = 'Gif';
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  })

  contMaxHover.addEventListener("click", function () {
    document.getElementById("home").style.display = "none";
    document.getElementById("trending").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("btn-menu").style.display = "none";
    document.getElementById("gifosmax").style.display = "grid";
    document.getElementById("nav-search").style.visibility = "hidden";
    imgmax.src = url;
    usermax.textContent = username;
    titlemax.textContent = title;
    eventoMax = id;
    if (JSON.stringify(arregloFavoritos).includes(JSON.stringify(eventoMax))) {
      document.getElementById("botonFavorito").removeAttribute("class", "far");
      document.getElementById("botonFavorito").setAttribute("class", "fas");
    } else {
      document.getElementById("botonFavorito").removeAttribute("class", "fas");
      document.getElementById("botonFavorito").setAttribute("class", "far");
    }
    // DESCARGA GIFOS MAX
    document.getElementById("downmax-box").addEventListener("click", async function () {
      let a = document.createElement("a");
      let response = await fetch(imgmax.src);
      console.log(response);
      let gif = await response.blob();
      a.download = 'Gif';
      a.href = window.URL.createObjectURL(gif);
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
      a.click();
    })
  });
}
function hoverCardsS(id, url, title, username, posicionS) {
  let usuarioHover = document.createElement("h4");
  document.getElementById("hoverS" + i).appendChild(usuarioHover);
  usuarioHover.setAttribute("id", "usuarioHoverS" + i)
  usuarioHover.setAttribute("class", "usuarioHoverS");
  usuarioHover.textContent = arregloGifsSearch[i].username;

  let tituloHover = document.createElement("p");
  document.getElementById("hoverS" + i).appendChild(tituloHover);
  tituloHover.setAttribute("id", "tituloHoverS" + i)
  tituloHover.setAttribute("class", "tituloHoverS");
  tituloHover.textContent = arregloGifsSearch[i].title;

  let contFavHover = document.createElement("div");
  let favHover = document.createElement("i");
  document.getElementById("hoverS" + i).appendChild(contFavHover).appendChild(favHover);
  contFavHover.setAttribute("id", "favHoverS" + i)
  contFavHover.setAttribute("class", "favHoverS");
  favHover.setAttribute("class", "far fa-heart");
  favHover.setAttribute("id", "favHovS" + i)

  let contDowHover = document.createElement("div");
  let downHover = document.createElement("i");
  document.getElementById("hoverS" + i).appendChild(contDowHover).appendChild(downHover);
  contDowHover.setAttribute("id", "downHoverS" + i)
  contDowHover.setAttribute("class", "downHoverS");
  downHover.setAttribute("class", "fas fa-download");

  let contMaxHover = document.createElement("div");
  let maxHover = document.createElement("i");
  document.getElementById("hoverS" + i).appendChild(contMaxHover).appendChild(maxHover);
  contMaxHover.setAttribute("id", "maxHoverS" + i)
  contMaxHover.setAttribute("class", "maxHoverS");
  maxHover.setAttribute("class", "fas fa-expand-alt");

  contFavHover.addEventListener("click", function () {
    function objetoFav(url, username, title, id) {
      this.url = url;
      this.username = username;
      this.title = title;
      this.id = id;
    };
    let objetoArray = new objetoFav(url, username, title, id);
    if (arregloFavoritos.length === 0) {
      arregloFavoritos.push(objetoArray);
      localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      document.getElementById("favHovS" + posicionS).removeAttribute("class", "far");
      document.getElementById("favHovS" + posicionS).setAttribute("class", "fas");
    } else {
      if (JSON.stringify(arregloFavoritos).indexOf(JSON.stringify(objetoArray.id)) == -1) {
        arregloFavoritos.push(objetoArray);
        localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
        document.getElementById("favHovS" + posicionS).removeAttribute("class", "far");
        document.getElementById("favHovS" + posicionS).setAttribute("class", "fas");
      } else {
        for (i = 0; i < arregloFavoritos.length; i++) {
          if (JSON.stringify(arregloFavoritos[i].id) === JSON.stringify(objetoArray.id)) {
            arregloFavoritos.splice(i, 1);
            localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
            document.getElementById("favHovS" + posicionS).removeAttribute("class", "fas");
            document.getElementById("favHovS" + posicionS).setAttribute("class", "far");
          }
        }
      }
    }
    document.getElementById("fav-sincontenido").style.display = "none";
    document.getElementById("text-fav-sc").style.display = "none"
  });

  contDowHover.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(url);
    console.log(response);
    let gif = await response.blob();
    a.download = 'Gif';
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  })

  contMaxHover.addEventListener("click", function () {
    document.getElementById("home").style.display = "none";
    document.getElementById("trending").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("btn-menu").style.display = "none";
    document.getElementById("gifosmax").style.display = "grid";
    document.getElementById("nav-search").style.visibility = "hidden";
    imgmax.src = url;
    usermax.textContent = username;
    titlemax.textContent = title;
    eventoMax = id;
    if (JSON.stringify(arregloFavoritos).includes(JSON.stringify(eventoMax))) {
      document.getElementById("botonFavorito").removeAttribute("class", "far");
      document.getElementById("botonFavorito").setAttribute("class", "fas");
    } else {
      document.getElementById("botonFavorito").removeAttribute("class", "fas");
      document.getElementById("botonFavorito").setAttribute("class", "far");
    }
    // DESCARGA GIFOS MAX
    document.getElementById("downmax-box").addEventListener("click", async function () {
      let a = document.createElement("a");
      let response = await fetch(imgmax.src);
      console.log(response);
      let gif = await response.blob();
      a.download = 'Gif';
      a.href = window.URL.createObjectURL(gif);
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
      a.click();
    })
  });
}
function hoverCardsF(id, url, title, username, posicionF) {
  let usuarioHover = document.createElement("h4");
  document.getElementById("hoverF" + i).appendChild(usuarioHover);
  usuarioHover.setAttribute("id", "usuarioHoverF" + i)
  usuarioHover.setAttribute("class", "usuarioHoverF");
  usuarioHover.textContent = arregloFavoritos[i].username;

  let tituloHover = document.createElement("p");
  document.getElementById("hoverF" + i).appendChild(tituloHover);
  tituloHover.setAttribute("id", "tituloHoverF" + i)
  tituloHover.setAttribute("class", "tituloHoverF");
  tituloHover.textContent = arregloFavoritos[i].title;

  let contFavHover = document.createElement("div");
  let favHover = document.createElement("i");
  document.getElementById("hoverF" + i).appendChild(contFavHover).appendChild(favHover);
  contFavHover.setAttribute("id", "favHoverF" + i)
  contFavHover.setAttribute("class", "favHoverF");
  favHover.setAttribute("class", "far fa-heart");
  favHover.setAttribute("id", "favHovF" + i)

  let contDowHover = document.createElement("div");
  let downHover = document.createElement("i");
  document.getElementById("hoverF" + i).appendChild(contDowHover).appendChild(downHover);
  contDowHover.setAttribute("id", "downHoverF" + i)
  contDowHover.setAttribute("class", "downHoverF");
  downHover.setAttribute("class", "fas fa-download");

  let contMaxHover = document.createElement("div");
  let maxHover = document.createElement("i");
  document.getElementById("hoverF" + i).appendChild(contMaxHover).appendChild(maxHover);
  contMaxHover.setAttribute("id", "maxHoverF" + i)
  contMaxHover.setAttribute("class", "maxHoverF");
  maxHover.setAttribute("class", "fas fa-expand-alt");

  contFavHover.addEventListener("click", function () {
    function objetoFav(url, username, title, id) {
      this.url = url;
      this.username = username;
      this.title = title;
      this.id = id;
    };
    let objetoArray = new objetoFav(url, username, title, id);
    if (arregloFavoritos.length === 0) {
      arregloFavoritos.push(objetoArray);
      localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
      document.getElementById("favHovF" + posicionF).removeAttribute("class", "far");
      document.getElementById("favHovF" + posicionF).setAttribute("class", "fas");
    } else {
      if (JSON.stringify(arregloFavoritos).indexOf(JSON.stringify(objetoArray.id)) == -1) {
        arregloFavoritos.push(objetoArray);
        localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
        document.getElementById("favHovF" + posicionF).removeAttribute("class", "far");
        document.getElementById("favHovF" + posicionF).setAttribute("class", "fas");
      } else {
        for (i = 0; i < arregloFavoritos.length; i++) {
          if (JSON.stringify(arregloFavoritos[i].id) === JSON.stringify(objetoArray.id)) {
            arregloFavoritos.splice(i, 1);
            localStorage.setItem("arregloFav", JSON.stringify(arregloFavoritos));
            document.getElementById("favHovF" + posicionF).removeAttribute("class", "fas");
            document.getElementById("favHovF" + posicionF).setAttribute("class", "far");
          }
        }
      }
    }
    document.getElementById("fav-sincontenido").style.display = "none";
    document.getElementById("text-fav-sc").style.display = "none"
  });

  contDowHover.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(url);
    console.log(response);
    let gif = await response.blob();
    a.download = 'Gif';
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  })

  contMaxHover.addEventListener("click", function () {
    document.getElementById("home").style.display = "none";
    document.getElementById("trending").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("btn-menu").style.display = "none";
    document.getElementById("gifosmax").style.display = "grid";
    document.getElementById("nav-search").style.visibility = "hidden";
    imgmax.src = url;
    usermax.textContent = username;
    titlemax.textContent = title;
    eventoMax = id;
    if (JSON.stringify(arregloFavoritos).includes(JSON.stringify(eventoMax))) {
      document.getElementById("botonFavorito").removeAttribute("class", "far");
      document.getElementById("botonFavorito").setAttribute("class", "fas");
    } else {
      document.getElementById("botonFavorito").removeAttribute("class", "fas");
      document.getElementById("botonFavorito").setAttribute("class", "far");
    }
    // DESCARGA GIFOS MAX
    document.getElementById("downmax-box").addEventListener("click", async function () {
      let a = document.createElement("a");
      let response = await fetch(imgmax.src);
      console.log(response);
      let gif = await response.blob();
      a.download = 'Gif';
      a.href = window.URL.createObjectURL(gif);
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
      a.click();
    })
  });
}
function hoverCardsM(id, url, title, username,j) {
  let usuarioHover = document.createElement("h4");
  document.getElementById("hoverM" + j).appendChild(usuarioHover);
  usuarioHover.setAttribute("id", "usuarioHoverM" + j)
  usuarioHover.setAttribute("class", "usuarioHoverM");
  usuarioHover.textContent = username;

  let tituloHover = document.createElement("p");
  document.getElementById("hoverM" + j).appendChild(tituloHover);
  tituloHover.setAttribute("id", "tituloHoverM" + j)
  tituloHover.setAttribute("class", "tituloHoverM");
  tituloHover.textContent = title;

  let contTrash = document.createElement("div");
  let trashHover = document.createElement("i");
  document.getElementById("hoverM" + j).appendChild(contTrash).appendChild(trashHover);
  contTrash.setAttribute("id", "favHoverM" + j)
  contTrash.setAttribute("class", "favHoverM");
  trashHover.setAttribute("class", "far fa-trash-alt");
  trashHover.setAttribute("id", "favHovM" + j)

  let contDowHover = document.createElement("div");
  let downHover = document.createElement("i");
  document.getElementById("hoverM" + j).appendChild(contDowHover).appendChild(downHover);
  contDowHover.setAttribute("id", "downHoverM" + j)
  contDowHover.setAttribute("class", "downHoverM");
  downHover.setAttribute("class", "fas fa-download");

  let contMaxHover = document.createElement("div");
  let maxHover = document.createElement("i");
  document.getElementById("hoverM" + j).appendChild(contMaxHover).appendChild(maxHover);
  contMaxHover.setAttribute("id", "maxHoverM" + j)
  contMaxHover.setAttribute("class", "maxHoverM");
  maxHover.setAttribute("class", "fas fa-expand-alt");

  contTrash.addEventListener("click", function () {
    arregloMisGifos.splice(j, 1);
    localStorage.setItem("misGifos", JSON.stringify(arregloMisGifos));
  });

  contDowHover.addEventListener("click", async function () {
    let a = document.createElement("a");
    let response = await fetch(url);
    console.log(response);
    let gif = await response.blob();
    a.download = 'Gif';
    a.href = window.URL.createObjectURL(gif);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  })

  contMaxHover.addEventListener("click", function () {
    document.getElementById("home").style.display = "none";
    document.getElementById("trending").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("btn-menu").style.display = "none";
    document.getElementById("gifosmax").style.display = "grid";
    document.getElementById("nav-search").style.visibility = "hidden";
    imgmax.src = url;
    usermax.textContent = username;
    titlemax.textContent = title;
    eventoMax = id;
    if (JSON.stringify(arregloFavoritos).includes(JSON.stringify(eventoMax))) {
      document.getElementById("botonFavorito").removeAttribute("class", "far");
      document.getElementById("botonFavorito").setAttribute("class", "fas");
    } else {
      document.getElementById("botonFavorito").removeAttribute("class", "fas");
      document.getElementById("botonFavorito").setAttribute("class", "far");
    }
    // DESCARGA GIFOS MAX
    document.getElementById("downmax-box").addEventListener("click", async function () {
      let a = document.createElement("a");
      let response = await fetch(imgmax.src);
      console.log(response);
      let gif = await response.blob();
      a.download = 'Gif';
      a.href = window.URL.createObjectURL(gif);
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
      a.click();
    })
  });
}
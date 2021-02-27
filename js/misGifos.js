var arregloMisGifos = [];
if (localStorage.getItem("misGifos") != null) {
  arregloMisGifos = JSON.parse(localStorage.getItem("misGifos"));
}

// MIS GIFOS
let seccionMisGifos = document.createElement("section");
document.getElementById("main").appendChild(seccionMisGifos);
seccionMisGifos.setAttribute("id", "misgifos");
seccionMisGifos.setAttribute("class", "misgifos");
document.getElementById("mis-gifos").addEventListener("click", misgifos);
function misgifos() {
  document.getElementById("home").style.display = "block";
  document.getElementById("misgifos").style.display = "flex";
  document.getElementById("trending").style.display = "block";
  document.getElementById("p-title").style.display = "none";
  document.getElementById("img-header").style.display = "none";
  document.getElementById("search").style.display = "none";
  document.getElementById("ver-mas").style.display = "none";
  document.getElementById("ver-mas-fav").style.display = "none";
  document.getElementById("title-trending").style.display = "none";
  document.getElementById("p-trending").style.display = "none";
  document.getElementById("line").style.display = "none";
  document.getElementById("title-srch").style.display = "none";
  document.getElementById("title-favoritos").style.display = "none";
  document.getElementById("icon-favoritos").style.display = "none";
  document.getElementById("fav-sincontenido").style.display = "none";
  document.getElementById("text-fav-sc").style.display = "none";
  document.getElementById("grabargif").style.display = "none";
  document.getElementById("srch-opc").style.display = "block";
  document.getElementById("icon-misgifos").style.display = "block";
  document.getElementById("title-misgifos").style.display = "block";
  if (arregloMisGifos.length == 0) {
    document.getElementById("misgif-sincontenido").style.display = "block";
    document.getElementById("text-mg-sc").style.display = "block";
  } else {
    document.getElementById("misgif-sincontenido").style.display = "none";
    document.getElementById("text-mg-sc").style.display = "none";
  }
  eliminarGrid();
  if (screen.width < desktop) {
    mostrarMenu();
  }
  misGifos();
}

// GRABAR GIFS
let tiempoRepetir = document.createElement("h6");
document.getElementById("zonaGrabacion").appendChild(tiempoRepetir);
tiempoRepetir.setAttribute("id", "tiempo-repetir");
document.getElementById("agregar-gif").addEventListener("click", function () {
  document.getElementById("home").style.display = "none";
  document.getElementById("gifosmax").style.display = "none";
  document.getElementById("misgifos").style.display = "none";
  document.getElementById("trending").style.display = "none";
  document.getElementById("grabargif").style.display = "grid";
  document.getElementById("agregar-gif").setAttribute("class", "active")
});

// COMENZAR
document.getElementById("comenzar").addEventListener("click", comenzar);
function comenzar() {
  document.getElementById("comenzar").style.visibility = "hidden";
  document.getElementById("paso1").classList.add("hover");
  document.getElementById("instructivo").innerHTML = "¿Nos das acceso <br/> a tu cámara?";
  document.getElementById("detalle").innerHTML = "El acceso a tu camara será válido sólo <br/> por el tiempo en el que estés creando el GIFO."
  getStreamAndRecord();
};

function cronometrar() {
  h = 0;
  m = 0;
  s = -1;
  document.getElementById("tiempo-repetir").innerHTML = "00:00:00";
  // document.getElementById("tiempo-repetir").style.borderBottom = "none";
  escribir();
  id = setInterval(escribir, 1000);
}
function escribir() {
  var hAux, mAux, sAux;
  s++;
  if (s > 59) { m++; s = 0; }
  if (m > 59) { h++; m = 0; }
  if (h > 24) { h = 0; }
  if (s < 10) { sAux = "0" + s; } else { sAux = s; }
  if (m < 10) { mAux = "0" + m; } else { mAux = m; }
  if (h < 10) { hAux = "0" + h; } else { hAux = h; }
  document.getElementById("tiempo-repetir").innerHTML = hAux + ":" + mAux + ":" + sAux;
}

function getStreamAndRecord() {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: { max: 480 }
    }
  })
    .then(function (stream) {
      document.getElementById("instructivo").style.display = "none";
      document.getElementById("detalle").style.display = "none";
      let capturaVideo = document.createElement("video");
      document.getElementById("centrograbacion").appendChild(capturaVideo);
      capturaVideo.setAttribute("id", "videoGif")
      capturaVideo.srcObject = stream;
      capturaVideo.play()
      document.getElementById("comenzar").style.display = "none";
      document.getElementById("tiempo-repetir").style.visibility = "visible";
      let grabar = document.createElement("h4");
      document.getElementById("foot").appendChild(grabar);
      grabar.setAttribute("id", "btn-grabar");
      grabar.setAttribute("class", "comenzar");
      grabar.textContent = "GRABAR";
      document.getElementById("paso1").classList.remove("hover");
      document.getElementById("paso2").classList.add("hover");
      document.getElementById("btn-grabar").addEventListener("click", grabacion);
      function grabacion() {
        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function () {
            console.log('started')
          },
        });
        cronometrar();
        recorder.startRecording();
        document.getElementById("btn-grabar").style.display = "none";
        let pararGrabacion = document.createElement("h4");
        document.getElementById("foot").appendChild(pararGrabacion);
        pararGrabacion.setAttribute("id", "btn-parar");
        pararGrabacion.setAttribute("class", "comenzar");
        pararGrabacion.textContent = "FINALIZAR";
        document.getElementById("btn-parar").addEventListener("click", ejecuta);
      };
    })
};

function ejecuta() {
  finalizarGrabacion(stopRecording);
}

function finalizarGrabacion(callback) {
  recorder.stopRecording(callback);
}

function stopRecording() {
  let video = document.getElementById("videoGif");
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  let info = URL.createObjectURL(recorder.getBlob());
  let stream = video.srcObject;
  let tracks = stream.getTracks();
  tracks.forEach(function (tracks) {
    tracks.stop();
  })
  video.src = video.srcObject;
  recorder = null;
  let imgGif = document.createElement("img");
  imgGif.setAttribute("id", "imgGif")
  video.style.display = "none";
  document.getElementById("centrograbacion").appendChild(imgGif);
  imgGif.src = info;
  document.getElementById("btn-parar").style.display = "none";
  let subirGif = document.createElement("h4");
  document.getElementById("foot").appendChild(subirGif);
  subirGif.setAttribute("id", "subirGif");
  subirGif.setAttribute("class", "comenzar");
  subirGif.textContent = "SUBIR GIFO";
  clearInterval(id);
  document.getElementById("tiempo-repetir").textContent = "REPETIR CAPUTURA";
  document.getElementById("tiempo-repetir").style.borderBottom = "2px solid #5ED7C6";
  document.getElementById("tiempo-repetir").addEventListener("click", function () {
    document.getElementById("imgGif").remove();
    document.getElementById("subirGif").remove();
    document.getElementById("btn-grabar").remove();
    document.getElementById("btn-parar").remove();
    document.getElementById("videoGif").remove();
    document.getElementById("tiempo-repetir").innerHTML = "00:00:00";
    document.getElementById("tiempo-repetir").style.borderBottom = "none";
    document.getElementById("instructivo").style.display = "block";
    document.getElementById("detalle").style.display = "block";
    getStreamAndRecord();
  });
  document.getElementById("subirGif").addEventListener("click", function () {
    document.getElementById("paso2").classList.remove("hover");
    document.getElementById("paso3").classList.add("hover");
    document.getElementById("subirGif").style.display = "none";
    document.getElementById("tiempo-repetir").style.visibility = "hidden";
    let loader = document.createElement("img");
    loader.setAttribute("id", "loader");
    loader.src = "assets/loader.svg";
    let subiendoGifo = document.createElement("p");
    subiendoGifo.setAttribute("id", "subiendoGifo");
    subiendoGifo.textContent = "Estamos subiendo tu GIFO";
    document.getElementById("centrograbacion").appendChild(loader);
    document.getElementById("centrograbacion").appendChild(subiendoGifo);
    let hoverCard = document.createElement("div");
    hoverCard.setAttribute("id", "hoverCard");
    document.getElementById("centrograbacion").appendChild(hoverCard);
    fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, { method: "POST", body: form })
      .then(respuesta => {
        return respuesta.json();
      })
      .then(json => {
        console.log(json.data);
        arregloMisGifos.push(json.data.id);
        localStorage.setItem("misGifos", JSON.stringify(arregloMisGifos));
        loader.src = "assets/check.svg";
        subiendoGifo.textContent = "GIFO subido con éxito";
        let otroGif = document.createElement("h4");
        document.getElementById("foot").appendChild(otroGif);
        otroGif.setAttribute("id", "otroGif");
        otroGif.setAttribute("class", "comenzar");
        otroGif.textContent = "Quieres cargar otro Gif?";
        otroGif.style.width = "250px";
        document.getElementById("otroGif").addEventListener("click", function () {
          document.getElementById("otroGif").remove();
          document.getElementById("imgGif").remove();
          document.getElementById("loader").remove();
          document.getElementById("subiendoGifo").remove();
          document.getElementById("hoverCard").remove();
          document.getElementById("btn-parar").remove();
          document.getElementById("btn-grabar").remove();
          document.getElementById("subirGif").remove();
          document.getElementById("videoGif").remove();
          document.getElementById("paso3").classList.remove("hover");
          document.getElementById("tiempo-repetir").style.visibility = "hidden";
          document.getElementById("tiempo-repetir").style.borderBottom = "none";
          document.getElementById("tiempo-repetir").innerHTML = "00:00:00";
          comenzar();
        })

      })
      .catch(err => console.log(err));
  });
}

let j = 0;
function misGifos() {
  for (i = 0; i < arregloMisGifos.length; i++) {
    let buscarId = arregloMisGifos[i];
    const apiId = `https://api.giphy.com/v1/gifs/${buscarId}?api_key=0m6p9UIK0QqEfA8GmlLnGoKcW873s8Ld`;

    fetch(apiId)
      .then(response => {
        return response.json();
      })
      .then(json => {
        // console.log(json);
        let gifMisGifos = document.createElement("img");
        if (screen.width >= desktop) {
          let hoverMisGifos = document.createElement("div");
          document.getElementById("grid-srch").appendChild(hoverMisGifos);
          hoverMisGifos.setAttribute("id", "hoverM" + j)
          hoverMisGifos.setAttribute("class", "contenedorMisG");
          document.getElementById("hoverM" + j).appendChild(gifMisGifos);
          hoverCardsM(json.data.id, json.data.images.original.url, json.data.username, json.data.title, j);
          j += 1;
        } else {
          document.getElementById("grid-srch").appendChild(gifMisGifos);
        }
        gifMisGifos.setAttribute("src", "/assets/trabajando.png")
        gifMisGifos.setAttribute("class", "img-misg");
        gifMisGifos.setAttribute("id", json.data.id);
        gifMisGifos.setAttribute("src", json.data.images.original.url);
        gifMisGifos.setAttribute("title", json.data.title);
        gifMisGifos.setAttribute("alt", json.data.username);
        gifMisGifos.addEventListener("click", function () {
          if (screen.width <= desktop) {
            abrirGifosMax();
          }
        });
      })
      .catch(err => console.log(err));
  }
}
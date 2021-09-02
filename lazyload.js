"use strcit";

const publicaciones = document.querySelector(".publicaciones");
let contador = 0;

const createPublicateCode = (name, content) => {
    const container = document.createElement("div");
    const comentarios = document.createElement("div");
    const nombre = document.createElement("h3");
    const contenido = document.createElement("p");
    const btnComentario = document.createElement("input");
    const btnEnviar = document.createElement("input");

    container.classList.add("publicacion");
    comentarios.classList.add("comentarios");

    btnEnviar.classList.add("enviar");
    btnComentario.classList.add("comentario");

    btnComentario.setAttribute("placeholder", "Introduce un comentario");
    nombre.textContent = name;
    contenido.textContent = content;

    btnEnviar.type = "submit";

    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(nombre);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container;
}

const cargarMasPublicaciones = entry => {
    console.log(entry);
    if (entry[0].isIntersecting) cargarPublicaciones(4);
}

const observer = new IntersectionObserver(cargarMasPublicaciones);

const cargarPublicaciones = async num => {
    const request = await fetch("informacion.json");
    const contenido = await request.json();
    const arr = contenido.content;
    console.log(arr);

    const fragmento = document.createDocumentFragment();

    for(let i=0; i < num; i++){
        if(arr[contador] != undefined){
            const newPublication = createPublicateCode(arr[contador].nombre, arr[contador].contenido);
        fragmento.appendChild(newPublication);
        contador++;
        if(i == num-1) observer.observe(newPublication);
        }
        else{
            let noMore = document.createElement("h3");
            noMore.textContent = "No hay mas publicaciones"
            publicaciones.appendChild(noMore);
            break;
        }
    }

    publicaciones.appendChild(fragmento);
}

cargarPublicaciones(6);
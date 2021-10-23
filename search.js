const home = document.querySelector(".home");
const search = document.querySelector(".search");
const artista = document.getElementById("input-artista");
url = 'https://api.spotify.com/v1/search';
const cardColum = document.querySelector(".card-columns");
const contenedor = document.querySelector(".contenedor");
var loading = true;
var emptySearch = true;



artista.addEventListener("keyup", (e) => {

    if (e.keyCode != 8) {
        console.log("entre al if (e.keyCode != 8)");
        emptySearch = false;
        e.preventDefault();

        if (emptySearch === false) {

            console.log(emptySearch);

            let artInput = document.getElementById("input-artista"); /* Repito esta línea porque necesito el valor de lo que esta dentro de la caja (input) */
            console.log(artInput.value);
            console.log(artInput.value.length);
            console.log(e.keyCode);

            let artistaCadena = (artInput.value).replace(" ", "%20"); /* Esto lo agregue porque cada vez que das espacio en la busqueda debe aparecer el %20 */
            let artistSearched = fetch(`${url}?q=${artistaCadena}&type=artist&market=es&limit=30`, {
                headers: { "Authorization": "Bearer BQAvM5VHhXvrXs4kJ_Vtcz9DdGS_BZOlznb87-MuZwRVggr6MieUcpU1vHrGoJ1e_e_HBrNZm2caeB1aLkY" }
            }).then(art => art.json());

            console.log(`${url}?q=${artistaCadena}&type=artist&market=es&limit=10`);

            if (loading == true) {
                /* artInput.value.length == 1 esta puesto para que haga la animación una vez y 
                no por cada tecla presionada */

                var divRow = document.createElement('div');

                divRow.classList.add("row");
                divRow.classList.add("m-5");
                divRow.classList.add("animated");
                divRow.classList.add("fadeIn");

                let divCol = document.createElement('div');

                divCol.classList.add("col");
                divCol.classList.add("loading");

                let i = document.createElement('i');

                i.classList.add("fa");
                i.classList.add("fa-sync");
                i.classList.add("fa-spin");
                i.classList.add("fa-5x");

                divCol.appendChild(i);
                divRow.appendChild(divCol);
                contenedor.appendChild(divRow);

                artistSearched.then(data => {

                        console.log(data);
                        loading = false;

                        if (loading == false) {

                            contenedor.removeChild(divRow);

                            data.artists.items.forEach(res => {

                                /*console.log(res);*/
                                let divCard = document.createElement('div');
                                divCard.classList.add("card");
                                let img = document.createElement('img');
                                img.classList.add("card-img-top");
                                let divBody = document.createElement('div');
                                let h5 = document.createElement('h5');
                                h5.classList.add("card-title");

                                h5.innerHTML = `${res.name}`;
                                img.src = `${res.images[2].url}`;
                                divCard.appendChild(img);
                                divBody.appendChild(h5);
                                divCard.appendChild(divBody);

                                cardColum.appendChild(divCard);

                                divCard.addEventListener("click", () => {

                                    console.log(res.name);
                                    window.location.href = `./artistPage.html?id=${res.id}`;
                                });
                            });
                        };
                    })
                    .catch(err => {
                        console.log(err);

                    });
            };

        };

    };

    if (artista.value.length == 0 && emptySearch === false) {
        /* el problema es que cuando llega a cero la primera vez ya hay un divRowCard, pero cuando lo apretas varias veces seguidas no tiene 
                nada que borrar porque ya lo borró una vez, el query selector no encuentra nada */

        emptySearch = true;

        console.log(emptySearch);

        let divRowCards = document.querySelector(".rowCards");
        /*contenedor.removeChild(divRow);*/
        contenedor.removeChild(divRowCards);

    };
});

home.addEventListener("click", () => {
    window.location.href = './index.html';
});

search.addEventListener("click", () => {
    window.location.href = './search.html';
});
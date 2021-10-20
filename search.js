const home = document.querySelector(".home");
const artista = document.getElementById("input-artista");
url = 'https://api.spotify.com/v1/search';
const cardColum = document.querySelector(".card-columns");
/*var i = 0;*/


home.addEventListener("click", () => {
    console.log("HOME");
    window.location.href = './index.html';
});

artista.addEventListener("keyup", () => {
    let art = document.getElementById("input-artista"); /* Repito esta línea porque necesito el valor de lo que esta dentro de la caja (input) */
    console.log(art.value);

    let artistSearched = fetch(`${url}?q=${art.value}&type=artist&market=us&limit=10&offset=10`, {
        headers: { "Authorization": "Bearer BQDG00j9obxfEppFzGRm5ob1VGkRSJD1Pa4tKCqEVtDQHSseSOmdFdJrVjGBEL7AbR6LratP6UJFbB2_m6k" }
    }).then(art => art.json());

    artistSearched.then((data) => {
        /*console.log(data);*/
        data.artists.items.forEach(res => {

            console.log(res);
            let divCard = document.createElement('div');
            divCard.classList.add("card");
            /*divCard.setAttribute("id", i);*/
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
                /*pos = divCard.getAttribute("id");*/

                console.log(res.name);
                window.location.href = `./artistPage.html?id=${res.id}`;
            });

            /*i = i + 1;*/
        });
    });



})
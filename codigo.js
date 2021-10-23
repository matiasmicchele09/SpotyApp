const newRealeses = fetch('https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20', {
    headers: { "Authorization": "Bearer BQAvM5VHhXvrXs4kJ_Vtcz9DdGS_BZOlznb87-MuZwRVggr6MieUcpU1vHrGoJ1e_e_HBrNZm2caeB1aLkY" }
}).then(res => res.json());

/*const artist = fetch('https://api.spotify.com/v1/artists/');*/
const home = document.querySelector(".home");
const search = document.querySelector(".search");
const cardColum = document.querySelector(".card-columns");
const contenedor = document.querySelector(".contenedor");
var x = 0;
var pos;
var loading = true;

if (loading == true) {

    let divRow = document.createElement('div');
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

    newRealeses.then(res => {

            console.log(res);
            loading = false;
            if (loading == false) {

                contenedor.removeChild(divRow);

                res.albums.items.forEach(data => {

                    let divCard = document.createElement('div');
                    divCard.classList.add("card");
                    divCard.setAttribute("id", x);
                    let img = document.createElement('img');
                    img.classList.add("card-img-top");
                    let divBody = document.createElement('div');
                    let h5 = document.createElement('h5');
                    h5.classList.add("card-title");
                    let p = document.createElement('p');
                    p.classList.add("card-text");

                    h5.innerHTML = `${data.name}`;
                    img.src = `${data.images[0].url}`;
                    divCard.appendChild(img);
                    divBody.appendChild(h5);

                    data.artists.forEach(arts => {
                        p.innerHTML += `<span class="badge bg-primary">${arts.name}</span> `;
                        divBody.appendChild(p);
                    });

                    divCard.appendChild(divBody);
                    cardColum.appendChild(divCard);

                    /*console.log(x);*/


                    divCard.addEventListener("click", () => {
                        pos = divCard.getAttribute("id");
                        /*console.log(pos);

                        console.log(res.albums.items[pos].artists[0].id);*/

                        /*newRealeses.then(res => {

                            console.log(res.albums.items[pos].artists[0].name)
                            console.log(res.albums.items[pos]);
                        });*/

                        window.location.href = `./artistPage.html?id=${res.albums.items[pos].artists[0].id}`;
                    });

                    x++;
                });
            }


        })
        .catch(err => {
            console.log(err);

            let div = document.createElement('div');
            div.classList.add("alert", "alert-danger", "animated", "fadeIn");

            let h3 = document.createElement('h3');
            let p = document.createElement('p');

            h3.innerHTML = "Error!";
            p.innerHTML = "The access token expired";
            div.appendChild(h3);
            div.appendChild(p);

            contenedor.appendChild(div);
        });
};

search.addEventListener("click", () => {
    window.location.href = './search.html';
});

home.addEventListener("click", () => {
    window.location.href = './index.html';
});
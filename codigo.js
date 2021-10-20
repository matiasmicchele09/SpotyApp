const newRealeses = fetch('https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20', {
    headers: { "Authorization": "Bearer BQDG00j9obxfEppFzGRm5ob1VGkRSJD1Pa4tKCqEVtDQHSseSOmdFdJrVjGBEL7AbR6LratP6UJFbB2_m6k" }
}).then(res => res.json());

/*const artist = fetch('https://api.spotify.com/v1/artists/');*/
const search = document.querySelector(".search");
const cardColum = document.querySelector(".card-columns");
const contenedor = document.querySelector(".contenedor");
var i = 0;
var pos;
/*newRealeses.then(res => res.json())*/
newRealeses.then(res => {
        /*console.log(res.albums.items);*/
        console.log(res);

        res.albums.items.forEach(data => {
            console.log(data);

            let divCard = document.createElement('div');
            divCard.classList.add("card");
            divCard.setAttribute("id", i);
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

            divCard.addEventListener("click", () => {
                pos = divCard.getAttribute("id");
                console.log(pos);
                console.log(res.albums.items.artists);

                /*newRealeses.then(res => {

                    console.log(res.albums.items[pos].artists[0].name)
                    console.log(res.albums.items[pos]);
                });*/

                window.location.href = `./artistPage.html?id=${res.albums.items[pos].artists[0].id}`;
            });

            i = i + 1;
        });
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

search.addEventListener("click", () => {
    window.location.href = './search.html';
});
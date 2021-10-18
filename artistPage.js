const getURL = new URLSearchParams(window.location.search);
url = 'https://api.spotify.com/v1/artists';
id = getURL.get('id');

const btn = document.querySelector(".btn-regresar");
const artistImage = document.querySelector(".artist-img");
const artistName = document.querySelector(".artist-name");
const tableBody = document.querySelector(".table-body");

const artist = fetch(`${url}/${id}`, {
    headers: { "Authorization": "Bearer BQDQv4-6Rsj5pW7QlxMZL81AlTJNmIvfG_v1HNmLC-iV1P8AzqyNSvNADLjabqtTvx8wtKSStuThuenytvs"}
}).then(art => art.json());

const topTracks = fetch(`${url}/${id}/top-tracks?market=us`, {
    headers: { "Authorization": "Bearer BQDQv4-6Rsj5pW7QlxMZL81AlTJNmIvfG_v1HNmLC-iV1P8AzqyNSvNADLjabqtTvx8wtKSStuThuenytvs" }
}).then(topTraks => topTraks.json());

artist.then(art => {
    console.log(art);

    let h1 = document.createElement('h1');
    let img = document.createElement('img');
    let a = document.createElement('a');


    h1.innerHTML = `${art.name}`;
    img.src = `${art.images[2].url}`;
    a.href = `${art.external_urls.spotify}`;
    a.textContent = "Ir a la página del artista";
    artistImage.appendChild(img);
    artistName.appendChild(h1);
    artistName.appendChild(a);
});

topTracks.then(topTracks => {
    console.log(topTracks.tracks);

    topTracks.tracks.forEach(tracks => {

        let tr = document.createElement('tr');
        let img = document.createElement('img');
        let audio = document.createElement('audio');
        let p = document.createElement('p');

        let iFrame = document.createElement('iframe');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

        img.src = `${tracks.album.images[2].url}`;
        td1.appendChild(img);
        td2.innerHTML = `${tracks.album.name}`;
        td3.innerHTML = `${tracks.name}`;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        /*tr.appendChild(td4);*/

        if (`${tracks.preview_url}` == "null") {
            p.textContent = "Esta canción no posee Vista Previa"
            td4.appendChild(p);
        } else {
            /*audio.src = `${tracks.preview_url}`;
            audio.controls = true;
            td4.appendChild(audio);*/
            iFrame.src = `https://open.spotify.com/embed?uri=${tracks.uri}`;
            iFrame.width = "300";
            iFrame.height = "80";
            iFrame.frameBorder = "0";
            iFrame.allow = "encrypted-media";
            td4.appendChild(iFrame);

        }

        tr.appendChild(td4);






        tableBody.appendChild(tr);


    });









});

btn.addEventListener("click", () => {
    console.log("HOME");
    window.location.href = './index.html';
});
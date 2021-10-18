const home = document.querySelector(".home");
const artista = document.getElementById("input-artista");

home.addEventListener("click", () => {
    console.log("HOME");
    window.location.href = './index.html';
    /* o sería mejor así?:
        window.location.href = './';
     */
});

artista.addEventListener("keyup", (termino) => {
    console.log(termino.key);
})
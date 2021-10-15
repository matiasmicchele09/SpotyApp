const home = document.querySelector(".home");

home.addEventListener("click", () => {
    console.log("HOME");
    window.location.href = './index.html';
    /* o sería mejor así?:
        window.location.href = './';
     */
})
/* REALTIME CLOCK */

function updateGalleryTime(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    document.getElementById("galleryTime").innerText =
    `${hours}:${minutes}`;
}

setInterval(updateGalleryTime,1000);

updateGalleryTime();

/* IMAGE VIEWER */

document.addEventListener("DOMContentLoaded", ()=>{

    const photos =
    document.querySelectorAll(".photo img");

    const viewer =
    document.getElementById("viewer");

    const viewerImg =
    document.getElementById("viewerImg");

    photos.forEach(photo=>{

        photo.addEventListener("click", ()=>{

            viewer.style.display = "flex";

            viewerImg.src = photo.src;

            viewer.animate([
                {
                    opacity:0
                },
                {
                    opacity:1
                }
            ],{
                duration:250,
                easing:'ease'
            });

        });

    });

});

/* CLOSE */

function closeViewer(){

    document.getElementById("viewer")
    .style.display = "none";

}
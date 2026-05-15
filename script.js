const lockscreen = document.getElementById("lockscreen");
const homescreen = document.getElementById("homescreen");
const slider = document.getElementById("unlockSlider");

let isDragging = false;
let startX = 0;

/* CLOCK */

function updateTime(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    const currentTime = `${hours}:${minutes}`;

    document.getElementById("time").innerText = currentTime;
    document.getElementById("statusTime").innerText = currentTime;

    const options = {
        weekday:'long'
    };

    const day = now.toLocaleDateString('en-US', options);

    document.getElementById("date").innerText = day;
}

setInterval(updateTime,1000);
updateTime();

/* SLIDE TO UNLOCK */

slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);

function startDrag(e){

    isDragging = true;

    startX = e.type.includes("mouse")
    ? e.clientX
    : e.touches[0].clientX;
}

document.addEventListener("mousemove", dragSlider);
document.addEventListener("touchmove", dragSlider);

function dragSlider(e){

    if(!isDragging) return;

    const currentX = e.type.includes("mouse")
    ? e.clientX
    : e.touches[0].clientX;

    let moveX = currentX - startX;

    if(moveX < 0){
        moveX = 0;
    }

    if(moveX > 150){
        moveX = 150;
    }

    slider.style.left = moveX + "px";

    if(moveX >= 150){
        unlockPhone();
    }
}

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

function stopDrag(){

    if(!isDragging) return;

    isDragging = false;

    if(parseInt(slider.style.left) < 150){
        slider.style.left = "0px";
    }
}

/* UNLOCK */

function unlockPhone(){

    lockscreen.style.transition = ".45s";
    lockscreen.style.opacity = "0";

    setTimeout(()=>{

        lockscreen.style.display = "none";

        homescreen.style.display = "block";

        homescreen.animate([
            {
                transform:'scale(1.08)',
                opacity:0
            },
            {
                transform:'scale(1)',
                opacity:1
            }
        ],{
            duration:450,
            easing:'ease'
        });

    },450);
}

/* APP OPEN */

function openApp(link){

    document.body.animate([
        {
            transform:'scale(1)'
        },
        {
            transform:'scale(.96)'
        }
    ],{
        duration:180
    });

    setTimeout(()=>{

        window.location.href = link;

    },180);
}
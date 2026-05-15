/* CLOCK */

function updateNotesTime(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    document.getElementById("notesTime").innerText =
    `${hours}:${minutes}`;
}

setInterval(updateNotesTime,1000);

updateNotesTime();

/* NOTES */

const noteInput =
document.getElementById("noteInput");

/* LOAD SAVED NOTE */

window.onload = function(){

    const saved =
    localStorage.getItem("iphoneNote");

    if(saved){

        noteInput.value = saved;

    }

};

/* AUTO SAVE */

noteInput.addEventListener("input", ()=>{

    localStorage.setItem(
        "iphoneNote",
        noteInput.value
    );

});
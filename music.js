/* CLOCK */

function updateMusicTime(){
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();

    if(m < 10) m = "0" + m;

    document.getElementById("musicTime").innerText = `${h}:${m}`;
}

setInterval(updateMusicTime,1000);
updateMusicTime();


/* SONGS (PAKAI MP3 BIAR PASTI JALAN) */

const songs = [
    {
        title:"House Of Cards",
        artist:"Radiohead",
        src:"audio/house.mp3",
        cover:"cover1.jpg"
    },
    {
        title:"Nude",
        artist:"Radiohead",
        src:"audio/nude.mp3",
        cover:"cover1.jpg"
    },
    {
        title:"Idioteque",
        artist:"Radiohead",
        src:"audio/idioteque.mp3",
        cover:"cover2.webp"
    }
];


/* ELEMENTS */

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const screen = document.querySelector(".screen");


/* STATE */

let current = 0;
let isPlaying = false;


/* LOAD SONG */

function loadSong(i){
    const song = songs[i];

    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;

    audio.src = song.src;
    audio.load();

    screen.style.background =
    `linear-gradient(to bottom,
    rgba(0,0,0,.45),
    rgba(0,0,0,.7)),
    url('${song.cover}') center/cover`;

    progress.value = 0;
}

loadSong(current);


/* PLAY / PAUSE */

function togglePlay(){

    if(isPlaying){
        audio.pause();
        playBtn.innerText = "▶";
    } else {
        audio.play().catch(err=>{
            console.log("PLAY BLOCKED:", err);
        });
        playBtn.innerText = "❚❚";
    }

    isPlaying = !isPlaying;
}


/* NEXT */

function nextSong(){
    current++;
    if(current >= songs.length) current = 0;

    loadSong(current);
    audio.play();
    playBtn.innerText = "❚❚";
    isPlaying = true;
}


/* PREV */

function prevSong(){
    current--;
    if(current < 0) current = songs.length - 1;

    loadSong(current);
    audio.play();
    playBtn.innerText = "❚❚";
    isPlaying = true;
}


/* PROGRESS */

audio.addEventListener("timeupdate", ()=>{
    if(!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;
});


/* SEEK */

progress.addEventListener("input", ()=>{
    audio.currentTime = (progress.value / 100) * audio.duration;
});


/* AUTO NEXT */

audio.addEventListener("ended", ()=>{
    nextSong();
});


/* DEBUG */

audio.addEventListener("error", ()=>{
    console.log("AUDIO ERROR - file tidak kebaca");
});
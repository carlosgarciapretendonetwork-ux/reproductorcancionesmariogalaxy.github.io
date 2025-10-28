// --- 1. Elementos del DOM ---
const musicContainer = document.querySelector('.music-card');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// --- 2. LISTA DE CANCIONES DE MARIO GALAXY ---
// NOTA: Debes nombrar tus archivos MP3 e imágenes exactamente como se muestra aquí.
// Coloca los MP3 en la carpeta 'music/' y las imágenes en 'img/'.

const songs = [
    { name: 'Gusty Garden Galaxy', file: 'gusty_garden.mp3', cover: 'gusty_garden.jpg' },
    { name: 'Good Egg Galaxy', file: 'good_egg.mp3', cover: 'good_egg.jpg' },
    { name: 'Melty Monster Galaxy', file: 'melty_monster.mp3', cover: 'melty_monster.jpg' },
    { name: 'Fated Battle (Bowser)', file: 'fated_battle.mp3', cover: 'fated_battle.jpg' },
    { name: 'Star Festival', file: 'star_festival.mp3', cover: 'star_festival.jpg' },
    { name: 'Comet Observatory', file: 'comet_observatory.mp3', cover: 'comet_observatory.jpg' },
    { name: 'Honeyhive Galaxy', file: 'honeyhive_galaxy.mp3', cover: 'honeyhive_galaxy.jpg' },
];

// Canción actual por índice
let songIndex = 0;

// --- 3. FUNCIONES PRINCIPALES (Mismas que antes, son el estándar) ---

function loadSong(song) {
    title.innerText = song.name;
    // El artista es fijo para la saga
    // artist.innerText = 'Koji Kondo & Mahito Yokota'; 
    audio.src = `music/${song.file}`;
    cover.src = `img/${song.cover}`; 
}

function playSong() {
    musicContainer.classList.add('playing');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('playing');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Formato de tiempo y actualización de la barra de progreso
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = '0' + seconds;
        return `${minutes}:${seconds}`;
    };

    // Aseguramos que la duración se muestre tan pronto como esté disponible
    if (duration) {
        durationEl.innerText = formatTime(duration);
    }
    currentTimeEl.innerText = formatTime(currentTime);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// --- 4. EVENT LISTENERS ---

// Iniciar con la primera canción
loadSong(songs[songIndex]);

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('playing');
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('loadedmetadata', updateProgress);
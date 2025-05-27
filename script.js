const songs = [
    { id: 1, title: "Attention", artist: "Charlie Puth", genre: "Pop", file: "songs/attention.mp3", albumArtUrl: "images/art/charlie_puth.webp" },
    { id: 2, title: "Birds of a Feather", artist: "Billie Eilish", genre: "R&B", file:"songs/birdsofafeature.mp3", albumArtUrl: "images/art/billie_eilish.webp" },
    { id: 3, title: "One Dance", artist: "Drake", genre: "Hip-Hop", file: "songs/onedance.mp3", albumArtUrl: "images/art/drake.jpeg" }, // Corrected "Hip-Hp"
    { id: 4, title: "Die With A Smile", artist: "Lady Gaga", genre: "Rock", file: "songs/diewithasmile.mp3", albumArtUrl: "images/art/lady_gaga.jpeg"},
    { id: 5, title: "Lover", artist: "Taylor Swift", genre: "Pop-Rock", file: "songs/lover.mp3", albumArtUrl: "images/art/taylor_swift.jpeg"}
];

let currentSongIndex = -1;
let isPlaying = false;
const audioPlayer = document.getElementById("audioPlayer"); 

const musicPlayerContainer = document.getElementById("musicPlayerContainer");
const playerAlbumArt = document.getElementById("playerAlbumArt");
const playerSongTitle = document.getElementById("playerSongTitle");
const playerSongArtist = document.getElementById("playerSongArtist");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");
const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volumeControl");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function loadSong(songIndex) {
    if (songIndex < 0 || songIndex >= songs.length) return;

    currentSongIndex = songIndex;
    const song = songs[currentSongIndex];

    if (audioPlayer && playerAlbumArt && playerSongTitle && playerSongArtist) {
        audioPlayer.src = song.file;
        playerAlbumArt.src = song.albumArtUrl || "images/art/default.jpg"; 
        playerSongTitle.textContent = song.title;
        playerSongArtist.textContent = song.artist;
        
        // Reset progress bar for new song
        if(progressBar) progressBar.value = 0;
        if(currentTimeEl) currentTimeEl.textContent = "0:00";
        if(totalDurationEl) totalDurationEl.textContent = "0:00"; 
    }
}

function playSongByIndex(songIndex) {
    loadSong(songIndex);
    if (audioPlayer) {
        audioPlayer.play();
        if (musicPlayerContainer) musicPlayerContainer.style.display = "block"; 
    }
}

function playCurrentSong() {
    if (audioPlayer && currentSongIndex !== -1) {
        isPlaying = true;
        audioPlayer.play();
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        if (musicPlayerContainer) musicPlayerContainer.style.display = "block";
    }
}

function pauseCurrentSong() {
    if (audioPlayer) {
        isPlaying = false;
        audioPlayer.pause();
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
}

function playNextSong() {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    playSongByIndex(nextIndex);
}

function playPrevSong() {
    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSongByIndex(prevIndex);
}

function updateProgressBar() {
    if (audioPlayer && progressBar && currentTimeEl && totalDurationEl) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        if (isNaN(audioPlayer.duration)) {
             totalDurationEl.textContent = "0:00"; 
        } else {
             totalDurationEl.textContent = formatTime(audioPlayer.duration);
        }
    }
}

function seekSong() {
    if (audioPlayer && progressBar) {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
}

function setVolume() {
    if (audioPlayer && volumeControl) {
        audioPlayer.volume = volumeControl.value;
    }
}

function displaySongCards(songsArray, containerId, limit = songsArray.length) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let htmlContent = "";
    const displayLimit = Math.min(songsArray.length, limit);

    for(let i = 0; i < displayLimit; i++) {
        const song = songsArray[i];
        const originalIndex = songs.findIndex(s => s.id === song.id); 
        if (originalIndex === -1) continue; 
        htmlContent += `
            <div class='col-md-3 mb-4'>
                <div class='card p-3 h-100 text-center'>
                    <img src="${song.albumArtUrl || 'images/art/default.jpg'}" class="img-fluid w-100 rounded mb-2" style="height: 200px; object-fit: cover;" alt="${song.title}">
                    <div class='card-body d-flex flex-column'>
                        <h5 class='card-title'>${song.title}</h5>
                        <p class='card-text small'>Artist: ${song.artist}</p>
                        <p class='card-text small'>Genre: ${song.genre}</p>
                        <button class='btn btn-primary mt-auto' onclick="playSongByIndex(${originalIndex})">Play</button>
                    </div>
                </div>
            </div>`;
    }
    
    if (songsArray.length === 0 && containerId === "searchResults") {
         htmlContent = "<p class='text-muted text-center w-100'>No results found</p>";
    }

    container.innerHTML = htmlContent;
}

function showTimedAlert(message, type = "success", duration = 3000) {
    const alertContainer = document.createElement("div");
    alertContainer.className = `alert alert-${type} alert-dismissible fade show alert-fixed`;
    alertContainer.setAttribute("role", "alert");
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertContainer);
    setTimeout(() => {
        const bsAlert = bootstrap.Alert.getInstance(alertContainer);
        if (bsAlert) {
            bsAlert.close();
        } else if (alertContainer.parentNode) { 
            alertContainer.parentNode.removeChild(alertContainer);
        }
    }, duration);
}


function updateNavbar() {
    const loggedInUserEmail = localStorage.getItem("userEmail");
    const navUserSection = document.getElementById("navUserSection"); 

    if (navUserSection) {
        if (loggedInUserEmail) {
            navUserSection.innerHTML = `
                <span class="navbar-text me-2">Welcome, ${loggedInUserEmail}</span>
                <button id="logoutButton" class="btn btn-outline-warning">Logout</button>
            `;
            document.getElementById("logoutButton")?.addEventListener("click", () => {
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userPassword"); 
                showTimedAlert("Logged out successfully!", "info");
                updateNavbar(); 
            });
        } else {
            navUserSection.innerHTML = `
                <a href="login.html" class="btn btn-outline-success mx-2">Login</a>
                <a href="registration.html" class="btn btn-outline-primary">Register</a>
            `;
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    updateNavbar(); 

    
    if (document.getElementById("searchBox")) {
        const searchBox = document.getElementById("searchBox");
        const searchResultsContainerId = "searchResults";
        
        

        searchBox.addEventListener("input", function() {
            const query = this.value.toLowerCase();
            if (query.trim() === "") {
                document.getElementById(searchResultsContainerId).innerHTML = "<p class='text-muted text-center w-100'>Enter a search term to find songs.</p>";
                return;
            }
            const results = songs.filter(song => 
                song.title.toLowerCase().includes(query) || 
                song.artist.toLowerCase().includes(query) || 
                song.genre.toLowerCase().includes(query)
            );
            displaySongCards(results, searchResultsContainerId);
        });

        
        if (document.getElementById("featuredSongsContainer")) {
            displaySongCards(songs, "featuredSongsContainer", 4); 
        }
    }
    
    
    if (audioPlayer) {
        audioPlayer.addEventListener("play", () => {
            isPlaying = true;
            if(playPauseBtn) playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        });
        audioPlayer.addEventListener("pause", () => {
            isPlaying = false;
            if(playPauseBtn) playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        });
        audioPlayer.addEventListener("ended", playNextSong);
        audioPlayer.addEventListener("timeupdate", updateProgressBar);
        audioPlayer.addEventListener("loadedmetadata", updateProgressBar); 

        playPauseBtn?.addEventListener("click", () => {
            if (isPlaying) pauseCurrentSong();
            else playCurrentSong();
        });
        nextBtn?.addEventListener("click", playNextSong);
        prevBtn?.addEventListener("click", playPrevSong);
        progressBar?.addEventListener("input", seekSong); 
        volumeControl?.addEventListener("input", setVolume);
    }


    
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            showTimedAlert("Registration Successful! You can now login.", "success");
            setTimeout(() => window.location.href = "login.html", 2000);
        });
    }

    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const loginEmail = document.getElementById("loginEmail").value;
            const loginPassword = document.getElementById("loginPassword").value;

            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            if (loginEmail === storedEmail && loginPassword === storedPassword) {
                showTimedAlert("Login Successful!", "success");
                setTimeout(() => window.location.href = "index.html", 1500);
            } else {
                showTimedAlert("Invalid Email or Password!", "danger");
            }
        });
    }

    
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formMessage = document.getElementById("formMessage"); 
            if (formMessage) {
                formMessage.textContent = "Your message has been sent successfully!";
                formMessage.className = "mt-3 text-success text-center";
                formMessage.style.display = "block";
            }
            this.reset();
            setTimeout(() => {
                if(formMessage) formMessage.style.display = "none";
            }, 3000);
        });
    }
});
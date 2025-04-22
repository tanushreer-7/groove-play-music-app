/* file: "songs/attention.mp3",
*/

const songs = [
    { title: "Song 1", artist: "Charlie Puth", genre: "Pop", file: "songs/attention.mp3" },
    { title: "Song 2", artist: "Billie Eilish", genre: "R&B", file:"songs/birdsofafeature.mp3" },
    { title: "Song 3", artist: "Drake", genre: "Hip-Hp", file: "songs/onedance.mp3" },
    { title: "Song 4", artist: "Lady Gaga", genre: "Rock", file: "songs/diewithasmile.mp3"},
    { title: "Song 5", artist: "Taylor Swift", genre: "Pop-Rock", file: "songs/lover.mp3"}
];

function playSong(songFile) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = songFile;
    audioPlayer.style.display = "block";
    audioPlayer.play();
}

document.getElementById("searchBox")?.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const results = songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query) || 
        song.genre.toLowerCase().includes(query)
    );
    
    let resultHtml = "";
    if (results.length > 0) {
        results.forEach(song => {
            resultHtml += `
                <div class='card p-3 mb-3'>
                    <div class='card-body'>
                        <h5 class='card-title'>${song.title}</h5>
                        <p class='card-text'>Artist: ${song.artist}</p>
                        <p class='card-text'>Genre: ${song.genre}</p>
                        <button class='btn btn-primary' onclick="playSong('${song.file}')">Play</button>
                    </div>
                </div>`;
        });
    } else {
        resultHtml = "<p class='text-muted'>No results found</p>";
    }
    
    document.getElementById("searchResults").innerHTML = resultHtml;
});
document.addEventListener("DOMContentLoaded", () => {
    // Register Functionality
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            // Store user in local storage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            alert("Registration Successful! You can now login.");
            window.location.href = "login.html";
        });
    }

    // Login Functionality
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const loginEmail = document.getElementById("loginEmail").value;
            const loginPassword = document.getElementById("loginPassword").value;

            // Retrieve stored user details
            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            if (loginEmail === storedEmail && loginPassword === storedPassword) {
                alert("Login Successful!");
                window.location.href = "index.html";
            } else {
                alert("Invalid Email or Password!");
            }
        });
    }
});


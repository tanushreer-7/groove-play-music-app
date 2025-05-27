# 🎶 Groove Play - Music Player Web App

Welcome to **Groove Play**, your ultimate web-based music streaming experience! This project is a sleek and responsive music player website designed using HTML, CSS, JavaScript, and Bootstrap. Users can explore music by artist or genre, listen to songs locally, and interact with the platform through a clean and modern interface.

---

## 🔥 Features

- 🎧 Stream local MP3 songs with Play button functionality
- 🔍 Search by **artist name** or **genre** (e.g., Hip-Hop, Rock)
- 📝 Contact form to collect user feedback
- 👤 Login and Register pages for user access
- 📱 Fully responsive layout using Bootstrap
- 🎨 Attractive UI with custom branding and logo
- 📂 Structured layout: Home, Search, About, Contact, Register, Login

---

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 5
- **Media**: Local `.mp3` audio files
- **Icons**: Bootstrap Icons

---

### ❗ Important Note on Asset Paths:

*   **Album Art (`images/art/`):**
    *   Ensure all the artist pictures are in the `images/art/` directory.
    *   Ensure all the song files are in a `songs/` directory.
    *   Ensure `bgimg.jpg` and `logo.png` are in an `images/` directory.
    *   **To fix this locally after cloning:**
        1.  Create an `images/` folder if it doesn't exist.
        2.  Inside `images/`, create an `art/` folder.
        3.  Move all album art JPEGs (e.g., `attention.jpg`, `lover.jpg`, etc.) into this `images/art/` directory.
        4.  **Alternatively,** you can modify the `albumArtUrl` property for each song in the `songs` array in `script.js` to reflect the actual path where you've placed the images.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/tanushreer-7/groove-play-music-app.git

2. Navigate to the project directory:
   ```bash
   cd groove-play-music-app

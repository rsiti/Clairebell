const puzzle = document.getElementById("puzzle");
const statusText = document.getElementById("status");
const size = 3;
const tileSize = 90;
let tiles = [];
let empty = { x: size - 1, y: size - 1 };

// Membuat dan mengacak puzzle
function initPuzzle(imageURL) {
  tiles = [];
  puzzle.innerHTML = "";

  // Buat array posisi ubin (0–7), simpan urutan asli
  const order = [];
  for (let i = 0; i < size * size - 1; i++) order.push(i);
  shuffle(order);

  let count = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (x === empty.x && y === empty.y) continue;

      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.correctX = count % size;
      tile.dataset.correctY = Math.floor(count / size);

      // Posisi saat ini di grid
      tile.dataset.x = x;
      tile.dataset.y = y;

      const bgX = -(order[count] % size) * tileSize;
      const bgY = -Math.floor(order[count] / size) * tileSize;
      tile.style.backgroundImage = `url('${imageURL}')`;
      tile.style.backgroundPosition = `${bgX}px ${bgY}px`;

      tile.style.gridColumnStart = x + 1;
      tile.style.gridRowStart = y + 1;

      tile.addEventListener("click", () => tryMove(tile));

      tiles.push(tile);
      puzzle.appendChild(tile);
      count++;
    }
  }
}

// Mengacak array (algoritma Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Coba gerakkan ubin jika bisa
function tryMove(tile) {
  const x = +tile.dataset.x;
  const y = +tile.dataset.y;

  const dx = Math.abs(x - empty.x);
  const dy = Math.abs(y - empty.y);

  if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
    // Tukar posisi dataset
    [tile.dataset.x, tile.dataset.y] = [empty.x, empty.y];
    tile.style.gridColumnStart = empty.x + 1;
    tile.style.gridRowStart = empty.y + 1;

    empty.x = x;
    empty.y = y;

    checkWin();
  }
}

// Cek apakah puzzle selesai
function checkWin() {
  let win = true;
  for (const tile of tiles) {
    if (
      +tile.dataset.x !== +tile.dataset.correctX ||
      +tile.dataset.y !== +tile.dataset.correctY
    ) {
      win = false;
      break;
    }
  }

  statusText.textContent = win ? "✨ Puzzle selesai! ✨" : "";
}

// Jalankan
initPuzzle("10.jpg");

// Kontrol Musik
const audio = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggle-music");
let isPlaying = false;

toggleBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    toggleBtn.textContent = "⏸️ Hentikan Musik";
  } else {
    audio.pause();
    toggleBtn.textContent = "🎵 Mainkan Musik";
  }
  isPlaying = !isPlaying;
});


const API_URL = 'https://games.gamepix.com/games?sid=H659B'; // Substitua pelo seu SID da GamePix se tiver
const grid = document.getElementById('gameGrid');
let allGames = [];

async function fetchGames() {
  try {
    // Usando a API pública de demonstração deles
    const response = await fetch('https://games.gamepix.com/games');
    const data = await response.json();
    allGames = data.data; // A GamePix retorna os jogos dentro de 'data'
    displayGames(allGames);
  } catch (error) {
    grid.innerHTML = "<p>Erro ao carregar jogos. Tente novamente.</p>";
  }
}

function displayGames(games) {
  grid.innerHTML = '';
  games.slice(0, 100).forEach(game => { // Carregamos os 100 primeiros para não travar
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => openGame(game.url);
    card.innerHTML = `
      <img src="${game.thumbnailUrl}" alt="${game.title}">
      <div class="game-info">
        <strong>${game.title}</strong>
        <p style="color: #888; margin-top:5px;">Grátis</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openGame(url) {
  document.getElementById('gameFrame').src = url;
  document.getElementById('gameModal').style.display = "block";
}

document.querySelector('.close-btn').onclick = () => {
  document.getElementById('gameModal').style.display = "none";
  document.getElementById('gameFrame').src = "";
};

// Busca em tempo real
document.getElementById('searchInput').oninput = (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allGames.filter(g => g.title.toLowerCase().includes(term));
  displayGames(filtered);
};

fetchGames();

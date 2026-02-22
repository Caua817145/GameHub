// Configuração de Monetização
const MEU_SID = 'H659B'; 

const grid = document.getElementById('game-grid');
const view = document.getElementById('game-view');
const canvas = document.getElementById('game-canvas');

// Busca jogos da API GamePix
async function loadGames() {
    try {
        const response = await fetch(`https://games.api.gamepix.com/v3/games?sid=${MEU_SID}&pagination=48`);
        const result = await response.json();

        if (result.status === 200) {
            renderGrid(result.data);
        } else {
            throw new Error("Erro na API");
        }
    } catch (error) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ef4444;">
            Erro ao carregar jogos. Verifique se o domínio está autorizado na GamePix.
        </p>`;
    }
}

function renderGrid(games) {
    grid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnailUrl}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
            </div>
        `;
        card.onclick = () => openGame(game.url);
        grid.appendChild(card);
    });
}

function openGame(url) {
    // Adiciona o SID na URL para ativar os seus anúncios e lucros
    canvas.src = `${url}?sid=${MEU_SID}`;
    view.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGame() {
    view.style.display = 'none';
    canvas.src = '';
    document.body.style.overflow = 'auto';
}

// Inicia o carregamento
loadGames();

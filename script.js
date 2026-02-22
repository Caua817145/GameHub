// CONFIGURAÇÃO DE LUCRO (Coloque seu SID aqui)
const MEU_SID = 'SEU_SID_AQUI'; 

const grid = document.getElementById('game-grid');
const view = document.getElementById('game-view');
const canvas = document.getElementById('game-canvas');

// Função para buscar jogos da API oficial GamePix
async function fetchGames() {
    try {
        // Buscamos 48 jogos para começar (mais jogos = mais cliques em anúncios)
        const url = `https://games.api.gamepix.com/v3/games?sid=${MEU_SID}&pagination=48`;
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === 200) {
            renderGames(result.data);
        }
    } catch (err) {
        grid.innerHTML = `<p class="col-span-full text-red-500">Erro ao carregar os jogos. Verifique sua internet.</p>`;
    }
}

// Cria os cards dos jogos no HTML
function renderGames(games) {
    grid.innerHTML = ''; // Limpa o carregando
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = "game-card bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500 cursor-pointer group";
        
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${game.thumbnailUrl}" alt="${game.title}" class="w-full h-40 object-cover group-hover:scale-110 transition duration-500">
                <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition"></div>
            </div>
            <div class="p-3">
                <h3 class="font-bold text-sm truncate">${game.title}</h3>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-[10px] bg-purple-900 text-purple-200 px-2 py-1 rounded uppercase">${game.category}</span>
                    <button class="text-xs bg-green-600 px-2 py-1 rounded font-bold">JOGAR</button>
                </div>
            </div>
        `;
        
        card.onclick = () => openGame(game.url);
        grid.appendChild(card);
    });
}

// Abre o jogo e ativa os anúncios da GamePix
function openGame(gameUrl) {
    // Adiciona o SID na URL do jogo para garantir que você ganhe pelos anúncios
    const finalUrl = `${gameUrl}?sid=${MEU_SID}`;
    
    canvas.src = finalUrl;
    view.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Remove scroll do fundo
}

// Fecha o jogo e limpa a memória
function closeGame() {
    view.style.display = 'none';
    canvas.src = '';
    document.body.style.overflow = 'auto'; // Devolve scroll
}

// Inicia o site
fetchGames();

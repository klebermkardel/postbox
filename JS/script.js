// Seleciona os elementos
const postsList = document.querySelector('.posts');

// Busca e Renderiza os posts
async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts');

        if(!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const result = await response.json();
        const posts = result.data;

        postsList.forEach(post => {
            const postElement = document.createElement('li');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <a href="${post.url}" target="_blank" class="link-post">${post.url}</a>
                <span class="category">${post.categoria}</span>
                <div class="action-buttons">
                    <button class="checked-button">Marcar como lido</button>
                    <button class="delete-button">Excluir</button>
                </div>
            `;

            postsList.appendChild(postElement);
        })
    } catch(error) {
        console.error('Falha ao buscar posts:', error);
        postsList.innerHTML = '<li>Falha ao carregar os posts. Tente novamente mais tarde.</li>';
    }
}

fetchPosts();
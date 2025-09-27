// Seleciona os elementos
const postsList = document.querySelector('.posts');
const form = document.querySelector('.form-section form');
const urlInput = document.querySelector('#url-input');
const categoryInput = document.querySelector('#category-input');

// Busca e Renderiza os posts
async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts');

        if(!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const result = await response.json();
        const posts = result.data;

        if(posts.length === 0) {
            postsList.innerHTML = '<p>Não há nenhum Post ou Link salvo no momento.</p>'
        } else {
            posts.forEach(post => {
                const postElement = document.createElement('li');
                postElement.classList.add('post');
                postElement.dataset.id = post.id;

                // Se o post/link já foi consumido, adiciona a classe 'consumed'
                if(post.foi_consumido) {
                    postElement.classList.add('consumed');
                }

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
        }
    } catch(error) {
        console.error('Falha ao buscar posts:', error);
        postsList.innerHTML = '<li>Falha ao carregar os posts. Tente novamente mais tarde.</li>';
    }
}

fetchPosts();

// Valida dados do formulário e os envia para o servidor
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = urlInput.value;
    const categoria = categoryInput.value;

    let msgError = '';

    if(!url) {
        msgError = 'Por favor, insira uma URL válida.';
        const msgErrorElement = document.createElement('span');
        msgErrorElement.classList.add('msg-error');

        msgErrorElement.textContent = msgError;

        return;
    }

    const newPost = {
        url: url,
        categoria: categoria
    };

    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });

        if(!response.ok) {
            throw new Error('Falha ao salvar o post/link.');
        }

        urlInput.value = '';
        categoryInput.value = '';

        await fetchPosts();
    } catch(error) {
        console.error('Erro ao salvar post/link: ', error);
        msgError = 'Não foi possível adicionar o post. Tente novamente.';
        const msgErrorElement = document.createElement('span');
        msgErrorElement.classList.add('msg-error');

        msgErrorElement.textContent = msgError;
    }
})

// Evento para botão 'delete-button' excluir um post/link
postsList.addEventListener('click', async (e) => {
    if(e.target.classList.contains('delete-button')) {
        const isConfirmed = confirm('Tem certeza que deseja excluir este Post/Link?');

        if(isConfirmed) {
            const postElement = e.target.closest('.post');
            if (!postElement) return;
            const postId= postElement.dataset.id;

            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                    method: 'DELETE',
                });

                if(!response.ok) {
                    throw new Error('Falha ao deletar Post/Link.');
                }

                postElement.remove();
            } catch(error) {
                console.error('Erro ao deletar post:', error);
                msgError = 'Não foi possível deletar o Post/Link. Tente novamente.';
                const msgErrorElement = document.createElement('span');
                msgErrorElement.classList.add('msg-error');

                msgErrorElement.textContent = msgError;
            }
        }
    } else if(e.target.classList.contains('checked-button')) {
        const postElement = e.target.closest('.post');
        if(!postElement) return;

        const postId = postElement.dataset.id;
        const newConsumedState = !postElement.classList.contains('consumed');

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ foi_consumido: newConsumedState }),
            });

            if(!response.ok) {
                throw new Error('Falha ao atualizar o Post/Link.');
            }

            postElement.classList.toggle('consumed');
        } catch(error) {
            console.error('Erro ao atualizar o post:', error);
            msgError = 'Não foi possível atualizar o Post/Link.';
            const msgErrorElement = document.createElement('span');
            msgErrorElement.classList.add('msg-error');

            msgErrorElement.textContent = msgError;
        }
    }
})
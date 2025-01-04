document.addEventListener('DOMContentLoaded', () => {
    const likedFlatsContainer = document.getElementById('liked-flats-container');
    const likedFlats = JSON.parse(localStorage.getItem('likedFlats')) || [];
    const allFlats = JSON.parse(localStorage.getItem('flats')) || [];

    if (likedFlats.length === 0) {
        likedFlatsContainer.innerHTML = '<p></p>';
        return;
    }

    const likedFlatData = allFlats.filter(flat => likedFlats.includes(String(flat.id)));

    if (likedFlatData.length === 0) {
        likedFlatsContainer.innerHTML = '<p></p>';
        return;
    }

    likedFlatsContainer.innerHTML = ''; // Clear existing content

    likedFlatData.forEach(flat => {
        const flatElement = document.createElement('div');
        flatElement.className = 'box'; // Use the same class as the main page

        const flatIdStr = String(flat.id); // Ensure ID is treated as a string

        flatElement.innerHTML = `
            <div class="admin">
                <h3>${flat.owner ? flat.owner[0] : 'A'}</h3>
                <div>
                    <p>${flat.owner || 'Anonymous'}</p>
                    <span>${new Date(flat.dateAdded).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="thumb">
                <img src="${flat.imageUrl || 'images/default.jpg'}" alt="Flat image">
            </div>
            <p class="location"><i class="fas fa-map-marker-alt"></i><span>${flat.city}</span></p>
            <div class="flex">
                <p><i class="fas fa-bed"></i><span>${flat.rooms}</span></p>
                <p><i class="fas fa-cost"></i><span>${flat.price} UAH</span></p>
            </div>
            <button class="like-btn ${likedFlats.includes(flatIdStr) ? 'liked' : ''}" data-id="${flatIdStr}">
                ${likedFlats.includes(flatIdStr) ? 'Unlike' : 'Like'}
            </button>
        `;

        likedFlatsContainer.appendChild(flatElement);
    });

    attachLikeButtonListeners();
});

// Reuse the same functionality for the like button
function attachLikeButtonListeners() {
    const likeButtons = document.querySelectorAll('.like-btn');
    const likedFlats = JSON.parse(localStorage.getItem('likedFlats')) || [];

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const flatId = String(button.getAttribute('data-id'));
            const likedIndex = likedFlats.indexOf(flatId);

            if (likedIndex === -1) {
                likedFlats.push(flatId);
                button.textContent = 'Unlike';
                button.classList.add('liked');
            } else {
                likedFlats.splice(likedIndex, 1);
                button.textContent = 'Like';
                button.classList.remove('liked');
            }

            localStorage.setItem('likedFlats', JSON.stringify(likedFlats));
        });
    });
}

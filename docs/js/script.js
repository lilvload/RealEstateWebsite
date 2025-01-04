// let menu = document.querySelector('.header .menu');
//
// document.querySelector('#menu-btn').onclick = () =>{
//     menu.classList.toggle('active');
// }

window.onscroll = () =>{
    menu.classList.remove('active');
}

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
    inputNumber.oninput = () =>{
        if(inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
    };
});

document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images =>{
    images.onclick = () =>{
        src = images.getAttribute('src');
        document.querySelector('.view-property .details .thumb .big-image img').src = src;
    }
});

document.querySelectorAll('.faq .box-container .box h3').forEach(headings =>{
    headings.onclick = () =>{
        headings.parentElement.classList.toggle('active');
    }
});

function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
    }
}

function saveProperty(event) {
    event.preventDefault();

    // Отримуємо дані з форми
    const name = document.getElementById('name').value.trim();
    const location = document.getElementById('location').value.trim();
    const price = parseInt(document.getElementById('price').value);
    const rooms = parseInt(document.getElementById('rooms').value);
    const fileInput = document.getElementById('image');
    const imageUrlInput = document.getElementById('imageUrl').value.trim();

    // Перевірка заповненості форми
    if (!name || !location || isNaN(price) || isNaN(rooms)) {
        alert('Будь ласка, заповніть усі обов’язкові поля!');
        return;
    }

    // Обробка зображення
    let imageUrl = '';
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        imageUrl = URL.createObjectURL(file);
    } else if (imageUrlInput) {
        imageUrl = imageUrlInput;
    }

    console.log('Додаємо квартиру:', { name, location, price, rooms, imageUrl });

    // Додаємо нову квартиру до localStorage
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.push({ name, location, price, rooms, imageUrl });

    localStorage.setItem('properties', JSON.stringify(properties));
    alert('Квартиру додано успішно!');

    // Оновлюємо список оголошень
    displayListings(properties);
}

function displayListings(properties) {
    const listingsContainer = document.getElementById('listings');
    console.log('Відображення квартир:', properties);
    listingsContainer.innerHTML = ''; // Очищення контейнера перед оновленням

    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'box';
        propertyDiv.setAttribute('data-location', property.location);
        propertyDiv.setAttribute('data-type', property.type || 'flat');
        propertyDiv.setAttribute('data-rooms', property.rooms);
        propertyDiv.setAttribute('data-price', property.price);

        propertyDiv.innerHTML = `
            <div class="thumb">
                <img src="${property.imageUrl || 'images/default.jpg'}" alt="property image">
            </div>
            <h3 class="name">${property.name}</h3>
            <p class="location">${property.location}</p>
            <p class="price">${property.price} UAH</p>
            <button class="like-button">Like</button>
        `;
        listingsContainer.appendChild(propertyDiv);
    });
}

// Виклик при завантаженні сторінки Home
document.addEventListener('DOMContentLoaded', () => {
    const listingsContainer = document.getElementById('listings');
    const likedFlats = JSON.parse(localStorage.getItem('likedFlats')) || [];

    // Function to render flats into the listings container
    function renderFlats(flats) {
        listingsContainer.innerHTML = ''; // Clear existing content

        flats.forEach(flat => {
            const flatElement = document.createElement('div');
            flatElement.className = 'box';
            flatElement.setAttribute('data-price', flat.price);
            flatElement.setAttribute('data-location', flat.city);
            flatElement.setAttribute('data-rooms', flat.rooms);

            const flatIdStr = String(flat.id); // Ensure flat ID is a string
            const isLiked = likedFlats.includes(flatIdStr);

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
                <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${flatIdStr}">
                    ${isLiked ? 'Unlike' : 'Like'}
                </button>
            `;
            listingsContainer.appendChild(flatElement);
        });

        attachLikeButtonListeners();
    }

    // Function to handle like button actions
    function attachLikeButtonListeners() {
        const likeButtons = document.querySelectorAll('.like-btn');

        likeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const flatId = String(button.getAttribute('data-id')); // Ensure it's a string
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

    // Fetch flats data and render
    const existingFlats = JSON.parse(localStorage.getItem('flats')) || [];

    if (existingFlats.length === 0) {
        fetch('flats.json')
            .then(response => response.json())
            .then(flatsData => {
                localStorage.setItem('flats', JSON.stringify(flatsData));
                renderFlats(flatsData);
            })
            .catch(error => {
                console.error('Error fetching flats:', error);
                listingsContainer.innerHTML = '<p>Failed to load listings. Please try again later.</p>';
            });
    } else {
        renderFlats(existingFlats);
    }
});





document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Зупиняємо перезавантаження сторінки

    // Отримуємо значення введених фільтрів
    const locationInput = document.getElementById('location').value.trim().toLowerCase();
    const typeInput = document.getElementById('type').value.toLowerCase();
    const roomsInput = parseInt(document.getElementById('rooms').value);
    const minPriceInput = parseInt(document.getElementById('minPrice').value);
    const maxPriceInput = parseInt(document.getElementById('maxPrice').value);

    // Отримуємо всі елементи квартир
    const apartments = document.querySelectorAll('.listings .box-container .box');

    apartments.forEach(apartment => {
        // Отримуємо дані з атрибутів data-*
        const aptLocation = apartment.dataset.location.toLowerCase();
        // const aptType = apartment.dataset.type.toLowerCase();
        const aptRooms = parseInt(apartment.dataset.rooms);
        const aptPrice = parseInt(apartment.dataset.price);

        // Перевірка відповідності фільтрам
        const matchesLocation = locationInput === '' || aptLocation.includes(locationInput);
        // const matchesType = aptType === typeInput;
        const matchesRooms = aptRooms === roomsInput;
        const matchesPrice = aptPrice >= minPriceInput && aptPrice <= maxPriceInput;

        // Показуємо/приховуємо квартиру залежно від відповідності фільтрам
        if (matchesLocation && matchesRooms && matchesPrice) {
            apartment.style.display = 'block'; // Показати квартиру
        } else {
            apartment.style.display = 'none'; // Приховати квартиру
        }
    });
});

function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0]; // Отримуємо файл

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result; // Установлюємо зображення
            imagePreview.style.display = 'block'; // Показуємо елемент
        };
        reader.readAsDataURL(file); // Читаємо файл як URL
    } else {
        imagePreview.style.display = 'none'; // Сховати попередній перегляд
    }
}




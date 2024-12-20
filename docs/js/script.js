let menu = document.querySelector('.header .menu');

document.querySelector('#menu-btn').onclick = () =>{
   menu.classList.toggle('active');
}

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

   const name = document.getElementById('name').value;
   const location = document.getElementById('location').value;
   const price = parseInt(document.getElementById('price').value);
   const rooms = parseInt(document.getElementById('rooms').value);
   const fileInput = document.getElementById('image');
   const imageUrlInput = document.getElementById('imageUrl').value;

   let imageUrl = '';
   if (fileInput.files.length > 0) {
       const file = fileInput.files[0];
       imageUrl = URL.createObjectURL(file);
   } else if (imageUrlInput) {
       imageUrl = imageUrlInput;
   }

   const properties = JSON.parse(localStorage.getItem('properties')) || [];
   properties.push({ name, location, price, rooms, imageUrl });

   localStorage.setItem('properties', JSON.stringify(properties));
   alert('Квартиру додано успішно!');
   displayListings(properties);
}

function displayListings(properties) {
   const listingsContainer = document.getElementById('listings');
   listingsContainer.innerHTML = '';

   properties.forEach(property => {
       const propertyDiv = document.createElement('div');
       propertyDiv.className = 'box';
       propertyDiv.innerHTML = `
           <div class="thumb">
               <img src="${property.imageUrl || 'images/default.jpg'}" alt="property image">
           </div>
           <h3 class="name">${property.name}</h3>
           <p class="location">${property.location}</p>
           <p class="price">${property.price} UAH</p>
       `;
       listingsContainer.appendChild(propertyDiv);
   });
}

// Виклик при завантаженні сторінки Home
document.addEventListener('DOMContentLoaded', () => {
   const properties = JSON.parse(localStorage.getItem('properties')) || [];
   displayListings(properties);
});

# Документація до проєкту "Сайт для оренди квартир"

## Вступ

Цей проєкт був розроблений у рамках практичного завдання для створення функціонального та зручного **"Сайту для оренди квартир"**. Мета — забезпечити платформу для зручного додавання та пошуку квартир для оренди, використовуючи сучасні веб-технології.

---

## Огляд проєкту

### Мета

- Забезпечити легку можливість оренди квартир для власників і орендарів.
- Надати інтуїтивну платформу для перегляду доступних оголошень.

### Основні можливості

- Зручний інтерфейс із сучасним дизайном.
- Функціонал для додавання квартир з опціями фільтрації та сортування.
- Можливість "додавати в обрані" для збереження улюблених квартир.
- Інтерактивний пошук із валідацією форм.
- Адаптивність для комфортного використання на різних пристроях.

### Технічні вимоги

Проєкт можна запустити на наступних пристроях:
- **Операційна система**: Windows, macOS, Linux.
- **Процесор**: Багатоядерний, з тактовою частотою не менше 2 ГГц.
- **Оперативна пам’ять**: Мінімум 4 ГБ.
- **Вільний простір на диску**: 1 ГБ.
- **Браузер**: Google Chrome (рекомендовано), Firefox, або будь-який сучасний браузер із підтримкою JavaScript.

---

## Стек технологій

### Frontend:

- **HTML5**: Розмітка сайту.
- **CSS3**: Стилі для забезпечення привабливого дизайну.
- **JavaScript**: Динамічна та інтерактивна поведінка.
- **Font Awesome**: Бібліотека іконок для візуального оформлення.
- **Google Fonts**: Типографіка для покращення читабельності.

### Інше:

- **LocalStorage**: Тимчасове зберігання даних на клієнтській стороні.
- **Git/GitHub**: Контроль версій та спільна робота над кодом.
- **Node.js**: Використано для серверної частини.
- **Express**: Для створення локального сервера.
- **MongoDB**: Для збереження даних оголошень (майбутня інтеграція).

---

## Структура проєкту

### Директорії та ключові файли

#### **Frontend**:

- **index.html**: Головна сторінка сайту.
- **about.html**: Інформація про проєкт.
- **add_property.html**: Сторінка з можливістю додавання квартир.
- **liked_flats.html**: Відображення лайкнутих квартир.
- **css/style.css**: Основні стилі для забезпечення єдиного вигляду.
- **js/script.js**: Логіка для інтерактивних функцій, таких як фільтрація та попередній перегляд зображень.
- **js/liked_flats.js**: Логіка для управління обраними квартирами.
- **images/**: Зображення для оформлення сайту та оголошень.

#### **Дані**:

- **flats.json**: Мок-дані для списків квартир.
- **LocalStorage**: Зберігає взаємодії користувача, такі як обрані квартири.

---

## Приклади коду

### JavaScript: Управління обраними квартирами

```javascript
const likedFlatsContainer = document.getElementById('liked-flats-container');
const likedFlats = JSON.parse(localStorage.getItem('likedFlats')) || [];

if (likedFlats.length === 0) {
    likedFlatsContainer.innerHTML = '<p>Немає обраних квартир.</p>';
} else {
    likedFlats.forEach(flatId => {
        const flat = flats.find(f => f.id === flatId);
        if (flat) {
            likedFlatsContainer.innerHTML += `<div class="flat">
                <h3>${flat.name}</h3>
                <p>Ціна: ${flat.price} UAH</p>
            </div>`;
        }
    });
}
```

### JavaScript: Пошук квартир за фільтрами

```javascript
document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const filters = {
        location: document.getElementById('location').value.toLowerCase(),
        priceMin: parseInt(document.getElementById('price-min').value),
        priceMax: parseInt(document.getElementById('price-max').value),
    };

    const filteredFlats = flats.filter(flat =>
        (!filters.location || flat.city.toLowerCase().includes(filters.location)) &&
        (!filters.priceMin || flat.price >= filters.priceMin) &&
        (!filters.priceMax || flat.price <= filters.priceMax)
    );

    renderFlats(filteredFlats);
});
```

---

## Інструкція з встановлення

### Кроки

1. **Клонування репозиторію**:

   ```bash
   git clone https://github.com/lilvload/RealEstateWebsite.git
   ```

2. **Перехід у директорію проєкту**:

   ```bash
   cd real-estate
   ```

3. **Відкриття в браузері**:

   Перейдіть за адресою `http://localhost:3000`.

---

## Інформація про команду

### Члени команди

- **Бакунець Владислав** ([LinkedIn](https://www.linkedin.com/in/vladyslav-bakunets-a5a621312)):
  *Designer, FrontEnd Developer, TeamLead*
- **Михайлова Софія** ([LinkedIn](https://linkedin.com/in/sofia-mykhailova-a29210334)):
  *Main FrontEnd Developer*

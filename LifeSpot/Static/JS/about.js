// Логика слайдера
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("sliderTrack");
    const wrapper = document.querySelector(".slider-wrapper");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const slides = document.querySelectorAll(".slide-img");

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Обновление позиции слайдера
    const updateSlider = () => {
        track.style.transition = "transform 0.4s ease-out";
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Переключение по кнопкам
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Интерактивное свайпание (перетаскивание мышью)
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    wrapper.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.transition = "none"; // Отключаем анимацию во время drag
    });

    wrapper.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diffX = currentX - startX;
        currentTranslate = -currentIndex * wrapper.clientWidth + diffX;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        const movedBy = currentTranslate - (-currentIndex * wrapper.clientWidth);

        // Если сдвинули больше чем на 50px — переключаем слайд
        if (movedBy < -50 && currentIndex < totalSlides - 1) {
            currentIndex += 1;
        } else if (movedBy > 50 && currentIndex > 0) {
            currentIndex -= 1;
        }

        updateSlider();
    };

    wrapper.addEventListener("mouseup", endDrag);
    wrapper.addEventListener("mouseleave", endDrag);
});

// Логика отзывов: запрашивает данные у пользователя
function getReview() {
    // Запрашиваем имя
    let userName = prompt("Введите ваше имя:");
    if (!userName || userName.trim() === "") {
        alert("Имя не может быть пустым!");
        return;
    }

    // Запрашиваем текст отзыва
    let userComment = prompt("Введите ваш отзыв:");
    if (!userComment || userComment.trim() === "") {
        alert("Текст отзыва не может быть пустым!");
        return;
    }

    // Получаем текущую дату и время
    let currentDate = new Date().toLocaleString();

    // Вызываем стрелочную функцию для добавления отзыва на страницу
    addReview(userName, userComment, currentDate);
}

// Стрелочная функция: формирует HTML и добавляет отзыв на страницу
const addReview = (userName, userComment, currentDate) => {
    let container = document.getElementById("reviews-container");

    // Создаем карточку отзыва
    let reviewItem = document.createElement("div");
    reviewItem.className = "review-item";
    reviewItem.innerHTML = `
        <p class="review-author"><strong>${userName}</strong> <span class="review-date">${currentDate}</span></p>
        <p class="review-text">${userComment}</p>
    `;

    // Добавляем отзыв в контейнер
    container.appendChild(reviewItem);
};
// Логика слайдера
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("sliderTrack");
    const wrapper = document.querySelector(".slider-wrapper");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const slides = document.querySelectorAll(".slide-img");

    if (!track || slides.length === 0) {
        console.warn("[Slider] Элементы слайдера не найдены на странице.");
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Обновление позиции слайдера
    const updateSlider = () => {
        track.style.transition = "transform 0.4s ease-out";
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Отслеживаем переключение слайдов в консоли
        console.log(`[Slider] Переключение на слайд №${currentIndex + 1} из ${totalSlides}`);
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

    const endDrag = () => {
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
    console.log("[Reviews] Старт процесса добавления отзыва...");

    // Запрашиваем имя
    let userName = prompt("Введите ваше имя:");
    console.log("[Reviews] Введенное имя:", userName);

    if (!userName || userName.trim() === "") {
        console.warn("[Reviews] Валидация не пройдена: Имя пользователя не заполнено.");
        return;
    }

    // Запрашиваем текст отзыва
    let userComment = prompt("Введите ваш отзыв:");
    console.log("[Reviews] Введенный текст:", userComment);

    if (!userComment || userComment.trim() === "") {
        console.warn("[Reviews] Валидация не пройдена: Текст отзыва не заполнен.");
        return;
    }

    // Получаем текущую дату и время
    let currentDate = new Date().toLocaleString();

    // Вызываем стрелочную функцию для добавления отзыва на страницу
    addReview(userName, userComment, currentDate);
}

// Стрелочная функция: формирует HTML и добавляет отзыв на страницу
const addReview =(userName, userComment, currentDate) => {
    // Раскомментировать, если мы хотим, чтобы браузер ставил паузу при добавлении отзыва
    //debugger;

    let container = document.getElementById("reviews-container");

    if (!container) {
        console.error("[Reviews] Ошибка: Элемент #reviews-container не найден в DOM-дереве!");
        return;
    }

    // Создаем карточку отзыва
    let reviewItem = document.createElement("div");
    reviewItem.className = "review-item";
    reviewItem.innerHTML = `
        <p class="review-author"><strong>${userName}</strong> <span class="review-date">${currentDate}</span></p>
        <p class="review-text">${userComment}</p>
    `;

    // Добавляем отзыв в контейнер
    container.appendChild(reviewItem);

    // Информируем об успешном добавлении в консоль, выводя объект с данными
    console.log("[Reviews] Отзыв успешно опубликован:", {
        author: userName,
        comment: userComment,
        date: currentDate
    });
};
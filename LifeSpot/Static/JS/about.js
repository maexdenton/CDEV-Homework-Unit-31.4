// Классическая функция: запрашивает данные у пользователя
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
// добавляем подпись ошибки заполнения формы
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
};
// убираем подпись ошибки заполнения формы
const hideInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
};
// проверка валидности заполнения формы
const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass);
    }
};
// валидация посимвольно
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
// активация, дезактивация кнопки формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}
// функция валидации форм
const enableValidation = (item) => { 
    // массив форм
    const formList = Array.from(document.querySelectorAll(item.formSelector));
    // для каждого элемента формы
    formList.forEach((formElement) => {
        // создаём массив полей
        const fieldsetList = Array.from(formElement.querySelectorAll(item.fildSelector));
        // для каждого поля
        fieldsetList.forEach((fieldset) => {
            // создаём массив инпутов
            const inputList = Array.from(fieldset.querySelectorAll(item.inputSelector));
            // для каждого инпута создаём слушатель с проверкой валидности
            inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    checkInputValidity(fieldset, inputElement, item.inputErrorClass);
                    // находим кнопку отправки, сохранения данных
                    const buttonElement = fieldset.querySelector(item.submitButtonSelector);
                    // вызываем функцию активации, дезактивации кнопки
                    toggleButtonState(inputList, buttonElement, item.inactiveButtonClass);
                });
                formElement.addEventListener('submit', function (evt) {
                    evt.preventDefault();
                });
            });
        });
    });
}
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible',
    fildSelector: '.form__field'
});

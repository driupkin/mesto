export default class FormValidator {
    constructor(data, formElement) {
        this._data = data;
        this._formElement = formElement;
    }

    _showInputError(errorMessage, inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._data.inputErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement.validationMessage, inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._data.inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._data.inactiveButtonClass);
        }
    }

    enableValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
        // для каждого инпута создаём слушатель с проверкой валидности
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                // находим кнопку отправки, сохранения данных
                const buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
                // вызываем функцию активации, дезактивации кнопки
                this._toggleButtonState(inputList, buttonElement);
            });
        });

    }

    cleanErrorsFields() {
        // убираем красную линию
        const removeErrors = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
        removeErrors.forEach((item) => {
            item.classList.remove(this._data.inputErrorClass);
        });
        // убираем текст ошибки
        const removeErrorTexts = Array.from(this._formElement.querySelectorAll(this._data.errorSelector));
        removeErrorTexts.forEach((item) => {
            item.textContent = '';
        });
    }
}
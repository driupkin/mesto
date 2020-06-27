const validation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible',
    fildSelector: '.form__field'
};
const selector = document.querySelector('.form');
const cardsSelector = document.querySelector('.form_cards');

class FormValidator {
    constructor(data, formSelector) {
        this._data = data;
        this._formSelector = formSelector;
    }

    _showInputError(errorMessage) {
        const inputElement = this._formSelector.querySelector(this._data.inputSelector);
        const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError() {
        const inputElement = this._formSelector.querySelector(this._data.inputSelector);
        const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._data.inputErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity() {
        const inputElement = this._formSelector.querySelector(this._data.inputSelector);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement.validationMessage);
        } else {
            this._hideInputError();
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

        // создаём массив полей
        const fieldsetList = Array.from(this._formSelector.querySelectorAll(this._data.fildSelector));
        // для каждого поля
        fieldsetList.forEach((fieldset) => {
            // создаём массив инпутов
            const inputList = Array.from(fieldset.querySelectorAll(this._data.inputSelector));
            // для каждого инпута создаём слушатель с проверкой валидности
            inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity();
                    // находим кнопку отправки, сохранения данных
                    const buttonElement = fieldset.querySelector(this._data.submitButtonSelector);
                    // вызываем функцию активации, дезактивации кнопки
                   this._toggleButtonState(inputList, buttonElement);
                });
                this._formSelector.addEventListener('submit', function (evt) {
                    evt.preventDefault();
                });
            });
        });
    }
}

const formValidation = new FormValidator(validation, selector);
formValidation.enableValidation();
const cardsFormValidation = new FormValidator(validation, cardsSelector);
cardsFormValidation.enableValidation();
export class FormValidator {
    constructor(data, formSelector) {
        this._data = data;
        this._formSelector = formSelector;
    }

    _showInputError(errorMessage, inputElement) {
        const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
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
        // создаём массив полей
        const fieldsetList = Array.from(this._formSelector.querySelectorAll(this._data.fildSelector));
        console.log(fieldsetList);
        // для каждого поля
        fieldsetList.forEach((fieldset) => {
            // создаём массив инпутов
            const inputList = Array.from(fieldset.querySelectorAll(this._data.inputSelector));
            console.log(inputList);
            // для каждого инпута создаём слушатель с проверкой валидности
            inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
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
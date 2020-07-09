import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
    }
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setEventListeners() {
        const buttonClose = this._popup.querySelector('.popup__close');
        buttonClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', evt => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
        const formElement = this._popup.querySelector('.form');
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
            this.close();
        });
    }
    close() {
        this._popup.classList.remove('popup_opened');
        this._popup.querySelector('.form').reset();
        document.removeEventListener('keydown', super._handleEscClose());
    }
}
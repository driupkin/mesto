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
        super.setEventListeners();
        const formElement = this._popup.querySelector('.form');
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._popup.querySelector('.form').reset();
    }
}
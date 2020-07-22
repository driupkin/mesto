import Popup from './Popup.js';
export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
    }
    setEventListeners() {
        super.setEventListeners();
        const formElement = this._popup.querySelector('.form');
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler();
        });
    }
}
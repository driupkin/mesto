export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            //this._popup.classList.remove('popup_opened');
           return this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', evt => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
}
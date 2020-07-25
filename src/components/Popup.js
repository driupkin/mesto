export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose());
        document.removeEventListener('keydown', this._handleEscClose());
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose = () => {
        return (evt) => {
            evt.key === 'Escape'
                ? this.close()
                : null;
        }
    }

    setEventListeners() {
        const buttonClose = this._popup.querySelector('.popup__close');
        buttonClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', evt => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
}
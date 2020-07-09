import Popup from './Popup.js';
import { popupImage, popupSubTitle } from '../script/constants.js';
export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._urlValue = data.urlValue;
        this._nameValue = data.nameValue;
    }
    open() {
        this._popup.classList.add('popup_opened');
        popupImage.setAttribute('src', this._urlValue);
        popupImage.setAttribute('alt', this._nameValue);
        popupSubTitle.textContent = this._nameValue;
        document.addEventListener('keydown', super._handleEscClose());
    }
}
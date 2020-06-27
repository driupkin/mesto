import {popupOpenClose, popupCards} from './script.js';
export class Card {
    constructor(nameValue, urlValue, cardTemplate) {
        this._nameValue = nameValue;
        this._urlValue = urlValue;
        this._cardTemplate = cardTemplate;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').alt = this._nameValue;
        this._element.querySelector('.element__image').src = this._urlValue;
        this._element.querySelector('.element__paragraph').textContent = this._nameValue;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._element.querySelector('.element__like').classList.toggle('element__like_active');
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._element.querySelector('.element__trash').closest('.element').remove();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            const popupImage = document.querySelector('.popup__image');
            const popupSubTitle = document.querySelector('.popup__subtitle');
            popupImage.setAttribute('src', this._urlValue);
            popupImage.setAttribute('alt', this._nameValue);
            popupSubTitle.textContent = this._nameValue;
            popupOpenClose(popupCards);
        });
    }
}
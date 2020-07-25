export default class Card {
    constructor(values = {}, cardTemplate, handleCardClick, handleTrashClick, handleLikeClick) {
        this._nameValue = values.name;
        this._urlValue = values.link;
        this._likesValue = values.likes;
        this._ownerId = values.ownerId;
        this._cardOwnerId = values.owner._id;
        this._idValue = values._id;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard(myId) {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.alt = this._nameValue;
        this._elementImage.src = this._urlValue;
        this._element.querySelector('.element__paragraph').textContent = this._nameValue;
        this._element.querySelector('.like__count').textContent = this._likesValue.length;

        if (this._likesValue.some((el) => el._id === myId)) {
            this._element.querySelector('.like__heart').classList.add('like__heart_active');
        }

        if (this._cardOwnerId === myId) {
            this._element.querySelector('.element__trash').classList.add('element__trash_active');
        }
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.like__heart').addEventListener('click', () => {
            this._element.querySelector('.like__heart').classList.toggle('like__heart_active');
            this._handleLikeClick(this._element);
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleTrashClick(this._element);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._nameValue, this._urlValue);
        });
    }
}
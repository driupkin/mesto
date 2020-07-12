export const popupCards = document.querySelector('.popup_cards');
export const popupImage = document.querySelector('.popup__image');
export const popupSubTitle = document.querySelector('.popup__subtitle');
export const popupList = Array.from(document.querySelectorAll('.popup'));
export const editProfile = document.querySelector('.profile__button-edit');
export const addProfile = document.querySelector('.profile__button-add');
export const nameInput = document.querySelector('.form__input_name');
export const jobInput = document.querySelector('.form__input_description');
export const formButtonAddCards = document.querySelector('.form__button_add-card');
export const formButtonEditCards = document.querySelector('.form__button_edit-card');
export const selector = document.querySelector('.form');
export const cardsSelector = document.querySelector('.form_cards');
export const validation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorSelector: '.form__input-error',
    fieldSelector: '.form__field'
};
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }

];
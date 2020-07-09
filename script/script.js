import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupCards, validation, initialCards, popupList } from './constants.js';
import { openPopup, closePopup } from './utils.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCards = document.querySelector('.popup_add-cards');
const editProfile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const formElement = document.querySelector('.form');
const addFormCards = document.querySelector('.form_cards');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_description');
const placeInput = document.querySelector('.form__input_place');
const urlInput = document.querySelector('.form__input_url');
const formButtonEdit = document.querySelector('.form__button');
const formButtonAddCards = document.querySelector('.form__button_add-card');
const selector = document.querySelector('.form');
const cardsSelector = document.querySelector('.form_cards');
const formValidation = new FormValidator(validation, selector);
const cardsFormValidation = new FormValidator(validation, cardsSelector);

formValidation.enableValidation();
cardsFormValidation.enableValidation();

// добавление карточек из массива
function addInitialCards() {
    initialCards.forEach(item => {
        const card = new Card(item.name, item.link, '#card', () => {
            const popupWithImage = new PopupWithImage({ urlValue: item.link, nameValue: item.name }, '.popup_cards');
            popupWithImage.open();
            popupWithImage.setEventListeners();
        });
        const cardElement = card.generateCard();
        elements.prepend(cardElement);
    });
}
addInitialCards();

function formInput() {
    // Заполнение формы имя
    nameInput.value = profileName.textContent;
    // Заполнение формы "описаниие"
    jobInput.value = profileDescription.textContent;
    // активация кнопки формы профиля
    formButtonEdit.classList.remove('form__button_inactive');
    // дезактивация кнопки формы карточек
    formButtonAddCards.classList.add('form__button_inactive');
}
// сохранение карточек
// function addFormSubmitHandler(evt) {
//     evt.preventDefault();
//     const newCard = new Card(placeInput.value, urlInput.value, '#card');
//     const cardElement = newCard.generateCard();
//     elements.prepend(cardElement);
//     closePopup(popupAddCards);
//     addFormCards.reset();
// }
// Изменение данных в профиле
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
    formInput();
}

//formElement.addEventListener('submit', formSubmitHandler);
//addFormCards.addEventListener('submit', addFormSubmitHandler);
editProfile.addEventListener('click', () => { nameInput.value = newUser.getUserInfo().name;
    //openPopup(popupEditProfile);
    const popupEditProfile = new PopupWithForm('.popup_edit-profile', (item) => {
        const newUser = new UserInfo({name:'.profile__name', description:'.profile__subtitle'});
        nameInput.value = newUser.getUserInfo().name;
    });
    popupEditProfile.open();
    popupEditProfile.setEventListeners();
    //formInput();
    formValidation.cleanErrosFields();
});
addProfile.addEventListener('click', () => {
    formButtonAddCards.classList.add('form__button_inactive');
    const popupAddCard = new PopupWithForm('.popup_add-cards', (item) => {
        const newCard = new Card(item.place, item.url, '#card', () => {
            const popupWithImage = new PopupWithImage({ urlValue: item.url, nameValue: item.place }, '.popup_cards');
            popupWithImage.open();
            popupWithImage.setEventListeners();
        });
        const cardElement = newCard.generateCard();
        elements.prepend(cardElement);
    });
    popupAddCard.open();
    popupAddCard.setEventListeners();
    cardsFormValidation.cleanErrosFields();
});
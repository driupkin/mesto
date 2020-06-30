import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupCards, validation, initialCards, popupList } from './constants.js';
import { openPopup, closePopup } from './utils.js';
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCards = document.querySelector('.popup_add-cards');
const editProfile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const closePopupProfile = document.querySelector('.popup__close');
const closePopupAddCards = document.querySelector('.popup__close_add-card');
const closePopupCardsButton = document.querySelector('.popup__close_card');
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
        const card = new Card(item.name, item.link, '#card');
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
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const newCard = new Card(placeInput.value, urlInput.value, '#card');
    const cardElement = newCard.generateCard();
    elements.prepend(cardElement);
    closePopup(popupAddCards);
    addFormCards.reset();
}
// Изменение данных в профиле
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
    formInput();
}

// функция закрытия попапа кликом по фону
function popupOverlayClose() {
    popupList.forEach((item) => {
        item.addEventListener('mousedown', evt => {
            if (evt.target === item) {
                closePopup(item);
            }
        });
    });
}
popupOverlayClose();
formElement.addEventListener('submit', formSubmitHandler);
addFormCards.addEventListener('submit', addFormSubmitHandler);
editProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    formInput();
    formValidation.cleanErrorsFields();
});
addProfile.addEventListener('click', () => {
    openPopup(popupAddCards);
    formInput();
    cardsFormValidation.cleanErrorsFields();
});
closePopupProfile.addEventListener('click', () => closePopup(popupEditProfile));
closePopupAddCards.addEventListener('click', () => closePopup(popupAddCards));
closePopupCardsButton.addEventListener('click', () => closePopup(popupCards));
import './index.css';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import { validation, initialCards, } from '../utils/constants.js';
import { data } from 'autoprefixer';
const editProfile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_description');
const formButtonAddCards = document.querySelector('.form__button_add-card');
const formButtonEditCards = document.querySelector('.form__button_edit-card');
const selector = document.querySelector('.form');
const cardsSelector = document.querySelector('.form_cards');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const trashButton = document.querySelector('.element__trash');
// функция создания экземпляра карточки
function templateCard(item) {
    const card = new Card({ nameValue: item.name, urlValue: item.link, likesValue: item.likes }, '#card', (name, link) => {
        const popupWithImage = new PopupWithImage({ nameValue: name, urlValue: link },
            '.popup_cards', { imageSelector: '.popup__image', subtitleSelector: '.popup__subtitle' });
        popupWithImage.open();
        popupWithImage.setEventListeners();
    });
    return card.generateCard();
}
const apiMe = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me',
    headers: {
        authorization: '719abc6c-853b-49cf-a6ae-f91d269216f8',
        'Content-Type': 'application/json'
    }
});
apiMe.getData()
    .then(data => {
        profileName.textContent = data.name;
        profileTitle.textContent = data.about;
        profileAvatar.src = data.avatar;
    });

const apiCards = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
    headers: {
        authorization: '719abc6c-853b-49cf-a6ae-f91d269216f8',
        'Content-Type': 'application/json'
    }
});
apiCards.getData()
    .then(data => {
        // добавление карточек из массива
        const cardList = new Section({
            items: data, renderer: (item) => {
                console.log(item);
                const cardElement = templateCard(item);
                cardList.addItem(cardElement);
            }
        }, '.elements');
        cardList.renderItems();
    });

// Добавление новых карточек
const cardsFormValidation = new FormValidator(validation, cardsSelector);
const popupAddCard = new PopupWithForm('.popup_add-cards', (item) => {
    const newCardList = new Section({
        items: [item], renderer: (item) => {
            item.likes = [];
            console.log(item);
            apiCards.addCard(item); // запрос на сервер
            const newCardElement = templateCard(item);
            newCardList.addItem(newCardElement);
        }
    }, '.elements');
    newCardList.renderItems();
    popupAddCard.close();
});
cardsFormValidation.enableValidation();
popupAddCard.setEventListeners();

// Изменение данных в профиле
const newUser = new UserInfo({ name: '.profile__name', description: '.profile__subtitle' });
const formValidation = new FormValidator(validation, selector);
const popupEditProfile = new PopupWithForm('.popup_edit-profile', (item) => {
    apiMe.editProfile(item); // запрос на сервер
    newUser.setUserInfo({ name: item.name, description: item.description });
    popupEditProfile.close();
});
formValidation.enableValidation();
popupEditProfile.setEventListeners();

editProfile.addEventListener('click', () => {
    formButtonEditCards.classList.remove('form__button_inactive');
    nameInput.value = newUser.getUserInfo().name;
    jobInput.value = newUser.getUserInfo().description;
    popupEditProfile.open();
    formValidation.cleanErrorsFields();
});

addProfile.addEventListener('click', () => {
    formButtonAddCards.classList.add('form__button_inactive');
    popupAddCard.open();
    cardsFormValidation.cleanErrorsFields();
});
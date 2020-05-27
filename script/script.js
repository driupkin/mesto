const popup = document.querySelector('.popup');
const editPprofile = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__close');
const formButton = document.querySelector('.form__button');
let formElement = document.querySelector('.form');
let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('.form__input_name');
let profileDescription = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('.form__input_description');
const initialCards = [
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
function formInput() {
    /**Заполнение формы имя */
    nameInput.value = profileName.textContent;
    /* Заполнение формы "описаниие"*/
    jobInput.value = profileDescription.textContent;
}
/*Функция открытия-закрытия попапа*/
function popupOpened() {
    popup.classList.toggle('popup_opened');
    formInput();
}

/**Изменение данных в профиле */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupOpened();
}
formElement.addEventListener('submit', formSubmitHandler);
editPprofile.addEventListener('click', popupOpened);
closePopup.addEventListener('click', popupOpened);

initialCards.forEach(item => {
    const cardTemplate = document.querySelector('#card').content;
    const elements = document.querySelector('.elements');
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = item.name;
    cardElement.querySelector('.element__paragraph').textContent = item.name;
    elements.append(cardElement);
});
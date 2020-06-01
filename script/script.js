const popup = document.querySelector('.popup');
const popupAddCards = document.querySelector('.popup_add-cards');
const editPprofile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const closePopup = document.querySelector('.popup__close');
const formTitle = document.querySelector('.form__title');
const popupCards = document.querySelector('.popup_cards');
const closePopupAddCards = document.querySelector('.popup__close_add-card');
const closePopupCardsButton = document.querySelector('.popup__close_card');
const formElement = document.querySelector('.form');
const addFormCards = document.querySelector('.form-cards');
const cardElementImage = document.querySelector('.element__image');
let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('.form__input_name');
let profileDescription = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('.form__input_description');
let placeInput = document.querySelector('.form__input_place');
let urlInput = document.querySelector('.form__input_url');
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
    //Заполнение формы имя
    nameInput.value = profileName.textContent;
    // Заполнение формы "описаниие"
    jobInput.value = profileDescription.textContent;
}
// Функция открытия-закрытия попапа
function popupOpenClose(popupName) {
    popupName.classList.toggle('popup_opened');
    if (popupName = popup)
        formInput();
}
// Изменение данных в профиле
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupOpenClose();
}
// сохранение карточек
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    initialCards.unshift({ name: `${placeInput.value}`, link: `${urlInput.value}` });
    addInitialCards(1);
    addPopupOpen();
}

// карточки из массива
function addInitialCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const cardTemplate = document.querySelector('#card').content;
        const elements = document.querySelector('.elements');
        const cardElement = cardTemplate.cloneNode(true);
        cardElementImage.src = initialCards[i].link;
        cardElementImage.alt = initialCards[i].name;
        cardElement.querySelector('.element__paragraph').textContent = initialCards[i].name;
        elements.append(cardElement);
        // лайк
        const likeButton = document.querySelector('.element__like');
        likeButton.addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });
        // удаление карточки    
        const trashButton = document.querySelector('.element__trash');
        trashButton.addEventListener('click', function (evt) {
            evt.target.closest('.element').remove();
        });
        popupImageOpenClose();
    }
}
// Открытие попапа с картинкой
function popupImageOpenClose() {
    const cardImage = document.querySelector('.element__image');
    cardImage.addEventListener('click', function (evt) {
        popupCards.classList.toggle('popup_opened');
        const popupImage = document.querySelector('.popup__imege');
        const urlImage = evt.target.getAttribute('src');
        const placeName = evt.target.getAttribute('alt');
        const popupSubTitle = document.querySelector('.popup__subtitle');
        popupImage.setAttribute('src', urlImage);
        popupImage.setAttribute('alt', placeName);
        popupSubTitle.textContent = placeName;
    }
    );
}

formElement.addEventListener('submit', formSubmitHandler);
addFormCards.addEventListener('submit', addFormSubmitHandler);
editPprofile.addEventListener('click', evt => evt = popupOpenClose(popup));
closePopup.addEventListener('click', evt => evt = popupOpenClose(popup));
addProfile.addEventListener('click', evt => evt = popupOpenClose(popupAddCards));
closePopupAddCards.addEventListener('click', evt => evt = popupOpenClose(popupAddCards));
closePopupCardsButton.addEventListener('click', evt => evt = popupOpenClose(popupCards));
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
// Функция открытия-закрытия попапа
function popupOpenClose(popupName) {
    popupName.classList.toggle('popup_opened');
    formInput();
}
// добавление карточек
function addInitialCards(nameValue, urlValue) {
    placeInput.value = '';
    urlInput.value = '';
    const cardTemplate = document.querySelector('#card').content;
    const elements = document.querySelector('.elements');
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementImage = cardElement.querySelector('.element__image');
    cardElementImage.alt = nameValue;
    cardElementImage.src = urlValue;
    cardElement.querySelector('.element__paragraph').textContent = nameValue;
    // добавляем слушатель лайка
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    // добавляем слушатель удаления
    cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    // Открытие попапа с картинкой
    cardElementImage.addEventListener('click', function () {
        popupCards.classList.toggle('popup_opened');
        const popupImage = document.querySelector('.popup__imege');
        popupImage.setAttribute('src', urlValue);
        popupImage.setAttribute('alt', nameValue);
        document.querySelector('.popup__subtitle').textContent = nameValue;
    }
    );
    elements.prepend(cardElement);

}
// сохранение карточек
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    addInitialCards(placeInput.value, urlInput.value);
    popupOpenClose(popupAddCards);
}

initialCards.forEach(item => addInitialCards(item.name, item.link));

function formInput() {
    //Заполнение формы имя
    nameInput.value = profileName.textContent;
    // Заполнение формы "описаниие"
    jobInput.value = profileDescription.textContent;
}

// Изменение данных в профиле
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupOpenClose(popup);
}

formElement.addEventListener('submit', formSubmitHandler);
addFormCards.addEventListener('submit', addFormSubmitHandler);
editPprofile.addEventListener('click', evt => evt = popupOpenClose(popup));
closePopup.addEventListener('click', evt => evt = popupOpenClose(popup));
addProfile.addEventListener('click', evt => evt = popupOpenClose(popupAddCards));
closePopupAddCards.addEventListener('click', evt => evt = popupOpenClose(popupAddCards));
closePopupCardsButton.addEventListener('click', evt => evt = popupOpenClose(popupCards));
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCards = document.querySelector('.popup_add-cards');
const editPprofile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const closePopup = document.querySelector('.popup__close');
const popupCards = document.querySelector('.popup_cards');
const closePopupAddCards = document.querySelector('.popup__close_add-card');
const closePopupCardsButton = document.querySelector('.popup__close_card');
const formElement = document.querySelector('.form');
const addFormCards = document.querySelector('.form-cards');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const popupImage = document.querySelector('.popup__image');
const popupSubTitle = document.querySelector('.popup__subtitle');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_description');
const placeInput = document.querySelector('.form__input_place');
const urlInput = document.querySelector('.form__input_url');
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
function addCards(nameValue, urlValue) {
    const cardTemplate = document.querySelector('#card').content;
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
        popupOpenClose(popupCards);
        popupImage.setAttribute('src', urlValue);
        popupImage.setAttribute('alt', nameValue);
        popupSubTitle.textContent = nameValue;
    }
    );
    elements.prepend(cardElement);

}
// сохранение карточек
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    addCards(placeInput.value, urlInput.value);
    popupOpenClose(popupAddCards);
    placeInput.value = '';
    urlInput.value = '';
}

initialCards.forEach(item => addCards(item.name, item.link));

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
    popupOpenClose(popupEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);
addFormCards.addEventListener('submit', addFormSubmitHandler);
editPprofile.addEventListener('click', evt => popupOpenClose(popupEditProfile));
closePopup.addEventListener('click', evt => popupOpenClose(popupEditProfile));
addProfile.addEventListener('click', evt => popupOpenClose(popupAddCards));
closePopupAddCards.addEventListener('click', evt => popupOpenClose(popupAddCards));
closePopupCardsButton.addEventListener('click', evt => popupOpenClose(popupCards));
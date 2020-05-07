'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('delivery');


function toggleModal() {
  modal.classList.toggle("is-open");
}


//ф-ция  открытия/скрытия модального окна

function toggleModalAuth() {

  modalAuth.classList.toggle('is-open');

};


//ф-ция в случае, если пользователь авторизован

function authorized() {

  function logOut() {
    login = "";
    localStorage.removeItem('delivery');
    buttonAuth.style.display = "";
    buttonOut.style.display = "";
    userName.style.display = "";

    buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }

  console.log('авторизован');

  userName.textContent = login;

  buttonAuth.style.display = "none";
  buttonOut.style.display = "flex";
  userName.style.display = "inline";

  buttonOut.addEventListener('click', logOut);

};


//ф-ция в случае, если пользователь не авторизован

function notAuthorized() {

  console.log('не авторизован');

  function logIn(evt) {

    evt.preventDefault();

    login = loginInput.value;

    if (!login) {

      loginInput.style.borderColor = "red";
      alert('Заполните поле "Логин"');


    } else {

      loginInput.style.borderColor = "initial";
    
      localStorage.setItem('delivery', login);
      // password = passwordInput.value;
      toggleModalAuth();
      
    };

    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
 
    checkAuth();

  };

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}


//ф-ция проверки авторизации

function checkAuth() {

  if (login) {
  
    authorized();
  
  } else {
  
    notAuthorized();
  
  }

};


// ф-ция создания карты рессторана
function createCardRestaurant() {

  const card = `
      <a class="card card-restaurant">
        <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">Тануки</h3>
            <span class="card-tag tag">60 мин</span>
          </div>

          <div class="card-info">
            <div class="rating">
              4.5
            </div>
            <div class="price">От 1 200 ₽</div>
            <div class="category">Суши, роллы</div>
          </div>
        </div>
      </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);

};

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `

          <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">Пицца Классика</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
                грибы.
              </div>
            </div>
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">510 ₽</strong>
            </div>
          </div>
  
  `);

  cardsMenu.insertAdjacentElement("beforeend", card);
};

//ф-ция создания товоров
function openGoods(evt) {

  const target = event.target;

  const restaurant = target.closest('.card-restaurant');
  
  if (restaurant) {

    cardsMenu.textContent = '';

    restaurants.classList.add('hide');
    containerPromo.classList.add('hide');
    menu.classList.remove('hide');

    createCardGood();
    createCardGood();
    createCardGood();
    
  };
};

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);
cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', ()=> {
  
  restaurants.classList.remove('hide');
  containerPromo.classList.remove('hide');
  menu.classList.add('hide');

  }
);


checkAuth();

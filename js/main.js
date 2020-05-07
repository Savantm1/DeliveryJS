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

const getData = async function (url) {
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url},
     статус ошибка ${response.status}!`);
  };

  return await response.json();
};


console.log(getData('./db/partners.json'));

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
function createCardRestaurant( { image, kitchen, name, price, stars, products, time_of_delivery:timeOfDelivery } ) {

  const card = `
      <a class="card card-restaurant" data-products="${products}">
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${timeOfDelivery}</span>
          </div>

          <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
      </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);

};

function createCardGood({ description,image, name, price }) {
  

  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `

          <img src="${image}" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">${description}
              </div>
            </div>
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">${price} ₽</strong>
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
    getData(`./db/${restaurant.dataset.products}`).then(function (data) {
      data.forEach(createCardGood);
    });

    
  } else {
    toggleModalAuth();
  }
};

getData('./db/partners.json').then(function (data) {
  data.forEach(createCardRestaurant)
});
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

function init() {

  getData('./db/partners.json').then(function (data) {
    data.forEach(createCardRestaurant)
  });
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
  
};

init();
checkAuth();

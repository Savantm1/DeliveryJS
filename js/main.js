const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// день первый

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('delivery');


buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);


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

checkAuth();


const registerEmail = document.querySelector('.main .main__form #register-email');
const registerName = document.querySelector('.main .main__form #register-name');
const registerPassword = document.querySelector('.main .main__form #register-password');
const registerBtn = document.querySelector('.main .main__form #register-button');
const emailError = document.querySelector('.main .main__form .main__error-email');
const nameError = document.querySelector('.main .main__form .main__error-name');
const passwordError = document.querySelector('.main .main__form .main__error-password');
const logo = document.querySelector('.main .main__title');
const placeholders = document.querySelectorAll('.main .main__form .main__input');
const loginNav = document.querySelector('.main .main__create .main__register');
const loginNavUndertext = document.querySelector('.main .main__create .main__register-create');

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

let userList = [];
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

userList = JSON.parse(localStorage.getItem('userList'));

if (userList === null) {
    userList = [
        {
            name: 'Test',
            email: 'test@test.com',
            password: 'Test1234'
        }
    ]
}

if (registerEmail) {
    registerEmail.addEventListener('input', () => {
        if (emailReg.test(String(registerEmail.value).toLowerCase()) == true) {
            emailError.style.display = 'none';
            registerBtn.disabled = false;
        } else {
            emailError.style.display = 'flex';
            registerBtn.disabled = true;
        }
    });
    
    registerName.addEventListener('input', () => {
        if (registerName.value == '' || registerName.value.length < 6) {
            nameError.style.display = 'flex';
            registerBtn.disabled = false;
        } else {
            nameError.style.display = 'none'
            registerBtn.disabled = true;
        }
    })
    
    registerPassword.addEventListener('input', () => {
        if(passwordReg.test(String(registerPassword.value)) == true) {
            passwordError.style.display = 'none';
            registerBtn.disabled = false;
        } else {
            passwordError.style.display = 'flex';
            registerBtn.disabled = true;
        }
    });

    registerBtn.addEventListener('click', () => {
        userList.push({
            name: registerName.value,
            email: registerEmail.value,
            password: registerPassword.value
        })
        alert('User created succesfully');
        localStorage.setItem('userList', JSON.stringify(userList));
        registerEmail.value = '';
        registerName.value = '';
        registerPassword.value = '';
    })
}

let settingsArray = [
    {
        selectedLanguage: 'english',
        darkMode: false
    }
]

settingsArray = JSON.parse(localStorage.getItem('settingsArray'));

function darkMode() {
    document.body.style.backgroundColor = '#2a2a2a';
    logo.style.color = '#fafafa';
    placeholders.forEach((e) => {
        e.style.borderColor = '#fafafa';
    });
    loginNav.style.color = '#fafafa';
}

function lightMode() {
    document.body.style.backgroundColor = '#fafafa';
    logo.style.color = '#2a2a2a';
    placeholders.forEach((e) => {
        e.style.borderColor = '#2a2a2a';
    });
    loginNav.style.color = '#2a2a2a';
}


if (settingsArray[0].darkMode == true) {
    darkMode();
} else {
    lightMode();
}

function setEnglishLanguage() {
    logo.textContent = 'Login to My';
    placeholders[1].placeholder = 'Name';
    placeholders[2].placeholder = 'Password';
    registerBtn.textContent = 'Register';
    loginNav.textContent = 'Already have an account?';
    loginNavUndertext.textContent = 'Login now!';
}

function setPolishLanguage() {
    logo.textContent = 'Zaloguj się do My';
    placeholders[1].placeholder = 'Imie';
    placeholders[2].placeholder = 'Hasło';
    registerBtn.textContent = 'Zarejestruj się';
    loginNav.textContent = 'Masz już konto?';
    loginNavUndertext.textContent = 'Zaloguj się!';
}

if (settingsArray[0].selectedLanguage == 'english') {
    setEnglishLanguage();
} else {
    setPolishLanguage();
}


const logoSpan = document.createElement('span');
logoSpan.classList.add('main__title-logo');
logoSpan.textContent = 'Notes';
logo.appendChild(logoSpan);
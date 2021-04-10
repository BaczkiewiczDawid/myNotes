const loginBtn = document.querySelector('.main .main__form .login-btn');
const loginEmail = document.querySelector('.main .main__form #login-email');
const loginPassword = document.querySelector('.main .main__form #login-password')
const loginError = document.querySelector('.main .main__form #login-error');
const logo = document.querySelector('.main .main__title');
const placeholders = document.querySelectorAll('.main .main__form .main__input');
const registerNav = document.querySelector('.main .main__create .main__register');
const registerNavUndertext = document.querySelector('.main .main__create .main__register-create');

let userList = []

if (localStorage.getItem('userList') === null) {
    userList = [
        {
            email: 'test@test.com',
            name: 'Test',
            password: 'Test1234'
        }
    ];
} else {
    settingsArray = JSON.parse(localStorage.getItem('userList'));
}

loginBtn.addEventListener('click', () => {
    for (let i = 0; i <= userList.length; i++) {
        if (loginEmail.value == '' || loginPassword.value == '') {
            loginError.style.display = 'flex';
        } else {
            if (loginEmail.value == userList[i].email && loginPassword.value == userList[i].password) {
                location.href = 'dashboard.html';
                loginError.style.display = 'none';
            } else {
                loginError.style.display = 'flex';
            }
        }
    }
})

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
        e.style.backgroundColor = '#2a2a2a';
        e.style.color = '#fafafa';
    });
    registerNav.style.color = '#fafafa';
}

function lightMode() {
    document.body.style.backgroundColor = '#fafafa';
    logo.style.color = '#2a2a2a';
    placeholders.forEach((e) => {
        e.style.borderColor = '#2a2a2a';
        e.style.backgroundColor = '#fafafa';
        e.style.color = '#2a2a2a';
    });
    registerNav.style.color = '#2a2a2a';
}

if (settingsArray[0].darkMode == true) {
    darkMode();
} else {
    lightMode();
}

function setEnglishLanguage() {
    logo.textContent = 'Login to My';
    placeholders[1].placeholder = 'Password';
    loginBtn.textContent = 'Login';
    registerNav.textContent = `Don't have an account?`;
    registerNavUndertext.textContent = 'Register now!';
}

function setPolishLanguage() {
    logo.textContent = 'Zaloguj się do My'
    placeholders[1].placeholder = 'Hasło';
    loginBtn.textContent = 'Zaloguj się';
    registerNav.textContent = 'Nie posiadasz konta?';
    registerNavUndertext.textContent = 'Zarejestruj się';
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
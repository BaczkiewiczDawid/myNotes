const registerEmail = document.querySelector('.main .main__form #register-email');
const registerName = document.querySelector('.main .main__form #register-name');
const registerPassword = document.querySelector('.main .main__form #register-password');
const registerBtn = document.querySelector('.main .main__form #register-button');
const emailError = document.querySelector('.main .main__form .main__error-email');
const nameError = document.querySelector('.main .main__form .main__error-name');
const passwordError = document.querySelector('.main .main__form .main__error-password');
const loginBtn = document.querySelector('.main .main__form .login-btn');
const loginEmail = document.querySelector('.main .main__form #login-email');
const loginPassword = document.querySelector('.main .main__form #login-password')
const loginError = document.querySelector('.main .main__form #login-error');

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const userList = [];

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
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
        userList.push(new User(registerName.value, registerEmail.value, registerPassword.value));
        console.log(userList)
    })
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (loginEmail.value == '' || loginPassword.value == '') {
            location.href = 'dashboard.html';
            loginError.style.display = 'none';
        } else {
             loginError.style.display = 'flex';
        }
     })
}


//DASHBOARD

const newNoteBtn = document.querySelector('.dashboard .dashboard__new');
const addingNote = document.querySelector('.dashboard .dashboard__new-note');
const dashboard = document.querySelector('.dashboard .dashboard__notes');
const titleInput = document.querySelector('.dashboard .dashboard__new-note .dashboard__label #title');
const descriptionInput = document.querySelector('.dashboard .dashboard__new-note .dashboard__label #description');
const linkInput = document.querySelector('.dashboard .dashboard__new-note .dashboard__label #link');
const addNoteBtn = document.querySelector('.dashboard .dashboard__new-note .dashboard__label .dashboard__button');

let isNewNoteOpened = false;

newNoteBtn.addEventListener('click', () => {
    if (isNewNoteOpened == false) {
        dashboard.style.display = 'none';
        addingNote.style.display = 'flex';
        newNoteBtn.textContent = 'Close';
        newNoteBtn.classList.add('close');
        newNoteBtn.classList.remove('open');
        isNewNoteOpened = true;
    } else {
        dashboard.style.display = 'flex';
        addingNote.style.display = 'none';
        newNoteBtn.textContent = 'New note'
        newNoteBtn.classList.add('open');
        newNoteBtn.classList.remove('close');
        isNewNoteOpened = false;
    }
})



addNoteBtn.addEventListener('click', () => {
    const dashboardNote = document.createElement('div');
    const dashboardTitleBox = document.createElement('div');
    const dashboardTitle = document.createElement('h1');
    const dashboardEdit = document.createElement('p');
    const dashboardContent = document.createElement('div');
    const dashboardParagraph = document.createElement('p');
    const dashboardLink = document.createElement('a');

    dashboard.appendChild(dashboardNote);
    dashboardNote.appendChild(dashboardTitleBox);
    dashboardNote.appendChild(dashboardContent);
    dashboardTitleBox.appendChild(dashboardTitle);
    dashboardTitleBox.appendChild(dashboardEdit);
    dashboardContent.appendChild(dashboardParagraph);
    dashboardContent.appendChild(dashboardLink);

    dashboardNote.classList.add('dashboard__note');
    dashboardTitleBox.classList.add('dashboard__title-box');
    dashboardTitle.classList.add('dashboard__title');
    dashboardEdit.classList.add('dashboard__edit');
    dashboardContent.classList.add('dashboard__content');
    dashboardParagraph.classList.add('dashboard__paragraph');
    dashboardLink.classList.add('dashboard__link');

    dashboardEdit.textContent = 'E';
    dashboardTitle.textContent = titleInput.value;
    dashboardParagraph.textContent = descriptionInput.value;
    dashboardLink.textContent = 'Link';
    dashboard.href = linkInput.value;

    titleInput.value = '';
    descriptionInput.value = '';
    linkInput.value = '';

    if (window.width < 1024) {
        dashboard.style.display = 'flex';
        addingNote.style.display = 'none';
        isNewNoteOpened = false;
        newNoteBtn.classList.add('open');
        newNoteBtn.classList.remove('close');
    } else {
        console.log('a')
    }
})

if (window.width < 1024) {
    dashboard.style.display = 'flex';
    addingNote.style.display = 'none';
    isNewNoteOpened = false;
    newNoteBtn.classList.add('open');
    newNoteBtn.classList.remove('close');
}


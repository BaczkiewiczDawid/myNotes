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


function saveNotes() {
    let notesList = document.querySelector('.dashboard .dashboard__notes').innerHTML;
    localStorage.setItem('notes', notesList);
}

function retrieveNotes() {
    document.querySelector('.dashboard .dashboard__notes').innerHTML = localStorage.getItem('notes');
}

if (!loginBtn && !registerBtn) {
    retrieveNotes();
}

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

if (loginBtn) {
    console.log(userList)
    loginBtn.addEventListener('click', () => {
        for (let i = 0; i <= userList.length; i++) {
            if (loginEmail.value == userList[i].email && loginPassword.value == userList[i].password) {
                location.href = 'dashboard.html';
                loginError.style.display = 'none';
            } else {
                loginError.style.display = 'flex';
            }
        }
    })
}

const logoutBtn = document.querySelector('.dashboard .dashboard__new-note .dashboard__settings-container .dashboard__logout');

logoutBtn.addEventListener('click', () => {
    location.href = 'index.html';
});

function darkMode() {
    dashboardParagraphList = document.querySelectorAll('.dashboard .dashboard__notes .dashboard__content .dashboard__paragraph');
    if (darkmodeCheckbox.checked) {
        document.body.style.backgroundColor = '#2a2a2a';
        dashboardParagraphList.forEach(dashboardParagraph => {
        dashboardParagraph.style.color = '#fafafa';
        newNoteBtn.style.borderColor = '#2a2a2a';
        });
    } else {
        document.body.style.backgroundColor = '#fafafa';
        dashboardParagraphList.forEach(dashboardParagraph => {
            dashboardParagraph.style.color = '#2a2a2a';
            newNoteBtn.style.borderColor = '#fafafa';
        });
    };
}

//DASHBOARD


const newNoteBtn = document.querySelector('.dashboard .dashboard__new');
const addingNote = document.querySelector('.dashboard .dashboard__new-note');
const dashboard = document.querySelector('.dashboard .dashboard__notes');
const titleInput = document.querySelector('.dashboard .dashboard__new-note .dashboard__label #title');
const descriptionInput = document.querySelector('.dashboard .dashboard__new-note .dashboard__label #description');
const linkInput = document.querySelector('.dashboard .dashboard__new-note .dashboard__label #link');
const addNoteBtn = document.querySelector('.dashboard .dashboard__new-note .dashboard__label .dashboard__button');
let deleteBtn = document.querySelectorAll('.dashboard .dashboard__notes .dashboard__note .dashboard__title-box .dashboard__delete');
const dashboardNewNote = document.querySelector('.dashboard .dashboard__new-note');
let dashboardParagraphList = document.querySelectorAll('.dashboard .dashboard__notes .dashboard__content .dashboard__paragraph');

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
    if (titleInput.value != '' && descriptionInput.value != '') {
        const dashboardNote = document.createElement('div');
        const dashboardTitleBox = document.createElement('div');
        const dashboardTitle = document.createElement('h1');
        const dashboardDelete = document.createElement('img');
        const dashboardContent = document.createElement('div');
        const dashboardParagraph = document.createElement('p');

        dashboard.appendChild(dashboardNote);
        dashboardNote.appendChild(dashboardTitleBox);
        dashboardNote.appendChild(dashboardContent);
        dashboardTitleBox.appendChild(dashboardTitle);
        dashboardTitleBox.appendChild(dashboardDelete);
        dashboardContent.appendChild(dashboardParagraph);

        dashboardNote.classList.add('dashboard__note');
        dashboardTitleBox.classList.add('dashboard__title-box');
        dashboardTitle.classList.add('dashboard__title');
        dashboardDelete.classList.add('dashboard__delete');
        dashboardContent.classList.add('dashboard__content');
        dashboardParagraph.classList.add('dashboard__paragraph');

        dashboardDelete.src = 'img/delete.png';
        dashboardTitle.textContent = titleInput.value;
        dashboardParagraph.textContent = descriptionInput.value;

        titleInput.value = '';
        descriptionInput.value = '';

        if (linkInput.value != '') {
            const dashboardLink = document.createElement('a');
            linkInput.value = '';
            dashboardLink.textContent = 'Link';
            dashboardContent.appendChild(dashboardLink);
            dashboardLink.classList.add('dashboard__link');
        }

        deleteBtn = document.querySelectorAll('.dashboard .dashboard__notes .dashboard__note .dashboard__title-box .dashboard__delete');

        saveNotes();
    }

    darkMode();
})

window.addEventListener('resize', () => {
    if (window.width < 1024) {
        dashboard.style.display = 'flex';
        addingNote.style.display = 'none';
        isNewNoteOpened = false;
        newNoteBtn.classList.add('open');
        newNoteBtn.classList.remove('close');
        newNoteBtn.style.display = 'flex';
    }

    if (window.width >= 1024) {
        dashboard.style.display = 'flex';
        addingNote.style.display = 'flex';
        newNoteBtn.style.display = 'none';
    }
})

setInterval(() => {
    deleteBtn.forEach(del => {
        del.addEventListener('click', (e) => {
            e.target.parentNode.parentNode.remove();
            saveNotes();
        })
    })
}, 1000);

//SETTINGS

const openSettings = document.querySelector('.dashboard .dashboard__new-note .dashboard__nav .dashboard__settings-container .dashboard__settings');
const settingsPanel = document.querySelector('.dashboard .dashboard__settings-panel');
const closeSettings = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__close-settings');

openSettings.addEventListener('click', () => {
    settingsPanel.style.display = 'flex';
    dashboardNewNote.style.display = 'none';
});

closeSettings.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
    dashboardNewNote.style.display = 'flex';
});

const selectedLanguage = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__language .dashboard__language-select');
const settingsTitle = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__settings-title');
const darkModeTitle = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__dark-mode .dashboard__header');
const languageTitle = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__language .dashboard__header');
const selectEnglish = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__language #english');
const selectPolish = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__language #polish');
const addNewNoteTitle = document.querySelector('.dashboard .dashboard__new-note .dashboard__title');
const descriptionInputPlaceholder = document.getElementsByName('Description')
const titleInputPlaceholder = document.getElementsByName('Title');

selectedLanguage.addEventListener('change', (e) => {
    if (e.target.value == 'english') {
        settingsTitle.textContent = 'Settings';
        darkModeTitle.textContent = 'Dark mode';
        languageTitle.textContent = 'Language';
        selectEnglish.textContent = 'English';
        selectPolish.textContent = 'Polish';
        closeSettings.textContent = 'Close';
        addNewNoteTitle.textContent = 'Add new note';
        titleInputPlaceholder[0].placeholder = 'Title';
        descriptionInputPlaceholder[0].placeholder = 'Description';
        addNoteBtn.textContent = 'Add note';
    }

    if (e.target.value == 'polish') {
        settingsTitle.textContent = 'Ustawienia';
        darkModeTitle.textContent = 'Tryb ciemny';
        languageTitle.textContent = 'Język';
        selectEnglish.textContent = 'Angielski';
        selectPolish.textContent = 'Polski';
        closeSettings.textContent = 'Zamknij';
        addNewNoteTitle.textContent = 'Dodaj nową notatke';
        descriptionInputPlaceholder[0].placeholder = 'Treść notatki';
        addNoteBtn.textContent = 'Dodaj notatke';
    }
})

const darkmodeCheckbox = document.querySelector('.dashboard .dashboard__settings-panel .dashboard__dark-mode .dashboard__checkbox');

darkmodeCheckbox.addEventListener('click', () => {
    darkMode();
});
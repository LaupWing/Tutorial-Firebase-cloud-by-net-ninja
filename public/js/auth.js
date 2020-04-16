const switches = document.querySelectorAll('.switch')
const authModal = document.querySelectorAll('.auth .modal')
const authWrapper = document.querySelector('.auth')
const registerForm = document.querySelector('.register')
const loginForm = document.querySelector('.login')
const signOut = document.querySelector('.sign-out')
// Toggle Auth
switches.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        authModal.forEach(modal => modal.classList.toggle('active'))
    })
})

registerForm.addEventListener('submit', e => {
    e.preventDefault()
    const email = registerForm.email.value
    const password = registerForm.password.value
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user)
        })
        .catch(error => {
            registerForm.querySelector('p.error').textContent = error.message
        })
}
)
loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log('Logged in')
            console.log(user)
        })
        .catch(error => {
            console.log('Something went wrong')
            loginForm.querySelector('p.error').textContent = error.message
        })
})


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        authWrapper.classList.remove('open')
        authModal.forEach(modal => modal.classList.remove('active'))
    } else {
        authWrapper.classList.add('open')
        authModal[0].classList.add('active')
    }
})


signOut.addEventListener('click', () => {
    firebase.auth().signOut()
})
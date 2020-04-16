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
})
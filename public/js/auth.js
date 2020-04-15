const switches = document.querySelectorAll('.switch')
const authModal = document.querySelectorAll('.auth .modal')
const authWrapper = document.querySelector('.auth')

// Toggle Auth
switches.forEach(link=>{
    link.addEventListener('click', e=>{
        e.preventDefault()
        authModal.forEach(modal=>modal.classList.toggle('active'))
    })
})
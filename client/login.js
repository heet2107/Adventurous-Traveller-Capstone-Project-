//const userContainer = document.querySelector('#user-info')
const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector('#register-form')

const baseURL = `http://localhost:4004/api`

const login = body => axios.post(`${baseURL}/login`, body).then( res => {
  createUserCard(res.data)
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})
const register = body => axios.post(`${baseURL}/register`, body).then(res => {
  createUserCard(res.data)
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})

function loginSubmitHandler(e) {
    e.preventDefault()

    let username = document.querySelector('#login-username')
    let password = document.querySelector('#login-password')

    let bodyObj = {
        username: username.value,
        password: password.value
    }

    login(bodyObj)

    username.value = ''
    password.value = ''
}

function registerSubmitHandler(e) {
  e.preventDefault()

  let username = document.querySelector('#register-username')
  let email = document.querySelector('#register-email')
  let fullName = document.querySelector('#register-fullName')
  let password = document.querySelector('#register-password')


  let bodyObj = {
      username: username.value,
      email: email.value,
      fullName: fullName.value,
      lastName: lastName.value,
      password: password.value
  }

  register(bodyObj)

  username.value = ''
  email.value = ''
  fullName.value = ''
  password.value = ''
}

// function createUserCard(data) {
//     userContainer.innerHTML = ''
//     const userCard = document.createElement('div')
//     userCard.classList.add('user-card')

//     userCard.innerHTML = `<p class="username">Username: ${data.username}</p>
//     <p class="email">Email: ${data.email}</p>
//     <p class="first-name">First Name: ${data.firstName}</p>
//     <p class="last-name">Last Name: ${data.lastName}</p>
//     `


//     userContainer.appendChild(userCard)
// }

loginForm.addEventListener('submit', loginSubmitHandler)
registerForm.addEventListener('submit', registerSubmitHandler)
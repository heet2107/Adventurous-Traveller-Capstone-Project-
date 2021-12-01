const futuresContainer = document.querySelector('#futures-container')
const form = document.querySelector('form')
const nameInput = document.querySelector('#nameInput')
const countrySelect = document.querySelector('#countrySelect')
const countryList = document.querySelector('#countryList')

const baseURL = `http://localhost:5555/api/futures`

const futuresCallback = ({ data: futures }) => displayFutures(futures)
const errCallback = err => console.log(err)

const getAllFutures = () => axios.get(baseURL).then(futuresCallback).catch(errCallback)
const createFutures = body => axios.post(baseURL, body).then(futuresCallback).catch(errCallback)
const deleteFutures = (id) => axios.delete(`${baseURL}/${id}`).then(futuresCallback).catch(errCallback)

let countries= []
console.log("countires", countries)
function submitHandler(e) {
    e.preventDefault()
    
    let nameInput = document.querySelector('#nameInput')
    let currentCity = document.querySelector('#currentCity')
    let age = document.querySelector('#age')
    let life = document.querySelector('#life')
    let countrySelect = document.querySelector('#countrySelect')[document.querySelector('#countrySelect').value-1].innerHTML
    // console.log('COUNTRY SELECT:', countrySelect)

    let bodyObj = {
        nameInput: nameInput.value,
        currentCity: currentCity.value, 
        age: age.value,
        life: life.value,
        countrySelect: countrySelect
    }

    if (nameInput.value < 1) {
        alert ('You must enter a city name')
        return
    }
    createFutureCard(bodyObj)

    nameInput.value = ''
    currentCity.value = ''
    age.value = ''
    life.value = ''
    countrySelect.value = ''
}

function getCountries() {
    axios.get('http://localhost:5555/countries')
        .then(res => {
            res.data.forEach(country => {
                //console.log(country)
                const option = document.createElement('option')
                option.setAttribute('value', country['country_id'])
                option.textContent = country.name
                countrySelect.appendChild(option)
            })
            countries.push(res.data)
        })
}

getCountries()

function createFutureCard(future) {
    console.log(future)
    const futureCard = document.createElement('div')
    futureCard.classList.add('future-card')

    futureCard.innerHTML = `<h2>My Wish List</h2> <br>
    <p class="goal">My Dream Place is a ${future.nameInput}, ${future.countrySelect}</p> <br>
    <p class="life">I am from  ${future.currentCity}.</p><br>
    <p class="age">By the age of ${future.age}, I want to achieve My Dream.</p><br>
    <p class="life">I would like to go on this trip with my  ${future.life}.</p><br>
    
    
    <div class="btns-container">
        <button onclick="updateFuture(${future.value})">edit</button>
        <button onclick="deleteFutures(${future.id})">delete</button>
    </div>
    `


    futuresContainer.appendChild(futureCard)
}


function displayFutures(arr) {

    futuresContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFutureCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

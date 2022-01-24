const baseURL = 'https://api.sampleapis.com/beers/ale/';
const main = document.querySelector('div.main')

const fetchAles = () =>{
    for(let id = 1; id < 5; id ++){
        fetch(`${baseURL}${id}`)
        .then(resp => resp.json())
        .then(beerData => {
            createCard(beerData)
        })
    }
}

const createCard = (beerData) => {
    const newCard = document.createElement('div')
    newCard.setAttribute('class', 'card')
    newCard.innerText = beerData
    main.appendChild(newCard)
}


//Invoke Functions
const init = () =>{
    fetchAles()
}

init()
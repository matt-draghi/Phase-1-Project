const baseURL = 'https://api.sampleapis.com/beers/ale/';
const main = document.querySelector('div.main-flexbox')

const fetchAles = () =>{
    // for(let id = 3; id < 7; id ++){
    //     fetch(`${baseURL}${id}`)
    //     .then(resp => resp.json())
    //     .then(beerData => {
    //         createCard(beerData)
    //     })
    // }
    fetch(baseURL)
    .then(resp => resp.json())
    .then(beerData => {
        beerData.forEach(beer => createCard(beer));
    })
}

const createCard = (beerData) => {
    //create card for beer
    const newCard = document.createElement('div')
    newCard.setAttribute('class', 'card')
    console.log(beerData)

    //add beer image to separate div within the card
    const imgDiv = document.createElement('div')
    imgDiv.setAttribute('class', 'card_image')
    const img = document.createElement('img')
    img.src = beerData.image
    img.alt = beerData.name
    imgDiv.appendChild(img)
    newCard.appendChild(imgDiv)
   
    //create div to hold other info in card
    const infoDiv = document.createElement('div')
    infoDiv.setAttribute=('class', 'card_info')
    //add the name
    const name = document.createElement('p')
    name.innerText = beerData.name
    infoDiv.appendChild(name)
    
    //add the price
    const price = document.createElement('span')
    price.innerText = ` ${beerData.price}`
    name.append(price)

    //add the rating
    const rating = document.createElement('p')
    rating.innerText = `${beerData.rating.average.toFixed(2)} / 5`
    infoDiv.appendChild(rating)

    newCard.appendChild(infoDiv)
    //add card to main div
    main.appendChild(newCard)
}


//Invoke Functions
const init = () =>{
    fetchAles()
}

init()
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

const createCard = (beer) => {
    //create card for beer
    const newCard = document.createElement('div')
    newCard.setAttribute('class', 'card')
    console.log(beer)

    renderImage(beer, newCard)
    renderInfo(beer, newCard)
    renderRating(beer, newCard)
    renderLike(newCard)   

    //add card to main div
    main.appendChild(newCard)
    console.log(typeof(newCard))
    console.log(newCard)
}

const renderImage = (beer, newCard) =>{
    //add beer image to separate div within the card
    const imgDiv = document.createElement('div')
    imgDiv.setAttribute('class', 'card_image')

    const img = document.createElement('img')
    img.src = beer.image
    img.alt = beer.name

    imgDiv.appendChild(img)
    newCard.appendChild(imgDiv)
}

const renderInfo = (beer, newCard) => {
    //create div to hold other info in card
    const infoDiv = document.createElement('div')
    infoDiv.setAttribute('class', 'card_info')

    //add the name
    const name = document.createElement('p')
    name.innerText = beer.name
    infoDiv.appendChild(name)
    
    //add the price
    const price = document.createElement('p')
    price.setAttribute('id', 'price')
    price.innerText = ` ${beer.price}`
    infoDiv.append(price)
    //append info to the card
    newCard.appendChild(infoDiv)
}

const renderRating = (beer, newCard) => {
    const ratingDiv = document.createElement('div')
    const rating = document.createElement('p')
    rating.innerText = `${beer.rating.average.toFixed(2)} / 5`
    ratingDiv.appendChild(rating)

    newCard.appendChild(ratingDiv)
}

const renderLike = (newCard) => {
    const likeBttn = document.createElement('i')
    likeBttn.setAttribute('class', 'far fa-heart')
    newCard.appendChild(likeBttn)
}

//Invoke Functions
const init = () =>{
    fetchAles()
}

init()

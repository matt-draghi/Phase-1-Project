const baseURL = 'http://localhost:3000/ale/';
const main = document.querySelector('div.main-flexbox')
//OPTIONAL TODO: Search bar in header that fetches for id based on name 
const fetchAles = () =>{
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
    renderImage(beer, newCard)
    renderInfo(beer, newCard)
    renderRating(beer, newCard)

    renderButtons(beer, newCard)

    //add card to main div
    main.appendChild(newCard)
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
    rating.setAttribute(`id`, `${beer.id} Rating`)
    rating.innerText = `${beer.rating.average.toFixed(2)} / 5    (${beer.rating.reviews} reviews)`
    ratingDiv.appendChild(rating)

    newCard.appendChild(ratingDiv)
}

const renderButtons = (beer, newCard) => {
    const div = document.createElement('div')
    div.setAttribute('class','card_button')

    //create like Button
    const likeBttn = document.createElement('button') 
    div.appendChild(likeBttn)
    likeBttn.setAttribute('id', 'like')
    likeBttn.innerHTML = `<i class="far fa-heart"> Like </i>`
    likeBttn.addEventListener('click', () =>{
        let likeState = likeBttn.querySelector(`i`).attributes.class.value
        if(likeState === "far fa-heart"){
            likeBttn.querySelector(`i`).setAttribute('class', 'fas fa-heart')
        }
        else if (likeState === "fas fa-heart"){
            likeBttn.querySelector(`i`).setAttribute('class', 'far fa-heart')
        }
    })

    //create review button
    const reviewBttn = document.createElement(`button`)
    div.appendChild(reviewBttn)
    reviewBttn.innerHTML = `<i class="far fa-star">Review</i>`
    reviewBttn.setAttribute(`id`, `review`)
    
    //add event listener
    reviewBttn.addEventListener('click', () => {
        if(document.querySelector(`div[name="${beer.name}"]`)){
            alert('You have already reviewed this beer.')
        }
        else{
            createModal(beer)
        }
    })
    
    //append new div to card
    newCard.appendChild(div)
}

const createModal = (beer) => {
    //create modal container
    const reviewForm = document.createElement('div')
    reviewForm.setAttribute(`id`, `${beer.id}`)
    reviewForm.setAttribute(`class`, `modal`)

    addModalContent(reviewForm, beer)
    main.appendChild(reviewForm)

    //close modal on window click
    window.addEventListener('click', (e) => {
        if(e.target === reviewForm){
            reviewForm.style.display = "none"
        }
    })

    reviewForm.style.display = "block"
}

const addModalContent = (modal, beer) => {
    //create modal content
    const reviewFormContent = document.createElement(`div`)
    reviewFormContent.setAttribute(`class`, `modal-content`)
    modal.appendChild(reviewFormContent)

    //create button to close modal
    const closeReviewForm = document.createElement(`div`)
    closeReviewForm.setAttribute(`class`, `close`)
    closeReviewForm.innerHTML = `&times;`
    reviewFormContent.appendChild(closeReviewForm)
    closeReviewForm.addEventListener('click', () => {
        modal.style.display = "none"
    })

    //add h1 form header to modal
    const formHeader = document.createElement('h1')
    formHeader.innerText = `Please leave your review of ${beer.name}:`
    reviewFormContent.appendChild(formHeader)

    addFormToModal(reviewFormContent)
}

const addFormToModal = (modalContent) => {
    //create radioDiv to group the radios
    const radioDiv = document.createElement('div')
    radioDiv.setAttribute(`class`, 'radioDiv')
    
    // radio buttons
    for(let reviewOption = 0; reviewOption < 6; reviewOption++){
        const option = document.createElement(`input`)
        const label = document.createElement(`label`)
        option.setAttribute(`type`, `radio`)
        option.setAttribute(`id`, `${reviewOption}`)
        option.setAttribute(`name`, `rating`)
        option.setAttribute(`value`, `${reviewOption}`)
        if(reviewOption === 0){
            option.required = true
        }
        label.setAttribute(`For`, `${reviewOption}`)
        label.innerText = `${reviewOption}`
        
        //radios appended to radioDiv
        radioDiv.appendChild(option)
        radioDiv.appendChild(label)
    }

    // create the form; radioDiv appends to form; from appends to reviewFormContent (modal)
    const form = document.createElement('form')
    form.appendChild(radioDiv)
    modalContent.appendChild(form)

    // create form input
    const formInput = document.createElement('input')
    formInput.setAttribute(`class`, 'text-input')
    formInput.setAttribute(`placeholder`, 'Additional comments...')
    form.appendChild(formInput)

    //create submit listener
    form.addEventListener('submit', handleSubmit)
    
    //create submit button
    const submitBttn = document.createElement('button')
    submitBttn.innerText = 'Submit'         
    form.appendChild(submitBttn)
}

//TODO: refactor
const handleSubmit = (e) => {
    e.preventDefault()
    //grab id from target parent element and use this to fetch data for a specific id
    const beerId = e.target.offsetParent.id
    fetch(baseURL+beerId)
    .then(resp => resp.json())
    .then(beer => {
        const userRating = document.querySelector(".radioDiv input[type='radio'][name='rating']:checked").value;
        const totalRating = (beer.rating.average * beer.rating.reviews) + userRating
        beer.rating.reviews += 1
        newAverage = totalRating / beer.rating.reviews
        const rating = document.getElementById(`${beer.id} Rating`)
        rating.innerText = `${beer.rating.average.toFixed(2)} / 5    (${beer.rating.reviews} reviews)`

        /*TODO: make it so another modal opens on submit 
        with confirmation of submit, followed by close - setTimeout will work*/

        const reviewForm = e.path[2]
        //set form name upon successful submission to serve as validation for if statement in renderButtons()
        reviewForm.setAttribute(`name`, `${beer.name}`)
        reviewForm.style.display = "none"
    })
}

//Invoke Functions
const init = () =>{
    fetchAles()
}

init()
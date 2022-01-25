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
    likeBttn.innerHTML = `
        <i class="far fa-heart"> Like </i>
    `
    likeBttn.addEventListener('click', () =>{
        let likeState = likeBttn.querySelector(`i`).attributes.class.value
        //console.log(likeState)
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
    reviewBttn.innerHTML = `
        <i class="far fa-star">Review</i>
    `
    reviewBttn.setAttribute(`id`, `review`)
    
    //add event listener
    reviewBttn.addEventListener('click', () => {
        if(document.querySelector(`div[id="${beer.name}"]`)){
            alert('You have already reviewed this beer.')
        }
        else{
            //create modal container
            const reviewForm = document.createElement('div')
            reviewForm.setAttribute(`id`, `${beer.name}`)
            reviewForm.setAttribute(`class`, `modal`)
            //create modal content
            const reviewFormContent = document.createElement(`div`)
    ////////////////ADD ALL CONTENT TO REVIEW FORM CONTENT//////////
            reviewFormContent.setAttribute(`class`, `modal-content`)
            reviewForm.appendChild(reviewFormContent)
            
             //create button to close modal
            const closeReviewForm = document.createElement(`span`)
            closeReviewForm.setAttribute(`class`, `close`)
            closeReviewForm.innerHTML = `&times;`
            reviewFormContent.appendChild(closeReviewForm)
            closeReviewForm.addEventListener('click', () => {
                reviewForm.style.display = "none"
            })

            //add form to modal
            const formHeader = document.createElement('h1')
            formHeader.innerText = `Please leave your review of ${beer.name}:`
            reviewFormContent.appendChild(formHeader)

            const form = document.createElement('form')
            reviewFormContent.appendChild(form)

            for(let reviewOption = 0; reviewOption < 6; reviewOption++){
                const option = document.createElement(`input`)
                const label = document.createElement(`label`)
                option.setAttribute(`type`, `radio`)
                option.setAttribute(`id`, `${reviewOption}`)
                option.setAttribute(`name`, `rating`)
                option.setAttribute(`value`, `${reviewOption}`)
                
                label.setAttribute(`For`, `${reviewOption}`)
                label.innerText = `${reviewOption}`
                
                form.appendChild(option)
                form.appendChild(label)
            }

            
            //close modal on window click
            window.addEventListener('click', (e) => {
                if(e.target === reviewForm){
                    reviewForm.style.display = "none"
                }
            })

    /////////////////////////////////////////////////////////////////
            main.appendChild(reviewForm)

            reviewForm.style.display = "block"
        }
    })
    
    //append div to card
    newCard.appendChild(div)
}



// const handleLike = () =>{
//     let likeState = document.querySelector(`card_button button#like`)
//     if(likeState === "far fa-heart"){
//         likeBttn.querySelector(`i`).setAttribute('class', 'fas fa-heart')
//     }
//     else if (likeState === "fas fa-heart"){
//         likeBttn.querySelector(`i`).setAttribute('class', 'far fa-heart')
//     }
// }




//Invoke Functions
const init = () =>{
    fetchAles()
}

init()

const baseURL = 'https://api.sampleapis.com/beers/ale/';

const fetchAles = () =>{
    for(let id = 1; id < 5; id ++){
        fetch(`${baseURL}${id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
}

fetchAles()
//Get all dogs
fetch('http://localhost:3000/pups')
.then(function(res) {
    return res.json()
})
.then(function(pups) {
    for(const pup of pups) {
        addPupName(pup)
    }
})

//Add dog name span
function addPupName(pup) {
    const div = document.getElementById('dog-bar')
    
    const span = document.createElement('span')
    span.innerHTML = pup.name
    span.addEventListener('click', function(e) {
        e.preventDefault()
        showPup(pup)
    })

    div.append(span)
}

//Display a pup's info
function showPup(pup) {
    const div = document.getElementById('dog-info')
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    const image = document.createElement('img')
    image.setAttribute('src', pup.image)

    const h2 = document.createElement('h2')
    h2.innerHTML = pup.name

    const button = document.createElement('button')
    buttonText(pup, button)
    button.addEventListener('click', function(e) {
        e.preventDefault()
        changeGoodness(pup, e.target)
    })

    div.append(image, h2, button)
}

//Update database and then update button
function changeGoodness(pup, button) {
    let goodness
    if (button.innerHTML.includes(':)') ) {
        goodness = false
    } else {
        goodness = true
    }
    fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: 'PATCH',
    headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body: JSON.stringify({
        isGoodDog: goodness
    })
    })
    .then(function(res){
        return res.json()
    })
    .then(function(revisedPuppy){
        buttonText(revisedPuppy, button)
    })
}

//Add text to button on page
function buttonText(pup, button) {
    if (pup.isGoodDog) {
        button.innerHTML = "Good Dog! :)"
    } else {
        button.innerHTML = 'Not a Good Dog :('
    }
}
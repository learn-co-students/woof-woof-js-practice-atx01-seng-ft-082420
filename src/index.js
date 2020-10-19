const url = 'http://localhost:3000/pups'
document.addEventListener('DOMContentLoaded', () => {
    // console.log('yo ish loafy')
    fetch(url)
    .then(res => res.json())
    .then(json => json.forEach(dog => {
        renderDog(dog)
    }))
})
function renderDog(dog) {
    // console.log(dog)
    const dogBar = document.querySelector('#dog-bar')
    let span = document.createElement('span')
    span.innerText = dog.name
    dogBar.append(span)
    span.addEventListener('click', e => {
        const dogCard = document.querySelector('#dog-info')
        while (dogCard.firstChild){
            dogCard.removeChild(dogCard.firstChild)
        }
        const dogImage = document.createElement('img')
        dogImage.src = dog.image
        const dogName = document.createElement('h2')
        dogName.innerText = dog.name
        const dogBtn = document.createElement('button')
        const dangerBtn = document.createElement('button')
        dangerBtn.className = 'btn btn-danger'
        dangerBtn.innerText = "delete"

        
        dog.isGoodDog 
        ? (dogBtn.innerText = "Good Dog!")
        : (dogBtn.innerText = "Bad Dog!")
        dogCard.append(dogImage, dogName, dogBtn, dangerBtn)
        
        
        
        dogBtn.addEventListener('click', e => {
            // console.log(e.target.innerText)
            let dogStatus 
            if (e.target.innerText === "Good Dog!") {
                dogStatus = false
                dogBtn.innerText = "Bad Dog!"
            } else if (e.target.innerText === "Bad Dog!") {
                dogStatus = true
                dogBtn.innerText = "Good Dog!"
            }
            fetch(url +`/${dog.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: dogStatus
                })
            })
            .then(res => res.json())
        })
        dangerBtn.addEventListener('click', () => {
            fetch(url + `/${dog.id}`, {
                method: 'DELETE'
            })
            .then(function() {
                span.remove()
                dogImage.remove()
                dogName.remove()
                dogBtn.remove()
                dangerBtn.remove()
            })
        })
    })
}
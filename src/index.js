const pupURL = "http://localhost:3000/pups"

const filterBtn = document.getElementById("good-dog-filter")
filterBtn.addEventListener("click", (e) => {
    if (filterBtn.innerHTML == "Filter good dogs: OFF") {
        filterBtn.innerHTML = "Filter good dogs: ON"
    } else {
        filterBtn.innerHTML = "Filter good dogs: OFF"
    }
    getDogs();
})

function getDogs() {
    fetch(pupURL)
        .then(res => res.json())
        .then(dogs => filterDogs(dogs))
}

function filterDogs(dogs) {
    const filterStatus = document.getElementById("good-dog-filter")
    const dogBarEmpty = document.getElementById("dog-bar")
    dogBarEmpty.innerHTML = ""
    if (filterStatus.innerHTML == "Filter good dogs: OFF") {
        dogs.forEach(dog => {
            renderDog(dog);
        })
    } else {
        const goodDogs = dogs.filter(dog => dog.isGoodDog == true)
        goodDogs.forEach(dog => {
            renderDog(dog);
        })
    }
}

function renderDog(dog) {
    const dogBar = document.getElementById("dog-bar")
    const dogSpan = document.createElement("span")
    dogSpan.innerHTML = dog.name
    dogSpan.addEventListener("click", (e) => {
        dogInfo(dog);
    })
    dogBar.append(dogSpan)
}

function dogInfo(dog) {
    const divDogInfo = document.getElementById("dog-info")
    divDogInfo.innerHTML = ""

    const dogImg = document.createElement("img")
    dogImg.src = dog.image

    const dogName = document.createElement("h2")
    dogName.innerText = dog.name

    const dogBtn = document.createElement("button")
    dogBtn.innerText = (dog.isGoodDog ? "Good Dog!" : "Bad Dog!")
    dogBtn.addEventListener("click", (e) => {
        toggleDog(e.target, dog.id);
    })

    divDogInfo.append(dogImg, dogName, dogBtn)

}

function toggleDog(button, dogID) {
    let dogStatus
    if (button.innerHTML == "Good Dog!") {
        dogStatus = false;
        button.innerHTML = "Bad Dog!"
    } else {
        dogStatus = true;
        button.innerHTML = "Good Dog!"
    }

    return fetch(pupURL + `/${dogID}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dogStatus
        })
    })
}

getDogs();
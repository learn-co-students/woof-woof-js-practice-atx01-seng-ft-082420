document.addEventListener('DOMContentLoaded', () => {
  console.log('Its working');
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => {
      json.forEach(dog => {
        // console.log(dog);
        createDogSpan(dog);
      });
    });
});

function createDogSpan(dog) {
  const div = document.querySelector('#dog-bar');
  const span = document.createElement('span');
  span.innerText = dog.name;

  div.append(span);

  span.addEventListener('click', e => {
    // console.log(e.target);
    const dogInfo = document.querySelector('#dog-info');
    while (dogInfo.firstChild) {
      dogInfo.removeChild(dogInfo.firstChild);
    }
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const btn = document.createElement('button');

    img.setAttribute('src', dog.image);
    h2.innerText = dog.name;
    dog.isGoodDog
      ? (btn.innerText = 'Good Dog!')
      : (btn.innerText = 'Bad Dog!');
    dogInfo.append(img, h2, btn);

    btn.addEventListener('click', e => {
      console.log(e.target);
      let dogStatus;

      if (e.target.innerText === 'Good Dog!') {
        dogStatus = false;
        btn.innerText = 'Bad Dog!';
      } else if (e.target.innerText === 'Bad Dog!') {
        dogStatus = true;
        btn.innerText = 'Good Dog!';
      }
      console.log(dog.id);
      fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          isGoodDog: dogStatus
        })
      }).then(res => res.json());
    });
  });
}

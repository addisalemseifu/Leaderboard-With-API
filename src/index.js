import './index.css';

const btn = document.querySelector('.btn-click');
const form = document.getElementById('form');

const userdatails = document.getElementById('user-details');
const apiKey = 'N8J5KyuIIF3RfCrtF386'; // This is the Key for your game from Curl Command

const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`;

const populate = async () => {
  const request = new Request(requestURL);

  const response = await fetch(request, {
    method: 'GET',
  });
  const superHeroes = await response.json();
  const playerdata = superHeroes.result;
  userdatails.innerHTML = '';
  playerdata.forEach((el) => {
    userdatails.innerHTML += `
  <div class="my-div">${el.user}:${el.score}</div>`;
  });
  const myDiv = document.getElementsByClassName('my-div');
  for (let i = 0; i < myDiv.length; i += 1) {
    if (i % 2 === 0) {
      myDiv[i].classList.add('active');
    }
  }
};

btn.addEventListener('click', () => {
  populate();
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const payload = formData;

  const extractedPayload = [...payload];
  const userValue = extractedPayload[0][1];
  const scoreValue = extractedPayload[1][1];

  // Create an Object to Stringify
  const payloadObject = {
    user: userValue,
    score: scoreValue,
  };

  document.querySelector('#user').value = '';
  document.querySelector('#score').value = '';
  fetch(requestURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadObject),
  })
    .then((res) => res.json());
});
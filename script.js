const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const list = document.querySelector('.list');

const urlApi = 'https://newsapi.org/v2/top-headlines?' + 'country=id&' + 'from=2022-12-30&' + 'sortBy=popularity&' + 'apiKey=4cf9be61c4e440d3b168f3b77cc750b0';

const initialPromise = (url) => {
  return new Promise((resolve, reject) => {
    if (url != null) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          resolve(data.articles);
        });
    } else {
      reject('Gagal mendapatkan data');
    }
  });
};
window.addEventListener('load', fetchAll(urlApi));

searchInput.addEventListener('input', changeUrl);

function fetchAll(url) {
  initialPromise(url)
    .then((data) => {
      console.log(data);
      list.innerHTML = tempalateUI(data);
    })
    .catch((error) => (list.innerHTML = error));
}

function changeUrl(inputText) {
  let textUrl = inputText.target.value;
  if (textUrl.length >= 1) {
    options = `https://newsapi.org/v2/everything?q=${textUrl}&searchIn=title&apiKey=4cf9be61c4e440d3b168f3b77cc750b0`;
    fetchAll(options);
  } else {
    fetchAll(urlApi);
  }
  console.log(textUrl);
}

function tempalateUI(e) {
  let d = '';

  e.forEach((e, i) => {
    d += `
          <div class="card card-api" style="width: 20rem" ${i}>
            <img src="${e.urlToImage}" class="card-img-top img-api" alt="" />
            <div class="card-body">
              <h5 class="card-title title-api">${e.title}</h5>
              <p class="card-text">${e.author} - ${new Date(e.publishedAt).toLocaleDateString()} ${new Date(e.publishedAt).toLocaleTimeString()} </p>
              <p class="card-text">${e.description}</p>
            </div>
          </div>
          `;
  });
  return d;
}

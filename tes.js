const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const list = document.querySelector('.list');
const spinner = document.querySelector('.spinn');

const urlApi = 'https://newsapi.org/v2/top-headlines?' + 'country=id&' + 'from=2022-12-30&' + 'sortBy= &' + 'apiKey=4cf9be61c4e440d3b168f3b77cc750b0';

window.addEventListener('load', async function () {
  let movies = await fetchData(urlApi);
  list.innerHTML = tempalateUI(movies);
});

searchInput.addEventListener('input', changeUrl);

function fetchData(url) {
  return fetch(url)
    .then((data) => data.json())
    .then((data) => data.articles)
    .catch((err) => (list.innerHTML = err))
    .finally((spinner.style.display = 'none'));
}

async function changeUrl(inputText) {
  let textUrl = inputText.target.value;
  if (textUrl.length >= 1) {
    let options = `https://newsapi.org/v2/everything?q=${textUrl}&searchIn=title&apiKey=4cf9be61c4e440d3b168f3b77cc750b0`;
    let data = await fetchData(options);
    list.innerHTML = tempalateUI(data);
  } else {
    let movies = await fetchData(urlApi);
    list.innerHTML = tempalateUI(movies);
  }
}

function tempalateUI(e) {
  let d = '';

  e.forEach((e, i) => {
    d += `
          <div class="card card-api" style="width: 18rem" ${i}>
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

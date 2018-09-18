'Use Strict'

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

// 1 Fetch cities
fetch(endpoint)
  .then(citiesList => citiesList.json()) // Promise that returns the cities Array
  .then(citiesData => cities.push(...citiesData)); // Use the spreed to push only the json object not creating an array of arrays.

// 2. Find city or state that match the search  
function findMatches(wordToMatch, cities) {
  var results = cities.filter(place => {
    return place.city.match(wordToMatch) || place.state.match(wordToMatch);
  });

  return results;
}

//3. Event function
function displayMatches() {
  const regex = new RegExp(this.value, "gi");
  const matchList = findMatches(regex, cities);
  const html = matchList.map(place => {
    const cityName = place.city.replace(regex, `<span>${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span>${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>  
    `;
  }).join('');

  suggestions.innerHTML = html;
}

// Population format (pure view)
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Event Listener to grab the text from the input
searchInput.addEventListener('keyup', displayMatches);



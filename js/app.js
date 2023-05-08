let countries = []
const regionField = document.querySelector(".dropdown-options");
const cardContainer = document.querySelector(".card-container");
const homePage = document.querySelector('.container')
const countryContainer = document.querySelector('.country-container');
const detailContainer = document.querySelector('.details');
const backBtn = document.querySelector('.back-btn');
//const allCards = document.querySelectorAll(".card");
const topContent = document.querySelector('.top-content')
const body = document.body
const themeToggle = document.querySelector('.toggle')
const cardText = document.querySelector('.card-text')
const navbar = document.querySelector('.nav-bar')
const searchField = document.querySelector('.search-field')
const searchInput = document.querySelector('.search-input')
const filter = document.querySelector('.filter-field')
//const border =



const getCountryData = async function() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  //   console.log(data);
  for (let i = 0; i < data.length; i++) {
    renderCountries(data, i);
  }

  const allCards = document.querySelectorAll(".card");
  allCards.forEach(country => {
    country.addEventListener('click', () => {
      const countryName = country.getAttribute('data-name');
      const id = Object.keys(data).find(key => data[key].name.common === countryName);
      console.log()
      renderCountryDetails(data, id);

    });
  });

  searchCountry();
  filterRegion();
  themeToggle.addEventListener('click', toggle)
};

function renderCountries(data, id) {
  const countryCapital = document.querySelector(".capital");
  const flag = data[id].flags.svg;
  const { common: name } = data[id].name;
  const population = data[id].population;
  let capitalArr = data[id].capital;
  const region = data[id].region;
  let capital = "";
  if (!capitalArr) {
    capital = `<span class="no-capital">No capital available</span>`;
  } else capital = capitalArr[0];

  const html = `
      <div class="card" data-name="${name}">
        <img
        src="${flag}"
        alt="Flag of ${name}"
        />
        <div class="card-text">
          <h3 class="country-name">${name}</h3>
          <p><b>Population:</b> ${population}</p>
          <p class="region"><b>Region:</b> ${region}</p>
          <p class="capital"><b>Capital:</b> ${capital}</p>
        </div>
      </div>
  `;

  cardContainer.insertAdjacentHTML("beforeend", html);
}

function searchCountry() {
  const searchInput = document.querySelector(".search-input");
  const cards = document.querySelectorAll(".card");
  searchInput.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    //   console.log(searchTerm);
    regionField.value = "Filter by region";

    cards.forEach((card) => {
      const countryName = card
        .querySelector(".country-name")
        .textContent.toLowerCase();
      if (!countryName.includes(searchTerm)) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
        // console.log("match");
      }
      // console.log(countryName);
    });
  });
}

function filterRegion() {
  const cards = document.querySelectorAll(".card");
  const regionField = document.querySelector(".dropdown-options");
  regionField.addEventListener("change", (e) => {
    const selectedOption = e.target.value.toLowerCase();
    //console.log(selectedOption);
    cards.forEach((card) => {
      const cardRegion = card
        .querySelector(".region")
        .textContent.slice(8)
        .toLowerCase()
        .trim();
      if (cardRegion !== selectedOption) {
        card.style.display = "none";
        //console.log("test");
      } else {
        card.style.display = "block";
      }
    });
  });
}

function renderCountryDetails(data, id) {
  // const { name, population, region, capital, flags, subregion, nativeName, currencies, languages, borders } = country;

  const flag = data[id].flags.svg;
  const { common: name } = data[id].name;
  const population = data[id].population;
  let capitalArr = data[id].capital;
  let capital = "";
  if (!capitalArr) {
    capital = `<span class="no-capital">No capital available</span>`;
  } else capital = capitalArr[0];
  const region = data[id].region;
  let names = Object.values(data[id].name.nativeName)
  const nativeName = names[0].common
  const subregion = data[id].subregion
  const topLevelDomain = data[id].tld[0]
  const currencies = data[id].currencies
  let currencyString = ''
  if (!currencies) {
    currencyString = `No currency available`
  } else {
    currencyString = Object.values(currencies).map((currency) => currency.name).join(', ')
  }
  const languages = data[id].languages
  let languageString = ''
  if (!languages) {
    languageString = `No local language available`
  } else {
    languageString = Object.values(languages).map((language) => language).join(', ')
  }
  const borders = data[id].borders

  if (!borders) {
    borderCountries = `No borders available`
  } else {
    borderCountries = borders.length > 0 ? borders.map((border) => `<span class="border">${border}</span>`).join('') : 'None'
  }


  //console.log(borderCountries)

  const detailHtml = `
    <div class="big-flag">
      <img src="${flag}" alt="Flag of ${name}">
    </div>
    <div class="bottom-content">
      <div class="country-facts">
        <h3 class="country-name">${name}</h3>
        <div class="facts-1">
          <p><strong>Native Name:</strong> ${nativeName}</p>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Sub Region:</strong> ${subregion}</p>
          <p><strong>Capital:</strong> ${capital}</p>
        </div>
      </div>

      <div class="facts-2">
        <p><strong>Top Level Domain:</strong> ${topLevelDomain}</p>
        <p><strong>Currencies:</strong> ${currencyString}</p>
        <p><strong>Languages:</strong> ${languageString}</p>
      </div>

      <div class="border-countries">
        <h4>Border Countries:</h4>
        ${borderCountries}
      </div>
    </div>
  `;
  backBtn.addEventListener("click", () => {
    countryContainer.style.display = 'none'
    homePage.style.display = 'block';
  });
  
  
  detailContainer.innerHTML = ''
  detailContainer.insertAdjacentHTML('beforeend', detailHtml)

  countryContainer.style.display = 'block'
  detailContainer.style.display = 'block'
  homePage.style.display = 'none';
}

function toggle() {
  let allCards = document.querySelectorAll('.card')
  let borderCountry = document.querySelectorAll('.border')
  const dropdown = document.querySelectorAll('.dropdown-options') 
  
  
  body.classList.toggle('dark-mode')
  cardContainer.classList.toggle('card-container-dark')
  //cardText.classList.toggle('card-text-dark')
  allCards.forEach(card => {
    card.classList.toggle('card-text-dark')
  })
  backBtn.classList.toggle('back-btn-dark')
  borderCountry.forEach(border => {
    border.classList.toggle('border-dark')
  })
  navbar.classList.toggle('navbar-dark')
  searchField.classList.toggle('search-dark')
  searchInput.classList.toggle('search-input-dark')
  filter.classList.toggle('filter-dark')
  dropdown.forEach(option => {
    option.classList.toggle('dropdown-dark')
  })
}

//themeToggle.addEventListener('click', toggle) 

getCountryData();
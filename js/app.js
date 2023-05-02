const getCountryData = async function () {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  for (let i = 0; i < data.length; i++) {
    renderCountries(data, i);
  }

  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    cards.forEach((card) => {
      const countryName = card
        .querySelector(".country-name")
        .textContent.toLowerCase();
      if (!countryName.includes(searchTerm)) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
      }
    });
  });
};

const cardContainer = document.querySelector(".card-container");

function renderCountries(data, id) {
  const flag = data[id].flags.png;
  const { common: name } = data[id].name;
  const population = data[id].population;
  let capitalArr = data[id].capital;
  const region = data[id].region;
  let capital = "";
  if (!capitalArr) {
    // add red color
    capital = `No capital available`;
  } else capital = capitalArr[0];

  const html = `
        <div class="card">
            <img
            src="${flag}"
            alt=""
            />
            <div class="card-text">
                <h3 class="country-name">${name}</h3>
                <p><b>Population:</b> ${population}</p>
                <p><b>Region:</b> ${region}</p>
                <p><b>Capital:</b> ${capital}</p>
            </div>
        </div>
    `;

  cardContainer.insertAdjacentHTML("beforeend", html);
}

// const searchInput = document.querySelector(".search-input");
const cards = document.querySelectorAll(".card");
// const cardList = card.getElementsByTagName("h3");
const countryList = cardContainer.getElementsByTagName("h3");

function searchCountries() {
  //   const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    //   console.log(searchTerm);

    cards.forEach((card) => {
      const countryName = card
        .querySelector(".country-name")
        .textContent.toLowerCase();
      if (!countryName.includes(searchTerm)) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
        console.log("match");
      }
      // console.log(countryName);
    });
  });
}

getCountryData();

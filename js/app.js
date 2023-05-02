const getCountryData = async function () {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  //   console.log(data);
  for (let i = 0; i < data.length; i++) {
    renderCountries(data, i);
  }
  searchCountry();
  //   filterRegion();
};

const cardContainer = document.querySelector(".card-container");

function renderCountries(data, id) {
  const countryCapital = document.querySelector(".capital");
  const flag = data[id].flags.png;
  const { common: name } = data[id].name;
  const population = data[id].population;
  let capitalArr = data[id].capital;
  const region = data[id].region;
  let capital = "";
  if (!capitalArr) {
    capital = `<span class="no-capital">No capital available</span>`;
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
    const selectedOption = e.target.value;

    cards.forEach((card) => {
      const cardRegion = card
        .querySelector(".region")
        .textContent.toLowerCase()
        .trim();
      if (cardRegion.includes(selectedOption)) {
        card.style.display = "block";
        console.log("test");
      } else {
        card.style.display = "block";
      }
    });
  });
}

getCountryData();

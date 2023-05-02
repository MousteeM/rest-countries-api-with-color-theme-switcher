const getCountryData = async function () {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  console.log(data);
  for (let i = 0; i < 12; i++) {
    console.log(data[i].flags.png);
    renderCountries(data, i);
    // console.log(data[i].region);
  }
  //   console.log(typeof data);
};

const cardContainer = document.querySelector(".card-container");
console.log(cardContainer);

function renderCountries(data, id) {
  const flag = data[id].flags.png;
  const { common: name } = data[id].name;
  const population = data[id].population;
  let capitalArr = data[id].capital;
  const region = data[id].region;
  let capital = "";
  if (!capitalArr) {
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
                <p>Population: ${population}</p>
                <p>Region: ${region}</p>
                <p>Capital: ${population}</p>
            </div>
        </div>
    `;

  cardContainer.insertAdjacentHTML("beforeend", html);
}

getCountryData();

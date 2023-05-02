const getCountries = async function () {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  //   const test = JSON.stringify(data);
  for (let i = 0; i < 1; i++) {
    console.log(data[i].independent);
  }
  console.log(data.length);
};

const cardContainer = document.querySelector(".card-container");
console.log(cardContainer);

const renderCountries = function (data) {
  const html = `
        <div class="card">
            <img
            src="./assets/fachry-zella-devandra-CHfPNUnCezY-unsplash.jpg"
            alt=""
            />
            <div class="card-text">
                <h3 class="country-name">Country name</h3>
                <p>Population:</p>
                <p>Region:</p>
                <p>Capital:</p>
            </div>
        </div>
    `;

  cardContainer.insertAdjacentHTML("beforeend", html);
};

getCountries();

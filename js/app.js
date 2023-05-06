// let countries = []

// const getCountryData = async function() {
//   const res = await fetch("https://restcountries.com/v3.1/all");
//   const data = await res.json();
//   //   console.log(data);
//   for (let i = 0; i < data.length; i++) {
//     renderCountries(data, i);
//   }
//   searchCountry();
//   filterRegion();
// };

// const regionField = document.querySelector(".dropdown-options");
// const cardContainer = document.querySelector(".card-container");

// function renderCountries(data, id) {
//   const countryCapital = document.querySelector(".capital");
//   const flag = data[id].flags.png;
//   const { common: name } = data[id].name;
//   const population = data[id].population;
//   let capitalArr = data[id].capital;
//   const region = data[id].region;
//   let capital = "";
//   if (!capitalArr) {
//     capital = `<span class="no-capital">No capital available</span>`;
//   } else capital = capitalArr[0];

//   const html = `
//           <div class="card">
//               <img
//               src="${flag}"
//               alt=""
//               />
//               <div class="card-text">
//                   <h3 class="country-name">${name}</h3>
//                   <p><b>Population:</b> ${population}</p>
//                   <p class="region"><b>Region:</b> ${region}</p>
//                   <p class="capital"><b>Capital:</b> ${capital}</p>
//               </div>
//           </div>
//       `;

//   cardContainer.insertAdjacentHTML("beforeend", html);
// }

// function searchCountry() {
//   const searchInput = document.querySelector(".search-input");
//   const cards = document.querySelectorAll(".card");
//   searchInput.addEventListener("keyup", (e) => {
//     const searchTerm = e.target.value.toLowerCase().trim();
//     //   console.log(searchTerm);
//     regionField.value = "Filter by region";

//     cards.forEach((card) => {
//       const countryName = card
//         .querySelector(".country-name")
//         .textContent.toLowerCase();
//       if (!countryName.includes(searchTerm)) {
//         card.style.display = "none";
//       } else {
//         card.style.display = "block";
//         // console.log("match");
//       }
//       // console.log(countryName);
//     });
//   });
// }

// // const regionField = document.querySelector(".dropdown-options");

// function filterRegion() {
//   const cards = document.querySelectorAll(".card");
//   const regionField = document.querySelector(".dropdown-options");
//   regionField.addEventListener("change", (e) => {
//     const selectedOption = e.target.value.toLowerCase();
//     console.log(selectedOption);
//     cards.forEach((card) => {
//       const cardRegion = card
//         .querySelector(".region")
//         .textContent.slice(8)
//         .toLowerCase()
//         .trim();
//       if (cardRegion !== selectedOption) {
//         card.style.display = "none";
//         console.log("test");
//       } else {
//         card.style.display = "block";
//       }
//     });
//   });
// }


// getCountryData();


  const getCountryData = async function() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    countries = data
    displayCountry(data)
    
    //console.log(data[0].languages)
  }


function displayCountry(data) {
  //console.log(data)
  for (let i = 0; i < data.length; i++) {
    //let countryCard = cardContainer[i]
    const lang = data[i].languages
    if(!lang) {
      languages = `No languages found`
      //console.log(languages)
    } else {
      const languages = Object.values(data[i].languages)
      languages.forEach((language) => {
        //console.log(language)
      })
      //console.log(languages)
    } 
    
    
    const topLevelDomainArr = data[i].tld
    if(!topLevelDomainArr) {
      topLevelDomain = `No tld found`
    } else {
      topLevelDomain = topLevelDomainArr[0]
    } 
    
    
    const currData= data[i].currencies
    if(!currData) {
      currencies= `No data found`
    } else {
      currencies = Object.values(currData) 
      //const currency = currencies[0].name
      //console.log(currencies)
      //console.log(currency)
      // currencies.forEach((currency) => {
      //   currency = currency.name
      //   console.log(currency)
      // })
    } 
    
    const borderList = []
    const borderCountries = data[i].borders
    if(!borderCountries) {
      const borders = `No borders`
      console.log(borders)
    } else {
      const borders = borderCountries
      console.log(borders)
    }
  }
  // const topLevelDomain = data[36].tld[0]
  //console.log(data)
}

  getCountryData()
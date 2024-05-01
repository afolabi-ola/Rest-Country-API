"use strict";
const cont = document.querySelector(".countries");

const url = "https://restcountries.com/v3.1/all";

const alertError = (para) => {
  alert(para);
};


const getLanguage = (para) => {
  const [par1, par2] = Object.entries(para);
  const [key1, value1] = par2 ? par2 : par1;
  return value1;
};

const getCurrency = (para) => {
  const [cur] = Object.entries(para);
  return cur[1].name;
};
const getCurrencySymbol = (para) => {
  const [cur] = Object.entries(para);
  return cur[1].symbol;
};

const mapData = (country) => {
  return `
 
          <div class="country-wrap">
           <a target=_blank href='./details.html?name=${country.name.common}'>
              <div class="flag-img">
                <img src=${country.flags.png} alt=${
    country.flags.alt ? country.flags.alt : country.flags.png
  }} id="flag" />
              </div>
              <div class="text">
                <ul class="text1">
                  <li class="name">${country.name.common}</li>
                  <div class="label">
                    <label for="capital"
                      >Capital: <span class="capital">${
                        country.capital ? country.capital : "None"
                      }</span></label>
                  </div>
                  <div class="label">
                    <label for="currency"
                      >Currency:
                      <span class="currency"
                        >${
                          country.currencies
                            ? getCurrency(country.currencies)
                            : "None"
                        } <span class="cur-symbol">(${
    country.currencies ? getCurrencySymbol(country.currencies) : "None"
  }) </span></span
                      ></label
                    >
                  </div>
                </ul>
                <ul class="text2">
                  <div class="label">
                    <label for="continent"
                      >Continent: <span class="continent">${
                        country.continents
                      }</span></label
                    >
                  </div>
                  <div class="label">
                    <label for="population"
                      >Population: <span class="population">${
                        country.population
                      }</span></label
                    >
                  </div>
                  <div class="label">
                    <label for="language"
                      >Languages: <span class="language">${
                        country.languages
                          ? getLanguage(country.languages)
                          : "None"
                      }</span></label
                    >
                  </div>
                </ul>
              </div>
                 </a>
            </div>
 
          `;
};

const getCountries = async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Couldn't get countries.
      Try:
     1). Refreshing your browser.
     2). Make sure you are connected.
     3). Checking the proxy and the firewall
     4). If you are on PC, try Running Windows Network Diagnostics
      `);
    }
    const data = await res.json();
    const arrMap = data.map(mapData);
    cont.innerHTML = arrMap.join("");
  } catch (error) {
    alertError(error);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  getCountries();
});
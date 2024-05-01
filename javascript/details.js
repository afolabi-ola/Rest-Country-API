"use strict";

const nameId = new URLSearchParams(window.location.search).get("name");
const detailsCont = document.querySelector(".details-container");

const alertError = (par) => {
  alert(par);
};

const getLanguage = (parameter) => {
  const par1 = Object.entries(parameter);
  const values = par1.map((key) => {
    const [, value1] = key;
    return `<li>${value1}</li>`;
  });
  return values.join(" ");
};

const getCurrency = (para) => {
  const [cur] = Object.entries(para);
  return cur[1].name;
};
const getCurrencySymbol = (para) => {
  const [cur] = Object.entries(para);
  const sym = cur[1].symbol ? cur[1].symbol : "";
  return sym;
};
const getUpperCase = (para) => {
  const upper = para.split("")[0].toUpperCase() + para.slice(1);
};

const mapData = (country) => {
  // const returnedCountry = country.length < 1 ? country[0] : country;
  return `
            <div class="country-details-wrap">

<div class="country-details-images">
  <div class="county-details-flag">
    <img src=${country.flags.png ? country.flags.png : "No Flag"} alt=${
    country.flags.alt ? country.flags.alt : "No Flag"
  } >
    <p>${country.name.official} Flag</p>
  </div>
  <div class="county-details-map">
    <img src=${
      country.coatOfArms.png ? country.coatOfArms.png : "unavail.png"
    } alt=${
    country.coatOfArms.png ? country.coatOfArms.png : "No Coat of Arms"
  }  
  } >
        <p>${country.coatOfArms.png ? country.name.official : ""}  ${
    country.coatOfArms.png ? "Coat Of Arms" : "None"
  }</p>
  </div>
</div>

<div class="country-details-text">
<div class="country-detail-text">
  <p>
<label class="details-label" for="name">Common Name:</label>
${country.name.common ? country.name.common : "No Name"} 
</p>
  <p>
<label class="details-label" for="name">Official Name:</label>
${country.name.official ? country.name.official : "No Official Name"}  
</p>
  <p>
<label class="details-label" for="name">Capital:</label>
${country.capital ? country.capital : "No Capital"}  
</p>
  <p>
<label class="details-label" for="name">Currency:</label>
<span>${
    country.currencies ? getCurrency(country.currencies) : "No Currency"
  } </span>
<span>(${
    country.currencies ? getCurrencySymbol(country.currencies) : "No Symbol"
  } )</span>

</p>
  <p>
<label class="details-label" for="name">Continent:</label>
${country.continents ? country.continents : "No Region"} 
</p>

  <p>
<label class="details-label" for="name">Population:</label>
${country.population ? country.population : country.population} 
</p>

  <p>
<label class="details-label" for="languages">Languages:</label>
<span class="detail-languages"></span>
</p>
</div>

  
    <div class="details-text2">

    <p>
    <label class="details-label" for="un">REGION:</label>
    <span>${country.region ? country.region : "No Region"} </span>
  </p>

  <p>
    <label class="details-label" for="un">SUB REGION:</label>
    <span> ${country.subregion ? country.subregion : "None"}</span>
  </p>
  <p>
    <label class="details-label" for="borders">Borders:</label>
    <span class="border"></span>
  </p>
  <p>
    <label class="details-label" for="borders">AREA:</label>
    <span> ${country.area}m<sup>2<sup></span>
  </p>

  <p>
    <label class="details-label" for="independent">Independent:</label>
    <span> ${
      country.independent == true ? "Is Independent" : "Not Independent"
    }</span>
  </p>
  <p>
    <label class="details-label" for="un">United Nation:</label>
    <span>${
      country.unMember === true ? "Recognized Member" : "Unrecognized"
    }</span>
  </p>
  <p>
    <label class="details-label" for="un">START OF WEEK:</label>
    <span> ${
      country.startOfWeek ? getUpperCase(country.startOfWeek) : ""
    }</span>
  </p>
  <p>
    <label class="details-label" for="un">TIME ZONE:</label>
    <span class="time"></span>
  </p>
  


</div>

</div>

      </div>

          `;
};

const getCountryDetail = async () => {
  const url = `https://restcountries.com/v3.1/name/${nameId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Couldn't get country details`);
    }
    const data = await response.json();
    const country = data[0];
    const arrMap =
      data.length === 1 ? data.map(mapData) : [country].map(mapData);
    detailsCont.innerHTML = arrMap.join("");
    const lang = document.querySelector(".detail-languages");
    const bord = document.querySelector(".border");
    const time = document.querySelector(".time");
    time.innerHTML = ` ${
      country.timezones
        ? country.timezones
            .map((data) => `<li class="m-0 p-0">${data}</li>`)
            .join(" ")
        : "no timezone"
    }`;
    bord.innerHTML = ` ${
      country.borders
        ? country.borders.map((data) => `<span class="m-0 p-0">${data}</span>`)
        : // .join()
          "No Border"
    }`;
    lang.innerHTML = ` ${
      country.languages ? getLanguage(country.languages) : "None"
    }`;
  } catch (error) {
    alert(error);
  }
};
getCountryDetail();

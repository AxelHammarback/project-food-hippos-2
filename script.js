const apiKey = "bd7b7a44bc3c3e751cac9af7a9a53345"; 
const cityID = 84; // Prague
const cuisineID = 178; // Kebab

// Prague Europe ID: 84
// Prague Oklahoma ID: 8294

const sortRatingURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}&sort=cost&order=asc`;
const sortCostURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}&sort=rating`;
const defaultURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}`;

const cardMain = document.getElementById('cardMain')
const cardImage = document.getElementById('cardImage')
const cardInfo = document.getElementById('cardInfo')
const mainCardArea = document.getElementById('mainCardArea')
const cardAdditionalInfo = document.getElementById('cardAdditionalInfo')


const fetchRestaurants = (url) => {
  console.log(`Nu är vi inne i funktionen, ${url}`)
  mainCardArea.innerHTML = "";
  const restBox = document.getElementById("restaurants");
// När måste man använda headers och inte?
// Varför använde Van inte headers i dagens övning?
  fetch(url, { headers: {"user-key": apiKey} })
    .then((response) => {
      return response.json();
    })
        .then((restaurantObject) => {
          console.log(restaurantObject);
          restaurantObject.restaurants.forEach((rest) => {
            // Gör om average cost till avg cost for one.
            mainCardArea.innerHTML += `
            
            <div class="card-main" id="cardMain">
            <a href="${rest.restaurant.menu_url}" class="link-container" target="_blank"><div class="card-image" id="cardImage"><img src="${checkIfImageExists(rest.restaurant.featured_image)}"/></div>
            <div class="card-info" id="cardInfo">
            <h3>${rest.restaurant.name}</h3>
            <p>${rest.restaurant.location.address}</p>
            </div></a>
            <div class="card-additional-info" id="cardAdditionalInfo">
            <div class="info-small-box"><p>💰👬${rest.restaurant.average_cost_for_two} ${rest.restaurant.currency}</p>          
            </div>
            <div class="info-small-box"><p>⭐️${rest.restaurant.user_rating.aggregate_rating}</p>       
            </div>
          </div>
            `
      });
  })
}



const checkIfImageExists = featuredImage => {
  console.log(featuredImage);
  
  if (!featuredImage) {
    return `./assets/image_kebab.png`;
  } else {
    return featuredImage;
  }
  
}


fetchRestaurants(defaultURL);
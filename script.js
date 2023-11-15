const searchInput = document.getElementById("search_input");
const searchBtn = document.getElementById("search_btn");
const phonesWrapperEl = document.getElementById("phones_wrapper");
const showAllBtn = document.getElementById("showALLBtn");
const myModal = document.getElementById("my_modal");

// initial search text
let searchText = "iphone";
let allPhones;

searchBtn.addEventListener("click", () => {
  fetchPhones(searchInput.value);
});

showAllBtn.addEventListener("click", () => {
  displayPhones(allPhones); // Display all phones when the "Show All" button is clicked
  showAllBtn.classList.add("hidden"); // Hide the "Show All" button
});

const fetchPhones = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  allPhones = data.data; // Store all phones
  displayPhones(allPhones.slice(0, 12)); // Display the first 12 phones
  if (allPhones.length > 12) {
    showAllBtn.classList.remove("hidden"); // Show the "Show All" button if there are more than 12 phones
  } else {
    showAllBtn.classList.add("hidden"); // Hide the "Show All" button if there are 12 or fewer phones
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchPhones(searchText);
});

function displayPhones(data) {
  const fragment = new DocumentFragment();
  data.forEach((item) => {
    const { phone_name, image, slug } = item;
    const card = document.createElement("div");
    card.classList.add("card", "w-96", "bg-base-100", "shadow-xl", "p-5");
    card.innerHTML = `<figure class="px-10 pt-10">
                        <img src=${image} alt="iphone" class="rounded-xl" />
                      </figure>
                      <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone_name}</h2>
                        <p>There are many variations of passages of available, but the majority have suffered</p>
                        <div class="card-actions">
                          <button  id=${slug} class="showDetailsBtn btn btn-primary text-white">Show Details</button>
                        </div>
                      </div>`;

    fragment.appendChild(card);
  });

  phonesWrapperEl.innerHTML = "";
  phonesWrapperEl.appendChild(fragment);
}

// show Details handler
phonesWrapperEl.addEventListener("click", findId);
function findId(e) {
    if (e.target.classList.contains("showDetailsBtn")) {
        const id = e.target.id;
        showDetailsHandler(id)
    }
}
const showDetailsHandler = async(id) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();

    const phone = data.data;
    showPhoneDetails(phone);
    console.log(phone);
}

function showPhoneDetails(data) {
    const { brand, image, name, releaseDate, mainFeatures } = data;
    
    const modelNameEl = document.getElementById("detailsPhoneName");
    const brandNameEl = document.getElementById("detailsBrand");
    const detailsSpecEl = document.getElementById("detailsSpec");
    const releaseDateEl = document.getElementById("releaseDate");
    const imageDivEl = document.getElementById("imgContainer");

    modelNameEl.innerText = name;
    brandNameEl.innerText = brand;
    imageDivEl.innerHTML = `<img src="${image}" alt="">`;
    releaseDateEl.innerText = releaseDate;
    let featuresString = "";
    for (const key in mainFeatures) {
        featuresString=featuresString+`${key}: ${mainFeatures[key]} \n`
    }
    detailsSpecEl.innerText = featuresString;
    myModal.showModal();
}

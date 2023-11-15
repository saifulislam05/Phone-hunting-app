const searchInput = document.getElementById("search_input");
const searchBtn = document.getElementById("search_btn");
const phonesWrapperEl = document.getElementById("phones_wrapper");
const showAllBtn = document.getElementById("showALLBtn");

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
                        <p>${slug}</p>
                        <div class="card-actions">
                          <button class="btn btn-primary text-white">Show Details</button>
                        </div>
                      </div>`;

    fragment.appendChild(card);
  });

  phonesWrapperEl.innerHTML = "";
  phonesWrapperEl.appendChild(fragment);
}

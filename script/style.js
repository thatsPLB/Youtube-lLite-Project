const getCatagories = async () => {
  try {
    let container = document.getElementById("menu");
    let response = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    let data = await response.json();

    data.data.forEach((data) => {
      let button = document.createElement("button");

      button.innerHTML = `
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded" onclick="loadId('${data?.category_id}');" >${data.category }</button>`;
      container.appendChild(button);
    });
  } catch (error) {
    console.error(error);
  }
};

getCatagories();

let catId = 1000
let doSort = false;
const loadId = async (category_id, s = false) => {
  category_id === undefined ? catId = catId : catId = category_id;
  doSort = s;
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${catId}`
  );
  const data = await response.json();
  const newData = data.data;
  if (doSort) {
      newData.forEach((item) => {
        item.others.views =
          parseFloat(item.others.views.replace("K", "")) * 1000;
      });

      var byView = newData.slice(0);
      byView.sort((a, b) => {
        return a.others.views - b.others.views;
      });

      byView.forEach((item) => {
        const viewsInK = item.others.views / 1000;
        item.others.views = viewsInK.toFixed(1) + "K";
      });
    }
  // card-container section
  console.log(byView)
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  (byView === undefined ? newData : byView).forEach((name) => {
    const div = document.createElement("div");
    div.classList = `card w-96 bg-base-100 shadow-xl`;
    div.innerHTML = ` 
    <figure class="px-10 pt-10">
    <img src="${name.thumbnail}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="card-title">${name.title}</h2>
    <img src="${name.authors?.profile_picture}/>
    
    <p>${name.others.views}</p>
    <p>${name.others.posted_date}</p>
    <div class="card-actions">
    </div>
  </div>
  `;
    cardContainer.appendChild(div);
  });
};
loadId();
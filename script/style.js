const loadId = async(category_id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
  const data = await response.json();
  const newData =data.data
  console.log(data);
  // card-container section
  const cardContainer = document.getElementById('card-container')
  cardContainer.innerHTML= "";
  newData.forEach((name) =>{
    console.log(name);
    const div = document.createElement('div')
    div.classList = `card w-96 bg-base-100 shadow-xl`   
    div.innerHTML = ` 
    <figure class="px-10 pt-10">
    <img src="${name.thumbnail}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="card-title">${name.title}</h2>
    <img src="${name.authors?.profile_picture}/>
    
    <p>${name.others.views}</p>
    <div class="card-actions">
    </div>
  </div>
  `;
  cardContainer.appendChild(div);
    });
};
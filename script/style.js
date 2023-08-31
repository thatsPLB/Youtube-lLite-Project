const handleCategory = async() =>{
    
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    // tab container
    const tabContainer = document.getElementById('tab-container')
    data.data.forEach((element) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <a onclick = "loadId('${element.category_id}')"class="tab">${element.category}</a> 
        
        `
        tabContainer.appendChild(div)
        
    });
    // console.log(data.data);
};

// Id
const loadId = async(category_id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    // console.log(data);
// card-container section
    const cardContainer = document.getElementById('card-container')
    data.forEach((name) =>{
        console.log(name);
        const div = document.createElement('div')   
        div.innerHTML = ` <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src=${name?.profile_picture}
        <div class="card-body items-center text-center">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
        
        `
        cardContainer.appendChild(div);
    });
};









handleCategory()
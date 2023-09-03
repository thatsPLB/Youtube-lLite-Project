const getCatagories = async () => {
    try {
      let container = document.getElementById("btn-container");
      let response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
      );
      let data = await response.json();
  
      data.data.forEach((element) => {
        let button = document.createElement("button");
  
        button.innerHTML = `
          <button class="bg-[#25252533] text-[#252525] focus:bg-[#FF1F3D] focus:text-white font-medium rounded-md px-4 py-2" onclick="getCatagoryId('${
            element?.category_id
          }'); toggleSpinner('${true}')" >${
          element.category || "no available"
        }</button>
            `;
        container.appendChild(button);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  let IsShow = false;
  let checkedId = 1000;
  const getCatagoryId = async (Id, sort = false) => {
    if(Id !== undefined){
      checkedId = Id;
    }
    IsShow = sort;
    let notFound = document.getElementById("notFound-container");
    notFound.innerHTML = "";
    let displayCatagories = document.getElementById("display-catagories");
    displayCatagories.innerHTML = "";
  
    try {
      let response = await fetch(
        ` https://openapi.programming-hero.com/api/videos/category/${Id === undefined ? checkedId : Id}`
      );
      let data = await response.json();
      let newData = data.data;
      if (IsShow) {
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
      if (data?.status === true) {
        (byView !== undefined ? byView : data.data).forEach((element) => {
          let div = document.createElement("div");
          div.innerHTML = `
                    <img src="${
                      element.thumbnail || "https://i.ibb.co/DRxB1Wm/sunris.jpg"
                    }" alt="" class="md:w-[315px] md:h-[200px] w-[380px]  mx-auto">
                        <span id='showtime' class="bg-black ${
                          element.others.posted_date == "" ? "hidden" : "block"
                        } py-1 px-1 mt-[-38px] relative w-fit float-right lg:mr-[9px] mr-[9px] md:mr-[32px]">${getTime(
            element.others.posted_date
          )}</span>
                    <div class="pt-2 flex gap-2 items-center">
                       <img src="${
                         element.authors[0].profile_picture ||
                         "https://i.ibb.co/DRxB1Wm/sunris.jpg"
                       }" alt="" class="w-[40px] h-[40px] rounded-full">
                       <h1 class ="text-xl font-medium text-[#171717]">${
                         element.title || "no title availble"
                       }</h1>
                    </div>
                    <p class="pl-12 inline-flex gap-1 text-[#171717b3] text-sm font-normal pb-1"> ${
                      element.authors[0].profile_name || "not found author"
                    } ${
            element.authors[0].verified || "" == true
              ? `<img src="./assets/verified.svg">`
              : ""
          } </p>
                    <p class="pl-12 text-[#171717b3] text-sm font-normal">${
                      element.others.views || "0"
                    }Views</p>
        
                    
                    `;
  
          displayCatagories.appendChild(div);
        });
  
        toggleSpinner(false);
      } else {
        let div = document.createElement("div");
        toggleSpinner(false);
        notFound.innerHTML = "";
        div.classList.add(
          "flex",
          "justify-center",
          "items-center",
          "flex-col",
          "gap-2"
        );
        div.innerHTML = `
                <img src="./assets/Icon.png">
                <h1 class="font-bold text-black text-2xl ">${
                  data.message || "no data found !"
                }</h1>
                
                `;
  
        notFound.appendChild(div);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const toggleSpinner = (IsTrue) => {
    if (IsTrue) {
      document.getElementById("togglespinner").classList.remove("hidden");
    } else {
      document.getElementById("togglespinner").classList.add("hidden");
    }
  };
  
  const getTime = (seconds) => {
    return (result = new Date(seconds * 1000).toISOString().slice(11, 19));
  };
  window.onload = () => {
    getCatagories();
    getCatagoryId();
    toggleSpinner(true);
  };
  
  const sortByview = () => {
    console.log("hello world");
  }
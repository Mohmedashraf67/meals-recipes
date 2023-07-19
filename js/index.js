
let apiRespose=[];
let apiResposeForCategoryMeals=[];
let apiResposeForEachMeal=[];
// let navoInDoc = document.getElementById("icona");
// let btnForNav = document.getElementById("btnForNav");
// let btnForNavSecond = document.getElementById("btnForNavSecond");
// let perant =document.getElementById("perant")
let contactListItem =document.getElementById("contactListItem");
let targetoo;
let targetoo2;
let contuctDetails=document.getElementById("contuctDetails")
let loading=document.getElementById("loading");

let allMealsPlace =document.getElementById("allMealsPlace");
let mealsDetailsSingle = document.getElementById("mealsDetailsSingle");
let searchSection = document.getElementById("searchSection");

let btnForSearchByLetter = document.getElementById("btnForSearchByLetter");
let btnForSearchByName = document.getElementById("btnForSearchByName");





// let listInNav = document.getElementById("contactListItem");
contactListItem.addEventListener("click", function(){
     allMealsPlace.classList.replace("d-none","d-block");
     document.getElementById("contuctDetails").classList.replace("d-none","d-block")
})

// oninput="searchByLetter(this.value)"
btnForSearchByLetter.addEventListener("input", function(vv){
     
          targetoo=vv.target.value;
     console.log(vv.target.value);
     if (targetoo != "") {
              searchByLetter(targetoo); 
          }
 

})
btnForSearchByName.addEventListener("input", function(vv){
     
     targetoo2=vv.target.value;
console.log(vv.target.value);
if (targetoo != "") {
         searchByName(targetoo2); 
     }


})
let allInBckpack=``





// $("section").ready(function () {
//      $("#loading").fadeOut(3000)
     
// })

// btnForNav.addEventListener("click", function(){
//      perant.classList.add("newWidth")
// })

// btnForNavSecond.addEventListener("click", function(){
//      perant.classList.toggle("newWidth")
//      })


async function getData(){
    
const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
apiRespose =await api.json() ;

console.log(apiRespose);


displayMeal(apiRespose.categories)

contuctDetails.classList.add("d-none")
mealsDetailsSingle.classList.add("d-none")



}
getData();


function displayMeal(bolbol){

 let cartoana=``;
 for (let i = 0; i < bolbol.length; i++) {
    cartoana+=`    
  
            <div onclick="getCategoryMeals(${bolbol[i].idCategory})"  class="col-md-3   ">
          
           <div  class="card position-relative overflow-hidden bg-black mt-1 mb-1 cardo-width" >
           
                  <img src="${bolbol[i].strCategoryThumb}" class="card-img-top rounded-4 position w-100 opacity-100 " alt="...">
                  <div class="dark-layer w-100 h-100 text-center">
                  <h2>${bolbol[i]. strCategory}</h2>
                  <p class="text-desc">${bolbol[i].strCategoryDescription}</p>
                  </div>
            </div>
          
          </div>
    

`;
 }
document.getElementById("placeForCards").innerHTML=(cartoana)
loading.classList.add("d-none")
// console.log(cartoana); strCategoryThumb  strCategory
 }



async function getCategoryMeals(category){
     loading.classList.remove("d-none")
     let categoryToGo =apiRespose.categories[category-1].strCategory;
// console.log(apiRespose.categories[category-1].strCategory);

     const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryToGo}`)
    apiResposeForCategoryMeals = await api.json();
console.log(apiResposeForCategoryMeals);
displayCategoryMeals(apiResposeForCategoryMeals.meals)

    
}




async function displayCategoryMeals(IWilldisplay){
     let cartoana2=``;
     for (let i = 0; i < IWilldisplay.length; i++) {
          cartoana2+=`    
        
                  <div onclick="displayMeaiByid(${IWilldisplay[i].idMeal})" class="col-md-3   ">
                
                 <div  class="card position-relative overflow-hidden bg-black mt-1 mb-1 cardo-width" >
                 
                        <img src="${IWilldisplay[i].strMealThumb}" class="card-img-top rounded-4 position w-100 opacity-100 " alt="...">
                        <div class="dark-layer w-100 h-100 text-center d-flex align-items-center">
                        <h2>${IWilldisplay[i].strMeal}</h2>
                        </div>
                  </div>
                
                </div>
          
      
      `;
}
document.getElementById("placeForCards").innerHTML=(cartoana2)
loading.classList.add("d-none")

}



async function displayMeaiByid(mealId){
     mealsDetailsSingle.classList.remove("d-none")
     const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
     apiResposeForEachMeal = await api.json();
console.log(apiResposeForEachMeal);
let packageRecipes =``;
let packageRecipesTeprary =``;
let cartoana3=``;


validationNumbes(apiResposeForEachMeal.meals);


for (let i = 0; i < apiResposeForEachMeal.meals.length; i++) {
     cartoana3+=`    
   <div class="row pt-3">

     <div class="col-md-4">
     <img class="w-75 pt-2" src="${apiResposeForEachMeal.meals[i].strMealThumb}" alt="">
     <h2>${apiResposeForEachMeal.meals[i].strMeal}</h2>
      </div>
      <div class="col-md-8">
      <i onclick="mealSectionDisapear()" class="fa-solid fa-circle-xmark fa-2xl text-white me-auto"></i>
     <p>${apiResposeForEachMeal.meals[i].strInstructions}</p>
     <h2>Category : ${apiResposeForEachMeal.meals[i].strCategory}</h2>
     <div class="d-flex flex-wrap">
     ${allInBckpack}
     </div>
     <h3>tags</h3>
     <div class="boton-collection">
     <a target="_blank" href=" ${apiResposeForEachMeal.meals[i].strYoutube}"><div class="btn btn-danger">youtube</div></a>
     <a target="_blank" href="${apiResposeForEachMeal.meals[i].strSource}"><div class="btn btn-success">source</div></a>
     </div>
      </div>
     
 </div>
 `;
}
document.getElementById("eachMealById").classList.replace("d-none","d-block")
document.getElementById("allMealsPlace").classList.replace("d-block","d-none")
mealsDetailsSingle.classList.remove("d-none");
document.getElementById("eachMealById").innerHTML=(cartoana3);
loading.classList.add("d-none")

}



function validationNumbes(wantToVali){
   let  vvpack=[];
   let backpack=``
for (let e = 0; e < 30; e++) {
 if(wantToVali[0].strIngredient+e != null && wantToVali[0].strIngredient+e != "" && wantToVali[0].strIngredient+e != NaN ) {
     vvpack.push(wantToVali[0].strIngredient+e)
 }
     
}
console.log(vvpack);
for (let i = 0; i < vvpack.length; i++) {
     backpack+=`<li class="alert alert-info m-2 p-1">${vvpack[i]}</li>`
     
}
return allInBckpack=backpack;
}

function readyForSearch(){
     allMealsPlace.classList.replace("d-block","d-none")
     mealsDetailsSingle.classList.replace("d-block","d-none")
     searchSection.classList.replace("d-none","d-block")

}
function outFormSearch(){
     allMealsPlace.classList.replace("d-none","d-block")
     mealsDetailsSingle.classList.add("d-none","d-block")
     searchSection.classList.replace("d-block","d-none")
     getData();
     

}

async function searchByLetter(term){
     term= btnForSearchByLetter.value;
   
               let apirepo=[];
    console.log(term);
    const apiLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    apirepo =await apiLetter.json() ;

    console.log(apirepo);  
//     apiResposeForEachMeal=apirepo
//     displayMeaiByid(apirepo)
document.getElementById("allMealsPlace").classList.replace("d-none","d-block")
displayCategoryMeals(apirepo.meals);

}

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
async function searchByName(term){
     // term= btnForSearchByLetter.value;
   
               let apirepo2=[];
    console.log(term);
    const apiByName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    apirepo2 =await apiByName.json() ;

    console.log(apirepo2);  
    document.getElementById("allMealsPlace").classList.replace("d-none","d-block")
    displayCategoryMeals(apirepo2.meals);
//     apiResposeForEachMeal=apirepo
//     displayMeaiByid(apirepo)
// 

}


 async function areaData(){
     loading.classList.remove("d-none")
 const apiArea=await fetch(` https://www.themealdb.com/api/json/v1/1/list.php?a=list `);
 let apiResponseArea=[];
 apiResponseArea=await apiArea.json();
 console.log(apiResponseArea.meals);
 let cartonaa=``
 for(let i=0;i<apiResponseArea.meals.length;i++){
    cartonaa+=`
    
    <div class="col-md-3 bg-dark mt-5">
    <div   class="card overflow-hidden position-relative bg-dark" style="width: 18rem;">
        <i class="fa-solid fa-house w-100 h-100 fa-9x text-white p-5 ">  <h1 class="text-smaller">${apiResponseArea.meals[i].strArea}</h1></i>
        
      <div class="dark-layer text-center position-absolute h-100 w-100  ">
  
      </div>
    </div>

  </div>
`
 }
 document.getElementById("placeForCards").innerHTML=(cartonaa)
 contuctDetails.classList.add("d-none")
 mealsDetailsSingle.classList.add("d-none")
 loading.classList.add("d-none")
}

async function grediantsData(){
     loading.classList.remove("d-none")
     const gggg =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    //  let apiResponseGrediant=[];
     let apiResponseGrediant=await gggg.json();
     console.log(apiResponseGrediant);
     let cartonaa4=``
     for(let i=0;i<apiResponseGrediant.meals.length;i++){
        cartonaa4+=`
        
        <div class="col-md-3 bg-dark mt-5">
        <div   class="card overflow-hidden position-relative bg-dark" style="width: 18rem;">
            <i class="fa-solid fa-drumstick-bite w-100 h-100 fa-9x text-white p-5 ">  <h1 class="text-smaller">${apiResponseGrediant.meals[i].strIngredient}</h1></i>
            
           
          <div class="dark-layer overflow-hidden text-white text-center position-absolute h-100 w-100  ">
          <p>${apiResponseGrediant.meals[i].strDescription}</p>
          </div>
        </div>
    
      </div>
    `
     }
     document.getElementById("placeForCards").innerHTML=(cartonaa4)
     loading.classList.add("d-none")
     loading.classList.add("d-none")
     contuctDetails.classList.add("d-none")
     mealsDetailsSingle.classList.add("d-none")
    }

function contactItemShow(){
     contuctDetails.classList.remove("d-none")
}

function mealSectionDisapear(){
     mealsDetailsSingle.classList.add("d-none")
     getData()
}
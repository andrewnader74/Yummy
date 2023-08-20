$(document).ready(function()
{

$("#loading_screen").fadeOut(1000);
$("body").css("overflow" , "auto");



// #region login


$("#contactus").click(function () 
{ 
    $("#loginform").css("display", "flex");
    $("#side_bar").animate({left:-sideBar} ,500);
    $("#mover").removeClass("active");
    $("#foodData").css("display" , "none");
    $("#searchData").css("display" , "none");
    $("#categoriesdataa").css("display","none");
    $("#areaSection").css("display","none");
    $("#ingredientsSection").css("display","none");
    $("#foodDetails").css("display","none");
    $("#newdetails").css("display" , "none")
});

   
    let nameInput = document.getElementById('nameInput');
    let passwordInput = document.getElementById('passwordInput');
    let emailInput = document.getElementById("emailInput");
    let ageInput = document.getElementById("ageInput");
    let phoneInput = document.getElementById("phoneInput");
    let submitButton = document.getElementById("submitButton");
    let confirmpass = document.getElementById("repasswordInput");

    let nameRegex = /^[a-zA-Z0-9 ]+$/;
    let passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let ageRegex = /^([1-9]|[1-9][0-9]|1[01][0-9]|120)$/;
    let phoneRegex = /^(01)[0125][0-9]{8}$/;

    nameInput.addEventListener('click', function() {
        if (nameRegex.test(nameInput.value)) {
           $("#nameAlert").css("display", "none");
           nameInput.classList.add('valid');

        } else {
            $("#nameAlert").css("display", "block");
            nameInput.classList.remove('valid');

        }
        checkValidity();
    });

    passwordInput.addEventListener('click', function() {
        if (passwordRegex.test(passwordInput.value)) {
            $("#passwordAlert").css("display", "none");
            passwordInput.classList.add('valid');

        } else {
            $("#passwordAlert").css("display", "block");
            passwordInput.classList.remove('valid');

        }
        checkValidity();
    });

    emailInput.addEventListener('click', function() {
        if (emailRegex.test(emailInput.value)) {
            $("#emailAlert").css("display", "none");
            emailInput.classList.add('valid');

        } else {
            $("#emailAlert").css("display", "block");
            emailInput.classList.remove('valid');

        }
        checkValidity();
    });

    ageInput.addEventListener('click', function() {
        if (ageRegex.test(ageInput.value)) {
            $("#ageAlert").css("display", "none");
            ageInput.classList.add('valid');

        } else {
            $("#ageAlert").css("display", "block");
            ageInput.classList.remove('valid');

        }
        checkValidity();
    });

    phoneInput.addEventListener('click', function() {
        if (phoneRegex.test(phoneInput.value)) {
            $("#phoneAlert").css("display", "none");
            phoneInput.classList.add('valid');

        } else {
            $("#phoneAlert").css("display", "block");
            phoneInput.classList.remove('valid');

        }
        checkValidity();
    });


    confirmpass.addEventListener('click' , function()
    {
        if(confirmpass.value ==  passwordInput.value)
        { 
            $("#repasswordAlert").css("display", "none");
            repasswordInput.classList.add('valid');
        }
        else
        {
            $("#repasswordAlert").css("display", "block");
            repasswordInput.classList.remove('valid');

        }
        checkValidity();

    });
      
  
   

   
    function checkValidity() {
        if (nameInput.classList.contains('valid') &&
            passwordInput.classList.contains('valid') &&
            emailInput.classList.contains &&
            ageInput.classList.contains('valid') &&
            phoneInput.classList.contains('valid') &&
            confirmpass.classList.contains('valid')) {
            submitButton.disabled = false;
            } else {
            submitButton.disabled = true;
            }
            }

// #endregion login


// #region sidebar

let sideBar = $("#sidebar").innerWidth();
$("#side_bar").css('left' , -sideBar)

$(".cursor").click(function ()
{ 

if($("#side_bar").css('left') == '0px')
{
    $("#side_bar").animate({left:-sideBar} ,500);
    $(this).removeClass("active");

}
else
{
    $("#side_bar").animate({left:'0px'} ,500);
    $(this).addClass("active");

}

});


// #endregion sidebar


// #region Data

let allItems = []
async function  getFood() 
{
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
   let finalresult = await x.json();
    console.log(finalresult);
	allItems = Object.values(finalresult)[0];
   displayItems();
}


function displayItems ()
{
var cartoona =``;
for (var i = 0; i < allItems.length; i++) 
{
    cartoona += 
    `
    <div class="col-md-3 gettingData" id="${allItems[i].idMeal}"  style="cursor: pointer;">
    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${allItems[i].strMealThumb}" alt="" srcset=""  >
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${allItems[i].strMeal}</h3>
    </div>
    </div>
    </div>    
    `
}
    document.getElementById('rowData').innerHTML=cartoona;
    var mealItems = document.getElementsByClassName('gettingData');
  for (var i = 0; i < mealItems.length; i++) {
    mealItems[i].addEventListener('click', function() {
      var mealId = this.getAttribute('id');
      showFoodDetails(mealId);
    });
  }
}

async function showFoodDetails(mealId) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    var data = await response.json();
    var meal = data.meals[0];
  
    var cartoona2 =`
    <div class="container">
        <div class="row py-5 g-4 text-white" id="rowData">
        <div class="col-md-4 ">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8 ">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area :${meal.strArea} </span></h3>
            <h3><span class="fw-bolder">Category :${meal.strCategory}  </span></h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="btn btn-info  m-2 p-1" >${meal.strMeasure1}</li>
                <li class="btn btn-info m-2 p-1">${meal.strMeasure2}</li>
                <li class="btn btn-info m-2 p-1">${meal.strMeasure3}</li>
                <li class="btn btn-info m-2 p-1">${meal.strMeasure4}</li>
                <li class="btn btn-info m-2 p-1">${meal.strMeasure5}</li>
                
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                
        <li class="btn btn-danger m-2 p-1">${meal.strTags}</li>
            </ul>

            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div></div>
    </div>`
    document.getElementById('foodDetails').innerHTML=cartoona2;
    $("#foodDetails").css("display" , "block");
    $("#searchData").css("display" , "none")
        $("#side_bar").animate({left:-sideBar} ,500);
        $("#mover").removeClass("active");
        $("#foodData").css("display" , "none");
        $("#categoriesdataa").css("display","none");
        $("#areaSection").css("display","none");
         $("#ingredientsSection").css("display","none");
         $("#loginform").css("display","none");
         $("#newdetails").css("display" , "none");

}
//#endregion Data

    

//#region search
let items=[];

$("#word1").keyup(async function() {
    let word = $(this).val();
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);
    let finalresult = await x.json();
    items = Object.values(finalresult)[0];
    displaySearch();
});


$("#letter1").keyup(async function() {
    let letter = $(this).val();
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let finalresult = await x.json();
    items = Object.values(finalresult)[0];
    displaySearch();
});


function displaySearch ()
{
    var cartoona =``;
for (var i = 0; i < items.length; i++) 
{
    cartoona += 
    `
   
    <div class="col-md-3" style="cursor: pointer;">
    <div  class="meal searchedData position-relative overflow-hidden rounded-2 cursor-pointer" id="${items[i].idMeal}" >
    <img class="w-100" src="${items[i].strMealThumb}" alt="" srcset="">
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${items[i].strMeal}</h3>
    </div>
    </div>
    </div>    
    `
}
    document.getElementById('searchWithFirstLetter').innerHTML=cartoona;
    var mealItems2 = document.getElementsByClassName('searchedData');
    for (var i = 0; i < mealItems2.length; i++) {
      mealItems2[i].addEventListener('click', function() {
        var mealId2 = this.getAttribute('id');
        showFoodDetails(mealId2);
      });
    }
    
}


$("#search").click(function()
    {
        $("#searchData").css("display" , "block")
        $("#side_bar").animate({left:-sideBar} ,500);
        $("#mover").removeClass("active");
        $("#foodData").css("display" , "none");
        $("#categoriesdataa").css("display","none");
        $("#areaSection").css("display","none");
         $("#ingredientsSection").css("display","none");
         $("#loginform").css("display","none");
         $("#newdetails").css("display" , "none");
         $("#foodDetails").css("display" , "none");

    }



);


//#endregion search



//#region categories
let categoriesData = []
async function  getCategory() 
{
   let cat = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let catResult = await cat.json();
    console.log(catResult);
	categoriesData = Object.values(catResult)[0];
    displayCategorie();
}


function displayCategorie ()
{
var cartoona =``;
for (var i = 0; i < categoriesData.length; i++) 
{
    cartoona += 
    `
    <div class="col-md-3 gettingCat" id="${categoriesData[i].strCategory}"  style="cursor: pointer;">
    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${categoriesData[i].strCategoryThumb}" alt="" srcset=""  >
    <div class="meal-layer position-absolute text-center text-black p-2">
        <h3>${categoriesData[i].strCategory}</h3>
        <p class="overflow-hidden">${categoriesData[i].strCategoryDescription}</p>
    </div>
    </div>
    </div>    
    `
}
    document.getElementById('catsD').innerHTML=cartoona;
    var catItems = document.getElementsByClassName('gettingCat');
  for (var i = 0; i < catItems.length; i++) {
    catItems[i].addEventListener('click', function() {
      var catId = this.getAttribute('id');
      showIngradientsetails(catId);

    });
  }

}

$("#categories").click(function () 
{ 
    getCategory();
    $("#categoriesdataa").css("display" , "block")
    $("#searchData").css("display" , "none")
    $("#side_bar").animate({left:-sideBar} ,500);
    $("#mover").removeClass("active");
    $("#foodData").css("display" , "none");
    $("#areaSection").css("display","none");
     $("#ingredientsSection").css("display","none");
     $("#loginform").css("display","none");
     $("#foodDetails").css("display","none");
     $("#newdetails").css("display" , "none");


     getCategory();

});

// #endregion categories


//#region area
let areaData = []
async function  getArea() 
{
   let area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   let areaResult = await area.json();
    console.log(areaResult);
	areaData = Object.values(areaResult)[0];
    displayArea();
}

function displayArea ()
{
var cartoona =``;
for (var i = 0; i < areaData.length; i++) 
{
    cartoona += 
    `
    <div class="rounded-2 text-center col-md-3" style="cursor: pointer;">
    <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
    <p class="text-white">${areaData[i].strArea}</p>
    </div>
  
    `
}
    document.getElementById('areaData2').innerHTML=cartoona;

}

$("#areaButton").click(function()
    {
        getArea();
        $("#areaSection").css("display","block");
        $("#categoriesdataa").css("display","none");
        $("#searchData").css("display" , "none")
        $("#side_bar").animate({left:-sideBar} ,500);
        $("#mover").removeClass("active");
        $("#foodData").css("display" , "none");
         $("#ingredientsSection").css("display","none");
         $("#loginform").css("display","none")
         $("#foodDetails").css("display","none")
         $("#newdetails").css("display" , "none")


    }



);



 //#endregion area



 //#region Ingradient

$("#ingrediantButton").click(function(){
    getIngradients();
    $("#ingredientsSection").css("display","block");
    $("#areaSection").css("display","none");
    $("#categoriesdataa").css("display","none");
    $("#searchData").css("display" , "none")
    $("#side_bar").animate({left:-sideBar} ,500);
    $("#mover").removeClass("active");
    $("#foodData").css("display" , "none");
     $("#loginform").css("display","none")
     $("#foodDetails").css("display","none")


});

let ingradientItems = []

async function getIngradients()
{
    let ing = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingResult = await ing.json();
    ingradientItems = Object.values(ingResult)[0];
    displayIngardients();
}

function displayIngardients ()
{
let ingCartoona = ``
for (let i = 0; i < 20; i++)
{
   ingCartoona+= `
     <div class="col-md-3 text-white">
                <div class="rounded-2 text-center ingItem" id="${ingradientItems[i].strIngredient}" style="cursor:pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h5>${ingradientItems[i].strIngredient}</h5>
                        <p>${ingradientItems[i].strDescription.split('.').slice(0, 1)}</p>
                </div>
            </div>
   ` 
   document.getElementById('ingredientData').innerHTML=ingCartoona

   var ingItems = document.getElementsByClassName('ingItem');
   for (var index = 0; index < ingItems.length; index++) {
    ingItems[index].addEventListener('click', function() {
      var inId = this.getAttribute('id');
      showIngradientsetails(inId);
    });
  }
}



}

async function showIngradientsetails(inID) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inID}`);
    var data = await response.json();
    var ing = Object.values(data)[0];

    var cartoonax =``
    for (var i = 0 ; i<ing.length; i++)
    {
        cartoonax += `

        
        <div class="col-md-3" style="cursor: pointer;">
        <div  class="meal ingDetailedData position-relative overflow-hidden rounded-2 cursor-pointer" id="${ing[i].idMeal}" >
        <img class="w-100" src="${ing[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${ing[i].strMeal}</h3>
        </div>
        </div>
        </div> 
      
        `
    }
     
    document.getElementById('dddddd').innerHTML=cartoonax;
    $("#newdetails").css("display" , "block")
    $("#ingredientDatanew").css("display" ,"block")
    $("#foodDetails").css("display" , "none");
    $("#searchData").css("display" , "none")
        $("#side_bar").animate({left:-sideBar} ,500);
        $("#mover").removeClass("active");
        $("#foodData").css("display" , "none");
        $("#categoriesdataa").css("display","none");
        $("#areaSection").css("display","none");
         $("#ingredientsSection").css("display","none");
         $("#loginform").css("display","none")
    var mealItems2 = document.getElementsByClassName('ingDetailedData');
    for (var i = 0; i < mealItems2.length; i++) {
      mealItems2[i].addEventListener('click', function() {
        var mealId2 = this.getAttribute('id');
        showFoodDetails(mealId2);
      });
    }
    
}

 
 //#endregion ingradient



getFood();


});




  
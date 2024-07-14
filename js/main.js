/// <reference types="../js/@types/jquery" />




// (meals section) //
let APIData = []
async function getMeals() {
    let APIData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let result = await APIData.json()
    displayMeals(result)
}


function displayMeals(result) {
    let box = ''
    if (result.meals) {
        for (let i = 0; i < result.meals.length; i++) {
            box += `


             <div class="col-md-3 my-2 item3" id="card"   myCode=${result.meals[i].idMeal}>
                        <img class="rounded-3" src="${result.meals[i].strMealThumb}" alt="${result.meals[i].strMeal}">
                        <div class="overlay rounded-3">
                            <h3 class="mt-5 ms-2">${result.meals[i].strMeal}</h3>
                        </div>
                    </div>

            `
        }
    }
    document.getElementById('display').innerHTML = box
}

getMeals()




$('.openNav').on('click', function () {
    let navWidth = $('.nav').width()
    $('.navBar').animate({ left: 0 })
})


$('.closeBtn').on('click', function () {
    let navWidth = $('.nav').width()
    $('.navBar').animate({ left: -navWidth })
})




// (mealDetails details) //
let apiDataTwo = []
let DefMealId = '52977'

async function getItemDetails(mealId) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    apiDataTwo = await resp.json()
    console.log(apiDataTwo)
    displayItem(apiDataTwo)
}
getItemDetails(DefMealId)

function displayItem(apiDataTwo) {
    let box = ''
    if (apiDataTwo.meals) {
        for (let i = 0; i < apiDataTwo.meals.length; i++) {
            box += `
                <div class="col-md-4 mt-5">
                    <img id="myMealImg" src="${apiDataTwo.meals[i].strMealThumb}" alt="" class="rounded-2">
                    <h3 id="myMealName">${apiDataTwo.meals[i].strMeal}</h3>
                </div>
                <div class="col-md-8 mt-5">
                    <h3>Instructions</h3>
                    <p id="myMealDetails">${apiDataTwo.meals[i].strInstructions}</p>
                    <h3 id="myMealArea">Area: <span>${apiDataTwo.meals[i].strArea}</span></h3>
                    <h3>Category: <span id="myMealCategory">${apiDataTwo.meals[i].strCategory}</span></h3>
                    <h3>Recipes:</h3>
                    <ul id="myMealRecipes" class="list-unstyled d-flex g-3 flex-wrap">
                        ${[...Array(7).keys()].map(j => `
                            <li class="alert alert-info m-2 p-1">${apiDataTwo.meals[i][`strMeasure${j + 1}`]} <span>${apiDataTwo.meals[i][`strIngredient${j + 1}`]}</span></li>
                        `).join('')}
                        <li class="alert alert-info m-2 p-1">1/2 tsp Thyme</li>
                        <li class="alert alert-info m-2 p-1">1/4 tsp Black Pepper</li>
                        <li class="alert alert-info m-2 p-1">1/4 tsp Red Pepper Flakes</li>
                        <li class="alert alert-info m-2 p-1">4 cups Vegetable Stock</li>
                        <li class="alert alert-info m-2 p-1">1 cup Water</li>
                        <li class="alert alert-info m-2 p-1">Pinch Sea Salt</li>
                    </ul>
                    <h3>Tag:</h3>
                    <ul id="myMealTag" class="list-unstyled d-flex g-3 flex-wrap">
                        <li class="alert alert-danger m-2 p-1">${apiDataTwo.meals[i].strTags}</li>
                    </ul>
                    <a id="myMealSource" target="_blank"
                        href="${apiDataTwo.meals[i].strSource}" class="btn btn-success">Source</a>
                    <a id="myMealYoutube" target="_blank" href="${apiDataTwo.meals[i].strYoutube}"
                        class="btn btn-danger">Youtube</a>
                </div>
            `
        }
    }
    document.getElementById('mealDisplay').innerHTML = box
}


$('.meal').css('display', 'none')
$('#search').css('display', 'none')
$('.category').css('display', 'none')
$('.fByCategory').css('display', 'none')

$(document).on('click', '.item3', function () {
    console.log($(this).attr('myCode'))
    idNew = $(this).attr('myCode')
    getItemDetails(idNew)
    $('.meals').css('display', 'none')
    $('.meal').css('display', 'block')
})

$('#closeIcon').on('click', function () {
    $('.meal').css('display', 'none')
    $('.meals').css('display', 'block')
})


// (search section ) //
let apiDataThree = []
let DefLetter = 'a'

async function getByLetter(letter) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    apiDataThree = await resp.json()
    console.log(apiDataThree)
    displayMeals(apiDataThree)
}
getByLetter(DefLetter);


$('.navSearch').on('click', function () {
    $('.fByCategory').css('display', 'none')
    $('.meal').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meals').css('display', 'none')
    $('#category').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('#search').css('display', 'block')
    $('.contactUs').css('display', 'none')
    let navWidth = $('.nav').width()
    $('.navBar').animate({ left: -navWidth })
});

$('.firstLetter').on('keyup', function () {
    let searchValue = $(this).val()
    console.log(searchValue)
    if (searchValue) {
        DefLetter = searchValue
        getByLetter(DefLetter)
        $('.meals').css('display', 'block')
    }
});



let apiDataFour = []
let DefName = 'name'

async function getByName(name) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    apiDataFour = await resp.json()
    console.log(apiDataFour)
    displayMeals(apiDataFour)
}
getByName(DefName)


$('.byName').on('keyup', function () {
    let searchValue = $(this).val()
    console.log(searchValue)
    if (searchValue) {
        DefName = searchValue
        getByName(DefName)
        $('.meals').css('display', 'block')
    }
})



// (category section ) //
let apiDataFive = []

async function getByCategory() {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    apiDataFive = await resp.json()
    console.log(apiDataFive)
    displayByCategory(apiDataFive)
}
getByCategory()



function displayByCategory(apiDataFive) {
    let box = ''
    if (apiDataFive.categories) {
        for (let i = 0; i < apiDataFive.categories.length; i++) {
            box += `


             <div class="col-md-3 my-2 item"    myCode=${apiDataFive.categories[i].idCategory}>
                        <img class="rounded-3" src="${apiDataFive.categories[i].strCategoryThumb}" alt="${apiDataFive.categories[i].strCategoryThumb}">
                        <div class="overlay2 rounded-3">
                            <h3 class="mt-1 text-center">${apiDataFive.categories[i].strCategory}</h3>
                            <p class=" ms-1 text-center">${apiDataFive.categories[i].strCategoryDescription}</p>
                        </div>
                    </div>

            `
        }
    }
    document.getElementById('displayCategory').innerHTML = box
}

getByCategory()



$('#category').css('display', 'none')

$('.navCategories').on('click', function () {
    $('#category').css('display', 'block')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'none')
    $('.contactUs').css('display', 'none')
    let navWidth = $('.nav').width()
    $('.navBar').animate({ left: -navWidth })
})






//(filter by category)


let apiDataSix = []
let deCategory

async function getFilterCategory() {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${deCategory}`)
    apiDataSix = await resp.json()
    console.log(apiDataSix)
    displayFilterCategory(apiDataSix)
}

function displayFilterCategory(apiDataSix) {
    let box = ''
    if (apiDataSix.meals) {
        for (let i = 0; i < apiDataSix.meals.length && i < 20; i++) {
            box += `
                <div class="col-md-3 my-2 item2"  myCode="${apiDataSix.meals[i].idMeal}">
                    <img class="rounded-3" src="${apiDataSix.meals[i].strMealThumb}" alt="${apiDataSix.meals[i].strMeal}">
                    <div class="overlay3 rounded-3">
                        <h3 class="mt-5 ms-2">${apiDataSix.meals[i].strMeal}</h3>
                    </div>
                </div>
            `
        }
    }
    document.getElementById('displayFCategory').innerHTML = box
}

$('.fByCategory').css('display', 'none')

$(document).on('click', '.item', function () {
    const categoryName = $(this).find('h3').text()
    console.log(categoryName)
    deCategory = categoryName
    getFilterCategory()
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'block')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'none')
    $('.contactUs').css('display', 'none')
})




//(meal details for filter category meals )

$(document).on('click', '.item2', function () {
    let idNew = $(this).attr('myCode')
    console.log(idNew)
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'block')
    $('.contactUs').css('display', 'none')
    getItemDetails(idNew)
})



//(area section) //

let apiDataSeven = []

async function getArea(list) {

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${list}`)

    apiDataSeven = await resp.json()
    console.log(apiDataSeven)
    displayArea(apiDataSeven)

}

function displayArea(apiDataSeven) {
    let box = ''
    if (apiDataSeven.meals) {
        apiDataSeven.meals.forEach(meal => {
            box += `
                <div class="col-md-3 my-2 item4">
                    <i class="fa-solid fa-house-laptop fa-4x  text-center"></i>
                    <h3 class=" text-center">${meal.strArea}</h3>
                </div>
            `
        });
    }
    document.getElementById('displayArea').innerHTML = box
}

getArea()



$('.area').css('display', 'none')
$('.navArea').on('click', function () {
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'block')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'none')
    $('.contactUs').css('display', 'none')
    let navWidth = $('.nav').width()
    $('.navBar').animate({ left: -navWidth })
})




// (section area meals) //

let apiDataEight = []

async function getAreaMeals(country) {

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    apiDataEight = await resp.json()
    console.log(apiDataEight)
    displayAreaMeals(apiDataEight)

}

function displayAreaMeals(apiDataEight) {
    let box = ''
    if (apiDataEight.meals) {
        for (let i = 0; i < apiDataEight.meals.length && i < 20; i++) {
            box += `
                <div class="col-md-3 my-2 item5" myCode="${apiDataEight.meals[i].idMeal}">
                    <img class="rounded-3" src="${apiDataEight.meals[i].strMealThumb}" alt="${apiDataEight.meals[i].strMeal}">
                    <div class="overlay4 rounded-3">
                        <h3 class="mt-5 ms-2">${apiDataEight.meals[i].strMeal}</h3>
                    </div>
                </div>
            `
        }
    }
    document.getElementById('displayAreaMeals').innerHTML = box
}



$('.IngredientsMeals').css('display', 'none')

$(document).on('click', '.item4', function () {
    const areaName = $(this).find('h3').text()
    console.log(areaName)
    getAreaMeals(areaName)
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'block')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'none')
    $('.contactUs').css('display', 'none')
})

$(document).on('click', '.item5', function () {
    let idNew2 = $(this).attr('myCode')
    console.log(idNew2)
    getItemDetails(idNew2)
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'block')
    $('.contactUs').css('display', 'none')


})





// (type of Ingredients section) //

let apiDataNine = []

async function getIngredients(list) {

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${list}`)

    apiDataNine = await resp.json()
    console.log(apiDataNine)
    displayIngredients(apiDataNine)

}

function displayIngredients(apiDataNine) {
    let box = ''
    if (apiDataNine.meals) {

        const numMeals = Math.min(apiDataNine.meals.length, 20)
        for (let i = 0; i < numMeals; i++) {
            const meal = apiDataNine.meals[i]
            box += `
                <div class="col-md-3 my-2 item6">
                    <i class="fa-solid fa-house-laptop fa-4x  text-center"></i>
                    <h3 class=" text-center">${meal.strIngredient}</h3>
                    <p class="text-center">${meal.strDescription}</p>
                </div>
            `
        }
    }
    document.getElementById('displayIngredients').innerHTML = box
}

getIngredients()


$('.Ingredients').css('display', 'none')
$('.navIngredients').on('click', function () {
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'block')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'none')
    $('.contactUs').css('display', 'none')
    let navWidth = $('.nav').width()
    $('.navBar').animate({ left: -navWidth })
})



// (mealsIngredients section) //

let apiDataTeen = []

async function getIngredientsMeals(Ingredients) {

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    apiDataTeen = await resp.json()
    console.log(apiDataTeen)
    displayIngredientsMeals(apiDataTeen)

}


function displayIngredientsMeals(apiDataTeen) {
    let box = ''
    if (apiDataTeen.meals) {
        for (let i = 0; i < apiDataTeen.meals.length; i++) {
            box += `
                <div class="col-md-3 my-2 item7 w-25" myCode="${apiDataTeen.meals[i].idMeal}">
                    <img class="rounded-3" src="${apiDataTeen.meals[i].strMealThumb}" alt="${apiDataTeen.meals[i].strMeal}">
                    <div class="overlay5 rounded-3">
                        <h3 class="mt-5 ms-2">${apiDataTeen.meals[i].strMeal}</h3>
                    </div>
                </div>
            `
        }
    }
    document.getElementById('ingredientsMeals').innerHTML = box
}




$('.IngredientsMeals').css('display', 'none')
$(document).on('click', '.item6', function () {
    const ingredientName = $(this).find('h3').text()
    console.log(ingredientName)
    getIngredientsMeals(ingredientName)
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'block')
    $('.meal').css('display', 'none')
    $('.contactUs').css('display', 'none')
})





$(document).on('click', '.item7', function () {
    let idNew3 = $(this).attr('myCode')
    console.log(idNew3)
    getItemDetails(idNew3)
    $('.contactUs').css('display', 'none')
    $('#search').css('display', 'none')
    $('.category').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.meal').css('display', 'block')

})


// (contact us ) //

document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const repasswordInput = document.getElementById('repassword');
    const submitButton = document.getElementById('submitButton');


    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ageRegex = /^\d{1,2}$/;


    function validateInput(input, regex, errorElement) {
        if (!regex.test(input.value.trim())) {
            input.classList.add('is-invalid')
            errorElement.textContent = 'Please enter a valid input.'
            return false
        } else {
            input.classList.remove('is-invalid')
            errorElement.textContent = ''
            return true
        }
    }


    nameInput.addEventListener('keyup', function () {
        validateInput(nameInput, nameRegex, document.getElementById('nameError'))
        toggleSubmitButton()
    })

    phoneInput.addEventListener('keyup', function () {
        validateInput(phoneInput, phoneRegex, document.getElementById('phoneError'))
        toggleSubmitButton()
    })

    passwordInput.addEventListener('keyup', function () {
        validateInput(passwordInput, passwordRegex, document.getElementById('passwordError'))
        toggleSubmitButton()
    })

    emailInput.addEventListener('keyup', function () {
        validateInput(emailInput, emailRegex, document.getElementById('emailError'))
        toggleSubmitButton();
    })

    ageInput.addEventListener('keyup', function () {
        validateInput(ageInput, ageRegex, document.getElementById('ageError'))
        toggleSubmitButton();
    })

    repasswordInput.addEventListener('keyup', function () {
        const repasswordError = document.getElementById('repasswordError')
        if (repasswordInput.value !== passwordInput.value) {
            repasswordInput.classList.add('is-invalid')
            repasswordError.textContent = 'Passwords do not match.'
        } else {
            repasswordInput.classList.remove('is-invalid')
            repasswordError.textContent = ''
        }
        toggleSubmitButton()
    })


    function toggleSubmitButton() {
        if (validateInput(nameInput, nameRegex, document.getElementById('nameError')) &&
            validateInput(phoneInput, phoneRegex, document.getElementById('phoneError')) &&
            validateInput(passwordInput, passwordRegex, document.getElementById('passwordError')) &&
            validateInput(emailInput, emailRegex, document.getElementById('emailError')) &&
            validateInput(ageInput, ageRegex, document.getElementById('ageError')) &&
            repasswordInput.value === passwordInput.value) {
            submitButton.removeAttribute('disabled')
        } else {
            submitButton.setAttribute('disabled', 'disabled')
        }
    }
})



$('.contactUs').css('display', 'none')
$('.navContactUs').on('click', function () {
    $('#category').css('display', 'none')
    $('.meals').css('display', 'none')
    $('.fByCategory').css('display', 'none')
    $('#search').css('display', 'none')
    $('.area').css('display', 'none')
    $('.areaMeals').css('display', 'none')
    $('.Ingredients').css('display', 'none')
    $('.IngredientsMeals').css('display', 'none')
    $('.meal').css('display', 'none')
    $('.contactUs').css('display', 'block')
    let navWidth = $('.nav').width()
    $('.navBar').animate({ left: -navWidth })
})



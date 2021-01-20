// write your code here
const ramenMenu = document.querySelector("#ramen-menu")
const imgDetail = document.querySelector(".detail-image")
const ramenName = document.querySelector("h2.name")
const ramenRestaurant = document.querySelector("h3.restaurant")
const ramenRating = document.querySelector("#rating")
const ramenComment = document.querySelector("textarea#comment")

/***** Get all ramens */

function renderRamen(ramenObj){

    const ramenImg = document.createElement("img")
    ramenImg.src = ramenObj.image
    ramenImg.dataset.id = ramenObj.id

    ramenMenu.append(ramenImg)

}

function getAllRamens(){
    fetch('http://localhost:3000/ramens')
        .then(response => response.json())
        .then((ramenArray) => {
        ramenArray.forEach((ramenObj) => {
        renderRamen(ramenObj)
        })
    })
}

getAllRamens()


/***********Get ramen by ID */

function renderRamenInfo(ramenObj) {

    imgDetail.src =ramenObj.image
    ramenName.textContent = ramenObj.name 
    ramenRestaurant.textContent = ramenObj.restaurant 
    ramenRating.value = ramenObj.rating 
    ramenComment.textContent = ramenObj.comment 
}

ramenMenu.addEventListener("click", event => {

    const id = event.target.dataset.id

    fetch(`http://localhost:3000/ramens/${id}`)
    .then(response => response.json())
    .then(ramenObj => {
          renderRamenInfo(ramenObj)
        
    })
})
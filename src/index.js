// write your code here
const ramenMenu = document.querySelector("#ramen-menu")
const ramenRating = document.querySelector("#rating")
const ramenComment = document.querySelector("textarea#comment")
const ramenEditForm = document.querySelector("#ramen-rating")

/***** Get all ramens */

function renderRamen(ramenObj){

    const div = document.createElement("div")
    const ramenImg = document.createElement("img")
    ramenImg.src = ramenObj.image
    ramenImg.dataset.raamenId = ramenObj.id
// debugger
    div.append(ramenImg)
    ramenMenu.append(div)

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

    const imgDetail = document.querySelector(".detail-image")
    imgDetail.src =ramenObj.image

    ramenEditForm.dataset.raamenId = ramenObj.id

    const ramenName = document.querySelector("h2.name")
    ramenName.textContent = ramenObj.name

    const ramenRestaurant = document.querySelector("h3.restaurant")
    ramenRestaurant.textContent = ramenObj.restaurant 

    ramenRating.value = ramenObj.rating
    ramenComment.value = ramenObj.comment 

    
}

ramenMenu.addEventListener("click", event => {

    const id = event.target.dataset.raamenId

   getRamenById(id)
})

function getRamenById(id) {
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(response => response.json())
    .then(ramenObj => {
          renderRamenInfo(ramenObj)
        
    })
}

/**** Edit ramen form*/
ramenEditForm.addEventListener("submit", event => {
        event.preventDefault()
        
    const id = event.target.dataset.raamenId
 
    const newRating = {
        rating: parseInt(ramenRating.value),
        comment: ramenComment.value
    }
    updateRamen(id, newRating)
})

function updateRamen(id, newRating){

    fetch(`http://localhost:3000/ramens/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newRating)
      })
      .then(response => response.json())
      .then(data => console.log(data))
}


let ramenName = document.querySelector(".name")
let detailImg = document.querySelector(".detail-image")
let ramenMenu = document.querySelector("#ramen-menu")
let ramenComment = document.querySelector("#comment-display")
let ramenRestaurant = document.querySelector('.restaurant')
let ratingDisplay = document.querySelector('#rating-display')
let ramenForm = document.querySelector("#new-ramen")

document.addEventListener('DOMContentLoaded', () => {
   fetch("http://localhost:3000/ramens")
        .then((res) => res.json())
        .then((data) =>
        {data.forEach(function (ramen) {
        })
        renderRamen(data)
    })
})

ramenForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let ramen = {}
    ramen = {
        name : e.target.name.value,
        restaurant : e.target.restaurant.value,
        image : e.target.image.value,
        rating : e.target.rating.value,
        comment : e.target["new-comment"].value
    }
    postRamen(ramen)
    renderRamen([ramen])
})

function renderRamen(ramens){
   ramens.forEach(function(ramen){
    let newRamen = document.createElement('img')
        newRamen.src = ramen.image;

        newRamen.addEventListener('click', () => {
            detailImg.src = ramen.image
            ratingDisplay.textContent = `${ramen.rating}`
            ramenComment.textContent = ramen.comment
            ramenRestaurant.textContent = ramen.restaurant
            ramenName.textContent = ramen.name
        })
        ramenMenu.append(newRamen)
   })
}

function postRamen(ramen){
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "content-type": "Application/json",
        },
        body: JSON.stringify(ramen),
    })
        .then((res) => res.json())
        .then((data) => renderRamen([data]))
        .catch(function(error) {
            console.log(" OHHH NOOOOOOOO, anyways heres the error,",error)
        })
}

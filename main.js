const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInfo = document.querySelector("[data-search]")

// loop through json by creating an object
let users = []

// Update search bar to show results
searchInfo.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
   
})

// pull data from API and add it to JS file
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            header.textContent = user.username
            body.textContent = user.email
            // body.textContent = user.name
            userCardContainer.append(card)   
            return {name: user.name, email: user.email, address: user.address, element: card}  
        })
    })



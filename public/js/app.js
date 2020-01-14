console.log("Welcome to the client side javascript code")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')
//message.textContent = 'From javaScript'
const message1 = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e) =>{
    message.textContent = 'Loading......'
    e.preventDefault()
    const location = search.value
    console.log(location)
    fetch('http://localhost:3000/weather?address=' + location)
.then((response) =>{
  response.json().then((data) =>{
      if (data.error) {
          
          message.textContent = data.error
      } else {
        message.textContent = data.place
        message1.textContent =  data.weather
      }
  })
})
})
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// routes setting
app.get('/', (req, res) => {
  res.send('index.html')
})
app.get('/portfolio', (req, res) => {
    res.send('portfolio.html')
})
app.get('/contact', (req, res) => {
    res.send('contact.html')
})
app.get('/about', (req, res) => {
    res.send('about.html')
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
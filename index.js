const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Chicken World!')
})

app.listen(4242, () => console.log('Express server is running'))

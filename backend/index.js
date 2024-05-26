const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 8080
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Bhagwat!')
})
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/company', require('./routes/company'))
app.use('/api/edit', require('./routes/edit'))
app.use('/api/details',require('./routes/details'))
app.use('/api/companyanalysis', require('./routes/companyanalysis')); // Correct route path



app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})

const express = require('express')
const app = express()
const port = 23333;

app.listen(port,() => {
  console.log('Listening on port ' + port)
})
app.use(express.static(__dirname + '/public'))



const express = require('express')
const app = express()
const port = 23333;

app.listen(port,() => {
  console.log(`Listening on port ${port}`)
})
app.use(express.static(__dirname + '/public'))
app.get('/get', function(req, res) {
  res.send(`<h1>Hello, ${req.query.fname} ${req.query.lname}</h1>`)
})
app.get("/ajax_data", function(req, res) {
  console.log(req.query.movie_name)
  var result = req.query.movie_name
  var words = ["我", "你", "妳", "他", "她", "它", "牠"]
  var pos
  console.log(words)
  for(i = 0; i < words.length; i++){
    pos = result.indexOf(words[i])
    if(pos != -1){
      result = result.substring(0, pos + 1) + 
          "阿嬤" + result.substring(pos + 1, result.length);
      break;
    }
  }
  res.send(result)
  //res.send("Ajax !")
})

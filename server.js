// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) =>{
  var date = req.params.date;
  var unix;
  var utc;

    // If undefined
  if(date == undefined){
    unix = Date.now()
    utc = new Date().toUTCString();
  }
    // If Unix
  else if(date.length == 13){
    unix = date * 1;
    utc = utcDate(reformat(date))
  }
    // If UTC or Invalid
  else{
    date = new Date(date)
      // If invalid
    if(date == 'Invalid Date'){
      res.json({ error : "Invalid Date" })
    }
    
    unix = date.getTime()
    utc = date.toUTCString()
  }
  
  res.json({"unix": unix, "utc": utc})
})

function reformat(date){
  var utc = new Date(date*1).toLocaleDateString("en-US");
  utc = utc.split("/")
  var year = utc.pop();
  utc.unshift(year)
  utc = utc.join("-")
  return utc
}

function utcDate(date){
  const splitDate = date.split("-");
  date = new Date(Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2]))
  return date.toUTCString();
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

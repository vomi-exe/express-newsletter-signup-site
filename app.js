const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req, res) {

  var FirstName = req.body.Fname;
  var LastName = req.body.Lname;
  var email = req.body.email;
  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields : {
        FNAME : FirstName,
        LNAME : LastName
      }
    }
  ]
  };
  var JSONData = JSON.stringify(data);
  var options = {
    url: "https://us1.api.mailchimp.com/3.0/lists/be8198d39f",
    method: "POST",
    'auth': {
      'user': process.env.VALUE,
      'pass': process.env.KEY,
    },
    body : JSONData,
  };
  request(options, function(error, responce, body) {

    if (error) {

      res.send("<h1>You failed now flee and you have an error : " + error + "</h1>");

    } else if(responce.statusCode == 200 ){

      res.sendFile(__dirname + "/success.html");

    }
    else {

      res.sendFile(__dirname + "/failure.html");

    }
  });
});

app.post("/failure" , function(req, res) {
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");

});

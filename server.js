const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,resp){
  resp.sendFile(__dirname + '/src/index.html');
});

app.listen(5000,() =>{
  console.log("Listening on 5000");
});

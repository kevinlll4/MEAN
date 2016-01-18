var express=require('express');
var app=express();
var morgan=require('morgan')
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');

mongoose.connect('mongodb://localhost/local');



app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 



//Endpoints
require('./app/rutas.js')(app);



var server=app.listen(3001,function () {
  var host = "localhost";
  var port = server.address().port;

  console.log('servidor escuchando en http://%s:%s', host, port);});
module.exports=app;
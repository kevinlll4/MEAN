var Controller=require('./controller.js');
var User=require('./models/user.js');

module.exports=function(app){

app.get('/user/all',Controller.Read);

app.put('/user/all/:todo_id',Controller.Update);

app.post('/user/all',Controller.Create);

app.delete('/user/all/:todo_id',Controller.Delete);


app.get('/',function(req,res){
console.log("Este si carga");
res.sendFile('./public/index.html');
});
 }
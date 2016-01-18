var express=require('express');
var app=express();
var mongoose=require('mongoose');
var User=require('./models/user.js')
var bodyParser=require('body-parser');
var methodOverride=require('method-override');

app.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

    
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

 




//Endpoints


app.get('/user/all',function(req,res){
User.find({},function(err,user){
	if(err) return console.log("error="+err);
	else{
           res.json(user);
            	}        
	});

});


app.get('*',function(req,res){

	res.sendFile('./public/index.html',{root:__dirname});
})

app.put('/user/all/:todo_id',function(req,res){
User.update( {_id : req.params.todo_id},
                    {$set:{nombre : req.body.nombre,apellido: req.body.apellido, username: req.body.username}}, 
                    function(err, persona) {
                        if (err)
                            res.send(err);

                // Obtine y devuelve todas las personas tras crear una de ellas
                User.find(function(err, user) {
                    if (err)
                        res.send("Ha habido un error"+err)
                    console.log("Se va a enviar "+persona)
                    res.json(user);
                });
            });
});

app.delete('/user/all/:todo_id', function(req, res) {  
    User.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if(err){
            res.send("Hay un error hdp"+err);
        }
        else{
            console.log("Usuario eliminado correctamente")
        }
        });

        User.find({},function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });

    });



app.post('/user/all',function(req,res){
 
var nombre=req.body.nombre;
var apellido=req.body.apellido;
var nick=req.body.username;
    console.log("Datos"+nombre+apellido+nick);
User.create({
	nombre:nombre,
	apellido:apellido,
	username:nick

},function(err,usr){

	if( err) console.log("Error al crear el usuario");
	else{
		console.log("Usuario creado correctamente");
	}
});

User.find({},function(err,user){
	if(err) console.log("Hay un error al buscar los usuarios");
	else{
        console.log("Los usuarios encontrados son "+user)
           res.json(user);
            	}        
	});

});


app.listen(3001);
module.exports=app;
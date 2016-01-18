var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Schemausuario=new Schema({
nombre:String,
apellido:String,
username:{type:String,requiere:true,unique:true}
});

var User=mongoose.model('User',Schemausuario);

module.exports=User;

var app=angular.module('app',[]);
app.controller('main',['$scope',function(a){



a.hola=function(){
	
		a.user={nombre:a.nombre};

		console.log(a.user);
console.log(a.nombre);

}


}]);
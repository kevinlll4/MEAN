var app = angular.module('app', []);

app.controller('main',['$scope','$http',function(a,b){
    a.items={};
    a.formData={};
    a.user={};
   a.selected = false;

   b.get('/user/all')
        .success(function(data) {
            a.user = data;

          
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
     a.Registrar=function(){
    b({
            method:'POST',
            url:'/user/all',
            data:a.formData,
            headers:{'Content-Type': 'application/json'} 
            }
            ).success(function(data,status){
            a.user=data;
        }).error(function(data){console.log("error"+data);});
        }
     

        a.Editar=function(formData){

         b.put('/user/all/' + a.formData._id, a.formData)
    .success(function(data) {
        a.formData = {}; // Borramos los datos del formulario
        b.user = data;
        console.log("LOS DATOS RECIBIDOS SON "+ data)
        a.selected = false;
      })
    .error(function(data) {
      console.log('Error: ' + data);
    });

       };
         
           a.Eliminar = function(formData) {
        b.delete('/user/all/'+a.formData._id,a.formData)
            .success(function(data) {
              a.formData={};
                a.user = data;
                a.selected=false;
               
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    
    a.selectPerson=function(us){
      a.formData=us;
      a.selected=true;
        console.log(a.formData, a.selected);
    };

    }]);

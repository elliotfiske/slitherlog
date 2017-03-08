app.config(function(toastrConfig) {
   angular.extend(toastrConfig, {
      autoDismiss: false,
      timeOut: 0,
      closeButton: true,
      tapToDismiss: false,
      onclick: function() {
         debugger;
      },
   })
});

app.config(['$stateProvider', '$urlRouterProvider',
   function($stateProvider, $router) {

      //redirect to home if path is not matched
      $router.otherwise("/");

      $stateProvider
      .state('home',  {
         url: '/',
         templateUrl: 'Home/home.template.html',
         controller: 'homeController',
      });
   }]);

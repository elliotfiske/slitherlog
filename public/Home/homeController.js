app.controller('homeController', ['$scope', '$state', '$rootScope', 'api', 'toasterror', function(scope, $state, $rootScope, API, toastr) {
   $rootScope.page = 'home';

   // Get courses and available courses
   API.logEntry.get().then(function(response) {
      scope.generations = [];
      response.data.forEach(function(logEntry) {
         if (scope.generations[logEntry.generation] === undefined) {
            scope.generations[logEntry.generation] = [];
         }
         scope.generations[logEntry.generation].push(logEntry);
      });
   })
   .catch(toastr.doErrorMessage(function(err) {}));;
}])

app.controller('homeController', ['$scope', '$state', '$rootScope', 'api', 'toasterror', function(scope, $state, $rootScope, API, toastr) {
   $rootScope.page = 'home';

   // Get courses and available courses
   API.logEntry.get().then(function(response) {
      scope.logEntries = response.data;
   })
   .catch(toastr.doErrorMessage(function(err) {}));;
}])

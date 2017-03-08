angular.module('mainApp')
.service('api', ['$http', '$rootScope', function($http, $rootScope) {
   function call(method, url, params) {
      return $http[method](url, params)
         .catch(function(err) {
            if (err.status === 401) {
               $rootScope.logout();
            }
            else {
               console.log(err ? "Error" + JSON.stringify(err) : "Cancelled");
            }

            throw err;
         });
   }

   function get(url, params) { return call('get', url, params); }
   function post(url, params) { return call('post', url, params); }
   function put(url, params) { return call('put', url, params); }
   function del(url, params) { return call('delete', url, params); }

   function typicalGet(baseUrl) {
      return function(identifier) {
         identifier = identifier || '';
         // Will get baseUrl if nothing is passed
         return get(baseUrl + '/' + identifier);
      }
   }
   function typicalPost(baseUrl) {
      return function(body) {
         return post(baseUrl, body);
      }
   }
   function typicalPut(baseUrl) {
      return function(identifier, body) {
         identifier = identifier || '';
         return post(baseUrl + '/' + identifier, body);
      }
   }
   function typicalDelete(baseUrl) {
      return function(identifier) {
         identifier = identifier || '';
         // Will get baseUrl if nothing is passed
         return del(baseUrl + '/' + identifier);
      }
   }

   return {
      logEntry: {
         get: typicalGet('logEntry'),
         post: typicalPost('logEntry')
      }
   }
}])

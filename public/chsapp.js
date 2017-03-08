
var app = angular.module('mainApp', [
   'ui.router',
   'ui.bootstrap',
   'ngAnimate',
   'toastr',
   'ngTagsInput'
])
.filter("attState", function(){
   var stateNames = ["Done", "Quit", "Working"];

   return function(input) {
      return stateNames[input];
   };
})
.filter('reverse', function() {
   return function(items) {
      return items.slice().reverse();
   };
})
.service('toasterror', ['toastr', function(toastr) {
   toastr.doErrorMessage = function(callback) {
      return function(err) {
         console.warn("Error! " + err);
         if (err.data.humanMessage) {
            toastr.error(err.data.humanMessage, 'Oh no!');
         }
         else {
            callback(err);
         }
      };
   };

   return toastr;
}]);

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
}

globalCache = localStorage.getObject("cache");

function getFromCache(key) {
   if (!globalCache) {
      return null;
   }

   return globalCache[key];
}

function saveToCache(key, value) {
   if (!globalCache) {
      globalCache = {};
   }

   globalCache[key] = value;

   localStorage.setObject("cache", globalCache);
}

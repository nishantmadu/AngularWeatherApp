var angularApp = angular.module('weatherApp', ['ngResource','ngRoute']);

angularApp.config(function ($routeProvider){
  $routeProvider
  .when ('/',{
    templateUrl: 'pages/current.html',
    controller: 'HomeController'
  })

  .when ('/forecast',{
    templateUrl: 'pages/forecast.html',
    controller: 'ForecastController'
  })
});


angularApp.controller("HomeController",function($resource){
  var vm=this;
  vm.getCityTemperature = function(){
    console.log(vm.cityName);
    var weatherResource = $resource('http://api.openweathermap.org/data/2.5/weather',
      {q:vm.cityName,appid:'27d43832d2a4adcb97fcbfa23db130aa'});
    vm.weather = weatherResource.get();
    vm.weather.$promise.then(function(data){
      vm.weatherResponse = data;
      vm.weatherResponse.main.temp -= 273;
      vm.weatherResponse.main.degree = Math.round(vm.weatherResponse.main.temp)
      console.log(vm.weatherResponse.main.newDate);
      console.log(vm.weatherResponse)
      console.log(vm.weatherResponse.main.dt);
    }, function(error){
      console.log(error);
    });
  };

   vm.convertDate = function(x){
     return Date(x*1000);
   };

   vm.tingu = function(x){
     return x;
   };
});

angularApp.controller("ForecastController",function($resource){
  var vm=this;
  vm.getCityForecast = function(){
    console.log(vm.cityName);
    var forecastResource = $resource('http://api.openweathermap.org/data/2.5/forecast',
      {q:vm.cityName,appid:'27d43832d2a4adcb97fcbfa23db130aa',cnt:10});
    vm.forecastResponse = forecastResource.get();

    console.log(vm.forecastResponse);
   }
   vm.newTemp = function(x){
     return Math.round(x-273);
   };

});

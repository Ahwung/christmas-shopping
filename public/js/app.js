const app = angular.module("MyApp", []);

app.controller("MyController", ["$http", function($http){

this.getWishlist = function(){
  $http({
    method: "GET",
    url: "/wishlist"
  }).then((response) => {
    this.wishlist = response.data;
  })
}

this.getWishlist();




}]) //closes controller

const app = angular.module("MyApp", []);

app.controller("MyController", ["$http", function($http){

// this.toggleComplete = function(item){
//   item.complete = !item.complete;
//
//   $http({
//     method: "PUT",
//     url: "/wishlist/" + item._id,
//     data: {
//       name: item.name,
//       recipient: item.recipient,
//       recipientCategory: item.recipientCategory,
//       price: item.price,
//       image: item.image,
//       storeName: item.storeName,
//       storeUrl: item.storeUrl,
//       priority: item.priority,
//       notes: item.notes,
//       complete: item.complete
//     }
//   }).then((response) => {
//     console.log(response.data.complete);
//     this.getWishlist();
//   })
//
// const controller = this;
//
//   $http({
//       method: "PUT",
//       url: "/wishlist/" + item._id,
//       data: {
//         name: "hello",
//         recipient: item.recipient,
//         recipientCategory: item.recipientCategory,
//         price: item.price,
//         image: item.image,
//         storeName: item.storeName,
//         storeUrl: item.storeUrl,
//         priority: item.priority,
//         notes: item.notes,
//         complete: !item.complete
//       }
//     }).then(function(response){
//       console.log(response.data);
//       controller.getWishlist();
//     })
//
// }

this.toggleComplete = function(item){
  $http({
    method: "PUT",
    url: "/wishlist/"+item._id,
    data: {complete:!item.complete}
  }).then((response) => {
    console.log(response.data);
    this.getWishlist();
  })
}


this.deleteItem = function(item){
  $http({
    method: "DELETE",
    url: "/wishlist/"+item._id
  }).then((response) => {
    this.getWishlist();
  })
}

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

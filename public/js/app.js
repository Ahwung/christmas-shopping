const app = angular.module("MyApp", []);

app.controller("MyController", ["$http", function($http){


this.changeInclude = (path) => {
        this.includePath = 'partials/' + path + '.html'
    }


this.toggleComplete = function(item){
  console.log(!item.complete);
  $http({
    method: "PUT",
    url: "/wishlist/"+item._id,
    data: {
      complete:!item.complete
    }
  }).then((response) => {
    console.log(response.data);
    this.getWishlist();
  })
}


this.createItem = function(){
  console.log(this.name);
  console.log(this.recipient);
  console.log(this.recipientCategory);
  $http({
    method: "POST",
    url: "/wishlist",
    data: {
      name: this.name,
    	recipient: this.recipient,
    	recipientCategory: this.recipientCategory,
    	price: this.price,
    	image: this.image,
    	storeName: this.storeName,
    	storeUrl: this.storeUrl,
    	priority: this.priority,
    	notes: this.notes,
    	complete: this.complete
    }
  }).then((response) => {
    console.log(response);
    this.getWishlist();
  },(error) => {
    console.log(error);
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
    console.log(this.wishlist);
    this.budgetArray = [0];
    this.paidArray = [0];
    for (var i = 0; i < this.wishlist.length; i++) {
      if (this.wishlist[i].complete) {
        this.paidArray.push(this.wishlist[i].price);
      } else {
        this.budgetArray.push(this.wishlist[i].price);
      }
    }

    this.paid = this.paidArray.reduce((a, b) => a + b);
    this.budget = this.budgetArray.reduce((a, b) => a + b);

  })
}

this.getWishlist();




}]) //closes controller

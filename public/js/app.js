const app = angular.module("MyApp", []);

app.controller("MyController", ["$http", function($http){


this.displayCreateModal = () => {
    this.displayCreateInfo = !this.displayCreateInfo
}

this.openEditModal = (item) => {
    this.displayEditInfo = !this.displayEditInfo
    this.displayEditModal(item);

}

this.displayEditModal = (item) => {
    this.item = item;


}

///////////////////
// functions
///////////////////

// filter out the category on click
this.filterCategory = function(category){
this.searchBox = category;
}

this.allCategory = function(){
this.searchBox = undefined;
}

// Calculate Budget and Paid for each recipient category
this.sumMoney = function(category, complete){

this.filteredWishlist = this.wishlist.filter((item) => {
return item.recipientCategory.toLowerCase()===category;
})

this.total = 0;
for (var i = 0; i < this.filteredWishlist.length; i++) {
if (this.filteredWishlist[i].complete === complete) {
this.total += this.filteredWishlist[i].price
}
}
return Math.round(this.total);
}


this.changeInclude = (path) => {
        this.includePath = 'partials/' + path + '.html'
    }

// Moves item from the Wishlist column to the Paid column and vice-verser
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

///////////////////
// routes
///////////////////
this.createItem = function(){

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

this.editItem = function(item){
    this.displayEditInfo = !this.displayEditInfo
    console.log(this.item.name);
    console.log(item);
  $http({
    method: "PUT",
    url: "/wishlist/"+item._id,
    data: {
        name: this.updateName,
          recipient: this.updateRecipient,
          recipientCategory: this.updateRecipientCategory,
          price: this.updatePrice,
          image: this.updateImage,
          storeName: this.updateStoreName,
          storeUrl: this.updateStoreUrl,
          priority: this.updatePriority,
          notes: this.updateNotes,
          complete: this.complete
    }
  }).then((response) => {
    console.log(response);
    this.getWishlist();
  },(error) => {
    console.log(error);
  })
}

this.getWishlist = function(){
  $http({
    method: "GET",
    url: "/wishlist"
  }).then((response) => {

    console.log(response.data);
    response.data.forEach(obj=>obj.recipientCategory=obj.recipientCategory.toLowerCase() )

    this.wishlist = response.data;
    console.log(this.wishlist);

    // Calculate total Budget and Paid
    this.budgetArray = [0];
    this.paidArray = [0];
    this.recipientCategoryArray = [];
    for (var i = 0; i < this.wishlist.length; i++) {
      if (this.wishlist[i].complete) {
        this.paidArray.push(this.wishlist[i].price);
      } else {
        this.budgetArray.push(this.wishlist[i].price);
      }

      this.recipientCategoryArray.push(this.wishlist[i].recipientCategory);
    }

    console.log(this.budgetArray);
    this.paid = this.paidArray.reduce((a, b) => a + b);
    this.budget = this.budgetArray.reduce((a, b) => a + b);

    // Create unique recipient category for table
    this.uniqueRecipientCategory = [...new Set(this.recipientCategoryArray)].sort();
    console.log(this.uniqueRecipientCategory);






  })
}

// Populate index page on load
this.getWishlist();






}]) //closes controller

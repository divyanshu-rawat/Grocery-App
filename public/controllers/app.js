angular.module('groceryListApp', ["ngRoute"])


.constant('_', window._ )

.controller("HomeController", ["$scope","GroceryService", function($scope,GroceryService) {
    $scope.appTitle = "Grocery List";

    $scope.groceryItems = GroceryService.grocery_items;
       $scope.removeItem = function (entry) {
        // console.log(entry);
        GroceryService.remove_item(entry);

    }

    $scope.markCompleted = function (entry) {

        GroceryService.mark_completed(entry);
    }


}])


.service('GroceryService', [function ($http) {

    var grocery_service = {};

    grocery_service.grocery_items = [
        
    ];

    grocery_service.save = function (entry) {

        entry.id = grocery_service.generate_id();

        console.log('id please !' + entry.id);
        grocery_service.grocery_items.push(entry);
    }

    grocery_service.generate_id = function () {

        var maxId = 0;

        if(_.isEmpty(grocery_service.grocery_items)==true)
            maxId = maxId + 1;
        else
        {
            var maxId = _.max(grocery_service.grocery_items,function (entry) { 
                 return entry.id; 
             }) ;
            maxId = maxId.id + 1;
        }
        
        return maxId;

    }

    grocery_service.find_by_id = function (id) {
        
        for(key in grocery_service.grocery_items)
        {
            if(grocery_service.grocery_items[key].id == id)
            {
                return grocery_service.grocery_items[key];
            }
        }
    }

    grocery_service.check_if_exist = function (item) {
        
      for(key in grocery_service.grocery_items)
        {
            if(grocery_service.grocery_items[key].itemName == item)
            {
                return true;
            }
        }

        return false;
    }

    grocery_service.edit = function (id_,item) {
        
      for(key in grocery_service.grocery_items)
        {
            if(grocery_service.grocery_items[key].id == id_)
            {
                grocery_service.grocery_items[key].itemName = item;
            }
        }
    }

    grocery_service.remove_item = function (entry) {
     
      var index =  grocery_service.grocery_items.indexOf(entry);

      grocery_service.grocery_items.splice(index,1);
    }

    grocery_service.mark_completed = function (entry) {
     
      var index =  grocery_service.grocery_items.indexOf(entry);

      if( grocery_service.grocery_items[index].completed == true)
      {
             grocery_service.grocery_items[index].completed = false;
      }
      else
      {
             grocery_service.grocery_items[index].completed = true;
      }
     
    }



    return grocery_service;
    
}])

.controller("GroceryListItemController", ["$scope","$routeParams","$location","GroceryService",function($scope,$routeParams,$location,GroceryService){

  
    $scope.groceryItem = { id: 0 ,completed: false, itemName: '', date: new Date()};
    $scope.save = function () {

        if($routeParams.id)
        {
             GroceryService.edit($routeParams.id,$scope.groceryItem.itemName);
        } 
        else
        {
            if( GroceryService.check_if_exist($scope.groceryItem.itemName) == false)
            {
                   GroceryService.save($scope.groceryItem); 
            }

        }

         $location.path("/");

    }
}])

.config(function($routeProvider) {
    
    $routeProvider

    .when('/', {
        templateUrl: 'views/groceryList.html',
        controller: 'HomeController'
    })
    .when('/addItem', {
        templateUrl: 'views/addingitem.html',
        controller: 'GroceryListItemController'
    })
    .when('/addItem/edit/:id', {
        templateUrl: 'views/addingitem.html',
        controller: 'GroceryListItemController'
    })
    .otherwise({ redirectTo: '/' })

})


.directive("tbgroceryitem", function(){
    return{
        restrict: "E",
        templateUrl: "views/groceryItem.html"
    }
});
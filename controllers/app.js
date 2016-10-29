/**
 * Created by Thomas on 5/28/2015.
 */
angular.module('groceryListApp', ["ngRoute"])


.constant('_',
    window._
)

.controller("HomeController", ["$scope","GroceryService", function($scope,GroceryService) {
    $scope.appTitle = "Grocery List";

    $scope.groceryItems = GroceryService.grocery_items;

       $scope.removeItem = function (entry) {
        console.log(entry);

        GroceryService.remove_item(entry);


    }


}])


.service('GroceryService', [function () {

    var grocery_service = [];

    grocery_service.grocery_items = [
        { id: 1 ,completed: true, itemName: 'milk', date: '2014-10-01'},
        { id: 2 ,completed: true, itemName: 'cookies', date: '2014-10-01'},
        { id: 3 ,completed: true, itemName: 'ice cream', date: '2014-10-02'},
        { id: 4 ,completed: true, itemName: 'potatoes', date: '2014-10-02'},
        { id: 5 ,completed: true, itemName: 'cereal', date: '2014-10-03'},
        { id: 6 ,completed: true, itemName: 'bread', date: '2014-10-03'},
        { id: 7 ,completed: true, itemName: 'eggs', date: '2014-10-04'},
        { id: 8 ,completed: true, itemName: 'tortillas', date: '2014-10-04'}
    ];

    grocery_service.save = function (entry) {

        entry.id = grocery_service.generate_id();
        grocery_service.grocery_items.push(entry);
    }

    grocery_service.generate_id = function () {

            var maxId = _.max(grocery_service.grocery_items,function (entry) { return entry.id }) ;
            maxId.id = maxId.id + 1;
            return maxId.id;

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

            // console.log(item,grocery_service.grocery_items[key].itemName);
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

    return grocery_service;
    
}])

.controller("GroceryListItemController", ["$scope","$routeParams","$location","GroceryService",function($scope,$routeParams,$location,GroceryService){

  
    $scope.groceryItem = { id: 0 ,completed: true, itemName: '', date: new Date()};
    $scope.save = function () {

        if($routeParams.id)
        {
             console.log($routeParams.id);

             GroceryService.edit($routeParams.id,$scope.groceryItem.itemName);
        } 
        else
        {
            if( GroceryService.check_if_exist($scope.groceryItem.itemName) == false)
            {
                   GroceryService.save($scope.groceryItem); 
            }

        }

         $location.path("/")

    }

 
      
     // console.log(grocery_service.generate_id);

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
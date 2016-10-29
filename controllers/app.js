/**
 * Created by Thomas on 5/28/2015.
 */
angular.module('groceryListApp', ["ngRoute"])


.constant('_',
    window._
)

.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery List";
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


    return grocery_service;
    
}])

.controller("GroceryListItemsController", ["$scope","$routeParams","$location","GroceryService",function($scope,$routeParams,$location,GroceryService){

    $scope.groceryItems = GroceryService.grocery_items;

    $scope.groceryItem = { id: 7 ,completed: true, itemName: 'cheese', date: '2014-10-04'};

    $scope.save = function () {


        GroceryService.save($scope.groceryItem);
        $location.path("/")
    }

   
     // console.log(grocery_service.generate_id);

}])

.config(function($routeProvider) {
    
    $routeProvider

    .when('/', {
        templateUrl: 'views/groceryList.html',
        controller: 'GroceryListItemsController'
    })
    .when('/addItem', {
        templateUrl: 'views/addingitem.html',
        controller: 'GroceryListItemsController'
    })
    .when('/addItem/edit/:id', {
        templateUrl: 'views/addingitem.html',
        controller: 'GroceryListItemsController'
    })
    .otherwise({ redirectTo: '/' })

})
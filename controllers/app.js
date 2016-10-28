/**
 * Created by Thomas on 5/28/2015.
 */
angular.module('groceryListApp', ["ngRoute"])

.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery List";
}])

.controller("GroceryListItemsController", ["$scope","$routeParams", function($scope,$routeParams){

    $scope.groceryItems = [
        {completed: true, itemName: 'milk', date: '2014-10-01'},
        {completed: true, itemName: 'cookies', date: '2014-10-01'},
        {completed: true, itemName: 'ice cream', date: '2014-10-02'},
        {completed: true, itemName: 'potatoes', date: '2014-10-02'},
        {completed: true, itemName: 'cereal', date: '2014-10-03'},
        {completed: true, itemName: 'bread', date: '2014-10-03'},
        {completed: true, itemName: 'eggs', date: '2014-10-04'},
        {completed: true, itemName: 'tortillas', date: '2014-10-04'}
    ]

    $scope.rp = $routeParams.id;
    

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
    .when('/addItem/:id', {
        templateUrl: 'views/addingitem.html',
        controller: 'GroceryListItemsController'
    })
    .otherwise({ redirectTo: '/' })

})
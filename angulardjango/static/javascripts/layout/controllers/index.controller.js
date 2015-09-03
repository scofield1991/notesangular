/**
 * Created by user on 01.09.15.
 */

(function() {
    'use strict';

    angular
        .module('layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject =
        ['$scope', 'Authentication', 'Posts', 'Snackbar','$cookies',];

    function IndexController($scope, Authentication, Posts, Snackbar, $cookies) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.posts = [];

        activate();

         function getAuthenticatedAccount() {
             if (!$cookies.AuthenticatedAccount) {
                 return;
             }
             return JSON.parse($cookies.AuthenticatedAccount);
         }
        function activate() {

            var user=getAuthenticatedAccount()
            console.log(user.username);

            Posts.get(user.username).then(postsSuccessFn, postsErrorFn);

            var user=getAuthenticatedAccount()
            console.log(user.username);


            $scope.$on('post.created', function(event, post) {
                vm.posts.unshift(post);
            });

            $scope.$on('post.created.error', function() {
                vm.posts.shift();
            });

            function postsSuccessFn(data,status, headers, config) {
                vm.posts = data.data;
            }

            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();
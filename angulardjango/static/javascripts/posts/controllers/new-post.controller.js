/**
 * Created by user on 01.09.15.
 */

(function() {
    'use strict';

    angular
        .module('posts.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject =
        ['$rootScope', '$scope', 'Authentication',  'Posts', '$http'];

    function NewPostController($rootScope, $scope, Authentication, Posts, $http) {
        var vm = this;
        vm.submit = submit;
        vm.c = $http.get('/api/v1/category/')
                .success(function(data) {vm.cat = data});
        vm.l = $http.get('/api/v1/labels/')
                .success(function(data) {vm.label = data});

        function submit() {
            $rootScope.$broadcast('post.created', {
                content:  vm.content,
                name: vm.name,
                labels: vm.l,
                category: vm.c,
                color: vm.color,
                author: {
                    username: Authentication.getAuthenticatedAccount().username
                }
            });
            $scope.closeThisDialog();

            Posts.create(vm.content, vm.name, vm.l, vm.c, vm.color)
            //
            //function createPostSuccessFn(data, status, headers, config) {
            //    Snackbar.show('Success! Post created.');
            //}
            //
            //function createPostErrorFn(data, status, headers, config) {
            //    $rootScope.$broadcast('post.created.error');
            //    Snackbar.error('afdasf');
            //}
        }
    }
})();
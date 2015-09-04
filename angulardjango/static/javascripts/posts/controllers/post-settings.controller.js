/**
 * Created by user on 04.09.15.
 */

(function () {
    'use strict';

    angular
        .module('posts.controllers')
        .controller('PostSettingsController', PostSettingsController);

    PostSettingsController.$inject = [
        '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar', 'Posts', '$http'
    ];

    function PostSettingsController($location, $routeParams, Authentication, Profile, Snackbar, Posts, $http) {
        var vm = this;
        var postid = $routeParams.postId.substr(0);
        console.log(postid)

        //vm.p= $http.get('/api/v1/posts/' + postid + '/')
        //        .success(function(data) {vm.data = data});
        //    console.log(vm.p)

        vm.destroy = destroy;
        vm.update = update;

        vm.c = $http.get('/api/v1/category/')
                .success(function(data) {vm.cat = data});
        vm.l = $http.get('/api/v1/labels/')
                .success(function(data) {vm.label = data});

        activate();

        function activate() {


            Posts.getinfo(postid).then(postSuccessFn, postErrorFn);

            function postSuccessFn(data, status, headers, config) {
                vm.postes = data.data;
                console.log(vm.postes.name)
            }

            function postErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('That user does not exist.');
            }
        }

        function destroy() {
            Posts.destroy(postid).then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data, success, headers, config) {
                window.location = '/';

                Snackbar.show('Your account has been deleted');
            }

            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }

        function update() {
           vm.postes.labels = [parseInt(vm.postes.labels)];
           vm.postes.category = [parseInt(vm.postes.category)];

           Posts.update(postid, vm.postes).then(postSuccessFn, postErrorFn);

            function postSuccessFn(data, status, headers, config) {
                 window.location = '/';
                //Snackbar.show('Your post has been updated.');
            }

            function postErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }

    }
})();
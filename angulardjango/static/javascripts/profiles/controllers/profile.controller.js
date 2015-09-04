/**
 * Created by user on 03.09.15.
 */

(function () {
    'use strict';

    angular
        .module('profiles.controllers')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];

    function ProfileController($location, $routeParams, Posts, Profile, Snackbar) {
        var vm = this;

        vm.profile = undefined;
        vm.posts = [];

        activate();

        function activate() {
            var username = $routeParams.username.substr(1);

            Profile.get(username).then(profileSuccessFn, profileErrorFn);
            Posts.get(username).then(postSuccessFn, postsErrorFn);

            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }

            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('That user does not exist.');
            }

            function postSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.error);
            }
        }
    }
})();
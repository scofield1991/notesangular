/**
 * Created by user on 02.09.15.
 */
(function () {
  'use strict';

  angular
    .module('category')
    .controller('CategoryController', CategoryController);

     function CategoryController( $scope, $http) {
        var vm = this;
        vm.submit = submit;
        vm.c = $http.get('/api/v1/category/')
                .success(function(data) {vm.cat = data});


/*
        function all() {
            return $http.get('/api/v1/category/')
                .success(function(data) {vm.cat = data});
        }

           /* return $http.get('/api/v1/category/')
                .success(function(data) {vm.cat = data});*/


        function submit() {
            $scope.closeThisDialog();

            return $http.post('/api/v1/category/', {
                name: vm.content,
                parent: vm.c
            });



        }
    }
})();
/*
(function() {
    'use strict';

    angular
        .module('posts.services')
        .factory('Posts', Posts);

    Posts.$unject = ['$http'];

    function Posts($http) {
        var Posts = {
            all: all,
            create: create,
            get: get
        };

        return Posts;

        function all() {
            return $http.get('/api/v1/posts/');
        }

        function create(content) {
            return $http.post('/api/v1/posts/', {
                content: content
            });
        }

        function get(username) {
            return $http.get('/api/v1/accounts' + username + '/posts/')
        }
    }
})();*/
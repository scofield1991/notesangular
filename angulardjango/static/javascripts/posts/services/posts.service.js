/**
 * Created by user on 01.09.15.
 */

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
            get: get,
            update: update,
            destroy: destroy,
            getinfo: getinfo
        };

        return Posts;

        function all() {
            return $http.get('/api/v1/posts/');
        }

        function create(content, name, labels, category, color) {
            return $http.post('/api/v1/posts/', {
                content: content,
                name: name,
                labels: [parseInt(labels)],
                category: [parseInt(category)],
                color: color
            });
        }

        function get(username) {
            return $http.get('/api/v1/accounts/' + username + '/posts/')
        }

        function getinfo(postId) {
            return $http.get('/api/v1/posts/' + postId + '/')

        }

         function destroy(postId) {
            return $http.delete('/api/v1/posts/' + postId + '/');
        }

        function update(postId, post) {
            return $http.put('/api/v1/posts/' + postId + '/', post );
        }

    }
})();

/**
 * Created by oleksandr on 30.08.15.
 */
(function() {
    'use strict';

    angular
        .module('thinkster', [
            'config',
            'routes',
            'authentication',
            'layout',
            'posts',
            'utils',
            'label',
            'category'


        ]);

    angular
        .module('routes', ['ngRoute']);

    angular
        .module('label', []);

    angular
        .module('category', []);


    angular
        .module('config', []);

    angular
        .module('thinkster')
        .run(run);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();
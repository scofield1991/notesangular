/**
 * Created by user on 02.09.15.
 */
(function() {
    'use strict';

    angular
        .module('labels.controllers')
        .controller('NewLabelController', NewLabelController);


    function NewLabelController( $scope, $http) {
        var vm = this;
        vm.submit = submit;

        function submit() {
                content: vm.content

            return $http.post('/api/v1/labels', {
                title: vm.content
            });

            $scope.closeThisDialog();

            Labels.create(vm.content).then(createLabelSuccessFn, createLabelErrorFn);

            function createLabelSuccessFn(data, status, headers, config) {
                Snackbar.show('Success! Post created.');
            }

            function createLabelErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();
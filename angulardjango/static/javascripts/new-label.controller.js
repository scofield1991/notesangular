/**
 * Created by user on 02.09.15.
 */

(function () {
  'use strict';

  angular
    .module('label')
    .controller('LabelController', LabelController);

     function LabelController( $scope, $http) {
        var vm = this;
        vm.submit = submit;

        function submit() {
                content: vm.content

            return $http.post('/api/v1/labels', {
                title: vm.content
            });

            $scope.closeThisDialog();

        }
    }
})();
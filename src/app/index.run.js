(function() {
  'use strict';

  angular
    .module('szSocialNetwork')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

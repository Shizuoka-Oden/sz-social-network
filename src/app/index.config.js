(function() {
  'use strict';

  angular
    .module('szSocialNetwork')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    OAuth.initialize('Un2zVBKGtI-g68KceqMc82HPuFA');

  }

})();

(function() {
  'use strict';

  angular
    .module('szSocialNetwork')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $mdDialog, VisService) {
    var vm = this;
    vm.vis = VisService.dataSet;

    activate();

    function activate() {
      $timeout(function() {
        angular.element('canvas').css('height', '100vh');
      }, 0);
    }
    var showAlert =  function(title, content) {
      vm.loginDisable = false;
      $mdDialog.show(
        $mdDialog.alert()
          .title(title)
          .content(content)
          .ariaLabel('Alert Dialog')
          .ok('閉じる')
      );
    };

    vm.login = function() {
      vm.loginDisable = true;
      OAuth.popup('twitter', {cache:true})
      .done(function(oauthResult) {
        oauthResult.get('/1.1/account/verify_credentials.json')
        .done(function(data) {
          var node = VisService.createNode(data.id, data.screen_name, data.profile_image_url);
          vm.vis.data.nodes.add(node);
        })
        .fail(function(err) {
          console.log(err);
          showAlert("twitterのアクセス回数制限に達しました", "ごめんなさい！しばらくしてからまた遊んでね！");
        });
      })
      .fail(function() {
        showAlert("ログイン失敗", "ごめんなさい！ログインがうまくできませんでした！");
      });

    };

  }
})();

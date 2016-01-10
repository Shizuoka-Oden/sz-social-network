(function() {
  'use strict';

  angular
    .module('szSocialNetwork')
    .service('VisService', VisService);

  /** @ngInject */
  function VisService($mdDialog, VisDataSet) {
    var dataSet = {
      data: {
        nodes: new VisDataSet([]),
        edges: new VisDataSet([])
      },
      options: {
        autoResize: true,
        height: '100%',
        width: '100%'
      },
      events: {
        click: function (params) {
          var id = params.nodes[0];
          if (id) {
            addShizuokaNodes(id);
          }
        }
      }
    };
    this.dataSet = dataSet;

    var createNode = function(id, label, imageUrl) {
      return {
        id: id,
        label: label,
        image: imageUrl,
        shape: "circularImage",
        font: { color: 'white' },
        color: 'white'
      };
    };
    this.createNode = createNode;

    function addShizuokaNodes(id) {
      OAuth.create('twitter').get("/1.1/friends/list.json?count=200&id=" + id)
      .then(function(data) {
        data.users.forEach(function(user) {
          var loc = user.location;
          if (isShizuoka(loc)) {
            try {
              var node = createNode(user.id, user.screen_name, user.profile_image_url);
              dataSet.data.nodes.add(node);
            } catch(e) {
            }
            dataSet.data.edges.add({from: id, to: user.id});
          }
        });
      }).fail(function(err) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title("twitterのアクセス回数制限に達しました")
            .content("ごめんなさい！しばらくしてからまた遊んでね！")
            .ariaLabel('Alert Dialog')
            .ok('閉じる')
        );
      });
    }

    function isShizuoka(loc) {
      loc = loc.toLocaleLowerCase();
      return loc.includes('shizuoka') ||
            loc.includes('静岡') ||
            loc.includes('しずおか') ||
            loc.includes('しぞーか') ||
            loc.includes('しぞ〜か') ||
            loc.includes('シズオカ') ||
            loc.includes('駿河')
    }
  }
})();

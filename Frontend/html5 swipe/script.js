angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [{
    front: 'http://cdn.cutestpaw.com/wp-content/uploads/2013/12/Most-Famous-Felines-034.jpg',
    back: 'http://www.doggie-diva.com/assets/images/doggles_dog_glasses.jpg',
    show: 'front'
  }, {
    front: 'http://www.mycatspace.com/wp-content/uploads/2013/08/adopting-a-cat.jpg',
    back: 'http://dogmilk.designmilk.netdna-cdn.com/images/2010/07/dog-tornado-interactive-toy.jpg',
    show: 'front'
  }, {
    front: 'http://www.bideawee.org/Media/Image/Brafton/Here-are-five-fun-ways-to-get-your-cat-more-exercise_132_365731_0_14083673_500.jpg',
    back: 'http://www.petaccessorize.com/wp-content/uploads/2013/09/Dog-Tag-Sends-Tweets-with-Your-Dogs-Activity-1.jpg',
    show: 'front'
  }, ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);

    // setTimeout(function(){ $scope.addCard() } , 300)

   
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
  $scope.cardSwipedUp = function(index) {
    $scope.cards[index].show == 'front' ? $scope.cards[index].show = 'back' : $scope.cards[index].show = 'front';
  }
  $scope.cardSwipedDown = function(index) {
    $scope.cards[index].show == 'front' ? $scope.cards[index].show = 'back' : $scope.cards[index].show = 'front';
  }
});
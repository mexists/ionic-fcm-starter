angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $http, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

  $scope.formData = {};
  $scope.send = function(){
    //FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
    //All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
    //Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
    FCMPlugin.subscribeToTopic('all');

    $http({
      method: "POST",
      dataType: 'jsonp',
      headers: {'Content-Type': 'application/json', 'Authorization': 'key=AIzaSyCmu7RXJkSsNJch9MB5ySDUbguyRBeAWm8'},
      url: "https://fcm.googleapis.com/fcm/send",
      data: JSON.stringify(
          {
            "notification":{
              "title":"Ionic 2 FCM Starter",  //Any value
              "body": $scope.formData.message,  //Any value
              "sound": "default", //If you want notification sound
              "click_action": "FCM_PLUGIN_ACTIVITY",  //Must be present for Android
              "icon": "fcm_push_icon"  //White icon Android resource
            },
            "data":{
              "param1":"value1",  //Any data to be retrieved in the notification callback
              "param2": $scope.formData.message
            },
            "to":"/topics/all", //Topic or single device
            "priority":"high", //If not set, notification won't be delivered on completely closed iOS app
            "restricted_package_name":"" //Optional. Set for application filtering
          }
        )
    }).success(function(data){
      $scope.reply = $scope.formData.message;
      alert("Success: " + JSON.stringify(data));
    }).error(function(data){
      alert("Error: " + JSON.stringify(data));
    });
  }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

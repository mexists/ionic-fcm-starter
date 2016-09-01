![alt tag](https://raw.githubusercontent.com/mexists/ionic2-fcm-starter/master/www/img/ionic-md-logo.png)
# Ionic 2 Firebase Cloud Messaging Starter
A simple cloud messaging using Ionic 2 and Firebase Cloud Messaging (FCM).
### This project is builded with:
* Ionic version 2
* NPM version 3.10.6
* NodeJS version 6.5.0
* Bower version 1.7.9
* Windows 10 environment

# Tutorial
> This section provides step-by-step on developing this project.

### Prerequisites
* NPM version 3.* and above
* NodeJS version 6.* and above
* [Google Firebase Account](https://console.firebase.google.com)

### Getting Started
- Creating your first project.

Creating project using ionic tabs starter.
```sh
C:\> ionic start ionic2-fcm-starter tabs
```
If you which to use blank template, replace `tabs` with `blank`.

* After your project finished downloading template, navigate to the project root directory.
```sh
C:\> cd ionic2-fcm-starter
C:\ionic2-fcm-starter>
```

### Installing Plugin & Project Configuration

* Installing Cordova FCM plugin

To install cordova FCM plugin. Type the following command.
```sh
C:\ionic2-fcm-starter> ionic plugin add cordova-plugin-fcm
```
* Installing JQuery

Installing Jquery using Bower.
```sh
C:\ionic2-fcm-starter> bower install jquery
```
* Installing [ngCordova](http://ngcordova.com/docs/install)

Installing [ngCordova](http://ngcordova.com/docs/install) using Bower.
```sh
C:\ionic2-fcm-starter> bower install ngCordova
```
* Add platform (Android)

Next we need to add Adnroid platform to our project. To add platform, type the following command.
```sh
C:\ionic2-fcm-starter> ionic platform add android
```

* Add/Modify code

After your plugin is installed, we need to add and modify some code in the project. From your project root directory, navigate to `www\index.html` and edit `index.html` file with the folloing code.
```sh
<!-- jQuery -->
<script src="lib/jquery/dist/jquery.min.js"></script>

<!-- ionic/angularjs js -->
<script src="lib/ionic/js/ionic.bundle.js"></script>

<!-- ngCordova plugins -->
<script src="lib/ngCordova/dist/ng-cordova.js"></script>

<!-- cordova script (this will be a 404 during development) -->
<script src="cordova.js"></script>
```
> Make sure you insert `jQuery` before `ionic.bundle.js` and `ngCordova` before `cordova.js`

Now, from your project root directory, modify `config.xml` file.
You can see at line 2, by default the code given is like this:
```sh
<widget id="com.ionicframework.ionic2fcmstarter954702" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```
Modify the `id` property to your application package namespace. In this tutorial, we will use `tech.cryptical.ionic2fcmstarter`.
```sh
<widget id="tech.cryptical.ionic2fcmstarter" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

Save all your files.

### Creating FCM project
To create Firebase Cloud Messaging project, you need to have a Firebase account. Please register if you don't have one. After finish registering account, go to [Firebase Console](https://console.firebase.google.com) to create project.

* Create new project

From the console dashboard, click `CREATE NEW PROJECT` button.

![alt tag](https://raw.githubusercontent.com/mexists/ionic2-fcm-starter/master/www/img/screenshot/image1.PNG)

Insert your project name as you desired and choose your country/reqion. Then click `CREATE PROJECT` button.

![alt tag](https://raw.githubusercontent.com/mexists/ionic2-fcm-starter/master/www/img/screenshot/image2.PNG)

In this tutorial, we will building app for android. So, choose `Add Firebase to your Android app`.

A popup modal will be shown. Insert your package name into the popup form.

![alt tag](https://raw.githubusercontent.com/mexists/ionic2-fcm-starter/master/www/img/screenshot/image3.PNG)

Leave SHA-1 blank because this field is optional. Click `ADD APP` button.

![alt tag](https://raw.githubusercontent.com/mexists/ionic2-fcm-starter/master/www/img/screenshot/image4.PNG)

A file named `google-services.json` is downloaded. Copy this file to your `project root directory` and to `platform/android` directory.

Click `CONTINUE` and click `FINISH`.

FCM project is successfully created. Whenever you have changed the project setting, please re-download then `google-services.json` file by clicking at `Project Setting -> Manage` and download your latest `google-services.json`.

* Get FCM server key

The FCM server key is requied for your apps to communicate between the app and server to send push notification. This key is available at your Firebase console project recently that you have created. To get this key, Navigate to `Project Setting -> Manage -> Cloud Messaging`

![alt tag](https://raw.githubusercontent.com/mexists/ionic2-fcm-starter/master/www/img/screenshot/image5.PNG)

![alt tag](https://raw.githubusercontent.com/mexists/ionic2-fcm-starter/master/www/img/screenshot/image6.PNG)

Copy the server key.

### Receiving Push Notification
To receive push notification, we need to inject `ngCordova` to the application module. From your project directory, navigate to `www\js\app.js` and edit `app.js` file as follows.

```sh
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])
```

* Listening to Push Notification Services

The app now need to listen and take control of incoming push notification message. To do this, and the following code inside `$ionicPlatform.ready(fn)` in `www\js\app.js` file.

```sh
//FCMPlugin.getToken( successCallback(token), errorCallback(err) );
//Keep in mind the function will return null if the token has not been established yet.
FCMPlugin.getToken(
    function (token) {
        alert('Token: ' + token);
        console.log('Token: ' + token);
    },
    function (err) {
        alert('error retrieving token: ' + token);
        console.log('error retrieving token: ' + err);
    }
);

FCMPlugin.onNotification(
    function(data){
        if(data.wasTapped){
//Notification was received on device tray and tapped by the user.
            alert("Tapped: " +  JSON.stringify(data) );
        }else{
//Notification was received in foreground. Maybe the user needs to be notified.
            alert("Not tapped: " + JSON.stringify(data) );
        }
    },
    function(msg){
        alert('onNotification callback successfully registered: ' + msg);
        console.log('onNotification callback successfully registered: ' + msg);
    },
    function(err){
        alert('Error registering onNotification callback: ' + err);
        console.log('Error registering onNotification callback: ' + err);
    }
);
```

Now your app is ready to receive push notification. You can test it on Firebase Console by navigating to `Notification` menu at the left sidebar menu. You also can test it at [https://cordova-plugin-fcm.appspot.com](https://cordova-plugin-fcm.appspot.com) by providing your FCM project's server key.

### Sending Push Notification
To send push notification, we will need to use the AngularJS `$http` provider.

Firstly, we add some text field to `www\templates\chat-detail.html`.
```sh
<ion-view view-title="{{chat.name}}">
  <ion-content class="padding">
    <img ng-src="{{chat.face}}" style="width: 64px; height: 64px">
    <p>
      {{chat.lastText}}
    </p>

    <p class="pull-right">{{reply}}</p>

    <div class="bar bar-footer">
      <input ng-model="formData.message" class="button-block" placeholder="Reply...">
      <button type="submit" ng-click="send()" class="button button-clear">Send</button>
    </div>
    
  </ion-content>
</ion-view>
```

Then navigate to `www\js\controller.js` and edit `controller.js` file. On `ChatDetailCtrl`, add the following code:

```sh
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
      alert("Success: " + JSON.stringify(data));
    }).error(function(data){
      alert("Error: " + JSON.stringify(data));
    });
  }

})
```

Notify `$http` headers parameter.
```sh
...
headers: {'Content-Type': 'application/json', 'Authorization': 'key=AIzaSyCmu7RXJkSsNJch9MB5ySDUbguyRBeAWm8'},
...
```

The key attribute is your FCM server key. Paste your own server key there.

That's it...! now get ready to compile and test your app.

### Building & Running Project
On the command prompt, type the following command to build your app.
```sh
C:\ionic2-fcm-starter> ionic build android
```
And run our app in your physical device.
```sh
C:\ionic2-fcm-starter> ionic run android
```

#### Congrats! now you can build your own chat messaging app...!


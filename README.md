#Introduction to Phonegap / Cordova

##What is Phonegap / Cordova?
- Cordova is an API that allows you to write JavaScript commands that map over to native device commands.
- Phonegap is a distribution of Cordova, and also wraps in functionality such as its build tools.

##Installation

####Build Tools
- For this class we will need to have Xcode installed with the latest command line and build tools:

```
xcode-select --install
```

- You will also need the Android SDK. You can find it [here](http://developer.android.com/sdk/).
- For compiling Android apps you will need to download and install Apache Ant.
	- Windows [click here](http://ant.apache.org/bindownload.cgi)
	- With Mac it can be installed easily with Homebrew: `brew install ant`.

####Command Line Tools
- You will need to have Cordova and the Cordova-Cli installed:

```
sudo npm install cordova -g
```

##Creating a New Project
- To create a new project we can run the `cordova create` command:

```
cordova create hello com.example.hello HelloWorld
```

- The first parameter is the folder you want to generate. The second is a reverse domain identifier, and the third is the name of the project.
- When you run this command you will see a number of folders generated for you:
	- Platforms: This folder holds information and native code for each platform you choose to target such as Android or iOS.
	- Plugins: This folder will hold all of the plugin-related code that comes in importing the plugin via the command line.
	- Www: This folder will contain all of your HTML, CSS and JavaScript project files. Eventually it will be added to each platform's appropriate folder to be included in the main app.

##Cordova.js
- In order to run any native commands via JavaScript you have to include cordova.js in your project.
- This file will not exist in your `www` directory but will be included upon build.
- Make sure to include a link to the file in your main HTML document:

```
<script src="cordova.js"></script>
```

##Cordova Plugins
- Plugins are the modules of code that allow you to write JS commands that trigger native actions.
- Most of the major native functionality is wrapped into various plugins, such as accessing the camera or pulling from the GPS.
- Let's take a look at the plugin registry to see what's available to use. It can be found [here](http://cordova.apache.org/docs/en/4.0.0/cordova_plugins_pluginapis.md.html).

##deviceready
- It is important to note that all of the Cordova plugins require the device to be ready before they can be accessed.
- Cordova provides us an event called `deviceready` that signals to our application that we can safely call Cordova commands.
- The syntax is exactly the same as any other event listener:

```
document.addEventListener("deviceready", function() {
	//Device is ready and you can use Cordova
});
```

##Building Your App
- Building the app is pretty trivial if you have all of the utilities set up.
- There are a couple of command line tools to help us with this:

```
cordova build ios
cordova build android
```

- Building for iOS will use Xcode's compiler to compile the app whereas building for Android will trigger Ant for compilation.
- If the build succeeds you should be able to now emulate the app:

```
cordova emulate ios
cordova emulate android
```

- This will attempt to open the default emulator for the build type. This works well on Android but requires additional software for iOS.
- It is recommended to work through Xcode when running and debugging iOS apps.

##Using the Device Camera
- Let's take a look at the documentation [here](http://plugins.cordova.io/#/package/org.apache.cordova.camera).
- We need to first use the Cli to install the plugin:

```
cordova plugin add org.apache.cordova.camera
```

- This plugin adds an object to the `navigator` global object called `camera` that has methods associated with it:

```
navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
```

- Here is an example from the documentation with an option and all appropriate callbacks:

```
navigator.camera.getPicture(onSuccess, onFail, {
	quality: 50,
	destinationType: Camera.DestinationType.FILE_URI 
});

function onSuccess(imageURI) {
	var image = document.getElementById('myImage');
	image.src = imageURI;
}

function onFail(message) {
	alert('Failed because: ' + message);
}
```

- There are a number of options you can set to customize the camera action to your needs:

```
{ 
	quality : 75,
	destinationType : Camera.DestinationType.DATA_URL,
	sourceType : Camera.PictureSourceType.CAMERA,
	allowEdit : true,
	encodingType: Camera.EncodingType.JPEG,
	targetWidth: 100,
	targetHeight: 100,
	popoverOptions: CameraPopoverOptions,
	saveToPhotoAlbum: false
}
```

- Specifically important are the options `Camera.DestinationType.[option]`, which can save the picture as a binary file or a Base64 encoded string, and `Camera.PictureSourceType.[option]`, which can either take a new picture or select one from the camera roll.

##Social Network Photo Exercise
- For this exercise we will use the camera API to take a picture from the photo library and place it into the starter app.
- Download the starter code from [here](social_network_starter_app/).
- The event handlers have already been created for you in photos.js.
- You will be replacing the background image of `#signup-profile-picture`.

##FileTransfer API
- The FileTransfer API allows you to upload and download files using the native device.
- This is especially useful for allowing users to upload photos from their device.
- Let's take a look at the documentation [here](http://plugins.cordova.io/#/package/org.apache.cordova.file-transfer).
- Here is our install command:

```
cordova plugin add org.apache.cordova.file-transfer
```

- This plugin offers a new constructor function `FileTransfer` that gives you methods for uploading and downloading the files.
- To use the plugin we have to create an instance of the constructor:

```
var ft = new FileTransfer();
```

- You will likely need to set a number of options to configure your file transfer:

```
var options = {
	fileKey: "file",
	fileName: "sample",
	params: { },
	mimeType: "image/jpeg"
};
```

- We can then call on the file transfer functions such as upload:

```
ft.upload(fileURL, encodeURI("url here"), success, error, options);
```

##FileTransfer Exercise: Photo Upload
- Let's take the social network app we have been working on and add a file transfer component to it.
- When a user takes or selects a photo let's use the FileTransfer API to send the file to the server.
- Make sure to submit this request on success of the add user method so you can pass along the user id.
- Here is the endpoint you will need to access:
	- `POST /members/:id/photo` -> Upload a profile photo for a member
- **Bonus:** Check out the `onprogress` event that is triggered throughout the transfer. Try to implement a simple progress bar that updates with the status of the upload.

##Accessing Device Contacts
- This API can be useful for adding contacts on behalf of users and also accessing the contact list for use in the app.
- Let's take a look at the documentation [here](http://plugins.cordova.io/#/package/org.apache.cordova.contacts).
- The contacts API appends to the `navigator` global object to apply its methods.
- The first method we will look at is the `create()` function that creates a new contact:

```
var myContact = navigator.contacts.create({"displayName": "Test User"});
```

- Try it by yourself to add a contact with a few additional fields.

##Contacts Exercise: Add to Contacts
- Let's take the social network and add a contacts component to it.
- After the AJAX save and file upload try to add the contact to the contact database on the device.
- **Bonus:** Check to see if the contact exists already on the device before saving it.

##In-App Browser
- The in-app browser is helpful for launching any kind of web session inside of your app.
- A good use of this is when you need your users to navigate to an external webpage without leaving the app.
- An example may be to allow them to view a news article.
- Another great use case for an in-app browser is for an oAuth flow.
- This is how it works:

####First we provide a reference to the window

```
var windowRef = window.open("url here", "_blank", "location=yes");
```

- `_blank` tells the app to open a new window rather than load the page inside the current view.
- `location=yes` tells the in-app browser to display the location to the end user.

####We can close the window at any time

```
windowRef.close();
```

####We can also attach event listeners to detect window-related events

```
windowRef.addEventListener("loadstop", function(event) {
	console.log(event.url);
});
```

##oAuth with Phonegap
- With native applications you can integrate with the device's installed applications such as the Facebook app.
- Phonegap currently does not have any great plugins to do this, so an in-app browser is your best bet.
- An advantage of using oAuth via an in-app browser is that you can support unlimited providers.
- This part has been done for you already, and you can see the code in signup.js.

##oAuth Flow with the In-App Browser
- Generally the oAuth flow is as follows:
	- Step 1: The app will open a new browser window and request a web service url passing a query string token and provider.
	- Step 2: The web service will store the token along with the authentication hash to the database.
	- Step 3: A request will be made to the web service passing along the token to retrieve the authentication hash.
	- Step 4: The web service will delete the token and authentication hash from the database.
- Your initial request may look like this:

```
http://daretodiscover.herokuapp.com/start_auth?token=1234&provider=facebook
```

##Geolocation
- The Geolocation API allows us to access the device's geolocation features such as the GPS and cell triangulation features.
- Let's take a look at the documentation [here](http://plugins.cordova.io/#/package/org.apache.cordova.geolocation).
- In order to use this feature we have to install the plugin:

```
cordova plugin add org.apache.cordova.geolocation
```

- This plugin also adds to the global `navigator` object to contain its methods.
- Let's take a look at the `getCurrentPosition` method:

```
navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

function onSuccess(position) {
	alert("Latitude: " + position.coords.latitude);
	alert("Longitude: " + position.coords.longitude);
}

function onError(error) {
	alert("Error Code: " + error.code);
}
```

- The options object also gives us control over a few key aspects:
	- enableHighAccuracy: Tells the application to give the best results when possible.
	- timeOut: Maximum time allotted between call to the `navigator` function and the success handler.
	- maximumAge: Accept cached position based on age of the result.

##In-Class Lab: Mapping
- In this lab we will be taking the latitude and longitude coordinates from the device and rendering a Google Map.
- For the Google Map you will need to use the Google Maps JavaScript API located [here](https://developers.google.com/maps/documentation/javascript/tutorial).
- Your mission is to give the user a button they can click on that will render a map of their current location.

##Deploying to Google Play
- In order to deploy to the Google Play store you need to first have a [developer account](http://developer.android.com/distribute/googleplay/start.html).
- Once you have that you can begin to build the app and upload it through the platform.
- There are 4 main steps to get the app on the store: build it in release mode, jarsign it, zipalign it, and submit the APK to Google Play.
- Let's take a look at the signing docs [here](http://developer.android.com/tools/publishing/app-signing.html).
- Here are the steps we will take:
	- Step 1: Build the app in release mode: `cordova build --release`
	- Step 2: Create a signing key: `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
	- Step 3: Jarsign the app: `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my_application.apk alias_name`
	- Step 4: Zipalign the app: `zipalign -v 4 your_project_name-unaligned.apk your_project_name.apk`
- When all of these processed are complete you can submit the new APK to the Google Play store through the developer console.
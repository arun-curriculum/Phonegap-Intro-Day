//Show user list

function showUserList() {
	$(".user-list-container").fadeIn(function() {
		$(".user-list-options").show();
	});
}

//Hide and show main content to make transitions more smooth

function showMainContent() {
	setTimeout(function() {
		$(".main-content-fade").fadeIn();
	}, 400);
}

//Get random token

function genRandToken() {
	return Math.random().toString(36).substr(2);
}

//Show errors in native format

function errorAlert(message) {
	navigator.notification.alert(
		message,
		null,
		'Error',
		'Done'
	);
}
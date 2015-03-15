//Add new user

$(document).on("tap", "#add-user-button", function(event) {
	event.preventDefault();

	$.ajax({
		url: endpointBase,
		type: "POST",
		data: {
			first_name: $("#new-firstname").val(),
			last_name: $("#new-lastname").val(),
			email: $("#new-email").val()
		},
		success: function() {
			$.mobile.changePage("#user-list");
		}
	});
});

//Go to signup page

$(document).on("tap", "#login-signup-button", function() {
	$.mobile.changePage("#signup1", {
		transition: "slideup"
	});
});

//Signup with Facebook

$(document).on("tap", ".signup-facebook-option", function(event) {
	event.preventDefault();

	var authId = genRandToken();

	var facebookStart = window.open(endpointBase + "?provider=facebook&token=" + authId, "_blank", "location=yes");

	facebookStart.addEventListener("loadstop", function(event) {
		var myUrl = event.url.split("?")[0];
		if (myUrl === endpointBase + "auth/facebook/callback") {
			$.ajax({
				type: "POST",
				url: endpointBase + "get_auth",
				data: {
					authId: authId
				},
				success: function(data) {
					facebookStart.close();
					
					
				},
				error: function() {
					facebookStart.close();
				}
			});
		} else if (myUrl === endpointBase + "auth/failure") {
			facebookStart.close();
		}
	});
});
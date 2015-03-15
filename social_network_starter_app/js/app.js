var endpointBase = "http://daretodiscover.herokuapp.com/members/";

//Set all transitions to slide

$.mobile.defaultPageTransition = "slide";

//Compile templates on load

var nearbyUserTemplateSource = $("#nearby-user-template").html();
var nearbyUserTemplate = Handlebars.compile(nearbyUserTemplateSource);

//Attach FastClick to remove 300 ms delay when clicking on links

$(document).ready(function() {
	FastClick.attach(document.body);
});

//Make sure all slide menus are closed on navigate

$(window).on("hashchange", function() {
	$(".user-list-container").css("left", "0");

	$(".main-content-fade").hide();
});

//Show user list page

$(document).on("pageshow", "#user-list", function() {
	$.ajax({
		url: endpointBase,
		type: "GET",
		success: function(data) {
			$("#nearby-user-list-container").html("");
			data.forEach(function(member) {
				var html = nearbyUserTemplate(member);
				$("#nearby-user-list-container").append(html);
			});

			showUserList();

			showMainContent();
		}
	});
});

$(document).on("pageshow", "#user-edit", function() {
	$.ajax({
		url: endpointBase + localStorage.getItem("user_profile_selected"),
		type: "GET",
		success: function(data) {
			$("#edit-firstname").val(data.first_name);
			$("#edit-lastname").val(data.last_name);
			$("#edit-email").val(data.email);
			$("#edit-profile-picture").attr("style", "background:url(" + data.avatar + ") no-repeat;");
		}
	});
	showMainContent();
});

//Go to user's profile from the nearby list

$(document).on("tap", ".nearby-user", function() {
	localStorage.setItem("user_profile_selected", $(this).attr("data-id"));

	$.mobile.changePage("#user-edit", {
		transition: "slide"
	});
});

$(document).on("tap", "#submit-edits-button", function(event) {
	event.preventDefault();

	$.ajax({
		url: endpointBase + localStorage.getItem("user_profile_selected"),
		type: "PUT",
		data: {
			first_name: $("#edit-firstname").val(),
			last_name: $("#edit-lastname").val(),
			email: $("#edit-email").val()
		},
		success: function() {
			$.mobile.changePage("#user-list");
		}
	});
});

$(document).on("tap", "#delete-user-button", function(event) {
	event.preventDefault();

	$.ajax({
		url: endpointBase + localStorage.getItem("user_profile_selected"),
		type: "DELETE",
		success: function() {
			$.mobile.changePage("#user-list");
		}
	});
});

//Show signup page

$(document).on("pageshow", "#signup1", function() {
	showMainContent();
});
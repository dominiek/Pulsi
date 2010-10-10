$(document).ready(function(){
	
	if(window.location.pathname != '/login.html' && !localStorage.getItem('username')){
		location.href = 'login.html';
	}
	
	if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
		$('<a href="#" onclick="setupNotification(); return false;">Allow notifications</a>').prependTo('#userinfo');
	}
	
	if($('input.clearable').length > 0){
		$('input.clearable').each(function(i, val){
			$(this).focus(function(){
				if(this.title == this.value) this.value = "";
			})
			$(this).blur(function(){
				if(this.value == ""){
					this.value = this.title;
				} 
			})
		})
	}
	
});

function setupNotification(){
	window.webkitNotifications.requestPermission();
}

function showChromeNotification(notificationText) {
	if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
		window.webkitNotifications.createNotification('', 'Plain Text Notification', notificationText).show(); 
	}  
}

function userLogin(){
	var usrName = $('#username').get(0).value;
	$.getJSON('/signin.json?username='+usrName, function(response) {
		localStorage.setItem('username', response.user.username);
		location.href = 'dashboard.html';
	});
}

function userLogout(){
	localStorage.removeItem('username');
	location.href = 'login.html';
}
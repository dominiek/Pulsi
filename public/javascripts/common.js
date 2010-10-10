$(document).ready(function(){
	
	if(window.location.pathname != '/login.html' && !localStorage.getItem('username')){
		location.href = 'login.html';
	}else if(localStorage.getItem('username')){
		$('<p class="welcome">Hello, <span id="head_username">username</span>. You\'ve got <span id="balance">$400,000</span> on your account</p>').appendTo('#userinfo');
		userInfo();
	}
	
	if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
		$('<a href="#" onclick="setupNotification(); return false;" class="allow_link">Enable notifications!</a>').appendTo('#userinfo');
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

function userInfo(){
	var usrName = localStorage.getItem('username');
	$.getJSON('/signin.json?username='+usrName, function(response) {
		$('#head_username').html(response.user.username);
		$('#balance').html('$'+response.user.balance);
	});
}

function setupNotification(){
	window.webkitNotifications.requestPermission();
}

function showChromeNotification(notificationTitle, notificationText) {
	if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
	  var notification = window.webkitNotifications.createNotification('', notificationTitle, notificationText);
	  notification.show();
	  setTimeout(function () {
	    if(notification) {
        notification.cancel();
	    }
    }, 5000); 
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
$ (document).ready(function(){

	$('.logIn').hide();
	$('#inputTopic').hide();

	var get12Topics = {
    type: 'GET',
    url: 'http://localhost:8000/topics/12random',
    dataType: 'json',
    success: function(response){
      topic = response;
      console.log(response);
      $('.content').text('');
      for (var i = 0; i < topic.length; i++) {
      	var message = topic[i].message;
      	var titles = topic[i].titles;
      	var user = topic[i].username;
      	$('.content').append('<div class="col-xs-12 col-sm-6 col-lg-4 topic">' +
      		'<div class="bld">' +
      		'<span class="singleTopic">' + titles[0] + '.' + '</span>' +
      		'<span class="singleTopic">' + titles[1] + '.' + '</span>' +
      		'<span class="singleTopic">' + titles[2] + '</span>' +
      		'</div><div class="singleUser">' + "@" + user +
      		'</div><div>' + message + '</div></div>');
      }

			var container = document.querySelector('#container');
			var msnry = new Masonry( container, {
			  // options
			  itemSelector: '.topic'
			});

   //    var $container = $('#container');
			// // initialize
			// $container.masonry({
			//   itemSelector: '.topic'
			// });
			// var msnry = $container.data('masonry');
    }
	};

	$.ajax(get12Topics);

	$(document).on('click', '#clickToInput', function(){
		$('#clickToInput').hide(1000);
    $('#inputTopic').show(1000);
	});

	$(document).on('click', '.singleTopic', function(){
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8000/topics/' + $(this).text().replace('.',''),
			datatype: 'json',
			success: function(response) {
				topic = response;
	      console.log(response);
	      $('.content').text('');
	      for (var i = 0; i < topic.length; i++) {
	      	var message = topic[i].message;
	      	var titles = topic[i].titles;
	      	var user = topic[i].username;
	      	$('.content').append('<div class="col-xs-12 col-sm-6 col-lg-4 topic">' +
	      		'<div class="bld">' +
	      		'<span class="singleTopic">' + titles[0] + '.' + '</span>' +
	      		'<span class="singleTopic">' + titles[1] + '.' + '</span>' +
	      		'<span class="singleTopic">' + titles[2] + '</span>' +
	      		'</div><div class="singleUser">' + "@" + user +
	      		'</div><div>' + message + '</div></div>');
	      }

				var container = document.querySelector('#container');
				var msnry = new Masonry( container, {
				  // options
				  itemSelector: '.topic'
				});
			}
		});
	});
	
	var getUserTopics = function(username) {
		request = {
			
			type: 'GET',
			url: 'http://localhost:8000/users/' + username + '/topics',
			datatype: 'json',
			success: function(response) {
				topic = response;
	      console.log(response);
	      $('.content').text('');
	      for (var i = 0; i < topic.length; i++) {
	      	var message = topic[i].message;
	      	var titles = topic[i].titles;
	      	var user = topic[i].username;
	      	$('.content').append('<div class="col-xs-12 col-sm-6 col-lg-4 topic">' +
	      		'<div class="bld">' +
	      		'<span class="singleTopic">' + titles[0] + '.' + '</span>' +
	      		'<span class="singleTopic">' + titles[1] + '.' + '</span>' +
	      		'<span class="singleTopic">' + titles[2] + '</span>' +
	      		'</div><div class="singleUser">' + "@" + user +
	      		'</div><div>' + message + '</div></div>');
	      }

				var container = document.querySelector('#container');
				var msnry = new Masonry( container, {
				  // options
				  itemSelector: '.topic'
				});
			}

		}
		$.ajax(request);
	}

	$(document).on('click', '.singleUser', function(){
		getUserTopics($(this).text().replace('@',''));
	});

	$(document).on('click', '#searchButton', function(){
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8000/logs/search/' + $('.search').val(),
			datatype: 'json',
			success: function(response) {
				topic = response;
				console.log(topic);
	      $('.content').text('');
				if (topic.length < 1) {
					$.ajax(get12Topics);
				} else {
		      for (var i = 0; i < topic.length; i++) {
		      	var message = topic[i].message;
		      	var titles = topic[i].titles;
		      	var user = topic[i].username;
		      	$('.content').append('<div class="col-xs-12 col-sm-6 col-lg-4 topic">' +
		      		'<div class="bld">' +
		      		'<span class="singleTopic">' + titles[0] + '.' + '</span>' +
		      		'<span class="singleTopic">' + titles[1] + '.' + '</span>' +
		      		'<span class="singleTopic">' + titles[2] + '</span>' +
		      		'</div><div class="singleUser">' + "@" + user +
		      		'</div><div>' + message + '</div></div>');
		      }
		    }

  			var container = document.querySelector('#container');
				var msnry = new Masonry( container, {
				  // options
				  itemSelector: '.topic'
				});
			}
		});
	});	
	
	$(document).on('click', '.check', function(){
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8000/authenticated',
			datatype: 'json',
	    xhrFields: {
	      withCredentials: true
	   	},
			success: function(response){
				if (response.authenticated === true) {
					console.log("authenticated");
				} else if (response.authenticated === false) {
					console.log("not authenticated");
					$('.logIn').show(1000);
					$('#inputTopic').hide(1000);
				}
			}
		})
	})

	$(document).on('click', '#post', function(){
		console.log("click");

		$.ajax({
			type: 'POST',
	    url: 'http://localhost:8000/topics',
	    data: {
	    	topic: {
	    		titles: $('.titles').val().replace('#','').replace('#','').replace('#','').split(' '),
	    		message: $('.message').val()
	    	}
	    },
	    dataType: 'json',
	    xhrFields: {
	      withCredentials: true
	   	},	    
	    success: function(response){
  			console.log(response);
    		$('#inputTopic').hide(1000);
	    	$('.click').show(1000);
	    	$.ajax(get12Topics);
      }

   //    var container = document.querySelector('#container');
			// var msnry = new Masonry( container, {
			//   // options
			//   itemSelector: '.topic'
			// });
	  })
	})

	$(document).on('click', '#signUpButton', function(){
		$.ajax({
	    type: 'POST',
	    url: 'http://localhost:8000/users',
	    data: {
	    	users: {
	    		email: $('#newEmail').val(),
	    		username: $('#newUserName').val(),
	    		password: $('#newPassword').val()
	    	}
	    },
	    dataType: 'json',
	    success: function(response){
	      $('#signInButton').on('click', function(){
					$.ajax({
				    type: 'POST',
				    url: 'http://localhost:8000/sessions',
				    data: {
				    	user: {
				    		username: $('#newUserName').val(),
				    		password: $('#newPassword').val()
				    	}
				    },
				    xhrFields: {
				      withCredentials: true
				   	},
				    dataType: 'json',
				    success: function(response){
				      $('.logIn').hide(1000);
				      console.log(response)
				    }
					});
				});
				$('.logIn').hide(1000);
		    $('#inputTopic').show(1000);
	    }
		});
	});

	$(document).on('click', '#signInButton', function(){
		$.ajax({
	    type: 'POST',
	    url: 'http://localhost:8000/sessions',
	    data: {
	    	user: {
	    		username: $('#userName').val(),
	    		password: $('#password').val()
	    	}
	    },
	    xhrFields: {
	      withCredentials: true
	   	},
	    dataType: 'json',
	    success: function(response){
	      $('.logIn').hide(1000);
        $('#inputTopic').show(1000);
	      console.log(response)
	    }
		});
	});



});
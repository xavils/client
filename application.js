$ (document).ready(function(){

	$('.logIn').hide();

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
			  columnWidth: 200,
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
				  columnWidth: 200,
				  itemSelector: '.topic'
				});
			   //    var $container = $('#container');
				// // initialize
				// $container.masonry({
				//   itemSelector: '.topic'
				// });
				// var msnry = $container.data('masonry');
				console.log(masonry)
			}
		});
	});

	$(document).on('click', '.singleUser', function(){
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8000/users/' + $(this).text().replace('@','') + '/topics',
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
				  columnWidth: 200,
				  itemSelector: '.topic'
				});
			}
		});
	});
	
	

	// $.('#post').on('click', function(){
	// 	type: 'POST',
 //    url: 'http://localhost:8000/topics',
 //    dataType: 'json',
 //    success: function(response){
 //      topic = response;
 //      console.log(response);
 //      for (var i = 0; i < topic.length; i++) {
 //      	var message = topic[i].message;
 //      	var titles = topic[i].titles;
 //      	$('.content').append('<div class="col-xs-12 col-sm-6 col-lg-4 topic">' +
 //      		'<div class="bld">' + titles[0] + titles[1] + titles[2] +
 //      		'</div><div>' + message + "</div></div>")
 //      }

 //      var $container = $('#container');
	// 		// initialize
	// 		$container.masonry({
	// 		  itemSelector: '.topic'
	// 		});
	// 		var msnry = $container.data('masonry');
 //    }
	// })

	$('#signUpButton').on('click', function(){
		$.ajax({
	    type: 'POST',
	    url: 'http://localhost:8000/signup',
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
				      $('.home').show(1000);
				      console.log(response)
				    }
					});
				});
	    }
		});
	});

	$('#signInButton').on('click', function(){
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
	      $('.home').show(1000);
	      console.log(response)
	    }
		});
	});



});
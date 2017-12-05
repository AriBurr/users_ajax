$(document).ready(function(){

  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/users',
    type: 'GET',
    dataType: 'JSON',
  }).done(function(data) {
    data.forEach(function(data){
      $('#users').append('<li> First Name: ' + data.first_name + '</li> <li> Last Name: ' + data.last_name + '</li> <hr>');
    });
  }).fail(function(data) {
    alert('SERVER FAILURE');
  });

  $('#user-form').submit(function(e){
    e.preventDefault();
    var formData = $(this).serializeArray();
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/users',
      type: 'POST',
      dataType: 'JSON',
      data: formData
    }).done(function(data) {
      location.reload()
    }).fail(function(data) {
      console.log(data);
    });
  });

});

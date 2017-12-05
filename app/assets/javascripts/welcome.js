$(document).ready(function(){
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/users',
    type: 'GET',
    dataType: 'JSON',
  }).done(function(data) {
    data.forEach(function(data){
      $('#users').append('<li data-id=' + data.id + '>' + data.first_name + ' ' + data.last_name +
                         ' <button id="delete">Delete</button> <button id="edit">Edit</button></li><hr>');
    });
  }).fail(function(data) {
    Materialize.toast(data.message, 1000);
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
      Materialize.toast(data.message, 1000);
    });
  });

  $(document).on('click', '#delete', function(){
    var $item = $(this).parent();
    var userId = $(this).parent().attr('data-id');
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/users' + '/' + userId,
      type: 'DELETE',
      dataType: 'JSON',
    }).done(function(data) {
      $item.remove();
    }).fail(function(data) {
      Materialize.toast(data.message, 1000);
    });
  });

  $(document).on('click', '#edit', function(){
    var userId = $(this).parent().attr('data-id');
    var $item = $(this).parent();
    $item.append('<form id="edit-form">' +
                  '<input type="text" placeholder="First Name" name="user[first_name]"><input type="text" placeholder="Last Name" name="user[last_name]">' +
                  '<input id="user-submit" type="submit" value="Submit"></form>');
    $('#edit-form').submit(function(e){
      e.preventDefault();
      var formData = $(this).serializeArray();
      $.ajax({
        url: 'http://json-server.devpointlabs.com/api/v1/users' + '/' + userId,
        type: 'PUT',
        dataType: 'JSON',
        data: formData
      }).done(function(data) {
        location.reload()
      }).fail(function(data) {
        Materialize.toast(data.message, 1000);
      });
    });
  });

});

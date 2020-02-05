/**
 * Created by stephen.palmer on 29/06/2017.
 */

$(function() {
  console.log( ">> on ready event" );

  $.ajax({
      url: "http://localhost:29637/api/values/2",
      type: "GET"
    })
    .done(function(data) {
      console.info('>>XHR returned: ' + data);
      $('#data').html(data);
    });

});





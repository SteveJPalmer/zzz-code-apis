/**
 * Created by stephen.palmer on 29/06/2017.
 */

$(function() {
  console.log( ">> on ready event" );

  $.ajax({
    url: "http://localhost:31272/api/orders",
      type: "GET"
    })
    .done(function(data) {
      console.info('>>XHR returned: \n' + data);
      console.info('>>XHR returned: \n' + JSON.stringify(data,null,2));
      $('#data').html(JSON.stringify(data));
    });

});





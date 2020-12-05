$(document).on("ready", ajaxCall());

function ajaxCall() {
  $.ajax({
    method: 'get',
    url: 'https://thesimpsonsquoteapi.glitch.me/quotes'
  })
    .done(function(data) {
      $('.quote').html(`"${data[0].quote}"`);
      $('.author').html(`&mdash; ${data[0].character}`);
      $('.character').attr('src', data[0].image);
    })
    .fail(function() {
      alert('Something went wrong.');
    });
}
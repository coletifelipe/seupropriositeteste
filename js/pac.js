//Set speed (time in milliseconds)(smaller is faster)
var speed= 90;

function PacmanEat(){
  if($('.pacman').next().hasClass('smallDot') != true) PacmanWait();
  else{
    $('#placeholder').remove();
    var position = $('.pacman').next('.smallDot').position();
    var PacManPos = $('.pacman').position();
    if(position.left -5 < PacManPos.left){
      $('.pacman').addClass('pacman-left').removeClass('pacman-up').removeClass('pacman-down');
    }else if(position.left -5 == PacManPos.left && position.top-5>PacManPos.top){
      $('.pacman').addClass('pacman-up').removeClass('pacman-down').removeClass('pacman-left');
    }else if(position.left -5 == PacManPos.left && position.top-5<PacManPos.top){
      $('.pacman').addClass('pacman-down').removeClass('pacman-up').removeClass('pacman-left');
    }else{
      $('.pacman').removeClass('pacman-down').removeClass('pacman-up').removeClass('pacman-left');
    }

    $('.pacman').animate({
      top: position.top-13,
      left: position.left-13
    }, speed, 'linear', function() {
      $('.pacman').next('.smallDot').remove();
      PacmanEat();
    });
  }
}

function PacmanWait(){
  setTimeout(function(){PacmanEat()}, 200);
}

var lastPos = {'pageX':0,'pageY':0 };
$( document ).mousemove(function( event ) {
  event.pageX = Math.round(event.pageX / 50) * 50;
  event.pageY = Math.round(event.pageY / 50) * 50;

  if(lastPos.pageX == event.pageX && lastPos.pageY == event.pageY) return;
  lastPos.pageX = event.pageX;
  lastPos.pageY = event.pageY;

  $('.testepac').append('<div class="smallDot"> </div>');
  $('.testepac').find('div:last-child').position({
    my: "left-5 bottom",
    of: event,
    collision: "fit"
  });


});

$(document).ready(function(){
  $('.testepac').append('<div class="pacman"></div>');
  PacMan();
  function PacMan(){
    if($('.pacman').hasClass('pacman-up') || $('.pacman').hasClass('pacman-down')){
      $('.pacman').addClass('chomp-vertical');
    }else{
      $('.pacman').addClass('chomp');
    }
    setTimeout(function(){
      $('.pacman').removeClass('chomp').removeClass('chomp-vertical');
      setTimeout(function(){
        PacMan();
      }, speed);
    }, speed);
  }

  PacmanEat();
});
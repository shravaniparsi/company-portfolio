jQuery( document ).ready(function( $ ) {


	"use strict";
        // Page loading animation

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });

        $(".Modern-Slider").slick({
            autoplay:true,
            autoplaySpeed:5000,
            speed:600,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true,
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>', 
        });
        function visible(partial) {
            var $t = partial,
                $w = jQuery(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

        }
});

function test(form) {
  var name = document.getElementById("name_footer").value;
  var email = document.getElementById("email_footer").value;
  var message = document.getElementById("message_footer").value;
  var warning = ""
  var str = "mailto:info@alternatedimension.in?subject=contact company-name&body=";
  if (name.length > 0) {
    str += "Hi my name is " + name + ", ";
  } else {
    warning += "Name is required"
  }
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    str += "\nemail:" + email + ", ";
  } else {
    if (email.length <= 0) {
      warning += ", email is required"
    } else {
      warning += ", email is invalid"
    }
  }
  if (message) {
    str += "message:" + message + ", ";
  }
  if (warning.length > 0) {
    alert(warning);
    document.getElementById('send_footer').href = "";
  } else {
    str += "%0D%0ARegards,%0D%0A" + name;
    document.getElementById('send_footer').href = str;
    document.getElementById("name_footer").value = "";
    document.getElementById("email_footer").value = "";
    document.getElementById("message_footer").value = "";
  }
}
function test2(form) {
  var name = document.getElementById("name_form").value;
  var email = document.getElementById("email_form").value;
  var mobile = document.getElementById("mobile_form").value;
  var message = document.getElementById("message_form").value;
  var warning = ""
  var str = "mailto:info@alternatedimension.in?subject=contact company-name&body=";
  if (name.length > 0) {
    str += "Hi my name is " + name + ", ";
  } else {
    warning += "Name is required"
  }
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    str += "\nemail:" + email + ", ";
  } else {
    if (email.length <= 0) {
      warning += ", email is required"
    } else {
      warning += ", email is invalid"
    }
  }
  if (mobile) {
    str += "mobile:" + mobile + ", ";
  }
  else{
    warning += ", mobile number is required"
  }
  if (message) {
    str += "message:" + message + ", ";
  }
  if (warning.length > 0) {
    alert(warning);
    document.getElementById('send').href = "";
  } else {
    str += "%0D%0ARegards,%0D%0A" + name;
    document.getElementById('send').href = str;
    document.getElementById("name_form").value = "";
    document.getElementById("email_form").value = "";
    document.getElementById("message_form").value = "";
    document.getElementById("subject_form").value = "";
  }

}

function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curtop];
  }
}
var Animation = function ({
  offset
} = {
  offset: 10
}) {
  var _elements;

  // Define a dobra superior, inferior e laterais da tela
  var windowTop = offset * window.innerHeight / 100;
  var windowBottom = window.innerHeight - windowTop;
  var windowLeft = 0;
  var windowRight = window.innerWidth;

  function start(element) {
    // Seta os atributos customizados
    element.style.animationDelay = element.dataset.animationDelay;
    element.style.animationDuration = element.dataset.animationDuration;
    // Inicia a animacao setando a classe da animacao
    element.classList.add(element.dataset.animation);
    // Seta o elemento como animado
    element.dataset.animated = "true";
  }

  function isElementOnScreen(element) {
    // Obtem o boundingbox do elemento
    var elementRect = element.getBoundingClientRect();
    var elementTop =
      elementRect.top + parseInt(element.dataset.animationOffset) ||
      elementRect.top;
    var elementBottom =
      elementRect.bottom - parseInt(element.dataset.animationOffset) ||
      elementRect.bottom;
    var elementLeft = elementRect.left;
    var elementRight = elementRect.right;

    // Verifica se o elemento esta na tela
    return (
      elementTop <= windowBottom &&
      elementBottom >= windowTop &&
      elementLeft <= windowRight &&
      elementRight >= windowLeft
    );
  }

  // Percorre o array de elementos, verifica se o elemento está na tela e inicia animação
  function checkElementsOnScreen(els = _elements) {
    for (var i = 0, len = els.length; i < len; i++) {
      // Passa para o proximo laço se o elemento ja estiver animado
      if (els[i].dataset.animated) continue;

      isElementOnScreen(els[i]) && start(els[i]);
    }
  }

  // Atualiza a lista de elementos a serem animados
  function update() {
    _elements = document.querySelectorAll(
      "[data-animation]:not([data-animated])"
    );
    checkElementsOnScreen(_elements);
  }

  // Inicia os eventos
  window.addEventListener("load", update, false);
  window.addEventListener("scroll", () => checkElementsOnScreen(_elements), {
    passive: true
  });
  window.addEventListener("resize", () => checkElementsOnScreen(_elements), false);

  // Retorna funcoes publicas
  return {
    start,
    isElementOnScreen,
    update
  };
};

// Initialize
var options = {
  offset: 20 //percentage of window
};
var animation = new Animation(options);



$(function () {
  $('#form-contact').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: 'mail.php',
      data: $('#form-contact').serialize(),
      success: function () {
        $("#alert-success-form").show();
        document.getElementById("name_form").value = "";
        document.getElementById("email_form").value = "";
        document.getElementById("mobile_form").value = "";
        document.getElementById("message_form").value = "";
      },
      error: function () {
        $("#alert-failure-form").show();
      }
    });
  });

});

$(function () {
  $('#form-footer').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: 'mail.php',
      data: $('#form-footer').serialize(),
      success: function () {
        $("#alert-success-footer").show();
        document.getElementById("name_footer").value = "";
        document.getElementById("email_footer").value = "";
        document.getElementById("mobile_footer").value = "";
        document.getElementById("message_footer").value = "";
      },
      error: function () {
        $("#alert-failure-footer").show();
      }
    });
  });

});


$(function () {
  $('#file-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: 'file.php',
      data: $('#file-form').serialize(),
      success: function () {
        $("#alert-success-form").show();
        document.getElementById("1-f").value = "";
        document.getElementById("2-f").value = "";
        document.getElementById("3-f").value = "";
        document.getElementById("4-f").value = "";
      },
      error: function () {
        $("#alert-failure-form").show();
      }
    });
  });

});
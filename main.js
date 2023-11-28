$(document).ready(function() {
    /* Navigation smooth scroll */
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top-30
            }, 1000);
            return false;
          }
        }
      });
    });

    /* Change menu background on scrolling */
    $(document).scroll(function() {
        if ($(document).scrollTop() > 100) {
            $("nav").addClass("navbar-scrolled");
        } else {
            $("nav").removeClass("navbar-scrolled");
        }
    });
});


/*   galeria de remeras    */

//Producto a favoritos
$('.card .aFavs').click(function(){
  $(this).parents('.card').toggleClass('esFav');
})
//Producto al carrito
$('.card .alCarrito').click(function(){
  $(this).parents('.card').toggleClass('enCarrito');
})


/*    tabla de medidas de remeras  */
var headertext = [],
headers = document.querySelectorAll("#miyazaki th"),
tablerows = document.querySelectorAll("#miyazaki th"),
tablebody = document.querySelector("#miyazaki tbody");

for(var i = 0; i < headers.length; i++) {
  var current = headers[i];
  headertext.push(current.textContent.replace(/\r?\n|\r/,""));
} 
for (var i = 0, row; row = tablebody.rows[i]; i++) {
  for (var j = 0, col; col = row.cells[j]; j++) {
    col.setAttribute("data-th", headertext[j]);
  } 
}

/*** funcion enviar correo formspree ***/

/**const enviar=async(event)=>{
  event.preventDefault();
  const formulario=document.querySelector('form');
  const infoForm= new FormData(formulario);

  await fetch("https://formspree.io/f/xrgwkwbz",{
    method:'post',
    body:infoForm,
    headers:{
      'Accept':'application/json'
    }
  })

.then(()=>window.location.href="./reply.html")
.catch((error)=>console.log(error))
formulario.reset()
}*/




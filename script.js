import {newLang} from './languages.js'

document.addEventListener('DOMContentLoaded', () => {
  $('document').ready(() => {
    $('.middlesection').css('display','none')
    $('.middlesection21').css('display','none')
    
    $('.sandwich').click(() => {
      $('.slide-menu').css({'left':'0', 'visibility' : 'visible'})
      $('.top').css({'transform':'translateX(400px)'}).css('opacity','0')
      $('.middle').css({'transform':'translateX(300px)'}).css('opacity','0')
      $('.bottom').css({'transform':'translateX(200px)'}).css('opacity','0')
    }) 
    
  $('.slide-menu img').click(() => {
    $('.projects20').css({'color':'yellow','text-shadow':'none'})
    $('.projects21').css({'color':'yellow','text-shadow':'none'})
    
    $("[class*='p20']").text(newLang[0])
    $("[class*='p21']").text(newLang[2])
    $('.homePage').removeClass('homePage').addClass('headProjects')
    $('.maincarpet').css('opacity','0')
    $('.slide-menu').css({'left':'100%', 'visibility':'hidden'})
    $('.top,.middle,.bottom').css('transform','translateX(0px)').css('opacity','1')

    $('.sandwich').hover(() => {
      $('.top').css({'transform':'translateX(-20px)'})
      $('.middle').css({'transform':'translateX(-15px)'})
      $('.bottom').css({'transform':'translateX(-10px)'})
    })
    $('.sandwich').mouseleave(() => {
      $('.top').css({'transform':'translateX(0)'})
      $('.middle').css({'transform':'translateX(0)'})
      $('.bottom').css({'transform':'translateX(0)'})
    })
    $('.middlesection,.middlesection21').fadeOut().promise().done(() => {
      $('.mainside p, .header h1').fadeIn(1000)
    })
    $('.header .projects').text('JS')
  })

  $(function(){
    $(document).on('click','.p20', function(){
      $(this).text(newLang[1])
      $('.p21').removeClass('homePage').addClass('headProjects')
      $('.p21').text(newLang[2])
      $(this).removeClass('headProjects').addClass('homePage')
      $('.top').css({'transform':'translateX(400px)'}).css('opacity','0')
      $('.middle').css({'transform':'translateX(300px)'}).css('opacity','0')
      $('.bottom').css({'transform':'translateX(200px)'}).css('opacity','0')
      $('.mainside p, .header h1').slideUp(500)
      $('.slide-menu').css('left','0')
      $('.projects20').css({'color':'rgb(87, 87, 0)','text-shadow':'0 0 20px white,0 0 20px white,0 0 10px white'})
      $('.maincarpet').css('opacity','.5')
      $('.mainside p, .header h1').promise().done(() => {
        $('.middlesection21').css('display','none')
        $('.middlesection').fadeIn(1000)
      })
    })
    $(document).on('click','.p21', function(){
      $(this).text(newLang[1])
      $('.p20').removeClass('homePage').addClass('headProjects')
      $('.p20').text(newLang[0])
      $(this).removeClass('headProjects').addClass('homePage')
      $('.top').css({'transform':'translateX(400px)'}).css('opacity','0')
      $('.middle').css({'transform':'translateX(300px)'}).css('opacity','0')
      $('.bottom').css({'transform':'translateX(200px)'}).css('opacity','0')
      $('.mainside p, .header h1').slideUp(500)
      $('.slide-menu').css('left','0')
      $('.projects20').css({'color':'rgb(87, 87, 0)','text-shadow':'0 0 20px white,0 0 20px white,0 0 10px white'})
      $('.maincarpet').css('opacity','.5')
      $('.mainside p, .header h1').promise().done(() => {
        $('.middlesection').css('display','none')
        $('.middlesection21').fadeIn(1000)
      })
    })

    $(document).on('click','.homePage', function(){
      // $("[class*='p20']").text(newLang[0])
      // $("[class*='p21']").text(newLang[2])
      //or this method:
      this.classList.contains('p20') ? $(this).text(newLang[0]) : $(this).text(newLang[2])  
      $(this).removeClass('homePage').addClass('headProjects')
      $('.top,.middle,.bottom').css('transform','translateX(0px)').css('opacity','1')
      $('.middlesection21,.middlesection').css('display','none')
      $('.middlesection').promise().done(() => {
        $('.maincarpet').css('opacity','0')
        $('.mainside p, .header h1').slideDown(1000)
        $('.slide-menu').css('left','100%')
        $('.projects20').css({'color':'yellow','text-shadow':'none'})
      })
    })
  })
  
  $('.projects20').click(() => {
    $('.middlesection21').css('display','none')
    $('.projects21').css({'color':'yellow','text-shadow':'none'})
    $('.projects20').css({'color':'rgb(87, 87, 0)','text-shadow':'0 0 20px white,0 0 20px white,0 0 10px white'})
    $('.slide-menu').css('left','0')
    $('.headProjects').text('Home')
    $('.homePage').text('Home')
    $('.headProjects').removeClass('headProjects').addClass('homePage')
    $('.mainside p, .header h1').fadeOut(300)
    $('.mainside p, .header h1').promise().done(() => {
      $('.maincarpet').css('opacity','.5')
      $('.middlesection').fadeIn(1000)
    })
  })
  
  $('.projects21').click(() => {
    $('.middlesection').css('display','none')
    $('.projects20').css({'color':'yellow','text-shadow':'none'})
    $('.projects21').css({'color':'rgb(87, 87, 0)','text-shadow':'0 0 20px white,0 0 20px white,0 0 10px white'})
    $('.slide-menu').css('left','0')
    $('.headProjects').text('Home')
    $('.homePage').text('Home')
    $('.headProjects').removeClass('headProjects').addClass('homePage')
    $('.mainside p, .header h1').fadeOut(300)
    $('.mainside p, .header h1').promise().done(() => {
      $('.maincarpet').css('opacity','.5')
      $('.middlesection21').fadeIn(1000)
    })
  })

})
 
})
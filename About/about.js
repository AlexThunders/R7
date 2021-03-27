document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  let slider = document.querySelector('.slider')
  let innerSlider = document.querySelector('.innerslider')
  
  //slider h3 elements
  let allH3 = document.querySelectorAll('.scrollH3')
  let scrollCover = document.querySelector('.scrollCover')

  slider.onscroll = () => {
    allH3.forEach(head3 => {
      let head3Boundaries = head3.getBoundingClientRect()
      let scrollCoverBoundaries = scrollCover.getBoundingClientRect()
      let scrollTop = Math.round(scrollCoverBoundaries.top)
      let head3Top = Math.round(head3Boundaries.top)
      //indicate where the head3 is vertically inside scroller:
      if(head3Top > scrollTop + 40 && head3Top < scrollTop + 150) {
        head3.classList.add('headcenter')
      } 
      else {
        if(head3.classList.contains('headcenter')) 
         {
           head3.classList.remove('headcenter')
        } 
      }
    })
  }
  
  //play video when it's frame is vertically centered on the screen 
  let allVideos = document.querySelectorAll('.imgVid')
  let screenTop = 0

  window.onscroll = () => {
    allVideos.forEach(vid => {
      let screenBottom = window.innerHeight
      let screenCenter = Math.round(window.innerHeight / 2)
      let vidBorders = vid.getBoundingClientRect()
      
      if(vidBorders.top > screenTop && vidBorders.bottom < screenBottom) {
        if(vid.paused === true) {
          vid.play()
        }
      } else {
        if(vid.paused === false) {
          vid.pause()
        }
      }
    })
  }




  
})
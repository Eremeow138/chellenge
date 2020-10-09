let slides = document.querySelectorAll('.slider_slide');

let leftButton = document.querySelector('.slider_button__left');
let rightButton = document.querySelector('.slider_button__right');

let shift = 0;
let move = 0;

//slides[0].getBoundingClientRect().width;

function clamp(pos, maxShift){
  if (pos<0){
    pos=-(-(pos)%maxShift);
  } else {
    pos=-((maxShift-(pos))%maxShift);
  }  
  return pos;
}

function cycle(pos,max){
  if (pos>=max){pos=0;}
  if (pos<0){pos=max-1;}
  return pos;
}

let getSlideHandler = (shiftStep, shiftPx, animate) =>{
  let slideHandler = (ev) => {
    //let width = slides[0].getBoundingClientRect().width;
    //let sumWidth = [...slides].reduce((a, it)=>a+it.getBoundingClientRect().width);
    let maxShift = (slides.length)*100;
    //if ((-shift<maxShift)||){
      shift+=shiftStep;
    /* if (shift<0){
        shift=-(-(shift+shiftStep)%maxShift);
      } else {
        shift=-((maxShift-(shift+shiftStep))%maxShift);
      }
*/
    //}
    //console.log(maxShift, shift);
    slides.forEach((it, i, ar)=>{
      let pos = shift+i*100;
      let width = slides[0].getBoundingClientRect().width;
      let slideShift = -Math.round(move/width);
      
      let duration= 400;
      // + (slideShift*100)
      let lastPos = pos;
      pos = clamp(pos, maxShift);
      console.log(pos);


      if (shiftStep<0){

      } else {

      }
      //if (lastPos !== pos){
        ar[cycle(i+1, ar.length-1)].style = `
        transition-duration: ${animate?0:0}ms; 
        transform: translate(calc(${pos+shiftStep}% - ${shiftPx}px));
        `   
      //}
     // console.log(maxShift, pos);
      //%((slides.length-3)*100)
      requestAnimationFrame(()=>{requestAnimationFrame(()=>{
      it.style = `
      transition-duration: ${animate?duration:0}ms; 
      transform: translate(calc(${pos}% - ${shiftPx}px));
      `
      });});
      
    });
  }  
  return slideHandler;
}

getSlideHandler(0,0, false)();

let sliderContainer = document.querySelector('.slider_slides');

let isDrag = false;
let startX = 0;
//let slideWidth = 0;



sliderContainer.addEventListener('mousedown', (ev)=>{
  //getSlideHandler(0, )
  isDrag = true;  
  startX = ev.pageX;
  //slides[0].getBoundingClientRect().width;
});

sliderContainer.addEventListener('mousemove', (ev)=>{
  if (isDrag){
    move = -(ev.pageX-startX);
    getSlideHandler(0, move, false)(ev);
    /*
    slides.forEach(it=>{
      it.style = `
        transition-duration: 0ms; 
        transform: translate( calc(${shift}% - ${move}px) );
      `;
    });*/
  }
});

sliderContainer.addEventListener('mouseup', (ev)=>{
  if (isDrag){
    isDrag = false; 
      let width = slides[0].getBoundingClientRect().width;
      let slideShift = -Math.round(move/width);
      //shift+=;
      move = 0;
      getSlideHandler(slideShift*100, 0, true)(ev);
    /*
    slides.forEach(it=>{
      
      it.style = `
        transition-duration: 400ms; 
        transform: translate( calc(${shift}% - ${move}px) );
      `;
    }); */
  } 
});

/*
sliderContainer.addEventListener('touchstart', (ev)=>{
  isDrag = true;  
  startX = ev.touches[0].pageX;
  //slides[0].getBoundingClientRect().width;
});

sliderContainer.addEventListener('touchmove', (ev)=>{
  if (isDrag){
    move = -(ev.touches[0].pageX-startX);
    slides.forEach(it=>{
      it.style = `
        transition-duration: 0ms; 
        transform: translate( calc(${shift}% - ${move}px) );
      `;
    });
  }
});

sliderContainer.addEventListener('touchend', (ev)=>{
  isDrag = false; 
  slides.forEach(it=>{
    let width = slides[0].getBoundingClientRect().width;
    let slideShift = -Math.round(move/width);
    shift+=slideShift*100;
    move = 0;
    it.style = `
      transition-duration: 400ms; 
      transform: translate( calc(${shift}% - ${move}px) );
    `;
  });  
});*/

leftButton.onclick = getSlideHandler(100,0, true);
rightButton.onclick = getSlideHandler(-100,0, true);
console.log(slides);
"use strict";
// Burger menu
const iconMenu = document.querySelector('.menu__icon');
const idAside = document.getElementById('aside');
// Calculate the width of the side scroll (usually 17px)
let scrolWidth = window.innerWidth - document.documentElement.clientWidth;
window.addEventListener("resize", function () { // recalculation when changing the window width
  scrolWidth = window.innerWidth - document.documentElement.clientWidth;
}, false);
// End / Calculate the width of the side scroll
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock')
    iconMenu.classList.toggle('_active');
    idAside.classList.toggle('_active');

    if (document.body.classList.contains("_lock") && scrolWidth > 0) {
      document.body.style.paddingRight = scrolWidth + 'px';
      idAside.style.paddingRight = scrolWidth + 'px';
    } else {
      document.body.style.paddingRight = '';
      idAside.style.paddingRight = '';
    }
  });
}
// End / Menu burger
// Scroll to sections - menu
const menuLinks = document.querySelectorAll('.link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}
function onMenuLinkClick(e) {
  e.preventDefault();
  let link = e.target;
  if (link.dataset.goto && document.querySelector(link.dataset.goto)) {
    let gotoBlock = document.querySelector(link.dataset.goto);
    let heightHeader = 0; //header height
    if (iconMenu.classList.contains('_active')) {
      document.body.classList.remove('_lock')
      iconMenu.classList.remove('_active');
      idAside.classList.remove('_active');
      heightHeader = document.getElementById('h1').offsetHeight;//header height
    }
    let gotoBlockValue = offset(gotoBlock).top; + window.scrollY - heightHeader;
    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth"
    })
  }
}
// End / Scroll to sections - menu
// Open submenu by cell
let menuArrows = document.querySelectorAll('.menu__arrow');
if (menuArrows.length > 0) {
  for (let index = 0; index < menuArrows.length; index++) {
    const menuArrow = menuArrows[index];
    menuArrow.addEventListener("click", function (e) {
      menuArrow.parentElement.parentElement.classList.toggle('_open');
    });
  }
}
// End / Open submenu by cell
// Animation on scroll
const animLeft = document.querySelectorAll('.anim-left');
const animRight = document.querySelectorAll('.anim-right');
const animBottom = document.querySelectorAll('.anim-bottom');
const animScale = document.querySelectorAll('.anim-scale');
// Scroll event
window.addEventListener('scroll', () => {
  // Highlight table of contents items as the page scrolls
  const scrollTopId = window.scrollY || document.documentElement.scrollTop;
  const elHeaders = document.querySelectorAll('.section, .scroll__item');
  const goTop = document.getElementById('gotop');// Up Button
  let headerId = '';
  for (let i = elHeaders.length - 1; i >= 0; i--) {
    if (elHeaders[i].getBoundingClientRect().top + window.scrollY - 200 < scrollTopId) {
      headerId = elHeaders[i].id;
      break;
    }
  }
  document.querySelectorAll('.menu__body li.active').forEach(el => {
    el.classList.remove('active');
  });
  if (headerId) {
    if (headerId == 'id-0' && goTop) {
      goTop.classList.add('none');
    } else {
      goTop.classList.remove('none');
    }
    let elLi = document.querySelector(`a[href="#${headerId}"]`).parentElement;
    elLi.classList.add('active');
    if (elLi.parentElement.classList.value == 'menu__sub-list') {
      elLi.parentElement.parentElement.classList.add('active');
    }
  }
  // END / Highlight table of contents items as page scrolls
   if (animLeft.length > 0) { 
    animOnScroll(animLeft);
  }
  if (animRight.length > 0) { 
    animOnScroll(animRight);
  }
  if (animBottom.length > 0) { 
    animOnScroll(animBottom);  
  }  
  if (animScale.length > 0) { 
    animOnScroll(animScale);  
  }
});
// End/ Scroll event
setTimeout(() => {
if (animLeft.length > 0) { 
  animOnScroll(animLeft);
}
if (animRight.length > 0) { 
  animOnScroll(animRight);
}
if (animBottom.length > 0) { 
  animOnScroll(animBottom);  
}
}, 300 );
if (animScale.length > 0) { 
  animOnScroll(animScale);  
}
// Animation on scroll
function animOnScroll(anims) {
  for (let i = 0; i < anims.length; i++) {
    const anim = anims[i];
    const animHeight = anim.offsetHeight; // object height
    const animOffset = offset(anim).top;// position relative to top
    const animStart = 3;// animation start time coefficient
    let animPoint = window.innerHeight - animHeight / animStart;
    if (animHeight > window.innerHeight) {
      animPoint = window.innerHeight - window.innerHeight / animStart;
    }
    if ((window.scrollY > animOffset - animPoint) && window.scrollY < (animOffset + animHeight)) {
      anim.classList.add('_active');
    }
    else {      
      if (!anim.classList.contains('anim-one')) {
        anim.classList.remove('_active');
      }
    }
  }
}
// Animation on scroll
// Getting distances from top and left
function offset(el) { //
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.scrollX || document.documentElement.scrollLeft,
    scrollTop = window.scrollY || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
// END / Get distances from top and left
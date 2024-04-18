import companyList from "./js-page3-company-list.js"; //learning to import modules
//import {companyList, other_parameter, other_parameter} from "./js-page3-company-list.js";
//import * as myModule from "./js-page3-company-list.js"; <-- doesn't work for some reason, might have a different export syntax
//console.log(myModule.companyList[1]);

let content_hidden = false;

let swiper= Swiper;
let init = false;

let content = document.querySelector('.content');
let swiper_container;
let swiper_wrapper;
let pagination_container;
let swiper_pagination;
let contentButton = document.querySelector(".button-show-hide-content");
let contentButtonText = document.querySelector(".button-show-hide-content__text");

let company_block_template = document.getElementById("company-block-template").content;

companyList.forEach(companyName => {
    let company = company_block_template.cloneNode(true);
    let company_logo = company.querySelector(".company-block__logo");
    company_logo.src = "company-logos/" + companyName + ".png";
    company_logo.alt = companyName;
    content.appendChild(company);
});





let slides = document.querySelectorAll('.content .company-block');

function swiperMode() {
    
    if (window.innerWidth < 768)
    {
        if (!init) {
                 
                    swiper_container = document.createElement("div");
                    swiper_container.classList.add('swiper');
                    pagination_container = document.createElement("div");
                    pagination_container.classList.add('pagination-container');
                    swiper_wrapper = document.createElement("div");
                    swiper_wrapper.classList.add('swiper-wrapper');
                    swiper_pagination = document.createElement("div");
                    swiper_pagination.classList.add('swiper-pagination');
                    
                    content.appendChild(swiper_container);
                    swiper_container.appendChild(swiper_wrapper);
                    swiper_container.appendChild(pagination_container);
                    pagination_container.appendChild(swiper_pagination);
                    
                    
                    
                    slides.forEach(slide => {
                        swiper_wrapper.appendChild(slide);
                        slide.classList.add('swiper-slide');
                    });
                    
                    init = true;
                    swiper = new Swiper('.swiper',
                    {
                        // Optional parameters
                        loop: true,
                        centeredSlides: true,
                        spaceBetween: 16,
                        initialSlide: 0,
   
                        // If we need pagination
                        pagination: {
                          el: '.swiper-pagination',
                          dynamicMainBullets: 6,
                          dynamicBullets:true,
                        },

                    });
                    }
    }
    else  if (init)
    {
        init=false;
        swiper.destroy();
        slides.forEach(slide => {
            slide.classList.remove('swiper-slide');
            content.appendChild(slide);
        });
        swiper_container.remove();
        pagination_container.remove();
    }

 
}  
function recountSlides()
{
        const params = swiper.params;
        params.slidesPerView = 1.3*(window.innerWidth/320); swiper.update();
}




/* On Load
**************************************************************/
window.addEventListener('load', function() {
    swiperMode();
    if (window.innerWidth < 768)
    {recountSlides();contentButton.style.display="none";}
    else
    {calculateContentVisibility();}
});

/* On Resize
**************************************************************/
window.addEventListener('resize', function() {
    swiperMode();
    if (window.innerWidth < 768)
    {recountSlides();contentButton.style.display="none";}
    else
    {calculateContentVisibility();}
});

function getGridData() {
    const gridComputedStyle = window.getComputedStyle(content);
    return{
          gridRowCount: gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length,
          gridColumnCount: gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length,
          }
  }
  
function calculateContentVisibility()
{
    let company_slides = document.querySelectorAll('.content .company-block');
  
    company_slides.forEach(c_slide => {
        c_slide.style.display = "flex";
    });
    
    // check row count
    let gridData = getGridData();
    if(gridData.gridRowCount <= 2){contentButton.style.display = "none";}//hide button
    else{contentButton.style.display = "flex";} //else if hidden, show button  

         if (content_hidden == true)//if content-hidden == true
         {//column count(~3) * max row count(2) = result    //         total element count - result = total result    //         11-~3*2=~5
            let elementsToHide = company_slides.length - gridData.gridColumnCount * 2;
            for(let i = company_slides.length-1;i>=company_slides.length-elementsToHide;i--) 
            //         hide last (total result)(~5) elements
            {company_slides[i].style.display = "none";}//button-content = "show more"
            contentButtonText.textContent = "Показать все";
            
         }   
         else
         {
            //       show all elements
                //       button-content = "hide"   
            company_slides.forEach(c_slide => {
                c_slide.style.display = "flex";
            });
            contentButtonText.textContent = "Скрыть";
                
         }

}

contentButton.addEventListener('click', function() {
    content_hidden=!content_hidden;
    calculateContentVisibility();
});
















/*
Reminder: grid column / row count change when cells are hidden.


content hiding logic

ONLY ON NON-MOBILE

on resize / load / button press       
                                show all elements for recalculation
                                check row count
                                if <=2 rows
                                      hide button
                                  else
                                      if hidden, show button  
                                      
                                    if content-hidden = true
                                        column count(~3) * max row count(2) = result
                                        total element count - result = total result
                                        11-3*2=5
                                            
                                        hide last (total result)(5) elements
                                        button-content = "show more"
                                    else if content-hidden = false
                                  
                                      show all elements
                                      button-content = "hide"                                               
                                      
                              }
*/
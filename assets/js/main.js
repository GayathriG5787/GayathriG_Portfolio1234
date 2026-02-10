/*SHOW SIDEBAR=====*/
const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')
/*SIDEBAR SHOW*/
/*Validate If Constant Exists*/
if(navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar')
    })
}

/*SIDEBAR HIDDEN*/
/*Validate If Constant Exists*/
if(navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar')
    })
}

/*SKILLS ACCORDION (Only one open at a time)*/
const skillHeaders = document.querySelectorAll('.skills__header');
const skillContents = document.querySelectorAll('.skills__group');

skillHeaders.forEach(header => {
    header.addEventListener('click', () => {

        const target = document.querySelector(header.dataset.target);
        const isOpen = header.classList.contains('skills__active');

        // Close all accordions first
        skillHeaders.forEach(h => h.classList.remove('skills__active'));
        skillContents.forEach(c => c.classList.remove('skills__active'));

        // If clicked one wasn't open → open it
        if (!isOpen) {
            header.classList.add('skills__active');
            target.classList.add('skills__active');
        }

    });
});

/*MIXITUP FILTER PORTFOLIO*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/*Link Active Work*/
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener("click",activeWork))

/*Work Popup*/
document.addEventListener("click",(e) => {
    if(e.target.classList.contains("work__button")) {
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup(){
    document.querySelector(".portfolio__popup").classList.toggle("open");
}

document.querySelector(".portfolio__popup-close").addEventListener("click",togglePortfolioPopup)

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp__thumbnail img").src = portfolioItem.querySelector(".work__img").src;
    document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector(".work__title").innerHTML;
    document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portfolio__item-details").innerHTML;
}

/*SERVICES MODAL*/
const modalViews = document.querySelectorAll('.services__modal'),
    modelBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalCloses) => {
    modalCloses.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*SWIPER TESTIMONIAL*/
let swiper = new Swiper(".testimonials__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
      },
  });

/*INPUT ANIMATION*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove("focus")
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus",focusFunc)
    input.addEventListener("blur",blurFunc)
})


/*SCROLL SECTIONS ACTIVE LINK*/
// get all sections that have an id defined
const sections = document.querySelectorAll("section[id]");

// add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter()
{
    //get current scroll position
    let scrollY = window.pageYOffset;
    //Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");
        /* - If our current scroll position enters the space where current section on screen is, add .active class to thee corresponding navigation link, else remove it.
           - To know which link needs an active class, we use sectionId variable we are getting while looping though sections as an selector */
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add("active-link")
        }
        else 
        {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove("active-link")
        }
    })
}

/*==================== CONTACT FORM EMAILJS ====================*/

(function(){
    emailjs.init("9rLXXTVfmNSE6oqrp"); // Replace with EmailJS public key
})();

const contactForm = document.getElementById("contact-form");

if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        emailjs.sendForm(
            "service_dptqygp",     // Replace with your service ID
            "template_9613x7p",    // Replace with your template ID
            this
        )
        .then(() => {
            const msgBox = document.getElementById("form-message");

            msgBox.className = "form__message success show";
            msgBox.textContent = "Message sent successfully! I'll get back to you soon.";

            setTimeout(() => {
                msgBox.classList.remove("show");
            }, 5000);

            contactForm.reset();

            // Optional: remove focus animation after reset
            document.querySelectorAll(".input__container").forEach(c => {
                c.classList.remove("focus");
            });

        })
        .catch(error => {
            const msgBox = document.getElementById("form-message");

            msgBox.className = "form__message error show";
            msgBox.textContent = "Failed to send message. Please try again.";

            setTimeout(() => {
                msgBox.classList.remove("show");
            }, 5000);

            console.log(error);
        });
    });
}

/*SHOW SCROLL UP*/
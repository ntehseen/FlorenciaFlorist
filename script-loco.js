document.addEventListener("DOMContentLoaded", function() {
    console.clear();

    const select = (e) => document.querySelector(e);
    const selectAll = (e) => document.querySelectorAll(e);

    const stage = select(".stage");
    const slides = selectAll(".slide");
    const links = selectAll(".slide__scroll-link");
    const titles = selectAll(".col__content-title");
    const introTitle = select(".intro__title");
    let slideID = 0;

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".smooth-wrapper"),
      smooth: true,
      // Add any other options here
    });

    function initHeader() {
      // animate the logo and fake burger button into place
      let tl = gsap.timeline({ delay: 0.5 });

      tl.from(".logo", {
        y: -40,
        opacity: 0,
        duration: 2,
        ease: "power4",
      })
        .from(
          ".nav-btn__svg rect",
          {
            scale: 0,
            transformOrigin: "center right",
            duration: 0.6,
            ease: "power4",
            stagger: 0.1,
          },
          0.6
        )
        .to(
          ".nav-rect",
          {
            scale: 0.8,
            transformOrigin: "center left",
            duration: 0.4,
            ease: "power2",
            stagger: 0.1,
          },
          "-=0.6"
        );

      // create mouse animations for the faux burger button
      let navBtn = select(".nav-btn");

      navBtn.addEventListener("mouseover", () => {
        gsap.to(".nav-rect", {
          scaleX: 1,
          transformOrigin: "top left",
          duration: 0.4,
          ease: "power4",
        });
      });

      navBtn.addEventListener("mouseout", () => {
        gsap.to(".nav-rect", {
          scaleX: 0.8,
          transformOrigin: "top left",
          duration: 0.6,
          ease: "power4",
        });
      });
    }

    function initIntro() {
      // animate the intro elements into place
      let tl = gsap.timeline({ delay: 1.2 });

      tl.from(".intro-line", {
        y: 400,
        ease: "power4",
        duration: 3,
      })
        .from(
          ".intro__txt",
          {
            x: -100,
            opacity: 0,
            ease: "power4",
            duration: 3,
          },
          0.7
        )
        .from(
          ".intro__img--1, .intro__img--2",
          {
            y: gsap.utils.random(50, -50),
            opacity: 0,
            ease: "power2",
            duration: 10,
          },
          1
        );

      // set up scrollTrigger animation for the when the intro scrolls out
      gsap.to(".intro__title", {
        scrollTrigger: {
          trigger: ".intro",
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
        x: 100,
        ease: "power4.in",
        duration: 3,
      });

      gsap.to(".intro__txt", {
        scrollTrigger: {
          trigger: ".intro",
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
        y: 100,
        ease: "power4.in",
        duration: 3,
      });
    }

    function initLinks() {
      // ScrollToPlugin links
      links.forEach((link, index) => {
        let linkST = link.querySelector(".slide__scroll-line");

        link.addEventListener("click", (e) => {
          e.preventDefault();
          locoScroll.scrollTo("#slide-" + (index + 2));
          slideID++;
        });

        link.addEventListener("mouseover", () => {
          gsap.to(linkST, {
            y: 40,
            transformOrigin: "bottom center",
            duration: 0.6,
            ease: "power4",
          });
        });

        link.addEventListener("mouseout", () => {
          gsap.to(linkST, {
            y: 0,
            transformOrigin: "bottom center",
            duration: 0.6,
            ease: "power4",
          });
        });
      });

      // ScrollToPlugin link back to the top
      let top = select(".footer__link-top");

      top.addEventListener("click", (e) => {
        e.preventDefault();
        locoScroll.scrollTo("#slide-0");
      });

      top.addEventListener("mouseover", () => {
        gsap.to(".footer__link-top-line", {
          scaleY: 3,
          transformOrigin: "bottom center",
          duration: 0.6,
          ease: "power4",
        });
      });

      top.addEventListener("mouseout", () => {
        gsap.to(".footer__link-top-line", {
          scaleY: 1,
          transformOrigin: "bottom center",
          duration: 0.6,
          ease: "power4",
        });
      });
    }

    function initSlides() {
      // Animation of each slide scrolling into view
      slides.forEach((slide) => {
        let tl = gsap.timeline({
            scrollTrigger: {
              trigger: slide,
              start: "40% 50%", // position of trigger meets the scroller position
            },
          });
  
          tl.from(slide.querySelectorAll(".col__content-title"), {
            ease: "power4",
            y: "+=5vh",
            duration: 2.5,
          })
            .from(
              slide.querySelectorAll(".line__inner"),
              {
                y: 200,
                duration: 2,
                ease: "power4",
                stagger: 0.1,
              },
              0
            )
            .from(
              slide.querySelectorAll(".col__content-txt"),
              {
                x: 100,
                y: 50,
                opacity: 0,
                duration: 2,
                ease: "power4",
              },
              0.4
            )
            .from(
              slide.querySelectorAll(".slide-link"),
              {
                x: -100,
                y: 100,
                opacity: 0,
                duration: 2,
                ease: "power4",
              },
              0.3
            )
            .from(
              slide.querySelectorAll(".slide__scroll-link"),
              {
                y: 200,
                duration: 3,
                ease: "power4",
              },
              0.4
            )
            .to(
              slide.querySelectorAll(".slide__scroll-line"),
              {
                scaleY: 0.6,
                transformOrigin: "bottom left",
                duration: 2.5,
                ease: "elastic(1,0.5)",
              },
              1.4
            );
        });
      }
  
      function initParallax() {
        slides.forEach((slide) => {
          let imageWrappers = slide.querySelectorAll(".col__image-wrap");
  
          gsap.fromTo(
            imageWrappers,
            {
              y: "-30vh",
            },
            {
              y: "30vh",
              scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: "top bottom",
                snap: {
                  snapTo: 0.5,
                  duration: 1,
                  ease: "power4.inOut",
                },
              },
              ease: "none",
            }
          );
        });
      }
  
      function scrollTop() {
        locoScroll.scrollTo("#slide-0");
      }
  
      function initKeys() {
        document.addEventListener("keydown", (event) => {
          event.preventDefault();
          if (event.keyCode == 40) {
            if (slideID <= slides.length) {
              slideID++;
              locoScroll.scrollTo("#slide-" + slideID);
            }
          } else if (event.keyCode == 38) {
            slideID = 0;
            scrollTop();
          }
        });
      }
  
      function init() {
        gsap.set(stage, { autoAlpha: 1 });
        initHeader();
        initIntro();
        initLinks();
        initSlides();
        initParallax();
        initKeys();
      }
  
      init();
  });

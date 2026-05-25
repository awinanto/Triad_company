document.addEventListener("DOMContentLoaded", () => {
    
    // 0. Dynamic Navigation Active Link Highlighting (Global)
    const setActiveNavLink = () => {
        const navLinks = document.querySelectorAll(".nav-menu .nav-link");
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.remove("active");
            if (href === currentPage) {
                link.classList.add("active");
            }
        });
    };
    
    setActiveNavLink();
    
    // 1. Interactive Metric Tabs Feature (Used in insights.html)
    const tabs = document.querySelectorAll(".metric-tab");
    const contents = document.querySelectorAll(".metric-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            const targetId = tab.getAttribute("data-target");
            const TargetContent = document.getElementById(targetId);
            if (TargetContent) {
                TargetContent.classList.add("active");
            }
        });
    });

    // 2. Mobile Responsive Toggle Menu Interaction (Global)
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // 3. Simple Mock Video Feedback Prompt (Used in insights.html)
    const videoPlayer = document.querySelector(".mock-video-player");
    if (videoPlayer) {
        videoPlayer.addEventListener("click", () => {
            alert("This connects to the Triad Engineering Group operational legacy presentation reel.");
        });
    }
});
// 4. Hero Carousel Auto-Sliding Functionality
const initialSliderSetup = () => {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".dot");
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");
    
    if (slides.length === 0 || dots.length === 0) return;

    let currentSlideIndex = 0;
    let slideTimer;
    const intervalDuration = 5000; // Rotates automatically every 5 seconds

    const updateActiveSlide = (targetIndex) => {
        // Clear active classes from former allocations
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        // Establish active allocations to current choice
        slides[targetIndex].classList.add("active");
        dots[targetIndex].classList.add("active");
        currentSlideIndex = targetIndex;
    };

    const triggerNextSlide = () => {
        let nextIndex = currentSlideIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        updateActiveSlide(nextIndex);
    };

    const triggerPrevSlide = () => {
        let prevIndex = currentSlideIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        updateActiveSlide(prevIndex);
    };

    const resetTimerLoop = () => {
        clearInterval(slideTimer);
        slideTimer = setInterval(triggerNextSlide, intervalDuration);
    };

    // Connect Click Event Indicators to Tracker Dots
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const indexValue = parseInt(dot.getAttribute("data-index"), 10);
            updateActiveSlide(indexValue);
            resetTimerLoop(); // Resets timer on manual click to avoid sudden skips
        });
    });

    // Arrow Button Click Handlers
    if (arrowLeft) {
        arrowLeft.addEventListener("click", () => {
            triggerPrevSlide();
            resetTimerLoop();
        });
    }

    if (arrowRight) {
        arrowRight.addEventListener("click", () => {
            triggerNextSlide();
            resetTimerLoop();
        });
    }

    // Start Initial Cycle Execution
    resetTimerLoop();
};

// Make sure to call this inside your existing DOMContentLoaded listener:
document.addEventListener("DOMContentLoaded", () => {
    // Keep your former scripts clean here...
    initialSliderSetup();

    // 5. Formspree Contact Form Handler (Used in contact.html)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const snackbar = document.getElementById("snackbar");
            const submitBtn = contactForm.querySelector('[data-fs-submit-btn]');
            
            // Disable submit button
            if (submitBtn) submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch("https://formspree.io/f/mqejylzy", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });
                
                if (response.ok) {
                    // Show success snackbar
                    if (snackbar) {
                        snackbar.textContent = "Thank you! Your message has been sent successfully. We'll get back to you shortly.";
                        snackbar.classList.remove("error");
                        snackbar.classList.add("show");
                    }
                    // Clear form
                    contactForm.reset();
                    // Hide snackbar after 5 seconds
                    setTimeout(() => {
                        if (snackbar) {
                            snackbar.classList.remove("show");
                        }
                    }, 5000);
                } else {
                    // Handle error
                    const data = await response.json();
                    if (snackbar) {
                        snackbar.textContent = data.error || "An error occurred. Please try again.";
                        snackbar.classList.add("error");
                        snackbar.classList.add("show");
                    }
                }
            } catch (error) {
                // Handle network error
                if (snackbar) {
                    snackbar.textContent = "A network error occurred. Please check your connection and try again.";
                    snackbar.classList.add("error");
                    snackbar.classList.add("show");
                }
            } finally {
                // Re-enable submit button
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
});
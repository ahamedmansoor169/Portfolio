// ===============================
// ENHANCED PRELOADER FUNCTIONALITY
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const preloaderSvg = document.getElementById('preloaderSvg');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                hidePreloader();
            }, 500);
        }
        if (loadingProgress) {
            loadingProgress.style.width = progress + '%';
        }
    }, 200);

    // Enhanced preloader hide function
    function hidePreloader() {
        if (!preloader) return;

        // Create GSAP timeline for smooth exit animation
        const tl = gsap.timeline({
            onComplete: () => {
                preloader.style.display = 'none';
                preloader.style.visibility = 'hidden';
                document.body.classList.remove('loaded');
                
                // Trigger any post-preloader animations
                triggerPostPreloaderAnimations();
            }
        });

        // Animate the SVG path
        if (preloaderSvg) {
            const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
            const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
            
            tl.to(preloaderSvg.querySelector('path'), {
                duration: 0.8,
                attr: { d: curve },
                ease: "power2.easeIn",
            })
            .to(preloaderSvg.querySelector('path'), {
                duration: 0.8,
                attr: { d: flat },
                ease: "power2.easeOut",
            }, "-=0.4");
        }

        // Animate preloader content
        tl.to('.preloader-content', {
            duration: 0.6,
            y: -50,
            opacity: 0,
            ease: "power2.easeIn",
        }, "-=0.6");

        // Animate the entire preloader
        tl.to(preloader, {
            duration: 1,
            y: -1500,
            ease: "power2.easeIn",
        }, "-=0.3");

        // Final cleanup
        tl.to(preloader, {
            duration: 0.1,
            zIndex: -1,
        });
    }

    // Function to trigger post-preloader animations
    function triggerPostPreloaderAnimations() {
        // Add active class to hero section for animations
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.classList.add('hero-animation-active');
        }

        // Trigger any existing animation functions
        if (typeof heroAreaAnimation === 'function') {
            heroAreaAnimation();
        }

        // Animate SVG text if it exists
        const svgText = document.querySelector(".hero-section .intro_text svg text");
        if (svgText) {
            svgText.classList.add("animate-stroke");
        }

        // Add active class to hero animation container
        const heroAnimation = document.querySelector(".heroAnimation");
        if (heroAnimation) {
            heroAnimation.classList.add("activeAnimation");
        }

        // Trigger any other initialization functions
        if (typeof initAnimations === 'function') {
            initAnimations();
        }
    }

    // Fallback: Hide preloader after a maximum time
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            hidePreloader();
        }
    }, 8000); // 8 seconds maximum
});

// Enhanced preloader with real loading detection
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // If preloader is still visible after window load, hide it
    if (preloader && preloader.style.display !== 'none') {
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    preloader.style.visibility = 'hidden';
                    document.body.classList.remove('loaded');
                }, 1000);
            }
        }, 500);
    }
});

// Optional: Add loading progress based on actual resources
function updateLoadingProgress(progress) {
    const loadingProgress = document.querySelector('.loading-progress');
    if (loadingProgress) {
        loadingProgress.style.width = progress + '%';
    }
}

// Optional: Detect when all images are loaded
function waitForImages() {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    if (images.length === 0) {
        updateLoadingProgress(100);
        return;
    }

    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                updateLoadingProgress((loadedImages / images.length) * 100);
            });
            img.addEventListener('error', () => {
                loadedImages++;
                updateLoadingProgress((loadedImages / images.length) * 100);
            });
        }
    });
    
    // Update initial progress
    updateLoadingProgress((loadedImages / images.length) * 100);
}

// Call image loading detection
document.addEventListener('DOMContentLoaded', waitForImages); 
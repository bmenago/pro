
document.addEventListener('DOMContentLoaded', function() {
    // Package selection functionality
    const packageOptions = document.querySelectorAll('.package-option');
    
    packageOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            packageOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });

    // Form validation
    const form = document.querySelector('.order-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted successfully!');
        });
    }


    // Reviews Carousel
    let currentReviewIndex = 0;
    const reviewsContainer = document.querySelector('.reviews-container');

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getCardWidth() {
        if (window.innerWidth <= 768) return 350;
        if (window.innerWidth <= 1024) return 300;
        return 320;
    }

    function updateCarousel() {
        if (reviewsContainer) {
            const cardsPerView = getCardsPerView();
            const cardWidth = getCardWidth();
            const gap = 20;
            const maxIndex = Math.max(0, 6 - cardsPerView);
            
            if (currentReviewIndex > maxIndex) {
                currentReviewIndex = maxIndex;
            }
            
            const translateX = -(currentReviewIndex * (cardWidth + gap));
            reviewsContainer.style.transform = `translateX(${translateX}px)`;
        }
    }

    function nextReview() {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, 6 - cardsPerView);
        
        if (currentReviewIndex >= maxIndex) {
            currentReviewIndex = 0;
        } else {
            currentReviewIndex += 1;
        }
        updateCarousel();
    }

    // Auto-rotate every 4 seconds
    setInterval(nextReview, 4000);

    // Update carousel on window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Initialize carousel
    updateCarousel();

    // Video controls
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('.tiktok-video');
        const overlay = container.querySelector('.video-overlay');
        const playButton = container.querySelector('.play-button');
        
        if (video && overlay && playButton) {
            // Play video when overlay is clicked
            overlay.addEventListener('click', () => {
                video.play();
                overlay.style.display = 'none';
            });
            
            // Show overlay when video is paused
            video.addEventListener('pause', () => {
                overlay.style.display = 'flex';
            });
            
            // Hide overlay when video starts playing
            video.addEventListener('play', () => {
                overlay.style.display = 'none';
            });
            
            // Show overlay when video ends
            video.addEventListener('ended', () => {
                overlay.style.display = 'flex';
            });
        }
    });
});
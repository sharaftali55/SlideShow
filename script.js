let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
        if (i === currentIndex) {
            resetAnimation(slide.querySelector('.caption'));
        }
    });
}

function resetAnimation(captionElement) {
    captionElement.style.animation = 'none';
    setTimeout(() => {
        captionElement.style.animation = '';
    }, 10);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

setInterval(() => {
    nextSlide();
}, 10000);

// Add touch/swipe functionality
let touchStartX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    if (touchEndX < touchStartX) {
        nextSlide();
    } else if (touchEndX > touchStartX) {
        prevSlide();
    }
}

// Add touch event listeners
const slider = document.querySelector('.slider');
slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchend', handleTouchEnd);

// Initial display
showSlide(currentIndex);

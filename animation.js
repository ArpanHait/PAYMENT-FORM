document.addEventListener('DOMContentLoaded', function() {
    const payFastContainer = document.querySelector('.top_section');

    if (payFastContainer) {
        const numberOfBubbles = 25; // You can adjust this number

        for (let i = 0; i < numberOfBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // Random size for the bubble
            const size = Math.random() * 10 + 5; // Bubbles between 5px and 15px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            // Random horizontal position
            bubble.style.left = `${Math.random() * 100}%`;

            // Random animation duration and delay
            const duration = Math.random() * 5 + 3; // Duration between 3s and 8s
            const delay = Math.random() * 5;      // Delay up to 5s
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;

            payFastContainer.appendChild(bubble);
        }
    }
});



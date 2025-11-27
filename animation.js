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

            // Randomly assign one of the wobble animations
            const animationName = Math.random() < 0.5 ? 'wobble-left' : 'wobble-right';
            bubble.style.animationName = animationName;

            // Random animation duration and delay
            const duration = Math.random() * 5 + 3; // Duration between 3s and 8s
            const delay = Math.random() * 5;      // Delay up to 5s
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;

            payFastContainer.appendChild(bubble);
        }
    }

    // --- New Blockchain Particle Animation using Canvas ---
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let particles = [];
    const particleCount = 70; // Number of particles (nodes)
    const connectionDistance = 100; // Max distance to draw a line

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5, // Horizontal velocity
            vy: (Math.random() - 0.5) * 0.5, // Vertical velocity
            radius: Math.random() * 2 + 1.5 // Increased particle size for better visibility
        });
    }

    function animate() {
        // Clear the canvas for the next frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Wrap particles around the screen
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Draw the particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Increased particle opacity
            ctx.fill();

            // Check for connections with other particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If close enough, draw a line
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    // Make line fainter the further away the particles are
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 - (distance / connectionDistance) * 0.7})`; // Increased line opacity
                    ctx.lineWidth = 1; // Increased line thickness
                    ctx.stroke();
                }
            }
        }

        // Loop the animation
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
});

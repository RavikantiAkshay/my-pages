document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-[#0e0e0e]/90', 'shadow-2xl');
            nav.classList.remove('bg-[#0e0e0e]/60');
        } else {
            nav.classList.remove('bg-[#0e0e0e]/90', 'shadow-2xl');
            nav.classList.add('bg-[#0e0e0e]/60');
        }
    });

    // Add staggered delay to grid items
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('reveal');
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Reveal animations on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ========== Hero Parallax (Aceternity-style) ==========
    // Exact transform values from Aceternity's HeroParallax component:
    //   rotateX:    scrollProgress [0, 0.2] → [15, 0]
    //   rotateZ:    scrollProgress [0, 0.2] → [20, 0]
    //   translateY: scrollProgress [0, 0.2] → [-700, 500]
    //   opacity:    scrollProgress [0, 0.2] → [0.2, 1]
    //   Row 1 translateX: scrollProgress [0, 1] → [0, 1000]   (slides right)
    //   Row 2 translateX: scrollProgress [0, 1] → [0, -1000]  (slides left)
    //   Row 3 translateX: scrollProgress [0, 1] → [0, -1000]  (slides left)

    const heroParallax = document.getElementById('heroParallax');
    if (heroParallax) {
        const wrapper = document.getElementById('parallaxWrapper');
        const row1 = heroParallax.querySelector('[data-row="1"]');
        const row2 = heroParallax.querySelector('[data-row="2"]');
        const row3 = heroParallax.querySelector('[data-row="3"]');
        const heroText = heroParallax.querySelector('.parallax-hero-text');
        let ticking = false;

        // Interpolation helper: maps value from [inMin, inMax] → [outMin, outMax], clamped
        function lerp(value, inMin, inMax, outMin, outMax) {
            const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
            return outMin + t * (outMax - outMin);
        }

        // Simple spring simulation for smooth follow
        const springState = {
            rotateX: 15, rotateZ: 20, translateY: -700, opacity: 0.2,
            row1X: 0, row2X: 0, row3X: 0
        };
        const springTarget = { ...springState };
        const STIFFNESS = 120;
        const DAMPING = 20;
        const springVel = {
            rotateX: 0, rotateZ: 0, translateY: 0, opacity: 0,
            row1X: 0, row2X: 0, row3X: 0
        };

        function springStep(current, target, velocity, dt) {
            const force = STIFFNESS * (target - current);
            const damping = DAMPING * velocity;
            const acceleration = force - damping;
            const newVel = velocity + acceleration * dt;
            const newVal = current + newVel * dt;
            return { value: newVal, velocity: newVel };
        }

        let lastTime = performance.now();

        function updateParallax() {
            const now = performance.now();
            const dt = Math.min((now - lastTime) / 1000, 0.064); // cap at 64ms
            lastTime = now;

            const rect = heroParallax.getBoundingClientRect();
            const containerHeight = heroParallax.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrolled = -rect.top;
            const scrollableDistance = containerHeight - viewportHeight;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

            // Set targets (Aceternity values, scaled for tight layout)
            springTarget.rotateX    = lerp(progress, 0, 0.2, 15, 0);
            springTarget.rotateZ    = lerp(progress, 0, 0.2, 20, 0);
            springTarget.translateY = lerp(progress, 0, 0.2, -600, -100); // lands slightly pulled up to avoid cutoff
            springTarget.opacity    = lerp(progress, 0, 0.2, 0.2, 1);
            springTarget.row1X      = lerp(progress, 0, 1, 0, 800);
            springTarget.row2X      = lerp(progress, 0, 1, 0, -800);
            springTarget.row3X      = lerp(progress, 0, 1, 0, -800);

            // Spring physics step for each property
            const keys = Object.keys(springState);
            for (const key of keys) {
                const result = springStep(springState[key], springTarget[key], springVel[key], dt);
                springState[key] = result.value;
                springVel[key] = result.velocity;
            }

            // Apply to DOM
            if (wrapper) {
                wrapper.style.transform = `translateY(${springState.translateY}px) rotateX(${springState.rotateX}deg) rotateZ(${springState.rotateZ}deg)`;
                wrapper.style.opacity = springState.opacity;
            }
            if (row1) row1.style.transform = `translateX(${springState.row1X}px)`;
            if (row2) row2.style.transform = `translateX(${springState.row2X}px)`;
            if (row3) row3.style.transform = `translateX(${springState.row3X}px)`;

            ticking = false;

            // Keep animating if springs haven't settled
            const isSettled = keys.every(k => Math.abs(springVel[k]) < 0.01 && Math.abs(springState[k] - springTarget[k]) < 0.01);
            if (!isSettled) {
                requestAnimationFrame(updateParallax);
            }
        }

        // Kick off animation on every scroll
        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                lastTime = performance.now();
                requestAnimationFrame(updateParallax);
            }
        }, { passive: true });

        // Initial render
        lastTime = performance.now();
        updateParallax();
    }

});

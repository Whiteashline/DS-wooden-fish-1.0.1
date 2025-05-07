document.addEventListener('DOMContentLoaded', () => {
    const woodenFish = document.getElementById('woodenFish');
    const hitSound = document.getElementById('hitSound');
    const countDisplay = document.getElementById('count');
    const effectAnchor = document.getElementById('effectAnchor'); // For positioning effects

    const skinChangeButton = document.getElementById('skinChangeButton');
    const skinSelector = document.getElementById('skinSelector');
    const skinOptions = document.querySelectorAll('.skin-option');
    const closeSkinSelectorButton = document.getElementById('closeSkinSelector');

    let count = 0;
    const STORAGE_KEY_COUNT = 'woodenFishCount';
    const STORAGE_KEY_SKIN = 'woodenFishSkin';

    // Load count from localStorage
    const savedCount = localStorage.getItem(STORAGE_KEY_COUNT);
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        countDisplay.textContent = count;
    }

    // Load skin from localStorage
    const savedSkin = localStorage.getItem(STORAGE_KEY_SKIN);
    if (savedSkin) {
        woodenFish.src = savedSkin;
    } else {
        // Set default if nothing saved (already set by HTML src, but good for clarity)
        woodenFish.src = '1746586965929.png'; 
    }


    woodenFish.addEventListener('click', () => {
        // 1. Play sound
        hitSound.currentTime = 0; // Allow rapid re-play
        hitSound.play().catch(error => console.error("Error playing sound:", error));

        // 2. Animation
        woodenFish.classList.add('hit');
        setTimeout(() => {
            woodenFish.classList.remove('hit');
        }, 100); // Duration of the hit animation scale effect

        // 3. Update count
        count++;
        countDisplay.textContent = count;
        localStorage.setItem(STORAGE_KEY_COUNT, count);

        // 4. Show "功德+1" text
        createMeritText();

        // 5. Show particle effects
        createParticles(10); // Create 10 particles
    });

    function createMeritText() {
        const meritText = document.createElement('div');
        meritText.classList.add('merit-text');
        meritText.textContent = '功德+1';
        
        // Position slightly above the center of the fish
        meritText.style.top = '-20px'; // Adjust as needed relative to effectAnchor
        meritText.style.left = '50%'; // Centered horizontally relative to effectAnchor
        // The keyframes will handle translateX(-50%)

        effectAnchor.appendChild(meritText);

        setTimeout(() => {
            meritText.remove();
        }, 1000); // Match animation duration
    }

    function createParticles(amount) {
        for (let i = 0; i < amount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Randomize particle trajectory using CSS custom properties
            const angle = Math.random() * Math.PI * 2; // Random angle
            const distance = Math.random() * 40 + 20; // Random distance (20 to 60px)
            const translateX = Math.cos(angle) * distance;
            const translateY = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', `${translateX}px`);
            particle.style.setProperty('--ty', `${translateY}px`);
            
            // Initial position slightly randomized around the anchor center
            particle.style.left = `${Math.random() * 20 - 10}px`; // -10px to 10px offset
            particle.style.top = `${Math.random() * 20 - 10}px`;  // -10px to 10px offset

            effectAnchor.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000); // Match animation duration
        }
    }

    // Skin Changer Logic
    skinChangeButton.addEventListener('click', () => {
        skinSelector.classList.toggle('hidden');
    });

    closeSkinSelectorButton.addEventListener('click', () => {
        skinSelector.classList.add('hidden');
    });

    skinOptions.forEach(option => {
        option.addEventListener('click', () => {
            const skinFile = option.dataset.skinFile;
            woodenFish.src = skinFile;
            localStorage.setItem(STORAGE_KEY_SKIN, skinFile);
            skinSelector.classList.add('hidden'); // Hide selector after choosing
        });
    });

    // Optional: Close skin selector if clicked outside
    document.addEventListener('click', (event) => {
        if (!skinSelector.classList.contains('hidden') && 
            !skinSelector.contains(event.target) && 
            event.target !== skinChangeButton) {
            skinSelector.classList.add('hidden');
        }
    });
});

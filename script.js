document.addEventListener('DOMContentLoaded', () => {
    const muyu = document.getElementById('muyu');
    const counterElement = document.getElementById('counter');
    const audio = document.getElementById('sound');
    const skinBtn = document.getElementById('skinBtn');
    
    let count = localStorage.getItem('muyuCount') || 0;
    updateCounter();

    // 皮肤列表
    const skins = [
        '1746586965929.png',    // 沧渊诵波
        '1746588282601.png',    // 素木听潮
        'IMG_20250507_112353.png', // 蓝鲸禅心
        'IMG_20250507_112715.png'  // 木韵鲸鸣
    ];
    let currentSkin = 0;

    // 木鱼点击事件
    muyu.addEventListener('click', () => {
        count++;
        updateCounter();
        playAnimation();
        playSound();
        createParticles();
        saveCount();
    });

    // 换肤功能
    skinBtn.addEventListener('click', () => {
        currentSkin = (currentSkin + 1) % skins.length;
        muyu.src = skins[currentSkin];
    });

    function updateCounter() {
        counterElement.textContent = count;
    }

    function playAnimation() {
        muyu.classList.add('hit-animation');
        setTimeout(() => {
            muyu.classList.remove('hit-animation');
        }, 100);
    }

    function playSound() {
        audio.currentTime = 0;
        audio.play().catch(error => console.log('音频播放被阻止:', error));
    }

    function createParticles() {
        const counterRect = counterElement.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.left = `${counterRect.left + 30 + Math.random() * 20}px`;
            particle.style.top = `${counterRect.top - 10}px`;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    function saveCount() {
        localStorage.setItem('muyuCount', count);
    }
});

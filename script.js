class Muyu {
    constructor() {
        this.count = localStorage.getItem('muyuCount') || 0;
        this.skins = [
            '1746586965929.png',
            '1746588282601.png',
            'IMG_20250507_112353.png',
            'IMG_20250507_112715.png'
        ];
        this.currentSkin = 0;
        this.init();
    }

    init() {
        this.muyu = document.getElementById('muyu');
        this.counter = document.getElementById('count');
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.audio = new Audio('assets/audio/5月7日 下午12点20分.m4a');
        
        this.setupEventListeners();
        this.updateCounter();
        this.resizeCanvas();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        this.muyu.addEventListener('click', () => this.tap());
        document.getElementById('skinBtn').addEventListener('click', () => this.changeSkin());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    tap() {
        this.count++;
        this.updateCounter();
        this.playAnimation();
        this.audio.currentTime = 0;
        this.audio.play();
        this.createParticles();
        localStorage.setItem('muyuCount', this.count);
    }

    updateCounter() {
        this.counter.textContent = this.count;
    }

    playAnimation() {
        this.muyu.style.transform = 'translate(-50%, -50%) scale(0.95)';
        setTimeout(() => {
            this.muyu.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    }

    changeSkin() {
        this.currentSkin = (this.currentSkin + 1) % this.skins.length;
        this.muyu.style.backgroundImage = `url(assets/images/${this.skins[this.currentSkin]})`;
    }

    createParticles() {
        const particles = [];
        for(let i = 0; i < 15; i++) {
            particles.push({
                x: this.muyu.offsetLeft + this.muyu.offsetWidth/2,
                y: this.muyu.offsetTop + this.muyu.offsetHeight/2,
                radius: Math.random() * 4 + 2,
                alpha: 1,
                vy: Math.random() * -5 - 3
            });
        }

        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            particles.forEach(p => {
                p.y += p.vy;
                p.alpha -= 0.02;
                
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 150, 255, ${p.alpha})`;
                this.ctx.fill();
            });

            if(particles.some(p => p.alpha > 0)) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

// 初始化
window.addEventListener('load', () => new Muyu());

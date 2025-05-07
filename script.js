// 初始化变量
let count = 0;
let currentSkin = 'skin1.png';
const woodenFish = document.getElementById('wooden-fish');
const counter = document.getElementById('counter');
const skinSelector = document.getElementById('skin-selector');
const skinMenu = document.getElementById('skin-menu');

// 加载音效
const sound = new Howl({
    src: ['assets/audio/knock.m4a'],
    volume: 0.7
});

// 从本地存储加载计数
function loadCount() {
    const savedCount = localStorage.getItem('woodenFishCount');
    if (savedCount) {
        count = parseInt(savedCount);
        counter.textContent = `功德: ${count}`;
    }
}

// 保存计数到本地存储
function saveCount() {
    localStorage.setItem('woodenFishCount', count.toString());
}

// 创建粒子效果
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = '功德+1';
    
    // 随机位置
    const x = Math.random() * 200 - 100;
    particle.style.left = `calc(50% + ${x}px)`;
    particle.style.top = '50%';
    
    document.getElementById('container').appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// 点击木鱼事件
function tapWoodenFish() {
    // 播放音效
    sound.play();
    
    // 增加计数
    count++;
    counter.textContent = `功德: ${count}`;
    
    // 保存计数
    saveCount();
    
    // 创建粒子效果
    createParticle();
    
    // 添加点击动画
    woodenFish.style.transform = 'scale(0.95)';
    setTimeout(() => {
        woodenFish.style.transform = 'scale(1)';
    }, 100);
}

// 更换皮肤
function changeSkin(skin) {
    currentSkin = skin;
    woodenFish.style.backgroundImage = `url('assets/images/skins/${skin}')`;
    localStorage.setItem('woodenFishSkin', skin);
}

// 初始化应用
function init() {
    // 加载计数
    loadCount();
    
    // 加载皮肤
    const savedSkin = localStorage.getItem('woodenFishSkin');
    if (savedSkin) {
        currentSkin = savedSkin;
    }
    woodenFish.style.backgroundImage = `url('assets/images/skins/${currentSkin}')`;
    
    // 设置点击事件
    woodenFish.addEventListener('click', tapWoodenFish);
    
    // 皮肤选择器事件
    skinSelector.addEventListener('click', () => {
        skinMenu.style.display = skinMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // 皮肤选项事件
    document.querySelectorAll('.skin-option').forEach(option => {
        option.style.backgroundImage = `url('assets/images/skins/${option.dataset.skin}')`;
        option.addEventListener('click', () => {
            changeSkin(option.dataset.skin);
            skinMenu.style.display = 'none';
        });
    });
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);

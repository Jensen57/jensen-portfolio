// 鼠标移动轨迹特效 - 粒子动画特效
const particles = [];
const maxParticles = 50;
let mouseMoveTimer;

// 监听鼠标移动事件
document.addEventListener('mousemove', (e) => {
    // 清除之前的定时器
    clearTimeout(mouseMoveTimer);
    
    // 创建新的粒子
    if (particles.length < maxParticles) {
        const particle = {
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 10 + 5,
            speedX: (Math.random() - 0.5) * 3,
            speedY: (Math.random() - 0.5) * 3,
            opacity: 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100 + 155)}, 1)`
        };
        particles.push(particle);
    }
    
    // 清除旧的粒子元素
    document.querySelectorAll('.particle').forEach(el => el.remove());
    
    // 更新和绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // 更新粒子位置
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 更新粒子透明度
        particle.opacity -= 0.02;
        
        // 创建粒子元素
        const particleEl = document.createElement('div');
        particleEl.className = 'particle';
        particleEl.style.left = particle.x + 'px';
        particleEl.style.top = particle.y + 'px';
        particleEl.style.width = particle.size + 'px';
        particleEl.style.height = particle.size + 'px';
        particleEl.style.backgroundColor = particle.color;
        particleEl.style.opacity = particle.opacity;
        document.body.appendChild(particleEl);
        
        // 移除透明度为0的粒子
        if (particle.opacity <= 0) {
            particles.splice(i, 1);
        }
    }
    
    // 设置鼠标停止移动的定时器
    mouseMoveTimer = setTimeout(() => {
        // 平滑移除所有粒子
        const removeParticles = setInterval(() => {
            if (particles.length === 0) {
                clearInterval(removeParticles);
                return;
            }
            
            // 清除旧的粒子元素
            document.querySelectorAll('.particle').forEach(el => el.remove());
            
            // 更新所有粒子的透明度
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                particle.opacity -= 0.05;
                
                // 创建粒子元素
                const particleEl = document.createElement('div');
                particleEl.className = 'particle';
                particleEl.style.left = particle.x + 'px';
                particleEl.style.top = particle.y + 'px';
                particleEl.style.width = particle.size + 'px';
                particleEl.style.height = particle.size + 'px';
                particleEl.style.backgroundColor = particle.color;
                particleEl.style.opacity = particle.opacity;
                document.body.appendChild(particleEl);
                
                // 移除透明度为0的粒子
                if (particle.opacity <= 0) {
                    particles.splice(i, 1);
                }
            }
        }, 50);
    }, 100); // 100ms无移动判定阈值
});

// 滚动渐入渐出效果
const fadeElements = document.querySelectorAll('.about-section, .projects-section, .skills-section');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.classList.add('fade-in');
    fadeInObserver.observe(element);
});

// 弹窗功能
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const projectLinks = document.querySelectorAll('.project-link');

// 打开弹窗
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        
        // 10秒后自动关闭
        setTimeout(() => {
            modal.style.display = 'none';
        }, 10000);
    });
});

// 关闭弹窗
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 点击弹窗外部关闭
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 照片切换功能 - 简单淡入淡出效果
const prevBtn = document.querySelector('.gallery-btn.prev');
const nextBtn = document.querySelector('.gallery-btn.next');
const imageSlides = document.querySelectorAll('.image-slide');
const photoDescription = document.querySelector('.photo-description');
const photoCaption = document.getElementById('photo-caption');

let currentIndex = 0;
const totalSlides = imageSlides.length;

// 照片短文案数组，与照片顺序对应
const photoDescriptions = ['Travel', '大帅哥', 'Blue Hour', '白月光'];

// 照片详细描述数组，与照片顺序对应
const photoCaptions = [
    '人生第一次出去旅游，很喜欢这张图，于是一直当作自己的手机壁纸',
    '我去！谁这么帅？别疑惑，这真是我，当然也是我的理想型哈哈哈哈',
    '无奖竞猜这是哪？没错，永远喜欢什刹海每一个moment，这还是第一次来北京时候拍的，甚是怀念',
    '爱花人士看到这些已经走不动道了好吗，洁白的月季就像白月光。'
];

// 初始化照片显示
function initSlides() {
    imageSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(0)';
        slide.style.zIndex = '0';
        
        if (index === currentIndex) {
            slide.classList.add('active');
            slide.style.opacity = '1';
            slide.style.zIndex = '2';
        }
    });
    
    // 更新文案和详细描述
    photoDescription.textContent = photoDescriptions[currentIndex];
    photoCaption.textContent = photoCaptions[currentIndex];
}

// 切换到下一张照片
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    initSlides();
}

// 切换到上一张照片
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    initSlides();
}

// 绑定按钮事件
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// 添加图片点击切换功能
const imageWrapper = document.querySelector('.image-wrapper');
imageWrapper.addEventListener('click', (e) => {
    const rect = imageWrapper.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const wrapperWidth = rect.width;
    
    // 点击左侧30%区域切换到上一张
    if (clickX < wrapperWidth * 0.3) {
        prevSlide();
    }
    // 点击右侧30%区域切换到下一张
    else if (clickX > wrapperWidth * 0.7) {
        nextSlide();
    }
});

// 初始化
initSlides();

// 菜单切换功能
const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
menuToggle.addEventListener('click',()=>{
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// 作品筛选功能
const filterButtons=document.querySelectorAll('.filter-btn');
const projectCards=document.querySelectorAll('.project-card');
filterButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        filterButtons.forEach(btn=>btn.classList.remove('active'));
        button.classList.add('active');
        const filter=button.getAttribute('data-filter');
        projectCards.forEach(card=>{
            if(filter==='all'||card.getAttribute('data-category')===filter){
                card.style.display='block';
                card.style.animation='fadeIn 0.6s ease-out';
            }else{
                card.style.display='none';
            }
        });
    });
});

// 平滑滚动效果
const navAnchor=document.querySelectorAll('.nav-links a');
navAnchor.forEach(anchor=>{
    anchor.addEventListener('click',(e)=>{
        e.preventDefault();
        const targetId=anchor.getAttribute('href');
        const targetElement=document.querySelector(targetId);
        window.scrollTo({
            top:targetElement.offsetTop-80,
            behavior:'smooth'
        });
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// 导航栏滚动效果
window.addEventListener('scroll',()=>{
    const navbar=document.querySelector('.navbar');
    if(window.scrollY>50){
        navbar.style.boxShadow='0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding='10px 0';
    }else{
        navbar.style.boxShadow='0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding='15px 0';
    }
});

// 页面加载动画
window.addEventListener('load',()=>{
    document.body.style.opacity='1';
});

// 技能标签悬停效果
const skillTags=document.querySelectorAll('.skill-tag');
skillTags.forEach(tag=>{
    tag.addEventListener('mouseenter',()=>{
        tag.style.transform='translateY(-3px)';
    });
    tag.addEventListener('mouseleave',()=>{
        tag.style.transform='translateY(0)';
    });
});

// 项目卡片悬停效果
const projectCardsHover=document.querySelectorAll('.project-card');
projectCardsHover.forEach(card=>{
    card.addEventListener('mouseenter',()=>{
        card.style.transform='translateY(-8px)';
    });
    card.addEventListener('mouseleave',()=>{
        card.style.transform='translateY(0)';
    });
});

// 滚动时元素动画
const observerOptions={threshold:0.1,rootMargin:'0px 0px -50px 0px'};
const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.animation='fadeIn 0.8s ease-out';
        }
    });
},observerOptions);

// 观察需要动画的元素
const animateElements=document.querySelectorAll('.about-section, .projects-section, .skills-section');
animateElements.forEach(element=>{
    observer.observe(element);
});
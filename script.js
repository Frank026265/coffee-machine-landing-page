// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 微信二维码弹窗功能
const modal = document.getElementById('qrModal');
const closeBtn = document.querySelector('.modal-close');

// 打开弹窗
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 所有购买按钮点击事件
const ctaButtons = document.querySelectorAll('.cta-button-nav, .product-cta, .banner-cta, .footer-cta');
ctaButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

// 关闭按钮点击事件
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// 点击弹窗背景关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// 产品卡片滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为产品卡片和评论卡片添加动画
const animateElements = document.querySelectorAll('.product-card, .review-card, .feature-card');
animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Banner CTA 滚动到产品区域
const bannerCta = document.querySelector('.banner-cta');
if (bannerCta) {
    bannerCta.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止触发弹窗
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// 产品卡片悬停效果增强
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const badge = card.querySelector('.product-badge');
        if (badge) {
            badge.style.transform = 'scale(1.1)';
            badge.style.transition = 'transform 0.2s ease';
        }
    });

    card.addEventListener('mouseleave', () => {
        const badge = card.querySelector('.product-badge');
        if (badge) {
            badge.style.transform = 'scale(1)';
        }
    });
});

// 按钮涟漪效果
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 为所有按钮添加涟漪效果
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// 添加涟漪效果样式
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// 页面加载完成后的入场动画
window.addEventListener('load', () => {
    const bannerContent = document.querySelector('.banner-content');

    if (bannerContent) {
        bannerContent.style.opacity = '0';
        bannerContent.style.transform = 'translateY(30px)';
        bannerContent.style.transition = 'all 1s ease';

        setTimeout(() => {
            bannerContent.style.opacity = '1';
            bannerContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

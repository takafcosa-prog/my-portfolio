document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('page-container');
    
    // パララックス係数(pFactor)は不要になりますが、コード修正を最小限にするため残しておいても無害です
    const circles = [
        { el: document.querySelector('.circle-1'), phase: 0,   range: 20 },
        { el: document.querySelector('.circle-2'), phase: 2,   range: 15 },
        { el: document.querySelector('.circle-3'), phase: 4,   range: 10 },
        { el: document.querySelector('.circle-4'), phase: 1,   range: 25 },
        { el: document.querySelector('.circle-5'), phase: 3,   range: 18 },
        { el: document.querySelector('.circle-6'), phase: 5,   range: 20 },
        { el: document.querySelector('.circle-7'), phase: 0.5, range: 12 }
    ];

    if (!pageContainer || !circles[0].el) return;

    let lastScrollPos = pageContainer.scrollTop;
    let currentScrollPos = pageContainer.scrollTop;
    let time = 0;
    let scrollTimeout = null;

    // --- スクロールイベント（形を変えるための判定のみに使用） ---
    pageContainer.addEventListener('scroll', () => {
        currentScrollPos = pageContainer.scrollTop;
        
        const direction = currentScrollPos > lastScrollPos ? 'down' : 'up';
        
        if (direction === 'down') {
            document.body.classList.add('is-scrolling-down');
            document.body.classList.remove('is-scrolling-up');
        } else {
            document.body.classList.add('is-scrolling-up');
            document.body.classList.remove('is-scrolling-down');
        }

        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling-down');
            document.body.classList.remove('is-scrolling-up');
        }, 150);

        lastScrollPos = currentScrollPos;
    });

    // --- アニメーションループ ---
    function animate() {
        time += 0.03; 

        circles.forEach(circle => {
            if(circle.el) {
                // ★修正点: scroll位置を使った移動計算 (parallaxY) を削除しました

                // ゆらゆら移動のみ計算
                const floatY = Math.sin(time + circle.phase) * circle.range;

                // これでスクロールしても位置が変わらず、その場でゆらゆらするだけになります
                circle.el.style.transform = `translate3d(0, ${floatY}px, 0)`;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});
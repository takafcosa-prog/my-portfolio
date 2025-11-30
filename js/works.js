document.addEventListener('DOMContentLoaded', () => {

    const worksGrid = document.getElementById('works-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!worksGrid) {
        console.error("Works Grid Element not found.");
        return; 
    }

    const worksItems = worksGrid.children;
    const totalItems = worksItems.length;

    if (totalItems === 0) {
        console.warn("No Works Items found.");
        return;
    }
    
    let currentIndex = 0; 
    
    // ----------------------------------------------------
    // 1. 作品の表示状態を更新する関数 (メインロジック)
    // ----------------------------------------------------
    function updateCarousel() {
        // 全てのアイテムを非表示にする
        for (let i = 0; i < totalItems; i++) {
            worksItems[i].classList.remove('is-active');
        }
        
        // 現在のインデックスのアイテムを表示する
        worksItems[currentIndex].classList.add('is-active');

        // ボタンの有効/無効を切り替える
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex === totalItems - 1;
        }
    }

    // ----------------------------------------------------
    // 2. イベントリスナーと初期化
    // ----------------------------------------------------
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel(); 
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel(); 
            }
        });
    }

    // ページロード時に最初の作品を表示する
    updateCarousel(); 

});
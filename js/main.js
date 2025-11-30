const header = document.getElementById('page-header');
const footer = document.getElementById('page-footer');
const pageContainer = document.getElementById('page-container');

let lastScroll = 0;

pageContainer.addEventListener('scroll', () => {
    const currentScroll = pageContainer.scrollTop; 
    
    // ヘッダーが表示・非表示を切り替えるための閾値（例: 80px）
    // Heroセクションを過ぎてから機能するようにします。
    const scrollThreshold = 80;

    // 現在の位置が閾値を超えているか
    const isBeyondHero = currentScroll > scrollThreshold;

    // スクロールの方向を判定 (下にスクロールしているか？)
    const isScrollingDown = currentScroll > lastScroll;

    // -----------------------------------------------------
    // 1. 下にスクロールしている時 (isScrollingDown = true)
    // -----------------------------------------------------
    if (isScrollingDown) {
        // Heroセクションを過ぎたら非表示にする
        if (isBeyondHero) {
            header.classList.add('is-hidden');
        }
    } 
    // -----------------------------------------------------
    // 2. 上にスクロールしている時 (isScrollingDown = false)
    // -----------------------------------------------------
    else {
        // 上にスクロールしたら表示する
        header.classList.remove('is-hidden');
    }

    // -----------------------------------------------------
    // 3. その他、スクロールが最上部（Heroセクション）の時
    // -----------------------------------------------------
    if (currentScroll <= 0) {
        // 最上部にいる時は常に表示
        header.classList.remove('is-hidden');
    }
    
    // 現在のスクロール位置を次のイベントのために保存
    lastScroll = currentScroll;
});
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    if (!carousel || !prev || !next) return; 

    const intervalTime = 3000; 

    // 動態取得捲動寬度 (一張圖片的寬度 + 間距)
    const getScrollAmount = () => {
        const firstImg = carousel.querySelector('img');
        return firstImg ? firstImg.clientWidth + 20 : 270; 
    };

    // 手動點擊：左
    prev.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        resetAutoScroll();
    });

    // 手動點擊：右
    next.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        resetAutoScroll();
    });

    // 自動滑動邏輯
    const startAutoScroll = () => {
        return setInterval(() => {
            const amount = getScrollAmount();
            // 檢查是否到底了，到底就回開頭
            if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 5) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: amount, behavior: 'smooth' });
            }
        }, intervalTime);
    };

    let autoScroll = startAutoScroll();

    function resetAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = startAutoScroll();
    }
});
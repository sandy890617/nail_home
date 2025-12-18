document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    const scrollAmount = 220; 
    const intervalTime = 3000; 

    // 手動滑動
    prev.addEventListener('click', () => {
        carousel.scrollLeft -= scrollAmount;
        resetAutoScroll();
    });

    next.addEventListener('click', () => {
        carousel.scrollLeft += scrollAmount;
        resetAutoScroll();
    });

    // 自動滑動
    let autoScroll = setInterval(() => {
        carousel.scrollLeft += scrollAmount;

        if(carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
            carousel.scrollLeft = 0;
        }
    }, intervalTime);

    function resetAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            carousel.scrollLeft += scrollAmount;
            if(carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
                carousel.scrollLeft = 0;
            }
        }, intervalTime);
    }
});

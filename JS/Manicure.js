document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('previewModal');
    const modalImg = document.getElementById('modalImg');
    const modalText = document.getElementById('modalText');
    const modalContent = document.querySelector('.modal-content');

    console.log("modal:", modal);
    console.log("modal-content:", modalContent);
    console.log("color items:", document.querySelectorAll('.color-item'));

    // 點作品 → 開啟 modal
    document.querySelectorAll('.color-item').forEach(item => {
        item.addEventListener('click', () => {
            modalImg.src = item.querySelector('img').src;
            modalText.innerText = item.querySelector('p').innerText;
            modal.style.display = "flex";
        });
    });

    // 點背景 → 關閉
    modal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // 點內容不關閉
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

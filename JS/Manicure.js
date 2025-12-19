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


/**
 * 價目表分頁切換功能
 * @param {Event} evt - 點擊事件
 * @param {string} tabId - 欲顯示的區塊 ID
 */
function openTab(evt, tabId) {
    // 1. 取得所有內容區塊並隱藏
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => {
        content.classList.remove("active");
    });

    // 2. 取得所有按鈕並移除 active 狀態
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    // 3. 顯示目前被點擊的內容，並幫該按鈕加上 active
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add("active");
    }
    evt.currentTarget.classList.add("active");
}

/* 作品集 */

function switchGallery(evt, tabId) {
    // 隱藏所有作品區內容
    const contents = document.querySelectorAll(".gallery-content");
    contents.forEach(content => content.classList.remove("active"));

    // 取消所有按鈕的 active 狀態
    const buttons = document.querySelectorAll(".gallery-tab-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    // 顯示當前點擊的作品區，並標記按鈕
    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

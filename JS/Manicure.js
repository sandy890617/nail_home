document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('previewModal');
    const modalImg = document.getElementById('modalImg');
    const modalText = document.getElementById('modalText');
    const modalContent = document.querySelector('.modal-content');

    // 點作品小卡 → 開啟放大預覽
    // 使用事件委託或重新綁定，確保切換分頁後點擊依然有效
    function bindGalleryEvents() {
        document.querySelectorAll('.color-item').forEach(item => {
            // 先移除舊的監聽器避免重複綁定
            item.onclick = function() {
                modalImg.src = item.querySelector('img').src;
                modalText.innerText = item.querySelector('p').innerText;
                modal.style.display = "flex";
                document.body.style.overflow = "hidden"; // 開啟時禁止背景捲動
            };
        });
    }

    bindGalleryEvents();

    // 點擊黑色背景 → 關閉預覽
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-btn')) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // 恢復捲動
        }
    });

    // 點擊內容區塊不關閉
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

/**
 * 價目表分頁切換 (手部/足部/其他)
 */
function openTab(evt, tabId) {
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => content.classList.remove("active"));

    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add("active");
    }
    evt.currentTarget.classList.add("active");
}

/**
 * 作品集分頁切換 (單色/貓眼/鏡面...)
 * 修正重點：確保所有 gallery-content (包含單色) 都有被納入控制
 */
function switchGallery(evt, tabId) {
    // 1. 取得所有帶有 gallery-content 類別的區塊
    const contents = document.querySelectorAll(".gallery-content");
    
    // 2. 隱藏所有作品區塊
    contents.forEach(content => {
        content.classList.remove("active");
        // 額外確保 display 狀態正確
        content.style.display = "none"; 
    });

    // 3. 取消所有按鈕的 active 狀態
    const buttons = document.querySelectorAll(".gallery-tab-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    // 4. 顯示目標區塊
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add("active");
        targetContent.style.display = "block"; // 強制顯示
    }

    // 5. 標記當前按鈕
    evt.currentTarget.classList.add("active");
}

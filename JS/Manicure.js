document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('previewModal');
    const modalImg = document.getElementById('modalImg');
    const modalText = document.getElementById('modalText');
    const counter = document.getElementById('imageCounter');
    const thumbList = document.getElementById('thumbList');
    
    let currentImgArray = []; 
    let currentIndex = 0;     

    // 1. 綁定所有作品小卡的點擊事件
    function bindGalleryEvents() {
        document.querySelectorAll('.color-item').forEach(item => {
            item.addEventListener('click', function() {
                // 取得 data-images 屬性
                const imagesStr = item.getAttribute('data-images');
                
                // 如果有設定 data-images 就拆分，否則就只拿目前這張圖的路徑
                if (imagesStr) {
                    currentImgArray = imagesStr.split(',').map(s => s.trim());
                } else {
                    currentImgArray = [item.querySelector('img').src];
                }
                
                currentIndex = 0; 
                modalText.innerText = item.querySelector('p').innerText;
                
                renderThumbnails(); // 渲染右側縮圖
                updateModal();      // 更新大圖內容
                
                modal.style.display = "flex";
                document.body.style.overflow = "hidden"; // 禁止背景捲動
            });
        });
    }

    // 2. 在右側動態生成縮圖列表
    function renderThumbnails() {
        thumbList.innerHTML = ''; // 清空舊縮圖
        
        currentImgArray.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('thumb-item');
            
            // 點擊縮圖切換主圖
            img.onclick = (e) => {
                e.stopPropagation(); // 防止觸發關閉 Modal
                currentIndex = index;
                updateModal();
            };
            
            thumbList.appendChild(img);
        });
    }

    // 3. 更新大圖與縮圖的選中狀態
    function updateModal() {
        // 更新主圖路徑
        modalImg.src = currentImgArray[currentIndex];
        
        // 更新頁碼 (1/3)
        counter.innerText = `${currentIndex + 1} / ${currentImgArray.length}`;
        
        // 更新縮圖的 Active 狀態
        const thumbs = thumbList.querySelectorAll('.thumb-item');
        thumbs.forEach((t, idx) => {
            if (idx === currentIndex) {
                t.classList.add('active');
                t.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                t.classList.remove('active');
            }
        });
    }

    // 4. 初始化執行
    bindGalleryEvents();

    // 5. 點擊 Modal 黑色背景或關閉按鈕時關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-btn')) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // 恢復捲動
        }
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
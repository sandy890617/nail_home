function openModal(name, price, desc, img) {
        document.getElementById('modalTitle').innerText = name;
        document.getElementById('modalPrice').innerText = price;
        document.getElementById('modalDesc').innerText = desc;
        document.getElementById('modalImg').src = img;
        document.getElementById('modalOverlay').style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    }
// 1. Sesi Çalan Fonksiyon
function playSound(e) {
    let keyCode;
    
    // Eğer olay bir 'keydown' (klavye) ise e.keyCode'u al
    // Eğer olay bir 'click' (mouse) ise tıklanan elementin data-key özelliğini al
    if (e.type === 'keydown') {
        keyCode = e.keyCode;
    } else {
        // Tıklanan elementin kendisi veya ebeveyni (harf veya yazıya tıklanırsa) üzerinden data-key'i bul
        const keyDiv = e.target.closest('.key');
        if (!keyDiv) return; // Boşluğa tıklandıysa dur
        keyCode = keyDiv.getAttribute('data-key');
    }

    // İlgili ses dosyasını ve kutuyu seç
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return; // Eşleşen ses yoksa fonksiyonu durdur

    audio.currentTime = 0; // Sesi başa sar (Art arda basabilmek için)
    audio.play(); // Sesi çal

    // CSS animasyonunu tetikleyen sınıfı ekle
    key.classList.add('playing');
}

// 2. Animasyonu Bitiren Fonksiyon
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // Sadece transform işlemi bitince çalış
    this.classList.remove('playing'); // Efekti kaldır
}

// 3. Olay Dinleyicileri (Event Listeners)

// Tüm tuşları seç
const keys = document.querySelectorAll('.key');

// Her bir tuş için animasyon bitişini dinle
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    // Mouse tıklamasını dinle (Bonus: Tıklama özelliği)
    key.addEventListener('click', playSound);
});

// Klavye basışını dinle
window.addEventListener('keydown', playSound);
function scrollToNextScreen() {
    document.getElementById('screen2').scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        // Scroll down
        document.getElementById('screen2').scrollIntoView({ behavior: 'smooth' });
    } else if (event.deltaY < 0) {
        // Scroll up
        document.getElementById('screen1').scrollIntoView({ behavior: 'smooth' });
    }
});

const textbox = document.getElementById('textbox');
const toggleLangBtn = document.getElementById('toggleLangBtn');
const audioBtn = document.getElementById('audioBtn');
const moreBtn = document.getElementById('moreBtn');
const audioDropdown = document.getElementById('audioDropdown');
const moreDropdown = document.getElementById('moreDropdown');

let isChinese = true;
let isZoomed = false;
let isHighContrast = false;

function loadContent() {
    const filePath = isChinese ? 'resource/section_0_chinese.txt' : 'resource/section_0_english.txt';
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            textbox.innerHTML = data.replace(/\n/g, '<br>');
        });
}

toggleLangBtn.addEventListener('click', () => {
    isChinese = !isChinese;
    loadContent();
    toggleLangBtn.src = isChinese ? 'resource/toggle_language.png' : 'resource/toggle_language_eng.png';
});

audioBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleDropdown(audioDropdown);
});

moreBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleDropdown(moreDropdown);
});

function toggleDropdown(dropdown) {
    const isVisible = dropdown.style.display === 'block';
    hideAllDropdowns();
    dropdown.style.display = isVisible ? 'none' : 'block';
}

function hideAllDropdowns() {
    audioDropdown.style.display = 'none';
    moreDropdown.style.display = 'none';
}

function playAudio(language) {
    const audioFilePath = language === 'chinese' ? 'resource/序厅.m4a' : 'resource/audio_english.mp3';
    const audio = new Audio(audioFilePath);
    audio.play();
}

function toggleZoomText() {
    if (isZoomed) {
        textbox.style.fontSize = '18px'; // 恢复默认字体大小
        isZoomed = false;
    } else {
        textbox.style.fontSize = '24px'; // 放大字体
        isZoomed = true;
    }
}

function toggleHighContrast() {
    if (isHighContrast) {
        textbox.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // 恢复默认背景色
        textbox.style.color = '#000'; // 恢复默认文字颜色
        isHighContrast = false;
    } else {
        textbox.style.backgroundColor = '#000'; // 高对比度背景色
        textbox.style.color = '#fff'; // 高对比度文字颜色
        isHighContrast = true;
    }
}

function backgroundMusic() {
    const bgMusic = new Audio('resource/《诗经·周南·关雎》——诗经首篇的古老恋歌.mp3');
    bgMusic.loop = true;
    bgMusic.play();
}

// 点击页面其他部分时隐藏所有下拉菜单
document.addEventListener('click', hideAllDropdowns);

loadContent();  // 加载默认的中文内容

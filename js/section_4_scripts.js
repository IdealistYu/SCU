function scrollToNextScreen() {
    document.getElementById('screen2').scrollIntoView({ behavior: 'smooth' });
}

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
    const filePath = isChinese ? 'resource/section_4_chinese.txt' : 'resource/section_4_english.txt';
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

function playAudio(language, obj) {
    const audioFilePath = language === 'chinese' ? 'resource/第四单元 单元说明.m4a' : 'resource/第四单元单元说明.mp3';
    
    var tmpBtnText = $(obj).siblings("button").text();
    $(obj).siblings("button").text(tmpBtnText.replace("暂停","播放"));

    var btnText = $(obj).text();
    if(btnText.indexOf("播放")>=0){
        $(obj).text(btnText.replace("播放","暂停"));
        playAudioReset(audioFilePath, false);
    }else{
        $(obj).text(btnText.replace("暂停","播放"));
        pauseAudioReset();
    }
}
function playAudioReset(url, isFoop) {
    var myAudio = document.getElementById('hideMuisc');
    myAudio.src = url;
    if(isFoop){
        myAudio.loop = true;
    }else{
        myAudio.loop = false;
    }
    myAudio.play();
}
function pauseAudioReset() {
    var myAudio = document.getElementById('hideMuisc');
    myAudio.pause();
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
        textbox.style.color = '#524221'; // 恢复默认文字颜色
        isHighContrast = false;
    } else {
        textbox.style.backgroundColor = '#000'; // 高对比度背景色
        textbox.style.color = '#fff'; // 高对比度文字颜色
        isHighContrast = true;
    }
}

function backgroundMusic(obj) {
    var url = 'resource/幽兰(古琴与编钟乐团).mp3';
    var btnText = $(obj).text();
    if(btnText.indexOf("暂停")>=0){
        $(obj).text(btnText.replace("暂停",""));
        pauseAudioReset();
    }else{
        $(obj).text(btnText+"暂停");
        playAudioReset(url, true);
    }
}

// 点击页面其他部分时隐藏所有下拉菜单
document.addEventListener('click', hideAllDropdowns);

loadContent();  // 加载默认的中文内容

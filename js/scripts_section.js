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

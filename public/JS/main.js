const togglex = document.querySelector('.selectMark--x');
const toggleo = document.querySelector('.selectMark--o');
const toggle = document.getElementById('toggle');
const CPU = document.querySelector('.CPU');
const human = document.querySelector('.human');

localStorage.setItem("player-mark","x");
togglex.addEventListener('click',()=>{
    console.log('clicked x');
    if(!togglex.classList.contains('selected')){
        toggle.style.transform = "translateX(0px)";
        togglex.classList.add('selected');
        toggleo.classList.remove('selected');
    }
    localStorage.setItem("player-mark","x");
});

toggleo.addEventListener('click',()=>{
    console.log('clicked o');
    let recto = toggleo.getBoundingClientRect();
    let rectx = togglex.getBoundingClientRect();
    if(!toggleo.classList.contains('selected')){
        toggle.style.transform = `translateX(${recto.right - rectx.right}px)`;
        toggleo.classList.add('selected');
        togglex.classList.remove('selected');
    }
    localStorage.setItem("player-mark","o");
});

CPU.addEventListener('click',()=>{
    localStorage.setItem("versus","CPU");
    location.href = './HTML/game_board';
});
human.addEventListener('click',()=>{
    localStorage.setItem("versus","player");
    location.href = './HTML/game_board';
});
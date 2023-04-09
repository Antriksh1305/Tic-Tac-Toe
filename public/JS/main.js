const togglex = document.querySelector('.selectMark--x');
const toggleo = document.querySelector('.selectMark--o');
const toggle = document.getElementById('toggle');
const CPU = document.querySelector('.CPU');
const human = document.querySelector('.human');

togglex.addEventListener('click',()=>{
    console.log('clicked x');
    if(!togglex.classList.contains('selected')){
        toggle.style.transform = "translateX(0px)";
        togglex.classList.add('selected');
        toggleo.classList.remove('selected');
    }
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
});

CPU.addEventListener('click',()=>{
    location.href = './game_board';
});
human.addEventListener('click',()=>{
    location.href = './game_board';
});
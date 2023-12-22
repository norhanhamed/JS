let title = document.querySelector('.title');
let reload =  document.querySelector('.reload');
let ul =  document.querySelector('ul');

window.onload = function(){
    if(window.navigator.onLine){
        online()
    }else{
        offline()
    }
}
window.addEventListener("online" ,function(){
    online()
})
window.addEventListener("offline" ,function(){
    offline()
})

function online(){
    title.innerHTML = 'Online Now'
    title.style.color = 'green';
    ul.classList.add('hide');
    reload.classList.add('hide');
}
function offline(){
    title.innerHTML = 'Offline Now'
    title.style.color = '#666';
    ul.classList.remove('hide');
    reload.classList.remove('hide');
}
window.addEventListener("load", main);

function main(){
    document.body.style.overflow = "hidden";
    let angle = 0;
    let gear = document.querySelector(".gear");
        gear.addEventListener('wheel', function(event){
        angle += (event.deltaY > 0) ? (15) : (-15);
        console.log(angle);
        gear.style.transform =  `rotate(${angle}deg)`;
    });

}

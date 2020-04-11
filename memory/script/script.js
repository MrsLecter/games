var scoreLabel = document.getElementById("labelScore");
var actionLabel = document.getElementById("labelAction");
var actionValue = document.getElementById("actions");
var boxStorage = document.getElementById("storage");
var countTime = document.getElementById("countTime");
var box = document.getElementsByClassName("box");
var scores = document.getElementById("scores");
var imgStorage = ['🐶', '🐱', '🐰', '🐼','🐯', '🐷', '🐭', '🐹', '🐻', '🐨', '🐮', '🐸', '🐙', '🐵'];
var imageNumber = 18;
var countScore = 0;
var countActions = 0;
var cntr = 0;
let intervalCount;
let timeCount;
let tempBoxOne;
let tempBoxTwo;
let countScores = 0;
let hasFlipCardOne = false;
let hasFirstCardTwo = false;

let playerStorage;
let scoreStorage;
let timeStorage;
let timerNow = 0;

scoreLabel.onclick = function(){
	alert("It's your score!");
}
actionLabel.onclick = function(){
	alert("It's your actions!");
}
boxStorage.onclick = function(){
	let target =  event.target;


	if(target.id == "storage"){
		return;
	}
	if(target.classList.contains('twistOn')) {
		//console.log( "div target: ", event.target);
		countActions++;
		actionValue.innerHTML = countActions;
		target.classList.remove('twistOn');
		target.classList.add('twistOff');
	}else if(target.classList.contains('twistOff')){
		//console.log( "div target: ", event.target);
		countActions++;
		actionValue.innerHTML = countActions;
		target.classList.remove('twistOff');
		target.classList.add('twistOn');
		if(hasFlipCardOne){
			tempBoxTwo = target;
			toFindMatches();
		}else{
			hasFlipCardOne = true;
			tempBoxOne = target;

		}
	}


}

function toGenerateImage(){
	timerNow = 0;
	countTime.innerHTML = timerNow;
	stopGame();
	var max = 18;
	let half = 0.5;
	let firstStorage = imgStorage.sort(function(){ 
    	return Math.random()
	});
	firstStorage = firstStorage.slice(0, imageNumber/2);
	let newStorage =[];
	let secondStorage = firstStorage;
	for (i=0; i < firstStorage.length; i++) { 
		newStorage.push(firstStorage[i]);
		newStorage.push(secondStorage[i]);
	}
	for(let i = 0; i < max; i++){
		box[i].innerHTML = newStorage[i];
    }
    //write in box
    var tempEl = document.createDocumentFragment();
    while (boxStorage.children.length) {
        tempEl.appendChild(boxStorage.children[Math.floor(Math.random() * boxStorage.children.length)]);
    }
    boxStorage.appendChild(tempEl);
    //write in dataset
    for(let i = 0; i < imageNumber; i++){
    	box[i].dataset.content = box[i].innerHTML;
    	box[i].classList.add('twistOff');
    }

    	intervalCount = setInterval(function() {
		if(countScores == 9){
			//alert('End game\nYou score: '+ countScores  +'\r\nAction: '+countActions+'\r\nYour time: ' + timerNow+' s');
			toOpenWindow();
			stopGame();
		}else{
			timerNow++;
			countTime.innerHTML = timerNow;	
		}
	
		
	},1000);
}
   
function stopGame(){
	
	timerNow = 0;
	countActions = 0;
	countTime.innerHTML = timerNow;
	clearInterval(intervalCount);
	 countScores=0;
	 scores.innerHTML = countScores;
	actionValue.innerHTML = countActions;
	for(let i = 0; i < imageNumber; i++){
		box[i].classList.remove('twistOn');
		box[i].classList.add('twistOff');
    }
}

function toFindMatches(){
	if(tempBoxOne.dataset.content === tempBoxTwo.dataset.content){
		//console.log('equal');
		countScores++;
		scores.innerHTML = countScores;
	}else{		
		setTimeout(function() {
		tempBoxOne.classList.remove('twistOn');
		tempBoxOne.classList.add('twistOff');
		//console.log('notequal');

		tempBoxTwo.classList.remove('twistOn');
		tempBoxTwo.classList.add('twistOff');
		}, 500);	
	}
	hasFlipCardOne = false;
}

function getRezults(){
	for(let i = 0; i < imageNumber; i++){
		if(box[i].classList.contains('twistOff')){
			return;
		}
		
    }
}

function toCloseWindow() {
  document.getElementById("Window").style.display = "none";
}
function toOpenWindow() {
	document.getElementById("endScore").innerHTML = countScores;
	document.getElementById("endTime").innerHTML = timerNow;
	document.getElementById("endActions").innerHTML = countActions;
 	document.getElementById("Window").style.display = "block";
}
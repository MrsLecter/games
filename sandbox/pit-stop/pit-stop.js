const WHEEL_INSTALLED = 'wheelInstalled';
const TANK_FULL = 'tankFull';

/**
 * @param {Element} node
 */
function Mechanic(node) {
  this.node = node;
  this.isWheelman = this.node.classList.contains('wheelman');
  this.eventName = TANK_FULL;
  if (this.isWheelman) {
    this.eventName = WHEEL_INSTALLED;
    this.wheel = document.querySelector('.wheel:not(.taken)');
    this.wheel.classList.add('taken');
  }
  const timeout = 1000 + Math.random() * 6000;
  setTimeout(() => this.ready(), timeout);

  this.ready = function() {
    if (this.isWheelman) {
      this.wheel.classList.add('installed');
    }
    const event = new CustomEvent(this.eventName, { bubbles: true });
    this.node.dispatchEvent(event);
    if (!this.node.closest('.go')) {
      this.node.classList.add('ready');
    }
  };
}

function createMechanics() {
  document.querySelectorAll('.mechanic')
    .forEach(node => new Mechanic(node));
}

function main() {
  createMechanics();
  let isTankFull = false;
  let countWheelInstalled = 0;
  document.addEventListener(TANK_FULL, function(){
    isTankFull = true;
  });
  document.addEventListener(WHEEL_INSTALLED, function(){
    countWheelInstalled++;
    if(isTankFull && countWheelInstalled==4) document.getElementById("pit-stop").className = "go";
    
  });
  
  
}


window.addEventListener('load', main);

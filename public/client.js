var simon = {
  instructions: [],
  responses: [],
  responseNumber: 0,
  
  
  resetGameState: function() {
    view.removeEventListeners();
    this.resetResponses();
    this.resetInstructions();
    view.updateScore();
    view.setUpPlayButton();
    view.showPlay();
    setTimeout(view.resetOpacity, 50);
  },
  
  resetInstructions: function() {
    this.instructions = [];
  },
  
  resetResponses: function() {
    this.responses = [];
  },
  
  resetResponseNumber: function() {
    this.responseNumber = 0;
  },
  
  randomColor: function(){
    var colors = ['red','blue','green','yellow'];
    var randomColor = colors[Math.floor(Math.random() * 4)];
    return randomColor;
  },

  addInstruction: function(){
    var randomColor = this.randomColor();
    this.instructions.push(randomColor);
    view.updateScore();
  },
  
  addResponse: function(color){
    this.responses.push(color);
    this.playSound(color);
    
    if(this.confirmResponse() === 'lose'){
      document.getElementById('error').play();
      this.resetGameState();
      
    }else if(this.responseNumber === this.instructions.length){
      setTimeout(view.resetOpacity, 100);
      view.disableUserInput();
      this.resetResponseNumber();
      this.resetResponses();
      setTimeout(function() {
        simon.addTurn();
      }, 2000);
    }
  },
  
  confirmResponse: function(){
    var responseNumber = this.responseNumber;
    if(this.responses[responseNumber] === this.instructions[responseNumber]){
      this.responseNumber += 1;
      return true;
    }else{
      return 'lose';
    }
  },

  displayInstructions: function() {
    //highlights a button every second
      for (let i = 0; i < this.instructions.length; i++) {
        setTimeout(function () {
          view.resetOpacity();
          document.getElementById(simon.instructions[i]).style.opacity='1';
          simon.playSound(simon.instructions[i]);
        }, (i * 1000));
    }
      //turns off the button after half a second
      for (let i = 0; i < this.instructions.length; i++) {
        setTimeout(function () {
          view.resetOpacity();
        }, (i * 1000) + 500);
    }
    
  },

  playSound: function(color) {
    switch(color){
      case 'red':
        document.getElementById('redSound').play();
        break;
      case 'blue':
        document.getElementById('blueSound').play();
        break;
      case 'green':
        document.getElementById('greenSound').play();
        break;
      case 'yellow':
        document.getElementById('yellowSound').play();
        break;
    }
  },
  
  addTurn: function() {
    simon.addInstruction();
    simon.displayInstructions();
  },
  
  
};

var view = {
  //addColor and removeColor target the HTML element with the ID of the color clicked
  addColor: function(event, color){
    colorClicked = event.target;
    simon.addResponse(colorClicked.id);
    document.getElementById(colorClicked.id).style.opacity='1';
  },
  removeColor: function(event, color){
    colorClicked = event.target;
    document.getElementById(colorClicked.id).style.opacity='.5';
  },
  setUpEventListeners : function () {
    var colors = document.getElementsByClassName('color');
    for(let i = 0; i < colors.length; i++){
      colors[i].addEventListener('mousedown', view.addColor);
      colors[i].addEventListener('mouseup', view.removeColor);
    }
  },
  
  removeEventListeners : function () {
    var colors = document.getElementsByClassName('color');
    for(let i = 0; i < colors.length; i++){
      colors[i].removeEventListener('mousedown', view.addColor);
      colors[i].removeEventListener('mouseup', view.removeColor);
    }
  },
  
  disableUserInput : function () {
    view.removeEventListeners();
    var numOfInstructions = simon.instructions.length;
    var timeDisabled = (numOfInstructions * 1000) + 2000;
    setTimeout(view.setUpEventListeners, timeDisabled);
  },
  
  updateScore : function () {
    document.getElementById('score').innerHTML = simon.instructions.length;
  },
  
  hidePlay: function() {
    document.getElementById('play').style.display = "none";
  },
  showPlay: function() {
    document.getElementById('play').style.display = "inline";
  },
  setUpPlayButton: function () {
    document.getElementById('play').addEventListener('click', simon.addTurn);
    document.getElementById('play').addEventListener('click', view.setUpEventListeners);
    document.getElementById('play').addEventListener('click', view.hidePlay);
  },
  
  resetOpacity: function() {
    document.getElementById('red').style.opacity='0.5';
    document.getElementById('blue').style.opacity='0.5';
    document.getElementById('green').style.opacity='0.5';
    document.getElementById('yellow').style.opacity='0.5';
  },
  
};

view.setUpPlayButton();

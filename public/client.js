var simon = {
  instructions: [],
  response: [],
  randomColor: function(){
    var colors = ['red','blue','green','yellow'];
    var randomColor = colors[Math.floor(Math.random() * 4)];
    return randomColor;
  },

  computer: function(){
    var randomColor = this.randomColor();
    this.instructions.push(randomColor);
    
    
    var stringed = simon.instructions.join(' ');
    console.log(stringed);
    
    setTimeout(function() {
      console.clear();
      var response = prompt('What colors?');
      if(response === stringed){
        simon.computer();
      }else{
        simon.instructions = [];
        console.log('you lose!');
      }
    }, 2000 );

  },

};



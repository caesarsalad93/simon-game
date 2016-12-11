var simon = {
  instructions: [],
  response: [],
  randomColor: function(){
    var colors = ['red','blue','green','yellow'];
    var randomColor = colors[Math.floor(Math.random() * 4)];
    return randomColor;
  },

  computer: function(){
    var output = document.querySelector('h1');
    var randomColor = this.randomColor();
    this.instructions.push(randomColor);
    
    
    var stringed = simon.instructions.join(' ');
    output.innerHTML = stringed;
    
    //after 2 seconds
    setTimeout(function(){
      output.innerHTML = "";
    },1500);
    
    setTimeout(function() {
      var response = prompt('What colors?');
      console.log(output);
      if(response === stringed){
        simon.computer();
      }else{
        simon.instructions = [];
        output.innerHTML = 'You lose!';
      }
    }, 2000 );

  },

};



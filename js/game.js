'use strict';

var Game = {};

Game.Stage = document.querySelector('.stage');

Game.maxScore = 0;

Game.is1PTurn = false;

Game.players = {
  'A': {
    'score': 0,
  },
  'B': {
    'score': 0,
  },
};

Game.isSelecting = false;

Game.selectedCard = [];

Game.Card = function(val,el){
  this.value = val;
  this.element = el;
};

Game.changeTurn = function(){
  const that = this;
  if (!that.is1PTurn) {
    that.is1PTurn = true;
    document.querySelector('.box_a').classList.add('this_turn');
    document.querySelector('.box_b').classList.remove('this_turn');
  } else {
    that.is1PTurn = false;
    document.querySelector('.box_b').classList.add('this_turn');
    document.querySelector('.box_a').classList.remove('this_turn');
  }
};

Game.matchCard = function(){
  const that = this,
  val_1 = that.selectedCard[0],
  val_2 = that.selectedCard[1],
  val_1_El = val_1.element,
  val_2_El = val_2.element;

  setTimeout(() => {
    if (val_1.value === val_2.value) {
      val_1_El.classList.add('cleared');
      val_2_El.classList.add('cleared');
      
      let thisPlayer = that.is1PTurn ? that.players.A : that.players.B;
      let score = thisPlayer.score + 1;
      thisPlayer.score = score;
      document.querySelector('.this_turn .score').innerHTML = score;

      if (that.is1PTurn) {
        val_1_El.classList.add('win_a');
        val_2_El.classList.add('win_a');
      } else {
        val_1_El.classList.add('win_b');
        val_2_El.classList.add('win_b');
      }

      if (document.querySelectorAll('.cleared').length === that.maxScore) {
        setTimeout(() => {
          let player = that.is1PTurn ? 'A' : 'B';
          alert(player + "의 승리!");
        }, 500);
      }
    } else {
      val_1_El.classList.remove('reversed');
      val_2_El.classList.remove('reversed');
      setTimeout(() => {
        that.changeTurn();
      }, 500);
    }
    that.selectedCard = [];
    setTimeout(() => {
      that.isSelecting = false;
    }, 500);
  }, 500);
};

Game.makeCard = function(val){
  const that = this;

  const cardNode = document.createElement('div');
  cardNode.className = "card";
  const icon = document.createElement('span');
  icon.className = "icon icon_" + val;
  cardNode.appendChild(icon);
  that.Stage.appendChild(cardNode);

  const card = new that.Card(val, cardNode);

  cardNode.addEventListener('click', () => {
    if (!that.isSelecting) {
      const thisCard = event.currentTarget;
      if (!thisCard.classList.contains('reversed')) {
        that.isSelecting = true;
        thisCard.classList.add('reversed');
        that.selectedCard.push(card);
        setTimeout(() => {
          if (that.selectedCard.length === 2) {
            that.matchCard();
          } else {
            that.isSelecting = false;
          }
        }, 500);
      }
    }
  });
};

Game.init = function(){

  let iconList = [1,2,3,4,5,6,7,8,9];

  iconList = iconList.concat(iconList);

  iconList.sort(() => {
    return Math.random() - Math.random();
  });

  this.maxScore = iconList.length;

  for (let i of iconList) {
    this.makeCard(i);
  }

  this.changeTurn();
};

Game.init();
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
  this.icon = val;
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
  val_2 = that.selectedCard[1];

  setTimeout(function(){
    if (val_1.icon === val_2.icon) {
      let score = that.players.A.score;
      score = score + 1;
      that.players.A.score = score;
      document.querySelector('.this_turn .score').innerHTML = score;

      val_1.element.classList.add('cleared');
      val_2.element.classList.add('cleared');
      
        if (that.is1PTurn) {
          val_1.element.classList.add('win_a');
          val_2.element.classList.add('win_a');
        } else {
          val_1.element.classList.add('win_b');
          val_2.element.classList.add('win_b');
        }

      if (document.querySelectorAll('.cleared').length === that.maxScore) {
        setTimeout(function(){
          let player = 'A';
          if (!that.is1PTurn) {
            player = 'B'
          }
          alert(player + "의 승리!");
        }, 500);
      }
    } else {
      val_1.element.classList.remove('reversed');
      val_2.element.classList.remove('reversed');
      that.changeTurn();
    }
    that.selectedCard = [];
    setTimeout(function(){
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
        setTimeout(function(){
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
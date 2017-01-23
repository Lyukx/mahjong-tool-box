function getTileKind(){
  var $radios = $('[name="tile-kind"]');
  return $radios.filter(':checked').val();
}

function getTileTarget(){
  var $radios = $('[name="tile-target"]');
  return $radios.filter(':checked').val();
}

function getKind(tile){
  if(tile < 10){
    return 'm';
  }
  else if(tile < 20){
    return 'p';
  }
  else if(tile < 30){
    return 's';
  }
  else{
    return 'z';
  }
}

function getNum(tile){
  return tile % 10;
}

function isValidMentu(mentu){
  mentu = mentu.sort(sortNumber);
  if(mentu.length == 4){
    if(mentu[0] == mentu[1] && mentu[1] == mentu[2] && mentu[2] == mentu[3]){
      return true;
    }
    else{
      return false;
    }
  }
  else if(mentu.length == 3){
    if(mentu[0] == mentu[1] && mentu[1] == mentu[2]){
      return true;
    }
    else if(mentu[0] + 1 == mentu[1] && mentu[1] + 1 == mentu[2]){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}

function sortNumber(a, b){
  return a - b;
}

var hand = [];
var fuuro = [];
var ankan = [];
var fuuroTemp = [];
var agari = -1;
var basket = new Array(40);
for(var i = 0; i < basket.length; i++){
  basket[i] = 0;
}

$('#result').hide();
$('#special-keyboard').hide();

function addTile(kind, target, num){
  if(kind == 30 && num > 7){
    return -1;
  }
  if(ankan.length > 3 && target == '2'){
    return -1;
  }
  var tileId = parseInt(num) + parseInt(kind);
  if(target == 2){
    if(basket[tileId] != 0){
      return -1;
    }
    else{
      basket[tileId] = 4;
    }
  }
  else{
    if(basket[tileId] > 3){
      return -1;
    }
    else{
      basket[tileId]++;
    }
  }
  if(ankan.length * 3 + fuuro.length * 3 + hand.length == 13){
    agari = tileId;
    renewDisplay();
    return 1;
  }
  if(target == 0){
    fuuroTemp = [];
    hand.push(tileId);
    $('[name="display-0"]').append('<img src="images/mahjong/p_' + getKind(tileId) + 's' + getNum(tileId) + '_0.gif">');
  }
  else if(target == 1){
    if(fuuroTemp.length == 0){
      $('[name="display-1"]').empty();
    }
    fuuroTemp.push(tileId);
    $('[name="display-1"]').append('<img src="images/mahjong/p_' + getKind(tileId) + 's' + parseInt(num) + '_0.gif">');
  }
  else if(target == 2){
    if(ankan.length * 3 + fuuro.length * 3 + hand.length > 10){
      if(ankan.length * 3 + fuuro.length * 3 + hand.length == 11){
        agari = hand[hand.length - 1];
        hand.pop();
      }
      else{
        return -1;
      }
    }
    fuuroTemp = [];
    var ankanTemp = [];
    var number = tileId;
    ankanTemp.push(number, number, number, number);
    ankan.push(ankanTemp);
    renewDisplay();
  }
  return 1;
}

function fuuroSubmit(){
  if(isValidMentu(fuuroTemp) == true && ankan.length * 3 + fuuro.length * 3 + hand.length < 11){
    fuuro.push(fuuroTemp);
  }
  fuuroTemp = [];
  renewDisplay();
}

function renewDisplay(target){
  $('[name="display-0"]').empty();
  $('[name="display-1"]').empty();
  $('[name="display-2"]').empty();
  //hand.sort(sortNumber);
  for(var i = 0; i < hand.length; i++){
    $('[name="display-0"]').append('<img src="images/mahjong/p_' + getKind(hand[i]) + 's' + getNum(hand[i]) + '_0.gif">');
  }
  for(var i = 0; i < fuuro.length; i++){
    $('[name="display-1"]').append('<img src="images/mahjong/p_' + getKind(fuuro[i][0]) + 's' + getNum(fuuro[i][0]) + '_3.gif">');
    for(var j = 1; j < fuuro[i].length; j++){
      $('[name="display-1"]').append('<img src="images/mahjong/p_' + getKind(fuuro[i][j]) + 's' + getNum(fuuro[i][j]) + '_1.gif">');
    }
  }
  for(var i = 0; i < ankan.length; i++){
    $('[name="display-2"]').append('<img src="images/mahjong/p_bk_1.gif">');
    $('[name="display-2"]').append('<img src="images/mahjong/p_' + getKind(ankan[i][0]) + 's' + getNum(ankan[i][0]) + '_1.gif">');
    $('[name="display-2"]').append('<img src="images/mahjong/p_' + getKind(ankan[i][0]) + 's' + getNum(ankan[i][0]) + '_1.gif">');
    $('[name="display-2"]').append('<img src="images/mahjong/p_bk_1.gif">');
  }
  if(agari != -1){
    $('[name="display-0"]').append('<img src="images/mahjong/p_' + getKind(agari) + 's' + getNum(agari) + '_3.gif">');
  }
}

$('.tile-1').click(function () {
  addTile(getTileKind(), getTileTarget(), 1);
});
$('.tile-2').click(function () {
  addTile(getTileKind(), getTileTarget(), 2);
});
$('.tile-3').click(function () {
  addTile(getTileKind(), getTileTarget(), 3);
});
$('.tile-4').click(function () {
  addTile(getTileKind(), getTileTarget(), 4);
});
$('.tile-5').click(function () {
  addTile(getTileKind(), getTileTarget(), 5);
});
$('.tile-6').click(function () {
  addTile(getTileKind(), getTileTarget(), 6);
});
$('.tile-7').click(function () {
  addTile(getTileKind(), getTileTarget(), 7);
});
$('.tile-8').click(function () {
  addTile(getTileKind(), getTileTarget(), 8);
});
$('.tile-9').click(function () {
  addTile(getTileKind(), getTileTarget(), 9);
});
$('.fuuro-submit').click(function () {
  fuuroSubmit();
});
$('.tile-reset').click(function () {
  hand = [];
  fuuro = [];
  ankan = [];
  fuuroTemp = [];
  agari = -1;
  for(var i = 0; i < basket.length; i++){
    basket[i] = 0;
  }
  $('[name="display-yaku"]').empty();
  $('#tiles').show();
  $('#result').hide();
  renewDisplay();
});

$(function() {
  var $radios = $('[name="tile-kind"]');
  $radios.on('change',function() {
    if($radios.filter(':checked').val() == "30"){
      $('#special-keyboard').show();
      $('#normal-keyboard').hide();
    }
    else{
      $('#special-keyboard').hide();
      $('#normal-keyboard').show();
    }
  });
});
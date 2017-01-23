function getFuIndex(fu){
  if(fu == 20){
    return 0;
  }
  else if(fu == 25){
    return 1;
  }
  else{
    return (fu/10) - 1;
  }
}

function getPoint(han, fu, oyaFlag){
  var oyaSheet = [
    [["-"], ["-"], ["1500 (500)"], ["2000 (700)"], ["2400 (800)"], ["2900 (1000)"], ["3400 (1200)"], ["3900 (1300)"], ["4400 (1500)"], ["4800 (1600)"], ["5300 (-)"]],
    [["- (700)"], ["2400 (-)"], ["2900 (1000)"], ["3900 (1300)"], ["4800 (1600)"], ["5800 (2000)"], ["6800 (2300)"], ["7700 (2600)"], ["8700 (2900)"], ["9600 (3200)"], ["10600 (3600)"]],
    [["- (1300)"], ["4800 (1600)"], ["5800 (2000)"], ["7700 (2600)"], ["9600 (3200)"], ["11600 (3900)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"]],
    [["- (2600)"], ["9600 (3200)"], ["11600 (3900)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"], ["満貫 12000 (4000)"]]
    ];

  var sheet = [
    [[""], [""], ["1000 (300-500)"], ["1300 (400-700)"], ["1600 (400-800)"], ["2000 (500-1000)"], ["2300 (600-1200)"], ["2600 (700-1300)"], ["2900 (800-1500)"], ["3200 (800-1600)"], ["3600 (-)"]],
    [["- (400-700)"], ["1600 (-)"], ["2000 (500-1000)"], ["2600 (700-1300)"], ["3200 (800-1600)"], ["3900 (1000-2000)"], ["4500 (1200-2300)"], ["5200 (1300-2600)"], ["5800 (1500,2900)"], ["6400 (1600,3200)"], ["7100 (1800-3600)"]],
    [["- (1300-2600)"], ["3200 (800-1600)"], ["3900 (1000-2000)"], ["5200 (1300-2600)"], ["6400 (1600-3200)"], ["7700 (2000-3900)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"]],
    [["- (1300-2600)"], ["6400 (1600-3200)"], ["7700 (2000-3900)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"], ["満貫 8000 (2000-4000)"]]
    ];
  if(oyaFlag){
    if(han == 0){
      return "役無し";
    }
    else if(han <= 4){
      return oyaSheet[han - 1][getFuIndex(fu)];
    }
    else if(han < 6){
      return "満貫 12000 (4000)";
    }
    else if(han < 8){
      return "跳満 18000 (6000)";
    }
    else if(han < 10){
      return "倍満 24000 (8000)";
    }
    else if(han < 13){
      return "三倍満 36000 (12000)";
    }
    else{
      return "数え役満 48000 (16000)";
    }
  }
  else{
    if(han == 0){
      return "役無し";
    }
    else if(han <= 4){
      return sheet[han - 1][getFuIndex(fu)];
    }
    else if(han < 6){
      return "満貫 8000 (2000-4000)";
    }
    else if(han < 8){
      return "跳満 12000 (3000-6000)";
    }
    else if(han < 10){
      return "倍満 16000 (4000-8000)";
    }
    else if(han < 13){
      return "三倍満 24000 (6000-12000)";
    }
    else{
      return "数え役満 32000 (8000-16000)";
    }
  }
}

function calculate(){
  var additionYaku = [];
  var han = 0;
  var tumoFlag = false;
  var htmlContent = '';
  var tiles = '';
  var oyaFlag = (parseInt($("#menfon").val()) == 31);

  if(agari == -1){
    alert("Tile number is not enough!");
    return -1;
  }
  hand.sort(sortNumber);
  if(hand.length != 0){
    tiles = tiles + $('[name="display-0"]').html();
  }
  if(fuuro.length != 0){
    tiles = tiles + $('[name="display-1"]').html();
  }
  if(ankan.length != 0){
    tiles = tiles + $('[name="display-2"]').html();
  }
  tiles = tiles + '<br>';

  $('[name="addition"]').filter(':checked').each(function() {
    additionYaku.push(this.value);
  });
  $('[name="display-yaku"]').empty();
  var additionYakuList = ['立直','一発','嶺上開花','海底','ダブル立直','門前ツモ'];

  for(var i = 0; i < additionYaku.length; i++){
    if(additionYaku[i] == 5){
      han = han + 2;
      htmlContent = htmlContent + '<p>' + additionYakuList[4] + '</p>';
    }
    else if(additionYaku[i] == 6){
      tumoFlag = true;
      if(fuuro.length != 0){
        additionYaku.splice(i, 1);
      }
      else{
        han = han + 1;
        htmlContent = htmlContent + '<p>' + additionYakuList[5] + '<p>';
      }
    }
    else{
      han = han + 1;
      htmlContent = htmlContent + '<p>' + additionYakuList[additionYaku[i] - 1] + '<p>';
    }
  }

  var regularYakuList = ['七対子','国士無双','四暗刻','大三元','大四喜','小四喜','字一色','緑一色','清老頭','九蓮宝燈','四槓子','平和','断么九','一盃口','役牌','三色同順','一気通貫','混全帯么九','対々和','三暗刻','三槓子','三色同刻','混老頭','小三元','混一色','純全帯么九','二盃口','清一色'];
  var result = check(hand, ankan, fuuro, agari, parseInt($("#chanfon").val()), parseInt($("#menfon").val()), tumoFlag);
  //result[0]: fu; result[1]: yaku-list; result == -1: NO-TEN
  if(result == -1){
    $('[name="display-yaku"]').append(tiles + htmlContent);
    $('[name="display-yaku"]').append('<h1>ノーテン</h1>');
    return 1;
  }

  var yakumanCounter = 0;
  for(var i = 0; i < result[1].length; i++){
    var yakuId = result[1][i] - 1;
    if(yakuId == 0){
      han = han + 2;
    }
    else if(yakuId < 11){
      htmlContent = '';
      for(var i = 0; i < result[1].length; i++){
        yakumanCounter ++;
        htmlContent = htmlContent + '<p>' + regularYakuList[result[1][i] - 1] + '</p>';
      }
      break;
    }
    else if(yakuId < 15){
      han = han + 1;
    }
    else if(fuuro.length != 0 && yakuId < 17){
      han = han + 1;
    }
    else if(yakuId < 24){
      han = han + 2;
    }
    else if(yakuId < 27){
      if(fuuro.length != 0){
        han = han + 2;
      }
      else{
        han = han + 3;
      }
    }
    else{
      if(fuuro.length != 0){
        han = han + 5;
      }
      else{
        han = han + 6;
      }
    }
    htmlContent = htmlContent + '<p>' + regularYakuList[yakuId] + '</p>';
    return 1;
  }

  var doraNum = $("#doraNum").val();
  if(parseInt(doraNum) > 0 && yakumanCounter == 0){
    htmlContent = htmlContent + "<p>ドラ " + doraNum + '</p>';
  }
  han = han + parseInt(doraNum);

  if(yakumanCounter != 0){
    htmlContent = htmlContent + '<h2>' + yakumanCounter + "倍役満</h2>";
    if(oyaFlag == true){
      htmlContent = htmlContent + '<h1>' + (48000 * yakumanCounter) + " (" + (16000 * yakumanCounter) + ")</h1>";
    }
    else{
      htmlContent = htmlContent + '<h1>' + (32000 * yakumanCounter) + " (" + (16000 * yakumanCounter) + ", " + (8000 * yakumanCounter) + ")</h1>";
    }

  }
  else{
    console.log(han, result, oyaFlag);
    htmlContent = htmlContent + '<h2>' + result[0] + "符" + han + "翻</h2>";
    htmlContent = htmlContent + '<h1>' + getPoint(han, result[0], oyaFlag) + '</h1>';
  }
  $('[name="display-yaku"]').append(tiles + htmlContent);
}

$('.tile-submit').click(function () {
  if(calculate() != -1){
    $('#tiles').hide();
    $('#result').show();
  }
});
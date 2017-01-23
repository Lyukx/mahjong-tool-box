/*
Mahjong tail no.:
1~9 	: 1~9 man
11~19	: 1~9 pin
21~29	: 1~9 sou
31~37	: 東南西北白發中
*/
function value(i){
	if(i < 30){
		return i % 10;
	}
	else{
		return -1;
	}
}
function sortNumber(a, b){
	return a - b;
}
function isGreen(i){
	if(i == 22 || i == 23 || i == 24 || i == 26 || i == 28 || i == 36){
		return true;
	}
	else{
		return false;
	}
}
function isYaochuuhai(tail){
	if(value(tail) == 1 || value(tail) == 9 || tail > 30){
		return true;
	}
	else{
		return false;
	}
}
function isYaochuu(mentu){
	if(value(mentu[0]) == 1 || value(mentu[2]) == 9 || mentu[0] > 30){
		return true;
	}
	else{
		return false;
	}
}
function isChunyaochuu(mentu){
	if(value(mentu[0]) == 1 || value(mentu[2]) == 9){
		return true;
	}
	else{
		return false;
	}
}
function isStraight(mentu){
	if(mentu[0] != mentu[1]){
		return true;
	}
	else{
		return false;
	}
}
function isBorder(mentu, agari){
	if((mentu[0] == agari && agari != 7) || (mentu[2] == agari && agari != 3)){
		return true;
	}
	else{
		return false;
	}
}
function isKanchan(mentu, agari){
	if((mentu[0] == agari && agari == 7) || (mentu[2] == agari && agari == 3) || (mentu[1] == agari)){
		return true;
	}
	else{
		return false;
	}
}
function arrangeHand(hand, naki_num, agari){
	function deleteItem(array, item){
		var i = array.indexOf(item);
		array.splice(i, 1);
		return i;
	}

	function countSetNum(arrangedHand){
		var count = 0;
		for(var i = 0; i < arrangedHand.length - 1; i++){
			if(arrangedHand[i][0] == arrangedHand[i][1]){
				count++;
			}
		}
		return count;
	}

	var temp = new Array(48);
	for (var i = 0; i < 48; i++){
		temp[i] = 0;
	}

	for (var i = 0; i < hand.length; i++){
		temp[hand[i]] ++;
	}

	var candidate = [];
	for (var i = 0; i < 48; i++){
		if(temp[i] > 1){
			candidate.push(i);
		}
	}

	var bad_flag = false;
	if(candidate.length == 0){
		bad_flag = true;
		return [];
	}

	var mentu_style = [];
	for (var k = 0; k < candidate.length; k++){
		var hand_temp = hand.slice();
		var head = candidate[k];
		var mentu = [];
		deleteItem(hand_temp, candidate[k]);
		deleteItem(hand_temp, candidate[k]);
		for (var i = 0; i < 4 - naki_num; i++){
			if(hand_temp[0] == hand_temp[1] && hand_temp[0] == hand_temp[2]){
				mentu.push([hand_temp[0], hand_temp[1], hand_temp[2]]);
				hand_temp.shift();
				hand_temp.shift();
				hand_temp.shift();
			}
			else{
				var check1 = hand_temp.indexOf(hand_temp[0] + 1);
				var check2 = hand_temp.indexOf(hand_temp[0] + 2);
				if(check1 == -1 || check2 == -1){
					bad_flag = true;
				}
				else{
					mentu.push([hand_temp[0], hand_temp[check1], hand_temp[check2]]);
					hand_temp.splice(0, 1);
					hand_temp.splice(check1 - 1, 1);
					hand_temp.splice(check2 - 2, 1);
				}
			}
			if(bad_flag){
				break;
			}
		}
		if(bad_flag == false){
			//return mentu;
			mentu.push([candidate[k], candidate[k]]);
			mentu_style.push(mentu);
		}
		else{
			 bad_flag = false;
		}
	}
	if(mentu_style.length == 0){
		// 七対子
		if(naki_num == 0){
			var flag = true;
			for(var i = 0; i < 7; i++){
				if(hand[2 * i] != hand[2 * i + 1]){
					flag = false;
					break;
				}
			}
			if(flag == true){
				return 1;
			}
		}

		// 国士無双
		if(naki_num == 0){
			var template = [1,9,11,19,21,29,31,32,33,34,35,36,37];
			var temp_hand = hand.slice();
			for(var i = 0; i < 13; i++){
				if(temp_hand[i] == temp_hand[i + 1]){
					temp_hand.splice(i, 1);
				}
			}
			if(temp_hand.toString() == template.toString()){
				return 2;
			}
		}

		return -1;
	}
	else if(mentu_style.length == 2){
		// 11122233344456
		//  - 123, 234, 234, 456, 11
		//  - 111, 222, 333, 456, 44
		// 12345666778899
		//  - 123, 456, 678, 678, 99
		//  - 123, 456, 789, 789, 66
		//  (for case 2, if agari tile is not head, Pinhu can be counted)
		if(countSetNum(mentu_style[0]) > countSetNum(mentu_style[1])){
			return mentu_style[0];
		}
		else if(countSetNum(mentu_style[0]) < countSetNum(mentu_style[1])){
			return mentu_style[1];
		}
		else{
			if(agari == mentu_style[0][mentu_style[0].length - 1]){
				return mentu_style[1];
			}
			else{
				return mentu_style[0];
			}
		}
	}
	else if(mentu_style.length == 1){
		return mentu_style[0];
	}
	else{
		// 11223344556677
		// should be return (agari):(head)
		//  1:77, 2:11, 3:77, 4:11(77), 5:11, 6:77, 7:11
		console.log(mentu_style);
		
		if(agari == hand[0] || agari == hand[0] + 2 || agari == hand[0] + 5){
			return mentu_style[2];
		}
		else if(agari == hand[0] + 1 || agari == hand[0] + 3 || agari == hand[0] + 4 || agari == hand[0] + 6){
			return mentu_style[1];
		}
		else{
			return mentu_style[0];
		}
	}
}

/************************
* Algorithm check: 		*
* ID	name			*
* 01	七対子			*
* 						*
* 02	国士無双		*
* 03	四暗刻			*
* 04	大三元			*
* 05	大四喜			*
* 06	小四喜			*
* 07	字一色			*
* 08	緑一色			*
* 09	清老頭			*
* 10	九蓮宝燈		*
* 11	四槓子			*
* 						*
* 12	平和			*
* 13	断么九			*
* 14	一盃口			*
* 15	役牌			*
* 						*
* 16	三色同順		*
* 17	一気通貫		*
* 18	混全帯么九		*
* 19	対々和			*
* 20	三暗刻			*
* 21	三槓子			*
* 22	三色同刻		*
* 23	混老頭			*
* 24	小三元			*
* 25	混一色			*
* 26	純全帯么九		*
* 27	二盃口			*
* 28	清一色			*
*************************/
// Sample input: check([1,2,3,4,22,23,24],[[11,12,13],[12,13,14]],4)
function check(handInput, ankan, fuuro, agari, chanfon, menfon, tumoFlag){
	var yakuList = []
	var flag;
	var hand = handInput.slice();
	hand.push(agari);
	hand = hand.sort(sortNumber);

	var total = hand.slice();
	for(var i = 0; i < fuuro.length; i++){
		for(var j = 0; j < 3; j++){
			total.push(fuuro[i][j]);
		}
	}
	for(var i = 0; i < ankan.length; i++){
		for(var j = 0; j < 3; j++){
			total.push(ankan[i][j]);
		}
	}
	total = total.sort(sortNumber);

	// ID 07, 08, 09, 13, 23, 25, 28 should be checked first
	// ID 07
	flag = true;
	for(var i = 0; i < 14; i++){
		if(total[i] < 30){
			flag = false;
			break;
		}
	}
	if(flag == true){
		yakuList.push(7);
	}

	// ID 08
	flag = true;
	for(var i = 0; i < 14; i++){
		if(isGreen(total[i]) == false){
			flag = false;
			break;
		}
	}
	if(flag == true){
		yakuList.push(8);
	}

	// ID 09
	flag = true;
	for(var i = 0; i < 14; i++){
		if(total[i] > 30 || ((value(total[i]) > 1) && (value(total[i]) < 9))){
			flag = false;
			break;
		}
	}
	if(flag == true){
		yakuList.push(9);
	}

	// ID 13
	flag = true;
	for(var i = 0; i < 14; i++){
		if(total[i] > 30 || value(total[i]) == 1 || value(total[i]) == 9){
			flag = false;
			break;
		}
	}
	if(flag == true){
		yakuList.push(13);
	}

	// ID 23
	flag = true;
	for(var i = 0; i < 14; i++){
		if(value(total[i]) > 1 && value(total[i]) < 9){
			flag = false;
			break;
		}
	}
	if(flag == true){
		if(yakuList.indexOf(9) == -1){
			yakuList.push(23);
		}
	}

	// ID 28
	if(total[13] - total[0] < 9 && yakuList.indexOf(7) == -1){
		yakuList.push(28);
	}

	// ID 25
	flag = true;
	for(var i = 0; i < 14; i++){
		if(total[i] < 30 && total[i] - total[0] > 9){
			flag = false;
			break;
		}
	}
	if(flag == true){
		if(yakuList.indexOf(28) == -1 && yakuList.indexOf(7) == -1){
			yakuList.push(25);
		}
	}

	// Before other check, the hand should be arranged first
	var sevenFlag = false;
	var handArranged = arrangeHand(hand, fuuro.length + ankan.length, agari);

	// ID 01
	if(handArranged == 1){
		yakuList.push(1);
		return [25, yakuList];
	}
	// ID 02
	else if(handArranged == 2){
		yakuList = [2];
		sevenFlag = true;
		return [25, yakuList];
	}
	// NO-TEN
	else if(handArranged == -1){
		return -1;
	}
	else if(handArranged.length == 0){
		return -1;
	}
	var mentu = [];
	for(var i = 0; i < fuuro.length; i++){
		mentu.push(fuuro[i]);
	}
	for(var i = 0; i < ankan.length; i++){
		mentu.push(ankan[i]);
	}
	for(var i = 0; i < handArranged.length - 1; i++){
		mentu.push(handArranged[i]);
	}

	// ID 03
	if(fuuro.length == 0){
		flag = true;
		for(var i = 0; i < handArranged.length - 1; i++){
			if(!(handArranged[i][0] == handArranged[i][1] && handArranged[i][0] == handArranged[i][2])){
				flag = false;
			}
		}
		if(flag == true){
			if(tumoFlag == false){
				if(agari == handArranged[handArranged.length - 1][0]){
					yakuList.push(3);
				}
			}
			else{
				yakuList.push(3);
			}
		}
	}

	// ID 04
	if(total.toString(",").search("35,35,35,36,36,36,37,37,37") != -1){
		yakuList.push(4);
	}

	// ID 05
	if(total.toString(",").search("31,31,31,32,32,32,33,33,33,34,34,34") != -1){
		yakuList.push(5);
	}

	// ID 06
	if(handArranged[handArranged.length - 1][0] > 30 && handArranged[handArranged.length - 1][0] < 35){
		var tempstr = "31,31,31,32,32,32,33,33,33,34,34,34";
		tempstr = tempstr.replace(handArranged[handArranged.length - 1][0].toString() + ",", "");
		if(total.toString(",").search(tempstr) != -1){
			yakuList.push(6);
		}
	}

	// ID 10
	if(fuuro.length == 0 && yakuList.indexOf(28) != -1){
		var judge = new Array(9);
		for(var k = 0; k < 9; k++){
			judge[k] = 0;
		}
		for(var i = 0; i < hand.length; i++){
			judge[value(hand[i]) - 1]++;
		}
		flag = true;
		if(judge[0] < 3 || judge[8] < 3){
			flag = false;
		}
		for(var i = 1; i < 8; i++){
			if(judge[i] == 0){
				flag = false;
			}
		}
		if(flag == true){
			yakuList = [10];
			return [25, yakuList];
		}
	}
	
	// ID 11
	if(fuuro.length + ankan.length == 4){
		flag = true;
		for(var i = 0; i < fuuro.length; i++){
			if(fuuro[i].length != 4){
				flag = false;
			}
		}
		if(flag == true){
			yakuList.push(11);
			//return yakuList;
		}
	}

	// ID 12
	if(fuuro.length == 0 && ankan.length == 0){
		if(handArranged[handArranged.length - 1][0] != menfon && handArranged[handArranged.length - 1][0] != chanfon && handArranged[handArranged.length - 1][0] < 35 && handArranged[handArranged.length - 1][0] != agari){
			flag = true;
			var flag2 = false;
			for(var i = 0; i < mentu.length; i++){
				if(isStraight(mentu[i]) == false){
					flag = false;
				}
				if(isBorder(mentu[i], agari)){
					flag2 = true;
				}
			}
			if(flag == true && flag2 == true){
				yakuList.push(12);
			}
		}
	}

	// ID 27
	if(fuuro.length == 0 && ankan.length == 0){
		var flag = true;
		for(var i = 0; i < 7; i++){
			if(hand[2 * i] != hand[2 * i + 1]){
				flag = false;
				break;
			}
		}
		if(flag == true){
			yakuList.push(27);
		}
	}

	// ID 14
	flag = false;
	if(fuuro.length == 0 && yakuList.indexOf(27) == -1){
		for(var i = 0; i < handArranged.length - 2; i++){
			for(var j = i + 1; j < handArranged.length - 1; j++){
				if(handArranged[i].toString() == handArranged[j].toString() && handArranged[i][0] != handArranged[i][1]){
					flag = true;
				}
			}
		}
		if(flag == true){
			yakuList.push(14);
		}
	}

	// ID 15
	for(var i = 0; i < mentu.length; i++){
		if(mentu[i][0] == mentu[i][1]){
			if(mentu[i][0] == 35){
				yakuList.push(15);
			}
			if(mentu[i][0] == 36){
				yakuList.push(15);
			}
			if(mentu[i][0] == 37){
				yakuList.push(15);
			}
			if(mentu[i][0] == chanfon){
				yakuList.push(15);
			}
			if(mentu[i][0] == menfon){
				yakuList.push(15);
			}
		}
	}

	// ID 16
	flag = false;
	for(var i = 0; i < mentu.length; i++){
		for(var j = 0; j < mentu.length; j++){
			for(var k = 0; k < mentu.length; k++){
				if(i != k && j != k){
					if(mentu[i][0] - mentu[j][0] == 10 && mentu[i][1] - mentu[j][1] == 10 && mentu[i][0] != mentu[i][1] && mentu[j][0] - mentu[k][0] == 10 && mentu[j][1] - mentu[k][1] == 10){
						flag = true;
					}
				}
			}
		}
	}
	if(flag == true){
		yakuList.push(16);
	}

	// ID 17
	flag = false;
	for(var i = 0; i < mentu.length; i++){
		for(var j = 0; j < mentu.length; j++){
			for(var k = 0; k < mentu.length; k++){
				if(i != k && j != k){
					if(mentu[i][0] != mentu[i][1] && mentu[j][0] != mentu[j][1] && mentu[k][0] != mentu[k][1] && mentu[i][2] + 1 == mentu[j][0] && mentu[j][2] + 1 == mentu[k][0]){
						flag = true;
					}
				}
			}
		}
	}
	if(flag == true){
		yakuList.push(17);
	}

	// ID 26
	flag = true;
	for(var i = 0; i < mentu.length; i++){
		if(isChunyaochuu(mentu[i]) == false){
			flag = false;
			break;
		}
	}
	if(flag == true){
		yakuList.push(26);
	}

	// ID 18
	if(yakuList.indexOf(26) == -1){
		flag = true;
		for(var i = 0; i < mentu.length; i++){
			if(isYaochuu(mentu[i]) == false){
				flag = false;
				break;
			}
		}
		if(flag == true){
			yakuList.push(18);
		}
	}

	// ID 19
	flag = true;
	for(var i = 0; i < mentu.length; i++){
		if(mentu[i][0] != mentu[i][1]){
			flag = false;
			break;
		}
	}
	if(flag == true){
		yakuList.push(19);
	}

	// ID 20
	if(fuuro.length < 2){
		var count = ankan.length;
		var straightCount = 0;
		var straightIndex = -1;
		for(var i = 0; i < handArranged.length - 1; i++){
			if(isStraight(handArranged[i]) == false){
				count++;
			}
			else{
				straightCount++;
				straightIndex = i;
			}
		}
		if(count == 3){
			if(fuuro.length == 1 && tumoFlag == false){
				if(agari == handArranged[handArranged.length - 1][0]){
					yakuList.push(20);
				}
			}
			else if(straightCount == 1 && tumoFlag == false){
				if(agari == handArranged[straightIndex][0] || agari == handArranged[straightIndex][2]){
					yakuList.push(20);
				}
			}
			else{
				yakuList.push(20);
			}
		}
		else if(count == 4){
			if(tumoFlag == false && agari != handArranged[handArranged.length - 1][0]){
				yakuList.push(20);
			}
		}
	}

	// ID 21
	if(fuuro.length + ankan.length == 3){
		flag = true;
		for(var i = 0; i < fuuro.length; i++){
			if(fuuro[i].length != 4){
				flag = false;
			}
		}
		if(flag == true){
			yakuList.push(21);
		}
	}
	else if(fuuro.length + ankan.length == 4){
		if(yakuList.indexOf(11) == -1){
			yakuList.push(21);
			//return yakuList;
		}
	}

	// ID 22
	flag = false;
	for(var i = 0; i < mentu.length; i++){
		for(var j = 0; j < mentu.length; j++){
			for(var k = 0; k < mentu.length; k++){
				if(i != k && j != k){
					if(mentu[i][0] - mentu[j][0] == 10 && mentu[i][1] - mentu[j][1] == 10 && mentu[i][0] == mentu[i][1] && mentu[j][0] - mentu[k][0] == 10 && mentu[j][1] - mentu[k][1] == 10){
						flag = true;
					}
				}
			}
		}
	}
	if(flag == true){
		yakuList.push(22);
	}

	// ID 24
	if(handArranged[handArranged.length - 1][0] > 34){
		var tempstr = "35,35,35,36,36,36,37,37,37";
		tempstr = tempstr.replace(handArranged[handArranged.length - 1][0].toString() + ",", "");
		if(total.toString(",").search(tempstr) != -1){
			yakuList.push(24);
		}
	}

	var filter = [];
	for(var i = 0; i < yakuList.length; i++){
		if(yakuList[i] > 1 && yakuList[i] < 12){
			filter.push(yakuList[i]);
		}
	}
	if(filter.length > 0){
		yakuList = filter;
	}

	var fu = 20;

	if(handArranged[handArranged.length - 1][0] == menfon || handArranged[handArranged.length - 1][0] == chanfon || handArranged[handArranged.length - 1][0] > 34){
		fu = fu + 2;
	}
	if(handArranged[handArranged.length - 1][0] == agari){
		fu = fu + 2;
	}
	else{
		for(var i = 0; i < handArranged.length - 1; i++){
			if(isKanchan(handArranged[i], agari) == true){
				fu = fu + 2;
				break;
			}
		}
	}
	for(var i = 0; i < handArranged.length - 1; i++){
		if(handArranged[i][0] == handArranged[i][1]){
			if(isYaochuuhai(handArranged[i][0]) == true){
				fu = fu + 8;
			}
			else{
				fu = fu + 4;
			}
		}
	}
	if(fuuro.length == 0 && tumoFlag == false){
		fu = fu + 10;
	}
	else{
		for(var i = 0; i < fuuro.length; i++){
			if(fuuro[i][0] == fuuro[i][1]){
				if(fuuro[i].length == 3){
					if(isYaochuuhai(fuuro[i][0]) == true){
						fu = fu + 4;
					}
					else{
						fu = fu + 2;
					}
				}
				else{
					if(isYaochuuhai(fuuro[i][0]) == true){
						fu = fu + 16;
					}
					else{
						fu = fu + 8;
					}
				}
			}
		}
	}
	if(ankan.length > 0){
		for(var i = 0; i < ankan.length; i++){
			if(isYaochuuhai(ankan[i][0]) == true){
				fu = fu + 32;
			}
			else{
				fu = fu + 16;
			}
		}
	}
	if(tumoFlag == true){
		fu = fu + 2;
	}
	fu = Math.ceil(fu / 10) * 10;
	
	if(fu < 30){
		fu = 30;
	}
	if(tumoFlag == true && yakuList.indexOf(12) != -1){
		fu = 20;
	}
	var result = [fu, yakuList];
	return result;

	//return yakuList;
}
/******************************************************
Part from Mr.Gimite's code.
The blog article of this code:
  http://d.hatena.ne.jp/Gimite/20130919/1379601037
Github page:
  https://gist.github.com/gimite/6249634
    -yuizumi_shanten_analysis.js

Ussage:
calculateShantensu(pids);
convert from system style tileId(id) to Gimite's style(gId):
  gId = id - (1 + Math.floor(id/10));
*******************************************************/
var NUM_PIDS = 9 * 3 + 7;
var CHOWS = [0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24];

function calculateShantensu(pids) {
  var countVector = pidsToCountVector(pids);
  var targetVector = [];
  for (var i = 0; i < NUM_PIDS; ++i) {
    targetVector.push(0);
  }
  return calculateShantensuInternal(countVector, targetVector, 0, 4, 0, 1 / 0) - 1;
}

function pidsToCountVector(pids) {
  var countVector = [];
  for (var i = 0; i < NUM_PIDS; ++i) {
    countVector.push(0);
  }
  for (var i = 0; i < pids.length; ++i) {
    ++countVector[pids[i]];
  }
  return countVector;
}

function calculateShantensuInternal(vector0, vector1, current, numMeldsLeft, minMeldId, upperbound) {
  if (numMeldsLeft == 0) {
    minDelta = 2;
    for (var i = 0; i < NUM_PIDS; ++i) {
      if (vector0[i] >= vector1[i] + 2) {
        minDelta = 0;
        break;
      } else if (vector0[i] == vector1[i] + 1) {
        minDelta = 1;
      }
    }
    current += minDelta;
    return current < upperbound ? current : upperbound;
  } else {
    for (var i = minMeldId; i < NUM_PIDS; ++i) {
      if (vector1[i] >= 2) continue;
      var current1;
      if (vector0[i] <= vector1[i]) {
        current1 = current + 3;
      } else if (vector0[i] < vector1[i] + 3) {
        current1 = current + (vector1[i] + 3) - vector0[i];
      } else {
        current1 = current;
      }
      if (current1 < upperbound) {
        vector1[i] += 3;
        upperbound = calculateShantensuInternal(vector0, vector1, current1, numMeldsLeft - 1, i, upperbound);
        vector1[i] -= 3;
      }
    }

    var startChowId = minMeldId < NUM_PIDS ? 0 : minMeldId - NUM_PIDS;
    for (var chowId = startChowId; chowId < CHOWS.length; ++chowId) {
      var i = CHOWS[chowId];
      if (vector1[i] == 4 || vector1[i + 1] == 4 || vector1[i + 2] == 4) {
        continue;
      }
      current1 = current;
      if (vector0[i] <= vector1[i]) ++current1;
      if (vector0[i + 1] <= vector1[i + 1]) ++current1;
      if (vector0[i + 2] <= vector1[i + 2]) ++current1;
      if (current1 < upperbound) {
        ++vector1[i]; ++vector1[i + 1]; ++vector1[i + 2];
        upperbound = calculateShantensuInternal(vector0, vector1, current1, numMeldsLeft - 1, chowId + NUM_PIDS, upperbound);
        --vector1[i]; --vector1[i + 1]; --vector1[i + 2];
      }
    }
    return upperbound;
  }
}
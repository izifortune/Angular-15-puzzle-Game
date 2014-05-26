'use strict';

angular.module('angular15PuzzleGameApp')
  .controller('MainCtrl', function ($scope, $interval) {
        $scope.size = 4;
        $scope.board = [];
        $scope.counter = 0;

        $scope.boardMax = function () {
            return $scope.size * $scope.size;
        };


        $scope.init = function () {
            $scope.board = [];

            for (var i = 0; i < $scope.boardMax(); i++) {
                $scope.board.push({ value: i });
            }
        };


        $scope.finished = function () {
            if ($scope.board.length < $scope.boardMax()) {
                return false;
            }

            var result = true;
            for (var i = 0; i <= $scope.boardMax() - 2; i++) {
                if ($scope.board[i].value !== i + 1) {
                    result = false;
                }
            }

            if(result) {
                $scope.stop();
            }

            return result;
        };


        $scope.randomize = function () {
            if (!$scope.initialized()) {
                $scope.init();
            }
            $scope.counter = 0;

            arrayHelper.fisherYates($scope.board);
            $scope.stop();
            myInterval = $interval($scope.onInterval, 1000);

            checkPosition();
        };

        var myInterval;
        $scope.pieceClick = function (pos) {
            if (pos < $scope.boardMax() && pieceMovable(pos)) {
                var zeroP = zeroPosition($scope.board);
                $scope.board[zeroP].value = $scope.board[pos].value;

                if ($scope.board[pos].value === zeroP + 1){
                    $scope.board[zeroP].color = 'rightPosition';
                }
                else {
                    $scope.board[zeroP].color = 'wrongPosition';
                }


                $scope.board[pos].value = 0;
                $scope.board[pos].color = 'wrongPosition';


            }
        };


        $scope.pieceEmpty = function (pos) {
            return $scope.board[pos].value === 0;
        };


        var zeroPosition = function (arr) {
            for (var pos = 0; pos < arr.length; pos++) {
                if (arr[pos].value === 0) {
                    return pos;
                }
            }
        };

        var checkPosition = function () {
            for (var i = 0; i < $scope.boardMax(); i++) {
                if ($scope.board[i].value === i + 1) {
                    $scope.board[i].color = 'rightPosition';
                } else {
                    $scope.board[i].color = 'wrongPosition';
                }
            }


        };

        var pieceMovable = function (pos) {
            return (((pos) % $scope.size) && pieceEmpty(pos - 1) ) ||
                ((  (pos + 1) % $scope.size) && pieceEmpty(pos + 1) ) ||
                pieceEmpty(arrayHelper.addRow($scope.size, pos, -1)) ||
                pieceEmpty(arrayHelper.addRow($scope.size, pos, 1));
        };


        var pieceEmpty = function (pos) {
            return (pos >= 0 &&
                pos < $scope.boardMax() &&
                $scope.board[pos].value === 0);
        };


        $scope.initialized = function () {
            return ($scope.board.length === $scope.size * $scope.size);
        };

        $scope.onInterval = function () {
            $scope.counter++;
        };


        $scope.stop = function () {
            $interval.cancel(myInterval);
        };

        var arrayHelper = {
            addRow: function (arrSize, pos, count) {
                return pos + (count * arrSize);
            },
            fisherYates: function (arr) {
                var i = arr.length;
                if (i === 0) {
                    return false;
                }
                while (--i) {
                    var j = Math.floor(Math.random() * ( i + 1 ));
                    var tempi = arr[i];
                    var tempj = arr[j];
                    arr[i] = tempj;
                    arr[j] = tempi;
                }
            }
        };
  });

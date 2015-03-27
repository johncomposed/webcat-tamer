
wcTamer.controller('tamerCtrl', function ($scope, tamerStorage) {

    $scope.tamerStorage = tamerStorage;

    $scope.$watch('tamerStorage.data', function() {
        $scope.hwList = $scope.tamerStorage.data;
    });

    $scope.tamerStorage.findAll(function(data){
        $scope.hwList = data;
        $scope.$apply();
    });

    $scope.removeAll = function() {
        tamerStorage.removeAll();
    }

    $scope.toggleCompleted = function() {
        tamerStorage.sync();
    }

/*
  //myscopes
    $scope.currentTab = { title:'', content: ''};

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }*/
});
wcTamer.controller('hwCtrl', 
    function hwCtrl($scope, tamerStorage, $log,$routeParams) {
        var hwID  = $routeParams.id;
        console.log('hwCtrl: ' + hwID);
        for (var i=0;i < tamerStorage.data.length;i++) {
            if(tamerStorage.data[i].time == hwID) {
                console.log('hwID found');
                $scope.currentTab = tamerStorage.data[i];
                break; //eww
            } else { console.log('Nothing found'); }
        }
    
    $scope.tamerStorage = tamerStorage;

    $scope.remove = function(hw) {
        tamerStorage.remove(hw);
    }

    $scope.print = function() {
        window.print();
    }

  $scope.toggleLine = function() {
      var lines = Array.prototype.slice.call(document.querySelectorAll(".lineCount, .lineCountHilight"));
      var commentDivs = document.querySelectorAll('tr > td:not(:last-child) > div');
      for (var i = 0; i < commentDivs.length; i++) {
        lines.push(commentDivs[i].parentElement);
      }
      for (var i = 0; i < lines.length; i++) {
      if(lines[i].style.display == 'none') {
         lines[i].style.display = 'table-cell';
      } else {
         lines[i].style.display = 'none';
      }
      }
  }

});

wcTamer.controller('dashCtrl', function ($scope, tamerStorage) {

    $scope.tamerStorage = tamerStorage;

    $scope.$watch('tamerStorage.data', function() {
        $scope.hwList = $scope.tamerStorage.data;
    });

});

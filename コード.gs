function main() {

  // シートの取得
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var configSS = ss.getSheetByName("config");
  
  var config = configSS.getRange((configSS.getFrozenRows() + 1), 1, (configSS.getLastRow() - configSS.getFrozenRows()), configSS.getLastColumn()).getValues();

  var site = parseData(config, 0);
  Logger.log(site);
  var item = parseData(config, 1);
  Logger.log(item);
  
  makeSpreadSheet(ss, item)
}


// 二重配列のときに、第一引数の配列から、num番目のデータだけ集めてくる。
function parseData(array, num) {
  var parseData = [];
  
  var loopLimit = array.length;
  for (var i = 0; i < loopLimit; i++) {
    parseData.push(array[i][num]);
  }
  
  return parseData;
}


// makeSpreadSheetとgetSheetsNameでひとかたまり
// 入力配列に沿ったシートを作成する
function makeSpreadSheet(ss, item) {
  var sheetName = getSheetsName(ss);
  
  var isMatch;
  // yyyyMMddHHを除く
  for(var i = 0; i < item.length; i++) {
    if(item[i] == "") continue;
    isMatch = false;
    
    for(var j = 0; j < sheetName.length; j++) {
      if(item[i] == sheetName[j]) {
        isMatch = true;
      }
    }
    
    if(!isMatch) {
      ss.insertSheet(item[i]);
    }
  }
}

//シート名をすべて取得
function getSheetsName(ss){
  var sheets = ss.getSheets();
  var sheet_names = new Array();
  
  if (sheets.length >= 1) {  
    for(var i = 0;i < sheets.length; i++)
    {
      sheet_names.push(sheets[i].getName());
    }
  }
  return sheet_names;
}
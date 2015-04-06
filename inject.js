// Only run if the back to summary button is found
if (document.querySelector('[value="< Back to Summary"]')) {
  var buttonOnSite = document.querySelector('[value="< Back to Summary"]');
  var parentForm = buttonOnSite.parentElement;
  var storage = chrome.storage.local;
  var optionsUrl = chrome.extension.getURL('options.html');

  //console.log(storage);
  var button, text;  
  addButton();
}



// Add the button
function addButton() {
  button = document.createElement("button");
  text = document.createTextNode("Save to Web-Cat Tamer");
  
  button.className += " tButton";
  button.type = 'button';
  button.appendChild(text);
  parentForm.appendChild(button);
  button.addEventListener('click', saveCode);
  
  console.log("Button added!");

}

// define getKey()
function getKey(key, callback) {
  storage.get(key, function (data) {
    if (data[key]) {
      console.log('found data.key');
      codeDataArr = data[key];
    } else codeDataArr = [];
    callback(codeDataArr);
  });
}

// use getKey()
function addBoxes(codeDataArr) {
  // Get all the code boxes on the page
  var boxes = document.querySelectorAll('div.expboxcontent'),
      sBElement = document.querySelectorAll('table>tbody')[1],
      designScore = sBElement.querySelectorAll('tr>td.R')[0].innerHTML,
      styleScore = sBElement.querySelectorAll('tr>td.R')[1].innerHTML,
      testScore = sBElement.querySelectorAll('tr>td.R')[2].innerHTML,
      totalScore = sBElement.querySelectorAll('tr>td.R')[3].innerHTML,
      codeTitles = document.querySelectorAll('h2.collapsible');

  for (i = 0, l = boxes.length; i < l; i++) {
    var title = codeTitles[i].textContent;
    var code = boxes[i].innerHTML;
    var time = Date.now();
    // I should add time (for id) and submit time for sorting
    var codeobj = {
      title: title,
      totalScore: totalScore,
      designScore: designScore,
      styleScore: styleScore,
      testScore: testScore,
      content: code,
      time: time
    };
    codeDataArr.push(codeobj);
  }
  console.log(codeDataArr);
  var obj= {};
  obj['codeData'] = codeDataArr;
  storage.set(obj);

}

function message(msg) {
  var m = document.querySelector('.message');
  m.innerText = msg;
  setTimeout(function() {
    m.innerText = '';
  }, 3000);
}

function goToOptions() {
  console.log(optionsUrl);
  location.href='' + optionsUrl;
}


function saveCode() {
  
  var codeDataArr;
  getKey('codeData', addBoxes);
  button.textContent = 'Go to Web-Cat Tamer';
  button.removeEventListener('click', saveCode);
  console.log(optionsUrl);
  //button.innerHTML = ' <a target="_blank" href="' + optionsUrl + '">options page</a> ';

}


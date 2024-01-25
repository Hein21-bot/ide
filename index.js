

//var node = document.getElementById('cat').innerText.replace(/\s{2,}/g,'\t','').trim();

function changeText(id, text) {
  document.getElementById(id).lastChild.data = text;
}

document.getElementById('newoption').addEventListener("mouseover", () => changeText('newoption', ' Ctrl+N'));
document.getElementById("newoption").addEventListener("mouseout", () => changeText('newoption', ' New'));
document.getElementById('openoption').addEventListener("mouseover", () => changeText('openoption', ' Ctrl+O'));
document.getElementById("openoption").addEventListener("mouseout", () => changeText('openoption', ' Open'));
document.getElementById('runoption').addEventListener("mouseover", () => changeText('runoption', ' Ctrl+R'));
document.getElementById("runoption").addEventListener("mouseout", () => changeText('runoption', ' Run'));
document.getElementById('saveoption').addEventListener("mouseover", () => changeText('saveoption', ' Ctrl+S'));
document.getElementById("saveoption").addEventListener("mouseout", () => changeText('saveoption', ' Save'));
document.getElementById('saveasoption').addEventListener("mouseover", () => changeText('saveasoption', ' Ctrl+Shift'));
document.getElementById("saveasoption").addEventListener("mouseout", () => changeText('saveasoption', ' Save As...'));
// document.getElementById('printoption').addEventListener("mouseover", () => changeText('printoption', ' Ctrl+P'));
// document.getElementById("printoption").addEventListener("mouseout", () => changeText('printoption', ' Print'));

document.getElementById('undooption').addEventListener("mouseover", () => changeText('undooption', ' Ctrl+Z'));
document.getElementById("undooption").addEventListener("mouseout", () => changeText('undooption', ' Undo'));
document.getElementById('redooption').addEventListener("mouseover", () => changeText('redooption', ' Ctrl+Y'));
document.getElementById("redooption").addEventListener("mouseout", () => changeText('redooption', ' Redo'));
document.getElementById('cutoption').addEventListener("mouseover", () => changeText('cutoption', ' Ctrl+X'));
document.getElementById("cutoption").addEventListener("mouseout", () => changeText('cutoption', ' Cut'));
document.getElementById('copyoption').addEventListener("mouseover", () => changeText('copyoption', ' Ctrl+C'));
document.getElementById("copyoption").addEventListener("mouseout", () => changeText('copyoption', ' Copy'));
document.getElementById('pasteoption').addEventListener("mouseover", () => changeText('pasteoption', ' Ctrl+V'));
document.getElementById("pasteoption").addEventListener("mouseout", () => changeText('pasteoption', ' Paste'));
document.getElementById('selectalloption').addEventListener("mouseover", () => changeText('selectalloption', ' Ctrl+A'));
document.getElementById("selectalloption").addEventListener("mouseout", () => changeText('selectalloption', ' Select All'));

// document.getElementById('mathoption').addEventListener("mouseover", () => changeText('mathoption', ' Ctrl+M'));
// document.getElementById("mathoption").addEventListener("mouseout", () => changeText('mathoption', ' Math'));
document.getElementById('codeoption').addEventListener("mouseover", () => changeText('codeoption', ' Ctrl+T'));
document.getElementById("codeoption").addEventListener("mouseout", () => changeText('codeoption', ' Code'));
document.getElementById('fullscreenoption').addEventListener("mouseover", () => changeText('fullscreenoption', ' F11'));
document.getElementById("fullscreenoption").addEventListener("mouseout", () => changeText('fullscreenoption', ' Full Screen'));
document.getElementById('wysiwygoption').addEventListener("mouseover", () => changeText('wysiwygoption', ' Ctrl+W'));
document.getElementById("wysiwygoption").addEventListener("mouseout", () => changeText('wysiwygoption', ' WYSIWYG'));

//This function is to uncheck any open submenus that were open when new submenu is clicked. Only one submenu can possibly stay open at a time.
var checkboxes = ["check01", "check02", "check03"];

function toggleOffPreviouslyChecked(checkedID) {
  var difference = checkboxes.filter(x => [checkedID].indexOf(x) === -1);
  for (let j = 0; j < difference.length; j++) {
    if (true == document.getElementById(difference[j]).checked) {
      document.getElementById(difference[j]).click();
    }
  }
}

for (let i = 0; i < checkboxes.length; i++) {
  document.getElementById(checkboxes[i]).addEventListener('change', e => {
    if (e.target.checked) {
      toggleOffPreviouslyChecked(checkboxes[i]);
    }
  });
}
//Below are the variables and event handlers for changing the project name. A lot was done from scratch so it is customizable.
var originalProjectNameInnerText = document.getElementById('projectname').innerText;
var originalProjectNameSVG = document.getElementById('editprojectname').outerHTML;



document.getElementById('projectname').addEventListener("click", (e) => {
  document.querySelector(':root').style.setProperty('--projectnamecaretcolor', 'rgba(255,255,255,1)');
  document.getElementById('editprojectname').outerHTML = '';
  document.getElementById('projectname').innerHTML = '';

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (document.getElementById('projectname').innerText.trim() == '') {
        document.getElementById('projectname').innerHTML = originalProjectNameInnerText + originalProjectNameSVG;
        document.querySelector(':root').style.setProperty('--projectnamecaretcolor', 'transparent');
      }
      else {
        document.getElementById('projectname').innerHTML = document.getElementById('projectname').innerText + originalProjectNameSVG;
        document.querySelector(':root').style.setProperty('--projectnamecaretcolor', 'transparent');
      }
    }
  });

});

var initialCode = [("&lt;!DOCTYPE html>"), "&lt;html>", "&lt;!-- Create an IoT GUI -->", "&lt;title>&lt;/title>", "&lt;head>", "&emsp;&lt;meta name='topic' content=''>", "&emsp;&lt;meta name='description' content=''>", "&emsp;&lt;meta name='copyright' content=''>", "&emsp;&lt;meta charset='utf-16'>", "&emsp;&lt;meta name='language' content=''>",
  "&emsp;&lt;meta name='revised' content=''>", "&emsp;&lt;meta name='robots' content=''>", "<br>", "&emsp;&lt;script type='text/javascript' src=''><∕script>", "<br>", "&emsp;&lt;link rel='shortcut icon' href='' type='image/x-icon'>", "&emsp;&lt;link rel='stylesheet' type='text/css' href=''>", "&emsp;&lt;link rel='shortcut icon' href='' type='image/x-icon'>",
  "&emsp;&lt;style type='text/css'>", "&emsp;&lt;∕style>", "&lt;∕head>", "<br>", "&lt;body>", "&emsp;&lt;script>", "&emsp;&emsp;//variables", "<br>", "&emsp;&emsp;//arrays", "<br>", "&emsp;&emsp;//linked lists", "<br>", "&emsp;&emsp;//functions", "<br>", "&emsp;&emsp;//event handlers", "<br>", "&emsp;&lt;/script>", "&emsp;&lt;/body>", "&lt;/html>",
];

for (let i = 0; i < initialCode.length; i++) {
  // document.getElementById('editor').appendChild(document.createElement('span')).innerHTML = initialCode[i];
}
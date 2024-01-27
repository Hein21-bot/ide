let fileHandle;

async function saveData(fullPath, name) {
  const baseUrl = "http://localhost:8080/createFile";
  const queryParams = {
    dirName: fullPath,
    fileName: name,
  };
  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "POST",
      headers: {
        "Content-Type": "text/html",
      },
      body: editor.innerText,
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    if(response.status == 200){
      window.alert('successfully save!')
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}


async function createFile(fullPath, name) {
  const baseUrl = "http://localhost:8080/createFile";
  const queryParams = {
    dirName: fullPath,
    fileName: name,
  };
  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;

  try {
    const response = await fetch(urlWithQuery, {
      method: "POST",
      headers: {
        "Content-Type": "text/html",
      },
      body: `<!DOCTYPE html>
      <html>
          <!-- Create an IoT GUI -->
          <head>
              <title></title>
          </head>
          <body>
          </body>
      </html>
      `,
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}


async function updateData(dir) {
  try {
    const baseUrl = "http://localhost:8080/updateFile";

    const queryParams = {
      fileName: projectname.innerText, // Ensure 'projectname' is defined and accessible
      dirName: dir,
    };

    const urlWithQuery = `${baseUrl}?${new URLSearchParams(
      queryParams
    ).toString()}`;

    const response = await fetch(urlWithQuery, {
      method: "POST",
      headers: {
        "Content-Type": "text/html", // Ensure the server is expecting 'text/html'
      },
      body: editor.innerText, // Ensure 'editor' is defined and accessible
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle success, update UI accordingly
    window.alert('successfully save!')
  } catch (err) {
    console.error("Failed to update data:", err);
    // Handle errors, such as showing a message to the user
  }
}

async function deleteFile() {
  const baseUrl = "http://localhost:8080/deleteFile";

  const queryParams = {
    fileName: projectname.innerText,
    dirName: "File-Organizer",
  };

  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "DELETE",
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function updateFileName() {
  const baseUrl = "http://localhost:8080/updateFileName";

  const queryParams = {
    fileName: "1111.html",
    dirName: "File-Organizer",
    oldFileName: projectname.innerText,
  };

  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "GET",
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}


async function createFolder(fullPath, name) {
  const baseUrl = "http://localhost:8080/createFolder";

  const queryParams = {
    dirName: fullPath,
    folderName: name
  };

  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "GET",
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}


async function deleteFolder(fullPath) {
  const baseUrl = "http://localhost:8080/deleteFolder";

  const queryParams = {
    dirName: fullPath
  };

  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "DELETE",
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function getFolder(dir) {
  const baseUrl = "http://localhost:8080/getFolder";

  const queryParams = {
    dirName: dir,
  };

  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "GET",
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function createNewFile() {
  var initialCode = [
    "&lt;!DOCTYPE html>",
    "&lt;html>",
    "&lt;!-- Create an IoT GUI -->",
    "&lt;title>&lt;/title>",
    "&lt;head>",
    "&lt;/head>",
    "<br>",
    "&lt;body>",
    "&lt;/body>",
    "&lt;/html>",
  ];
  editor.innerText = "";
  localStorage.setItem('file-loc', null)
  for (let i = 0; i < initialCode.length; i++) {
    document
      .getElementById("editor")
      .appendChild(document.createElement("span")).innerHTML = initialCode[i];
  }
  // editor.innerText = "Hello World!";
}

async function Open() {
  sessionStorage.setItem('sandboxOpen', 'false')
  window.location.href = "/ide";
}

async function save() {
  if (fileHandle == undefined) {
    fileHandle = await window.showSaveFilePicker();
  }
  let stream = await fileHandle.createWritable();
  await stream.write(editor.innerText);
  await stream.close();
}

async function saveUpdate() {
  let stream = await fileHandle.createWritable();
  await stream.write(editor.innerText);
  await stream.close();
}

async function saveAs() {
  fileHandle = await window.showSaveFilePicker();
  saveUpdate();
}


async function copy() {
  try {
    // Execute the copy command
    document.execCommand("copy");
  } catch (err) {
    console.log("Oops, unable to copy");
  }
}

async function paste() {
  navigator.clipboard
    .readText()
    .then((text) => {
      // Get the contenteditable element
      var editor = document.getElementById("editor");

      // Get the current selection
      var sel = window.getSelection();
      if (sel.rangeCount > 0) {
        // Get the first range of the selection
        var range = sel.getRangeAt(0);

        // Delete the contents of the range (if any selection is made)
        range.deleteContents();

        // Create a new text node and insert it
        var textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // Move the caret to the end of the inserted text
        range.setStartAfter(textNode);
        range.collapse(true); // Collapse the range to the end point

        // Update the selection with the new range
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        // If there's no selection, simply append the text
        editor.innerText += text;
      }
    })
    .catch((err) => {
      console.error("Failed to read clipboard contents:", err);
    });
}

async function cut() {
  try {
    // Execute the cut command
    document.execCommand("cut", false, null);
  } catch (err) {
    console.log("Oops, unable to cut");
  }
}

async function selectAll() {
  try {
    // Get the contenteditable element
    var text = document.getElementById("editor");

    // Create a range
    var range = document.createRange();
    range.selectNodeContents(text);

    // Get the selection object
    var selection = window.getSelection();

    // Remove any current ranges
    selection.removeAllRanges();

    // Add the new range
    selection.addRange(range);
  } catch (err) {
    console.log("Oops, unable to select all", err);
  }
}

async function undo() {
  try {
    // Execute the undo command
    document.execCommand("undo", false, null);
  } catch (err) {
    console.log("Oops, unable to undo");
  }
}

async function redo() {
  try {
    // Execute the redo command
    document.execCommand("redo", false, null);
  } catch (err) {
    console.log("Oops, unable to redo");
  }
}


getData()

async function getData() {
  let dir = JSON.parse(localStorage.getItem('file-loc'));

  getFiles(dir).then(data => {
    let initial = data.data.split('\n')
      .map(line => line.replace(/</g, '&lt;'));
    for (let i = 0; i < initial.length; i++) {
      document.getElementById('editor').appendChild(document.createElement('span')).innerHTML = initial[i];
    }
    // document.getElementById('editor').appendChild(document.createElement('span')).innerHTML = data.data
  })

}

async function getFiles(dir) {
  const baseUrl = "http://localhost:8080/readFile";

  const queryParams = {
    dirName: dir,
  };

  const urlWithQuery = `${baseUrl}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "GET",
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}


function isResultPageOpen() {
  return sessionStorage.getItem('sandboxOpen') === 'true'
}

function markResultPageOpen() {
  sessionStorage.setItem('sandboxOpen', 'true')
}

function markResultPageClose() {
  sessionStorage.setItem('sandboxOpen', 'false')
}

document.getElementsById('runoption').addEventListener('click', function () {
  if (isResultPageOpen()) {
  } else {
    window.open('/run')
    markResultPageOpen()
  }
})

window.addEventListener('beforeunload', function () {
  markResultPageClose()
})


var newTab
// async function runCode() {
//   if (isResultPageOpen()) {
//     try {
//       newTab.focus();
//       window.location.reload()
//     } catch (e) {
//       console.error("Unable to switch to the new tab:", e);
//     }
//   } else {
//     let dir = JSON.parse(localStorage.getItem("file-loc"));
//     newTab = window.open(`http://localhost:8080/runFile?dirName=${dir}`, '_blank');
//     markResultPageOpen()
//   }
// }

async function runCode() {
  let dir = JSON.parse(localStorage.getItem("file-loc"));
  
    const sandboxOpen = JSON.parse(localStorage.getItem('sandboxOpen'));
    if(sandboxOpen){
      const toggleWYSIWYG = JSON.parse(localStorage.getItem('toggleWYSIWYG'));
      localStorage.setItem('toggleWYSIWYG', !toggleWYSIWYG);
    }
    
    window.open(`http://localhost:8080/run-sandbox`);
    
}

// function checkIfWindowClosed() {
//   console.log('check window close', newTab?.close)
//   if (newTab?.closed) {
//     sessionStorage.setItem('sandboxOpen', 'false');
//     // clearInterval(checkInterval);
//   }
// }
// let checkInterval = setInterval(checkIfWindowClosed, 1000);


function toggleFullscreen() {
  const element = document.documentElement;

  if (document.fullscreenElement) {
      // If already in fullscreen, exit fullscreen
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
  } else {
      // If not in fullscreen, enter fullscreen
      if (element.requestFullscreen) {
          element.requestFullscreen();
      }
  }
}

function wysiwyg(){
  
  const sandboxOpen = JSON.parse(localStorage.getItem('sandboxOpen'));
  
  if(sandboxOpen){
    const toggleWYSIWYG = JSON.parse(localStorage.getItem('toggleWYSIWYG'));
    localStorage.setItem('toggleWYSIWYG', !toggleWYSIWYG);
    window.open(`http://localhost:8080/run-sandbox`);
  }else{
    window.location.href = '/run-sandbox'
  }
}
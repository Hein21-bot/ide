const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const path = require("path");
const fsE = require('fs-extra')

const port = 8080;
app.use(express.json()); // for parsing application/json
app.use(express.text({ type: "text/html" })); // for parsing string data

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Convert fs methods to return promises
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

app.get("/readFile", (req, res) => {
  const { dirName } = req.query;
  fs.readFile(dirName, "utf8", (err, data) => {
    const result = { data: data }
    if (err) {
      res.status(400).send(err);
    }
    if (data != undefined) {
      res.status(200).send(result);
    }
  });
});

app.get("/runFile", (req, res) => {
  // const { dirName } = req.query;
  const path = "./autoreload.html";

  fs.readFile(path, "utf8", (err, data) => {
    const result = data
    if (err) {
      res.status(400).send(err);
    }
    // checkURL('http://localhost:8080/readFile');
    res.status(200).send(result);
  });
})

app.post("/createFile", async (req, res) => {
  const content = req.body;
  const { fileName, dirName } = req.query;
  try {
    // if (!(await exists(dirName))) {
    //   await mkdir(dirName, { recursive: true });
    //   console.log("Directory created successfully");
    // }
    const filePath = path.join(dirName, fileName);

    if (fs.existsSync(filePath)) {
      res.status(400).send("Error: Filename already exit!");
    } else {
      await writeFile(filePath, content);
      res.send("File created successfully at " + filePath);
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.post("/updateFile", async (req, res) => {
  const content = req.body;
  const { fileName, dirName } = req.query;
  const path = "../File-Organizer/index.html";
  // const folder = "../File-Organizer";
  try {
    if (!(await exists(dirName))) {
      await mkdir(dirName, { recursive: true });
      console.log("Directory created successfully");
    }
    // const filePath = path.join(dirName, fileName);
    await writeFile(path, content); // Use 'filePath' instead of 'dirName'

    const filePath = "../File-Organizer/index.html";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("404 Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.delete("/deleteFile", (req, res) => {
  const { fileName, dirName } = req.query;
  const filePath = path.join(dirName, fileName);
  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).send("Error deleting the file");
    } else {
      res.send("File deleted successfully");
    }
  });
});

app.delete("/deleteFolder", async (req, res) => {
  const { dirName } = req.query
  // const folderPath = "../File-Organizer/New Folder"
  await deleteFolderRecursive(dirName)
    .then(() => res.status(200).send("Folder and all contents deleted!"))
    .catch(error => console.error('Error occurred:', error));

})

async function deleteFolderRecursive(directoryPath) {
  try {
    await fsE.remove(directoryPath);
    console.log('Folder and all contents deleted.');
  } catch (errro) {
    console.error('Error occurred:', error);
  }
}

app.get("/updateFileName", (req, res) => {
  const { fileName, dirName, oldFileName } = req.query;

  const filePath = path.join(dirName, fileName);
  const oldFilePath = path.join(dirName, oldFileName);
  fs.rename(oldFilePath, filePath, (err) => {
    if (err) {
      console.error("Error occurred:", err);
    } else {
      res.send("File update successfully");
    }
  });
});

app.get("/createFolder", async (req, res) => {
  const { dirName, folderName } = req.query;
  const folderPath = path.join(dirName, folderName);
  if (!(await exists(folderPath))) {
    await mkdir(folderPath, { recursive: true });
    res.status(200).send("Folder Created Successful!");
  } else {
    res.status(400).send("Folder name already exist!");
  }
});

function convertTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

app.get("/getFolder", async (req, res) => {
  // const dirName = "../File-Organizer";
  const { dirName } = req.query;
  let data = [];

  try {
    const files = await readdir(dirName, { withFileTypes: true });

    // Create an array of promises for each file's details
    const promises = files.map(async (dirent) => {
      let fullPath = path.join(dirName, dirent.name);
      try {
        const stats = await stat(fullPath);

        // Constructing the details
        return {
          name: dirent.name,
          path: fullPath,
          type: dirent.isDirectory() ? "Folder" : "File",
          size: stats.size + " bytes",
          createdAt: convertTimestamp(stats.birthtimeMs), // Creation time
          modifiedAt: convertTimestamp(stats.mtimeMs), // Last modified time
        };
      } catch (err) {
        console.error(`Error getting stats for file ${dirent.name}:`, err);
        // Return null or some error indication if needed
        return null;
      }
    });

    // Wait for all promises to resolve and filter out any null responses
    data = (await Promise.all(promises)).filter((detail) => detail !== null);

    res.status(200).send(data);
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).send("Error reading directory");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "fileOrganizer.html"));
});

app.get("/ide", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/run-sandbox", (req, res) => {
  exec("erl -noshell -s test start", (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return res.send("Error");
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send("Sandbox Executed");
  });
});

// http.createServer((req, res) => {
//   const path = '../File-Organizer/index.html'
//   fs.readFile(path, (err, data) => {
//       if (err) {
//           res.writeHead(404);
//           res.end("404 Not Found");
//           return;
//       }
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(data);
//   });
// }).listen(5000, () => {
//   console.log('Server running at http://localhost:5000/');
// });

async function autoCreateFolder() {
  const folderPath = '../File Organizer'
  if (!(await exists(folderPath))) {
    await mkdir(folderPath, { recursive: true });
    console.log('Folder Created!')
  } else {
    console.log('Folder already exist!')
  }
}

app.listen(port, async () => {
  await autoCreateFolder()
  console.log(`Server running at http://localhost:${port}`);
});

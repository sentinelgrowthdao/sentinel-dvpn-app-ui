const { exec } = require("child_process");
const { promisify } = require("util");
function bumpVersion(type, message) {
  return new Promise(async (resolve, reject) => {
    if (type && ["patch", "minor", "major"].includes(type)) {
      if (message && message.length > 0) {
        try {
          await exec(`yarn version --${type}`);
          await exec(`git add .`);
          await exec(`git commit -m "${message}"`);
          resolve();
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error("Invalid message provided!"));
      }
    } else {
      reject(new Error("Invalid version type provided!"));
    }
  });
}

async function run() {
  try {
    console.log("Building the app...");
    const execPromise = promisify(exec);
    await execPromise("yarn build");
    const readline1 = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline1.question(
      "Select a version type: patch | minor | major and Git message [with : between] ",
      async (data) => {
        const [type = "", message = ""] = data.split(": ");
        try {
          await bumpVersion(type, message);
        } catch (e) {
          console.error(e.message);
        } finally {
          readline1.close();
        }
      }
    );
  } catch (e) {
    console.log("Building the app is failed");
  }
}

run();

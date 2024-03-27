const { exec } = require("child_process");
function bumpVersion(type) {
  return new Promise(async (resolve, reject) => {
    if (type && ["patch", "minor", "major"].includes(type)) {
      try {
        await exec(`yarn version --${type}`);
        await exec(`git add .`);
        await exec(`git commit -m "chore: Updated the package version"`);
        resolve();
      } catch (e) {
        reject(e);
      }
    } else {
      reject(new Error("Invalid version type provided!"));
    }
  });
}

async function run() {
  try {
    const readline1 = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline1.question(
      "Select a version type: patch | minor | major: ",
      async (type) => {
        try {
          await bumpVersion(type);
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

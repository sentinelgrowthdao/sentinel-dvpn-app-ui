const { exec } = require("child_process");

async function bumpVersion(type) {
  if (type && ["patch", "minor", "major"].includes(type)) {
    console.log("BUilding...");
    await exec(`yarn version --${type}`);
    await exec(`yarn build`);
    await exec(`git add .`);
    await exec(`git commit -m "chore: package version bumped"`);
    await exec(`git push`);
  } else {
    console.log("Invalid version type provided!");
  }
}

async function run() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(
    "Select a version type: patch | minor | major: ",
    async (type) => {
      await bumpVersion(type);
      readline.close();
    }
  );
}

// Call the run function
run();

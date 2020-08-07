const request = require("request");

const fs = require("fs");

module.exports = function () {
  process.stdout.write("prompt > ");

  process.stdin.on("data", (data) => {
    const cmd = data.toString().trim();
    if (cmd === "pwd") {
      console.log(process.cwd());
    }
    if (cmd === "ls") {
      fs.readdir("./", "utf8", (err, files) => {
        if (err) {
          throw err;
        } else {
          process.stdout.write(files.join("\n") + "\n");
          process.stdout.write("prompt > ");
        }
      });
    }

    if (cmd.slice(0,3) === "cat")
      fs.readFile(cmd.slice(4), "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
      });

    if (cmd.slice(0,4) === "curl")
      request(cmd.slice(4), function (error, response, body) {
        console.error("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the HTML for the Google homepage.
      });

    process.stdout.write("You typed:" + cmd);
    process.stdout.write("\nprompt >");
  });
};

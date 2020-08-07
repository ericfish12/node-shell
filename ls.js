










const fs = require('fs');





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
        process.stdout.write(files.join("\n")+'\n');
        process.stdout.write("prompt > ");
      }
    });





    } 
    process.stdout.write("You typed:" + cmd);
    process.stdout.write("\nprompt >");
  });
};

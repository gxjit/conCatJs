

 // Copyright (c) 2019 Gurjit Singh

 // This source code is licensed under the MIT license that can be found in
 // the accompanying LICENSE file or at https://opensource.org/licenses/MIT


const cli = require("caporal");
const path = require("path");
const fs = require("fs");
const conCat = require("./conCat");

(() => {
  "use strict";
  try {
    cli
      .version("0.1")
      .help("Concatenate files", { name: "INFO" })
      .argument("<dir>", "directory path", dir => {
        try {
          fs.accessSync(dir, fs.constants.R_OK);
        } catch (e) {
          throw e;
        }
        return path.resolve(dir);
      })
      .argument("[ext]", "file extension", ext => String(ext), "txt")
      .action(args => {
        // console.log(args.dir, args.ext);
        conCat(args.dir, args.ext);
      });

    cli.parse(process.argv);
  } catch (e) {
    console.log(e);
  }
})();

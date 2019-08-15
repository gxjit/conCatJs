

 // Copyright (c) 2019 Gurjit Singh

 // This source code is licensed under the MIT license that can be found in
 // the accompanying LICENSE file or at https://opensource.org/licenses/MIT


const R = require("ramda");
const fs = require("fs");
const path = require("path");

module.exports = conCat = (resPath, ext) => {
  "use strict";
  // const _ = R.__;

  const readDirCr = x => fs.readdirSync(x, { withFileTypes: true });
  const readFileCr = x => fs.readFileSync(x, "utf8");
  const pathJoinCr = x => path.join(resPath, x);
  const pathJoinDirentCr = x => pathJoinCr(x.name);

  const logC = x => console.log(x);

  const filterFiles = x => R.filter(y => R.and(y.isFile(), y.name.endsWith(x)));
  const filterTextFiles = filterFiles("." + ext);

  const thrower = x => {
    throw x;
  };
  const errorIfEmpty = x => y => (R.isEmpty(y) ? thrower(x) : y);
  const errorIfEmptyMsg = errorIfEmpty("No Files...");

  const pathJoinArray = R.map(pathJoinDirentCr);
  const readFilesArray = R.map(readFileCr);

  const joinTrimReplSplit = R.pipe(
    R.join("\n"),
    R.trim,
    R.replace(/\r+/g, ""),
    R.split("\n")
  );

  const getUnique = x => new Set(x);

  const arrayFromNewlines = x => Array.from(x).join("\n");

  const writeFile = x => y => fs.writeFileSync(pathJoinCr(x), y);
  const writeToFile = writeFile("0conct.txt");

  R.pipe(
    readDirCr,
    filterTextFiles,
    errorIfEmptyMsg,
    pathJoinArray,
    readFilesArray,
    joinTrimReplSplit,
    getUnique,
    arrayFromNewlines,
    writeToFile
    // logC
  )(resPath);
};

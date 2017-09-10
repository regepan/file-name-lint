#!/usr/bin/env node
"use strict";

const sgf = require('staged-git-files');
const symbols = require("log-symbols");

sgf('ACM', (err, files) => {
  if (err) {
    console.error(err);
  }

  files.forEach((file) => {
    if (file.filename.match(/\s/)) {
      console.error('  ' + symbols['error'], file.filename + ' ["white space" is invalid for file name. Remove it.]');
      process.exit(1);
    }
  });
});

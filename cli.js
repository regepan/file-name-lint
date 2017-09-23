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

    const extension = file.filename.match(/.+(\.[^.]+$)/)[1];

    if (extension.match(/[A-Z]/)) {
      console.error('  ' + symbols['error'], extension + ' file name extension should be lowercase.');
      process.exit(1);
    }

    if (extension === '.jpeg') {
      console.error('  ' + symbols['error'], extension + ' should be ".jpg".');
      process.exit(1);
    }
  });
});

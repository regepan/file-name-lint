#!/usr/bin/env node
"use strict";

const path = require('path');
const sgf = require('staged-git-files');
const symbols = require("log-symbols");

sgf('ACM', (err, files) => {
  if (err) {
    console.error(err);
  }

  files.forEach((file) => {
    if (file.filename.match(/\s/)) {
      console.error('  ' + symbols['error'], file.filename + ' ["white space" is invalid file name. Remove it.]');
      process.exit(1);
    }

    if (file.filename.match(/[^\x01-\x7E]/)) {
      console.error('  ' + symbols['error'], file.filename + ' ["full width letter" is invalid file name. Change to half width.]');
      process.exit(1);
    }

    const pathObject = path.parse(file.filename);
    const extension = pathObject['ext'];

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

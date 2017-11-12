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
    if (checkWhiteSpace(file.filename)) {
      console.error('  ' + symbols['error'], fileName + ' ["white space" is invalid file name. Remove it.]');
      process.exit(1);
    }

    if (checkFullWidthLetter(file.filename)) {
      console.error('  ' + symbols['error'], file.filename + ' ["full width letter" is invalid file name. Change to half width.]');
      process.exit(1);
    }

    const pathObject = path.parse(file.filename);
    const extension = pathObject['ext'];

    if (checkExtensionIsLowercase(extension)) {
      console.error('  ' + symbols['error'], extension + ' file name extension should be lowercase.');
      process.exit(1);
    }

    if (checkJpeg(extension)) {
      console.error('  ' + symbols['error'], extension + ' should be ".jpg".');
      process.exit(1);
    }
  });
});

module.exports.checkWhiteSpace = function (fileName) {
  return fileName.match(/\s/);
};

module.exports.checkFullWidthLetter = function (fileName) {
  return fileName.match(/[^\x01-\x7E]/);
};

module.exports.checkExtensionIsLowercase = function (extension) {
  return extension.match(/[A-Z]/);
};

module.exports.checkJpeg = function (extension) {
  return extension === '.jpeg';
};

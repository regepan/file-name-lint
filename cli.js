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
    const name = pathObject['name'];
    const extension = pathObject['ext'];

    if (checkSymbol(name)) {
      console.error('  ' + symbols['error'], name + ' is invalid');
      process.exit(1);
    }

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

const checkWhiteSpace = function (fileName) {
  return fileName.match(/\s/);
};

const checkFullWidthLetter = function (fileName) {
  return fileName.match(/[^\x01-\x7E]/);
};

const checkSymbol = function (fileName) {
  return fileName.match(/[!"#$%&'()\*,\/:;<=>?\[\\\]^`{|}~]/);
};

const checkExtensionIsLowercase = function (extension) {
  return extension.match(/[A-Z]/);
};

const checkJpeg = function (extension) {
  return extension === '.jpeg';
};

module.exports.checkWhiteSpace = checkWhiteSpace;
module.exports.checkFullWidthLetter = checkFullWidthLetter;
module.exports.checkSymbol = checkSymbol;
module.exports.checkExtensionIsLowercase = checkExtensionIsLowercase;
module.exports.checkJpeg = checkJpeg;

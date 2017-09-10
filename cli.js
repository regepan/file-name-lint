#!/usr/bin/env node
"use strict";

const sgf = require('staged-git-files');
const symbols = require("log-symbols");

sgf('ACM', (err, files) => {
    if (err) {
        console.error(err);
    }

    let hasCSS = false;
    let hasSCSS = false;

    files.forEach((file) => {
      if (file.filename.match(/.*?\.css$/)) {
        hasCSS = true;
      }

      if (file.filename.match(/.*?\.scss$/)) {
        hasSCSS = true;
      }
    });

    if ((hasCSS === true && hasSCSS === false) || hasCSS === false && hasSCSS === true) {
      console.error('  ' + symbols['error'], 'SCSS & CSS file pair need to be added in one commit');
      process.exit(1);
    }
});

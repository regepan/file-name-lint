const fileNameLint = require("../cli");
const assert = require("assert");

it("white space is invalid", () => {
  const val = fileNameLint.checkWhiteSpace("img/a pple.png");
  
  if (val) {
    assert(true);
  }
});

it("full width letter is invalid", () => {
  const val = fileNameLint.checkExtensionIsLowercase("img/ａ.png");

  if (val) {
    assert(true);
  }
});

it("symbol is invalid", () => {
  const val = fileNameLint.checkSymbol("apple*.png");

  if (val) {
    assert(true);
  }
});

it("upper case extension is invalid", () => {
  const val1 = fileNameLint.checkExtensionIsLowercase("img/apple.PNG");

  if (val1) {
    assert(true);
  }

  const val2 = fileNameLint.checkExtensionIsLowercase("img/apple.Jpg");
  
  if (val2) {
    assert(true);
  }
});

it("jpeg is invalid", () => {
  const val = fileNameLint.checkJpeg("img/apple.jpeg");

  if (val) {
    assert(true);
  }
});

it('No need to omit file name. Use "icon"', () => {
  const val = fileNameLint.checkIco("img/ico-apple.jpg");
  
  if (val) {
    assert(true);
  }
});

it('No need to omit file name. Use "icon"', () => {
  const val = fileNameLint.checkIco("img/icon-apple.jpg");
  
  if (val === null) {
    assert(true);
  }
});

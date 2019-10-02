"use strict";

exports.__esModule = true;
exports.default = toValidCSSIdentifier;

// require("core-js/modules/es.regexp.replace");

function toValidCSSIdentifier(s) {
  return s.replace(/[^_0-9a-z]/gi, '_');
}
//# sourceMappingURL=toValidCSSIdentifier.js.map
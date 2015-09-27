const installedPodRegex = require('installed-pod-regex');
const stripAnsi = require('strip-ansi');

module.exports = function installedPods(log) {
  'use strict';

  if (typeof log !== 'string') {
    throw new TypeError(
      String(log) +
      ' is not a string.' +
      ' Expected an output generated with a CocoaPods installation command (like `pod install`).'
    );
  }

  log = stripAnsi(log);

  const regex = installedPodRegex();
  const results = [];
  let matched;
  let obj;

  while ((matched = regex.exec(log)) !== null) {
    obj = {
      name: matched[1],
      current: matched[2]
    };

    if (matched[3] !== undefined) {
      obj.previous = matched[3];
    }

    results.push(obj);
  }

  return results;
};

# installed-pods

[![NPM version](https://img.shields.io/npm/v/installed-pods.svg)](https://www.npmjs.com/package/installed-pods)
[![Build Status](https://travis-ci.org/shinnn/installed-pods.svg?branch=master)](https://travis-ci.org/shinnn/installed-pods)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/installed-pods.svg)](https://coveralls.io/r/shinnn/installed-pods)
[![devDependency Status](https://david-dm.org/shinnn/installed-pods.svg)](https://david-dm.org/shinnn/installed-pods)
[![devDependency Status](https://david-dm.org/shinnn/installed-pods/dev-status.svg)](https://david-dm.org/shinnn/installed-pods#info=devDependencies)

Extract installed [Pod](https://cocoapods.org/) information from the output of a [CocoaPods installation command](https://guides.cocoapods.org/terminal/commands.html#group_installation)


```javascript
const installedPods = require('installed-pods');

const stdout = `
Using colored 1.2
Installing rouge 1.10.1
Installing xcjobs 0.2.2 (was 0.1.2)
`;

installedPods(stdout)
/* => [
        {
          name: 'rouge',
          current: '1.10.1'
        },
        {
          name: 'xcjobs',
          current: '0.2.2',
          previous: '0.1.2'
        }
      ]
*/
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install installed-pods
```

## API

### installedPods(*str*)

*str*: `String`  
Return: `Array` of plain objects

It parses a string of the installation log generated with CocoaPods installation commands (e.g. [`pod install`](https://guides.cocoapods.org/terminal/commands.html#pod_install)) and returns an array of objects that shows which Pod was installed. Each of the object is in the form:

```javascript
{
  name: "Pod name", // String
  current: "installed version", // String
  previous: "previous version" // String, or `undefined` if the Pod was newly installed
}
```

It automatically strips [ANSI escape codes](https://wikipedia.org/wiki/ANSI_escape_code) before parsing a string.

```javascript
const installedPods = ('installed-pods');

installedPods('\u001b[32mInstalling rouge 1.10.1\u001b[39m');
//=> [{name: 'rouge', current: '1.10.1'}]
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

'use strong';

const installedPods = require('.');
const test = require('tape');

const fixture = `
Updating local specs repositories
Analyzing dependencies
Downloading dependencies
Using colored 1.2
Installing rouge 1.10.1
\u001b[4mInstalling xcjobs 0.2.2 (was 0.1.2)\u001b[0m
`;

test('installedPods()', t => {
  t.plan(5);

  t.equal(installedPods.name, 'installedPods', 'should have a function name.');

  t.deepEqual(
    installedPods(fixture),
    [{current: '1.10.1', name: 'rouge'}, {current: '0.2.2', name: 'xcjobs', previous: '0.1.2'}],
    'should extract the information of installled Pods from a string.'
  );

  t.deepEqual(
    installedPods('foo'),
    [],
    'should return an empty array when it cannot find any information of installled Pods.'
  );

  t.throws(
    () => installedPods(1),
    /TypeError.*1 is not a string\./,
    'should throw a type error when it takes a non-string argument.'
  );

  t.throws(
    () => installedPods(),
    /Expected an output generated with a CocoaPods installation command \(like `pod install`\)\./,
    'should throw a type error when it takes no arguments.'
  );
});

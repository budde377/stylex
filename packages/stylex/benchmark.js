/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const stylex = require('./lib/stylex').default;
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const test = (...args) => suite.add(...args);

const bigStyle = {
  backgroundColor: 'nu7423ey',
  borderColor: 'tpe1esc0',
  borderStyle: 'gewhe1h2',
  borderWidth: 'gcovof34',
  boxSizing: 'bdao358l',
  display: 'rse6dlih',
  listStyle: 's5oniofx',
  marginTop: 'm8h3af8h',
  marginEnd: 'l7ghb35v',
  marginBottom: 'kjdc1dyq',
  marginStart: 'kmwttqpk',
  paddingTop: 'srn514ro',
  paddingEnd: 'oxkhqvkx',
  paddingBottom: 'rl78xhln',
  paddingStart: 'nch0832m',
  textAlign: 'cr00lzj9',
  textDecoration: 'rn8ck1ys',
  whiteSpace: 'n3t5jt4f',
  wordWrap: 'gh25dzvf',
  zIndex: 'g4tp4svg',
};

const bigStyleWithPseudos = {
  backgroundColor: 'g5ia77u1',
  border: 'e4t7hp5w',
  color: 'gmql0nx0',
  cursor: 'nhd2j8a9',
  display: 'q9uorilb',
  fontFamily: 'ihxqhq3m',
  fontSize: 'l94mrbxd',
  lineHeight: 'aenfhxwr',
  marginTop: 'kvgmc6g5',
  marginEnd: 'cxmmr5t8',
  marginBottom: 'oygrvhab',
  marginStart: 'hcukyx3x',
  paddingTop: 'jb3vyjys',
  paddingEnd: 'rz4wbd8a',
  paddingBottom: 'qt6c0cv9',
  paddingStart: 'a8nywdso',
  textAlign: 'i1ao9s8h',
  textDecoration: 'myohyog2',
  ':hover': {
    color: 'ksdfmwjs',
    textDecoration: 'gofk2cf1',
  },
  ':active': {
    transform: 'lsqurvkf',
    transition: 'bj9fd4vl',
  },
};

test('stylex(): basic', () => {
  stylex({
    backgroundColor: 'nu7423ey',
  });
});

test('stylex(): complex', () => {
  stylex(bigStyle);
});

test('stylex(): basic merge (args)', () => {
  stylex(
    {
      backgroundColor: 'nu7423ey',
    },
    {
      backgroundColor: 'gh25dzvf',
    }
  );
});

test('stylex(): basic merge (array)', () => {
  stylex([
    {
      backgroundColor: 'nu7423ey',
    },
    {
      backgroundColor: 'gh25dzvf',
    },
  ]);
});

test('stylex(): complex merge (array)', () => {
  stylex([
    bigStyle,
    false,
    false,
    false,
    false,
    [
      {
        cursor: 'fsf7x5fv',
        touchAction: 's3jn8y49',
      },
      false,
      {
        outline: 'icdlwmnq',
      },
      [
        {
          cursor: 'nhd2j8a9',
          touchAction: 'f1sip0of',
        },
        false,
        false,
        {
          textDecoration: 'esuyzwwr',
          ':hover': {
            textDecoration: 'p8dawk7l',
          },
        },
        false,
        [
          bigStyleWithPseudos,
          {
            display: 'a8c37x1j',
            width: 'k4urcfbm',
          },
          [
            {
              ':active': {
                transform: 'tm8avpzi',
              },
            },
          ],
        ],
      ],
    ],
  ]);
});

suite.on('cycle', (event) => {
  console.log(String(event.target));
});

suite.run();
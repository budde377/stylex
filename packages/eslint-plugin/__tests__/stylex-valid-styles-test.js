/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

jest.disableAutomock();

const { RuleTester: ESLintTester } = require('eslint');
const rule = require('../src/stylex-valid-styles');

ESLintTester.setDefaultConfig({
  parser: require.resolve('hermes-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const eslintTester = new ESLintTester();

eslintTester.run('stylex-valid-styles', rule.default, {
  valid: [
    // test for local static variables
    `
      const start = 'start';
      const styles = stylex.create({
        default: {
          textAlign: start,
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          transitionProperty: 'opacity, transform',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease',
        }
      });
    `,
    `
      const start = 'start';
      const grayscale = 'grayscale';
      const styles = stylex.create({
        default: {
          textAlign: start,
          MozOsxFontSmoothing: grayscale,
          WebkitFontSmoothing: 'antialiased',
          transitionProperty: 'opacity, transform',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease',
        }
      });
    `,
    `
      const bounce = stylex.keyframes({
        '0%': {
          transform: 'translateY(0)',
        },
        '50%': {
          transform: 'translateY(-10px)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      });
      const styles = stylex.create({
        default: {
          animationName: bounce,
          animationDuration: '1s',
          animationIterationCount: 'infinite',
        }
      });
    `,
    `
      const styles = stylex.create({
        default: {
          animationName: stylex.keyframes({
            '0%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-10px)',
            },
            '100%': {
              transform: 'translateY(0)',
            },
          }),
          animationDuration: '1s',
          animationIterationCount: 'infinite',
        }
      });
    `,
    `
      const bounce = stylex.keyframes({
        '0%': {
          transform: 'translateY(0)',
        },
        '50%': {
          transform: 'translateY(-10px)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      });
      const shimmy = stylex.keyframes({
        '0%': {
          backgroundPosition: '-468px 0',
        },
        '100%': {
          backgroundPosition: '468px 0',
        },
      });
      const styles = stylex.create({
        default: {
          animationName: \`\${bounce}, \${shimmy}\`,
          animationDuration: '1s',
          animationIterationCount: 'infinite',
        }
      });
    `,
    // test for nested styles
    `
      const TRANSPARENT = 0;
      const OPAQUE = 1;
      const styles = stylex.create({
        default: {
          opacity: TRANSPARENT,
          ':hover': {
            opacity: OPAQUE,
          },
          ':focus-visible': {
            border: "1px solid blue"
          }
        }
      });
    `,
    `
     const styles = stylex.create({
       default: {
         width: '50%',
         '@media (max-width: 600px)': {
           width: '100%',
         }
       }
     });`,
    // test for positive numbers
    'stylex.create({default: {marginStart: 5}});',
    // test for literals as namespaces
    'stylex.create({"default-1": {marginStart: 5}});',
    'stylex.create({["default-1"]: {marginStart: 5}});',
    // test for numbers as namespaces
    'stylex.create({0: {marginStart: 5}});',
    // test for computed numbers as namespaces
    'stylex.create({[0]: {marginStart: 5}});',
    // test for negative values.
    'stylex.create({default: {marginStart: -5}});',
    "stylex.create({default: {textAlign: 'start'}});",
    // test for presets
    `stylex.create({
       default: {
         textAlign: 'start',
       }
     });`,
    // test for Math
    `stylex.create({
       default: {
         marginStart: Math.abs(-1),
         marginEnd: \`\${Math.floor(5 / 2)}px\`,
         paddingStart: Math.ceil(5 / 2),
         paddingEnd: Math.round(5 / 2),
       },
     })`,
    `
     const x = 5;
     stylex.create({
       default: {
         marginStart: Math.abs(x),
         marginEnd: \`\${Math.floor(x)}px\`,
         paddingStart: Math.ceil(-x),
         paddingEnd: Math.round(x / 2),
       },
     })`,
    // test for Search
    `
     stylex.create({
       default: {
         'WebkitAppearance': 'textfield',
         '::-webkit-search-decoration': {
           appearance: 'none',
         },
         '::-webkit-search-cancel-button': {
           appearance: 'none',
         },
         '::-webkit-search-results-button': {
           appearance: 'none',
         },
         '::-webkit-search-results-decoration': {
           appearance: 'none',
         },
       },
     })`,
    // test for color
    `
     stylex.create({
       default: {
         'color': 'red',
       },
     })`,
    `
     stylex.create({
       default: {
         'color': '#fff',
       },
     })`,
    `
     stylex.create({
       default: {
         'color': '#fafbfc',
       },
     })`,
    `
     stylex.create({
       default: {
         'color': '#fafbfcfc',
       },
     })`,
    // test for relative width
    `
     stylex.create({
       default: {
         'width': '30rem',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30em',
       },
      })`,
    `
     stylex.create({
       default: {
         'width': '30ch',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30ex',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30vh',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30vw',
       },
     })`,
    // test for absolute width
    `
     stylex.create({
       default: {
         'width': '30px',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30cm',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30mm',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30in',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30pc',
       },
     })`,
    `
     stylex.create({
       default: {
         'width': '30pt',
       },
     })`,
    // test for percentage
    `
     stylex.create({
       default: {
         'width': '50%',
       },
     })`,
    `stylex.create({
       default: {
         fontWeight: 'var(--weight)',
       },
     })`,
    `stylex.create({
      default: {
        fontWeight: 'var(--🔴)',
      },
    })`,
    `
    const red = 'var(--🔴)';
    stylex.create({
      default: {
        fontWeight: red,
      },
    })`,
  ],
  invalid: [
    {
      code: "stylex.create({default: {textAlin: 'left'}});",
      errors: [
        {
          message: 'This is not a key that is allowed by stylex',
          suggestions: [
            {
              desc: 'Did you mean "textAlign"?',
              output: "stylex.create({default: {textAlign: 'left'}});",
            },
          ],
        },
      ],
    },
    {
      code: "stylex.create({default: {textAlin: 'left'}});",
      errors: [
        {
          message: 'This is not a key that is allowed by stylex',
          suggestions: [
            {
              desc: 'Did you mean "textAlign"?',
              output: "stylex.create({default: {textAlign: 'left'}});",
            },
          ],
        },
      ],
    },
    {
      code: 'stylex.create({default: {["textAlin"]: \'left\'}});',
      errors: [
        {
          message: 'This is not a key that is allowed by stylex',
          suggestions: [
            {
              desc: 'Did you mean "textAlign"?',
              output: 'stylex.create({default: {["textAlign"]: \'left\'}});',
            },
          ],
        },
      ],
    },
    {
      code: "stylex.create({default: {transition: 'all 0.3s ease'}});",
      errors: [
        {
          message: 'This is not a key that is allowed by stylex',
        },
      ],
    },
    {
      code: "stylex.create({default: {textAlign: 'lfet'}});",
      errors: [
        {
          message: `textAlign value must be one of:
start
end
left
right
center
justify
match-parent
initial
inherit
unset
revert`,
        },
      ],
    },
    {
      code: 'stylex.create({default: {fontWeight: 99}});',
      errors: [
        {
          message: `fontWeight value must be one of:
normal
bold
bolder
lighter
100
200
300
400
500
600
700
800
900
a CSS Variable
initial
inherit
unset
revert`,
        },
      ],
    },
    {
      code: 'stylex.create({default: {content: 100 + 100}});',
      errors: [
        {
          message: `content value must be one of:
a string literal
initial
inherit
unset
revert`,
        },
      ],
    },
    {
      code: "stylex.create({default: {transitionProperty: 'all'}});",
      errors: [
        {
          message: `transitionProperty value must be one of:
opacity
transform
opacity, transform
none
initial
inherit
unset
revert`,
        },
      ],
    },
    {
      code: "stylex.create({default: {transitionProperty: 'height'}});",
      errors: [
        {
          message: `transitionProperty value must be one of:
opacity
transform
opacity, transform
none
initial
inherit
unset
revert`,
        },
      ],
    },
    {
      code: "stylex.create({default: {transitionProperty: 'transfrom'}});",
      errors: [
        {
          message: `transitionProperty value must be one of:
opacity
transform
opacity, transform
none
initial
inherit
unset
revert`,
        },
      ],
    },
    {
      code: "stylex.create({default: {':hover': {textAlin: 'left'}}});",
      errors: [
        {
          message: 'This is not a key that is allowed by stylex',
        },
      ],
    },
    {
      code: "stylex.create({default: {':focus': {textAlign: 'lfet'}}});",
      errors: [
        {
          message: `textAlign value must be one of:
start
end
left
right
center
justify
match-parent
initial
inherit
unset
revert`,
          suggestions: [
            {
              desc: 'Did you mean "left"? Replace "lfet" with "left"',
              output:
                "stylex.create({default: {':focus': {textAlign: 'left'}}});",
            },
          ],
        },
      ],
    },
    {
      code: `
         stylex.create({
           default: {
             ':focs': {
               textAlign: 'left'
             }
           }
         });
       `,
      errors: [
        {
          message:
            'Nested styles can only be used for the pseudo selectors in the stylex allowlist and for @media queries',
        },
      ],
    },
    {
      code: `
         stylex.create({
           default: {
             ':focus': {
               ':hover': {
                 textAlign: 'left'
               }
             }
           }
         });
       `,
      errors: [
        {
          message: 'You cannot nest styles more than one level deep',
        },
      ],
    },
    {
      code: 'stylex.create({default: {transitionProperty: "opasity"}});',
      errors: [
        {
          message: `transitionProperty value must be one of:
opacity
transform
opacity, transform
none
initial
inherit
unset
revert`,
          suggestions: [
            {
              desc: 'Did you mean "opacity"? Replace "opasity" with "opacity"',
              output:
                'stylex.create({default: {transitionProperty: "opacity"}});',
            },
          ],
        },
      ],
    },
    {
      code: `const tp = "opasity";
const styles = stylex.create({default: {transitionProperty: tp}});`,
      errors: [
        {
          message: `transitionProperty value must be one of:
opacity
transform
opacity, transform
none
initial
inherit
unset
revert`,
          suggestions: [
            {
              desc: 'Did you mean "opacity"? Replace "opasity" with "opacity"',
              output: `const tp = "opacity";
const styles = stylex.create({default: {transitionProperty: tp}});`,
            },
          ],
        },
      ],
    },
    {
      code: `
        const bounce = stylex.keyframes({
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        });
        const styles = stylex.create({
          default: {
            animationName: bob,
            animationDuration: '1s',
            animationIterationCount: 'infinite',
          }
        });
      `,
      errors: [
        {
          message: `animationName value must be one of:
none
a \`stylex.keyframes(...)\` function call, a reference to it or a many such valid
initial
inherit
unset
revert`,
          suggestions: [],
        },
      ],
    },
  ],
});
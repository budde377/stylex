/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const stylexPlugin = require('../src/index');

describe('rollup-plugin-stylex', () => {
  async function runStylex(options) {
    // Configure a rollup bundle
    const bundle = await rollup.rollup({
      // Remove stylex runtime from bundle
      external: ['stylex'],
      input: path.resolve(__dirname, '__fixtures__/index.js'),
      plugins: [
        nodeResolve(),
        commonjs(),
        babel({
          babelHelpers: 'bundled',
          configFile: path.resolve(__dirname, '__fixtures__/.babelrc.json'),
          exclude: [/npmStyles\.js/],
        }),
        stylexPlugin(options),
      ],
    });

    // Generate output specific code in-memory
    // You can call this function multiple times on the same bundle object
    const { output } = await bundle.generate({
      file: path.resolve(__dirname, '/__builds__/bundle.js'),
    });

    let css, js;

    for (const chunkOrAsset of output) {
      if (chunkOrAsset.fileName === 'stylex.css') {
        css = chunkOrAsset.source;
      } else if (chunkOrAsset.fileName === 'bundle.js') {
        js = chunkOrAsset.code;
      }
    }

    return { css, js };
  }

  it('extracts CSS and removes stylex.inject calls', async () => {
    const { css, js } = await runStylex({ fileName: 'stylex.css' });

    expect(css).toMatchInlineSnapshot(`
      "@keyframes x11gtny7-B{0%{opacity:.25;}100%{opacity:1;}}
      .x1nrqb13{animation-name:x11gtny7-B}
      .xntgbld{display:block}
      .x1c4r43l{display:flex}
      .x1wdx05y{display:inline}
      .x1je5kxa{height:500px}
      .xo3gju4{margin-inline-start:10px}
      .x1h9ru99{margin-top:99px}
      .x6mlivy{width:100%}
      .x1u78jha{width:50%}
      .x1kflwvg:hover{background:red}"
    `);

    expect(js).toMatchInlineSnapshot(`
      "import stylex from 'stylex';

      // otherStyles.js
      var styles$2 = {
        bar: {
          display: "xntgbld",
          width: "x6mlivy",
          $$css: true
        }
      };

      // npmStyles.js
      const styles$1 = {
        baz: {
          display: "x1wdx05y",
          height: "x1je5kxa",
          width: "x1u78jha",
          $$css: true
        }
      };

      // index.js
      var styles = {
        foo: {
          animationName: "x1nrqb13",
          display: "x1c4r43l",
          marginInlineStart: "xo3gju4",
          marginLeft: null,
          marginRight: null,
          marginTop: "x1h9ru99",
          height: "x1je5kxa",
          ":hover_background": "x1kflwvg",
          ":hover_backgroundAttachment": null,
          ":hover_backgroundClip": null,
          ":hover_backgroundColor": null,
          ":hover_backgroundImage": null,
          ":hover_backgroundOrigin": null,
          ":hover_backgroundPosition": null,
          ":hover_backgroundRepeat": null,
          ":hover_backgroundSize": null,
          $$css: true
        }
      };
      function App() {
        return stylex(styles$2.bar, styles.foo, styles$1.baz);
      }

      export { App as default };
      "
    `);
  });

  describe('when in dev mode', () => {
    it('preserves stylex.inject calls and does not extract CSS', async () => {
      const { css, js } = await runStylex({
        dev: true,
        fileName: 'stylex.css',
      });

      expect(css).toBeUndefined();

      expect(js).toMatchInlineSnapshot(`
        "import stylex from 'stylex';

        // otherStyles.js
        stylex.inject(".xntgbld{display:block}", 4);
        stylex.inject(".x6mlivy{width:100%}", 4);
        var styles$2 = {
          bar: {
            "otherStyles__styles.bar": "otherStyles__styles.bar",
            display: "xntgbld",
            width: "x6mlivy",
            $$css: true
          }
        };

        // npmStyles.js
        stylex.inject(".x1wdx05y{display:inline}", 4);
        stylex.inject(".x1je5kxa{height:500px}", 4);
        stylex.inject(".x1u78jha{width:50%}", 4);
        const styles$1 = {
          baz: {
            "npmStyles__styles.baz": "npmStyles__styles.baz",
            display: "x1wdx05y",
            height: "x1je5kxa",
            width: "x1u78jha",
            $$css: true
          }
        };

        // index.js
        stylex.inject("@keyframes x11gtny7-B{0%{opacity:.25;}100%{opacity:1;}}", 1);
        stylex.inject(".x1nrqb13{animation-name:x11gtny7-B}", 4);
        stylex.inject(".x1c4r43l{display:flex}", 4);
        stylex.inject(".xo3gju4{margin-inline-start:10px}", 4);
        stylex.inject(".x1h9ru99{margin-top:99px}", 4);
        stylex.inject(".x1je5kxa{height:500px}", 4);
        stylex.inject(".x1kflwvg:hover{background:red}", 16);
        var styles = {
          foo: {
            "index__styles.foo": "index__styles.foo",
            animationName: "x1nrqb13",
            display: "x1c4r43l",
            marginInlineStart: "xo3gju4",
            marginLeft: null,
            marginRight: null,
            marginTop: "x1h9ru99",
            height: "x1je5kxa",
            ":hover_background": "x1kflwvg",
            ":hover_backgroundAttachment": null,
            ":hover_backgroundClip": null,
            ":hover_backgroundColor": null,
            ":hover_backgroundImage": null,
            ":hover_backgroundOrigin": null,
            ":hover_backgroundPosition": null,
            ":hover_backgroundRepeat": null,
            ":hover_backgroundSize": null,
            $$css: true
          }
        };
        function App() {
          return stylex(styles$2.bar, styles.foo, styles$1.baz);
        }

        export { App as default };
        "
      `);
    });
  });
});
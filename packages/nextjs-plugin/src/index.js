/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const WebpackPluginStylex = require('@stylexjs/webpack-plugin');

module.exports =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    return {
      ...nextConfig,
      webpack(config, options) {
        // TODO: double check if this works for the new /app folder in Next.js 13
        const outputCSS = !options.isServer;

        if (typeof nextConfig.webpack === 'function') {
          config = nextConfig.webpack(config, options);
        }

        // For some reason, Next has `config.optimization.splitChunks`
        // set to `false` when webpack 5 is enabled.
        config.optimization.splitChunks = config.optimization.splitChunks || {
          cacheGroups: {},
        };

        if (outputCSS) {
          config.optimization.splitChunks.cacheGroups.styles = {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          };

          const webpackPluginOptions = {
            ...pluginOptions,
            babelConfig: {
              babelrc: true,
              ...pluginOptions.babelConfig,
            },
          };
          if (config.mode === 'production') {
            // In production:
            // the generated CSS is appended to the pre-existing CSS file being generated by Next
            webpackPluginOptions.appendTo = (name) => name.endsWith('.css');
          } else {
            // In development:
            // The generated CSS is written to a separate file.
            webpackPluginOptions.filename =
              pluginOptions.filename ?? 'static/styles/stylex.css';
          }

          config.plugins.push(new WebpackPluginStylex(webpackPluginOptions));
        }

        return config;
      },
    };
  };
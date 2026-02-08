const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          timers: require.resolve('timers-browserify'),
          buffer: require.resolve('buffer/'),
          stream: require.resolve('stream-browserify'),
        };

        // Append Tailwind and Autoprefixer to PostCSS loader plugins
        webpackConfig.module.rules.forEach((rule) => {
          if (rule.oneOf) {
            rule.oneOf.forEach((oneOfRule) => {
              if (oneOfRule.use) {
                oneOfRule.use.forEach((loader) => {
                  if (
                    loader.loader &&
                    loader.loader.includes('postcss-loader') &&
                    loader.options &&
                    loader.options.postcssOptions
                  ) {
                    const existing = loader.options.postcssOptions.plugins || [];
                    loader.options.postcssOptions.plugins = [
                      ...existing,
                      tailwindcss,
                      autoprefixer,
                    ];
                  }
                });
              }
            });
          }
        });

        return webpackConfig;
      },
    },
  }

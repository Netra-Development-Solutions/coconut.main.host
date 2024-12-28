const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');
const packageJson = require("./package.json");
const deps = packageJson.dependencies;
const version = packageJson.version;
const pluginMetadata = require('./pluginMetadata.json');
const printCompilationMessage = require('./compilation.config.js');

module.exports = (_, argv) => ({
  output: argv.mode === "production" ? {
    publicPath: `https://coconut-plugin-architecture.s3.ap-south-1.amazonaws.com/plugins/${packageJson.name}/v${version}/`,
  } : {
    publicPath: "http://localhost:2200/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 2200,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app_host",
      filename: "remoteEntry.js",
      remotes: argv.mode === "production" ? {
        "data_management": `data_management@https://coconut-plugin-architecture.s3.ap-south-1.amazonaws.com/plugins/data-management/v${pluginMetadata["data_management"]}/remoteEntry.js`,
        "header_navigation": `header_navigation@https://coconut-plugin-architecture.s3.ap-south-1.amazonaws.com/plugins/header-navigation/v${pluginMetadata["header_navigation"]}/remoteEntry.js`,
        "user_management": `user_management@https://coconut-plugin-architecture.s3.ap-south-1.amazonaws.com/plugins/user-management/v${pluginMetadata["user_management"]}/remoteEntry.js`,
        "plugin_injector": `plugin_injector@https://coconut-plugin-architecture.s3.ap-south-1.amazonaws.com/plugins/plugin-injector/v${pluginMetadata["plugin_injector"]}/remoteEntry.js`,
      } : {
        "data_management": "data_management@http://localhost:2210/remoteEntry.js",
        "header_navigation": "header_navigation@http://localhost:2230/remoteEntry.js",
        "user_management": "user_management@http://localhost:2240/remoteEntry.js",
        "plugin_injector": "plugin_injector@http://localhost:2250/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});

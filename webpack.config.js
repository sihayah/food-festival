const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/event.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },
    devServer: {
        static: {
          directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 8080,
      },    
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            anaylyzerMode: "static", //the report outputs to an HTML file in the dist folder
        })
    ],
    mode: 'development'
};

module.exports = config;

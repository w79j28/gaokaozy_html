const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

var title='haha !!!!!'
module.exports = {
	entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
	//devtool: 'inline-source-map',
	devtool: 'source-map',
	devServer: {
	 contentBase: './dist'
	},
	plugins: [
		new webpack.ProvidePlugin({
		  $: 'zepto'
		}),
		new UglifyJSPlugin({
          sourceMap: true
        }),
		//new UglifyJSPlugin(),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: title,
			template: './src/index.tpl.html',
			chunks: ['app'],
			minify:{
				caseSensitive: false,
				removeComments: true,
				removeEmptyAttributes: true,
				collapseWhitespace: true
			}
	  })
	],
	output: {
		filename: '[name]-[chunkhash:6].bundle.js',//[name]-[chunkhash:6].js
		path: path.resolve(__dirname, 'dist')
	},
	// optimization: {
		// runtimeChunk: {
			// name: "manifest"
		// },
		// splitChunks: {
			// cacheGroups: {
				// commons: {
					// test: /[\\/]node_modules[\\/]/,
					// name: "vendor",
					// chunks: "all"
				// }
			// }
		// }
	// },
	module: {
		rules: [{
			test: require.resolve('zepto'),
			use: ['exports-loader?window.Zepto','script-loader']
		},
		{
			 test: /\.css$/,
			 use: [
			   'style-loader',
			   'css-loader'
			 ]
       }
	   ]
	},
	mode: "production"
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')


const webpack = require('webpack');


var title='haha !!!!!'
module.exports = {
	entry: {
      'js/app': './src/components/reg-component/index.js',
	  'js/mmm': './src/components/mm-component/index.js'

      //print: './src/print.js'
    },
	

	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/components/reg-component/images/**/*', to: 'images', flatten: true}
		   ], {copyUnmodified: true}
		),
		new webpack.ProvidePlugin({
		  $: 'zepto'
		}),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			filename: 'reg.html',
			title: title,
			template: './src/components/reg-component/index.tpl.html',
			chunks: ['js/manifest', 'js/app','js/vendor'],
			//hash: true
			inject:false,
			// ,
			// minify:{
				// caseSensitive: false,
				// removeComments: true,
				// removeEmptyAttributes: true,
				// collapseWhitespace: true
			// }
	    }),
		new HtmlWebpackPlugin({
			filename: 'mm.html',
			title: 'mm title',
			template: './src/components/mm-component/index.tpl.html',
			chunks: ['js/manifest', 'js/mmm','js/vendor'],
			//hash: true
			inject:false,
			// ,
			// minify:{
				// caseSensitive: false,
				// removeComments: true,
				// removeEmptyAttributes: true,
				// collapseWhitespace: true
			// }
	    }),
		new ExtractTextPlugin({filename: (getPath) => { return getPath("style/[name].[chunkhash:8].css").replace('style/js', 'style'); } , allChunks: true})
	],
	output: {
		filename: '[name]-[chunkhash:6].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		runtimeChunk: {
			name: "js/manifest"
		},
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "js/vendor",
					chunks: "all"
				}
			}
		}
	},
	module: {
		rules: [
		{
			test: require.resolve('zepto'),
			use: ['exports-loader?window.Zepto','script-loader']
		},
		{
			 test: /\.css$/,
			 //use: ['style-loader', 'css-loader']
			 use: ExtractTextPlugin.extract({
				    fallback: "style-loader",
                    use:'css-loader'
                })
        },
		{
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader']
        }
	   ]
	}
};
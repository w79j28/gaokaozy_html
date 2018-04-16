const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const CopyWebpackPlugin = require('copy-webpack-plugin');


const webpack = require('webpack');


global.title='haha !!!!!';

global.GetHtmlWebpackPlugin = function (filename, title, template, chunks, minify){
	return new HtmlWebpackPlugin({
			filename: filename,
			title: title,
			template: template,
			//template: 'html-withimg-loader!'+path.resolve(__dirname, './src/components/reg-component/index.tpl.html'),
			chunks: chunks,
			//hash: true
			inject:false,
			// ,
			minify: minify
	    });
}

global.minify = {
	 caseSensitive: false,
	 removeComments: true,
	 removeEmptyAttributes: true,
	 collapseWhitespace: true
 };


module.exports = {
	entry: {
      'js/app': './src/components/reg-component/index.js',
	  'js/mmm': './src/components/mm-component/index.js'

      //print: './src/print.js'
    },
	

	plugins: [
//		new CopyWebpackPlugin([
//			{ from: 'src/components/*/images/**/*', to: 'images/[name].[ext]', toType: 'template'/*flatten: true*/}
//		   ], {copyUnmodified: true}
//		),
		new webpack.ProvidePlugin({
		  $: 'zepto'
		}),
		new CleanWebpackPlugin(['dist']),
		
		
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
			 use: ExtractTextPlugin.extract({
				    fallback: "style-loader",
                    use:'css-loader'
                })
        },
		{
			test: /\.(png|svg|jpg|gif)$/,
//			loader: 'file-loader',
//			options: {
//			    name: '[name].[ext]?[hash]',
//			    outputPath: 'images/'
//			} 
	        use: [
	            {
	              loader: 'file-loader',
	              options: {
//	            	  name: '[name].[ext]?[hash]',
	            	  name (file) {
	            	      if (process.env.NODE_ENV === 'development') {
	            	        return ('[path][name].[ext]').replace('/src/components/', '/')
	            	      }
	            	 
	            	      return '[hash].[ext]'
	            	  },
	            	  
	  			      outputPath: 'images/'
	              }  
	            }
	          ]
        }/*,
        {
            test: /\.(htm|html)$/i,
            loader: 'html-withimg-loader'
        }*/
	   ]
	}
};
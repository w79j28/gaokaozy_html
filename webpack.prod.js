 const webpack = require('webpack');
 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtool: 'source-map',
   plugins: [
	   
	   GetHtmlWebpackPlugin('index.html', title, './src/components/register-component/register.tpl.html', ['js/manifest', 'js/register','js/vendor', 'js/commons'], minify),
	   GetHtmlWebpackPlugin('code.html', title, './src/components/code-component/code.tpl.html', ['js/manifest', 'js/code','js/vendor', 'js/commons'], minify),
       new UglifyJSPlugin({
           sourceMap: true
       }),
       new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
       })
   ]
   // ,
   // mode: "production"
 });
 const webpack = require('webpack');
 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtool: 'source-map',
   plugins: [
	   GetHtmlWebpackPlugin('index.html', title, './src/components/reg-component/index.tpl.html', ['js/manifest', 'js/app','js/vendor'], minify),
	   GetHtmlWebpackPlugin('mm.html', title, './src/components/mm-component/index.tpl.html', ['js/manifest', 'js/mmm','js/vendor'], minify),
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
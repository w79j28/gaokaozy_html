const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtool: 'inline-source-map',
   plugins: [
	   GetHtmlWebpackPlugin('index.html', title, './src/components/reg-component/index.tpl.html', ['js/manifest', 'js/app','js/vendor'], null),
	   GetHtmlWebpackPlugin('mm.html', title, './src/components/mm-component/index.tpl.html', ['js/manifest', 'js/mmm','js/vendor'], null)
   ],
   devServer: {
     contentBase: './dist'
   }
   // ,
   // mode: 'development'
 });
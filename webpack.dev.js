const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtool: 'inline-source-map',
   plugins: [
	   GetHtmlWebpackPlugin('index.html', title, './src/components/register-component/register.tpl.html', ['js/manifest', 'js/register','js/vendor', 'js/commons'], null),
	   GetHtmlWebpackPlugin('code.html', title, './src/components/code-component/code.tpl.html', ['js/manifest', 'js/code','js/vendor', 'js/commons'], null),
   ],
   devServer: {
     contentBase: './dist'
   }
   // ,
   // mode: 'development'
 });
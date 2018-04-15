//import _ from 'lodash';
import printMe from './print.js';
// import $ from 'zepto'

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button');

	element.innerHTML = "mmm."//_.join(['Hello', 'webpack'], ' ');

	btn.innerHTML = 'MMMMM Click me and check the console!';
	btn.onclick = printMe;

	element.appendChild(btn);

	return element;
}
document.body.appendChild(component());



$(function () {
	alert(process.env.NODE_ENV);
	// if (process.env.NODE_ENV !== 'production') {
	    // console.log('Looks like we are in development mode!');
		// alert('development Ready to Zepto!') 
	// }
    // else{
		// alert('production Ready to Zepto!') 
	// }	
	
})
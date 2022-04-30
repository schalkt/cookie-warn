const fs = require('fs');
const mix = require('laravel-mix');
const package = JSON.parse(fs.readFileSync('./package.json'));

mix.disableNotifications();

mix.extend('replace', function (webpackConfig, ...args) {

	args[0].forEach(function (item) {
		let content = fs.readFileSync(item[0]).toString().replace(item[1], item[2]);
		fs.writeFileSync(item[0], content);
	});

});

// update version in composer.json and app config
mix.replace([['src/cookie-warn.js', /version\sv\d+\.\d+\.\d+/, 'version v' + package.version]]);

// build dist js
mix.js('src/cookie-warn.js', 'dist');
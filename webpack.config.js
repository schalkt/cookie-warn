const fs = require('fs');
const path = require('path');

// Version replace: update version in src/cookie-warn.js
const packagejson = JSON.parse(fs.readFileSync('./package.json'));
const srcFile = path.resolve(__dirname, 'src/cookie-warn.js');
let content = fs.readFileSync(srcFile, 'utf8');
content = content.replace(/version\sv\d+\.\d+\.\d+/, 'version v' + packagejson.version);
fs.writeFileSync(srcFile, content);

module.exports = {
    entry: './src/cookie-warn.js',
    output: {
        filename: 'cookie-warn.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'production',
    module: {
        rules: [
            // szükség esetén loader-ek (pl. css, babel) ide jöhetnek
        ]
    }
};

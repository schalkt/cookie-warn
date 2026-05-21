const fs = require('fs');
const path = require('path');

// Version replace: sync package.json version into source and demo index
const packagejson = JSON.parse(fs.readFileSync('./package.json'));
const ver = packagejson.version;

const srcFile = path.resolve(__dirname, 'src/cookie-warn.js');
let content = fs.readFileSync(srcFile, 'utf8');
content = content.replace(/version\sv\d+\.\d+\.\d+/, 'version v' + ver);
content = content.replace(/var cwVersion = 'v[\d.']+'/, "var cwVersion = 'v" + ver + "'");
fs.writeFileSync(srcFile, content);

const indexFile = path.resolve(__dirname, 'demo/index.html');
let indexContent = fs.readFileSync(indexFile, 'utf8');
indexContent = indexContent.replace(/v\d+\.\d+\.\d+(?=\s*&nbsp;)/, 'v' + ver);
fs.writeFileSync(indexFile, indexContent);

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

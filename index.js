const webfontsGenerator = require('webfonts-generator');
const fs = require('fs');
const path = require('path');

function collectFiles(dir) {
    let files = fs.readdirSync(dir);
    files = files.filter(f => f.match(/\.svg$/));
    files = files.map(f => path.join(dir, f));
    return files;
}

function generateFont(destDir, fontName, files) {
    return new Promise((resolve, reject) => {
        webfontsGenerator({
            files,
            dest: destDir,
            fontName: fontName,
            html: true,
            types: ['woff'],
            cssTemplate: 'css-template.hbs',
            // writeFiles: false,
        }, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
}

async function main() {
    const buildDir = 'build';
    const fontName = 'ag-icons';
    const files = collectFiles('svg');
    console.log(`SVG files found: ${files.length}`);

    try {
        await generateFont(buildDir, fontName, files);
        console.log('Font generation successful');
    } catch (error) {
        console.error('Font generation failed', error);
    }

    console.log('Patching CSS ...');
    const cssPath = path.join(buildDir, `${fontName}.css`);
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/woff\?(\w{32})/, 'woff'); // remove hash, not supported by sap
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('Done!');
}

main();

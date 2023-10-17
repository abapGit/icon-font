const webfontsGenerator = require('webfonts-generator');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

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
            htmlTemplate: 'html-template.hbs',
            htmlDest: path.join(destDir, 'index.html'),
            cssFontsUrl: '../font',
            // writeFiles: false,
        }, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
}

function patchCss(cssPath) {
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/woff\?(\w{32})/, 'woff'); // remove hash, not supported by sap
    fs.writeFileSync(cssPath, css, 'utf8');
}

async function buildFont(buildDir, fontName, files) {
    try {
        await generateFont(buildDir, fontName, files);
        console.log('Font generation successful');
    } catch (error) {
        console.error('Font generation failed', error);
        process.exit(1);
    }
}

async function moveFiles(buildDir, cssName, fontFileNames) {
    await mkdirp.mkdirp(path.join(buildDir, 'css'));
    await mkdirp.mkdirp(path.join(buildDir, 'font'));
    fs.renameSync(path.join(buildDir, cssName), path.join(buildDir, 'css', cssName));
    for (const f of fontFileNames) {
        fs.renameSync(path.join(buildDir, f), path.join(buildDir, 'font', f));
    }
}

async function main() {
    const buildDir = 'build';
    const fontName = 'ag-icons';
    const cssName = `${fontName}.css`;
    const fontFileNames = [
        `${fontName}.svg`,
        `${fontName}.ttf`,
        `${fontName}.woff`,
    ];
    const files = collectFiles('svg');
    console.log(`SVG files found: ${files.length}`);

    console.log('Building font ...');
    await buildFont(buildDir, fontName, files);

    console.log('Patching CSS ...');
    patchCss(path.join(buildDir, cssName));

    console.log('Moving files ...');
    await moveFiles(buildDir, cssName, fontFileNames);

    console.log('Done!');
}

// RUN

try {
    main();
} catch (error) {
    console.error(error);
    process.exit(1);
}

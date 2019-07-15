[![Build Status](https://travis-ci.com/abapGit/icon-font.svg?branch=master)](https://travis-ci.com/abapGit/icon-font)

# abapGit webfont generator package

## Build

You need nodejs to be installed (version 10 at the time of package creation)

```
npm install
npm run build
```

This will create `build` folder with font, css file and html to review icons. Upload `woff` and `css` to abapGit with `SMW0` ([see docs](https://docs.abapgit.org/development/adding-icons.html)).

## Adding new icons

- [Download](https://fontawesome.com/download) Font Awesome free distribution
- copy additional icons to `svg` folder (or submit own glyphs ;)
- build, check that it works
- commit the changes
- mind the license matters please ;) glyphs must be licensed for free usage (MIT, CC, SIL OFL)

## Credits

abapGit icons are created from [Font Awesome](https://fontawesome.com/) free icon set ([CC BY 4.0 License](https://fontawesome.com/license/free)).

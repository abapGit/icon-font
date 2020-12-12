[![Build Status](https://travis-ci.com/abapGit/icon-font.svg?branch=master)](https://travis-ci.com/abapGit/icon-font)

# abapGit webfont generator package

Icons in abapGit are displayed using a specially build font. As a default, abapGit uses icons from the free distribution of [Font Awesome](https://fontawesome.com/). When adding other icons mind the license matters please. Glyphs must be licensed for free usage (MIT, CC, SIL OFL).

## Build

On every commit and pull request, a Github action will build the abapGit icon font and corresponding CSS files. The files are available as an artifact in the action and you can download them from there.

## Adding Icons

Here are the steps to add icons to this repository:

1. Get the SVG files the icons you want to add
- [Download](https://fontawesome.com/download) Font Awesome free distribution and get the SVG files from there or
- Find the icons on and download the SVG files from the [Font Awesome website](https://fontawesome.com/icons?d=gallery&m=free)
2. Copy additional icons to `/svg/` folder of your fork (or submit own glyphs ;)
3. Commit to your fork and create a pull request
4. Download the abapGit icon font and CSS files from the Github action

The steps to update abapGit are documented [here](https://docs.abapgit.org/development/adding-icons.html).

## Credits

abapGit icons are created from [Font Awesome](https://fontawesome.com/) free icon set ([CC BY 4.0 License](https://fontawesome.com/license/free)).

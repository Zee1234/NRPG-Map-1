const fs = require('fs-extra')
const base64 = require('node-base64-image')
const babel = require('babel-core')
const pug = require('pug')
const stylus = require('stylus')
const nib = require('nib')
const pd = require('pretty-data').pd
const uglifyjs = require('uglify-js').minify
const path = require('path')

//Storage objects for css, js, and svg text
let html = {}
let css = {}
let js = {}
let svg = {}

// Generate file paths based on dev/prod
function url(dir) {
  let t = process.argv[2] === 'dev' ? '..'+dir : 'https://nrpg-coders.github.io/NRPG-Map'+dir
  return t+"?rnd="(Math.floor(Math.random()*2000000))
}

//Load HTML into memory as text
function loadHTML(path,name) {
  html[name] = pug.compile(fs.readFileSync(__dirname+path,"utf8"))
}
//Load SVG into memory as text
function loadSVG(path,name) {
  svg[name] = pd.xmlmin(fs.readFileSync(__dirname+path,"utf8"))
}
//Load CSS into memory as text
function loadCSS(path,name) {
  stylus(fs.readFileSync(__dirname+path,'utf8'))
    .use(nib())
    .render(function(err,out) {
      if (err) { throw err; }
      css[name] = pd.cssmin(out)
    })
}
//Transforms a string of javascript using babel-preset-es2015
function babelize(str) {
  return babel.transform(str, {
    presets: ['es2015'],
    comments: false,
  })
}
//Load javascript into memory as text
function loadJS(path,name) {
  js[name] = uglifyjs(babelize(fs.readFileSync(__dirname+path,"utf8")).code).code
}


loadSVG('/src/pictures/map.svg','map')

loadHTML('/src/pug/page.pug','page')

loadCSS('/src/stylus/page.styl','page')

loadJS('/src/javascript/define_factions.js','definefactions')
loadJS('/src/javascript/define_icons.js','defineicons')
loadJS('/src/javascript/define_zones.js','definezones')
loadJS('/src/javascript/invertcolor.js','invertcolor')
loadJS('/src/javascript/initializesvg.js','initializesvg')
loadJS('/src/javascript/populateicons.js','populateicons')
//loadJS('/src/javascript/loadsvg.js','loadsvg')
// Wait for CSS to load
while (!css.page) {}



function write(folder, name, contents) {
  fs.writeFile('./dist/'+folder+'/'+name, contents, (err) => {
    if (err) { throw err; }
  })
}
let writejs = (name, contents) => { write('js', name, contents) }


// Clear old contents of ./dist
;(function(root) {
  fs.readdirSync(root).forEach( name => {
    let sub = path.join(root, name)
    if (fs.statSync(sub).isDirectory()) {
      fs.readdirSync(sub).forEach( file => {
        if (file !== '.gitignore') {
          fs.unlinkSync(path.join(sub, file))
        }
      })
    }
  })
})('./dist')


write('css', 'main.css', css.page)
write('gfx', 'map.svg', svg.map)
write('html', 'page.html', html.page({svg: svg.map, url: url}))
writejs('factions.js', js.definefactions)
writejs('icons.js', js.defineicons)
writejs('zones.js', js.definezones)
writejs('invertcolor.js', js.invertcolor)
writejs('initializesvg.js', js.initializesvg)
writejs('populateicons.js', js.populateicons)
//writejs('loadsvg.js', js.loadsvg)
writejs('svg.js', fs.readFileSync('./node_modules/svg.js/dist/svg.min.js','utf8'))
writejs('svg-pan-zoom.js', fs.readFileSync('./node_modules/svg-pan-zoom/dist/svg-pan-zoom.min.js','utf8'))

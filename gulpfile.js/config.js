var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

module.exports = {
  tempPath: './.tmp',

  libBuildPath: './.tmp/build',
  libModulePath: './src',

  demoBuildPath: './.tmp/demo',
  demoAppPath: './demo',
  demoAppModule: 'demo',

  processors: [
    autoprefixer({browsers: ['last 2 versions']}),
    mqpacker({ sort: true }),
    csswring({ removeAllComments: true })
  ],

  sassIncludePaths: [
    'demo/bower/bootstrap/scss'
  ]
}

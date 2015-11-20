var gulp = require('gulp');

function manifest() {
  var fs = require('fs');
  var xml2js = require('xml2js');
  var parser = new xml2js.Parser();
  var builder = new xml2js.Builder();
  var config = require('../../config.js');

  var url = 'http://localhost:3000';
  var dest = config.demoAppPath + '/appx/appxmanifest.xml';
  var buffer = fs.readFileSync(config.demoAppPath + '/appx/appxmanifest.xml', 'utf-8');
  var manifest = buffer.split('\n');
  var versionBump = '';
  manifest.forEach(function(line) {
    if (~line.indexOf('<!--Build ')) {
      versionBump = line.replace(/\d+/, function(n){ return ++n; });
    }
  });
  parser.parseString(buffer, function(err, result) {
    var urlSections = result.Package.Applications[0].Application[0];
    var startPage = urlSections['$'];
    var acur = urlSections['uap:ApplicationContentUriRules'][0]['uap:Rule'][0]['$'];
    acur.Match = url;
    startPage.StartPage = url;
    var xml = builder.buildObject(result);
    var xmlArray = xml.split('\n');
    xmlArray.push(versionBump);
    fs.writeFileSync(dest, xmlArray.join('\n'));
  });
}

gulp.task('manifest', manifest);

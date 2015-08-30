var ArchivistBrowser = require("archivist-core/browser");
var Backend = require("../backend");
var backend = new Backend();

// i18n
require('../i18n/load');

window.mediaServer = 'http://media.tastorona.su';

$(function() {

  // Create a new Lens app instance
  // --------
  //
  // Injects itself into body

  var app = new ArchivistBrowser({
    backend: backend
  });
  app.start();

  window.app = app;
});
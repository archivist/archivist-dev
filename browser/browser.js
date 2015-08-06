var ArchivistBrowser = require("archivist-core/browser");
var Backend = require("../backend");
var backend = new Backend();

$(function() {

  // Create a new Lens app instance
  // --------
  //
  // Injects itself into body

  var app = new ArchivistBrowser({
    backend: backend,
    // api_url: "https://elife-lens-indexer.herokuapp.com"
    // api_url: "http://localhost:4002"
  });
  app.start();

  window.app = app;
});
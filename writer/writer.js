'use strict';

// i18n
require('./i18n/load');

// Substance Journal
// ---------------
//
// Main entry point of the Substance Journal web client

var $$ = React.createElement;

// Specify a backend
// ---------------
//

var Backend = require("./backend");
var backend = new Backend();

// Specify a notification service
// ---------------
//
// This is used for user notifications, displayed in the status bar

var NotificationService = require("./notification_service");
var notifications = new NotificationService();

// React Components
// ---------------
//

// Available contexts
var ArchivistWriter = require("archivist-core/writer");

// Top Level Application
// ---------------
//

var WriterApp = React.createClass({
  displayName: "WriterApp",

  childContextTypes: {
    backend: React.PropTypes.object,
    notifications: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      backend: backend,
      notifications: notifications,      
    };
  },

  render: function() {
    return $$(ArchivistWriter, {
      documentId: "sample"
    });
  }
});

// Start the app

$(function() {
  React.render(
    $$(WriterApp, {
      route: window.location.hash.slice(1)
    }),
    document.getElementById('container')
  );
});


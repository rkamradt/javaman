var React = require('react');
var Button = require('./button.js');

module.exports = React.createClass({displayName: "ActionRow",
  render: function() {
    return (
      React.createElement("div", {className: "row"},
        React.createElement("div", {className: "col-sm-4"},
          React.createElement(Button, {buttonId: 'resetbutton', iconName: 'refresh'})),
        React.createElement("div", {className: "col-sm-4"},
          React.createElement(Button, {buttonId: 'stopbutton', iconName: 'stop'})),
        React.createElement("div", {className: "col-sm-4"},
          React.createElement(Button, {buttonId: 'startbutton', iconName: 'play'}))
      )
    );
  }
});

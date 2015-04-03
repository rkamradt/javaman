var React = require('react');
var Button = require('./button.js');

module.exports = React.createClass({displayName: "BottomDirectionRow",
  render: function() {
    return (
      React.createElement("div", {className: "row"},
        React.createElement("div", {className: "col-sm-4"}, ' '),
        React.createElement("div", {className: "col-sm-4"},
          React.createElement(Button, {buttonId: 'downbutton', iconName: 'chevron-down'})),
        React.createElement("div", {className: "col-sm-4"}, ' ')
      )
    );
  }
});

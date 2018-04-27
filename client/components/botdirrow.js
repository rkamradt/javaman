var React = require('react');
var Button = require('./button.js');
var createReactClass = require('create-react-class');

module.exports = createReactClass({displayName: "BottomDirectionRow",
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

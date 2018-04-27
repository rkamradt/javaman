var React = require('react');
var Button = require('./button.js');
var createReactClass = require('create-react-class');

module.exports = createReactClass({displayName: "TopDirectionRow",
  render: function() {
    return (
      React.createElement("div", {className: "row"},
        React.createElement("div", {className: "col-sm-4"}, ' '),
        React.createElement("div", {className: "col-sm-4"},
          React.createElement(Button, {buttonId: 'upbutton', iconName: 'chevron-up'})),
        React.createElement("div", {className: "col-sm-4"}, ' ')
      )
    );
  }
});

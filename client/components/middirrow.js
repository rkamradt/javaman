var React = require('react');
var Button = require('./button.js');

module.exports = React.createClass({displayName: "MiddleDirectionRow",
  render: function() {
    return (
      React.createElement("div", {className: "row"},
        React.createElement("div", {className: "col-sm-4"},
          React.createElement(Button, {buttonId: 'leftbutton', iconName: 'chevron-left'})),
        React.createElement("div", {className: "col-sm-4"}, ' '),
        React.createElement("div", {className: "col-sm-4"},
          React.createElement(Button, {buttonId: 'rightbutton', iconName: 'chevron-right'}))
      )
    );
  }
});

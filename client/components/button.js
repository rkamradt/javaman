var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({displayName: "Button",
  render: function() {
    return (
      React.createElement("button", {id: this.props.buttonId, type: "button", className: "btn btn-default"},
        React.createElement("span", {className: "glyphicon glyphicon-" + this.props.iconName})
      )
    );
  }
});

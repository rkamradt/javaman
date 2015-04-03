var React = require('react');

module.exports = React.createClass({displayName: "Button",
  render: function() {
    return (
      React.createElement("button", {id: this.props.buttonId, type: "button", className: "btn btn-default"},
        React.createElement("span", {className: "glyphicon glyphicon-" + this.props.iconName})
      )
    );
  }
});

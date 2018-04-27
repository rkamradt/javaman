var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({displayName: "Header",
  render: function() {
    return (
      React.createElement("div", {className: "header clearfix"},
        React.createElement("h3", {className: "text-muted"},
          "Java Man"
        )
      )
    );
  }
});

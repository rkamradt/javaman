var React = require('react');

module.exports = React.createClass({displayName: "Header",
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

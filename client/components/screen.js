var React = require('react');
var TopDirectionRow = require('./topdirrow');
var MiddleDirectionRow = require('./middirrow');
var BottomDirectionRow = require('./botdirrow');
var ActionRow = require('./actionrow');
var Header = require('./header');
var Logon = require('./logon');
var createReactClass = require('create-react-class');

module.exports = createReactClass({displayName: "Screen",
  render: function() {
    return (
      React.createElement("div", {},
        React.createElement("div", {className: "container"},
          React.createElement(Header, {}),
          React.createElement(Logon, {onCommentSubmit: this.props.handleLogonSubmit}),
          React.createElement('canvas', {id: 'canvas', width: '240', height: '240'}),
          React.createElement('img', {id: 'squares', hidden: true, src: 'img/squares.png'})
        ),
        React.createElement("div", {className: "container"},
          React.createElement(TopDirectionRow, {}),
          React.createElement(MiddleDirectionRow, {}),
          React.createElement(BottomDirectionRow, {}),
          React.createElement(ActionRow, {})
        )
      )
    );
  }
});

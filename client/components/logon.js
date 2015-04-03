var React = require('react');

module.exports = React.createClass({displayName: "Logon",
  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    if (!email || !password) {
      return;
    }
    this.props.onCommentSubmit({email: email, password: password});
  },
  render: function() {
    return (
      React.createElement("form", {id: 'logon', className: "form-signin", onSubmit: this.handleSubmit},
        React.createElement('h2', {className: 'form-signin-heading'}, 'Please sign in' ),
        React.createElement("label", {htmlFor: 'inputEmail', className: 'sr-only'}, "Email address"),
        React.createElement("input", {type: 'email',
                                      id: 'inputEmail',
                                      ref: 'email',
                                      className: 'form-control',
                                      placeholder: 'Email address',
                                      required: true,
                                      autofocus: true
                                      }),
        React.createElement("label", {htmlFor: 'inputPassword', className: 'sr-only'}, "Password"),
        React.createElement("input", {type: 'password',
                                      id: 'inputPassword',
                                      ref: 'password',
                                      className: 'form-control',
                                      placeholder: 'Password',
                                      required: true
                                      }),
        React.createElement("div", {className: 'checkbox'},
          React.createElement('label', {},
            React.createElement('input', {type: 'checkbox', value: 'remember-me'}, 'Remember me'))
        ),
        React.createElement("button", {type:'submit', className: 'btn btn-lg btn-primary btn-block'}, "Sign in")
      )
    );
  }
});

"use strict";

var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $('#domoMessage').animate({
    width: 'hide'
  }, 350);

  if ($('#user').val() == '' || $('#pass').val() == '') {
    handleError('RAWR!  Username or password is empty');
    return false;
  }

  sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $('#domoMessage').animate({
    width: 'hide'
  }, 350);

  if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
    handleError('RAWR!  All fields are required');
    return false;
  }

  if ($('#pass').val() !== $('#pass2').val()) {
    handleError('RAWR!  Passwords do not match');
    return false;
  }

  sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign In"
    }))
  );
};

var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "username",
      id: "user",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      type: "password",
      name: "pass",
      id: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      type: "password",
      name: "pass2",
      id: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Sign Up",
      className: "formSubmit"
    }))
  );
};

$(document).ready(function () {
  return sendAjax('GET', '/getToken', null, function (result) {
    document.querySelector('#loginButton').addEventListener('click', function (e) {
      e.preventDefault();
      ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
        csrf: result.csrfToken
      }), document.querySelector('#content'));
      return false;
    });
    document.querySelector('#signupButton').addEventListener('click', function (e) {
      e.preventDefault();
      ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
        csrf: result.csrfToken
      }), document.querySelector('#content'));
      return false;
    });
    ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
      csrf: result.csrfToken
    }), document.querySelector('#content'));
  });
});
"use strict";

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  $('#domoMessage').animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $('#domoMessage').animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, url, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: url,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      return handleError(JSON.parse(xhr.responseText).error);
    }
  });
};

"use strict";

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "domoList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyDomo"
      }, "No Domos yet"))
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "domo",
        key: domo._id
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/domoface.jpeg",
        alt: "Domo Face",
        className: "domoFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "domoName"
      }, "Name: ", domo.name), /*#__PURE__*/React.createElement("h3", {
        className: "domoAge"
      }, "Age: ", domo.age))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, domoNodes)
  );
};

var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $('#domoMessage').animate({
    width: 'hide'
  }, 350);

  if ($('#domoName').val() == '' || $('#domoAge').val() == '') {
    handleError('RAWR!  All fields are required');
    return false;
  }

  sendAjax('POST', $('#domoForm').attr('action'), $('#domoForm').serialize(), function () {
    return sendAjax('GET', '/getDomos', null, function (data) {
      return ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
        domos: data.domos
      }), document.querySelector('#domos'));
    });
  });
  return false;
};

var DomoForm = function DomoForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name",
      id: "domoName",
      placeholder: "Domo Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "age",
      id: "domoAge",
      placeholder: "Domo Age"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Make Domo",
      className: "makeDomoSubmit"
    }))
  );
};

$(document).ready(function () {
  return sendAjax('GET', '/getToken', null, function (result) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
      csrf: result.csrfToken
    }), document.querySelector('#makeDomo'));
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: []
    }), document.querySelector('#domos'));
    sendAjax('GET', '/getDomos', null, function (data) {
      return ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
        domos: data.domos
      }), document.querySelector('#domos'));
    });
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

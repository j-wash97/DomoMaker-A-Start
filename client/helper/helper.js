const handleError = message => {
    $('#errorMessage').text(message);
    $('#domoMessage').animate({ width: 'toggle' }, 350);
};

const redirect = response => {
    $('#domoMessage').animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

const sendAjax = (type, url, data, success) => {
    $.ajax({
        cache: false,
        type,
        url,
        data,
        dataType: 'json',
        success,
        error: (xhr, status, error) => handleError(JSON.parse(xhr.responseText).error)
    });
};
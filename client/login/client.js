const handleLogin = e => {
    e.preventDefault();

    $('#domoMessage').animate({ width: 'hide' }, 350);

    if ($('#user').val() == '' || $('#pass').val() == '') {
        handleError('RAWR!  Username or password is empty');
        return false;
    }

    sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);

    return false;
};

const handleSignup = e => {
    e.preventDefault();

    $('#domoMessage').animate({ width: 'hide' }, 350);

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

const LoginWindow = props => (
    <form id='loginForm' name='loginForm'
        onSubmit={handleLogin}
        action='/login'
        method='POST'
        className='mainForm'
    >
        <label htmlFor='username'>Username: </label>
        <input id='user' type='text' name='username' placeholder='username' />
        <label htmlFor='pass'>Password: </label>
        <input id='pass' type='password' name='pass' placeholder='password' />
        <input type='hidden' name='_csrf' value={props.csrf} />
        <input className='formSubmit' type='submit' value='Sign In' />
    </form>
);

const SignupWindow = props => (
    <form id="signupForm" name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
        className="mainForm"
    >
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="user" placeholder="username"/>
        <label htmlFor="pass">Password: </label>
        <input type="password" name="pass" id="pass" placeholder="password"/>
        <label htmlFor="pass2">Password: </label>
        <input type="password" name="pass2" id="pass2" placeholder="retype password"/>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input type="submit" value="Sign Up" className="formSubmit"/>
    </form>
);

$(document).ready(() => sendAjax('GET', '/getToken', null, result => {
    document.querySelector('#loginButton').addEventListener('click', e => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={result.csrfToken} />, document.querySelector('#content'));
        return false;
    });

    document.querySelector('#signupButton').addEventListener('click', e => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={result.csrfToken} />, document.querySelector('#content'));
        return false;
    });
    
    ReactDOM.render(<LoginWindow csrf={result.csrfToken} />, document.querySelector('#content'));
}));
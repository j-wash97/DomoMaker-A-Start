const DomoList = props => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => (
        <div className="domo" key={domo._id}>
            <img src="/assets/img/domoface.jpeg" alt="Domo Face" className="domoFace"/>
            <h3 className="domoName">Name: {domo.name}</h3>
            <h3 className="domoAge">Age: {domo.age}</h3>
        </div>
    ));

    return ( <div className="domoList">{domoNodes}</div> );
};

const handleDomo = e => {
    e.preventDefault();

    $('#domoMessage').animate({ width: 'hide' }, 350);

    if ($('#domoName').val() == '' || $('#domoAge').val() == '') {
        handleError('RAWR!  All fields are required');
        return false;
    }

    sendAjax('POST', $('#domoForm').attr('action'), $('#domoForm').serialize(), () => sendAjax('GET', '/getDomos', null, data => ReactDOM.render(<DomoList domos={data.domos}/>, document.querySelector('#domos'))));

    return false;
};

const DomoForm = props => (
    <form id="domoForm"
        onSubmit={handleDomo}
        name="domoForm"
        action="/maker"
        method="POST"
        className="domoForm"
    >
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="domoName" placeholder="Domo Name"/>
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" id="domoAge" placeholder="Domo Age"/>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input type="submit" value="Make Domo" className="makeDomoSubmit"/>
    </form>
);

$(document).ready(() => sendAjax('GET', '/getToken', null, result => {
    ReactDOM.render(<DomoForm csrf={result.csrfToken}/>, document.querySelector('#makeDomo'));

    ReactDOM.render(<DomoList domos={[]}/>, document.querySelector('#domos'));

    sendAjax('GET', '/getDomos', null, data => ReactDOM.render(<DomoList domos={data.domos}/>, document.querySelector('#domos')));
}));
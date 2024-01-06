function TopRight(props){
    //Need to add Bell and Arrow
    return (
        <div>
            <a className="name-of-user">{props.name}</a>
            <a className="designation-of-user">{props.designation}</a>
            <a className="notifications">🔔</a>
        </div>
    );
}

export default TopRight;
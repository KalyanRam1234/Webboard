import { Link } from "react-router-dom";
function Board(props){
    
    const BoardNameStyle={
        "position":"relative",
        "width": "53px",
        "height": "19px",
        "left":"12px",
        "top":"4px",
        "fontFamily": 'Roboto',
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontSize": "16px",
        "lineHeight": "19px",
        "color": "#000000"
    }
    
    const BoardDateStyle={
        "position":"relative",
        "left":"12px",
        "top":"0px",
        "width": "76px",
        "height": "15px",
        "fontFamily": 'Roboto',
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontSize": "13px",
        "lineHeight": "15px",
        "color": "#000000"
    }

    return (
        <div>
            <div className="TrialBoard">
            </div>
            
            <div className="TrialBoardText">
                <a style={BoardNameStyle}>{props.boardName}</a>
                <br></br>
                <a style={BoardDateStyle}>{props.date}</a>
            </div>
        
        </div>
    );
}

export function AddNewBoard(){
    return (
        <div>
            <div className="TrialBoard">
                <Link to={`../canvas`} style={{textDecoration: "none"}}>➕</Link>
            </div>
        </div>
    );
}

export default Board;
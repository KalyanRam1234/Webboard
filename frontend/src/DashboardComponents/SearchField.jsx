import Board from "./Board";
import {AddNewBoard} from "./Board";

function SearchField(props){
    return(
        <div style={{position:"relative"}}>
            <input className="search-field" placeholder='🔎 Search Boards' />
            
            <a className="recent-boards-text">Recent Boards</a>
            
            {/* To display recent boards: */}
            
            <div style={{"position":"relative","left":"350px","top":"90px"}}>
                
                <div style={{"position":"relative","bottom":"132px","display":"inline-block","margin":"15px 0px 0px 50px"}} >
                    <AddNewBoard/>
                </div>
                
                <div style={{"display":"inline-block","margin":"15px 0px 0px 40px", }} className="bod" onClick={()=>{
                    console.log("Hello2");
                }}>
                    <Board boardName="Board 1" date="15 Nov, 2022"/>
                </div>
                
                <div style={{"display":"inline-block","margin":"15px 0px 0px 40px"}} onClick={()=>{
                    console.log("Hello3");
                }}>
                    <Board boardName="Board 1" date="15 Nov, 2022"/>
                </div>
                
                <div style={{"display":"inline-block","margin":"15px 0px 0px 40px"}} onClick={()=>{
                    console.log("Hello4");
                }}>
                    <Board boardName="Board 1" date="15 Nov, 2022"/>
                </div>
                
                <div style={{"display":"inline-block","margin":"15px 0px 0px 40px"}} onClick={()=>{
                    console.log("Hello5");
                }}>
                    <Board boardName="Board 1" date="15 Nov, 2022"/>
                </div>
                {/* The Board Date and Name can be changed from the props */}

            </div>
        </div>
    )
}

export default SearchField;
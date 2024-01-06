export default function Navbar(props){
    return (
        
        <div>
        <nav className="navbar Nodisplay">
                <div className="container-fluid">
                    <a className="navbar-brand sizing"><img src="/images/Group.png" alt='Hat' style={{"marginRight": "10px"}}></img> <img src='/images/EdPixel.png'></img></a>
                    {/* backend to be applied for both forms.. */}
                    {props.toggler ? 
                    <form className="search_bar1" role="search" >
                        <input className="form-control me-2 " type="search" placeholder="Search boards" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit" style={{"display": "none"}}>Search</button>
                    </form>
                    
                    :<form className="search_bar" role="search" >
                        <input className="form-control me-2 " type="search" placeholder="Search boards" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit" style={{"display": "none"}}>Search</button>
                    </form>}
                    
                    
                    <img src='/images/Bell.png' alt="bell" id="Bell"></img>
                    <div className='newProfile'>
                    <div>XYZ
                    <img src="./images/Arrow-down.png" id='down' ></img>
                    </div>
                    <div id='prof'>Professor</div>
                </div>
                    <img src='/images/customer.png' alt="customer" id="silhoutte" ></img>
                </div>
                </nav>

            <nav className="navbar Yesdisplay">
                <div className="container-fluid">
                    <a className="sizing" ><img src="/images/Group.png" alt='Hat' style={{"marginRight": "10px"}}></img> <img src='/images/EdPixel.png'></img></a>
                    {/* backend to be applied for both forms.. */}
                    <img src='/images/mag.png' alt="search " id="mag" ></img>
                <img src='/images/customer.png' alt="customer" id="silhoutte" ></img>
            </div>
            </nav>
        </div>
    )
}
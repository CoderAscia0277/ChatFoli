
const AuthenticationPanel = () =>{
    return (
        <div className="theme-darker d-flex flex-column justify-content-evenly align-items-center" style={{width:'100vw',height:'100vh'}} >
            <div className=" d-flex flex-column justify-content-around align-items-start gap-4 col-lg-5 col-md-6 col-sm-8 col-12 theme-darker rounded-3 p-3" style={{height:'max-content',minHeight:'40vh',boxShadow:'0px 5px 10px 5px rgba(0, 0, 0, 0.25)',minWidth:'320px'}}>
                <div className="d-flex flex-row  col-12  ">
                    <img src="images/Foli.png" alt="none" style={{width:'60px',height:'60px'}}></img>
                    <p className="text-light  h-100 d-flex flex-row justify-content-start px-3 align-items-center flex-grow-1 gap-2" style={{fontWeight:'bold',fontSize:'clamp(23px,4vw,25px)'}}>Enter valid <span style={{color:'rgb(2 229 255)'}}>Secret Key</span></p>
                </div>
                <div className="col-12 d-flex  flex-row justify-content-center align-items-center">
                    <input placeholder="Secret Key" className="col-8 h-100 rounded-3 text-center p-3 text-light" type="text" style={{outline:'none',border:'none',fontSize:'clamp(18px,3vw,25px)',backgroundColor:'rgb(46 47 49)'}}></input>
                </div>
                <div className="col-12 d-flex flex-row  justify-content-center align-items-center">
                    <button  className="text-light border-0 rounded-4 submit_btn px-4 py-2" style={{backgroundColor:'rgb(2 229 255)',fontSize:'clamp(15px,3vw,20px)'}}> Submit</button>

                </div>
                <span style={{fontSize:'12px',color:'rgb(172,172,172)',cursor:'pointer'}}>Where to find secret key?</span>
            </div>
        </div>
    );
}
export default AuthenticationPanel;
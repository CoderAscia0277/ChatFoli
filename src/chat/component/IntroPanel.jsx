const IntroPanel = () =>{
    return(
        <div id='row' className="col-12 pt-4 d-flex flex-column  align-items-center justify-content-center" style={{height:'max-content'}}>
               {/* <img src="images/Foli.png" className="mt-4 pulsating-outline" style={{aspectRatio:1/1,width:'80px',outline:'solid 1px white',outlineOffset:'10px',boxShadow:'0px 0px 10px 10px rgba(20, 20, 20, 0.5)',borderRadius:'100%'}}></img> */}
       
            <div className="col-12 h-50 mb-2 px-3 pt-4 " >
                <p className='text-light' style={{fontWeight:'bold',fontSize:'22px'}}>What is <span style={{color:'rgb(2 229 255)'}}>ChatFoli</span> ?</p>
                <p style={{color:'rgb(172,172,172)',fontSize:'15px',lineHeight:'2rem'}}>
                    <span style={{fontWeight:'bold',color:'rgb(2 229 255)'}}>ChatFoli</span> is a web app designed to bring your professional profile to life through dynamic conversations.
                </p>
                <p style={{color:'rgb(172,172,172)',fontSize:'15px',lineHeight:'2rem'}}>
                     Please note that this is a preview version, allowing users to ask up to 5 questions. 
                    Users can refresh the page to continue, but conversation histories are not recorded.    
                </p>
            </div>
        </div>
    );
}
export default IntroPanel;
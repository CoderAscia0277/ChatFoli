import React from "react";
import { Tooltip } from 'react-tooltip';
const NavBar = () =>{
    const download_resume = () => {
        const fileUrl = "images/Foli.png";
        // Create a temporary anchor element
        const tempAnchor = document.createElement("a");
        tempAnchor.href = fileUrl;
        tempAnchor.download = "Foli.png"; // Specify the file name here
        document.body.appendChild(tempAnchor);
        tempAnchor.click();
        document.body.removeChild(tempAnchor);
    }
    return(
        <div className="NavBar px-3 theme-darker col-12 sticky-top d-flex flex-row align-items-center  " style={{height:'55px',color:'rgb(172,172,172)',fontSize:'25px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" data-tooltip-id="back" data-tooltip-content="Back" fill="currentColor" className="bi bi-arrow-left-short icon " viewBox="0 0 16 16" style={{color:"#fff",width:'38px',height:'38px'}}>
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                </svg>
                <Tooltip id="back" style={{fontSize:'10px',padding:'5px'}} />
               <div className="flex-grow-1 text-center text-light">ChatFoli</div>
              
                    <svg xmlns="http://www.w3.org/2000/svg" data-tooltip-id="download_resume" data-tooltip-content="Download Resume" onClick={download_resume}   fill="currentColor" className="bi bi-download icon" viewBox="0 0 16 16" style={{color:"#fff",width:'25px',height:'25px'}}>
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                     </svg>
                     <Tooltip id="download_resume" style={{fontSize:'10px',padding:'5px'}} />
            
             
           
            {/* <div className=" col-12 d-flex flex-row justify-content-evenly text-center py-1 " style ={{}}>
                
            </div> */}
            
                
                
            
        </div>
    )
}
export default NavBar;
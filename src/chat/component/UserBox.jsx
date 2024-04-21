import {useState,useEffect,useRef } from "react";
import Store from "../utils/ConfigureStore";
import { update_onBusy,update_UserMessage} from "../utils/ConfigureStore";

// let hasChosen = false;


const UserBox = ({onSubmit}) => {
    
    let didMountRef = useRef(false);

   
    useEffect(()=>{
       
        if(didMountRef.current){
      
        }else{
            didMountRef.current = true;
        }
    });



    const [store, setStore] = useState(Store);
    Store.subscribe(()=>setStore(Store.getState()));

    const [TextHeight,setTextHeight] = useState('70px');
    const [fill,setFill] = useState(false);

    const [count ,setCount] = useState(5);

    const [message_attributes , setAttributes] = useState({difference_height:0,max_token_line:0});
 
    const submit = () =>{

        if(!count){
            alert('All Credits have been used , refresh the page to reset session');
            return;
        }


        setCount(count-1);

        Store.dispatch(update_onBusy(true));
       

        onSubmit('Guest', store.UserMessage);
      
        const target = document.querySelector('#UserBox');
        target.value = '';
        
        setFill(false);
        setTextHeight('70px');

    }

 
    const StoreUpdateMessage = (e) =>{

        const text = e.target.value;
        let target = e.target;

        Store.dispatch(update_UserMessage(text));
        if (text.length > 0 && text.length < 250) {
            setFill(true);
            setTextHeight(`${target.scrollHeight}px`);

            //THIS LINE ADJUST THE HEIGHT OF THE TEXT FIELD RELATIVE TO THE NUMBER OF TOKENS INSIDE THE FIELD 
            if(message_attributes.difference_height && message_attributes.max_token_line < text.length){
                const calc_height = target.scrollHeight - message_attributes.difference_height ;
                setTextHeight(`${calc_height <= 70 ? 70 : calc_height}px`);
            }

            //THIS LINE SETS THE MESSAGE ATTRIBUTE EVERY TIME THE TEXTFIELD CHANGES HEIGHT
      
            setAttributes({
                difference_height: !message_attributes.difference_height ? target.scrollHeight - 70 : message_attributes.difference_height,
                max_token_line: message_attributes.max_token_line ? text.length : message_attributes.max_token_line
            });
         
            
        } 
        else if (text.length >= 250) {
            alert("You have reached the maximum text count. Your text won't be submitted.");
            setFill(false);
            target.value = '';
            setTextHeight('70px');
            return;
        }
        else {
            setTextHeight('70px');
            setFill(false);
        }
    }

    const UpdateUserMessage = (e) => {
        const text = e.target.value;
        let target = e.target;

        if (e.key === 'Enter' && text.length < 250 ) {
            e.preventDefault();

            if(!text.length){
                alert('Make sure the message is complete');
                return;
            }

            target.value = '';
            submit();
            return;
        }
    
    };
    
     
    return(
        <div className="col-12 col-lg-4 col-md-8 col-sm-10 sticky-bottom position-absolute d-flex flex-column">

            {/* THIS IS THE USEBOX HEADER */}

            {
 
                //DISPLAY THIS IF THE USER SENT A MESSAGE
                
                <div className=" fs-6 col-12 d-flex flex-row " style={{color:'rgb(100,100,100)',backgroundColor:'none'}}>
                    <div  className=" col-8  p-2">
                        {
                            //DISPLAY THIS IF THE USER DIDNT SEND ANY MESSAGE YET 
                            store.onBusy ? 
                            <div className="d-flex  flex-row col-12 gap-2 justify-content-center align-items-center">
                                <div className='rounded-circle bg-light' style={{height:10+'px',width:10+'px',animation:'loading_idle 2s ease-in-out forwards infinite'}} ></div>
                                <div className='rounded-circle bg-light ' style={{height:10+'px',width:10+'px',animation:'loading_idle 2s ease-in-out 500ms forwards infinite'}} ></div>
                                <div className='rounded-circle bg-light ' style={{height:10+'px',width:10+'px',animation:'loading_idle 2s ease-in-out 900ms forwards infinite'}} ></div>
                            </div> : ''
                        }
                    </div>
                    <div className="col-4 d-flex flex-row justify-content-end   " >
                        <div  className="col-12 theme-darker text-center py-2 " style={{color:'rgb(172,172,172)',fontSize:'13px',borderRadius:'10px 10px 0 0'}}>
                            {`Credits: ${count}`}
                        </div>
                    </div>
                </div>
                
            }
            

                

            {/* THIS IS THE BODY OF THE USERBOX */}

            <div className="d-flex flex-row theme-darker " style={{left:'auto',right:'auto',minWidth:'320px',height:'max-content' , maxHeight:'25vh'}}>
            <textarea  onKeyDown={UpdateUserMessage} onChange={StoreUpdateMessage} id="UserBox"  placeholder="Ask something..." className="text-break text-light col-10 bg-transparent border-0 px-3 py-3" style={{outline:'none',resize:'none',height:TextHeight}}></textarea>
            
            {!store.onBusy ? <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-send send text-light icon" viewBox="0 0 16 16" onClick={fill ? () => submit() : ()=>{return;}}>
                    {fill ? 
                           <path style={{cursor:'pointer'}} d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                           : <path style={{opacity:0.1}} d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                    }
                </svg> :
                   <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-send  send text-light " viewBox="0 0 16 16" >
                        <path style={{opacity:0.1}} d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                   </svg>
            }
  
            </div>

        </div>
       
    );
}


export default UserBox;
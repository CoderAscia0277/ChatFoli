import {useState } from "react";
import Store from "../utils/ConfigureStore";
import { update_onBusy,update_UserMessage} from "../utils/ConfigureStore";

let hasChosen = false;
// let options = ['Option 1','Option 2','Option 3'];



const UserBox = ({onSubmit}) => {

    const [store, setStore] = useState(Store);
    Store.subscribe(()=>setStore(Store.getState()));

    const [OptionHeight,SetOptionHeight] = useState('2.5rem');
    const [OptionAnim,SetOptionAnim] = useState();
    const [State,setState] = useState({height:'70px',fill:false});

    const [UserOptions,setUserOptions] = useState(Store.getState().UserOptions);

    Store.subscribe(()=>setUserOptions(Store.getState().UserOptions));

    const submit = (OptionValue) =>{

        SetOptionHeight('0rem');

        Store.dispatch(update_onBusy(true));

        SetOptionAnim('DRAW_UP 0.3s ease-in-out 0.5s forwards');
       
        hasChosen = false;


        onSubmit('Guest',OptionValue? OptionValue : store.UserMessage);
      
        const target = document.querySelector('#UserBox');
        target.value = '';
        setState({fill:false,height:'70px'});

    }

    const UpdateUserMessage = (e) => {
        const text = e.target.value;
        
        Store.dispatch(update_UserMessage(text));

        console.log(Store.getState().UserMessage,e.target.value);
    };

    const HitEnter = (e) =>{

        const text = e.target.value;

        const target = document.querySelector('#UserBox');


        if(e.key === 'Enter' ){
            e.preventDefault();
            // console.log('1st',hasChosen);
            if(!store.onBusy && text.length >= 1){
                submit();
            }
            else{

                return;
            }
        }

        else if(!hasChosen && text.length <= 1 &&  e.keyCode >= 48 && e.keyCode <= 222){  //this line blocks the shortcut keys
                                                  
            SetOptionAnim('DRAW_DOWN 0.3s ease-in-out forwards');
            hasChosen = true;
            // console.log('2nd',hasChosen);
            setState({height:target.scrollHeight + 'px',fill:true});
            
        }

        else if(e.key === 'Backspace' && text.length <= 1 && hasChosen){
          
            SetOptionAnim('DRAW_UP 0.3s ease-in-out forwards');
            hasChosen = false;
            // console.log('3rd',hasChosen);
            setState({fill:false,height:'70px'});

        }
        else{
            // console.log('4th',hasChosen);
            setState({fill:!text.length ? false : true ,height:!text.length ? '70px' : target.scrollHeight + 'px'});
            
            
        }


    } ;

        
    

    return(
        <div className="col-12 col-lg-4 col-md-8 sticky-bottom position-absolute d-flex flex-column">

            {/* THIS IS THE USEBOX HEADER */}

            {
            
            store.onBusy ? 
                //DISPLAY THIS IF THE USER SENT A MESSAGE
                <div className=" fs-6 px-2 col-12 " style={{color:'rgb(100,100,100)',backgroundColor:'rgb(50,52,54)'}}>
                    <div  className="d-flex col-12 flex-row gap-2 justify-content-center align-items-center text-start text-break text-light  p-2">
                        <div className='rounded-circle bg-light' style={{height:10+'px',width:10+'px',animation:'loading_idle 2s ease-in-out forwards infinite'}} ></div>
                        <div className='rounded-circle bg-light ' style={{height:10+'px',width:10+'px',animation:'loading_idle 2s ease-in-out 500ms forwards infinite'}} ></div>
                        <div className='rounded-circle bg-light ' style={{height:10+'px',width:10+'px',animation:'loading_idle 2s ease-in-out 900ms forwards infinite'}} ></div>
                    </div>
                </div>
                : 
                //DISPLAY THIS IF THE USER DIDNT SEND ANY MESSAGE YET

                <div id="OptionContainer" className="OptionScrollView  chat-message col-12  " style={{height:OptionHeight,overflowY:'hidden',overflowX:'auto',animation:OptionAnim}}>
                <div className="OptionGroup gap-3 d-flex  flex-row col-12  justify-content-start align-items-start px-3" >
                    {
                        UserOptions.map((option,index)=>{
                            return <div className="option text-center theme-darker" onClick={()=>submit(option)} key={index}>
                                {
                                    option.length > 20 ? `${option.slice(0,20)}...` : option
                                }
                            </div>
                        })
                    }
                </div>
            </div>

            }

            {/* THIS IS THE BODY OF THE USERBOX */}

            <div className="d-flex flex-row theme-darker  " style={{left:'auto',right:'auto',minWidth:'320px',height:'max-content'}}>
            <textarea onKeyDown={HitEnter} onChange={UpdateUserMessage} id="UserBox"  placeholder="Ask something..." className="text-break text-light col-10 bg-transparent border-0 px-3 py-3" style={{outline:'none',resize:'none',height:State.height}}></textarea>
            
            {!store.onBusy ? <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-send send text-light icon" viewBox="0 0 16 16" onClick={ State.fill ? submit : ()=>{return;}}>
                    {State.fill ? 
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
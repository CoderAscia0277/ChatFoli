import { useRef , useEffect} from "react";



const DialogueBox = ({name='None',value='None'}) => {

    let didMountRef = useRef(false);
    useEffect(()=>{
       
        if(didMountRef.current){
      
        }else{
            didMountRef.current = true;
           
        }
    })

    const date = new Date();
 
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const time = hours + ':' + minutes + ' ' + ampm;

    return(
        <div id='row' className="chat-message col-12 d-flex flex-row px-3 gap-2" style={{height:'max-content',minHeight:'70px'}}>
            <div className="col-1 ">
                <div className='bot-icon m-auto' style={{background:name ===  'Foli' ? 'url(images/Foli.png) center/cover' : 'url(images/UserIcon.svg) center/cover'}}></div>
            </div>
            <div className="col-11 px-3 d-flex flex-column mb-1">
                <div className=" col-12  d-flex flex-row " style={{color: name ==='Foli' ? 'rgb(2 229 255)' : 'rgb(255 255 255)',fontSize:'18px',fontWeight:'bold'}}>
                    <div className=" d-flex flex-row align-items-end gap-2">
                        {name}
                        <div className="  d-flex flex-row align-items-center  h-100 " style={{color:"rgb(97,97,97)",fontSize:'10px'}}>Today at {time} </div>
                    </div>
                </div>
                <div className="col-12 text-break " style={{color:'rgb(172,172,172)',fontSize:'15px',lineHeight:'2rem'}}>
                    {value}
                </div>
            </div>
        </div>
    );
}
export default DialogueBox;
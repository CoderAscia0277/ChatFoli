import '../utils/ChatStyle.css';
import NavBar from '../component/NavBar';
import UserBox from '../component/UserBox';
import DialogueBox from '../component/DialogueBox';
import IntroPanel from '../component/IntroPanel';
import { useState,useRef, useEffect } from 'react';
import Store from '../utils/ConfigureStore';
import { update_onBusy} from '../utils/ConfigureStore';
import { GoogleGenerativeAI } from "@google/generative-ai";
import React from 'react';
let node_array = [];


const GoogleAi = async (msg) =>{
    const genAI = new GoogleGenerativeAI("AIzaSyCF-q0-o5Z1__j4MavRCgc5OBLl5Gx1MdE");
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const PromptFormat = `
    ##BIOGRAPHY

    PERSONAL INFO:

        Name: John Lenard Besa
        Age: 23 yrs old
        Gender: Male
        Contact Number: 0123-112-122
        Birth Date: 01/27/2001
        Address: Gen. Trias, Cavite

    ##SKILLS:##
    
        Electronics, John Lenard was once an electronics technician allowing him to gain hands on experience in repairing and troubleshooting electronics appliances including electric fans, washing machine, and audio amplifier.

        Computer Programming, John Lenard has a unique skill ing coding. Even though it is outside his College curriculum, he eagerly self studied different languages including Python and JavaScript.

        Creative Writing, John Lenard is a fan of many fiction works particularly Anime, Manga and Webtoons. His diverse interest in it allows him to grasp the fundamental concepts for writing immersive and dynamic characters.

    ##EDUCATION BACKGROUND##

    Elementary, Sunny Brooke Elem. School, Year graduated: March 2013

    Junior High, Luis Y Jr West National High School, Year graduated: March 2016

    Senior High: Tanza National Trade School, Specialization: TVL Computer Programming, Year graduated: April 2019

    College: Cavite State University, Course: BS Industrial Technology major in Electronics, Year Graduate: April 2024

    ##HOBBIES##

    Web app and AI integration, John Lenard loves making creatuve and innovative solutions which require AI implementation.

    Gaming, John Lenard likes playing video games specifically RPG games, where he can follow stories and freely roam around vast open world.

    Fiction works, John Lenard has strong interest in exploring otaku culture including watching anime, reading manga and webtoons, He also writes stories and design character whenever he has inspiration.

    AI prompting and development, John Lenard loves thinkering different algorithms in order to make his first very own virtual companion.

    UX and Game designing, John Lenard loves designing aesthetically pleasing UX for his personal wed apps. Also he likes creating aesthetic game design in unity, including creating terrains and cinematic sceneries.

    Listen to music, John Lenard loves listening to music whenever he does something which requires critical thinking and relaxation. The genre he listens includes Classical Musoc, J pop and Pop music.

    ##FUTURE GOALS##

    -Develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis.
    -Develop a website or game that has AI integration fot much immersive and real time story narration and character response.

  
     ${msg} 
`;

    const chat = model.startChat({
        history:  [
            {
                role:"user",
                parts:[{text:'Hi'}],
            },
            { 
                role:"model",
                parts: [{text : "Hi my name is Foli , a virtual companion that will help you to learn more about John Lenard Besa. Would like to know his hobbies, interest, education background?"}],
            },
    ],
        generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 100,
        },
    });

    const result = await chat.sendMessage(PromptFormat);
    const response = await result.response;

    return response.text();
}

const ChatIndex = () =>{

    let didMountRef = useRef(false);
    
    useEffect(()=>{
        const ScrollView = document.querySelector('#ScrollView');
        if(didMountRef.current){
            ScrollView.scrollTop = 10000;
        }else{
            didMountRef.current = true;
            ScrollView.scrollTop = 10000;
     
        }
    });

    const [dialogue,setDialogue] = useState();


    const GenerateDialogue =  (name,text)=>{

        node_array = [...node_array,<DialogueBox name={name} value={text} key={node_array.length}/>];
        setDialogue(node_array);
    
        FetchData(text);
       
      
    }
    const FetchData =  async (UserMessage) =>{

        try{
            const BotMessage = await GoogleAi(UserMessage);
            // const BotMessage = 'testing';
            //APPEND NEW BOT DIALOGUE
            setTimeout(()=>{
                Store.dispatch(update_onBusy(false));
                node_array = [...node_array,<DialogueBox name='Foli' value={BotMessage} key={node_array.length}/>];
                setDialogue(node_array);
            },5000);
            


        }catch(err){
            Store.dispatch(update_onBusy(false));
            node_array = [...node_array,<DialogueBox name='Foli' value={'Ops! something went wrong'} key={node_array.length}/>];
            setDialogue(node_array);

            console.log(err);
            console.log(Store.getState().Conversation);
        }
        
    }
    // url(images/samuel-scalzo-xyuYk9oLA8I-unsplash.jpg) center/cover no-repeat'
    return(
        <div className='theme-dark'  style={{width:'100vw',height:'100vh',minWidth:'320px'}}>
             
            <div className='d-flex flex-column col-lg-4 col-md-8 col-sm-10 col-12 content-body ' style={{margin:'auto',borderRadius:'15px',height:'100%'}}>
                <NavBar/>
                <div id='ScrollView'  style={{overflowY:'auto',scrollBehavior:'smooth',height:'95%'}}>
                    <div  className='chat-container d-flex flex-column theme-dark col-12 gap-4' style={{height:'max-content'}}>   
                        <IntroPanel height='45vh'/>
                        <DialogueBox value='Hi my name is Foli , a virtual companion that will help you to learn more about John Lenard Besa. Would like to know his hobbies, interest, education background?' name='Foli'/>
                        
                        {dialogue ? dialogue.map((item) => {return(item);}) : ''}
                        
                    </div>
                
                </div>
                <UserBox onSubmit={GenerateDialogue}/>
            </div>
            
            
        </div>
    );
}

export default ChatIndex;
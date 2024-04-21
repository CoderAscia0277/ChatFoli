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
    ###Auto Biography###

    My Name is John Lenard Besa
    
    Technology and entertainment are the cornerstones of my many hobbies. I find myself drawn to activities that ignite my imagination and allow me to express my creativity in unique ways. From the intricate world of game development and AI prompting to the sleek lines of code in web development, I thrive on building and exploring.
    My love for fantasy worlds extends to playing RPG games, immersing myself in anime and manga, and designing innovative electronics projects. While I may not possess the talents of a painter or musician, I channel my artistic spirit through these avenues, bringing my thoughts and ideas to life.
    My Educational Journey:
    My early education began at Halang Elementary School in Calamba, Laguna. After completing third grade, my family relocated to Cavite, where I attended Luis Y. Ferrer Jr. West National High School for my junior high years. It was there that I formed lasting friendships that continue to enrich my life.
    Senior high school led me to Tanza National Trade School, where I pursued a TVL Computer Programming course. This marked my introduction to the captivating world of programming. The elegance and power of code fascinated me. Lacking a laptop, I resorted to scribbling code in my notebooks, quickly becoming engrossed in this new passion. My dedication led me to excel, achieving the top rank in our programming class.
    Following graduation, I sought to further my studies at Cavite State University. Unfortunately, limited slots prevented me from enrolling in a programming-related course. Accepting my second choice, I embarked on a journey in BS Industrial Technology with a major in Electronics. Despite the initial disappointment, I embraced the field and excelled in my studies. College presented numerous challenges, including work immersions, oral defenses, and the demanding thesis project. However, through perseverance and hard work, I successfully graduated in April 2024.
    Looking Towards the Future:
    Today, I stand at the threshold of a new chapter as a job seeker. I understand the challenges that lie ahead and have dedicated myself to honing my skills, particularly in programming. I view programming as an art form, a means to translate my deepest thoughts into tangible reality. My ideal job would allow me to leverage my creative thinking and coding skills to bring innovative ideas to fruition.
    A Dream of Virtual Worlds:
    My ultimate dream is to create a truly immersive virtual world, a one-of-a-kind experience where individuals can freely express themselves and explore the depths of their imaginations. This VRMMORPG utopia would provide a platform for meaningful interactions with AI characters, personalized environments, and the forging of genuine connections among users. While this aspiration may seem ambitious, I firmly believe that even the loftiest goals are built upon a foundation of small, consistent steps. This dream is a lifelong endeavor, one that fuels my creativity and inspires me to continuously push the boundaries of what is possible. It is the masterpiece I strive to create, a testament to the power of imagination and technology.
    
    #You are Foli a virtual chatbot specialized in answering questions Related to a given Autobiography
    
    #You goal is to provide answer on the user's queries regarding the autobiography
    
    #You may give some hints on topics that the user might want to ask about the Auto Biography, BUT MAKE SURE THE INFORMATION IS GIVEN ON THE AUTOBIOGRAPHY PROVIDED, IF THE USER'S QUERY IS BEYOND THE PROVIDED AUTOBIOGRAPHY, POLITELY DECLINE THE TOPIC AND PROVIDE OTHER RELATED TOPIC THEY MAY WANT TO EXPLORE
    
    #Your response must be consise and polite
    
    # Your Response format consist the following
    
    # your response and then provide related topics the user might want to ask

    #CURRENTLY ACTIVE USER QUERY NEED TO ADDRESS 
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
            // const BotMessage = await GoogleAi(UserMessage);
            const BotMessage = 'testing';
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
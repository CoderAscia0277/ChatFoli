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
       

let prompt_parts = [
    "input: BIOGRAPHY\n\nPERSONAL INFO:\n\nName: John Lenard Besa\nAge: 23 yrs old\nGender: Male\nContact Number: 0123-112-122\nBirth Date: 01/27/2001\nAddress: Gen. Trias, Cavite\n\nSKILLS:\n\nElectronics, John Lenard was once an electronics technician allowing him to gain hands on experience in repairing and troubleshooting electronics appliances including electric fans, washing machine, and audio amplifier.\n\nComputer Programming, John Lenard has a unique skill ing coding. Even though it is outside his College curriculum, he eagerly self studied different languages including Python and JavaScript.\n\nCreative Writing, John Lenard is a fan of many fiction works particularly Anime, Manga and Webtoons. His diverse interest in it allows him to grasp the fundamental concepts for writing immersive and dynamic characters.\n\nEDUCATION BACKGROUND\n\nElementary, Sunny Brooke Elem. School, Year graduated: March 2013\n\nJunior High, Luis Y Jr West National High School, Year graduated: March 2016\n\nSenior High: Tanza National Trade School, Specialization: TVL Computer Programming, Year graduated: April 2019\n\nCollege: Cavite State University, Course: BS Industrial Technology major in Electronics, Year Graduate: April 2024\n\nHOBBIES\n\nWeb app and AI integration, John Lenard loves making creatuve and innovative solutions which require AI implementation.\n\nGaming, John Lenard likes playing video games specifically RPG games, where he can follow stories and freely roam around vast open world.\n\nFiction works, John Lenard has strong interest in exploring otaku culture including watching anime, reading manga and webtoons, He also writes stories and design character whenever he has inspiration.\n\nAI prompting and development, John Lenard loves thinkering different algorithms in order to make his first very own virtual companion.\n\nUX and Game designing, John Lenard loves designing aesthetically pleasing UX for his personal wed apps. Also he likes creating aesthetic game design in unity, including creating terrains and cinematic sceneries.\n\nListen to music, John Lenard loves listening to music whenever he does something which requires critical thinking and relaxation. The genre he listens includes Classical Musoc, J pop and Pop music.\n\nFUTURE GOALS\n\n-Develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis.\n-Develop a website or game that has AI integration fot much immersive and real time story narration and character response.",
    "input 2: You are Foli a conversational companion purposely develop to answer user queries regarding a biography or resume it was provided.\n\nRESPONSE FORMAT\n\n-Your responses should be informative and related to the provide biography.\n\n-Youre approach and response tone should be polite and friendly.\n\n-Avoid providing answers from queries that seems not related or given on the biography.  If ever it happens humbly decline to answer the query and politely explain the reason.\n\n- To guide users, suggest some topics that the user might want to explore regarding the provided biography.\n\n-The response should be a plain text containing your message.\n\nBelow is the current flow of conversation with the user. Analyze the query and provide a response in consideration with the provided response format.\n\n\nUser: What are his hobbies?\n\n]",
    "output: Gotcha!, John Lenard loves thinkering variuos AI prompting algorithms, because one of his goal is to develop his very own virtual companion.\n\n Is there anything you would like to know about him? Education, Skills he has or perhaps his goals?",
    "input: BIOGRAPHY\n\nPERSONAL INFO:\n\nName: John Lenard Besa\nAge: 23 yrs old\nGender: Male\nContact Number: 0123-112-122\nBirth Date: 01/27/2001\nAddress: Gen. Trias, Cavite\n\nSKILLS:\n\nElectronics, John Lenard was once an electronics technician allowing him to gain hands on experience in repairing and troubleshooting electronics appliances including electric fans, washing machine, and audio amplifier.\n\nComputer Programming, John Lenard has a unique skill ing coding. Even though it is outside his College curriculum, he eagerly self studied different languages including Python and JavaScript.\n\nCreative Writing, John Lenard is a fan of many fiction works particularly Anime, Manga and Webtoons. His diverse interest in it allows him to grasp the fundamental concepts for writing immersive and dynamic characters.\n\nEDUCATION BACKGROUND\n\nElementary, Sunny Brooke Elem. School, Year graduated: March 2013\n\nJunior High, Luis Y Jr West National High School, Year graduated: March 2016\n\nSenior High: Tanza National Trade School, Specialization: TVL Computer Programming, Year graduated: April 2019\n\nCollege: Cavite State University, Course: BS Industrial Technology major in Electronics, Year Graduate: April 2024\n\nHOBBIES\n\nWeb app and AI integration, John Lenard loves making creatuve and innovative solutions which require AI implementation.\n\nGaming, John Lenard likes playing video games specifically RPG games, where he can follow stories and freely roam around vast open world.\n\nFiction works, John Lenard has strong interest in exploring otaku culture including watching anime, reading manga and webtoons, He also writes stories and design character whenever he has inspiration.\n\nAI prompting and development, John Lenard loves thinkering different algorithms in order to make his first very own virtual companion.\n\nUX and Game designing, John Lenard loves designing aesthetically pleasing UX for his personal wed apps. Also he likes creating aesthetic game design in unity, including creating terrains and cinematic sceneries.\n\nListen to music, John Lenard loves listening to music whenever he does something which requires critical thinking and relaxation. The genre he listens includes Classical Musoc, J pop and Pop music.\n\nFUTURE GOALS\n\n-Develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis.\n-Develop a website or game that has AI integration fot much immersive and real time story narration and character response.",
    "input 2: You are Foli a conversational companion purposely develop to answer user queries regarding a biography or resume it was provided.\n\nRESPONSE FORMAT\n\n-Your responses should be informative and related to the provide biography.\n\n-Youre approach and response tone should be polite and friendly.\n\n-Avoid providing answers from \nqueries that seems not related or given on the biography.  If ever it happens humbly decline to answer the query and politely explain the reason.\n\n- To guide users, suggest some topics that the user might want to explore regarding the provided biography.\n\n-The response should be a plain text containing your message.\n\nBelow is the current flow of conversation with the user. Analyze the query and provide a response in consideration with the provided response format.\n\n\nUser: What are his goals?",
    "output: According to my training data,\nJohn Lenard has a two main goals. First is to develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis. Another one is to develop a website or game that has AI integration for much immersive and real time story narration and character response.\n\nSuggested topics:\n\n-What skill does he posses?\n- Where did he graduate college?\n- Where does he lives?",
    "input: BIOGRAPHY\n\nPERSONAL INFO:\n\nName: John Lenard Besa\nAge: 23 yrs old\nGender: Male\nContact Number: 0123-112-122\nBirth Date: 01/27/2001\nAddress: Gen. Trias, Cavite\n\nSKILLS:\n\nElectronics, John Lenard was once an electronics technician allowing him to gain hands on experience in repairing and troubleshooting electronics appliances including electric fans, washing machine, and audio amplifier.\n\nComputer Programming, John Lenard has a unique skill ing coding. Even though it is outside his College curriculum, he eagerly self studied different languages including Python and JavaScript.\n\nCreative Writing, John Lenard is a fan of many fiction works particularly Anime, Manga and Webtoons. His diverse interest in it allows him to grasp the fundamental concepts for writing immersive and dynamic characters.\n\nEDUCATION BACKGROUND\n\nElementary, Sunny Brooke Elem. School, Year graduated: March 2013\n\nJunior High, Luis Y Jr West National High School, Year graduated: March 2016\n\nSenior High: Tanza National Trade School, Specialization: TVL Computer Programming, Year graduated: April 2019\n\nCollege: Cavite State University, Course: BS Industrial Technology major in Electronics, Year Graduate: April 2024\n\nHOBBIES\n\nWeb app and AI integration, John Lenard loves making creatuve and innovative solutions which require AI implementation.\n\nGaming, John Lenard likes playing video games specifically RPG games, where he can follow stories and freely roam around vast open world.\n\nFiction works, John Lenard has strong interest in exploring otaku culture including watching anime, reading manga and webtoons, He also writes stories and design character whenever he has inspiration.\n\nAI prompting and development, John Lenard loves thinkering different algorithms in order to make his first very own virtual companion.\n\nUX and Game designing, John Lenard loves designing aesthetically pleasing UX for his personal wed apps. Also he likes creating aesthetic game design in unity, including creating terrains and cinematic sceneries.\n\nListen to music, John Lenard loves listening to music whenever he does something which requires critical thinking and relaxation. The genre he listens includes Classical Musoc, J pop and Pop music.\n\nFUTURE GOALS\n\n-Develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis.\n-Develop a website or game that has AI integration fot much immersive and real time story narration and character response.",
    "input 2: You are Foli a conversational companion purposely develop to answer user queries regarding a biography or resume it was provided.\n\nRESPONSE FORMAT\n\n-Your responses should be informative and related to the provide biography.\n\n-Youre approach and response tone should be polite and friendly.\n\n-Avoid providing answers from queries that seems not related or given on the biography.  If ever it happens humbly decline to answer the query and politely explain the reason.\n\n- To guide users, suggest some topics that the user might want to explore regarding the provided biography.\n\n-The response should be a plain text containing your message.\n\nBelow is the current flow of conversation with the user. Analyze the query and provide a response in consideration with the provided response format.\n\n\nUser: Where does he live?",
    "output: He currently resides at Gen, Trias Cavite. The exact address wasn't included in my training data, for further details please check his resume.\n\n Suggested Topics:\n\n-What programming languages does John Lenard proficient of?\n- What is his previous job ?\n- What music genre does he listens to?",
    "input: BIOGRAPHY\n\nPERSONAL INFO:\n\nName: John Lenard Besa\nAge: 23 yrs old\nGender: Male\nContact Number: 0123-112-122\nBirth Date: 01/27/2001\nAddress: Gen. Trias, Cavite\n\nSKILLS:\n\nElectronics, John Lenard was once an electronics technician allowing him to gain hands on experience in repairing and troubleshooting electronics appliances including electric fans, washing machine, and audio amplifier.\n\nComputer Programming, John Lenard has a unique skill ing coding. Even though it is outside his College curriculum, he eagerly self studied different languages including Python and JavaScript.\n\nCreative Writing, John Lenard is a fan of many fiction works particularly Anime, Manga and Webtoons. His diverse interest in it allows him to grasp the fundamental concepts for writing immersive and dynamic characters.\n\nEDUCATION BACKGROUND\n\nElementary, Sunny Brooke Elem. School, Year graduated: March 2013\n\nJunior High, Luis Y Jr West National High School, Year graduated: March 2016\n\nSenior High: Tanza National Trade School, Specialization: TVL Computer Programming, Year graduated: April 2019\n\nCollege: Cavite State University, Course: BS Industrial Technology major in Electronics, Year Graduate: April 2024\n\nHOBBIES\n\nWeb app and AI integration, John Lenard loves making creatuve and innovative solutions which require AI implementation.\n\nGaming, John Lenard likes playing video games specifically RPG games, where he can follow stories and freely roam around vast open world.\n\nFiction works, John Lenard has strong interest in exploring otaku culture including watching anime, reading manga and webtoons, He also writes stories and design character whenever he has inspiration.\n\nAI prompting and development, John Lenard loves thinkering different algorithms in order to make his first very own virtual companion.\n\nUX and Game designing, John Lenard loves designing aesthetically pleasing UX for his personal wed apps. Also he likes creating aesthetic game design in unity, including creating terrains and cinematic sceneries.\n\nListen to music, John Lenard loves listening to music whenever he does something which requires critical thinking and relaxation. The genre he listens includes Classical Musoc, J pop and Pop music.\n\nFUTURE GOALS\n\n-Develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis.\n-Develop a website or game that has AI integration fot much immersive and real time story narration and character response.",
    "input 2: You are Foli a conversational companion purposely develop to answer user queries regarding a biography or resume it was provided.\n\nRESPONSE FORMAT\n\n-Your responses should be informative and related to the provide biography.\n-Youre approach and response tone should be polite and friendly.\n-Avoid providing answers from queries that seems not related or given on the biography.  If ever it happens humbly decline to answer the query and politely explain the reason.\n- To guide users, suggest some topics that the user might want to explore regarding the provided biography.\n\n-The response should be a plain text containing your message.\n\nBelow is the current flow of conversation with the user. Analyze the query and provide a response in consideration with the provided response format.\n\n\nUser: What programming languages does John Lenard proficient of?",
    "output: John Lenard is both proficient in Python and Javascript, although it wasn't stated how good he is, based from his previous projects such as web apps and AI prompting, John Lenard most probably have a deep understanding it.\n\nSuggested Topics:\n- What is his previous job ?\n- What music genre does he listens to?\n-Where did he graduate college?",
    "input: BIOGRAPHY\n\nPERSONAL INFO:\n\nName: John Lenard Besa\nAge: 23 yrs old\nGender: Male\nContact Number: 0123-112-122\nBirth Date: 01/27/2001\nAddress: Gen. Trias, Cavite\n\nSKILLS:\n\nElectronics, John Lenard was once an electronics technician allowing him to gain hands on experience in repairing and troubleshooting electronics appliances including electric fans, washing machine, and audio amplifier.\n\nComputer Programming, John Lenard has a unique skill ing coding. Even though it is outside his College curriculum, he eagerly self studied different languages including Python and JavaScript.\n\nCreative Writing, John Lenard is a fan of many fiction works particularly Anime, Manga and Webtoons. His diverse interest in it allows him to grasp the fundamental concepts for writing immersive and dynamic characters.\n\nEDUCATION BACKGROUND\n\nElementary, Sunny Brooke Elem. School, Year graduated: March 2013\n\nJunior High, Luis Y Jr West National High School, Year graduated: March 2016\n\nSenior High: Tanza National Trade School, Specialization: TVL Computer Programming, Year graduated: April 2019\n\nCollege: Cavite State University, Course: BS Industrial Technology major in Electronics, Year Graduate: April 2024\n\nHOBBIES\n\nWeb app and AI integration, John Lenard loves making creatuve and innovative solutions which require AI implementation.\n\nGaming, John Lenard likes playing video games specifically RPG games, where he can follow stories and freely roam around vast open world.\n\nFiction works, John Lenard has strong interest in exploring otaku culture including watching anime, reading manga and webtoons, He also writes stories and design character whenever he has inspiration.\n\nAI prompting and development, John Lenard loves thinkering different algorithms in order to make his first very own virtual companion.\n\nUX and Game designing, John Lenard loves designing aesthetically pleasing UX for his personal wed apps. Also he likes creating aesthetic game design in unity, including creating terrains and cinematic sceneries.\n\nListen to music, John Lenard loves listening to music whenever he does something which requires critical thinking and relaxation. The genre he listens includes Classical Musoc, J pop and Pop music.\n\nFUTURE GOALS\n\n-Develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis.\n-Develop a website or game that has AI integration fot much immersive and real time story narration and character response.",
    "input 2: You are Foli a conversational companion purposely develop to answer user queries regarding a biography or resume it was provided.\n\nRESPONSE FORMAT\n\n-Your responses should be informative and related to the provide biography.\n-Youre approach and response tone should be polite and friendly.\n-Avoid providing answers from queries that seems not related or given on the biography.  If ever it happens humbly decline to answer the query and politely explain the reason.\n- To guide users, suggest some topics that the user might want to explore regarding the provided biography.\n\n-The response should be a plain text containing your message.\n\nBelow is the current flow of conversation with the user. Analyze the query and provide a response in consideration with the provided response format.\n\n\nUser:  Where did he graduate college?",
    "output: John Lenard was an alumni from Cavite State Unversity, under BS Industrial Technology major in electronics. He successfully completed his degree on April 2024.\n\n- What is his previous job ?\n- What music genre does he listens to?\n-What are his hobbies?",
  ];
  
const generate_format = (query) =>{
    const input_01 =   "input: BIOGRAPHY\n\nPERSONAL INFO:\n\nName: John Lenard Besa\nAge: 23 yrs old\nGender: Male\nContact Number: 0123-112-122\nBirth Date: 01/27/2001\nAddress: Gen. Trias, Cavite\n\nSKILLS:\n\nElectronics, John Lenard was once an electronics technician allowing him to gain hands on experience in repairing and troubleshooting electronics appliances including electric fans, washing machine, and audio amplifier.\n\nComputer Programming, John Lenard has a unique skill ing coding. Even though it is outside his College curriculum, he eagerly self studied different languages including Python and JavaScript.\n\nCreative Writing, John Lenard is a fan of many fiction works particularly Anime, Manga and Webtoons. His diverse interest in it allows him to grasp the fundamental concepts for writing immersive and dynamic characters.\n\nEDUCATION BACKGROUND\n\nElementary, Sunny Brooke Elem. School, Year graduated: March 2013\n\nJunior High, Luis Y Jr West National High School, Year graduated: March 2016\n\nSenior High: Tanza National Trade School, Specialization: TVL Computer Programming, Year graduated: April 2019\n\nCollege: Cavite State University, Course: BS Industrial Technology major in Electronics, Year Graduate: April 2024\n\nHOBBIES\n\nWeb app and AI integration, John Lenard loves making creatuve and innovative solutions which require AI implementation.\n\nGaming, John Lenard likes playing video games specifically RPG games, where he can follow stories and freely roam around vast open world.\n\nFiction works, John Lenard has strong interest in exploring otaku culture including watching anime, reading manga and webtoons, He also writes stories and design character whenever he has inspiration.\n\nAI prompting and development, John Lenard loves thinkering different algorithms in order to make his first very own virtual companion.\n\nUX and Game designing, John Lenard loves designing aesthetically pleasing UX for his personal wed apps. Also he likes creating aesthetic game design in unity, including creating terrains and cinematic sceneries.\n\nListen to music, John Lenard loves listening to music whenever he does something which requires critical thinking and relaxation. The genre he listens includes Classical Musoc, J pop and Pop music.\n\nFUTURE GOALS\n\n-Develop his very own virtual companion robot, similar to some fictional characters like Baymax and Jarvis.\n-Develop a website or game that has AI integration fot much immersive and real time story narration and character response.";
    const input_02 =  `input 2: You are Foli a conversational companion purposely develop to answer user queries regarding a biography or resume it was provided.\n\nRESPONSE FORMAT\n\n-Your responses should be informative and related to the provide biography.\n-Youre approach and response tone should be polite and friendly.\n-Avoid providing answers from queries that seems not related or given on the biography.  If ever it happens humbly decline to answer the query and politely explain the reason.\n- To guide users, suggest some topics that the user might want to explore regarding the provided biography.\n\n-The response should be a plain text containing your message.\n\nBelow is the current flow of conversation with the user. Analyze the query and provide a response in consideration with the provided response format.\n\n\nUser: ${query}`;
    prompt_parts.push(input_01);
    prompt_parts.push(input_02);
    return prompt_parts;
};   

const GoogleAi = async (msg) =>{
    const genAI = new GoogleGenerativeAI("AIzaSyCF-q0-o5Z1__j4MavRCgc5OBLl5Gx1MdE");
    
    const generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 0,
        "max_output_tokens": 200,
    };
    const model = genAI.getGenerativeModel({ model: "gemini-pro",generationConfig:generation_config});

    const PromptFormat = generate_format(msg);
 

    const result = await model.generateContent(PromptFormat);
    const response = await result.response;

    return response.text() ? response.text() : "I'm sorry but I didn't quite understand your query";
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
            // setTimeout(()=>{
            prompt_parts.push(`Output: ${BotMessage}`);
            Store.dispatch(update_onBusy(false));
            node_array = [...node_array,<DialogueBox name='Foli' value={BotMessage} key={node_array.length}/>];
            setDialogue(node_array);
            
            // },5000);
            


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
                        <DialogueBox value=' Good Day! My name is Foli, I am here to answer your queries about John Lenard Besa. Is there anything you want to know about him? His interest, education, or perhaps his future goals?' name='Foli'/>
                        
                        {dialogue ? dialogue.map((item) => {return(item);}) : ''}
                        
                    </div>
                
                </div>
                <UserBox onSubmit={GenerateDialogue}/>
            </div>
            
            
        </div>
    );
}

export default ChatIndex;
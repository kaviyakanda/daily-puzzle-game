import React,{useState} from "react";

export default function NumberPuzzle({goHome}){
 const today=new Date().toISOString().split("T")[0];
 const [guess,setGuess]=useState("");
 const [msg,setMsg]=useState("");

 // Random perfect square between 1-100
 const target=Math.pow(Math.floor(Math.random()*10+1),2);

 const complete=()=>{
   const d=JSON.parse(localStorage.getItem(today))||{};
   d.number=true;
   localStorage.setItem(today,JSON.stringify(d));
 }

 const check=()=>{
   const n=Number(guess);
   if(n===target){
     setMsg("🎉 Correct!");
     complete();
   } else if(n<target) setMsg("Guess higher!");
   else setMsg("Guess lower!");
   setGuess("");
 }

 return(
   <div className="card red">
     <h2>🔢 Number Puzzle</h2>
     <p>Enter a perfect square between 1-100</p>

     <input className="input" value={guess} onChange={e=>setGuess(e.target.value)}/>
     <button className="btn" onClick={check}>Submit</button>
     <button className="btn" onClick={goHome}>Back</button>

     <p>{msg}</p>
   </div>
 );
}

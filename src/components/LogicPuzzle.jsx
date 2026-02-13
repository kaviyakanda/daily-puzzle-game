import React,{useState} from "react";

export default function LogicPuzzle({goHome}){
 const today=new Date().toISOString().split("T")[0];
 const [attempts,setAttempts]=useState(0);
 const [msg,setMsg]=useState("");
 const [input,setInput]=useState("");
 const [showExplanation,setShowExplanation]=useState(false);

 const check=()=>{
  const a=attempts+1;
  setAttempts(a);

  if(input==="A"){
    setMsg("✅ Correct!");
    const d=JSON.parse(localStorage.getItem(today))||{};
    d.logic=true;
    localStorage.setItem(today,JSON.stringify(d));
  } else if(a>=2){
    setShowExplanation(true);
    setMsg("❌ Wrong! Tap 'Show Explanation' to read full details.");
  } else setMsg("Try again!");

  setInput("");
 };

 return(
  <div className="card purple">
   <h2>🧠 Logic Puzzle</h2>
   <p>A &gt; B &gt; C. Who is oldest?</p>

   <input className="input" value={input} onChange={e=>setInput(e.target.value)}/>
   <button className="btn" onClick={check}>Submit</button>
   <button className="btn" onClick={goHome}>Back</button>

   {showExplanation && (
     <div style={{background:"rgba(0,0,0,0.2)",padding:"10px",marginTop:"10px",borderRadius:"8px"}}>
       <p>Explanation: Since A is greater than the  B and B is greater than the  C, A is the oldest. Step by step: Compare each pair, eliminate younger, A remains.</p>
     </div>
   )}

   <p>{msg}</p>
  </div>
 );
}

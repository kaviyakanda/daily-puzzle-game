import React,{useState} from "react";

export default function MathPuzzle({goHome}){
 const qs=[
  {q:"2+3",a:5},
  {q:"12×4",a:48},
  {q:"45÷5+7×3",a:30}
 ];

 const today=new Date().toISOString().split("T")[0];
 const [i,setI]=useState(0);
 const [ans,setAns]=useState("");
 const [score,setScore]=useState(0);

 const complete=()=>{
  const d=JSON.parse(localStorage.getItem(today))||{};
  d.math=true;
  localStorage.setItem(today,JSON.stringify(d));
 };

 const check=()=>{
  if(Number(ans)===qs[i].a) setScore(score+1);
  if(i===2){
    complete();
    alert("Math completed! Go back to dashboard.");
  }else setI(i+1);
  setAns("");
 };

 return(
  <div className="card green">
   <h2>🧮 Math Puzzle</h2>
   <p>{qs[i].q} = ?</p>

   <input className="input" value={ans} onChange={e=>setAns(e.target.value)}/>
   <button className="btn" onClick={check}>Submit</button>
   <button className="btn" onClick={goHome}>Back</button>

   <p>Score: {score}/3</p>
  </div>
 );
}

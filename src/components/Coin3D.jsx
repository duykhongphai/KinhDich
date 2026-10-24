import React, { useEffect, useRef } from 'react';
export default function Coin3D({value=3,isTossing=false,index=0}) {
  const coin=useRef(null);
  const shadow=useRef(null);
  const rotation=useRef(0);
  useEffect(()=>{
    const end=value===3?0:180;
    if(!isTossing){rotation.current=end;coin.current.style.transform=`rotateY(${end}deg) rotateZ(${[-14,18,-8][index]}deg)`;return;}
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start=rotation.current;
    const finish=Math.ceil(start/360)*360+1080+end;
    rotation.current=finish;
    const drift=[-20,12,22][index];
    const pose=(y,r,z=0,x=0)=>`translate3d(${x}px,${y}px,0) rotateY(${r}deg) rotateX(${z}deg) rotateZ(${[-14,18,-8][index]}deg)`;
    const frames=reduced?[{opacity:.45},{opacity:1,transform:pose(0,finish)}]:[
      {transform:pose(0,start),offset:0},
      {transform:pose(-130-index*12,start+380,35,drift),offset:.32},
      {transform:pose(0,finish-180,12,drift/3),offset:.68},
      {transform:pose(-25,finish-55,-14,drift/6),offset:.79},
      {transform:pose(0,finish,5),offset:.89},
      {transform:pose(-5,finish,-3),offset:.94},
      {transform:pose(0,finish),offset:1}
    ];
    const animation=coin.current.animate(frames,{duration:reduced?180:1580,delay:reduced?0:index*65,fill:'forwards',easing:'linear'});
    const shade=shadow.current.animate([{transform:'scale(1)',opacity:.6},{transform:'scale(.65)',opacity:.16,offset:.32},{transform:'scale(1)',opacity:.6}],{duration:reduced?180:1580,delay:reduced?0:index*65,easing:'ease-in-out'});
    return ()=>{animation.cancel();shade.cancel();};
  },[isTossing,value,index]);
  return <div className={`coin-unit coin-${index}`}><div className="coin-shadow" ref={shadow}/><div className="coin-body" ref={coin} aria-hidden="true">{[false,true].map(back=><div key={String(back)} className={`coin-face ${back?'coin-back':''}`}><div className="coin-rim"/>{(back?['寶','泉','滿','文']:['乾','隆','通','寶']).map((c,i)=><span className={`coin-letter letter-${i}`} key={i}>{c}</span>)}<div className="coin-hole"/></div>)}</div><span className="coin-value">{isTossing?'…':value===3?'Dương · 3':'Âm · 2'}</span></div>;
}

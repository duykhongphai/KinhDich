import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, History, HelpCircle, Volume2, VolumeX, ArrowRight, RotateCcw } from 'lucide-react';
import { tossThreeCoins, getHexagramFromLines, getTransformedHexagram, getNuclearHexagram, getCurrentCanChiTime, LINE_TYPES } from './utils/ichingUtils';
import { sound } from './utils/audio';
import CoinPlate from './components/CoinPlate';
import HexagramResult from './components/HexagramResult';
import HistoryModal from './components/HistoryModal';
import DictionaryModal from './components/DictionaryModal';
import DivinationCardModal from './components/DivinationCardModal';
import GuideModal from './components/GuideModal';

export function HexLines({ binary, moving = [] }) {
  return <div className="hex-lines" aria-label="Hình quẻ, hào đọc từ dưới lên">{binary.map((v,i) => <div key={i} className={`hex-line ${v ? 'yang' : 'yin'} ${moving.includes(i) ? 'moving' : ''}`}><i/><i/></div>)}</div>;
}
export default function App() {
  const [question,setQuestion] = useState('');
  const [started,setStarted] = useState(false);
  const [lines,setLines] = useState([]);
  const [coins,setCoins] = useState([3,2,3]);
  const [tossing,setTossing] = useState(false);
  const [result,setResult] = useState(null);
  const [saved,setSaved] = useState(false);
  const [time,setTime] = useState(getCurrentCanChiTime);
  const [modal,setModal] = useState(null);
  const [muted,setMuted] = useState(sound.isMuted());
  const [history,setHistory] = useState(() => { try { const h=JSON.parse(localStorage.getItem('kinhdich_history') || '[]'); return Array.isArray(h)?h:[]; } catch { return []; } });
  const [storageError,setStorageError] = useState('');
  const timer = useRef(null);
  const busy = useRef(false);
  const resultRef = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { try {localStorage.setItem('kinhdich_history',JSON.stringify(history));setStorageError('');} catch {setStorageError('Không thể lưu nhật ký trên trình duyệt này. Bạn có thể sao chép kết quả.');} },[history]);
  useEffect(() => { if(result) resultRef.current?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}); },[result]);
  const complete = finalLines => {
    setResult({primary:getHexagramFromLines(finalLines),transformed:getTransformedHexagram(finalLines),nuclear:getNuclearHexagram(finalLines),finalLines});setSaved(false);
  };
  const toss = (quick=false) => {
    if(busy.current || lines.length>=6 || !started) return;
    busy.current=true;setTossing(true);sound.init();sound.playCoinTossSequence();
    const rolls=Array.from({length:quick?6-lines.length:1},tossThreeCoins);
    setCoins(rolls.at(-1).coins);
    timer.current=setTimeout(() => {
      const next=[...lines,...rolls.map(r=>r.sum)];setLines(next);setTossing(false);busy.current=false;
      if(next.length===6)complete(next);
    },matchMedia('(prefers-reduced-motion: reduce)').matches?220:1800);
  };
  const reset=()=>{clearTimeout(timer.current);busy.current=false;setTossing(false);setLines([]);setResult(null);setSaved(false);setStarted(false);setQuestion('');setCoins([3,2,3]);};
  const save=()=>{if(!result || saved)return;setHistory(h=>[{id:Date.now().toString(),question:question.trim(),primaryHex:result.primary.hexagram,transformedHex:result.transformed.hasMovingLines?result.transformed.hexagram:null,movingLines:result.transformed.movingLineIndices,finalLines:lines,formattedDate:time.formattedDate,canChiTime:`${time.yearCanChi} · ${time.hourChi}`,createdAt:new Date().toISOString(),userNote:''},...h]);setSaved(true);};
  return <div className="app-shell">
    <header className="masthead"><a className="brand" href="#main"><span className="brand-seal" aria-hidden="true">易</span><span>Chu Dịch<span className="brand-sub">Linh quái</span></span></a><nav aria-label="Điều hướng chính">
      <button onClick={()=>setModal('dictionary')} aria-label="Thư viện 64 quẻ"><BookOpen/><span>64 quẻ</span></button>
      <button onClick={()=>setModal('history')} aria-label="Nhật ký"><History/><span>Nhật ký{history.length?` (${history.length})`:''}</span></button>
      <button onClick={()=>setModal('guide')} aria-label="Hướng dẫn"><HelpCircle/><span>Hướng dẫn</span></button>
      <button onClick={()=>setMuted(sound.toggleMute())} aria-label={muted?'Bật âm thanh':'Tắt âm thanh'} aria-pressed={!muted}>{muted?<VolumeX/>:<Volume2/>}</button>
    </nav></header>
    <main id="main">
      <div className="page-intro"><div><h1>Một niệm tĩnh.<br/><span>Muôn điều sáng.</span></h1><p>Gieo một quẻ, lắng lại để nhìn rõ thời thế.<br/>Ba đồng xu. Sáu hào. Một khoảng lặng cho mình.</p></div><div className="date-note"><span>{time.formattedDate}</span><span>Năm {time.yearCanChi} · {time.hourChi}</span></div></div>
      {!result ? <section className="casting-workspace" aria-label="Không gian gieo quẻ">
        <div className="intention-panel">{!started ? <><h2>Bạn đang trăn trở điều gì?</h2><p>Chọn một việc cụ thể. Dành một nhịp thở để nghĩ về điều ấy trước khi bắt đầu.</p><label htmlFor="question">Câu hỏi của bạn <span>(không bắt buộc)</span></label><textarea id="question" rows={4} value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Tôi nên lưu tâm điều gì trong chặng đường sắp tới?"/><div className="topic-buttons">{['Công việc','Tình cảm','Cuộc sống'].map(t=><button key={t} onClick={()=>setQuestion(`Tôi nên lưu tâm điều gì về ${t.toLowerCase()} lúc này?`)}>{t}</button>)}</div><button className="primary-button" onClick={()=>{sound.init();setTime(getCurrentCanChiTime());setStarted(true);}}>Bắt đầu gieo quẻ <ArrowRight size={18}/></button><p className="small-note">Câu hỏi và nhật ký chỉ được lưu trên trình duyệt của bạn.</p></> : <><div className="section-heading"><h2>Lập quẻ của bạn</h2><span className="progress-count">{lines.length} / 6 hào</span></div><p className="intention-quote">{question || 'Lắng nghe thời thế, chiêm nghiệm bản thân.'}</p><div className="line-ledger" aria-live="polite">{[5,4,3,2,1,0].map(i=>{const info=LINE_TYPES[lines[i]];return <div key={i} className={`ledger-row ${i===lines.length?'current':''}`}><span>{['Sơ','Nhị','Tam','Tứ','Ngũ','Thượng'][i]} hào</span><div className={`ledger-line ${info?(info.isYang?'yang':'yin'):'empty'} ${info?.isMoving?'moving':''}`}><i/><i/></div><span>{info?`${lines[i]} · ${info.name}`:i===lines.length?'Đang chờ':'Chưa gieo'}</span></div>})}</div><p className="small-note">Hào được lập từ dưới lên. Hào 6 và 9 điểm là hào động.</p><button className="text-button" disabled={tossing} onClick={reset}><RotateCcw size={15}/> Đổi câu hỏi</button></> }</div>
        <CoinPlate coins={coins} isTossing={tossing} currentLineIndex={lines.length} onToss={()=>toss()} onQuickTossAll={()=>toss(true)} disabled={!started}/>
      </section> : <div ref={resultRef} className="result-anchor"><HexagramResult {...result} question={question} canChiInfo={time} onReset={reset} onSaveHistory={save} isSaved={saved&&!storageError} onOpenCardModal={()=>setModal('card')}/></div>}
      {storageError&&<p role="alert">{storageError}</p>}
      {!result&&<div className="reading-note"><span className="note-seal" aria-hidden="true">觀</span><div><h3>Hiểu quẻ để hiểu mình</h3><p>Quẻ chủ nói về hiện tại. Hào động gợi điểm chuyển. Quẻ biến mở ra một góc nhìn về xu hướng. Đọc Dịch là suy ngẫm trước khi hành động.</p></div><button className="text-button" onClick={()=>setModal('guide')}>Tìm hiểu cách đọc <ArrowRight size={16}/></button></div>}
    </main>
    <footer><span>Chu Dịch · Tự chiêm nghiệm, tự quyết định.</span><span>Gieo quẻ là một phương pháp chiêm nghiệm, không bảo đảm dự đoán tương lai.</span></footer>
    <HistoryModal isOpen={modal==='history'} onClose={()=>setModal(null)} history={history} onDeleteItem={id=>setHistory(h=>h.filter(x=>x.id!==id))} onClearAll={()=>{if(confirm('Xóa toàn bộ nhật ký trên trình duyệt này?'))setHistory([]);}} onUpdateNote={(id,note)=>setHistory(h=>h.map(x=>x.id===id?{...x,userNote:note}:x))}/>
    <DictionaryModal isOpen={modal==='dictionary'} onClose={()=>setModal(null)}/>
    <GuideModal isOpen={modal==='guide'} onClose={()=>setModal(null)}/>
    <DivinationCardModal isOpen={modal==='card'} onClose={()=>setModal(null)} primary={result?.primary} transformed={result?.transformed} question={question} canChiInfo={time}/>
  </div>;
}

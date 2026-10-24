import React,{useState,useMemo,useRef,useEffect} from 'react';
import { X, Search, ArrowLeft } from 'lucide-react';
import { HEXAGRAMS } from '../data/hexagrams';
import { TRIGRAMS } from '../data/trigrams';
import { HexagramReading } from './HexagramResult';
import { HexLines } from '../App';
export default function DictionaryModal({isOpen,onClose}) {
 const [search,setSearch]=useState('');const [selected,setSelected]=useState(null);const dialog=useRef(null);
 useEffect(()=>{if(isOpen)dialog.current?.showModal();else dialog.current?.close();},[isOpen]);
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
 const found=useMemo(()=>HEXAGRAMS.filter(h=>normalize(`${h.id} ${h.name} ${h.hanzi}`).includes(normalize(search))),[search]);
 const data=selected?{hexagram:selected,upperTrigram:TRIGRAMS[selected.upper],lowerTrigram:TRIGRAMS[selected.lower],binary:[...TRIGRAMS[selected.lower].lines,...TRIGRAMS[selected.upper].lines]}:null;
 return <dialog className="library-dialog" ref={dialog} onCancel={onClose} onClick={e=>{if(e.target===dialog.current)onClose();}} aria-labelledby="library-title"><div className="library-header"><h2 id="library-title">{selected?<button className="text-button" onClick={()=>setSelected(null)}><ArrowLeft size={18}/> Thư viện 64 quẻ</button>:'Thư viện 64 quẻ'}</h2><button className="icon-button" onClick={onClose} aria-label="Đóng thư viện"><X/></button></div><div className="library-content">{data?<HexagramReading data={data}/>:<><label className="library-search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm tên hoặc số quẻ…" aria-label="Tìm quẻ"/></label><p className="small-note">{found.length} quẻ · Sắp theo thứ tự Văn Vương</p><div className="library-grid">{found.map(h=><button key={h.id} onClick={()=>setSelected(h)}><HexLines binary={[...TRIGRAMS[h.lower].lines,...TRIGRAMS[h.upper].lines]}/><span><small>{String(h.id).padStart(2,'0')} · {h.hanzi}</small><strong>{h.name}</strong></span></button>)}</div>{!found.length&&<p>Không tìm thấy quẻ. Thử tên ngắn hơn hoặc một số từ 1 đến 64.</p>}</>}</div></dialog>;
}

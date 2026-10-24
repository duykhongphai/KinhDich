import React from 'react';
import {Printer} from 'lucide-react';
import Modal from './Modal';
import {HexLines} from '../App';
import classical from '../data/classical.json';
export default function DivinationCardModal({isOpen,onClose,primary,transformed,question,canChiInfo}) {
 if(!primary)return null;
 const h=primary.hexagram;
 const c=classical.hexagrams.find(x=>x.number===h.id);
 return <Modal isOpen={isOpen} onClose={onClose} title="Thẻ chiêm nghiệm" className="share-dialog"><div className="share-card"><span className="brand-seal">易</span><p>{canChiInfo.formattedDate}</p><HexLines binary={primary.binary} moving={transformed.movingLineIndices}/><h2>{h.name}</h2><span className="hanzi">{h.hanzi} · {h.id}/64</span><p className="share-question">{question||'Tự chiêm nghiệm thời thế'}</p><blockquote lang="zh">{c.guaci}</blockquote><p>{transformed.hasMovingLines?`Hào động: ${transformed.movingLineIndices.map(i=>i+1).join(', ')} · Quẻ biến: ${transformed.hexagram.name}`:'Sáu hào tĩnh · Không có quẻ biến'}</p><p className="source-note">Chu Dịch · Tự chiêm nghiệm, tự quyết định.</p></div><button className="secondary-button print-button" onClick={()=>window.print()}><Printer size={16}/> In hoặc lưu PDF</button></Modal>;
}

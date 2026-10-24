import React,{useEffect,useRef} from 'react';
import {X} from 'lucide-react';
export default function Modal({isOpen,onClose,title,children,className=''}) {
 const ref=useRef(null);
 useEffect(()=>{if(isOpen)ref.current?.showModal();else ref.current?.close();},[isOpen]);
 return <dialog ref={ref} className={`library-dialog ${className}`} aria-label={title} onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose();}}><div className="library-header"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Đóng"><X/></button></div><div className="library-content">{children}</div></dialog>;
}

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X, MapPin, CalendarDays, FileText, CircleHelp, GraduationCap, ListOrdered, Search, School, BarChart3, Compass } from 'lucide-react';
import './navigation.css';

type Props = { onClose: () => void; onSection: (id: string) => void; onPage: (page: string) => void };
export function MobileNavigation({ onClose, onSection, onPage }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLButtonElement>('.nav-sheet-close')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close.current(); }
      if (event.key !== 'Tab') return;
      const items = dialog.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', handleKey); trigger?.focus({ preventScroll: true }); };
  }, []);
  const links = [
    { Icon: MapPin, title: '選擇就學區', subtitle: '找到你的落點分析入口', action: () => onSection('regions') },
    { Icon: CalendarDays, title: '重要日程', subtitle: '把每個關鍵日期放在心上', action: () => onSection('schedule') },
    { Icon: FileText, title: '志願選填指南', subtitle: '從排序原則到送出前檢查', action: () => onPage('choice-guide') },
    { Icon: CircleHelp, title: '常見問題', subtitle: '開始之前，先解開疑問', action: () => onPage('faq') },
  ];
  const tools = [
    { Icon: ListOrdered, name: '序位查詢', url: 'https://tyctw.github.io/volunteer/' },
    { Icon: Search, name: '查榜入口', url: 'https://tyctw.github.io/front/' },
    { Icon: School, name: '群科探索', url: 'https://tyctw.github.io/spare/vocational-encyclopedia/' },
    { Icon: BarChart3, name: '錄取分享', url: 'https://tyctw.github.io/shared/' },
  ];
  return createPortal(<div className="navigation-layer">
    <div className="nav-sheet-backdrop" onClick={onClose} aria-hidden="true"/>
    <div ref={dialog} id="site-menu" role="dialog" aria-modal="true" aria-labelledby="nav-sheet-title" className="nav-sheet">
      <header className="nav-sheet-header"><span className="nav-sheet-wordmark"><GraduationCap size={18}/> 會考落點分析</span><button className="nav-sheet-close" aria-label="關閉選單" onClick={onClose}><X size={20}/></button></header>
      <div className="nav-sheet-body">
        <div className="nav-sheet-intro"><p>YOUR NEXT CHAPTER</p><h2 id="nav-sheet-title">下一步，<br/><span>想去哪裡？</span></h2><Compass size={49} strokeWidth={1} aria-hidden="true"/></div>
        <nav className="nav-sheet-links" aria-label="主要導覽">{links.map(({ Icon, title, subtitle, action }, i) => <button key={title} onClick={action}><span className="nav-sheet-icon"><Icon size={20} strokeWidth={1.6}/></span><span className="nav-sheet-link-copy"><strong>{title}</strong><small>{subtitle}</small></span><span className="nav-sheet-index">0{i + 1}</span><ArrowUpRight size={18} className="nav-sheet-arrow"/></button>)}</nav>
        <button className="nav-sheet-membership" onClick={() => onSection('membership')}><span className="nav-sheet-member-icon"><GraduationCap size={23}/></span><span><small>多一點支持，規劃更順手</small><strong>探索會員方案 <span>NT$49 起</span></strong></span><ArrowUpRight size={19}/></button>
        <section className="nav-sheet-tools" aria-label="實用工具"><div className="nav-sheet-section-label"><span>升學工具箱</span><small>QUICK TOOLS</small></div><div>{tools.map(({ Icon, name, url }) => <a key={name} href={url} target="_blank" rel="noreferrer"><Icon size={17} strokeWidth={1.7}/><span>{name}</span><ArrowUpRight size={13}/></a>)}</div></section>
        <a className="nav-sheet-official" href="https://tyctw.github.io/official/" target="_blank" rel="noreferrer"><span>官方資料庫</span><strong>查看超額比序規則</strong><ArrowUpRight size={17}/></a>
        <footer className="nav-sheet-footer"><span/><p>每一個方向，都有你的可能。</p><small>116 學年度</small></footer>
      </div>
    </div>
  </div>, document.body);
}

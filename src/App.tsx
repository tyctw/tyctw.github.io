import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ChoiceGuide } from './ChoiceGuide';
import './menu.css';
import './guide-teaser.css';
import {
  ArrowUpRight, BarChart3, CalendarCheck, CalendarDays, ChevronDown, CircleQuestionMark,
  Clock3, Compass, FileText, GraduationCap, HelpCircle, ListOrdered, MapPin, Menu,
  Search, School, Trophy, X
} from 'lucide-react';

const officialRulesUrl = 'https://tyctw.github.io/official/';

const regions = [
  ['基北區', '基隆市・台北市・新北市', 'TPE', '最大考區', 'https://tyctw.github.io/spare/', 'https://ttk.entry.edu.tw/'],
  ['桃連區', '桃園市・連江縣', 'TAO', '', 'https://tyctw.github.io/spare/', 'https://tyc.entry.edu.tw/'],
  ['中投區', '台中市・南投縣', 'TAI', '', 'https://tyctw.github.io/spare/', 'https://ct.entry.edu.tw/'],
  ['彰化區', '彰化縣', 'CHA', '', 'https://tyctw.github.io/spare/', 'https://chc.entry.edu.tw/'],
  ['台南區', '台南市', 'TNN', '', 'https://tyctw.github.io/spare/', 'https://tn.entry.edu.tw/'],
  ['竹苗區', '新竹市・新竹縣・苗栗縣', 'HSI', '', 'https://tyctw.github.io/spare/', 'https://hhm.entry.edu.tw/'],
  ['高雄區', '高雄市', 'KAO', '', 'https://tyctw.github.io/spare/', 'https://kh.entry.edu.tw/'],
  ['宜蘭區', '宜蘭縣', 'YIL', '未來將開放', '#', 'https://iln.entry.edu.tw/'],
  ['嘉義區', '嘉義市・嘉義縣', 'CHI', '', 'https://tyctw.github.io/spare/', 'https://cyc.entry.edu.tw/'],
  ['雲林區', '雲林縣', 'YUN', '未來將開放', '#', 'https://ylc.entry.edu.tw/'],
  ['屏東區', '屏東縣', 'PIN', '未來將開放', '#', 'https://ptc.entry.edu.tw/'],
  ['花蓮區', '花蓮縣', 'HUA', '未來將開放', '#', 'https://hlc.entry.edu.tw/'],
  ['臺東區', '臺東縣', 'TTT', '未來將開放', '#', 'https://ttf.entry.edu.tw/'],
  ['澎湖區', '澎湖縣', 'PEN', '未來將開放', '#', 'https://ph.entry.edu.tw/'],
  ['金門區', '金門縣', 'KIN', '未來將開放', '#', 'https://km.entry.edu.tw/'],
] as const;

const steps = [
  ['01', '選擇就學區', '依所在地或目標學校選擇專屬入口。'],
  ['02', '完成資料試算', '按照該區規則，快速整理成績與積分。'],
  ['03', '規劃志願方向', '用清晰資訊比較學校與升學選擇。'],
];

const schedule = [
  ['06 / 18', '個人序位區間公告', '查看超額比序積分與序位區間', 'done'],
  ['06 / 18 — 06 / 25', '免試入學志願選填', '各就學區開放正式志願選填', 'active'],
  ['07 / 07', '免試入學放榜', '公告免試入學分發結果', 'next'],
] as const;

const faqs = [
  ['使用系統需要註冊或付費嗎？', '不需要。本網站入口不要求建立帳號，基礎資訊整理與入口導覽免費提供。若您前往外部服務，請依該服務的公告與使用規範辦理。'],
  ['落點分析或積分結果可以保證錄取嗎？', '不可以。試算與落點資訊僅供規劃參考；實際結果仍受招生名額、志願序、同分比序、資格審查及當年度報名情況影響。請以各區免試入學委員會與學校正式公告為準。'],
  ['各區的積分方式為什麼不同？', '各就學區會依其免試入學作業要點與招生簡章，訂定比序項目、積分採計方式及同分比序順序。因此不能將一區的公式直接套用至其他區。'],
  ['可以跨區參加免試入學嗎？', '是否可變更就學區、應備文件與申請期限，均依當年度招生簡章規定。請先確認目標區的資格與時程，再向就讀國中或該區免試入學委員會洽詢。'],
  ['資料與時程多久更新一次？', '我們會隨各區委員會、教育主管機關與學校的公告更新頁面；但招生制度與時程可能調整，送件、選填或報到前務必再次核對最新正式簡章。'],
  ['網站會保存我的成績或志願資料嗎？', '入口網站不設帳號、成績或志願資料庫。若您使用外部分析服務，請先閱讀該服務的隱私權說明；外部服務的資料處理不由本網站控制。'],
  ['找不到想要的就學區或規則怎麼辦？', '全國共有 15 個就學區。尚未開放的區域會標示建置中；如有規則、連結或內容疑義，請來信 tyctw.analyze@gmail.com，我們會依官方資料檢視與更新。'],
];

function FAQ({ item, index }: { item: readonly string[]; index: number; key?: string }) {
  const [open, setOpen] = useState(index === 0);
  return <div className="faq-item">
    <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`answer-${index}`}>
      <span>{item[0]}</span><ChevronDown size={19} className={open ? 'flip' : ''} />
    </button>
    {open && <p id={`answer-${index}`}>{item[1]}</p>}
  </div>;
}

function Legal({ title, children }: { title: string; children: ReactNode }) {
  return <div className="legal-page"><header className="nav"><a href="#" className="brand"><span className="brand-mark"><GraduationCap size={19}/></span>會考落點分析</a><a href="#">返回首頁</a></header><main><span className="eyebrow">INFORMATION</span><h1>{title}</h1><div className="legal-card">{children}</div></main></div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => { const onHash = () => setRoute(window.location.hash); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, [route]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [menuOpen]);
  if (route === '#/privacy-policy') return <Legal title="隱私權政策">
    <p>本隱私權政策說明「會考落點分析」網站（下稱「本網站」）如何處理瀏覽與聯絡過程中可能涉及的資料。當您使用本網站，即表示您已閱讀並理解本政策。</p>
    <h2>一、適用範圍</h2><p>本政策適用於本網站的首頁、資訊頁面與由本網站直接提供的功能。當您點選前往就學區委員會、學校、政府機關或其他外部網站的連結後，該外部網站的資料處理方式應依其各自的隱私權政策辦理，不在本政策的適用範圍內。</p>
    <h2>二、我們處理的資料</h2><p>本網站不要求使用者註冊帳號，亦不主動蒐集姓名、身分證統一編號、電話、住址、學校、成績或志願等個人資料。您以電子郵件主動聯繫時，我們可能取得您的電子郵件地址、信件內容及您自行提供的資訊，僅用於回覆、處理意見或維護服務。</p>
    <h2>三、資料處理目的與方式</h2><p>我們僅在提供網站內容、回覆使用者、維護安全、排除錯誤與改善使用體驗的必要範圍內處理資料。除法律另有規定、主管機關依法要求，或為保護使用者與本網站權益所必要外，不會出售、出租或以行銷目的交換您的個人資料。</p>
    <h2>四、成績與試算資料</h2><p>本網站入口頁不設置帳號、成績資料庫或志願資料庫。若您前往各區分析服務並輸入資料，請先閱讀該服務頁面的隱私權說明與操作提示；不同服務的資料處理方式可能不同。本網站無法代為存取、修改或刪除外部服務中的資料。</p>
    <h2>五、Cookie 與技術資訊</h2><p>為使網站正常運作，您的瀏覽器與網路服務提供者可能產生基本技術紀錄，例如 IP 位址、瀏覽器類型、裝置資訊、存取時間、來源頁面與錯誤紀錄。這些資料通常用於資安、除錯與流量維護，不用來識別您的升學成績或建立個人檔案。您可透過瀏覽器設定管理 Cookie 或清除本機資料；部分偏好或外部服務功能可能因此受到影響。</p>
    <h2>六、資料安全與保存</h2><p>我們採取合理的技術與管理措施，降低未經授權存取、遺失、竄改或洩漏的風險。透過電子郵件取得的聯絡資料，將於回覆、處理紀錄或法令要求所需期間內保存，期限屆滿後依合理方式刪除或去識別化。網際網路傳輸並非絕對安全，請勿以電子郵件傳送身分證號、完整成績單或其他不必要的敏感資料。</p>
    <h2>七、未成年使用者</h2><p>本網站的服務對象可能包含未成年學生。若未成年使用者需要提供任何個人資料或就重要升學決定尋求協助，建議由家長、監護人或學校輔導人員共同確認。</p>
    <h2>八、您的權利與聯絡方式</h2><p>依適用法令，您可就本網站所持有的個人資料提出查詢、閱覽、請求複製、更正、停止蒐集／處理／利用或刪除的要求。請以電子郵件說明您的需求及可供確認的聯絡方式；我們將依法律規定與合理程序處理。</p><p>聯絡信箱：<a href="mailto:tyctw.analyze@gmail.com">tyctw.analyze@gmail.com</a></p>
    <h2>九、政策修訂</h2><p>本政策可能因服務內容、技術或法令變動而修訂。修訂後的版本將公布於本頁，並自公布日起生效。</p><p>最後更新：2026 年 8 月 3 日</p>
  </Legal>;
  if (route === '#/terms-of-use') return <Legal title="使用條款">
    <p>歡迎使用「會考落點分析」網站（下稱「本網站」）。請在使用前詳閱本條款；您繼續瀏覽、使用本網站或點選外部服務連結，即表示同意遵守本條款。</p>
    <h2>一、服務性質</h2><p>本網站提供國中教育會考、適性入學、就學區入口、重要日程及相關升學資訊的整理與導覽。網站旨在協助使用者理解資訊與進行初步規劃，並非教育主管機關、招生委員會、學校或法律、升學顧問機構的正式公告或個別諮詢服務。</p>
    <h2>二、資訊參考與正式依據</h2><p>網站內容、時程、比序說明、試算結果與志願建議均僅供參考，不構成錄取保證、入學資格認定或任何承諾。招生名額、報名資格、比序項目、同分比序、錄取結果、報到期限與其他作業事項，應以當年度各就學區免試入學委員會、主管機關及學校所發布的招生簡章與最新公告為準。</p>
    <h2>三、使用者責任</h2><p>您應自行確認輸入資料、升學資格與最新公告的正確性，並就個人志願選填與升學決定負責。建議考量個人興趣、性向、能力、生涯規劃與學校輔導意見；如有疑義，請向就讀國中、各就學區委員會或招生學校洽詢。</p>
    <h2>四、禁止行為</h2><p>您不得以違法、不當或足以影響服務安全與正常運作的方式使用本網站，包括但不限於：嘗試未授權存取、干擾或攻擊系統、散布惡意程式、大量擷取資料、冒用他人身分、侵害他人隱私或智慧財產權，或利用本網站內容從事誤導、詐欺或其他違法行為。</p>
    <h2>五、外部連結</h2><p>本網站可能提供政府機關、就學區委員會、學校或其他第三方網站的連結，以方便使用者查詢資訊。外部網站的內容、可用性、資安與資料處理方式由各該網站負責；您應自行閱讀其使用條款與隱私權政策。</p>
    <h2>六、智慧財產權</h2><p>除政府公開資料、外部網站內容或另有標示者外，本網站的版面、文字整理、程式、圖像與資料編排受相關法令保護。您得為個人升學規劃目的合理瀏覽、引用與分享連結；未經同意，不得大量重製、改作、散布、出售，或以足使他人誤認來源的方式使用。</p>
    <h2>七、服務調整與責任限制</h2><p>我們得因資訊更新、維護、安全或其他合理需求，隨時調整、暫停或終止網站全部或部分內容。雖會盡力維護資訊正確與可用性，但不保證內容永遠即時、完整或無誤。在法律允許的範圍內，因使用、無法使用或依賴本網站內容而生的損失，應由使用者依個別情況自行承擔。</p>
    <h2>八、條款修訂與聯絡</h2><p>本條款可能隨服務內容或法令變動修訂，修訂後版本公布於本頁即生效。若您對本條款或網站內容有疑問，請來信 <a href="mailto:tyctw.analyze@gmail.com">tyctw.analyze@gmail.com</a>。</p><p>最後更新：2026 年 8 月 3 日</p>
  </Legal>;
  if (route === '#/about') return <Legal title="我們的理念">
    <p>升學是學生與家庭共同面對的重要選擇，但資訊往往分散、規則也不容易理解。我們希望做的，是把複雜的資料整理得更清楚，讓每個人都能更有方向地規劃下一步。</p>
    <h2>讓資訊更容易被找到</h2><p>各就學區的招生簡章、比序規則、重要日程與入口網站分散在不同平台。我們將這些資訊集中整理，讓學生、家長與教育工作者能更快找到需要的官方資源與服務入口。</p>
    <h2>讓規劃回到學生身上</h2><p>我們不把升學看成只比較分數的問題。志願選擇也應該納入興趣、性向、能力、通勤、學校特色與未來發展等考量。落點資訊可以協助比較，但不能取代學生自己的理解、選擇與專業輔導。</p>
    <h2>降低資訊與試算門檻</h2><p>不同就學區可能採用不同的比序項目、積分與換算方式。透過清楚的入口與說明，我們希望減少反覆查找、人工試算與漏看規則的壓力，讓準備過程更從容。</p>
    <h2>維持公開、免費與負責任</h2><p>基礎升學資訊應該容易取得。因此本網站不要求帳號，並盡可能提供免費的資訊整理與使用導引。同時，我們會清楚標示服務的參考性質，提醒使用者以各區招生簡章與官方公告作為正式依據。</p>
    <h2>持續更新，也歡迎指正</h2><p>升學制度與時程會隨年度調整。我們會持續檢視與更新內容；若您發現資訊有誤、連結失效，或有改善建議，歡迎來信 <a href="mailto:tyctw.analyze@gmail.com">tyctw.analyze@gmail.com</a>。</p><p>最後更新：2026 年 8 月 3 日</p>
  </Legal>;
  if (route === '#/choice-guide') return <Legal title="志願選填完整指南"><ChoiceGuide /></Legal>;
  if (route === '#/faq') return <Legal title="常見問題"><p>這裡整理使用本網站與規劃免試入學時最常見的問題。每一項招生資格、比序積分與作業時程，仍請以各就學區免試入學委員會與學校當年度正式公告為準。</p><div className="standalone-faq">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div><p>若仍有疑問，請聯絡 <a href="mailto:tyctw.analyze@gmail.com">tyctw.analyze@gmail.com</a>。</p></Legal>;

  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const openPage = (page: string) => { setMenuOpen(false); window.location.hash = `/${page}`; };
  return <div className="site-shell">
    <header className="nav">
      <a href="#" className="brand"><span className="brand-mark"><GraduationCap size={19}/></span>會考落點分析</a>
      <nav className="desktop-nav"><button onClick={() => go('regions')}>選擇考區</button><button onClick={() => go('schedule')}>重要日程</button><button onClick={() => openPage('choice-guide')}>志願選填指南</button><button onClick={() => openPage('faq')}>常見問題</button></nav>
      <a className="rules-link" href={officialRulesUrl} target="_blank" rel="noreferrer">比序規則 <ArrowUpRight size={15}/></a>
      <button className="mobile-menu" aria-label={menuOpen ? '關閉選單' : '開啟選單'} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19}/> : <Menu size={19}/>}<span className="menu-label">選單</span></button>
      {menuOpen && <>
        <button className="menu-overlay" aria-label="關閉選單" onClick={() => setMenuOpen(false)} />
        <aside id="site-menu" className="mobile-drawer" aria-label="網站選單">
          <div className="drawer-brand"><span className="drawer-brand-mark"><GraduationCap size={19}/></span><span><b>會考落點分析</b><small>YOUR NEXT CHAPTER</small></span><button className="drawer-close" aria-label="關閉選單" onClick={() => setMenuOpen(false)}><X size={19}/></button></div>
          <nav className="drawer-links">
            <button onClick={() => go('regions')}><span className="drawer-item-number">01</span><span className="drawer-link-icon"><MapPin size={18} strokeWidth={2.2}/></span><span>選擇就學區<small>查看各區落點分析</small></span><ArrowUpRight size={16}/></button>
            <button onClick={() => go('schedule')}><span className="drawer-item-number">02</span><span className="drawer-link-icon"><CalendarCheck size={18} strokeWidth={2.2}/></span><span>重要日程<small>掌握招生關鍵時間</small></span><ArrowUpRight size={16}/></button>
            <button onClick={() => openPage('choice-guide')}><span className="drawer-item-number">03</span><span className="drawer-link-icon"><FileText size={18} strokeWidth={2.2}/></span><span>志願選填指南<small>完整流程與檢核重點</small></span><ArrowUpRight size={16}/></button>
            <button onClick={() => openPage('faq')}><span className="drawer-item-number">04</span><span className="drawer-link-icon"><CircleQuestionMark size={18} strokeWidth={2.2}/></span><span>常見問題<small>快速了解使用方式</small></span><ArrowUpRight size={16}/></button>
          </nav>
          <section className="drawer-tools" aria-label="實用工具"><p>實用工具</p><div><a href="https://tyctw.github.io/volunteer/" target="_blank" rel="noreferrer"><ListOrdered size={17}/><span>序位查詢</span></a><a href="https://tyctw.github.io/front/" target="_blank" rel="noreferrer"><Search size={17}/><span>查榜入口</span></a><a href="https://tyctw.github.io/spare/vocational-encyclopedia/" target="_blank" rel="noreferrer"><School size={17}/><span>群科探索</span></a><a href="https://tyctw.github.io/shared/" target="_blank" rel="noreferrer"><BarChart3 size={17}/><span>錄取分享</span></a></div></section>
          <a className="drawer-rules-link" href={officialRulesUrl} target="_blank" rel="noreferrer"><span>官方資料庫</span><strong>查看超額比序規則</strong><ArrowUpRight size={16}/></a>
          <div className="drawer-footer"><span></span>為下一步，找到方向。</div>
        </aside>
      </>}
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="notice"><span></span>116 學年度升學資訊已整理</div><p className="eyebrow">YOUR NEXT CHAPTER</p><h1>為下一步，<br/><em>找到方向。</em></h1><p className="hero-lead">從會考成績到志願選填，用清楚的資訊與專屬試算，陪你穩穩走過每一個重要決定。</p><div className="hero-actions"><button className="primary" onClick={() => go('regions')}>開始選擇考區 <ArrowUpRight size={18}/></button><button className="text-action" onClick={() => go('schedule')}>查看重要日程 <span>↓</span></button></div><a className="choice-guide-entry" href="#/choice-guide"><span className="choice-guide-entry-icon"><FileText size={19}/></span><span className="choice-guide-entry-copy"><small>ADMISSION GUIDE</small><strong>志願選填完整指南</strong><em>整理排序原則、送出檢核與重要提醒。</em></span><span className="choice-guide-entry-action">閱讀指南 <ArrowUpRight size={16}/></span></a></div>
        <div className="hero-visual" aria-label="升學規劃進度卡片"><div className="sun"></div><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="progress-card"><div className="card-top"><span className="mini-logo"><GraduationCap size={18}/></span><span>升學規劃地圖</span><i>2026</i></div><div className="progress-title">你的下一站，<br/>正在成形。</div><div className="progress-line"><span></span><span></span><span className="current"></span><span></span></div><div className="progress-labels"><b>會考</b><b>成績</b><b>志願</b><b>放榜</b></div><div className="card-note"><Compass size={17}/><span>從選擇就學區開始</span><ArrowUpRight size={16}/></div></div><div className="float-pill pill-a"><Trophy size={17}/><span>做好準備</span></div><div className="float-pill pill-b"><CalendarDays size={17}/><span>重要時程</span></div></div>
      </section>
      <section className="quick-stats" aria-label="服務資訊"><div className="stats-intro"><span>AT A GLANCE</span><p>升學資訊<br/>一目了然</p></div><div className="stat-card"><i>01</i><strong>7</strong><span>已開放<br/>就學區</span><b>區</b></div><div className="stat-card"><i>02</i><strong>116</strong><span>最新學年度<br/>資訊</span><b>學年度</b></div><div className="stat-card"><i>03</i><strong>0</strong><span>註冊與使用<br/>門檻</span><b>步驟</b></div><div className="stat-card"><i>04</i><strong>100%</strong><span>免費提供<br/>參考</span><b>FREE</b></div></section>
      <section id="regions" className="regions section"><div className="section-heading"><div><p className="eyebrow">CHOOSE YOUR AREA</p><h2>從你的就學區<br/>開始規劃。</h2></div><p>選擇目標地區，進入專屬的落點分析工具；招生規則與時程仍請同步核對官方簡章。</p></div><div className="region-grid">{regions.map(([name, desc, area, badge, url], i) => <a key={name} href={url} target={url === '#' ? undefined : '_blank'} rel={url === '#' ? undefined : 'noreferrer'} onClick={url === '#' ? (event) => event.preventDefault() : undefined} className={`region-card region-${i % 4} ${url === '#' ? 'region-pending' : ''}`} aria-disabled={url === '#'}><div className="region-top"><span className="region-area">{area}</span>{badge && <span className="region-badge">{badge}</span>}<span className="region-number">{String(i + 1).padStart(2, '0')}</span></div><div className="region-code" aria-hidden="true">{area}</div><div className="region-content"><h3>{name}</h3><p>{desc}</p></div><span className="enter">{url === '#' ? '未來將開放' : '進入落點分析'} <ArrowUpRight size={17}/></span></a>)}</div><p className="region-footnote">共 15 個就學區；計分方式、採計期限與同分比序，請以各區免試入學委員會公布的 115 學年度簡章與附表為準。</p></section>
      <section className="path section"><div className="path-intro"><p className="eyebrow">A CLEARER PATH</p><h2>不用一個人<br/>面對複雜規則。</h2><p>我們把重要資訊化為簡潔的步驟，讓準備升學這件事，多一點從容。</p><a href={officialRulesUrl} target="_blank" rel="noreferrer">閱讀超額比序規則 <ArrowUpRight size={16}/></a></div><div className="step-list">{steps.map(([num, title, desc]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={20}/></article>)}</div></section>
      <section id="schedule" className="schedule section"><div className="schedule-head"><div><p className="eyebrow">KEY DATES</p><h2>留住每個<br/>關鍵時間點。</h2></div><div className="today"><Clock3 size={19}/><span>目前進度</span><strong>志願選填期間</strong></div></div><div className="schedule-list">{schedule.map(([date, title, desc, status]) => <article key={title} className={status}><div className="date">{date}</div><div><span className="status-dot"></span><h3>{title}</h3><p>{desc}</p></div><span className="schedule-state">{status === 'done' ? '已完成' : status === 'active' ? '進行中' : '即將到來'}</span></article>)}</div><p className="schedule-note">實際時程請以各區免試入學委員會最新公告為準。</p></section>
      <section id="faq" className="faq section"><div className="faq-copy"><p className="eyebrow">HELP CENTER</p><h2>有問題，<br/>我們先回答。</h2><p>整理考生與家長最常問的問題，讓你在開始前更安心。</p><span className="help-icon"><HelpCircle size={26}/></span></div><div className="faq-list">{faqs.map((item, i) => <FAQ key={item[0]} item={item} index={i}/>)}</div></section>
    </main>
    <footer className="site-footer"><div className="footer-glow"></div><div className="footer-main"><div className="footer-intro"><a href="#" className="brand"><span className="brand-mark"><GraduationCap size={19}/></span>會考落點分析</a><h2>清楚看見選擇，<br/><em>安心走向下一步。</em></h2><p>把升學資訊整理得更清楚，陪你在重要的選擇前，找到屬於自己的方向。</p><a className="footer-email" href="mailto:tyctw.analyze@gmail.com">tyctw.analyze@gmail.com <ArrowUpRight size={15}/></a></div><div className="footer-nav"><div><span>EXPLORE</span><a href="https://tyctw.github.io/volunteer/" target="_blank" rel="noreferrer">序位查詢</a><a href="https://tyctw.github.io/front/" target="_blank" rel="noreferrer">查榜入口</a><a href="https://tyctw.github.io/spare/vocational-encyclopedia/" target="_blank" rel="noreferrer">群科探索</a><a href="https://tyctw.github.io/shared/" target="_blank" rel="noreferrer">錄取分享</a></div><div><span>INFORMATION</span><a href="#/about">我們的理念</a><a href={officialRulesUrl} target="_blank" rel="noreferrer">超額比序規則</a><a href="#/privacy-policy">隱私權政策</a><a href="#/terms-of-use">使用條款</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} 會考落點分析系統</span><span>MADE FOR YOUR NEXT CHAPTER</span></div></footer>
  </div>;
}

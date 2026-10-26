import { useState } from 'react';
import { ArrowUpRight, Check, EyeOff, ChartNoAxesCombined, SlidersHorizontal, UsersRound } from 'lucide-react';
import './membership.css';

const plans = [
  { days: 30, price: 49, label: '輕鬆開始', highlight: '30 天享有完整會員權益', description: '適合本次選填，或先體驗會員功能。', note: '完整權益，先用 30 天體驗' },
  { days: 365, price: 399, label: '長期規劃更划算', highlight: '平均每天約 NT$1.1', description: 'NT$399 ÷ 365 天換算；一次付款 NT$399。', note: '比購買 12 次 30 天方案省 NT$189' },
];
const benefits = [
  { Icon: EyeOff, title: '把注意力留給選擇', description: '會員期間關閉 Google 廣告與 Offerwall，專心閱讀校科資訊。' },
  { Icon: ChartNoAxesCombined, title: '想比較，就開始分析', description: '填好成績即可分析，省下反覆輸入系統授權碼的步驟。' },
  { Icon: SlidersHorizontal, title: '多試幾種成績情境', description: '用一分改變分析探索成績變化，讓校科比較更有方向。' },
  { Icon: UsersRound, title: '讓全家討論更具體', description: '邀請家長共編志願、留言與查看版本，一起整理每次選擇。' },
];

export function Membership() {
  const [selected, setSelected] = useState(30);
  const plan = plans.find(plan => plan.days === selected)!;
  return <section id="membership" className="membership section" aria-labelledby="membership-heading">
    <div className="membership-heading">
      <p className="eyebrow">A LITTLE MORE FOR YOUR NEXT CHAPTER</p>
      <h2 id="membership-heading">選一段適合你的<br/><span>規劃時間。</span></h2>
      <p>30 天先體驗，365 天持續規劃。<br className="membership-mobile-break"/>兩種方案都享有完整會員權益。</p>
    </div>
    <fieldset className="membership-plans">
      <legend>選擇會員方案</legend>
      {plans.map(({ days, price, label, highlight, description, note }) => <label key={days} className={`membership-plan ${selected === days ? 'is-selected' : ''}`}>
        <input type="radio" name="membership-plan" value={days} checked={selected === days} onChange={() => setSelected(days)} />
        <div className="plan-top"><span className="plan-label">{label}</span><span className="plan-indicator" aria-hidden="true">{selected === days && <Check size={15}/>}</span></div>
        <h3>{days} 天方案</h3>
        <div className="plan-price"><span>NT$</span><strong>{price}</strong></div>
        <p className="plan-payment">一次付款 · 使用 {days} 天</p>
        <div className="plan-detail"><strong>{highlight}</strong><p>{description}</p></div>
        <p className="plan-note"><Check size={15}/>{note}</p>
        <span className="plan-select-label">{selected === days ? '已選擇此方案' : `選擇 ${days} 天方案`}{selected === days ? <Check size={16}/> : <ArrowUpRight size={16}/>}</span>
      </label>)}
    </fieldset>
    <div className="membership-checkout">
      <div className="checkout-copy" aria-live="polite"><strong>{plan.days} 天完整會員權益</strong><span>一次付款 NT${plan.price}，讓規劃更順手。</span></div>
      <a href="https://tyctw.github.io/spare/membership/" target="_blank" rel="noreferrer" className="membership-purchase">前往購買會員 <ArrowUpRight size={18}/><span className="sr-only">（開啟新分頁）</span></a>
      <p>前往會員頁面確認方案與完成付款。</p>
    </div>
    <div className="membership-benefits">
      <div className="membership-benefits-heading"><span className="eyebrow">MEMBER BENEFITS</span><h3>加入會員，讓規劃更順手</h3><p>30 天與 365 天方案，完整權益都一樣。</p></div>
      <div className="benefits-grid">{benefits.map(({Icon, title, description}, i) => <article key={title}><div className="benefit-top"><span><Icon size={22} strokeWidth={1.6}/></span><small>0{i + 1}</small></div><h4>{title}</h4><p>{description}</p></article>)}</div>
    </div>
  </section>;
}

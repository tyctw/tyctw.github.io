import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Target, 
  Shield, 
  LineChart, 
  Map, 
  GraduationCap,
  Users,
  Award,
  Calendar,
  ChevronDown,
  HelpCircle,
  Clock,
  PenTool,
  Mail,
  BookOpen,
  Bell,
  ListOrdered,
  MousePointerClick,
  Trophy,
  Menu,
  X
} from 'lucide-react';

const officialRulesUrl = 'https://tyctw.github.io/official/';

const regions = [
  { 
    id: 'taipei', 
    name: '基北區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '基隆市・台北市・新北市', 
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'hover:shadow-blue-500/20',
    badge: '最大考區'
  },
  { 
    id: 'taoyuan', 
    name: '桃聯區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '桃園市・連江縣', 
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'hover:shadow-cyan-500/20'
  },
  { 
    id: 'taichung', 
    name: '中投區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '台中市・南投縣', 
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'hover:shadow-emerald-500/20'
  },
  { 
    id: 'changhua', 
    name: '彰化區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '彰化縣', 
    gradient: 'from-amber-400 to-orange-500',
    glow: 'hover:shadow-amber-500/20'
  },
  { 
    id: 'tainan', 
    name: '台南區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '台南市', 
    gradient: 'from-rose-400 to-red-500',
    glow: 'hover:shadow-rose-500/20'
  },
  { 
    id: 'hsinchu', 
    name: '竹苗區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '新竹市・新竹縣・苗栗縣', 
    gradient: 'from-rose-400 to-red-500',
    glow: 'hover:shadow-rose-500/20'
  },
  { 
    id: 'kaohsiung', 
    name: '高雄區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '高雄市', 
    gradient: 'from-violet-400 to-purple-500',
    glow: 'hover:shadow-violet-500/20'
  },
  { 
    id: 'yilan', 
    name: '宜蘭區', 
    url: '#', 
    desc: '宜蘭縣', 
    gradient: 'from-slate-300 to-slate-400',
    glow: '',
    badge: '待上線'
  },
  { 
    id: 'chiayi', 
    name: '嘉義區', 
    url: '#', 
    desc: '嘉義市・嘉義縣', 
    gradient: 'from-zinc-300 to-zinc-400',
    glow: '',
    badge: '待上線'
  },
  { 
    id: 'yunlin', 
    name: '雲林區', 
    url: '#', 
    desc: '雲林縣', 
    gradient: 'from-stone-300 to-stone-400',
    glow: '',
    badge: '待上線'
  },
  { 
    id: 'pingtung', 
    name: '屏東區', 
    url: '#', 
    desc: '屏東縣', 
    gradient: 'from-gray-300 to-gray-400',
    glow: '',
    badge: '待上線'
  },
  { 
    id: 'hualien', 
    name: '花蓮區', 
    url: '#', 
    desc: '花蓮縣', 
    gradient: 'from-neutral-300 to-neutral-400',
    glow: '',
    badge: '待上線'
  }
];

const features = [
  {
    icon: <Target className="w-5 h-5" />,
    title: '整理升學資訊',
    desc: '彙整各區入口、比序規則與重要時程，提供升學參考。'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: '絕對隱私安全',
    desc: '免註冊、免登入，我們承諾絕不收集或外洩您的個人成績資料。'
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    title: '即時動態分析',
    desc: '讓更多學校與升學路徑能被納入參考。'
  }
];

const stats = [
  { value: '12大區', label: '涵蓋全台就學區', icon: <Map className="w-6 h-6 text-amber-400" /> },
  { value: '116年', label: '最新比序規則', icon: <LineChart className="w-6 h-6 text-indigo-400" /> },
  { value: '免註冊', label: '保護隱私安全', icon: <Shield className="w-6 h-6 text-emerald-400" /> },
  { value: '100%', label: '完全免費使用', icon: <Award className="w-6 h-6 text-rose-400" /> },
];

const philosophyFeatures = [
  {
    icon: <Target className="w-5 h-5" />,
    title: '整理升學資訊',
    desc: '把分散在各處的就學區入口、比序規則與時程整理在一起，降低查找門檻。'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: '降低試算錯誤',
    desc: '各區比序、積分與換算方式不完全相同，透過工具化整理減少重複計算與漏看規則。'
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    title: '補足資訊落差',
    desc: '不只關注熱門學校，也希望讓高中、高職、五專與不同群科資料有被比較的機會。'
  }
];

const philosophyStats = [
  { value: '12區', label: '整理主要就學區入口', icon: <Map className="w-6 h-6 text-amber-400" /> },
  { value: '116年', label: '彙整升學參考資訊', icon: <LineChart className="w-6 h-6 text-indigo-400" /> },
  { value: '免註冊', label: '降低查詢使用門檻', icon: <Shield className="w-6 h-6 text-emerald-400" /> },
  { value: '免費', label: '基礎功能開放使用', icon: <Award className="w-6 h-6 text-rose-400" /> },
];

const philosophyFaqs = [
  {
    q: '這個系統是免費的嗎？',
    a: '是的。本服務希望盡可能把基礎查詢與分析功能免費開放，降低學生與家長取得升學資訊的成本。'
  },
  {
    q: '落點分析結果可以當作錄取保證嗎？',
    a: '不可以。本系統提供的是升學資訊整理與志願選填輔助，目的是協助使用者減少試算錯誤、補足資訊落差。實際錄取仍會受到招生名額、同分比序、志願序與當年度填選情況影響，請以各區免試入學委員會與學校公告為準。'
  },
  {
    q: '資料涵蓋哪些升學路徑？',
    a: '我們希望不只整理前段或熱門學校，也盡量納入中後段學校、高中、高職、五專與不同群科資訊，讓更多選擇能被看見與比較。'
  },
  {
    q: '使用時應該注意什麼？',
    a: '各就學區規則可能調整，網站內容僅供參考。正式招生名額、比序項目、錄取結果與報到作業，仍應以官方簡章與最新公告為準。'
  },
];
const timeline = [
  { date: '116/03/05(五) - 03/07(日)', title: '國中教育會考報名', desc: '由就讀國中代為辦理集體報名，個別報名考生請留意各考區簡章規定。', status: 'past', icon: <PenTool className="w-6 h-6" /> },
  { date: '116/04/10(六)', title: '寄發准考證', desc: '集體報名由國中轉發，個別報名由考區試務會寄發。', status: 'past', icon: <Mail className="w-6 h-6" /> },
  { date: '116/05/16(日) - 05/17(一)', title: '國中教育會考', desc: '全台統一考試日期，請考生攜帶准考證準時應考。', status: 'past', icon: <BookOpen className="w-6 h-6" /> },
  { date: '116/06/05(六)', title: '會考成績公布', desc: '開放網路查詢成績，並由各國中轉發紙本成績單。', status: 'past', icon: <Bell className="w-6 h-6" /> },
  { date: '116/06/18(五)', title: '個人序位區間公告', desc: '開放查詢個人序位區間及免試入學超額比序積分。', status: 'past', icon: <ListOrdered className="w-6 h-6" /> },
  { date: '116/06/18(五) - 06/25(五)', title: '免試入學志願選填', desc: '各就學區開放免試入學正式志願選填，請把握時間。', status: 'active', icon: <MousePointerClick className="w-6 h-6" /> },
  { date: '116/07/07(三)', title: '免試入學放榜', desc: '公告免試入學分發結果，準備前往錄取學校報到。', status: 'future', icon: <Trophy className="w-6 h-6" /> },
];

const faqs = [
  { 
    q: '這個系統是免費的嗎？', 
    a: '是的，本系統由熱心教育的團隊開發，完全免費提供給所有考生與家長使用，不收取任何費用，也沒有任何隱藏的付費解鎖功能。' 
  },
  { 
    q: '落點分析結果可以當作錄取保證嗎？', 
    a: '不可以。本系統提供的是升學資訊整理與志願選填輔助，目的在於減少試算錯誤、補足資訊落差。實際錄取仍以各區免試入學委員會與學校公告為準。' 
  },
  { 
    q: '需要註冊帳號才能使用嗎？', 
    a: '不需要。我們極度重視您的隱私，系統採「免註冊、免登入」設計。您的成績資料只會暫存在您的瀏覽器中進行本地端運算，關閉網頁即自動清除，絕不會上傳至我們的伺服器。' 
  },
  { 
    q: '如果我是跨區考生可以使用嗎？', 
    a: '可以的！您可以自由點選欲跨考的就學區入口進行分析。系統會依照該區專屬的計分規則（如基北區的 108 積分制、中投區的 111 點數制等）為您重新換算成績。' 
  },
];

const legalPages = {
  about: {
    title: '我們的理念',
    description: '我們相信升學資訊應該被整理、被看見，也應該讓每位學生與家長都能免費取得基礎的升學輔助工具。',
    updatedAt: '2026 年 7 月 12 日',
    sections: [
      {
        title: '我們的理念',
        body: [
          '我們相信升學資訊不應該只服務少數人，也不應該因為資料分散、規則複雜或查詢門檻高，而讓學生與家長在重要選擇前感到無助。',
          '因此，本服務的核心目標是免費提供大家可使用的升學輔助工具。不論是前段、中段、後段學校，或是高中、高職、五專等不同升學路徑，都應該有被整理、被看見、被比較的機會。',
        ],
      },
      {
        title: '降低計算錯誤',
        body: [
          '各就學區的比序、積分、加權與換算方式不完全相同，人工試算容易漏看規則或輸入錯誤。我們希望透過工具化整理，減少重複計算與判斷失誤。',
        ],
      },
      {
        title: '補足資訊落差',
        body: [
          '網路上常見資料多集中在前幾志願與明星學校，中後段學校、高中職與不同群科的錄取資訊相對不足。我們希望讓更多學校資料被納入參考。',
        ],
      },
      {
        title: '維持免費使用',
        body: [
          '升學規劃是許多家庭共同面對的問題。我們希望盡可能把基礎查詢與分析功能免費開放，降低取得資訊的成本。',
        ],
      },
    ],
  },
  privacy: {
    title: '隱私權政策',
    description: '本政策說明會考落點分析系統如何處理使用者資料、保護隱私，以及您可如何聯繫我們。',
    updatedAt: '2026 年 7 月 12 日',
    sections: [
      {
        title: '一、適用範圍',
        body: [
          '本隱私權政策適用於會考落點分析系統官方入口網站，以及本網站連結之各就學區落點分析服務。若您透過本網站前往第三方網站或外部公告頁面，該外部網站的資料處理方式不在本政策範圍內。',
        ],
      },
      {
        title: '二、我們可能蒐集的資料',
        body: [
          '本網站以提供升學資訊整理、就學區入口與落點分析連結為主要目的。一般瀏覽本網站時，我們不要求您建立帳號，也不主動要求您提供姓名、身分證字號、電話或地址等個人識別資料。',
          '若您主動寄信與我們聯繫，我們可能會取得您的電子郵件地址、信件內容，以及您自願提供的資訊，以便回覆問題或處理回饋。',
          '系統可能透過瀏覽器或代管服務記錄基本技術資訊，例如瀏覽器類型、裝置資訊、存取時間、來源頁面與錯誤紀錄，用於維護網站穩定與改善使用體驗。',
        ],
      },
      {
        title: '三、資料使用目的',
        body: [
          '我們使用資料的目的包含：提供網站功能、維護服務安全、改善頁面內容、排除技術問題、回覆使用者來信，以及依合理需求更新升學資訊與服務入口。',
          '我們不會將您的聯絡資訊出售、出租或交換給第三方作為行銷用途。',
        ],
      },
      {
        title: '四、Cookie 與本機儲存',
        body: [
          '本網站可能使用 Cookie、localStorage 或類似技術保存介面偏好、提升瀏覽體驗或進行匿名流量分析。您可透過瀏覽器設定封鎖或清除 Cookie，但部分偏好設定可能無法保留。',
        ],
      },
      {
        title: '五、第三方服務與外部連結',
        body: [
          '本網站可能連結至各就學區系統、官方簡章、超額比序規則彙整或其他外部資源。當您離開本網站後，外部網站可能依其政策蒐集與處理資料，請您自行參閱該網站的隱私權政策。',
        ],
      },
      {
        title: '六、資料安全',
        body: [
          '我們會採取合理技術與管理措施保護資料安全，避免未授權存取、竄改或洩漏。然而網際網路傳輸並非絕對安全，請避免透過網站或電子郵件提供不必要的敏感個資。',
        ],
      },
      {
        title: '七、兒少隱私',
        body: [
          '本網站服務對象可能包含國中學生與家長。若未成年使用者需要提供任何個人資訊，建議由家長或監護人陪同並確認提供內容是否必要。',
        ],
      },
      {
        title: '八、政策更新',
        body: [
          '我們可能因服務內容、法令或實務需求調整本政策。更新後的政策會公告於本頁，並以頁面所載更新日期為準。',
        ],
      },
      {
        title: '九、聯絡我們',
        body: [
          '若您對本政策、資料處理或網站內容有任何疑問，請來信 tyctw.analyze@gmail.com。',
        ],
      },
    ],
  },
  terms: {
    title: '使用條款',
    description: '使用本網站前，請先閱讀本條款。您使用本網站即表示您理解並同意以下規範。',
    updatedAt: '2026 年 7 月 12 日',
    sections: [
      {
        title: '一、服務內容',
        body: [
          '會考落點分析系統官方入口網站提供國中教育會考、免試入學、就學區入口、重要日程、常見問題與相關升學資訊整理。部分分析服務或外部資源可能由不同頁面或第三方網站提供。',
        ],
      },
      {
        title: '二、參考性質',
        body: [
          '本網站提供的落點分析、時程整理、超額比序資訊與志願選填建議，均僅供參考。實際招生名額、簡章規定、比序項目、錄取結果與報到作業，應以各主管機關、招生委員會、各就學區免試入學委員會及各校正式公告為準。',
          '使用者應自行確認最新公告與個人資格條件，不應將本網站資訊視為保證錄取、法律意見或唯一決策依據。',
        ],
      },
      {
        title: '三、使用者責任',
        body: [
          '您應以合法、合理方式使用本網站，不得干擾網站運作、嘗試未授權存取系統、散布惡意程式、冒用他人身分，或以任何方式侵害他人權益。',
          '若您輸入或提供任何資料，應確認資料正確且有權提供。因資料錯誤、逾期查詢、誤解公告或未自行查證所造成的決策風險，由使用者自行承擔。',
        ],
      },
      {
        title: '四、智慧財產權',
        body: [
          '本網站之版面設計、文字整理、程式碼、圖示配置與資料編排，除另有標示或依法屬公共資訊者外，均受相關智慧財產權法令保護。',
          '您可為個人升學參考合理瀏覽與分享本網站連結，但不得未經同意大量重製、改作、散布、出售或用於混淆來源的商業用途。',
        ],
      },
      {
        title: '五、外部連結',
        body: [
          '本網站可能提供外部連結，以協助使用者快速前往官方公告、規則彙整或各區系統。外部網站內容、可用性、正確性與資料處理方式，由該網站負責。',
        ],
      },
      {
        title: '六、服務變更與中止',
        body: [
          '我們可能依資訊更新、技術維護或其他需求，調整、暫停或終止本網站全部或部分功能。若資料或連結過期，我們會盡力更新，但不保證所有資訊即時、完整或無誤。',
        ],
      },
      {
        title: '七、免責聲明',
        body: [
          '在法律允許範圍內，本網站不對使用者因使用或無法使用本網站、依本網站資訊作成升學選擇、或存取外部網站所產生的直接或間接損失負責。',
        ],
      },
      {
        title: '八、條款更新',
        body: [
          '我們可能視服務內容、法令或實務需求修訂本條款。修訂後條款公告於本頁後生效，請您定期查看。',
        ],
      },
      {
        title: '九、聯絡方式',
        body: [
          '若您對本條款或網站內容有疑問，請來信 tyctw.analyze@gmail.com。',
        ],
      },
    ],
  },
};

const LegalPage = ({ page }: { page: typeof legalPages.privacy }) => (
  <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900">
    <a
      href="#legal-main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
    >
      跳到主內容
    </a>
    <header className="bg-white border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-zinc-900" aria-label="返回首頁">
          <div className="bg-zinc-900 p-1.5 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          會考落點分析
        </a>
        <a href="#" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
          返回首頁
        </a>
      </div>
    </header>

    <main id="legal-main-content" tabIndex={-1} className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-24 focus:outline-none">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-500 shadow-sm mb-6">
          更新日期：{page.updatedAt}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{page.title}</h1>
        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-3xl">{page.description}</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm divide-y divide-zinc-100">
        {page.sections.map((section) => (
          <section key={section.title} className="p-6 md:p-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-zinc-600 leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  </div>
);

const FAQItem = ({ faq, index }: { faq: any, index: number, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-zinc-200 rounded-2xl overflow-hidden bg-white mb-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-bold text-lg text-zinc-900 pr-8">{faq.q}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-50 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-zinc-100' : ''}`}>
          <ChevronDown className="w-5 h-5 text-zinc-500" aria-hidden="true" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-zinc-500 leading-relaxed border-t border-zinc-50 mt-2">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenuButtonRef = useRef<HTMLButtonElement>(null);
  const hasOpenedMenuRef = useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      setIsMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      if (hasOpenedMenuRef.current) {
        menuButtonRef.current?.focus();
      }
      document.body.style.overflow = '';
      return;
    }

    hasOpenedMenuRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeMenuButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openSection = (id: string) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  const trapMenuFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return;

    const focusableElements = event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) return;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  if (route === '#/privacy-policy') {
    return <LegalPage page={legalPages.privacy} />;
  }

  if (route === '#/terms-of-use') {
    return <LegalPage page={legalPages.terms} />;
  }

  if (route === '#/about') {
    return <LegalPage page={legalPages.about} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-zinc-200 selection:text-zinc-900 text-zinc-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        跳到主內容
      </a>
      {/* Navigation */}
      <header>
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-zinc-200/50"
          aria-label="主要導覽列"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                type="button"
                className="flex items-center gap-2.5 group cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                aria-label="回到網頁頂部"
              >
                <div className="bg-zinc-900 p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-lg tracking-tight">會考落點分析</span>
              </button>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                aria-label="開啟菜單"
                aria-expanded={isMenuOpen}
                aria-controls="site-menu-drawer"
              >
                <Menu className="w-4 h-4" aria-hidden="true" />
                菜單
              </button>
              <div className="hidden">
                <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="跳至系統特色區塊">系統特色</button>
                <button onClick={() => scrollToSection('timeline')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="跳至重要日程區塊">重要日程</button>
                <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="跳至常見問題區塊">常見問題</button>
                <a
                  href={officialRulesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                  aria-label="開啟超額比序規則彙整"
                >
                  超額比序規則彙整
                </a>
                <button 
                  onClick={() => scrollToSection('regions')}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95 shadow-lg shadow-zinc-900/20 hover:shadow-xl hover:shadow-zinc-900/30 hover:-translate-y-0.5"
                  aria-label="跳至選擇考區區塊"
                >
                  開始使用
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="關閉菜單"
                tabIndex={-1}
                className="fixed inset-0 z-[60] bg-zinc-950/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.aside
                id="site-menu-drawer"
                role="dialog"
                aria-modal="true"
                aria-labelledby="site-menu-title"
                onKeyDown={trapMenuFocus}
                className="fixed right-0 top-0 z-[70] h-dvh w-[min(92vw,380px)] bg-white shadow-2xl shadow-zinc-950/20 border-l border-zinc-200 flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              >
                <div className="h-16 px-6 flex items-center justify-between border-b border-zinc-100">
                  <h2 id="site-menu-title" className="flex items-center gap-2.5 font-bold tracking-tight">
                    <div className="bg-zinc-900 p-1.5 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    菜單
                  </h2>
                  <button
                    ref={closeMenuButtonRef}
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    aria-label="關閉菜單"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex-1 px-6 py-6 space-y-2" aria-label="右側菜單">
                  <a href="#/about" className="w-full flex items-center justify-between rounded-xl px-4 py-4 font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    我們的理念
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </a>
                  <button onClick={() => openSection('regions')} className="w-full flex items-center justify-between rounded-xl px-4 py-4 text-left font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    選擇考區
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </button>
                  <button onClick={() => openSection('features')} className="w-full flex items-center justify-between rounded-xl px-4 py-4 text-left font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    系統特色
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </button>
                  <button onClick={() => openSection('timeline')} className="w-full flex items-center justify-between rounded-xl px-4 py-4 text-left font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    重要日程
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </button>
                  <button onClick={() => openSection('faq')} className="w-full flex items-center justify-between rounded-xl px-4 py-4 text-left font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    常見問題
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </button>
                  <a href={officialRulesUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center justify-between rounded-xl px-4 py-4 font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    超額比序規則彙整
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </a>
                  <a href="#/privacy-policy" className="w-full flex items-center justify-between rounded-xl px-4 py-4 font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    隱私權政策
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </a>
                  <a href="#/terms-of-use" className="w-full flex items-center justify-between rounded-xl px-4 py-4 font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                    使用條款
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  </a>
                </nav>

                <div className="px-6 py-5 border-t border-zinc-100 text-sm text-zinc-500 leading-6">
                  本系統資訊僅供參考，實際招生規則以各區免試入學委員會公告為準。
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100 via-zinc-100/50 to-transparent blur-3xl rounded-full mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-zinc-600 text-xs font-semibold tracking-wider uppercase mb-8 border border-zinc-200 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span className="bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text text-transparent">116年國中教育會考</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[1.1] mb-8"
            >
              整理資訊，<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">陪你看見更多選擇。</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl leading-relaxed font-medium"
            >
              我們整理各就學區入口、超額比序規則與重要時程，提供免費的升學輔助工具，協助學生與家長降低試算錯誤、補足資訊落差。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href={officialRulesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20"
                aria-label="開啟超額比序規則彙整"
              >
                超額比序規則彙整
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button 
                onClick={() => scrollToSection('regions')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/20"
              >
                選擇就學區
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 px-8 py-4 rounded-full text-base font-semibold transition-all border border-zinc-200 shadow-sm hover:shadow-md"
              >
                了解系統特色
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-4">
            {philosophyStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center px-4 relative group"
              >
                {/* Desktop Divider */}
                {index !== 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-zinc-800"></div>
                )}
                <div className="mb-5 p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 shadow-xl group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">{stat.value}</div>
                <div className="text-sm font-medium text-zinc-500 tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section id="regions" className="pt-24 pb-32 bg-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-20 md:flex md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-zinc-900">選擇考區</h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-2xl">點擊進入各區專屬系統，開始進行落點分析。我們為每個就學區量身打造了專屬的演算法。</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="hidden md:flex items-center gap-2 text-sm font-bold text-zinc-600 bg-white px-5 py-3 rounded-full border border-zinc-200 shadow-sm"
            >
              <Map className="w-5 h-5 text-indigo-500" />
              涵蓋全台十二大就學區
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => {
              const isComingSoon = region.badge === '待上線';
              
              return (
                <motion.a
                  href={isComingSoon ? undefined : region.url}
                  target={isComingSoon ? undefined : "_blank"}
                  rel={isComingSoon ? undefined : "noopener noreferrer"}
                  onClick={(e) => { if(isComingSoon) e.preventDefault(); }}
                  key={region.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className={`group relative h-[280px] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden bg-white border border-zinc-200 transition-all duration-500 ${isComingSoon ? 'cursor-default' : 'hover:-translate-y-2 hover:border-zinc-300'} shadow-sm ${region.glow || ''}`}
                >
                  {/* Hover Gradient Orb */}
                  {!isComingSoon && (
                    <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${region.gradient} opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-700`}></div>
                  )}
                  
                  {/* Top Section */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      {region.badge && (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 border ${isComingSoon ? 'bg-zinc-100 text-zinc-500 border-zinc-200' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                          {region.badge}
                        </span>
                      )}
                      <h3 className={`text-3xl font-black text-zinc-900 tracking-tight mb-2 ${isComingSoon ? '' : 'group-hover:text-indigo-950'} transition-colors duration-300`}>
                        {region.name}
                      </h3>
                      <p className="text-zinc-500 font-medium">{region.desc}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 shadow-sm ${isComingSoon ? 'bg-zinc-50 border-zinc-200 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white group-hover:scale-110 group-hover:-rotate-12'}`}>
                      {isComingSoon ? <Clock className="w-5 h-5" /> : <ArrowUpRight className="w-6 h-6" />}
                    </div>
                  </div>
                  
                  {/* Bottom Section / Abstract Decoration */}
                  <div className="relative z-10 flex items-end justify-between mt-auto">
                    <div className={`font-black text-6xl tracking-tighter transition-colors duration-500 ${isComingSoon ? 'text-zinc-100' : 'text-zinc-100 group-hover:text-zinc-200'}`}>
                      {region.id.substring(0, 3).toUpperCase()}
                    </div>
                    {!isComingSoon && (
                      <div className="flex gap-1.5 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-400 transition-colors duration-300 delay-100"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-400 transition-colors duration-300 delay-200"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-400 transition-colors duration-300 delay-300"></div>
                      </div>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 bg-zinc-50 border-t border-zinc-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-zinc-200 shadow-sm mb-6"
            >
              <Calendar className="w-7 h-7 text-zinc-900" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tight mb-6"
            >
              116年會考重要日程
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto"
            >
              掌握關鍵時間點，提早做好升學準備。我們為您整理了從報名到放榜的完整時程。
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {timeline.map((item, index) => {
              const isLast = index === timeline.length - 1;
              const isPast = item.status === 'past';
              const isActive = item.status === 'active';
              const isFuture = item.status === 'future';

              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-6 md:gap-10"
                >
                  {/* Icon & Line Column */}
                  <div className="relative flex flex-col items-center">
                    {/* Icon Box */}
                    <div className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-110' 
                        : isPast 
                          ? 'bg-zinc-900 text-white shadow-md' 
                          : 'bg-white text-zinc-400 border-2 border-zinc-200'
                    }`}>
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400 animate-ping opacity-20"></div>
                      )}
                      {item.icon}
                    </div>
                    
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="w-1 flex-1 bg-zinc-200 my-2 rounded-full relative overflow-hidden">
                        {(isPast || isActive) && (
                          <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className={`absolute top-0 left-0 w-full ${isActive ? 'bg-gradient-to-b from-indigo-600 to-zinc-200' : 'bg-zinc-900'}`}
                          ></motion.div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 pb-12 md:pb-16 ${isLast ? 'pb-0' : ''}`}>
                    <div className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-300 ${
                      isActive 
                        ? 'bg-white border-indigo-200 shadow-2xl shadow-indigo-900/5 hover:-translate-y-1' 
                        : isPast
                          ? 'bg-white/60 border-zinc-200 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1'
                          : 'bg-zinc-50/50 border-zinc-100 opacity-80 hover:opacity-100 transition-opacity'
                    }`}>
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                        <h3 className={`text-2xl font-bold ${isActive ? 'text-indigo-950' : isPast ? 'text-zinc-900' : 'text-zinc-500'}`}>
                          {item.title}
                        </h3>
                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold w-fit ${
                          isActive 
                            ? 'bg-indigo-100 text-indigo-700' 
                            : isPast
                              ? 'bg-zinc-100 text-zinc-700'
                              : 'bg-zinc-100 text-zinc-400'
                        }`}>
                          {item.date}
                        </div>
                      </div>
                      <p className={`leading-relaxed text-lg ${isActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white border-t border-zinc-100 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.2]"
              >
                為什麼要做這個工具<br />
                <span className="text-zinc-400">從整理資訊開始</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-zinc-500 mb-12 leading-relaxed"
              >
                升學資訊不應只服務少數人，也不應因為資料分散或規則複雜，讓學生與家長在重要選擇前感到無助。
              </motion.p>
              
              <div className="space-y-10">
                {philosophyFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-5 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-900">{feature.title}</h3>
                      <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:ml-auto w-full max-w-md"
            >
              {/* Decorative background cards */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-100 rounded-[40px] transform rotate-6 scale-105 opacity-50 transition-transform duration-500 hover:rotate-12"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-white rounded-[40px] transform -rotate-3 scale-105 opacity-80 transition-transform duration-500 hover:-rotate-6"></div>
              
              {/* Main Mock UI Card -> Admission Channels Table */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-white shadow-2xl shadow-zinc-200/50 overflow-hidden">
                <div className="space-y-6 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                    <div>
                      <div className="text-sm font-bold text-indigo-600 mb-1">116學年度</div>
                      <div className="text-2xl font-black text-zinc-900 tracking-tight">免試入學管道時程</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 flex-shrink-0">
                      <Calendar className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  
                  {/* Table Content */}
                  <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                    <table className="w-full text-left border-collapse min-w-[400px]">
                      <thead>
                        <tr className="border-b-2 border-zinc-100">
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">入學管道</th>
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">報名/選填</th>
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">放榜</th>
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">報到</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50">
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">學習區完全免試</div>
                            <div className="text-xs text-zinc-400">(完免)</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/05~05/06</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/14</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/12</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">優先免試入學</div>
                            <div className="text-xs text-zinc-400">(優免)</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/18</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/15</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/15</td>
                        </tr>
                        <tr className="group hover:bg-indigo-50/30 transition-colors bg-indigo-50/10">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-indigo-700 text-sm">就學區免試入學</div>
                            <div className="text-xs text-indigo-400">(大免)</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-indigo-600 font-bold">06/18~06/25</td>
                          <td className="py-3 px-2 text-sm text-indigo-600 font-bold">07/07</td>
                          <td className="py-3 pl-2 text-sm text-indigo-600 font-bold">07/09</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">技優甄審入學</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/21~05/22</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/11</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/12</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">實用技能學程</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/21~05/22</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/11</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/12</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">各校直升入學</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/28~06/05</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/11</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Note */}
                  <div className="pt-2 border-t border-zinc-100">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      * 註：直升入學放榜與報到日期為截止日。<br/>
                      * 實際時程請依各區免試入學委員會最新公告簡章為準。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-sm mb-6"
            >
              <HelpCircle className="w-6 h-6 text-zinc-900" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              常見問題
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-lg"
            >
              針對家長與考生最常詢問的問題，我們整理了以下解答。
            </motion.p>
          </div>

          <div className="space-y-4">
            {philosophyFaqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-zinc-900" />
                <span className="font-bold text-xl tracking-tight">會考落點分析</span>
              </div>
              <a href="mailto:tyctw.analyze@gmail.com" className="text-sm text-zinc-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                tyctw.analyze@gmail.com
              </a>
            </div>
            <div className="flex gap-8 text-sm font-medium text-zinc-500">
              <a href="#/about" className="hover:text-zinc-900 transition-colors">我們的理念</a>
              <a href={officialRulesUrl} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">超額比序規則彙整</a>
              <a href="#/privacy-policy" className="hover:text-zinc-900 transition-colors">隱私權政策</a>
              <a href="#/terms-of-use" className="hover:text-zinc-900 transition-colors">使用條款</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
            <p>&copy; {new Date().getFullYear()} 會考落點分析系統. All rights reserved.</p>
            <p>本系統僅供參考，實際錄取結果以各區免試入學委員會公告為準。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

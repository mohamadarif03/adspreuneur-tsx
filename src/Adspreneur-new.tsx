import { useState, useEffect, Fragment } from 'react';

interface ProjectProps {
  waNumber?: string;
  fbPersonal?: string;
}

interface City { date: string; city: string; venue: string; status: string; hot: boolean }

const IC = (n: string): string => `url(https://unpkg.com/lucide-static@0.460.0/icons/${n}.svg) center/contain no-repeat`;
const FIT_YES = ['Ingin meningkatkan omzet lewat iklan berbayar Facebook, Instagram, Google & TikTok', 'Ingin menguasai Facebook & Instagram Ads, Google Ads, TikTok Ads + Website tanpa biaya puluhan juta', 'Baru memulai usaha dan butuh panduan pemasaran serta branding yang tepat', 'Punya bisnis jasa, produk fisik, produk digital, atau B2B yang belum optimal di digital', 'Sudah pernah belajar ads, tapi ingin update strategi terbaru yang lebih profitable', 'Punya toko di Shopee, Tokopedia, atau TikTok Shop dan ingin traffic dari Facebook & Instagram Ads', 'Ingin pakai AI + ChatGPT untuk bikin iklan, konten, dan optimasi lebih cepat', 'Pensiunan atau pra-pensiun yang ingin mempersiapkan dan memulai usaha'];
const FIT_NO = ['Tidak mau meningkatkan omzet dengan iklan', 'Menunggu keajaiban tanpa mau praktek', 'Masih percaya “posting organik aja cukup”', 'Belum siap mengubah cara jualan dari offline ke online', 'Alergi AI dan masih mau mengerjakan ads manual semua', 'Belum siap keluar budget iklan minimal 18rb–50rb/hari', 'Mencari mentor yang menjanjikan “auto cuan tanpa proses”'];
const PROBLEMS = [['Budget iklan cepat habis', 'Saldo terkuras dalam hitungan hari, tapi hasilnya nggak sebanding.'], ['Sudah jalan iklan, tapi chat minim', 'Iklan dilihat banyak orang, tapi yang chat bisa dihitung jari.'], ['Tidak bisa baca data iklan', 'Bingung angka di Ads Manager, jadi nggak tahu iklan mana yang harus dimatikan.'], ['Masih pakai boost post', 'Pilihan target dan tujuan iklan jadi sangat terbatas.']];
const SOLUTION = [['calendar-days', 'Kelas offline 2 hari', 'Tatap muka penuh, 08.00–17.00 waktu setempat.'], ['mouse-pointer-click', '90% praktek', 'Teori secukupnya, sisanya langsung dikerjakan.'], ['user-check', 'Dibimbing langsung', 'Mentor mendampingi satu per satu di kelas.'], ['briefcase', 'Pakai bisnismu sendiri', 'Praktek di produk/jasa dan akunmu sendiri, bukan dummy.']];
const BAGIAN = [
  { title: 'Fondasi & Setup Akun Meta Ads', points: [['🧱', 'Fundamental Meta Ads'], ['🏆', 'Penguasaan pembuatan Business Manager, Fanpage, Ad Account & Pixel'], ['⚙️', 'Step by step optimasi akun media sosial hingga siap dipakai ngiklan'], ['📈', 'Optimasi akun FB & IG untuk visibilitas, brand awareness, engagement, traffic & leads'], ['⭐', 'Pentingnya personal branding, brand awareness & positioning']] },
  { title: 'Praktek Iklan Meta, Google & TikTok', points: [['🚀', 'Strategi ngiklan yang profitable, sudah terbukti & teruji'], ['🎯', 'Iklan berbayar di Facebook & Instagram pakai Ads Manager, bukan cuma boost post'], ['📊', 'Cara baca data iklan agar bisa memanage risiko boncos'], ['💰', 'Jualan skincare, fashion, makanan di Meta dengan sistem COD seperti marketplace'], ['🛒', 'Cara mengiklankan produk Shopee, Tokopedia & TikTok di Meta Ads']] },
  { title: 'Website dari Nol', points: [['🌐', 'Praktek pembuatan website', 'Bikin website sendiri dengan biaya lebih murah'], ['🎯', 'Praktek beli domain + hosting', 'Langsung pakai akun sendiri, bukan dummy'], ['🔧', 'Praktek install website 1 klik', 'Tanpa coding, tinggal klik jadi'], ['📱', 'Praktek setting tampilan HP', 'Biar 90% klien yang buka dari HP enak bacanya'], ['📝', 'Praktek nulis headline yang mendatangkan chat & orderan', 'Pakai template, tinggal ganti nama bisnis'], ['✨', 'Praktek pasang testimoni WA asli', 'Screenshot chat klien jadi bukti, bukan testimoni karangan'], ['👆', 'Praktek pasang tombol WA & booking auto-chat', 'Klik langsung ke WA CS dengan format chat sudah jadi'], ['📸', 'Praktek pasang foto/video jasa & produk', 'Yang bikin orang percaya, bukan cuma bagus'], ['⚡', 'Praktek cek kecepatan & test live', 'Langsung dites di HP']] },
  { title: 'Google Ads', points: [['🔍', 'Praktek iklan berbayar di Google Ads', 'Biar usahamu muncul paling atas di pencarian Google'], ['🎯', 'Riset kata kunci duit', 'Cari kata kunci yang diketik orang saat BUTUH, mis. “jasa renovasi Jakarta”'], ['📝', 'Bikin iklan yang nongol di Google No.1', 'Nulis 15 judul + 4 deskripsi yang bikin orang nge-klik'], ['💸', 'Setting iklan Search (paling penting)', 'Iklan muncul saat orang mengetik, mendatangkan hot buyer'], ['🚫', 'Setting kata kunci negatif', 'Biar budget nggak boncos']] },
  { title: 'TikTok Ads Jasa & Affiliate', points: [['🎵', 'Praktek iklan TikTok Ads via HP untuk bisnis jasa & affiliate'], ['🤝', 'Trik jadi affiliator TikTok yang simpel via HP']] },
  { title: 'Konten Iklan', points: [['🎨', 'Konten gambar, poster & flyer yang menjual pakai AI atau Canva Pro', 'Tanpa harus jago desain'], ['🎬', 'Konten video iklan sederhana yang menarik & menjual'], ['🕵️', 'Riset iklan kompetitor dengan metode ATM', 'Amati, Tiru, Modifikasi']] },
  { title: 'Closing & Operasional', points: [['💬', 'Persiapan CS, teknik closing sederhana & format chat yang terbukti'], ['📦', 'Mengatur pesanan dengan pembayaran cash & sistem COD'], ['⚡', 'Di hari ke-2, bahkan hari ke-1, biasanya chat sudah mulai masuk'], ['🥇', 'Bimbingan 1-on-1 sampai ada yang “pecah telur” saat kelas berlangsung']] },
  { title: 'Analisis & Optimasi Iklan', points: [['📈', 'Baca data iklan']] }
];
const COMPARE = [['Boost post', 'Iklan lewat Ads Manager'], ['Teori berjam-jam', '90% praktek'], ['Nonton dari kursi belakang', 'Dibimbing 1-on-1'], ['Coba-coba sendiri', 'Strategi yang sudah teruji'], ['Iklan asal jalan', 'Baca data sebelum tambah budget'], ['Kelas selesai, ditinggal', 'Grup support & Zoom berkala']];
const BENEFITS = [['megaphone', 'Bikin campaign sendiri', 'Dari setup akun sampai iklan tayang.'], ['chart-column', 'Membaca data iklan', 'Tahu iklan mana yang bagus dan yang boncos.'], ['wallet', 'Menentukan budget', 'Atur budget harian sesuai target.'], ['sliders-horizontal', 'Mengoptimalkan iklan', 'Perbaiki iklan yang belum perform.'], ['trending-up', 'Scale up iklan', 'Naikkan budget di iklan yang terbukti jalan.'], ['message-circle', 'Arahkan pembeli ke WA/website', 'Calon pelanggan langsung chat atau order.']];
const INCLUDED = [['book-open', 'Modul', 'Akses materi untuk diulang di rumah.'], ['message-circle', 'Grup WhatsApp', 'Support premium bersama seluruh coach.'], ['send', 'Grup Telegram', 'Komunitas alumni pengusaha se-Indonesia.'], ['video', 'Bimbingan berkala via Zoom', 'Tanya jawab & review rutin.'], ['award', 'E-Certificate', 'Sertifikat resmi kelulusan kelas.']];
const BONUS = [['file-json', 'Template JSON', 'Siap pakai untuk praktek.'], ['messages-square', 'Template teknik closing', 'Format chat yang terbukti closing.'], ['refresh-cw', 'Update materi', 'Modul diperbarui gratis.'], ['repeat', 'Ikut kelas ulang', 'Gratis biaya pelatihan, cukup bayar seat.']];
const FACILITIES = [['armchair', 'Tempat nyaman & kondusif'], ['wifi', 'Free WiFi'], ['moon-star', 'Musholla'], ['coffee', 'Coffee break'], ['utensils', 'Lunch break'], ['users', 'Networking dengan pengusaha lain']];
const VALUE = [['Facebook Ads & Instagram Ads', 'Rp 3.000.000'], ['Google Ads', 'Rp 2.000.000'], ['TikTok Ads', 'Rp 1.000.000'], ['Pembuatan website dari nol', 'Rp 2.000.000']];
const PRICE_INCL = ['Kelas offline 2 hari', 'Bimbingan praktik 1-on-1 di kelas', 'Facebook Ads & Instagram Ads', 'Google Ads', 'TikTok Ads', 'Website'];
const VIDEOS = [{ id: 'RXypi66YOFQ', label: 'Peserta 1' }, { id: 'FFXKfSGer6s', label: 'Peserta 2' }, { id: '496GF4lND3A', label: 'Peserta 3' }];
const SHORT = { id: '5MBPNMFgUiY', label: 'Peserta 4' };
const FAQS = [
  { q: 'Apakah harus punya bisnis?', a: 'Tidak harus. Kamu bisa praktek dengan ide usaha yang mau dimulai atau lewat jalur affiliate TikTok yang juga diajarkan di kelas.' },
  { q: 'Apakah harus membawa laptop?', a: '[ISI: wajib laptop atau cukup HP, plus perlengkapan lain yang perlu dibawa.]', todo: true },
  { q: 'Apakah iklan menggunakan akun sendiri?', a: 'Ya. Semua praktek pakai akun dan bisnismu sendiri, bukan akun dummy, jadi hasilnya langsung bisa kamu pakai.' },
  { q: 'Saya belum pernah ngiklan sama sekali. Bisa ikut?', a: 'Bisa. Materi mulai dari nol: bikin Business Manager, Fanpage, Ad Account & Pixel, dipraktekkan bareng di kelas.' },
  { q: 'Perlu siapkan budget iklan untuk praktek?', a: 'Siapkan budget iklan minimal sekitar 18rb–50rb per hari untuk praktek.' },
  { q: 'Kalau setelah kelas masih bingung, bagaimana?', a: 'Ada grup WhatsApp support bersama coach, grup Telegram alumni, Zoom berkala, dan modul video untuk diulang.' },
  { q: 'Boleh ikut kelas ulang?', a: 'Boleh, gratis biaya pelatihan. Cukup bayar seat hotel yang sudah termasuk makan dan minum.' },
  { q: 'Kelas ini cocok untuk bisnis apa saja?', a: 'Bisnis jasa, produk fisik, produk digital, B2B, sampai seller Shopee, Tokopedia & TikTok Shop.' }
];

const CITY_LIST: City[] = [{"date":"7–8 Okt 2026","city":"Pamekasan – Madura #1","venue":"Odaita Hotel","status":"Terdekat","hot":true},{"date":"21–22 Okt 2026","city":"Pangkal Pinang #1","venue":"PIA Hotel","status":"Kursi tersedia","hot":false},{"date":"24–25 Okt 2026","city":"Palembang #4","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"27–28 Okt 2026","city":"Lampung #4","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"31 Okt – 1 Nov 2026","city":"Bandung #4","venue":"Hotel Grand Asrilia","status":"Kursi tersedia","hot":false},{"date":"4–5 Nov 2026","city":"Magelang #1","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"7–8 Nov 2026","city":"Jember #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"11–12 Nov 2026","city":"Denpasar – Bali #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"14–15 Nov 2026","city":"Lombok – Mataram #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"17–18 Nov 2026","city":"Makassar #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"21–22 Nov 2026","city":"Kendari #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"25–26 Nov 2026","city":"Manado #1","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"28–29 Nov 2026","city":"Gorontalo #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"2–3 Des 2026","city":"Palu #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"9–10 Des 2026","city":"Balikpapan #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"12–13 Des 2026","city":"Samarinda #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"16–17 Des 2026","city":"Banjarmasin #2","venue":"Hotel","status":"Kursi tersedia","hot":false},{"date":"23–24 Des 2026","city":"Pontianak #2","venue":"Hotel","status":"Kursi tersedia","hot":false}];

const KEYFRAMES_AND_RESET = `html{scroll-behavior:smooth;scroll-padding-top:66px;overflow-x:hidden;overflow-x:clip}
body{overflow-x:hidden;overflow-x:clip;max-width:100%}
body{margin:0;background:#0B1530;color:#0E1A33;font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
*{box-sizing:border-box}
a{color:#DE7814;text-decoration:none}a:hover{color:#EC8A26}
button{font-family:inherit}
@keyframes adsMarq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes adsFade{0%{opacity:0}6%{opacity:1}33%{opacity:1}39%{opacity:0}100%{opacity:0}}
@keyframes adsFade2{0%{opacity:0}8%{opacity:1}50%{opacity:1}58%{opacity:0}100%{opacity:0}}
@keyframes adsBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes adsDrift{from{transform:translateY(0)}to{transform:translateY(-22%)}}`;

const SHOT_KEYS: [string, string, string][] = [['testi-wa-1', 'Omzet naik 180%', 'Klinik kecantikan · Palu'], ['testi-dashboard', 'Rp 73,5 jt dari spend Rp 1,6 jt', 'Jasa khitan · data iklan 6 hari'], ['testi-wa-3', 'Dapat project 6 titik', 'Jasa konstruksi · Google Ads'], ['testi-wa-5', 'Pecah telor Rp 7,4 jt', 'Meta Ads · Lampung'], ['testi-wa-4', 'Kewalahan terima orderan', 'Sehari setelah kelas'], ['testi-wa-2', '40an mahasiswa online', 'Kampus online · Lampung']];
const SHOT_SRCS: string[] = SHOT_KEYS.map(([k]) => '/assets/' + k + '.webp');

export default function Project(props: ProjectProps) {
  const [openBag, setOpenBag] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const [lb, setLb] = useState<string | null>(null);

  const num = (v?: string): string => String(v ?? '62XXXXXXXXXX').replace(/\D/g, '') || '62';
  const waLink = `https://wa.me/${num(props.waNumber)}?text=${encodeURIComponent('Halo admin Adspreneur, saya mau tanya kelas.')}`;

  useEffect(() => {
    if (!lb) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const i = SHOT_SRCS.indexOf(lb);
        const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + SHOT_SRCS.length) % SHOT_SRCS.length;
        setLb(SHOT_SRCS[n]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb]);

  const vid = (v: { id: string; label: string }, area: 'a' | 'b' | 'c' | 'd', tag: string) => {
    const isPlaying = playing === v.id;
    const big = area === 'a' || area === 'd';
    const arCls = area === 'a' ? '[aspect-ratio:auto] max-[719px]:[aspect-ratio:16/9]' : area === 'd' ? '[aspect-ratio:auto]' : '[aspect-ratio:16/9]';
    return { ...v, area, tag, playing: isPlaying, idle: !isPlaying, arCls, playSize: big ? '68px' : '52px', thumbBg: `url(https://i.ytimg.com/vi_webp/${v.id}/hqdefault.webp)`, embed: `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`, play: () => setPlaying(v.id) };
  };

  const heroStats = [['1850', 'Alumni'], ['45', 'Kota'], ['80', 'Batch'], ['24', 'Provinsi']].map(([n, l], i) => ({ n, l, border: i ? '1px solid rgba(255,255,255,.12)' : '0' }));
  const fitYes = FIT_YES.map((x, i) => ({ t: x, mask: IC(['trending-up', 'graduation-cap', 'rocket', 'briefcase', 'refresh-cw', 'shopping-bag', 'sparkles', 'sunrise'][i] || 'check') }));
  const fitNo = FIT_NO.map((x, i) => ({ t: x, mask: IC(['ban', 'hourglass', 'thumbs-down', 'store', 'bot', 'wallet', 'wand-sparkles'][i] || 'x') }));
  const problems = PROBLEMS.map(([t, d], i) => ({ t, d, n: String(i + 1).padStart(2, '0') }));
  const solution = SOLUTION.map(([ic, t, d]) => ({ mask: IC(ic), t, d }));
  const days = [{ label: 'Hari 1', title: 'Meta Ads, Website & Google Ads', idx: [0, 1, 2, 3] }, { label: 'Hari 2', title: 'TikTok Ads, Konten, Closing & Optimasi', idx: [4, 5, 6, 7] }].map(d => ({ label: d.label, title: d.title, count: d.idx.length, mods: d.idx.map(bi => { const b = BAGIAN[bi]; const open = openBag === bi; return { title: b.title, n: bi + 1, num: String(bi + 1).padStart(2, '0'), count: b.points.length, open, sign: open ? '−' : '+', signBg: open ? '#C2650F' : '#F1EEE7', signColor: open ? '#0B1530' : '#0E1A33', numColor: open ? '#C2650F' : 'rgba(14,26,51,.18)', border: open ? 'rgba(194,101,15,.55)' : 'rgba(14,26,51,.08)', points: b.points.map(([ic, tt, dd]) => ({ ic, t: tt, d: dd || '' })), toggle: () => setOpenBag(open ? null : bi) }; }) }));
  const compare = COMPARE.map(([o, n]) => ({ old: o, neu: n }));
  const benefits = BENEFITS.map(([ic, t, d]) => ({ mask: IC(ic), t, d }));
  const videos = VIDEOS.map((v, i) => vid(v, (['a', 'b', 'c'] as const)[i], 'Video'));
  const short = vid(SHORT, 'd', 'Shorts');
  const shots = SHOT_KEYS.map(([k, cap, src2]) => ({ src: '/assets/' + k + '.webp', cap, src2, open: () => setLb('/assets/' + k + '.webp') }));
  const lbOpen = !!lb;
  const lbClose = (): void => setLb(null);
  const included = INCLUDED.map(([ic, t, d], i) => ({ mask: IC(ic), t, d, num: String(i + 1).padStart(2, '0') }));
  const bonus = BONUS.map(([ic, t, d]) => ({ mask: IC(ic), t, d }));
  const facilities = FACILITIES.map(([ic, t]) => ({ mask: IC(ic), t }));
  const valueStack = VALUE.map(([t, pr]) => ({ t, p: pr }));
  const priceIncl = PRICE_INCL;
  const cities = CITY_LIST.map((c, i) => ({ ...c, stop: String(i + 1).padStart(2, '0'), href: `https://wa.me/${num(props.waNumber)}?text=${encodeURIComponent(`Halo admin Adspreneur ${c.city}, saya mau daftar kelas tanggal ${c.date}.`)}`, border: c.hot ? 'rgba(194,101,15,.6)' : 'rgba(255,255,255,.12)', pillBg: c.hot ? '#C2650F' : 'rgba(255,255,255,.1)', pillColor: c.hot ? '#0B1530' : '#FFFFFF' }));
  const faqs = FAQS.map((f, i) => { const open = openFaq === i; return { ...f, todo: !!f.todo, done: !f.todo, open, sign: open ? '−' : '+', signBg: open ? '#0B1530' : '#F1EEE7', signColor: open ? '#FFFFFF' : '#0E1A33', toggle: () => setOpenFaq(open ? null : i) }; });
  const socials = [
    { label: '@satriapapakha', href: 'https://www.instagram.com/satriapapakha', icon: 'https://cdn.simpleicons.org/instagram/white' },
    { label: '@adspreneur.id', href: 'https://www.instagram.com/adspreneur.id/', icon: 'https://cdn.simpleicons.org/instagram/white' },
    { label: '@satriadspreneur', href: 'https://www.tiktok.com/@satriadspreneur', icon: 'https://cdn.simpleicons.org/tiktok/white' },
    { label: 'Facebook', href: props.fbPersonal ?? 'https://web.facebook.com/eka.satria.925', icon: 'https://cdn.simpleicons.org/facebook/white' }
  ].map(so => ({ ...so, bg: `url(${so.icon})` }));

  const heroBg = (
    <div className={"[position:absolute] [inset:0px]"}>
      <div className={"[position:absolute] [inset:0px] [opacity:0] [animation:adsFade2_8s_ease-in-out_0s_infinite_both]"}>
        <img className={"[width:100%] [height:100%] [object-fit:cover] [display:block] [opacity:0.55] [filter:saturate(.85)] [transform:scale(1.05)]"} src="/assets/hero-bg-1.webp" alt="" />
      </div>
      <div className={"[position:absolute] [inset:0px] [opacity:0] [animation:adsFade2_8s_ease-in-out_4s_infinite_both]"}>
        <img className={"[width:100%] [height:100%] [object-fit:cover] [display:block] [opacity:0.55] [filter:saturate(.85)] [transform:scale(1.05)]"} src="/assets/hero-bg-2.webp" alt="" />
      </div>
    </div>
  );
  const marquee = (
    <div className={"[display:flex] [width:max-content] [animation:adsMarq_45s_linear_infinite]"}>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        1850 alumni
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        45 kota
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        80 batch
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        24 provinsi
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        2 hari full praktek
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        Dibimbing 1-on-1
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        1850 alumni
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        45 kota
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        80 batch
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        24 provinsi
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        2 hari full praktek
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        Dibimbing 1-on-1
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        1850 alumni
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        45 kota
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        80 batch
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        24 provinsi
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        2 hari full praktek
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        Dibimbing 1-on-1
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        1850 alumni
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        45 kota
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        80 batch
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        24 provinsi
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        2 hari full praktek
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
      <span className={"[display:inline-flex] [align-items:center] [gap:22px] [padding-right:22px] [white-space:nowrap]"}>
        Dibimbing 1-on-1
        <span className={"[width:6px] [height:6px] [background:#0B1530] [transform:rotate(45deg)] [display:inline-block]"}></span>
      </span>
    </div>
  );
  const mosaic = (
    <div className={"[position:absolute] [left:-18%] [top:-30%] [width:130%] [height:170%] [display:flex] [gap:14px] [transform:rotate(-12deg)] [opacity:0.22] [filter:grayscale(.6)_blur(1px)]"}>
      <div className={"[flex:1_1_0] [display:flex] [flex-direction:column] [gap:14px] [animation:adsDrift_22s_ease-in-out_0s_infinite_alternate] [margin-top:0px]"}>
        <div className={"[position:relative] [aspect-ratio:4/3] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:left_center] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-1.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/5] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:right_center] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-2.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/3] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:30%_60%] [display:block] [transform:scale(1.35)] [pointer-events:none]"} src="/assets/hero-bg-1.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/5] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:70%_40%] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-2.webp" alt="" draggable={false} />
        </div>
      </div>
      <div className={"[flex:1_1_0] [display:flex] [flex-direction:column] [gap:14px] [animation:adsDrift_27s_ease-in-out_-4s_infinite_alternate] [margin-top:-120px]"}>
        <div className={"[position:relative] [aspect-ratio:4/3] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:center_70%] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-1.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/5] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:center] [display:block] [transform:scale(1.35)] [pointer-events:none]"} src="/assets/hero-bg-2.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/3] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:left_center] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-1.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/5] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:right_center] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-2.webp" alt="" draggable={false} />
        </div>
      </div>
      <div className={"[flex:1_1_0] [display:flex] [flex-direction:column] [gap:14px] [animation:adsDrift_32s_ease-in-out_-8s_infinite_alternate] [margin-top:-40px]"}>
        <div className={"[position:relative] [aspect-ratio:4/3] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:30%_60%] [display:block] [transform:scale(1.35)] [pointer-events:none]"} src="/assets/hero-bg-1.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/5] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:70%_40%] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-2.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/3] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:center_70%] [display:block] [transform:scale(1.1)] [pointer-events:none]"} src="/assets/hero-bg-1.webp" alt="" draggable={false} />
        </div>
        <div className={"[position:relative] [aspect-ratio:4/5] [border-radius:14px] [overflow:hidden] [background:#16244A] [border:1px_solid_rgba(255,255,255,.08)]"}>
          <img className={"[position:absolute] [inset:0px] [width:100%] [height:100%] [object-fit:cover] [object-position:center] [display:block] [transform:scale(1.35)] [pointer-events:none]"} src="/assets/hero-bg-2.webp" alt="" draggable={false} />
        </div>
      </div>
    </div>
  );
  const chipsLeft = (
    <>
      <div className={"[display:flex] [flex-direction:column] [justify-content:center] [align-items:flex-end] [gap:clamp(12px,2.2vh,20px)] [pointer-events:auto] [align-self:flex-start] [padding-top:clamp(28px,5vh,56px)] max-[979px]:hidden!"}>
      <div className={"[animation:adsBob_4.6s_ease-in-out_0s_infinite]"}>
        <div className={"[width:clamp(176px,15vw,206px)] [display:grid] [grid-template-columns:30px_minmax(0,1fr)] [align-items:center] [gap:10px] [padding:8px_12px_8px_8px] [border-radius:14px] [background:linear-gradient(160deg,rgba(24,38,78,.88),rgba(11,21,48,.88))] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.14)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_16px_36px_-14px_rgba(0,0,0,.7)] [transform:rotate(3deg)]"}>
          <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center] [box-shadow:inset_0_1px_0_rgba(255,255,255,.25)]"}>
            <span className={"[width:15px] [height:15px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/megaphone.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/megaphone.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[display:flex] [flex-direction:column] [gap:1px] [min-width:0px]"}>
            <span className={"[font-weight:800] [font-size:12.5px] [color:#FFFFFF] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              FB & IG Ads
            </span>
            <span className={"[font-size:11px] [font-weight:600] [color:#DC9550] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              bukan boost post
            </span>
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_5.1s_ease-in-out_-1.2s_infinite]"}>
        <div className={"[width:clamp(176px,15vw,206px)] [display:grid] [grid-template-columns:30px_minmax(0,1fr)] [align-items:center] [gap:10px] [padding:8px_12px_8px_8px] [border-radius:14px] [background:linear-gradient(160deg,rgba(24,38,78,.88),rgba(11,21,48,.88))] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.14)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_16px_36px_-14px_rgba(0,0,0,.7)] [transform:rotate(3deg)]"}>
          <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center] [box-shadow:inset_0_1px_0_rgba(255,255,255,.25)]"}>
            <span className={"[width:15px] [height:15px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/music-2.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/music-2.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[display:flex] [flex-direction:column] [gap:1px] [min-width:0px]"}>
            <span className={"[font-weight:800] [font-size:12.5px] [color:#FFFFFF] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              TikTok Ads
            </span>
            <span className={"[font-size:11px] [font-weight:600] [color:#DC9550] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              cukup via HP
            </span>
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_5.6s_ease-in-out_-2.4s_infinite]"}>
        <div className={"[width:clamp(176px,15vw,206px)] [display:grid] [grid-template-columns:30px_minmax(0,1fr)] [align-items:center] [gap:10px] [padding:8px_12px_8px_8px] [border-radius:14px] [background:linear-gradient(160deg,rgba(24,38,78,.88),rgba(11,21,48,.88))] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.14)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_16px_36px_-14px_rgba(0,0,0,.7)] [transform:rotate(3deg)]"}>
          <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center] [box-shadow:inset_0_1px_0_rgba(255,255,255,.25)]"}>
            <span className={"[width:15px] [height:15px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/sparkles.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/sparkles.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[display:flex] [flex-direction:column] [gap:1px] [min-width:0px]"}>
            <span className={"[font-weight:800] [font-size:12.5px] [color:#FFFFFF] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              Konten AI & Canva
            </span>
            <span className={"[font-size:11px] [font-weight:600] [color:#DC9550] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              tanpa jago desain
            </span>
          </span>
        </div>
      </div>
    </div>
    <div className={"[display:flex] [flex-direction:column] [justify-content:flex-start] [align-items:flex-end] [gap:clamp(5px,1.2vh,12px)] [height:100%] [padding-top:6%] [overflow:hidden] [box-sizing:border-box] [pointer-events:auto] [margin-right:-18px] [position:relative] [z-index:3] hidden! max-[979px]:flex!"}>
      <div className={"[animation:adsBob_4.2s_ease-in-out_0s_infinite]"}>
        <div className={"[width:clamp(66px,20vw,92px)] [padding:clamp(6px,1.2vh,10px)_6px] [border-radius:12px] [background:rgba(14,24,52,.72)] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.18)] [box-shadow:0_14px_30px_-14px_rgba(0,0,0,.75)] [display:flex] [flex-direction:column] [align-items:center] [gap:6px] [transform:rotate(3deg)]"}>
          <span className={"[width:26px] [height:26px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center]"}>
            <span className={"[width:14px] [height:14px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/megaphone.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/megaphone.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[font-weight:700] [font-size:10.5px] [line-height:1.2] [color:#FFFFFF] [text-align:center]"}>
            FB & IG Ads
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_4.9s_ease-in-out_-1.4s_infinite]"}>
        <div className={"[width:clamp(66px,20vw,92px)] [padding:clamp(6px,1.2vh,10px)_6px] [border-radius:12px] [background:rgba(14,24,52,.72)] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.18)] [box-shadow:0_14px_30px_-14px_rgba(0,0,0,.75)] [display:flex] [flex-direction:column] [align-items:center] [gap:6px] [transform:rotate(3deg)]"}>
          <span className={"[width:26px] [height:26px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center]"}>
            <span className={"[width:14px] [height:14px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/music-2.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/music-2.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[font-weight:700] [font-size:10.5px] [line-height:1.2] [color:#FFFFFF] [text-align:center]"}>
            TikTok Ads
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_5.6s_ease-in-out_-2.8s_infinite]"}>
        <div className={"[width:clamp(66px,20vw,92px)] [padding:clamp(6px,1.2vh,10px)_6px] [border-radius:12px] [background:rgba(14,24,52,.72)] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.18)] [box-shadow:0_14px_30px_-14px_rgba(0,0,0,.75)] [display:flex] [flex-direction:column] [align-items:center] [gap:6px] [transform:rotate(3deg)]"}>
          <span className={"[width:26px] [height:26px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center]"}>
            <span className={"[width:14px] [height:14px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/sparkles.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/sparkles.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[font-weight:700] [font-size:10.5px] [line-height:1.2] [color:#FFFFFF] [text-align:center]"}>
            Konten AI & Canva
          </span>
        </div>
      </div>
    </div>
    </>
  );
  const chipsRight = (
    <>
      <div className={"[display:flex] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:clamp(12px,2.2vh,20px)] [pointer-events:auto] [align-self:flex-start] [padding-top:clamp(28px,5vh,56px)] max-[979px]:hidden!"}>
      <div className={"[animation:adsBob_4.6s_ease-in-out_-0.6s_infinite]"}>
        <div className={"[width:clamp(176px,15vw,206px)] [display:grid] [grid-template-columns:30px_minmax(0,1fr)] [align-items:center] [gap:10px] [padding:8px_12px_8px_8px] [border-radius:14px] [background:linear-gradient(160deg,rgba(24,38,78,.88),rgba(11,21,48,.88))] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.14)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_16px_36px_-14px_rgba(0,0,0,.7)] [transform:rotate(-3deg)]"}>
          <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center] [box-shadow:inset_0_1px_0_rgba(255,255,255,.25)]"}>
            <span className={"[width:15px] [height:15px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/search.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/search.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[display:flex] [flex-direction:column] [gap:1px] [min-width:0px]"}>
            <span className={"[font-weight:800] [font-size:12.5px] [color:#FFFFFF] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              Google Ads
            </span>
            <span className={"[font-size:11px] [font-weight:600] [color:#DC9550] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              muncul teratas
            </span>
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_5.1s_ease-in-out_-1.7999999999999998s_infinite]"}>
        <div className={"[width:clamp(176px,15vw,206px)] [display:grid] [grid-template-columns:30px_minmax(0,1fr)] [align-items:center] [gap:10px] [padding:8px_12px_8px_8px] [border-radius:14px] [background:linear-gradient(160deg,rgba(24,38,78,.88),rgba(11,21,48,.88))] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.14)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_16px_36px_-14px_rgba(0,0,0,.7)] [transform:rotate(-3deg)]"}>
          <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center] [box-shadow:inset_0_1px_0_rgba(255,255,255,.25)]"}>
            <span className={"[width:15px] [height:15px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/globe.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/globe.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[display:flex] [flex-direction:column] [gap:1px] [min-width:0px]"}>
            <span className={"[font-weight:800] [font-size:12.5px] [color:#FFFFFF] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              Website
            </span>
            <span className={"[font-size:11px] [font-weight:600] [color:#DC9550] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              bikin sendiri
            </span>
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_5.6s_ease-in-out_-3s_infinite]"}>
        <div className={"[width:clamp(176px,15vw,206px)] [display:grid] [grid-template-columns:30px_minmax(0,1fr)] [align-items:center] [gap:10px] [padding:8px_12px_8px_8px] [border-radius:14px] [background:linear-gradient(160deg,rgba(24,38,78,.88),rgba(11,21,48,.88))] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.14)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_16px_36px_-14px_rgba(0,0,0,.7)] [transform:rotate(-3deg)]"}>
          <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center] [box-shadow:inset_0_1px_0_rgba(255,255,255,.25)]"}>
            <span className={"[width:15px] [height:15px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/message-circle.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/message-circle.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[display:flex] [flex-direction:column] [gap:1px] [min-width:0px]"}>
            <span className={"[font-weight:800] [font-size:12.5px] [color:#FFFFFF] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              Closing WA
            </span>
            <span className={"[font-size:11px] [font-weight:600] [color:#DC9550] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
              format chat teruji
            </span>
          </span>
        </div>
      </div>
    </div>
    <div className={"[display:flex] [flex-direction:column] [justify-content:flex-start] [align-items:flex-start] [gap:clamp(5px,1.2vh,12px)] [height:100%] [padding-top:6%] [overflow:hidden] [box-sizing:border-box] [pointer-events:auto] [margin-left:-18px] [position:relative] [z-index:3] hidden! max-[979px]:flex!"}>
      <div className={"[animation:adsBob_4.2s_ease-in-out_-0.7s_infinite]"}>
        <div className={"[width:clamp(66px,20vw,92px)] [padding:clamp(6px,1.2vh,10px)_6px] [border-radius:12px] [background:rgba(14,24,52,.72)] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.18)] [box-shadow:0_14px_30px_-14px_rgba(0,0,0,.75)] [display:flex] [flex-direction:column] [align-items:center] [gap:6px] [transform:rotate(-3deg)]"}>
          <span className={"[width:26px] [height:26px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center]"}>
            <span className={"[width:14px] [height:14px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/search.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/search.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[font-weight:700] [font-size:10.5px] [line-height:1.2] [color:#FFFFFF] [text-align:center]"}>
            Google Ads
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_4.9s_ease-in-out_-2.0999999999999996s_infinite]"}>
        <div className={"[width:clamp(66px,20vw,92px)] [padding:clamp(6px,1.2vh,10px)_6px] [border-radius:12px] [background:rgba(14,24,52,.72)] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.18)] [box-shadow:0_14px_30px_-14px_rgba(0,0,0,.75)] [display:flex] [flex-direction:column] [align-items:center] [gap:6px] [transform:rotate(-3deg)]"}>
          <span className={"[width:26px] [height:26px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center]"}>
            <span className={"[width:14px] [height:14px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/globe.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/globe.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[font-weight:700] [font-size:10.5px] [line-height:1.2] [color:#FFFFFF] [text-align:center]"}>
            Website
          </span>
        </div>
      </div>
      <div className={"[animation:adsBob_5.6s_ease-in-out_-3.5s_infinite]"}>
        <div className={"[width:clamp(66px,20vw,92px)] [padding:clamp(6px,1.2vh,10px)_6px] [border-radius:12px] [background:rgba(14,24,52,.72)] [backdrop-filter:blur(10px)] [-webkit--backdrop-filter:blur(10px)] [border:1px_solid_rgba(255,255,255,.18)] [box-shadow:0_14px_30px_-14px_rgba(0,0,0,.75)] [display:flex] [flex-direction:column] [align-items:center] [gap:6px] [transform:rotate(-3deg)]"}>
          <span className={"[width:26px] [height:26px] [border-radius:50%] [background:#C2650F] [display:flex] [align-items:center] [justify-content:center]"}>
            <span className={"[width:14px] [height:14px] [background:#0B1530] [-webkit--mask:url(https://unpkg.com/lucide-static@0.460.0/icons/message-circle.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/message-circle.svg)_center/contain_no-repeat]"}></span>
          </span>
          <span className={"[font-weight:700] [font-size:10.5px] [line-height:1.2] [color:#FFFFFF] [text-align:center]"}>
            Closing WA
          </span>
        </div>
      </div>
    </div>
    </>
  );
  const lbImg = (
    <img className={"[max-width:min(92vw,720px)] [max-height:88vh] [width:auto] [height:auto] [border-radius:14px] [box-shadow:0_30px_80px_-20px_rgba(0,0,0,.8)] [display:block]"} src={lb ?? undefined} alt="" />
  );

  return (
    <>
      <style>{KEYFRAMES_AND_RESET}</style>
      <div className={"[position:fixed] [inset:0] [z-index:60] [pointer-events:none] [opacity:.05] [mix-blend-mode:overlay]"} aria-hidden="true" style={{ "backgroundImage": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}></div>
      <div className={"[height:66px]"} aria-hidden="true"></div>
      <header className={"[position:fixed] [top:0] [left:0] [right:0] [z-index:50] [background:rgba(11,21,48,.86)] [backdrop-filter:blur(14px)] [-webkit-backdrop-filter:blur(14px)] [border-bottom:1px_solid_rgba(217,133,47,.22)] [box-shadow:0_10px_30px_-20px_rgba(0,0,0,.8)]"}>
        <div className={"[max-width:1200px] [height:66px] [margin:0_auto] [padding:0_clamp(16px,4vw,40px)] [display:flex] [align-items:center] [gap:16px]"}>
          <a className={"[display:flex] [align-items:center] [flex-shrink:0]"} href="#top">
            <img className={"[height:40px] max-[719px]:[height:30px] [width:auto] [display:block] [filter:drop-shadow(0_0_1px_rgba(255,255,255,.35))]"} src="/assets/logo-nav.webp" alt="Adspreneur.id" />
          </a>
          <div className={"[display:block] max-[979px]:[display:none] [flex:1_1_0] [min-width:0] [overflow:hidden] [white-space:nowrap] [text-overflow:ellipsis] [color:rgba(255,255,255,.6)] [font-size:13px] [font-weight:500] [padding-left:20px] [border-left:1px_solid_rgba(255,255,255,.14)]"}>
            Kelas praktek iklan digital
          </div>
          <a className={"[margin-left:auto] [flex-shrink:0] [display:inline-flex] [align-items:center] [gap:8px] [padding:12px_18px] max-[719px]:[padding:10px_13px] [border-radius:10px] [background:linear-gradient(180deg,#1BAA5D_0%,#118A48_55%,#0C743C_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.14)] [text-shadow:0_1px_0_rgba(0,0,0,.18)] [letter-spacing:.01em] [font-size:14px] [font-weight:800] [white-space:nowrap] [box-shadow:0_10px_24px_-12px_rgba(18,140,74,.75),inset_0_1px_0_rgba(255,255,255,.28)] hover:[background:linear-gradient(180deg,#22BD69_0%,#14994F_55%,#0E8044_100%)] hover:[color:#FFFFFF]"} href="#daftar">
            <img className={"[width:18px] [height:18px] [display:block]"} src="https://cdn.simpleicons.org/whatsapp/white" alt="" />
            Daftar Sekarang
          </a>
        </div>
      </header>
      <section className={"[position:relative] [background:#0B1530] [color:#FFFFFF] [overflow:hidden] [min-height:calc(100svh_-_66px)] [display:flex] [flex-direction:column] [justify-content:center]"} id="top" data-screen-label="Hero">
        <div className={"[position:absolute] [inset:0]"}>
          {heroBg}
        </div>
        <div className={"[position:absolute] [inset:0] [background:linear-gradient(180deg,rgba(11,21,48,.82)_0%,rgba(11,21,48,.78)_55%,#0B1530_100%)] [pointer-events:none]"}></div>
        <div className={"[position:absolute] [inset:0] [background:radial-gradient(40%_45%_at_50%_32%,rgba(26,79,160,.35),transparent_70%)] [pointer-events:none]"}></div>
        <div className={"[position:relative] [width:100%] [max-width:1200px] [margin:0_auto] [padding:clamp(6px,2.2vh,40px)_clamp(20px,4vw,40px)_clamp(14px,3.5vh,56px)] [display:flex] [flex-direction:column] [align-items:center] [pointer-events:none]"}>
          <div className={"[position:relative] [z-index:3] [max-width:980px] [width:100%] [display:flex] [flex-direction:column] [align-items:center] [text-align:center] [gap:16px] max-[979px]:[gap:8px] [margin-bottom:30px] max-[979px]:[margin-bottom:18px]"}>
            <span className={"[white-space:nowrap] [display:inline-flex] [align-items:center] [gap:8px] [padding:7px_14px] [border-radius:999px] [background:#C2650F] [color:#0B1530] [font-size:12px] [font-weight:800] [letter-spacing:.12em] [text-transform:uppercase]"}>
              Kelas offline 2 hari
            </span>
            <h1 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(40px,min(5vw,6vh),72px)] max-[979px]:[font-size:clamp(30px,min(8.6vw,6vh),56px)] [line-height:.94] [letter-spacing:-0.01em] [margin:0] [text-wrap:balance] [text-shadow:0_4px_30px_rgba(11,21,48,.85)]"}>
              Belajar Iklan Digital Sampai 
              <span className={"[color:#DE8A2E]"}>
                Chat, Klien & Orderan Masuk
              </span>
              , Langsung Praktek di Kelas
            </h1>
          </div>
          <div className={"[position:relative] [width:100%] [display:grid] [grid-template-columns:minmax(0,1fr)_auto_minmax(0,1fr)] [align-items:center] [justify-items:center] [gap:28px] max-[979px]:[gap:0px]"}>
            <div className={"[display:flex] [order:0] [position:relative] [z-index:3] [width:100%] [height:100%] [align-items:center] [justify-content:flex-end]"}>
              {chipsLeft}
            </div>
            <div className={"[order:1] [position:relative] [height:min(clamp(280px,42vh,480px),_calc(80vw_*_1.25))] max-[979px]:[height:min(clamp(240px,44vh,420px),_calc(52vw_*_1.25))] [width:auto] [aspect-ratio:4/5] [pointer-events:auto]"}>
              <div className={"[position:absolute] [inset:-18%_-30%] [background:radial-gradient(closest-side,rgba(194,101,15,.38),rgba(26,79,160,.25)_55%,transparent_100%)] [pointer-events:none]"}></div>
              <div className={"[position:absolute] [inset:2%_-10%_-26%_-10%] [border-radius:28px_28px_0_0] [overflow:hidden] [-webkit-mask-image:linear-gradient(180deg,#000_58%,transparent_92%)] [mask-image:linear-gradient(180deg,#000_58%,transparent_100%)]"}>
                <img className={"[position:absolute] [inset:0] [width:100%] [height:100%] [object-fit:cover] [object-position:center_top] [display:block] [pointer-events:none] [user-select:none]"} src="/assets/coach-hero-3.webp" alt="Coach Eka Satria" draggable={false} />
              </div>
            </div>
            <div className={"[display:flex] [order:2] [position:relative] [z-index:3] [width:100%] [height:100%] [align-items:center] [justify-content:flex-start]"}>
              {chipsRight}
            </div>
          </div>
          <div className={"[position:relative] [z-index:4] [margin-top:-28px] max-[979px]:[margin-top:10px] [max-width:900px] [width:100%] [display:flex] [flex-direction:column] [align-items:center] [text-align:center] [gap:20px] max-[979px]:[gap:14px]"}>
            <p className={"[margin:0] [font-size:clamp(13.5px,1.2vw,16px)] [line-height:1.55] [color:rgba(255,255,255,.85)] [max-width:640px] [text-wrap:pretty] [text-shadow:0_2px_16px_rgba(11,21,48,.8)]"}>
              Sudah bantu UMKM & brand naik omzet pakai 
              <strong className={"[color:#FFFFFF]"}>
                Meta Ads, Google Ads & TikTok Ads + Website
              </strong>
            </p>
            <div className={"[display:flex] [flex-wrap:wrap] [justify-content:center] [gap:12px] [width:100%] [pointer-events:auto]"}>
              <a className={"[flex:0_0_auto] [width:auto] [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [padding:13px_22px] max-[719px]:[padding:13px_12px] [white-space:nowrap] [border-radius:10px] [background:linear-gradient(180deg,#DE7F24_0%,#C2650F_55%,#A3540C_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.14)] [text-shadow:0_1px_0_rgba(0,0,0,.18)] [letter-spacing:.01em] [font-weight:800] [font-size:15px] [box-shadow:0_14px_34px_-12px_rgba(194,101,15,.75),inset_0_1px_0_rgba(255,255,255,.28)] [transition:transform_.15s] hover:[background:linear-gradient(180deg,#E88C30_0%,#CF6E14_55%,#B05C0F_100%)] hover:[color:#FFFFFF] hover:[transform:translateY(-2px)]"} href="#daftar">
                <span className={"[width:18px] [height:18px] [background:#FFFFFF] [-webkit-mask:url(https://unpkg.com/lucide-static@0.460.0/icons/calendar-days.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/calendar-days.svg)_center/contain_no-repeat]"}></span>
                Lihat jadwal terdekat
              </a>
            </div>
            <div className={"[display:grid] [grid-template-columns:repeat(4,auto)] [justify-content:center] [border-radius:14px] [border:1px_solid_rgba(255,255,255,.16)] [background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(11,21,48,.6))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.12),0_20px_40px_-24px_rgba(0,0,0,.8)] [backdrop-filter:blur(8px)] [-webkit-backdrop-filter:blur(8px)] [overflow:hidden] [pointer-events:auto]"}>
              {heroStats.map((st, idx) => (
                <Fragment key={idx}>
                <div className={"[padding:10px_22px] max-[719px]:[padding:9px_12px] [display:flex] [flex-direction:column] [align-items:center] [gap:2px]"} style={{ "borderLeft": `${st.border}` }}>
                  <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:26px] max-[719px]:[font-size:22px] [line-height:1] [color:#DE8A2E]"}>
                    {st.n}
                  </span>
                  <span className={"[font-size:12px] max-[719px]:[font-size:10.5px] [font-weight:700] [color:rgba(255,255,255,.75)] [letter-spacing:.04em]"}>
                    {st.l}
                  </span>
                </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className={"[background:linear-gradient(90deg,#A3540C,#C2650F_30%,#D9852F_50%,#C2650F_70%,#A3540C)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.3),inset_0_-1px_0_rgba(0,0,0,.2)] [color:#0B1530] [overflow:hidden] [padding:7px_0] [font-family:'Barlow_Condensed',sans-serif] [font-weight:700] [font-size:13px] [letter-spacing:.04em] [text-transform:uppercase]"} data-screen-label="Strip">
        {marquee}
      </div>
      <section className={"[background:radial-gradient(90%_60%_at_50%_0%,#FFFFFF_0%,#FBF9F4_100%)] [padding:clamp(56px,9vw,112px)_0]"} data-screen-label="Tim">
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:32px]"}>
          <div className={"[display:flex] [flex-wrap:wrap] [align-items:flex-end] [justify-content:space-between] [gap:16px_40px]"}>
            <div className={"[display:flex] [flex-direction:column] [gap:18px] [max-width:640px]"}>
              <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F4F0E8)] [box-shadow:0_1px_0_#FFFFFF_inset,0_6px_16px_-10px_rgba(14,26,51,.35)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#1A4FA0]"}>
                <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_0_3px_rgba(194,101,15,.18)]"}></span>
                Tim Adspreneur
              </span>
              <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [color:#0E1A33] [text-wrap:balance]"}>
                Praktisi Lapangan, Bukan Praktisi Teori
              </h2>
            </div>
            <p className={"[margin:0] [max-width:420px] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.6] [color:#55607A] [text-wrap:pretty]"}>
              Coach dan tim yang mendampingi kamu praktek satu per satu di kelas.
            </p>
          </div>
          <div className={"[position:relative] [aspect-ratio:16/9] [border-radius:24px] [overflow:hidden] [background:#EFEBE3] [box-shadow:0_0_0_1px_rgba(14,26,51,.06),0_0_0_8px_rgba(255,255,255,.7),0_44px_80px_-40px_rgba(14,26,51,.65)]"}>
            <img className={"[position:absolute] [inset:0] [width:100%] [height:100%] [object-fit:cover] [display:block] [pointer-events:none]"} src="/assets/team.webp" alt="Tim Adspreneur.id" draggable={false} />
          </div>
        </div>
      </section>
      <section className={"[background:linear-gradient(180deg,#F8F5EF_0%,#F2EDE3_100%)] [padding:clamp(56px,9vw,112px)_0]"} data-screen-label="Filter">
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:40px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:18px] [align-items:center] [text-align:center] [max-width:760px] [margin:0_auto]"}>
            <span className={"[display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F4F0E8)] [box-shadow:0_1px_0_#FFFFFF_inset,0_6px_16px_-10px_rgba(14,26,51,.35)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#1A4FA0]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_0_3px_rgba(194,101,15,.18)]"}></span>
              Cocok untuk siapa
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [color:#0E1A33] [text-wrap:balance]"}>
              Kelas Ini Bukan untuk Semua Orang
            </h2>
            <p className={"[margin:0] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.6] [color:#55607A] [text-wrap:pretty]"}>
              Cek dulu, kamu masuk yang mana.
            </p>
          </div>
          <div className={"[display:flex] [flex-direction:column] [gap:20px] [width:100%] [max-width:960px] [margin:0_auto]"}>
            <div className={"[background:linear-gradient(180deg,#FFFFFF,#FCFAF6)] [box-shadow:0_24px_50px_-36px_rgba(14,26,51,.45)] [border-radius:24px] [border:1.5px_solid_rgba(18,140,74,.35)] [padding:clamp(24px,3.5vw,36px)] [display:flex] [flex-direction:column] [gap:18px] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-6px)] hover:[box-shadow:0_24px_50px_-24px_rgba(14,26,51,.38)]"}>
              <div className={"[display:flex] [align-items:center] [gap:12px]"}>
                <span className={"[width:40px] [height:40px] [border-radius:12px] [background:linear-gradient(180deg,#1BAA5D_0%,#118A48_55%,#0C743C_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.14)] [text-shadow:0_1px_0_rgba(0,0,0,.18)] [letter-spacing:.01em] [display:flex] [align-items:center] [justify-content:center] [font-size:20px] [font-weight:900]"}>
                  ✓
                </span>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:28px] [color:#0E1A33]"}>
                  Daftar kelas ini jika:
                </span>
              </div>
              <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))] [gap:12px]"}>
                {fitYes.map((t, idx) => (
                  <Fragment key={idx}>
                  <div className={"[display:grid] [grid-template-columns:40px_minmax(0,1fr)] [gap:14px] [align-items:center] [padding:14px_16px] [border-radius:16px] [background:rgba(18,140,74,.05)] [border:1px_solid_rgba(18,140,74,.16)] [transition:transform_.2s_ease,box-shadow_.2s_ease] hover:[transform:translateY(-3px)] hover:[box-shadow:0_14px_28px_-20px_rgba(14,26,51,.45)]"}>
                    <span className={"[width:40px] [height:40px] [border-radius:12px] [background:#FFFFFF] [border:1px_solid_rgba(18,140,74,.16)] [box-shadow:0_4px_10px_-6px_rgba(14,26,51,.3)] [display:flex] [align-items:center] [justify-content:center]"}>
                      <span className={"[width:20px] [height:20px] [background:#128C4A]"} style={{ "WebkitMask": `${t.mask}`, "mask": `${t.mask}` }}></span>
                    </span>
                    <span className={"[font-size:15px] [line-height:1.5] [font-weight:600] [color:#1E2A44] [text-wrap:pretty]"}>
                      {t.t}
                    </span>
                  </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className={"[background:linear-gradient(180deg,#FFFFFF,#FCFAF6)] [box-shadow:0_24px_50px_-36px_rgba(14,26,51,.45)] [border-radius:24px] [border:1.5px_solid_rgba(220,70,60,.3)] [padding:clamp(24px,3.5vw,36px)] [display:flex] [flex-direction:column] [gap:18px] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-6px)] hover:[box-shadow:0_24px_50px_-24px_rgba(14,26,51,.38)]"}>
              <div className={"[display:flex] [align-items:center] [gap:12px]"}>
                <span className={"[width:40px] [height:40px] [border-radius:12px] [background:#D2463C] [color:#FFFFFF] [display:flex] [align-items:center] [justify-content:center] [font-size:20px] [font-weight:900]"}>
                  ✕
                </span>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:28px] [color:#0E1A33]"}>
                  Skip kelas ini jika:
                </span>
              </div>
              <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))] [gap:12px]"}>
                {fitNo.map((t, idx) => (
                  <Fragment key={idx}>
                  <div className={"[display:grid] [grid-template-columns:40px_minmax(0,1fr)] [gap:14px] [align-items:center] [padding:14px_16px] [border-radius:16px] [background:rgba(210,70,60,.045)] [border:1px_solid_rgba(210,70,60,.15)] [transition:transform_.2s_ease,box-shadow_.2s_ease] hover:[transform:translateY(-3px)] hover:[box-shadow:0_14px_28px_-20px_rgba(14,26,51,.45)]"}>
                    <span className={"[width:40px] [height:40px] [border-radius:12px] [background:#FFFFFF] [border:1px_solid_rgba(210,70,60,.15)] [box-shadow:0_4px_10px_-6px_rgba(14,26,51,.3)] [display:flex] [align-items:center] [justify-content:center]"}>
                      <span className={"[width:20px] [height:20px] [background:#D2463C]"} style={{ "WebkitMask": `${t.mask}`, "mask": `${t.mask}` }}></span>
                    </span>
                    <span className={"[font-size:15px] [line-height:1.5] [font-weight:600] [color:#1E2A44] [text-wrap:pretty]"}>
                      {t.t}
                    </span>
                  </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"[background:radial-gradient(90%_60%_at_50%_0%,#FFFFFF_0%,#FBF9F4_100%)] [padding:clamp(56px,10vw,128px)_0]"} data-screen-label="Masalah">
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] [gap:clamp(40px,6vw,80px)] [align-items:start]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:24px]"}>
            <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F4F0E8)] [box-shadow:0_1px_0_#FFFFFF_inset,0_6px_16px_-10px_rgba(14,26,51,.35)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#1A4FA0]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_0_3px_rgba(194,101,15,.18)]"}></span>
              Kenapa banyak yang boncos
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [color:#0E1A33] [text-wrap:balance]"}>
              Iklan Jalan, Budget Habis, Tapi Chat Nggak Masuk?
            </h2>
            <div className={"[display:flex] [flex-direction:column] [gap:16px] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.65] [color:#3B4660] [text-wrap:pretty]"}>
              <p className={"[margin:0]"}>
                Biasanya bukan produknya yang salah, tapi setup akun, campaign, dan cara baca datanya.
              </p>
              <p className={"[margin:0] [color:#0E1A33] [font-weight:700]"}>
                Kalau salah satu di samping terasa familiar, kamu nggak sendirian.
              </p>
            </div>
          </div>
          <div className={"[background:radial-gradient(120%_90%_at_100%_0%,rgba(194,101,15,.22)_0%,transparent_45%),linear-gradient(160deg,#15265A_0%,#0B1530_60%,#081129_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.08)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.1),0_40px_80px_-40px_rgba(11,21,48,.8)] [border-radius:24px] [padding:clamp(28px,4vw,44px)] [display:flex] [flex-direction:column] [gap:8px] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-6px)] hover:[box-shadow:0_24px_50px_-24px_rgba(14,26,51,.38)]"}>
            <div className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:700] [font-size:28px] [margin-bottom:12px]"}>
              Masalah yang paling sering kami temui
            </div>
            {problems.map((p, idx) => (
              <Fragment key={idx}>
              <div className={"[display:grid] [grid-template-columns:40px_1fr] [gap:14px] [padding:18px_0] [border-top:1px_solid_rgba(255,255,255,.1)]"}>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:20px] [color:#FFFFFF] [width:40px] [height:40px] [border-radius:12px] [background:linear-gradient(145deg,#D9852F,#A3540C)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.3),0_8px_18px_-8px_rgba(194,101,15,.8)] [display:flex] [align-items:center] [justify-content:center]"}>
                  {p.n}
                </span>
                <div className={"[display:flex] [flex-direction:column] [gap:4px]"}>
                  <span className={"[font-weight:700] [font-size:16px]"}>
                    {p.t}
                  </span>
                  <span className={"[font-size:14px] [line-height:1.55] [color:rgba(255,255,255,.66)]"}>
                    {p.d}
                  </span>
                </div>
              </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className={"[position:relative] [background:radial-gradient(120%_70%_at_50%_0%,#14245A_0%,#0B1530_50%,#070E24_100%)] [color:#FFFFFF] [padding:clamp(56px,10vw,128px)_0] [overflow:hidden]"} data-screen-label="Solusi">
        <div className={"[position:absolute] [left:0] [right:0] [top:0] [height:1px] [background:linear-gradient(90deg,transparent,rgba(217,133,47,.55),transparent)] [pointer-events:none]"} aria-hidden="true"></div>
        <div className={"[position:absolute] [inset:0] [background:radial-gradient(45%_55%_at_85%_20%,rgba(194,101,15,.14),transparent_70%)] [pointer-events:none]"}></div>
        <div className={"[position:relative] [max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:44px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:20px] [max-width:820px]"}>
            <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(242,182,124,.32)] [background:linear-gradient(180deg,rgba(194,101,15,.14),rgba(194,101,15,.03))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [backdrop-filter:blur(6px)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#E8B068]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_10px_2px_rgba(194,101,15,.7)]"}></span>
              Solusinya
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [text-wrap:balance] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
              Belajar & Praktek Langsung di Kelas, 
              <span className={"[color:#DE8A2E]"}>
                Dimentori 1-on-1
              </span>
            </h2>
            <p className={"[margin:0] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.6] [color:rgba(255,255,255,.72)] [max-width:640px] [text-wrap:pretty]"}>
              Untuk pemilik bisnis jasa pemula, yang merasa gaptek, atau sudah pernah belajar online/offline tapi iklannya belum jalan.
            </p>
          </div>
          <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))] [gap:16px]"}>
            {solution.map((s, idx) => (
              <Fragment key={idx}>
              <div className={"[border-radius:20px] [border:1px_solid_rgba(255,255,255,.1)] [background:linear-gradient(160deg,rgba(255,255,255,.08)_0%,rgba(255,255,255,.02)_45%,rgba(255,255,255,.01)_100%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.09),0_20px_40px_-30px_rgba(0,0,0,.8)] [padding:26px] [display:flex] [flex-direction:column] [gap:14px] [transition:transform_.25s_ease,box-shadow_.25s_ease,border-color_.25s_ease] hover:[transform:translateY(-5px)] hover:[box-shadow:0_24px_50px_-20px_rgba(0,0,0,.75)] hover:[border-color:rgba(194,101,15,.5)]"}>
                <span className={"[width:52px] [height:52px] [border-radius:14px] [background:linear-gradient(145deg,rgba(194,101,15,.28),rgba(194,101,15,.06))] [border:1px_solid_rgba(217,133,47,.28)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.12)] [display:flex] [align-items:center] [justify-content:center]"}>
                  <span className={"[width:26px] [height:26px] [background:#C2650F]"} style={{ "WebkitMask": `${s.mask}`, "mask": `${s.mask}` }}></span>
                </span>
                <span className={"[font-weight:800] [font-size:18px] [line-height:1.3]"}>
                  {s.t}
                </span>
                <span className={"[font-size:14.5px] [line-height:1.6] [color:rgba(255,255,255,.68)]"}>
                  {s.d}
                </span>
              </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className={"[background:linear-gradient(180deg,#F8F5EF_0%,#F2EDE3_100%)] [padding:clamp(56px,10vw,128px)_0]"} id="kurikulum" data-screen-label="Kurikulum">
        <div className={"[max-width:960px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:40px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:18px] [align-items:center] [text-align:center]"}>
            <span className={"[display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F4F0E8)] [box-shadow:0_1px_0_#FFFFFF_inset,0_6px_16px_-10px_rgba(14,26,51,.35)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#1A4FA0]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_0_3px_rgba(194,101,15,.18)]"}></span>
              Metode & materi
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [color:#0E1A33] [text-wrap:balance]"}>
              2 Hari, 8 Bagian Materi, Semua Dipraktekkan
            </h2>
            <p className={"[margin:0] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.6] [color:#55607A]"}>
              2 hari full, 08.00–17.00. Klik tiap bagian untuk lihat isinya.
            </p>
          </div>
          <div className={"[display:flex] [flex-direction:column] [gap:24px]"}>
            {days.map((day, idx) => (
              <Fragment key={idx}>
              <div className={"[border-radius:24px] [background:radial-gradient(90%_60%_at_0%_0%,rgba(194,101,15,.18),transparent_55%),linear-gradient(160deg,#15265A_0%,#0B1530_55%,#081129_100%)] [border:1px_solid_rgba(255,255,255,.08)] [padding:clamp(16px,2.6vw,26px)] [display:flex] [flex-direction:column] [gap:16px] [box-shadow:0_30px_60px_-36px_rgba(14,26,51,.6)]"}>
                <div className={"[display:flex] [flex-wrap:wrap] [align-items:center] [gap:10px_16px] [padding:4px_4px_0]"}>
                  <span className={"[padding:8px_16px] [border-radius:999px] [background:#C2650F] [color:#0B1530] [font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:20px] [letter-spacing:.04em] [text-transform:uppercase]"}>
                    {day.label}
                  </span>
                  <span className={"[font-weight:800] [font-size:clamp(17px,1.9vw,21px)] [color:#FFFFFF]"}>
                    {day.title}
                  </span>
                  <span className={"[margin-left:auto] [font-size:13px] [font-weight:700] [color:rgba(255,255,255,.6)]"}>
                    {day.count} bagian · 08.00–17.00
                  </span>
                </div>
                <div className={"[display:flex] [flex-direction:column] [gap:12px]"}>
                  {day.mods.map((b, idx) => (
                    <Fragment key={idx}>
                    <div className={"[border-radius:18px] [background:linear-gradient(180deg,#FFFFFF,#FBF9F5)] [box-shadow:0_10px_26px_-22px_rgba(14,26,51,.5)] [overflow:hidden] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-3px)] hover:[box-shadow:0_20px_40px_-24px_rgba(14,26,51,.35)]"} style={{ "border": `1.5px solid ${b.border}` }}>
                      <button className={"[width:100%] [display:grid] [grid-template-columns:auto_minmax(0,1fr)_34px] [gap:16px] [align-items:center] [padding:20px_24px] max-[719px]:[padding:16px_16px] [background:transparent] [border:0] [cursor:pointer] [text-align:left] [color:#0E1A33]"} onClick={b.toggle}>
                        <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:40px] max-[719px]:[font-size:30px] [line-height:1]"} style={{ "color": `${b.numColor}` }}>
                          {b.num}
                        </span>
                        <span className={"[display:flex] [flex-direction:column] [gap:4px] [min-width:0]"}>
                          <span className={"[font-size:11px] [font-weight:800] [letter-spacing:.14em] [text-transform:uppercase] [color:#C2650F]"}>
                            Bagian {b.n} · {b.count} materi
                          </span>
                          <span className={"[font-weight:800] [font-size:clamp(16px,1.8vw,19px)] [line-height:1.3]"}>
                            {b.title}
                          </span>
                        </span>
                        <span className={"[width:34px] [height:34px] [border-radius:50%] [display:flex] [align-items:center] [justify-content:center] [font-size:20px] [line-height:1]"} style={{ "background": `${b.signBg}`, "color": `${b.signColor}` }}>
                          {b.sign}
                        </span>
                      </button>
                      {b.open && (
                        <>
                        <div className={"[padding:0_24px_22px] max-[719px]:[padding:0_16px_22px] [display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))] [gap:10px]"}>
                          {b.points.map((p, idx) => (
                            <Fragment key={idx}>
                            <div className={"[display:grid] [grid-template-columns:36px_1fr] [gap:12px] [align-items:start] [padding:14px] [border-radius:14px] [background:linear-gradient(180deg,#FBFAF7,#F3EFE7)] [border:1px_solid_rgba(14,26,51,.05)] [box-shadow:inset_0_1px_0_#FFFFFF]"}>
                              <span className={"[width:36px] [height:36px] [border-radius:10px] [background:#FFFFFF] [border:1px_solid_rgba(14,26,51,.08)] [box-shadow:0_6px_14px_-8px_rgba(14,26,51,.4)] [display:flex] [align-items:center] [justify-content:center] [font-size:18px]"}>
                                {p.ic}
                              </span>
                              <span className={"[display:flex] [flex-direction:column] [gap:3px]"}>
                                <span className={"[font-weight:700] [font-size:14.5px] [line-height:1.45] [color:#0E1A33]"}>
                                  {p.t}
                                </span>
                                <span className={"[font-size:13.5px] [line-height:1.5] [color:#55607A]"}>
                                  {p.d}
                                </span>
                              </span>
                            </div>
                            </Fragment>
                          ))}
                        </div>
                        </>
                      )}
                    </div>
                    </Fragment>
                  ))}
                </div>
              </div>
              </Fragment>
            ))}
          </div>
          <div className={"[display:flex] [flex-wrap:wrap] [align-items:center] [justify-content:space-between] [gap:20px] [padding:clamp(20px,3vw,28px)_clamp(20px,3vw,32px)] [border-radius:20px] [background:linear-gradient(110deg,#0B1530_0%,#15265A_60%,#1A3170_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.08)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_24px_50px_-30px_rgba(11,21,48,.7)]"}>
            <p className={"[margin:0] [font-size:clamp(15px,1.6vw,18px)] [line-height:1.5] [max-width:560px] [text-wrap:pretty]"}>
              <strong className={"[color:#C2650F]"}>
                Teori 10%, praktek 90%.
              </strong>
               Pulang bawa iklan yang sudah jalan di akunmu sendiri.
            </p>
          </div>
        </div>
      </section>
      <section className={"[background:radial-gradient(120%_70%_at_50%_0%,#14245A_0%,#0B1530_50%,#070E24_100%)] [color:#FFFFFF] [padding:clamp(56px,10vw,128px)_0]"} data-screen-label="Pembeda">
        <div className={"[position:absolute] [left:0] [right:0] [top:0] [height:1px] [background:linear-gradient(90deg,transparent,rgba(217,133,47,.55),transparent)] [pointer-events:none]"} aria-hidden="true"></div>
        <div className={"[max-width:1000px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:48px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:20px] [align-items:center] [text-align:center]"}>
            <span className={"[display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(242,182,124,.32)] [background:linear-gradient(180deg,rgba(194,101,15,.14),rgba(194,101,15,.03))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [backdrop-filter:blur(6px)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#E8B068]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_10px_2px_rgba(194,101,15,.7)]"}></span>
              Kenapa Adspreneur
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(40px,6vw,72px)] [line-height:.96] [margin:0] [text-wrap:balance] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
              Bukan Kelas Nonton Slide
            </h2>
            <p className={"[margin:0] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.6] [color:rgba(255,255,255,.72)] [max-width:600px] [text-wrap:pretty]"}>
              Kami lebih suka kamu langsung praktek di akunmu sendiri, dibimbing sampai bisa. Ini bedanya.
            </p>
          </div>
          <div className={"[display:flex] [flex-direction:column] [border-radius:24px] [border:1px_solid_rgba(255,255,255,.12)] [overflow:hidden] [background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_40px_90px_-50px_rgba(0,0,0,.9),0_0_80px_-40px_rgba(194,101,15,.35)]"}>
            <div className={"[display:grid] [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] [background:rgba(255,255,255,.04)] [font-size:12px] [font-weight:700] [letter-spacing:.14em] [text-transform:uppercase]"}>
              <div className={"[padding:16px_clamp(16px,3vw,32px)] [color:#FF8A80]"}>
                Kelas lain
              </div>
              <div className={"[padding:16px_clamp(16px,3vw,32px)] [color:#C2650F] [border-left:1px_solid_rgba(255,255,255,.12)]"}>
                Di Adspreneur
              </div>
            </div>
            {compare.map((c, idx) => (
              <Fragment key={idx}>
              <div className={"[display:grid] [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] [border-top:1px_solid_rgba(255,255,255,.1)]"}>
                <div className={"[padding:20px_clamp(16px,3vw,32px)] [font-size:clamp(14px,1.6vw,18px)] [font-weight:600] [color:rgba(255,255,255,.82)] [background:rgba(240,81,79,.06)] [display:flex] [gap:12px] [align-items:center]"}>
                  <span className={"[flex-shrink:0] [width:24px] [height:24px] [border-radius:50%] [background:rgba(240,81,79,.16)] [border:1px_solid_rgba(240,81,79,.4)] [color:#FF8A80] [display:flex] [align-items:center] [justify-content:center] [font-size:12px] [font-weight:900]"}>
                    ✕
                  </span>
                  <span>
                    {c.old}
                  </span>
                </div>
                <div className={"[padding:20px_clamp(16px,3vw,32px)] [font-size:clamp(15px,1.6vw,18px)] [font-weight:800] [color:#FFFFFF] [border-left:1px_solid_rgba(255,255,255,.12)] [background:rgba(194,101,15,.07)] [display:flex] [gap:12px] [align-items:center]"}>
                  <span className={"[flex-shrink:0] [width:24px] [height:24px] [border-radius:50%] [background:#C2650F] [color:#0B1530] [display:flex] [align-items:center] [justify-content:center] [font-size:12px] [font-weight:900] [box-shadow:0_0_12px_-2px_rgba(194,101,15,.8)]"}>
                    ✓
                  </span>
                  <span>
                    {c.neu}
                  </span>
                </div>
              </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className={"[background:linear-gradient(180deg,#F8F5EF_0%,#F2EDE3_100%)] [padding:clamp(56px,10vw,128px)_0]"} data-screen-label="Benefit">
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:40px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:20px] [max-width:760px]"}>
            <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F4F0E8)] [box-shadow:0_1px_0_#FFFFFF_inset,0_6px_16px_-10px_rgba(14,26,51,.35)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#1A4FA0]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_0_3px_rgba(194,101,15,.18)]"}></span>
              Setelah 2 hari
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [color:#0E1A33] [text-wrap:balance]"}>
              Pulang dari Kelas, Kamu Bisa…
            </h2>
          </div>
          <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] [gap:16px]"}>
            {benefits.map((b, idx) => (
              <Fragment key={idx}>
              <div className={"[position:relative] [overflow:hidden] [background:#FFFFFF] [border-radius:20px] [padding:26px] [display:grid] [grid-template-columns:52px_1fr] [gap:16px] [align-items:center] [border:1px_solid_rgba(14,26,51,.07)] [box-shadow:inset_0_1px_0_#FFFFFF,0_14px_34px_-26px_rgba(14,26,51,.45)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-6px)] hover:[box-shadow:0_24px_50px_-24px_rgba(14,26,51,.38)]"}>
                <span className={"[width:52px] [height:52px] [border-radius:14px] [background:linear-gradient(145deg,#F5E2CC,#FBF3EA)] [border:1px_solid_rgba(194,101,15,.2)] [box-shadow:inset_0_1px_0_#FFFFFF] [display:flex] [align-items:center] [justify-content:center]"}>
                  <span className={"[width:26px] [height:26px] [background:#C2650F]"} style={{ "WebkitMask": `${b.mask}`, "mask": `${b.mask}` }}></span>
                </span>
                <span className={"[display:flex] [flex-direction:column] [gap:4px]"}>
                  <span className={"[font-weight:800] [font-size:17px] [line-height:1.3] [color:#0E1A33]"}>
                    {b.t}
                  </span>
                  <span className={"[font-size:14px] [line-height:1.5] [color:#55607A]"}>
                    {b.d}
                  </span>
                </span>
              </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className={"[position:relative] [background:#0B1530] [color:#FFFFFF] [overflow:hidden]"} data-screen-label="Mentor">
        <div className={"[position:absolute] [left:0] [top:0] [width:55%] max-[979px]:[width:100%] [height:100%] max-[979px]:[height:clamp(520px,70vw,680px)] [overflow:hidden]"}>
          {mosaic}
          <div className={"[position:absolute] [inset:0] [background:linear-gradient(90deg,rgba(11,21,48,.25)_0%,rgba(11,21,48,.45)_55%,#0B1530_100%),linear-gradient(180deg,#0B1530_0%,transparent_14%,transparent_86%,#0B1530_100%)] max-[979px]:[background:linear-gradient(180deg,rgba(11,21,48,.35)_0%,rgba(11,21,48,.25)_55%,#0B1530_100%)] [pointer-events:none]"}></div>
        </div>
        <div className={"[position:relative] [max-width:1200px] [margin:0_auto] [padding:clamp(72px,10vw,128px)_clamp(20px,4vw,40px)] [display:grid] [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] max-[979px]:[grid-template-columns:minmax(0,1fr)] [grid-template-areas:\"photo_head\"_\"photo_body\"] max-[979px]:[grid-template-areas:\"head\"_\"photo\"_\"body\"] [column-gap:clamp(40px,5vw,72px)] [row-gap:18px] [align-items:center] [pointer-events:none]"}>
          <div className={"[grid-area:photo] [display:flex] [justify-content:flex-end] max-[979px]:[justify-content:center] [align-items:center] [min-height:clamp(380px,44vw,520px)]"}>
            <div className={"[pointer-events:auto] [position:relative] [width:min(320px,72%)] [aspect-ratio:4/5] [border-radius:20px] [overflow:hidden] [background:#111D3D] [border:1px_solid_rgba(194,101,15,.45)] [box-shadow:0_0_0_6px_rgba(11,21,48,.6),0_0_0_7px_rgba(217,133,47,.25),0_0_90px_-4px_rgba(194,101,15,.55),0_40px_80px_-30px_rgba(0,0,0,.9)]"}>
              <img className={"[position:absolute] [inset:0] [width:100%] [height:100%] [object-fit:cover] [object-position:center_top] [display:block] [pointer-events:none] [user-select:none]"} src="/assets/coach-mentor.webp" alt="Coach Eka Satria" draggable={false} />
            </div>
          </div>
          <div className={"[grid-area:head] [align-self:end] [pointer-events:auto] [display:flex] [flex-direction:column] [gap:18px]"}>
            <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(242,182,124,.32)] [background:linear-gradient(180deg,rgba(194,101,15,.14),rgba(194,101,15,.03))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [backdrop-filter:blur(6px)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#E8B068]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_10px_2px_rgba(194,101,15,.7)]"}></span>
              Mentor kamu
            </span>
            <div className={"[display:flex] [flex-direction:column] [gap:8px]"}>
              <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(40px,5vw,60px)] [line-height:1] [margin:0] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
                Eka Satria
              </h2>
              <span className={"[font-size:14px] [font-weight:700] [color:#DC9550]"}>
                Founder & CEO Adspreneur.id · BNSP-RI Certified
              </span>
            </div>
          </div>
          <div className={"[grid-area:body] [align-self:start] [pointer-events:auto] [display:flex] [flex-direction:column] [gap:18px]"}>
            <p className={"[margin:0] [font-size:clamp(15px,1.4vw,16px)] [line-height:1.65] [color:rgba(255,255,255,.75)] [text-wrap:pretty]"}>
              Praktisi digital marketing sejak 2019. Yang diajarkan adalah strategi dari pengalaman 7 tahun ngiklan sendiri, bukan teori buku.
            </p>
            <div className={"[display:flex] [flex-wrap:wrap] [gap:8px]"}>
              <span className={"[display:inline-flex] [align-items:center] [gap:6px] [padding:7px_12px] [border-radius:999px] [border:1px_solid_rgba(255,255,255,.14)] [background:rgba(255,255,255,.04)] [font-size:12.5px] [font-weight:700] [color:rgba(255,255,255,.85)]"}>
                <span className={"[width:6px] [height:6px] [border-radius:50%] [background:#C2650F]"}></span>
                Facebook & Instagram Ads
              </span>
              <span className={"[display:inline-flex] [align-items:center] [gap:6px] [padding:7px_12px] [border-radius:999px] [border:1px_solid_rgba(255,255,255,.14)] [background:rgba(255,255,255,.04)] [font-size:12.5px] [font-weight:700] [color:rgba(255,255,255,.85)]"}>
                <span className={"[width:6px] [height:6px] [border-radius:50%] [background:#C2650F]"}></span>
                Google Ads
              </span>
              <span className={"[display:inline-flex] [align-items:center] [gap:6px] [padding:7px_12px] [border-radius:999px] [border:1px_solid_rgba(255,255,255,.14)] [background:rgba(255,255,255,.04)] [font-size:12.5px] [font-weight:700] [color:rgba(255,255,255,.85)]"}>
                <span className={"[width:6px] [height:6px] [border-radius:50%] [background:#C2650F]"}></span>
                TikTok Ads
              </span>
              <span className={"[display:inline-flex] [align-items:center] [gap:6px] [padding:7px_12px] [border-radius:999px] [border:1px_solid_rgba(255,255,255,.14)] [background:rgba(255,255,255,.04)] [font-size:12.5px] [font-weight:700] [color:rgba(255,255,255,.85)]"}>
                <span className={"[width:6px] [height:6px] [border-radius:50%] [background:#C2650F]"}></span>
                Website
              </span>
            </div>
            <div className={"[display:flex] [flex-wrap:wrap] [gap:12px] [margin-top:4px]"}>
              <div className={"[flex:1_1_120px] [padding:18px] [border-radius:14px] [border:1px_solid_rgba(255,255,255,.1)] [background:linear-gradient(160deg,rgba(255,255,255,.07)_0%,rgba(255,255,255,.015)_60%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [display:flex] [flex-direction:column] [gap:6px] [transition:transform_.25s_ease,border-color_.25s_ease] hover:[transform:translateY(-5px)] hover:[border-color:rgba(194,101,15,.5)]"}>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(30px,3.2vw,40px)] [line-height:1] [color:#C2650F]"}>
                  7 th
                </span>
                <span className={"[font-size:13px] [color:rgba(255,255,255,.62)] [font-weight:600]"}>
                  praktek ngiklan
                </span>
              </div>
              <div className={"[flex:1_1_120px] [padding:18px] [border-radius:14px] [border:1px_solid_rgba(255,255,255,.1)] [background:linear-gradient(160deg,rgba(255,255,255,.07)_0%,rgba(255,255,255,.015)_60%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [display:flex] [flex-direction:column] [gap:6px] [transition:transform_.25s_ease,border-color_.25s_ease] hover:[transform:translateY(-5px)] hover:[border-color:rgba(194,101,15,.5)]"}>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(30px,3.2vw,40px)] [line-height:1] [color:#C2650F]"}>
                  1850
                </span>
                <span className={"[font-size:13px] [color:rgba(255,255,255,.62)] [font-weight:600]"}>
                  alumni kelas
                </span>
              </div>
              <div className={"[flex:1_1_120px] [padding:18px] [border-radius:14px] [border:1px_solid_rgba(255,255,255,.1)] [background:linear-gradient(160deg,rgba(255,255,255,.07)_0%,rgba(255,255,255,.015)_60%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [display:flex] [flex-direction:column] [gap:6px] [transition:transform_.25s_ease,border-color_.25s_ease] hover:[transform:translateY(-5px)] hover:[border-color:rgba(194,101,15,.5)]"}>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(30px,3.2vw,40px)] [line-height:1] [color:#C2650F]"}>
                  500+
                </span>
                <span className={"[font-size:13px] [color:rgba(255,255,255,.62)] [font-weight:600]"}>
                  brand dibantu
                </span>
              </div>
            </div>
            <blockquote className={"[margin:6px_0_0] [padding:4px_0_4px_20px] [border-left:3px_solid_#C2650F] [font-size:clamp(17px,1.7vw,20px)] [line-height:1.5] [font-weight:700] [color:#FFFFFF] [text-wrap:pretty]"}>
              “Nggak perlu habiskan waktu & biaya buat trial and error. Belajar dari kesalahan dan pengalaman saya, biar iklanmu langsung terarah.”
            </blockquote>
          </div>
        </div>
      </section>
      <section className={"[background:linear-gradient(180deg,#F8F5EF_0%,#F2EDE3_100%)] [padding:clamp(56px,10vw,128px)_0]"} id="testimoni" data-screen-label="Testimoni">
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:40px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:20px] [max-width:800px]"}>
            <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F4F0E8)] [box-shadow:0_1px_0_#FFFFFF_inset,0_6px_16px_-10px_rgba(14,26,51,.35)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#1A4FA0]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_0_3px_rgba(194,101,15,.18)]"}></span>
              Hasil peserta
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [color:#0E1A33] [text-wrap:balance]"}>
              Mereka Sudah Mulai Dapat Chat & Orderan dari Iklannya Sendiri
            </h2>
            <p className={"[margin:0] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.6] [color:#55607A] [text-wrap:pretty]"}>
              Skincare, fashion, makanan, sampai bisnis jasa. Ini cerita dari peserta yang sudah praktek.
            </p>
          </div>
          <div className={"[display:flex] [flex-direction:column] [gap:18px]"}>
            <div className={"[display:flex] [align-items:center] [gap:14px]"}>
              <span className={"[white-space:nowrap] [font-size:12px] [font-weight:800] [letter-spacing:.16em] [text-transform:uppercase] [color:#0E1A33]"}>
                Dengar langsung dari alumni
              </span>
              <span className={"[flex:1_1_0] [min-width:16px] [height:1px] [background:rgba(14,26,51,.12)]"}></span>
              <span className={"[white-space:nowrap] [font-size:12.5px] [font-weight:700] [color:#7A8399]"}>
                Klik untuk putar
              </span>
            </div>
            <div className={"[display:grid] [grid-template-columns:minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,.62fr)] max-[719px]:[grid-template-columns:minmax(0,1.25fr)_minmax(0,1fr)] [grid-template-areas:\"a_b_d\"_\"a_c_d\"] max-[719px]:[grid-template-areas:\"a_a\"_\"b_d\"_\"c_d\"] [gap:clamp(12px,1.8vw,18px)]"}>
              {videos.map((v, idx) => (
                <Fragment key={idx}>
                <div className={`[position:relative] ${v.arCls} [min-height:0] [border-radius:18px] [overflow:hidden] [background:#0B1530] [box-shadow:0_18px_40px_-28px_rgba(14,26,51,.6)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-5px)] hover:[box-shadow:0_26px_50px_-24px_rgba(14,26,51,.45)]`} style={{ "gridArea": `${v.area}` }}>
                  {v.playing && (
                    <>
                    <iframe className={"[position:absolute] [inset:0] [width:100%] [height:100%] [border:0]"} src={v.embed} title={v.label} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen></iframe>
                    </>
                  )}
                  {v.idle && (
                    <>
                    <button className={"[position:absolute] [inset:0] [width:100%] [height:100%] [border:0] [padding:0] [cursor:pointer] [background:#0B1530]"} onClick={v.play}>
                      <span className={"[position:absolute] [inset:0] [background-size:cover] [background-position:center]"} role="img" aria-label={v.label} style={{ "backgroundImage": `${v.thumbBg}` }}></span>
                      <span className={"[position:absolute] [inset:0] [background:linear-gradient(180deg,rgba(11,21,48,0)_40%,rgba(11,21,48,.88)_100%)]"}></span>
                      <span className={"[position:absolute] [left:50%] [top:50%] [transform:translate(-50%,-50%)] [border-radius:50%] [background:rgba(255,255,255,.95)] [display:flex] [align-items:center] [justify-content:center] [box-shadow:0_0_0_8px_rgba(255,255,255,.18),0_12px_30px_-8px_rgba(0,0,0,.6)]"} style={{ "width": `${v.playSize}`, "height": `${v.playSize}` }}>
                        <span className={"[width:0] [height:0] [border-left:16px_solid_#C2650F] [border-top:10px_solid_transparent] [border-bottom:10px_solid_transparent] [margin-left:4px]"}></span>
                      </span>
                      <span className={"[position:absolute] [left:16px] [right:16px] [bottom:14px] [display:flex] [align-items:center] [gap:8px] [color:#FFFFFF] [font-size:13.5px] [font-weight:700] [text-align:left]"}>
                        <span className={"[flex-shrink:0] [padding:3px_8px] [border-radius:6px] [background:#C2650F] [font-size:10.5px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]"}>
                          {v.tag}
                        </span>
                        <span className={"[min-width:0] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
                          {v.label}
                        </span>
                      </span>
                    </button>
                    </>
                  )}
                </div>
                </Fragment>
              ))}
              <div className={`[position:relative] ${short.arCls} [min-height:0] [border-radius:18px] [overflow:hidden] [background:#0B1530] [box-shadow:0_18px_40px_-28px_rgba(14,26,51,.6)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-5px)] hover:[box-shadow:0_26px_50px_-24px_rgba(14,26,51,.45)]`} style={{ "gridArea": `${short.area}` }}>
                {short.playing && (
                  <>
                  <iframe className={"[position:absolute] [inset:0] [width:100%] [height:100%] [border:0]"} src={short.embed} title={short.label} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen></iframe>
                  </>
                )}
                {short.idle && (
                  <>
                  <button className={"[position:absolute] [inset:0] [width:100%] [height:100%] [border:0] [padding:0] [cursor:pointer] [background:#0B1530]"} onClick={short.play}>
                    <span className={"[position:absolute] [inset:0] [background-size:cover] [background-position:center]"} role="img" aria-label={short.label} style={{ "backgroundImage": `${short.thumbBg}` }}></span>
                    <span className={"[position:absolute] [inset:0] [background:linear-gradient(180deg,rgba(11,21,48,0)_40%,rgba(11,21,48,.88)_100%)]"}></span>
                    <span className={"[position:absolute] [left:50%] [top:50%] [transform:translate(-50%,-50%)] [border-radius:50%] [background:rgba(255,255,255,.95)] [display:flex] [align-items:center] [justify-content:center] [box-shadow:0_0_0_8px_rgba(255,255,255,.18),0_12px_30px_-8px_rgba(0,0,0,.6)]"} style={{ "width": `${short.playSize}`, "height": `${short.playSize}` }}>
                      <span className={"[width:0] [height:0] [border-left:16px_solid_#C2650F] [border-top:10px_solid_transparent] [border-bottom:10px_solid_transparent] [margin-left:4px]"}></span>
                    </span>
                    <span className={"[position:absolute] [left:16px] [right:16px] [bottom:14px] [display:flex] [align-items:center] [gap:8px] [color:#FFFFFF] [font-size:13.5px] [font-weight:700] [text-align:left]"}>
                      <span className={"[flex-shrink:0] [padding:3px_8px] [border-radius:6px] [background:#C2650F] [font-size:10.5px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]"}>
                        {short.tag}
                      </span>
                      <span className={"[min-width:0] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
                        {short.label}
                      </span>
                    </span>
                  </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={"[display:flex] [flex-direction:column] [gap:18px]"}>
            <div className={"[display:flex] [align-items:center] [gap:14px]"}>
              <span className={"[white-space:nowrap] [font-size:12px] [font-weight:800] [letter-spacing:.16em] [text-transform:uppercase] [color:#0E1A33]"}>
                Bukti chat & hasil iklan
              </span>
              <span className={"[flex:1_1_0] [min-width:16px] [height:1px] [background:rgba(14,26,51,.12)]"}></span>
              <span className={"[white-space:nowrap] [font-size:12.5px] [font-weight:700] [color:#7A8399]"}>
                Klik untuk perbesar
              </span>
            </div>
            <div className={"[display:grid] [grid-template-columns:repeat(3,minmax(0,1fr))] max-[719px]:[grid-template-columns:repeat(2,minmax(0,1fr))] [gap:clamp(12px,1.8vw,18px)]"}>
              {shots.map((sh, idx) => (
                <Fragment key={idx}>
                <button className={"[display:flex] [flex-direction:column] [padding:0] [border:1px_solid_rgba(14,26,51,.09)] [border-radius:18px] [overflow:hidden] [background:#FFFFFF] [cursor:zoom-in] [text-align:left] [box-shadow:0_14px_34px_-28px_rgba(14,26,51,.55)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-5px)] hover:[box-shadow:0_26px_50px_-26px_rgba(14,26,51,.45)]"} onClick={sh.open}>
                  <span className={"[position:relative] [display:block] [aspect-ratio:4/5] [background:#0B1530] [overflow:hidden]"}>
                    <img className={"[position:absolute] [inset:0] [width:100%] [height:100%] [object-fit:cover] [object-position:center_top] [display:block]"} src={sh.src} alt={sh.cap} loading="lazy" />
                    <span className={"[position:absolute] [left:0] [right:0] [bottom:0] [height:40%] [background:linear-gradient(180deg,rgba(255,255,255,0),#FFFFFF)]"}></span>
                  </span>
                  <span className={"[display:grid] [grid-template-columns:28px_minmax(0,1fr)] [gap:10px] [align-items:center] [padding:4px_16px_16px]"}>
                    <span className={"[width:28px] [height:28px] [border-radius:50%] [background:rgba(18,140,74,.12)] [color:#128C4A] [display:flex] [align-items:center] [justify-content:center] [font-size:13px] [font-weight:900]"}>
                      ✓
                    </span>
                    <span className={"[display:flex] [flex-direction:column] [gap:2px] [min-width:0]"}>
                      <span className={"[font-size:14.5px] [font-weight:800] [line-height:1.3] [color:#0E1A33]"}>
                        {sh.cap}
                      </span>
                      <span className={"[font-size:12.5px] [color:#7A8399] [font-weight:600]"}>
                        {sh.src2}
                      </span>
                    </span>
                  </span>
                </button>
                </Fragment>
              ))}
            </div>
          </div>
          {lbOpen && (
            <>
            <div className={"[position:fixed] [inset:0] [z-index:80] [background:rgba(7,14,36,.9)] [backdrop-filter:blur(6px)] [display:flex] [align-items:center] [justify-content:center] [padding:24px] [cursor:zoom-out]"} onClick={lbClose}>
               {lbImg} 
              <span className={"[position:absolute] [top:18px] [right:20px] [width:44px] [height:44px] [border-radius:50%] [background:rgba(255,255,255,.12)] [color:#FFFFFF] [display:flex] [align-items:center] [justify-content:center] [font-size:22px]"}>
                ✕
              </span>
            </div>
            </>
          )}
        </div>
      </section>
      <section className={"[position:relative] [background:radial-gradient(120%_70%_at_50%_0%,#14245A_0%,#0B1530_50%,#070E24_100%)] [color:#FFFFFF] [padding:clamp(56px,10vw,128px)_0] [overflow:hidden]"} data-screen-label="Yang didapat">
        <div className={"[position:absolute] [left:0] [right:0] [top:0] [height:1px] [background:linear-gradient(90deg,transparent,rgba(217,133,47,.55),transparent)] [pointer-events:none]"} aria-hidden="true"></div>
        <div className={"[position:absolute] [inset:0] [background:radial-gradient(40%_50%_at_15%_80%,rgba(194,101,15,.12),transparent_70%)] [pointer-events:none]"}></div>
        <div className={"[position:relative] [max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:56px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:32px]"}>
            <div className={"[display:flex] [flex-direction:column] [gap:20px] [max-width:760px]"}>
              <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(242,182,124,.32)] [background:linear-gradient(180deg,rgba(194,101,15,.14),rgba(194,101,15,.03))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [backdrop-filter:blur(6px)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#E8B068]"}>
                <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_10px_2px_rgba(194,101,15,.7)]"}></span>
                Kelas selesai
              </span>
              <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [text-wrap:balance] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
                Yang Kamu Dapat Setelah Kelas
              </h2>
            </div>
            <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))] [gap:14px]"}>
              {included.map((it, idx) => (
                <Fragment key={idx}>
                <div className={"[border-radius:18px] [border:1px_solid_rgba(255,255,255,.1)] [background:linear-gradient(160deg,rgba(255,255,255,.08)_0%,rgba(255,255,255,.02)_45%,rgba(255,255,255,.01)_100%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.09),0_20px_40px_-30px_rgba(0,0,0,.8)] [padding:22px] [display:flex] [flex-direction:column] [gap:14px] [transition:transform_.25s_ease,box-shadow_.25s_ease,border-color_.25s_ease] hover:[transform:translateY(-5px)] hover:[box-shadow:0_24px_50px_-20px_rgba(0,0,0,.75)] hover:[border-color:rgba(194,101,15,.5)]"}>
                  <div className={"[display:flex] [align-items:center] [justify-content:space-between]"}>
                    <span className={"[width:46px] [height:46px] [border-radius:12px] [background:linear-gradient(145deg,rgba(194,101,15,.28),rgba(194,101,15,.06))] [border:1px_solid_rgba(217,133,47,.28)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.12)] [display:flex] [align-items:center] [justify-content:center]"}>
                      <span className={"[width:22px] [height:22px] [background:#C2650F]"} style={{ "WebkitMask": `${it.mask}`, "mask": `${it.mask}` }}></span>
                    </span>
                    <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:40px] [line-height:1] [color:rgba(255,255,255,.08)]"}>
                      {it.num}
                    </span>
                  </div>
                  <span className={"[font-weight:800] [font-size:16px] [line-height:1.3]"}>
                    {it.t}
                  </span>
                  <span className={"[font-size:13.5px] [line-height:1.55] [color:rgba(255,255,255,.62)]"}>
                    {it.d}
                  </span>
                </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={"[background:linear-gradient(180deg,#F8F5EF_0%,#F2EDE3_100%)] [padding:clamp(56px,9vw,112px)_0]"} data-screen-label="Bonus">
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)]"}>
          <div className={"[border-radius:28px] [background:radial-gradient(80%_120%_at_100%_0%,#2457B8_0%,#1A4FA0_40%,#0F2F6B_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.12)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.15),0_30px_60px_-36px_rgba(15,47,107,.8)] [padding:clamp(24px,4vw,48px)] [display:flex] [flex-direction:column] [gap:28px] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-6px)] hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,.15),0_30px_60px_-24px_rgba(15,47,107,.85)]"}>
            <div className={"[display:flex] [flex-wrap:wrap] [align-items:flex-end] [justify-content:space-between] [gap:12px_32px]"}>
              <div className={"[display:flex] [flex-direction:column] [gap:10px]"}>
                <span className={"[font-size:12px] [font-weight:800] [letter-spacing:.14em] [text-transform:uppercase] [color:#E8B068]"}>
                  Bonus peserta
                </span>
                <h3 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(34px,4.4vw,52px)] [line-height:.98] [margin:0]"}>
                  Plus 4 Bonus Ini
                </h3>
              </div>
              <p className={"[margin:0] [max-width:380px] [font-size:15px] [line-height:1.55] [color:rgba(255,255,255,.8)]"}>
                Tambahan supaya kamu bisa langsung jalan setelah kelas.
              </p>
            </div>
            <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))] [gap:12px]"}>
              {bonus.map((bn, idx) => (
                <Fragment key={idx}>
                <div className={"[display:grid] [grid-template-columns:44px_1fr] [gap:14px] [align-items:center] [padding:16px] [border-radius:16px] [background:rgba(255,255,255,.08)] [border:1px_solid_rgba(255,255,255,.16)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.1)]"}>
                  <span className={"[width:44px] [height:44px] [border-radius:12px] [background:#0B1530] [display:flex] [align-items:center] [justify-content:center]"}>
                    <span className={"[width:22px] [height:22px] [background:#C2650F]"} style={{ "WebkitMask": `${bn.mask}`, "mask": `${bn.mask}` }}></span>
                  </span>
                  <span className={"[display:flex] [flex-direction:column] [gap:2px]"}>
                    <span className={"[font-weight:800] [font-size:15px] [color:#FFFFFF]"}>
                      {bn.t}
                    </span>
                    <span className={"[font-size:13px] [line-height:1.45] [color:rgba(255,255,255,.75)]"}>
                      {bn.d}
                    </span>
                  </span>
                </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={"[background:radial-gradient(90%_60%_at_50%_0%,#FFFFFF_0%,#FBF9F4_100%)] [padding:clamp(56px,10vw,128px)_0]"} data-screen-label="Tempat">
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:grid] [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] max-[979px]:[grid-template-columns:minmax(0,1fr)] [grid-template-areas:\"photo_head\"_\"photo_body\"] max-[979px]:[grid-template-areas:\"head\"_\"photo\"_\"body\"] [column-gap:clamp(32px,5vw,64px)] [row-gap:22px] max-[979px]:[row-gap:24px] [align-items:center]"}>
          <div className={"[grid-area:photo] [position:relative] [aspect-ratio:4/3] [border-radius:24px] [overflow:hidden] [background:#EFEBE3] [box-shadow:0_0_0_1px_rgba(14,26,51,.06),0_0_0_8px_rgba(255,255,255,.7),0_44px_80px_-40px_rgba(14,26,51,.65)]"}>
            <img className={"[position:absolute] [inset:0] [width:100%] [height:100%] [object-fit:cover] [object-position:center_78%] [display:block]"} src="/assets/hotel-bintang4.webp" alt="Hotel bintang 4 tempat kelas Adspreneur" />
          </div>
          <div className={"[grid-area:head] [align-self:end] [display:flex] [flex-direction:column] [gap:22px]"}>
            <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F4F0E8)] [box-shadow:0_1px_0_#FFFFFF_inset,0_6px_16px_-10px_rgba(14,26,51,.35)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#1A4FA0]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_0_3px_rgba(194,101,15,.18)]"}></span>
              Tempat & fasilitas
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5vw,60px)] [line-height:.98] [margin:0] [color:#0E1A33] [text-wrap:balance]"}>
              Hotel Bintang 
              <span className={"[display:inline-flex] [align-items:center] [gap:.08em] [vertical-align:.04em] [filter:drop-shadow(0_2px_6px_rgba(194,101,15,.45))]"} aria-label="4">
                <span className={"[display:inline-block] [width:.72em] [height:.72em] [background:linear-gradient(180deg,#F2BE78,#C2650F)] [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"}></span>
                <span className={"[display:inline-block] [width:.72em] [height:.72em] [background:linear-gradient(180deg,#F2BE78,#C2650F)] [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"}></span>
                <span className={"[display:inline-block] [width:.72em] [height:.72em] [background:linear-gradient(180deg,#F2BE78,#C2650F)] [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"}></span>
                <span className={"[display:inline-block] [width:.72em] [height:.72em] [background:linear-gradient(180deg,#F2BE78,#C2650F)] [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"}></span>
              </span>
            </h2>
          </div>
          <div className={"[grid-area:body] [align-self:start] [display:flex] [flex-direction:column] [gap:22px]"}>
            <div className={"[display:flex] [flex-wrap:wrap] [gap:10px]"}>
              <span className={"[display:inline-flex] [align-items:center] [gap:8px] [padding:10px_14px] [border-radius:12px] [background:linear-gradient(160deg,#1A3170,#0B1530)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.12),0_10px_24px_-14px_rgba(11,21,48,.8)] [color:#FFFFFF] [font-size:14px] [font-weight:700]"}>
                <span className={"[width:16px] [height:16px] [background:#C2650F] [-webkit-mask:url(https://unpkg.com/lucide-static@0.460.0/icons/clock.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/clock.svg)_center/contain_no-repeat]"}></span>
                08.00 – 17.00 WIB
              </span>
            </div>
            <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))] [gap:10px]"}>
              {facilities.map((f, idx) => (
                <Fragment key={idx}>
                <div className={"[display:flex] [align-items:center] [gap:12px] [padding:14px_16px] [border-radius:14px] [border:1px_solid_rgba(14,26,51,.1)] [background:linear-gradient(180deg,#FFFFFF,#F7F4EE)] [box-shadow:inset_0_1px_0_#FFFFFF,0_10px_24px_-20px_rgba(14,26,51,.45)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-4px)] hover:[box-shadow:0_18px_36px_-22px_rgba(14,26,51,.4)]"}>
                  <span className={"[width:20px] [height:20px] [flex-shrink:0] [background:#C2650F]"} style={{ "WebkitMask": `${f.mask}`, "mask": `${f.mask}` }}></span>
                  <span className={"[font-size:14.5px] [font-weight:700] [color:#0E1A33] [line-height:1.35]"}>
                    {f.t}
                  </span>
                </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={"[position:relative] [background:radial-gradient(120%_70%_at_50%_0%,#14245A_0%,#0B1530_50%,#070E24_100%)] [color:#FFFFFF] [padding:clamp(56px,10vw,128px)_0] [overflow:hidden]"} id="harga" data-screen-label="Harga">
        <div className={"[position:absolute] [left:0] [right:0] [top:0] [height:1px] [background:linear-gradient(90deg,transparent,rgba(217,133,47,.55),transparent)] [pointer-events:none]"} aria-hidden="true"></div>
        <div className={"[position:absolute] [inset:0] [background:radial-gradient(40%_50%_at_50%_40%,rgba(194,101,15,.12),transparent_70%)] [pointer-events:none]"}></div>
        <div className={"[position:relative] [max-width:1080px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:40px]"}>
          <div className={"[display:flex] [flex-wrap:wrap] [align-items:center] [justify-content:center] [gap:10px_20px] [padding:16px_22px] [border-radius:16px] [border:1px_solid_rgba(255,107,94,.45)] [background:linear-gradient(90deg,rgba(255,107,94,.04),rgba(255,107,94,.14)_50%,rgba(255,107,94,.04))] [box-shadow:0_0_40px_-12px_rgba(255,107,94,.45),inset_0_1px_0_rgba(255,255,255,.06)] [text-align:center]"} data-screen-label="Urgency">
            <span className={"[display:inline-flex] [align-items:center] [gap:8px] [font-size:12px] [font-weight:800] [letter-spacing:.14em] [text-transform:uppercase] [color:#FF6B5E]"}>
              <span className={"[width:8px] [height:8px] [border-radius:50%] [background:#FF6B5E]"}></span>
              Kuota terbatas
            </span>
            <span className={"[font-size:15px] [font-weight:700] [color:#FFFFFF]"}>
              Hanya 20–30 peserta per kelas · Special promo untuk 5 pendaftar pertama
            </span>
          </div>
          <div className={"[display:flex] [flex-direction:column] [gap:16px] [align-items:center] [text-align:center]"}>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(40px,6vw,68px)] [line-height:.96] [margin:0] [text-wrap:balance] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
              Investasi Terbaik untuk Bisnismu
            </h2>
            <p className={"[margin:0] [font-size:16px] [line-height:1.6] [color:rgba(255,255,255,.7)]"}>
              Kalau belajar terpisah, segini biaya masing-masing materinya.
            </p>
          </div>
          <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))] [gap:24px] [align-items:stretch]"}>
            <div className={"[border-radius:24px] [border:1px_solid_rgba(255,255,255,.1)] [background:linear-gradient(160deg,rgba(255,255,255,.07)_0%,rgba(255,255,255,.015)_60%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [padding:clamp(24px,3vw,36px)] [display:flex] [flex-direction:column] [gap:6px] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-6px)] hover:[box-shadow:0_24px_50px_-20px_rgba(0,0,0,.75)]"}>
              <span className={"[font-size:12px] [font-weight:700] [letter-spacing:.14em] [text-transform:uppercase] [color:#DC9550] [margin-bottom:10px]"}>
                Nilai materi kelas offline
              </span>
              {valueStack.map((v, idx) => (
                <Fragment key={idx}>
                <div className={"[display:flex] [justify-content:space-between] [align-items:baseline] [gap:16px] [padding:16px_0] [border-bottom:1px_dashed_rgba(255,255,255,.16)]"}>
                  <span className={"[font-size:15.5px] [font-weight:600] [color:rgba(255,255,255,.88)]"}>
                    {v.t}
                  </span>
                  <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:700] [font-size:22px] [white-space:nowrap]"}>
                    {v.p}
                  </span>
                </div>
                </Fragment>
              ))}
              <div className={"[display:flex] [justify-content:space-between] [align-items:baseline] [gap:16px] [padding:18px_0_0]"}>
                <span className={"[font-size:15.5px] [font-weight:800]"}>
                  Total harga normal
                </span>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:28px] [white-space:nowrap] [color:rgba(255,255,255,.55)] [text-decoration:line-through] [text-decoration-color:rgba(240,81,79,.9)] [text-decoration-thickness:2px]"}>
                  Rp 8.000.000
                </span>
              </div>
            </div>
            <div className={"[position:relative] [border-radius:24px] [border:1.5px_solid_rgba(217,133,47,.75)] [background:linear-gradient(165deg,rgba(194,101,15,.2)_0%,rgba(194,101,15,.05)_40%,rgba(255,255,255,.02)_100%)] [padding:40px_clamp(24px,3vw,36px)_30px] [display:flex] [flex-direction:column] [gap:22px] [box-shadow:0_0_60px_-20px_rgba(194,101,15,.55)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-6px)] hover:[box-shadow:0_0_80px_-16px_rgba(194,101,15,.7)]"}>
              <span className={"[position:absolute] [top:-14px] [left:24px] [padding:7px_14px] [border-radius:999px] [background:#C2650F] [color:#0B1530] [font-size:11px] [font-weight:800] [letter-spacing:.1em] [text-transform:uppercase]"}>
                Paket lengkap 2 hari
              </span>
              <div className={"[display:flex] [flex-direction:column] [gap:8px]"}>
                <span className={"[font-size:15px] [font-weight:700] [color:rgba(255,255,255,.75)]"}>
                  Tapi kamu cukup investasi:
                </span>
                <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(46px,5vw,60px)] [line-height:1]"}>
                  Rp 1.950.000
                </span>
                <span className={"[display:inline-flex] [align-items:center] [gap:8px] [align-self:flex-start] [padding:7px_12px] [border-radius:10px] [background:rgba(255,107,94,.12)] [border:1px_solid_rgba(255,107,94,.4)] [font-size:13.5px] [font-weight:700] [color:#FFD2CC] [line-height:1.4]"}>
                  <span className={"[width:7px] [height:7px] [flex-shrink:0] [border-radius:50%] [background:#FF6B5E] [box-shadow:0_0_8px_1px_rgba(255,107,94,.8)]"}></span>
                  Hanya untuk 5 pendaftar pertama. Selanjutnya kembali ke harga normal.
                </span>
              </div>
              <div className={"[display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))] [gap:12px_16px]"}>
                {priceIncl.map((pi, idx) => (
                  <Fragment key={idx}>
                  <div className={"[display:grid] [grid-template-columns:20px_1fr] [gap:10px] [align-items:start]"}>
                    <span className={"[width:18px] [height:18px] [margin-top:2px] [border-radius:50%] [background:#C2650F] [color:#0B1530] [display:flex] [align-items:center] [justify-content:center] [font-size:11px] [font-weight:900]"}>
                      ✓
                    </span>
                    <span className={"[font-weight:700] [font-size:15px] [line-height:1.4]"}>
                      {pi}
                    </span>
                  </div>
                  </Fragment>
                ))}
              </div>
              <a className={"[margin-top:auto] [display:flex] [justify-content:center] [align-items:center] [gap:10px] [padding:19px_24px] [border-radius:999px] [background:linear-gradient(180deg,#1BAA5D_0%,#118A48_55%,#0C743C_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.14)] [text-shadow:0_1px_0_rgba(0,0,0,.18)] [letter-spacing:.01em] [font-weight:800] [font-size:16px] [box-shadow:0_16px_40px_-12px_rgba(18,140,74,.75),inset_0_1px_0_rgba(255,255,255,.28)] hover:[background:linear-gradient(180deg,#22BD69_0%,#14994F_55%,#0E8044_100%)] hover:[color:#FFFFFF]"} href="#daftar">
                <img className={"[width:20px] [height:20px] [display:block]"} src="https://cdn.simpleicons.org/whatsapp/white" alt="" />
                Daftar Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className={"[position:relative] [background:#08112A] [color:#FFFFFF] [padding:clamp(56px,9vw,112px)_0] [border-top:1px_solid_rgba(255,255,255,.06)]"} id="daftar" data-screen-label="Pilih kota">
        <div className={"[max-width:1080px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:36px]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:16px] [align-items:center] [text-align:center]"}>
            <span className={"[display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(242,182,124,.32)] [background:linear-gradient(180deg,rgba(194,101,15,.14),rgba(194,101,15,.03))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [backdrop-filter:blur(6px)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#E8B068]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_10px_2px_rgba(194,101,15,.7)]"}></span>
              Daftar sekarang
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(40px,6vw,64px)] [line-height:.96] [margin:0] [text-wrap:balance] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
              Pilih Kota Kelasmu
            </h2>
            <p className={"[margin:0] [max-width:520px] [font-size:16px] [line-height:1.6] [color:rgba(255,255,255,.7)] [text-wrap:pretty]"}>
              Klik kota tujuanmu, kamu langsung terhubung ke admin WhatsApp kota tersebut.
            </p>
          </div>
          <div className={"[position:relative] [max-width:760px] [width:100%] [margin:0_auto] [display:flex] [flex-direction:column] [gap:18px] [padding-left:44px]"}>
            <div className={"[position:absolute] [left:13px] [top:28px] [bottom:28px] [width:2px] [background:linear-gradient(180deg,#C2650F,rgba(194,101,15,.15))]"}></div>
            {cities.map((c, idx) => (
              <Fragment key={idx}>
              <div className={"[position:relative]"}>
                <span className={"[position:absolute] [left:-44px] [top:24px] [width:28px] [height:28px] [border-radius:50%] [background:#08112A] [border:2.5px_solid_#C2650F] [box-shadow:0_0_0_5px_rgba(194,101,15,.14)]"}></span>
                <div className={"[border-radius:20px] [background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.015)_60%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08),0_20px_44px_-30px_rgba(0,0,0,.8)] [padding:22px_clamp(18px,3vw,26px)] [display:grid] [grid-template-columns:minmax(0,1fr)_230px] max-[719px]:[grid-template-columns:minmax(0,1fr)] [align-items:center] [justify-content:normal] [gap:18px_24px] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-5px)] hover:[box-shadow:0_24px_50px_-20px_rgba(0,0,0,.75)]"} style={{ "border": `1.5px solid ${c.border}` }}>
                  <div className={"[display:flex] [flex-direction:column] [gap:8px] [min-width:0]"}>
                    <div className={"[display:flex] [align-items:center] [gap:10px] [flex-wrap:wrap]"}>
                      <span className={"[font-size:11.5px] [font-weight:800] [letter-spacing:.16em] [text-transform:uppercase] [color:rgba(255,255,255,.55)]"}>
                        Stop {c.stop}
                      </span>
                      <span className={"[padding:4px_10px] [border-radius:999px] [font-size:11px] [font-weight:800] [white-space:nowrap]"} style={{ "background": `${c.pillBg}`, "color": `${c.pillColor}` }}>
                        {c.status}
                      </span>
                    </div>
                    <span className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:34px] [line-height:1] [text-transform:uppercase]"}>
                      {c.city}
                    </span>
                    <span className={"[display:flex] [align-items:center] [gap:8px] [font-size:14.5px] [color:rgba(255,255,255,.78)]"}>
                      <span className={"[width:15px] [height:15px] [flex-shrink:0] [background:#C2650F] [-webkit-mask:url(https://unpkg.com/lucide-static@0.460.0/icons/calendar-days.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/calendar-days.svg)_center/contain_no-repeat]"}></span>
                      {c.date}
                    </span>
                    <span className={"[display:flex] [align-items:center] [gap:8px] [font-size:14.5px] [color:rgba(255,255,255,.78)]"}>
                      <span className={"[width:15px] [height:15px] [flex-shrink:0] [background:#C2650F] [-webkit-mask:url(https://unpkg.com/lucide-static@0.460.0/icons/map-pin.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/map-pin.svg)_center/contain_no-repeat]"}></span>
                      {c.venue}
                    </span>
                  </div>
                  <a className={"[width:100%] [white-space:nowrap] [display:flex] [justify-content:center] [align-items:center] [gap:10px] [padding:15px_20px] [border-radius:12px] [background:linear-gradient(180deg,#1BAA5D_0%,#118A48_55%,#0C743C_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.14)] [text-shadow:0_1px_0_rgba(0,0,0,.18)] [letter-spacing:.01em] [font-weight:800] [font-size:15px] [box-shadow:0_12px_28px_-12px_rgba(18,140,74,.8)] hover:[background:linear-gradient(180deg,#22BD69_0%,#14994F_55%,#0E8044_100%)] hover:[color:#FFFFFF]"} href={c.href} target="_blank" rel="noopener">
                    <img className={"[width:18px] [height:18px] [display:block]"} src="https://cdn.simpleicons.org/whatsapp/white" alt="" />
                    Daftar kota ini
                  </a>
                </div>
              </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className={"[position:relative] [background:radial-gradient(120%_70%_at_50%_0%,#14245A_0%,#0B1530_50%,#070E24_100%)] [color:#FFFFFF] [padding:clamp(56px,9vw,112px)_0] [overflow:hidden]"} data-screen-label="Grup komunitas">
        <div className={"[position:absolute] [left:0] [right:0] [top:0] [height:1px] [background:linear-gradient(90deg,transparent,rgba(217,133,47,.55),transparent)] [pointer-events:none]"} aria-hidden="true"></div>
        <div className={"[position:absolute] [inset:0] [background:radial-gradient(40%_50%_at_75%_55%,rgba(18,140,74,.18),transparent_70%)] [pointer-events:none]"}></div>
        <div className={"[position:relative] [max-width:1100px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:grid] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))] [gap:clamp(40px,6vw,80px)] [align-items:center]"}>
          <div className={"[display:flex] [flex-direction:column] [gap:20px]"}>
            <span className={"[align-self:flex-start] [display:inline-flex] [align-items:center] [gap:10px] [padding:7px_14px] [border-radius:999px] [border:1px_solid_rgba(242,182,124,.32)] [background:linear-gradient(180deg,rgba(194,101,15,.14),rgba(194,101,15,.03))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.08)] [backdrop-filter:blur(6px)] [font-size:11.5px] [font-weight:800] [letter-spacing:.18em] [text-transform:uppercase] [color:#E8B068]"}>
              <span className={"[width:7px] [height:7px] [border-radius:50%] [background:#C2650F] [box-shadow:0_0_10px_2px_rgba(194,101,15,.7)]"}></span>
              Mulai sebelum hari-H
            </span>
            <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [text-wrap:balance] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
              Begitu Daftar, Kamu Langsung Masuk 
              <span className={"[color:#DE8A2E]"}>
                Grup Peserta
              </span>
            </h2>
            <p className={"[margin:0] [font-size:clamp(15px,1.5vw,17px)] [line-height:1.6] [color:rgba(255,255,255,.72)] [max-width:520px] [text-wrap:pretty]"}>
              Nggak perlu nunggu hari kelas. Siapkan akun dan materi dari sekarang, dipandu admin & coach.
            </p>
          </div>
          <div className={"[display:flex] [justify-content:center]"}>
            <div className={"[width:min(270px,66vw)] [aspect-ratio:9/18] [border-radius:38px] [padding:9px] [background:#1A2340] [border:1px_solid_rgba(255,255,255,.14)] [box-shadow:0_40px_80px_-30px_rgba(0,0,0,.9),0_0_70px_-20px_rgba(18,140,74,.45)] [transform:rotate(-3deg)] [transition:transform_.3s_ease] hover:[transform:rotate(0deg)_translateY(-6px)]"}>
              <div className={"[position:relative] [width:100%] [height:100%] [border-radius:36px] [overflow:hidden] [background:#EFE7DD] [display:flex] [flex-direction:column]"}>
                <div className={"[background:#0B1530] [padding:11px_13px_10px] [display:flex] [flex-direction:column] [gap:8px]"}>
                  <div className={"[display:flex] [justify-content:space-between] [align-items:center] [font-size:12px] [font-weight:700] [color:#FFFFFF]"}>
                    <span>
                      08.00
                    </span>
                    <span className={"[width:84px] [height:22px] [border-radius:999px] [background:#000000]"}></span>
                    <span className={"[font-size:11px]"}>
                      5G ▮
                    </span>
                  </div>
                  <div className={"[display:flex] [align-items:center] [gap:10px]"}>
                    <span className={"[font-size:20px] [color:#FFFFFF]"}>
                      ‹
                    </span>
                    <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#FFFFFF] [display:flex] [align-items:center] [justify-content:center] [overflow:hidden] [flex-shrink:0]"}>
                      <img className={"[width:24px] [height:auto] [filter:invert(1)]"} src="/assets/logo-v-white.webp" alt="" />
                    </span>
                    <span className={"[display:flex] [flex-direction:column] [gap:1px] [min-width:0]"}>
                      <span className={"[font-size:13px] [font-weight:800] [color:#FFFFFF] [white-space:nowrap] [overflow:hidden] [text-overflow:ellipsis]"}>
                        Peserta Adspreneur Bandung
                      </span>
                      <span className={"[font-size:10.5px] [color:rgba(255,255,255,.7)]"}>
                        298 anggota
                      </span>
                    </span>
                  </div>
                </div>
                <div className={"[flex:1] [padding:10px_10px] [display:flex] [flex-direction:column] [gap:6px] [overflow:hidden]"}>
                  <span className={"[align-self:center] [padding:4px_10px] [border-radius:8px] [background:#FFFFFF] [font-size:11px] [font-weight:700] [color:#54656F]"}>
                    Hari ini
                  </span>
                  <div className={"[align-self:flex-start] [max-width:82%] [background:#FFFFFF] [border-radius:4px_12px_12px_12px] [padding:6px_9px_5px] [box-shadow:0_1px_1px_rgba(0,0,0,.12)] [display:flex] [flex-direction:column] [gap:2px]"}>
                    <span className={"[font-size:10.5px] [font-weight:800] [color:#1A4FA0]"}>
                      Admin Adspreneur
                    </span>
                    <span className={"[font-size:11.5px] [line-height:1.35] [color:#111B21]"}>
                      Selamat datang di grup peserta! Checklist persiapan akun Facebook & Instagram Ads sudah kami kirim ya 🙌
                    </span>
                    <span className={"[align-self:flex-end] [font-size:9px] [color:#667781]"}>
                      08.02
                    </span>
                  </div>
                  <div className={"[align-self:flex-end] [max-width:82%] [background:#D9FDD3] [border-radius:12px_4px_12px_12px] [padding:6px_9px_5px] [box-shadow:0_1px_1px_rgba(0,0,0,.12)] [display:flex] [flex-direction:column] [gap:2px]"}>
                    <span className={"[font-size:11.5px] [line-height:1.35] [color:#111B21]"}>
                      Siap kak, Business Manager-ku udah jadi 👍
                    </span>
                    <span className={"[align-self:flex-end] [font-size:9px] [color:#667781]"}>
                      08.05 
                      <span className={"[color:#53BDEB]"}>
                        ✓✓
                      </span>
                    </span>
                  </div>
                  <div className={"[align-self:flex-start] [max-width:82%] [background:#FFFFFF] [border-radius:4px_12px_12px_12px] [padding:6px_9px_5px] [box-shadow:0_1px_1px_rgba(0,0,0,.12)] [display:flex] [flex-direction:column] [gap:2px]"}>
                    <span className={"[font-size:10.5px] [font-weight:800] [color:#1A4FA0]"}>
                      Admin Adspreneur
                    </span>
                    <span className={"[font-size:11.5px] [line-height:1.35] [color:#111B21]"}>
                      Mantap! Reminder: kelas mulai Sabtu, 31 Okt jam 08.00 di Hotel Grand Asrilia.
                    </span>
                    <span className={"[align-self:flex-end] [font-size:9px] [color:#667781]"}>
                      08.06
                    </span>
                  </div>
                  <div className={"[align-self:flex-end] [max-width:82%] [background:#D9FDD3] [border-radius:12px_4px_12px_12px] [padding:6px_9px_5px] [box-shadow:0_1px_1px_rgba(0,0,0,.12)] [display:flex] [flex-direction:column] [gap:2px]"}>
                    <span className={"[font-size:11.5px] [line-height:1.35] [color:#111B21]"}>
                      Noted! Nggak sabar praktek bareng 🔥
                    </span>
                    <span className={"[align-self:flex-end] [font-size:9px] [color:#667781]"}>
                      08.07 
                      <span className={"[color:#53BDEB]"}>
                        ✓✓
                      </span>
                    </span>
                  </div>
                </div>
                <div className={"[display:flex] [align-items:center] [gap:8px] [padding:8px_10px_12px] [background:#F0F2F5]"}>
                  <span className={"[flex:1] [padding:7px_12px] [border-radius:999px] [background:#FFFFFF] [font-size:11px] [color:#8696A0]"}>
                    Ketik pesan
                  </span>
                  <span className={"[width:30px] [height:30px] [border-radius:50%] [background:#128C4A] [display:flex] [align-items:center] [justify-content:center]"}>
                    <span className={"[width:16px] [height:16px] [background:#FFFFFF] [-webkit-mask:url(https://unpkg.com/lucide-static@0.460.0/icons/mic.svg)_center/contain_no-repeat] [mask:url(https://unpkg.com/lucide-static@0.460.0/icons/mic.svg)_center/contain_no-repeat]"}></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"[background:radial-gradient(90%_60%_at_50%_0%,#FFFFFF_0%,#FBF9F4_100%)] [padding:clamp(56px,10vw,128px)_0]"} data-screen-label="FAQ">
        <div className={"[max-width:860px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:40px]"}>
          <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(38px,5.4vw,64px)] [line-height:.96] [letter-spacing:-0.012em] [margin:0] [color:#0E1A33] [text-align:center] [text-wrap:balance]"}>
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <div className={"[display:flex] [flex-direction:column] [gap:10px]"}>
            {faqs.map((f, idx) => (
              <Fragment key={idx}>
              <div className={"[border-radius:16px] [border:1px_solid_rgba(14,26,51,.08)] [background:linear-gradient(180deg,#FFFFFF,#FBF9F5)] [box-shadow:inset_0_1px_0_#FFFFFF,0_12px_28px_-24px_rgba(14,26,51,.5)] [padding:0_clamp(16px,2.4vw,24px)] [transition:box-shadow_.25s_ease] hover:[box-shadow:inset_0_1px_0_#FFFFFF,0_18px_40px_-24px_rgba(14,26,51,.45)]"}>
                <button className={"[width:100%] [display:grid] [grid-template-columns:1fr_32px] [gap:16px] [align-items:center] [padding:20px_0] [background:transparent] [border:0] [cursor:pointer] [text-align:left] [color:#0E1A33] [font-size:17px] [font-weight:700] [line-height:1.4]"} onClick={f.toggle}>
                  <span>
                    {f.q}
                  </span>
                  <span className={"[width:32px] [height:32px] [border-radius:50%] [display:flex] [align-items:center] [justify-content:center] [font-size:20px] [line-height:1]"} style={{ "background": `${f.signBg}`, "color": `${f.signColor}` }}>
                    {f.sign}
                  </span>
                </button>
                {f.open && (
                  <>
                  <div className={"[padding:0_8px_22px_0] [font-size:clamp(15px,1.4vw,16px)] [line-height:1.65] [color:#3B4660]"}>
                    {f.todo && (
                      <>
                      <span className={"[background:#FFE45C] [color:#0E1A33] [padding:1px_6px] [border-radius:4px] [font-weight:600]"}>
                        {f.a}
                      </span>
                      </>
                    )}
                    {f.done && (
                      <>
                      <span>
                        {f.a}
                      </span>
                      </>
                    )}
                  </div>
                  </>
                )}
              </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className={"[position:relative] [background:radial-gradient(120%_70%_at_50%_0%,#14245A_0%,#0B1530_50%,#070E24_100%)] [color:#FFFFFF] [padding:clamp(80px,11vw,140px)_0] [overflow:hidden]"} data-screen-label="CTA penutup">
        <div className={"[position:absolute] [left:0] [right:0] [top:0] [height:1px] [background:linear-gradient(90deg,transparent,rgba(217,133,47,.55),transparent)] [pointer-events:none]"} aria-hidden="true"></div>
        <div className={"[position:absolute] [inset:0] [background:radial-gradient(50%_70%_at_50%_110%,rgba(194,101,15,.35),transparent_70%)] [pointer-events:none]"}></div>
        <div className={"[position:relative] [max-width:900px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [align-items:center] [text-align:center] [gap:26px]"}>
          <h2 className={"[font-family:'Barlow_Condensed',sans-serif] [font-weight:800] [font-size:clamp(42px,6.4vw,80px)] [line-height:.95] [margin:0] [text-wrap:balance] [text-shadow:0_4px_40px_rgba(36,87,184,.35)]"}>
            Mulai Iklan yang 
            <span className={"[color:#DE8A2E]"}>
              Menghasilkan
            </span>
            , Bukan yang Menghabiskan Budget
          </h2>
          <p className={"[margin:0] [font-size:clamp(15px,1.6vw,18px)] [line-height:1.6] [color:rgba(255,255,255,.75)] [max-width:620px]"}>
            2 hari praktek langsung, dibimbing 1-on-1. Kursi terbatas di setiap kota.
          </p>
          <div className={"[display:flex] [flex-wrap:wrap] [justify-content:center] [gap:12px] [width:100%]"}>
            <a className={"[flex:1_1_200px] [max-width:max-content] max-[719px]:[max-width:100%] [display:inline-flex] [justify-content:center] [align-items:center] [gap:10px] [padding:18px_30px] [border-radius:12px] [background:linear-gradient(180deg,#1BAA5D_0%,#118A48_55%,#0C743C_100%)] [color:#FFFFFF] [border:1px_solid_rgba(255,255,255,.14)] [text-shadow:0_1px_0_rgba(0,0,0,.18)] [letter-spacing:.01em] [font-weight:800] [font-size:16px] [box-shadow:0_14px_34px_-12px_rgba(18,140,74,.75),inset_0_1px_0_rgba(255,255,255,.28)] hover:[background:linear-gradient(180deg,#22BD69_0%,#14994F_55%,#0E8044_100%)] hover:[color:#FFFFFF]"} href="#daftar">
              <img className={"[width:20px] [height:20px] [display:block]"} src="https://cdn.simpleicons.org/whatsapp/white" alt="" />
              Daftar sekarang
            </a>
            <a className={"[flex:1_1_200px] [max-width:max-content] max-[719px]:[max-width:100%] [display:inline-flex] [justify-content:center] [align-items:center] [gap:10px] [padding:18px_30px] [border-radius:12px] [background:rgba(18,140,74,.08)] [color:#3DDC84] [border:1.5px_solid_#19A65A] [letter-spacing:.01em] [font-weight:800] [font-size:16px] [box-shadow:none] hover:[background:rgba(18,140,74,.18)] hover:[color:#5BEA9C]"} href={waLink} target="_blank" rel="noopener">
              <img className={"[width:20px] [height:20px] [display:block]"} src="https://cdn.simpleicons.org/whatsapp/3DDC84" alt="" />
              Chat Admin via WhatsApp
            </a>
          </div>
        </div>
      </section>
      <footer className={"[background:linear-gradient(180deg,#0A1330_0%,#050A1A_100%)] [border-top:1px_solid_rgba(217,133,47,.22)] [box-shadow:inset_0_1px_0_rgba(255,255,255,.04)] [color:rgba(255,255,255,.62)] [padding:48px_0_40px]"}>
        <div className={"[max-width:1200px] [margin:0_auto] [padding:0_clamp(20px,4vw,40px)] [display:flex] [flex-direction:column] [gap:28px]"}>
          <div className={"[display:flex] [flex-wrap:wrap] [align-items:center] [justify-content:space-between] [gap:20px]"}>
            <div className={"[display:flex] [flex-direction:column] [gap:10px]"}>
              <img className={"[height:44px] [width:auto] [align-self:flex-start] [filter:drop-shadow(0_0_1px_rgba(255,255,255,.35))]"} src="/assets/logo-nav.webp" alt="Adspreneur.id" />
              <a className={"[font-size:14px] [font-weight:700] [color:rgba(255,255,255,.8)] hover:[color:#FFFFFF]"} href="https://adspreneur.id" target="_blank" rel="noopener">
                www.adspreneur.id
              </a>
            </div>
            <div className={"[display:flex] [flex-wrap:wrap] [gap:10px]"}>
              {socials.map((so, idx) => (
                <Fragment key={idx}>
                <a className={"[display:inline-flex] [align-items:center] [gap:9px] [padding:10px_14px] [border-radius:12px] [border:1px_solid_rgba(255,255,255,.14)] [background:rgba(255,255,255,.04)] [color:#FFFFFF] [font-size:13px] [font-weight:700] [transition:transform_.2s_ease,border-color_.2s_ease] hover:[transform:translateY(-3px)] hover:[border-color:rgba(194,101,15,.6)] hover:[color:#FFFFFF]"} href={so.href} target="_blank" rel="noopener">
                  <span className={"[width:16px] [height:16px] [display:block] [background-size:contain] [background-repeat:no-repeat] [background-position:center]"} aria-hidden="true" style={{ "backgroundImage": `${so.bg}` }}></span>
                  <span>
                    {so.label}
                  </span>
                </a>
                </Fragment>
              ))}
            </div>
          </div>
          <div className={"[height:1px] [background:rgba(255,255,255,.08)]"}></div>
          <span className={"[font-size:13px]"}>
            ©2026 www.adspreneur.id. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

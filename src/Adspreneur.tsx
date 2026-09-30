import { useState, useEffect, type FormEvent, type ReactNode, type CSSProperties } from 'react';

interface ProjectProps {
  waNumber?: string;
  countdownTarget?: string;
  showStickyCta?: boolean;
  openWaOnSubmit?: boolean;
}

type Side = 'left' | 'right';
interface Chip { ic: string; label: string; sub: string }
interface Module { title: string; desc: string; result: string }
interface Video { id: string; label: string }
interface Schedule { city: string; status: string; hot?: boolean }
interface Faq { q: string; a: string; todo?: boolean }
interface FormState { name: string; wa: string; city: string; biz: string }
interface Countdown { d: string; h: string; m: string; s: string }

// Isi path gambar (mis. '/assets/hero-bg-1.jpg') bila sudah ada. null = tampil placeholder.
const IMG = {
  logo: '/assets/logo-landscape-1.webp',
  coach: '/assets/coach-hd.webp',
  heroBg: [null, null, null] as (string | null)[],
  kurikulum: [null, null] as (string | null)[],
  testi: [null, null, null, null] as (string | null)[],
  mentorEvents: Array.from({ length: 12 }, () => null) as (string | null)[],
};

const CHIPS_LEFT: Chip[] = [
  { ic: 'M', label: 'Meta Ads', sub: 'bukan boost post' },
  { ic: 'T', label: 'TikTok Ads', sub: 'cukup via HP' },
  { ic: 'AI', label: 'Konten AI & Canva', sub: 'tanpa jago desain' },
];
const CHIPS_RIGHT: Chip[] = [
  { ic: 'G', label: 'Google Ads', sub: 'muncul teratas' },
  { ic: 'LP', label: 'Landing page', sub: 'bikin sendiri' },
  { ic: 'WA', label: 'Closing WA', sub: 'format chat teruji' },
];
const CHIPS_MOBILE: Chip[] = [CHIPS_LEFT[0], CHIPS_RIGHT[0], CHIPS_LEFT[1], CHIPS_RIGHT[1], CHIPS_LEFT[2], CHIPS_RIGHT[2]];

const STRIP: string[] = ['2 hari full, 08.00–17.00', 'Teori 10%, praktek 90%', 'Dibimbing 1-on-1 di kelas', 'Konsultasi seumur hidup', 'Kelas ulang di kota mana pun'];

const DAY1: Module[] = [
  { title: 'Fondasi & setup akun iklan', desc: 'Setup Business Manager, Fanpage, Ad Account & Pixel, plus optimasi akun FB & IG.', result: 'akun iklanmu siap jalan di hari yang sama.' },
  { title: 'Branding & positioning', desc: 'Personal branding & positioning, optimasi FB & IG untuk traffic dan leads.', result: 'akunmu terlihat meyakinkan sebelum calon pembeli menghubungi.' },
  { title: 'Facebook & Instagram Ads', desc: 'Pasang iklan lewat Ads Manager dengan strategi profitable yang teruji.', result: 'iklan pertamamu tayang di akun sendiri.' },
  { title: 'Jualan COD & iklan produk marketplace', desc: 'Jualan COD di Meta dan iklankan produk Shopee, Tokopedia & TikTok Shop.', result: 'alur dari iklan ke orderan yang siap kamu pakai jualan.' },
  { title: 'Konten iklan dengan AI & Canva', desc: 'Bikin gambar & video iklan pakai AI/Canva, plus riset kompetitor metode ATM.', result: 'materi iklan siap pakai tanpa harus jago desain.' },
];
const DAY2: Module[] = [
  { title: 'Google Ads', desc: 'Iklan Google supaya muncul teratas saat orang cari produk atau jasamu.', result: 'iklan Google aktif untuk kata kunci bisnismu.' },
  { title: 'TikTok Ads & affiliate', desc: 'Iklan TikTok via HP untuk jasa & affiliate, plus trik jadi affiliator.', result: 'iklan TikTok bisa kamu jalankan cukup dari HP.' },
  { title: 'Website & landing page dari nol', desc: 'Bikin website & landing page WordPress sendiri, tanpa sewa jasa.', result: 'landing page milikmu sendiri untuk tujuan iklan.' },
  { title: 'Baca data iklan & anti boncos', desc: 'Baca data Ads Manager dengan benar dan kelola risiko supaya nggak boncos.', result: 'tahu kapan iklan layak ditambah budget dan kapan dimatikan.' },
  { title: 'Closing & operasional', desc: 'Persiapan CS, format chat closing teruji, dan atur pesanan cash & COD.', result: 'chat yang masuk berubah jadi orderan.' },
];

const COMPARE: [string, string][] = [
  ['Boost post', 'Iklan lewat Ads Manager'], ['Teori berjam-jam', '90% praktek'], ['Nonton dari kursi belakang', 'Dibimbing 1-on-1'],
  ['Coba-coba sendiri', 'Strategi yang sudah teruji'], ['Iklan asal jalan', 'Baca data sebelum tambah budget'], ['Kelas selesai, ditinggal', 'Konsultasi seumur hidup'],
];

const VIDEOS: Video[] = [
  { id: 'RXypi66YOFQ', label: 'Testimoni peserta 1' },
  { id: 'FFXKfSGer6s', label: 'Testimoni peserta 2' },
  { id: '496GF4lND3A', label: 'Testimoni peserta 3' },
];
const SHORT: Video = { id: '5MBPNMFgUiY', label: 'Testimoni peserta 4' };

const TESTI_SS: { ph: string; caption: string }[] = [
  { ph: 'Screenshot chat testimoni 1', caption: 'Chat testimoni peserta' },
  { ph: 'Screenshot chat pertama masuk saat kelas', caption: 'Chat pertama masuk saat kelas' },
  { ph: 'Screenshot dashboard Ads Manager peserta', caption: 'Dashboard Ads Manager peserta' },
  { ph: 'Screenshot orderan COD pertama', caption: 'Orderan COD pertama' },
];

const AFTER: { icon: string; title: string; body: string }[] = [
  { icon: 'messages-square', title: 'Konsultasi & mentoring seumur hidup', body: 'Iklanmu bermasalah bulan depan? Tanya langsung ke coach dan tim, kapan pun.' },
  { icon: 'video', title: 'Sesi Zoom tanya jawab berkala', body: 'Review materi dan bahas kendala iklan bareng peserta lain.' },
  { icon: 'circle-play', title: 'Modul video untuk diulang di rumah', body: 'Lupa langkah setup atau cara baca data? Tinggal putar ulang.' },
  { icon: 'map-pin', title: 'Ikut kelas ulang di kota mana pun', body: 'Tanpa bayar biaya pelatihan lagi. Cukup bayar seat dan konsumsi.' },
];

const PROBLEMS: [string, string][] = [
  ['Masih andalkan tombol boost post', 'Pilihan target dan tujuan iklan jadi sangat terbatas.'],
  ['Bingung baca angka di Ads Manager', 'Nggak tahu iklan mana yang bagus dan mana yang bikin boncos.'],
  ['Chat masuk, tapi jarang closing', 'Iklannya sudah jalan, tapi cara balas chat belum menjual.'],
  ['Masih bayar orang untuk hal yang bisa dikerjakan sendiri', 'Website, landing page, dan desain iklan sebenarnya bisa kamu buat sendiri.'],
];

const FEATURES: [string, string][] = [
  ['Kelas offline 2 hari full', '08.00–17.00 waktu setempat, teori 10% praktek 90%'],
  ['Bimbingan praktek 1-on-1', 'Dibantu langsung di akun iklanmu sendiri'],
  ['Modul video pembelajaran', 'Bisa diulang kapan saja di rumah'],
  ['Konsultasi seumur hidup + Zoom berkala', 'Langsung dengan coach dan tim'],
  ['Kelas ulang di kota mana pun', 'Cukup bayar seat dan konsumsi'],
];

const SCHEDULE: Schedule[] = [
  { city: '[KOTA 1]', status: 'Sisa [X] kursi', hot: true },
  { city: '[KOTA 2]', status: 'Kursi tersedia' },
  { city: '[KOTA 3]', status: 'Kursi tersedia' },
];

const FAQS: Faq[] = [
  { q: 'Saya belum pernah ngiklan sama sekali. Bisa ikut?', a: 'Bisa. Materi mulai dari nol: bikin Business Manager, Fanpage, Ad Account & Pixel, dipraktekkan bareng di kelas.' },
  { q: 'Apa saja yang perlu dibawa saat kelas?', a: '[ISI: laptop atau HP, akun Facebook & Instagram aktif, foto produk, dll.]', todo: true },
  { q: 'Perlu siapkan budget iklan untuk praktek?', a: '[ISI: estimasi budget iklan selama praktek dan metode pembayaran iklan yang disarankan.]', todo: true },
  { q: 'Kalau setelah kelas masih bingung, bagaimana?', a: 'Konsultasi seumur hidup dengan coach & tim, Zoom tanya jawab berkala, dan modul video untuk diulang.' },
  { q: 'Boleh ikut kelas ulang?', a: 'Boleh, di kota mana pun, tanpa biaya pelatihan lagi. Cukup bayar seat dan konsumsi.' },
  { q: 'Kelas ini cocok untuk bisnis apa saja?', a: 'Penjual skincare, fashion & makanan (COD maupun marketplace), bisnis jasa, sampai calon affiliator TikTok.' },
];

const KEYFRAMES = `html{scroll-behavior:smooth}
@keyframes adsMarq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes adsFade{0%{opacity:0}6%{opacity:1}33%{opacity:1}39%{opacity:0}100%{opacity:0}}
@keyframes adsBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes adsDrift{from{transform:translateY(0)}to{transform:translateY(-22%)}}`;

// Shared class strings (Tailwind utilities)
const DISPLAY = "font-['Barlow_Condensed',sans-serif] font-extrabold";
const WRAP = 'mx-auto w-full max-w-[1200px] px-[clamp(20px,4vw,40px)]';
const SEC_PAD = 'py-[clamp(56px,10vw,128px)]';
const H2_LIGHT = `${DISPLAY} m-0 text-[clamp(38px,5.4vw,64px)] leading-[.98] text-[#0E1A33] text-balance`;
const H2_DARK = `${DISPLAY} m-0 text-[clamp(38px,5.4vw,64px)] leading-[.98] text-balance`;
const SUB = 'm-0 text-[clamp(15px,1.5vw,17px)] leading-[1.6] text-pretty';
const TODO = 'rounded-[4px] bg-[#FFE45C] px-[5px] text-[#0E1A33]';
const BTN_PRIMARY = 'inline-flex items-center gap-2.5 rounded-xl bg-[#F58A1F] px-7 py-[17px] text-base font-extrabold text-[#0B1530] shadow-[0_14px_34px_-14px_rgba(245,138,31,.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#FF9D3D] hover:text-[#0B1530]';
const LIFT = 'transition-[transform,box-shadow,border-color] duration-[250ms] ease-in-out';
const LIFT_LIGHT = `${LIFT} hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(14,26,51,.38)]`;
const LIFT_DARK = `${LIFT} hover:-translate-y-[5px] hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,.75)] hover:border-[rgba(245,138,31,.5)]`;

const pad2 = (n: number): string => String(n).padStart(2, '0');
const calcCountdown = (target: string, now: number): Countdown => {
  const tg = Date.parse(target);
  const d = Math.max(0, Math.floor(((Number.isNaN(tg) ? 0 : tg) - now) / 1000));
  return { d: pad2(Math.floor(d / 86400)), h: pad2(Math.floor((d % 86400) / 3600)), m: pad2(Math.floor((d % 3600) / 60)), s: pad2(d % 60) };
};

function Icon({ name, className, color }: { name: string; className: string; color: string }) {
  const url = `url(https://unpkg.com/lucide-static@0.460.0/icons/${name}.svg) center/contain no-repeat`;
  return <span className={className} style={{ background: color, WebkitMask: url, mask: url } as CSSProperties} />;
}

function Slot({ src, label, tone = 'dark', alt = '' }: { src: string | null; label: string; tone?: 'dark' | 'light'; alt?: string }) {
  if (src) return <img src={src} alt={alt || label} className="absolute inset-0 h-full w-full object-cover" />;
  return (
    <div className={`absolute inset-0 flex items-center justify-center p-3 text-center text-xs font-semibold ${tone === 'dark' ? 'bg-[#16244A] text-white/40' : 'bg-[#EFEBE3] text-[#55607A]'}`}>
      {label}
    </div>
  );
}

function Badge({ children, dark, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 self-center rounded-full border px-3.5 py-[7px] text-xs font-bold tracking-[.14em] uppercase ${dark ? 'border-white/18 text-[#FFC58A]' : 'border-[rgba(14,26,51,.14)] text-[#1A4FA0]'} ${className}`}>
      <span className="h-[7px] w-[7px] rounded-full bg-[#F58A1F]" />
      {children}
    </span>
  );
}

function SectionCta({ label, waLink, dark, center }: { label: string; waLink: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mt-2 flex flex-wrap items-center gap-x-[22px] gap-y-3.5 ${center ? 'justify-center' : 'justify-start'}`}>
      <a href="#daftar" className={BTN_PRIMARY}>{label} <span>→</span></a>
      <a href={waLink} target="_blank" rel="noopener" className={`text-[15px] font-bold underline underline-offset-4 ${dark ? 'text-white/80 hover:text-white' : 'text-[#1A4FA0] hover:text-[#0E1A33]'}`}>
        Tanya admin via WhatsApp
      </a>
    </div>
  );
}

function FloatChip({ chip, i, side }: { chip: Chip; i: number; side: Side }) {
  const rot = (side === 'left' ? -1 : 1) * (i % 2 ? 2 : -2);
  const outer: CSSProperties = {
    animation: `adsBob ${4.2 + i * 0.7}s ease-in-out ${-(i * 1.4 + (side === 'left' ? 0 : 0.7))}s infinite`,
    marginRight: side === 'left' ? [0, 36, 8][i] : 0,
    marginLeft: side === 'right' ? [8, 36, 0][i] : 0,
  };
  return (
    <div style={outer}>
      <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/16 bg-[rgba(14,24,52,.78)] py-1 pr-[11px] pl-1 shadow-[0_16px_36px_-14px_rgba(0,0,0,.7)] backdrop-blur-[10px]" style={{ transform: `rotate(${rot}deg)` }}>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F58A1F] text-[8.5px] font-extrabold text-[#0B1530]">{chip.ic}</span>
        <span className="text-[11.5px] font-extrabold text-white">{chip.label}</span>
        <span className="text-[10.5px] font-semibold text-[#FFB36B]">({chip.sub})</span>
      </div>
    </div>
  );
}

function ChipColumn({ list, side }: { list: Chip[]; side: Side }) {
  return (
    <div className={`pointer-events-auto flex flex-col justify-center gap-[clamp(10px,2vh,18px)] self-start pt-[2vh] ${side === 'left' ? 'items-end' : 'items-start'}`}>
      {list.map((c, i) => <FloatChip key={c.label} chip={c} i={i} side={side} />)}
    </div>
  );
}

function ModuleCard({ m, num }: { m: Module; num: string }) {
  return (
    <div className={`my-2 flex flex-col gap-1.5 rounded-2xl border border-white/12 bg-white/4 px-5 py-[18px] ${LIFT_DARK}`}>
      <span className="text-[11px] font-extrabold tracking-[.14em] text-white/45 uppercase">Modul {num}</span>
      <span className="text-base font-extrabold text-white">{m.title}</span>
      <span className="text-[clamp(14px,1.3vw,14.5px)] leading-[1.6] text-pretty text-white/70">{m.desc}</span>
      <span className="mt-0.5 text-[13.5px] leading-[1.5] font-bold text-[#F58A1F]">Hasil: {m.result}</span>
    </div>
  );
}

function DayCard({ day, date, title, flow, img, ph, mods, offset }: { day: number; date: string; title: string; flow: string; img: string | null; ph: string; mods: Module[]; offset: number }) {
  return (
    <div className="flex flex-col gap-[clamp(24px,3vw,36px)] rounded-[28px] border border-white/12 bg-[#0F1A38] p-[clamp(18px,4vw,48px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(20px,3vw,40px)]">
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#F58A1F] px-3.5 py-[7px] text-xs font-extrabold tracking-[.08em] text-[#0B1530] uppercase">Hari {day}</span>
            <span className="rounded-full border border-white/18 px-3 py-1.5 text-xs font-bold tracking-[.06em] text-white/75"><span className={TODO}>{date}</span></span>
          </div>
          <h3 className={`${DISPLAY} m-0 text-[clamp(32px,3.6vw,44px)] leading-none text-balance text-white`}>{title}</h3>
          <span className="text-sm leading-[1.5] font-bold text-[#FFB36B]">{flow}</span>
          <span className="flex items-center gap-2 text-[13px] font-semibold text-white/62">
            <Icon name="clock" className="h-3.5 w-3.5" color="rgba(255,255,255,.62)" />08.00 – 17.00 waktu setempat
          </span>
        </div>
        <div className="relative aspect-[2/1] overflow-hidden rounded-[18px] border border-white/10 bg-[#0B1530] shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
          <Slot src={img} label={ph} />
        </div>
      </div>
      <div className="h-px bg-white/10" />
      <div className="flex flex-col">
        {mods.map((m, i) => {
          const n = i + 1 + offset;
          const num = pad2(n);
          const left = i % 2 === 0;
          return (
            <div key={m.title} className="grid grid-cols-[44px_minmax(0,1fr)] items-center min-[980px]:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)]">
              <div className={`hidden min-[980px]:block ${left ? '' : 'invisible'}`}><ModuleCard m={m} num={num} /></div>
              <div className="relative flex items-center justify-center self-stretch">
                <span className={`absolute left-1/2 -ml-px w-0.5 bg-[rgba(245,138,31,.35)] ${i === 0 ? 'top-1/2' : 'top-0'} ${i === mods.length - 1 ? 'bottom-1/2' : 'bottom-0'}`} />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#F58A1F] text-sm font-extrabold text-[#0B1530] shadow-[0_0_0_6px_#0F1A38]">{n}</span>
              </div>
              <div className={left ? 'min-[980px]:invisible' : ''}><ModuleCard m={m} num={num} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VideoCard({ v, playing, onPlay, vertical }: { v: Video; playing: boolean; onPlay: () => void; vertical?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[18px] bg-[#0B1530] ${LIFT_LIGHT} ${vertical ? 'min-h-[360px] flex-1' : 'aspect-video'}`}>
      {playing ? (
        <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`} title={v.label} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <button type="button" onClick={onPlay} className="absolute inset-0 h-full w-full cursor-pointer border-0 bg-[#0B1530] p-0">
          <span role="img" aria-label={v.label} className="absolute inset-0 bg-cover bg-center opacity-85" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)` }} />
          <span className={`absolute inset-0 ${vertical ? 'bg-[linear-gradient(180deg,transparent_55%,rgba(11,21,48,.85))]' : 'bg-[linear-gradient(180deg,transparent_45%,rgba(11,21,48,.85))]'}`} />
          <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F58A1F] shadow-[0_10px_30px_-8px_rgba(0,0,0,.6)]">
            <span className="ml-[5px] h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-[#0B1530]" />
          </span>
          <span className="absolute bottom-3.5 left-[18px] text-sm font-bold text-white">{v.label}</span>
        </button>
      )}
    </div>
  );
}

export default function Project(props: ProjectProps) {
  const waNumber = (props.waNumber ?? '62XXXXXXXXXX').replace(/\D/g, '') || '62';
  const countdownTarget = props.countdownTarget ?? '2026-10-17T08:00:00+07:00';
  const showSticky = props.showStickyCta ?? true;
  const openWaOnSubmit = props.openWaOnSubmit ?? true;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Halo admin Adspreneur, saya mau tanya jadwal kelas.')}`;

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [now, setNow] = useState<number>(() => Date.now());
  const [playing, setPlaying] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState<FormState>({ name: '', wa: '', city: '', biz: '' });
  const [err, setErr] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => { window.removeEventListener('scroll', onScroll); window.clearInterval(tick); };
  }, []);

  const cd = calcCountdown(countdownTarget, now);
  const stickyVisible = showSticky && scrolled;

  const setField = (k: keyof FormState) => (e: { target: { value: string } }): void => { setForm((f) => ({ ...f, [k]: e.target.value })); setErr(''); };
  const cityOption = (s: Schedule): string => `${s.city} · [TANGGAL]`;

  const submit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!form.name.trim() || !form.wa.trim() || !form.city) { setErr('Lengkapi nama, nomor WhatsApp, dan kota kelas dulu ya.'); return; }
    if (form.wa.replace(/\D/g, '').length < 9) { setErr('Nomor WhatsApp sepertinya belum lengkap.'); return; }
    const msg = `Halo admin Adspreneur, saya mau daftar kelas.\nNama: ${form.name}\nWA: ${form.wa}\nKota: ${form.city}\nUsaha: ${form.biz || '-'}`;
    if (openWaOnSubmit) window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    setSent(true);
  };

  const INPUT = 'w-full rounded-xl border border-white/14 bg-[#16223F] px-4 py-[15px] text-[15px] text-white outline-hidden focus:border-[#F58A1F] focus:bg-[#1A2748]';

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="bg-[#0B1530] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-[#0E1A33] antialiased">
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(11,21,48,.86)] backdrop-blur-[14px]">
          <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-[clamp(16px,4vw,40px)] py-3">
            <a href="#top" className="flex shrink-0 items-center"><img src={IMG.logo} alt="Adspreneur.id" width="180" height="34" loading="eager" fetchPriority="high" decoding="async" className="block h-6 w-auto min-[720px]:h-[34px]" /></a>
            <div className="hidden min-w-0 flex-1 truncate border-l border-white/14 pl-5 text-[13px] font-medium text-white/60 min-[980px]:block">Kelas praktek iklan digital</div>
            <div className="ml-auto flex shrink-0 items-center gap-2.5">
              <a href={waLink} target="_blank" rel="noopener" className="hidden items-center whitespace-nowrap rounded-[10px] border-[1.5px] border-white/24 px-[18px] py-[11px] text-sm font-bold text-white hover:border-white hover:text-white min-[720px]:inline-flex">Tanya admin</a>
              <a href="#daftar" className="inline-flex items-center whitespace-nowrap rounded-[10px] bg-[#F58A1F] px-3.5 py-2.5 text-sm font-extrabold text-[#0B1530] hover:bg-[#FF9D3D] hover:text-[#0B1530] min-[720px]:px-[18px] min-[720px]:py-3">Daftar sekarang</a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section id="top" className="relative flex min-h-[calc(100svh-66px)] flex-col justify-center overflow-hidden bg-[#0B1530] text-white">
          <div className="absolute inset-0">
            {IMG.heroBg.map((src, i) => (
              <div key={i} className="absolute inset-0 scale-[1.04] opacity-0" style={{ animation: `adsFade 18s ease-in-out ${i * 6}s infinite both` }}>
                <Slot src={src} label={`Foto suasana kelas ${i + 1} (background hero)`} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,21,48,.82)_0%,rgba(11,21,48,.78)_55%,#0B1530_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_32%,rgba(26,79,160,.35),transparent_70%)]" />
          <div className="pointer-events-none relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-[clamp(20px,4vw,40px)] pt-[clamp(12px,3vh,40px)] pb-[clamp(20px,4vh,56px)]">
            <div className="relative grid w-full grid-cols-1 items-center justify-items-center gap-2.5 min-[980px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[980px]:gap-7">
              <div className="relative z-[2] hidden w-full items-center justify-end min-[980px]:flex"><ChipColumn list={CHIPS_LEFT} side="left" /></div>
              <div className="pointer-events-auto relative order-1 aspect-[4/5] h-[min(36vh,380px)] max-w-[80vw] min-[980px]:h-[min(40vh,450px)]">
                <div className="pointer-events-none absolute -inset-x-[30%] -inset-y-[18%] bg-[radial-gradient(closest-side,rgba(245,138,31,.38),rgba(26,79,160,.25)_55%,transparent_100%)]" />
                <div className="absolute inset-0 overflow-hidden rounded-t-[28px] shadow-[inset_0_0_0_1px_rgba(245,138,31,.5)] [mask-image:linear-gradient(180deg,#000_62%,transparent_100%)]">
                  <img src={IMG.coach} alt="Coach Adspreneur" width="360" height="450" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
              <div className="relative z-[2] order-2 hidden w-full items-center justify-start min-[980px]:flex"><ChipColumn list={CHIPS_RIGHT} side="right" /></div>
            </div>
            <div className="relative -mt-[14vh] flex w-full max-w-[900px] flex-col items-center gap-4 text-center min-[980px]:-mt-14 min-[980px]:gap-6">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F58A1F] px-3.5 py-[7px] text-xs font-extrabold tracking-[.12em] text-[#0B1530] uppercase">Kelas offline 2 hari</span>
                <span className="hidden text-sm font-semibold text-white/78 min-[980px]:inline">Praktek langsung di akun iklanmu sendiri</span>
              </div>
              <h1 className={`${DISPLAY} m-0 text-[clamp(38px,min(7.2vw,7.8vh),92px)] leading-[.94] tracking-[-0.01em] text-balance [text-shadow:0_4px_30px_rgba(11,21,48,.85)]`}>
                Belajar Iklan Digital Sampai <span className="text-[#F58A1F]">Orderan Masuk</span>, Langsung Praktek di Kelas
              </h1>
              <p className="m-0 max-w-[620px] text-[clamp(13.5px,1.2vw,16px)] leading-[1.6] text-pretty text-white/82 [text-shadow:0_2px_16px_rgba(11,21,48,.8)]">
                2 hari full bareng praktisi iklan 7 tahun. 90% praktek: Meta, Google &amp; TikTok Ads, landing page, sampai closing WA.
              </p>
              <div className="pointer-events-auto flex w-full flex-wrap justify-center gap-3">
                <a href="#daftar" className="inline-flex max-w-full flex-[1_1_0] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] bg-[#F58A1F] px-3 py-[13px] text-[15px] font-extrabold text-[#0B1530] shadow-[0_14px_34px_-12px_rgba(245,138,31,.75)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#FF9D3D] hover:text-[#0B1530] min-[720px]:max-w-max min-[720px]:flex-[0_1_auto] min-[720px]:px-[22px]">Daftar sekarang <span>→</span></a>
                <a href={waLink} target="_blank" rel="noopener" className="inline-flex max-w-full flex-[1_1_0] items-center justify-center whitespace-nowrap rounded-[10px] border-[1.5px] border-white/28 bg-[rgba(11,21,48,.4)] px-3 py-[13px] text-[15px] font-bold text-white hover:border-white hover:text-white min-[720px]:max-w-max min-[720px]:flex-[0_1_auto] min-[720px]:px-[22px]">
                  <span className="min-[720px]:hidden">Tanya via WA</span><span className="hidden min-[720px]:inline">Tanya jadwal via WhatsApp</span>
                </a>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="flex">
                  <div className="h-[34px] w-[34px] rounded-full border-2 border-[#0B1530] bg-[#1A4FA0]" />
                  <div className="-ml-2.5 h-[34px] w-[34px] rounded-full border-2 border-[#0B1530] bg-[#F58A1F]" />
                  <div className="-ml-2.5 h-[34px] w-[34px] rounded-full border-2 border-[#0B1530] bg-[#4C82E0]" />
                </div>
                <p className="m-0 text-left text-sm leading-[1.5] text-white/80"><span className={`${TODO} font-bold`}>[JUMLAH]</span> peserta sudah ikut kelas di <span className={`${TODO} font-bold`}>[JUMLAH]</span> kota</p>
              </div>
              <div className="pointer-events-auto w-full min-[980px]:hidden [@media(max-height:639px)]:hidden">
                <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
                  <div className="flex w-max animate-[adsMarq_28s_linear_infinite]">
                    {[...CHIPS_MOBILE, ...CHIPS_MOBILE].map((c, k) => (
                      <span key={k} className="mr-2 inline-flex items-center gap-[7px] whitespace-nowrap rounded-full border border-white/16 bg-[rgba(14,24,52,.78)] py-[5px] pr-3 pl-[5px]">
                        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#F58A1F] text-[9px] font-extrabold text-[#0B1530]">{c.ic}</span>
                        <span className="text-xs font-extrabold text-white">{c.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STRIP */}
        <div className={`${DISPLAY.replace('font-extrabold', 'font-bold')} overflow-hidden bg-[#F58A1F] py-[18px] text-[22px] tracking-[.02em] text-[#0B1530] uppercase`}>
          <div className="flex w-max animate-[adsMarq_45s_linear_infinite]">
            {[...STRIP, ...STRIP, ...STRIP, ...STRIP].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-7 whitespace-nowrap pr-7">
                {t}<span className="inline-block h-2 w-2 rotate-45 bg-[#0B1530]" />
              </span>
            ))}
          </div>
        </div>

        {/* MASALAH */}
        <section className={`bg-[#F6F4EF] ${SEC_PAD}`}>
          <div className={`${WRAP} flex flex-col gap-10`}>
            <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 text-center">
              <Badge>Kenapa banyak yang boncos</Badge>
              <h2 className={H2_LIGHT}>Iklan jalan, budget habis, tapi chat nggak masuk?</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-[clamp(40px,6vw,80px)]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-[clamp(15px,1.5vw,17px)] leading-[1.65] text-pretty text-[#3B4660]">
                  <p className="m-0">Boost post terus, budget habis, orderan nggak sebanding? Biasanya masalahnya di setup akun, campaign, dan cara baca data.</p>
                  <p className="m-0">Di sini kamu pasang iklan sungguhan di akunmu sendiri, dibimbing sampai tahu kapan iklan ditambah budget atau dimatikan.</p>
                  <p className="m-0 font-bold text-[#0E1A33]">Banyak peserta sudah dapat chat, bahkan orderan pertama, saat kelas masih berlangsung.</p>
                </div>
                <SectionCta label="Benahi iklanmu di kelas" waLink={waLink} />
              </div>
              <div className={`flex flex-col gap-2 rounded-3xl bg-[#0B1530] p-[clamp(28px,4vw,44px)] text-white ${LIFT_LIGHT}`}>
                <div className={`${DISPLAY.replace('font-extrabold', 'font-bold')} mb-3 text-[28px]`}>Tanda iklanmu perlu dibenahi</div>
                {PROBLEMS.map(([t, d], i) => (
                  <div key={t} className={`grid grid-cols-[40px_1fr] gap-3.5 border-t border-white/10 ${i === PROBLEMS.length - 1 ? 'pt-[18px]' : 'py-[18px]'}`}>
                    <span className={`${DISPLAY} text-[22px] text-[#F58A1F]`}>{pad2(i + 1)}</span>
                    <div className="flex flex-col gap-1"><span className="text-base font-bold">{t}</span><span className="text-sm leading-[1.55] text-white/66">{d}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KURIKULUM */}
        <section id="kurikulum" className={`border-t border-white/6 bg-[#0B1530] text-white ${SEC_PAD}`}>
          <div className={`${WRAP} flex flex-col gap-10`}>
            <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
              <Badge dark>Kurikulum 2 hari</Badge>
              <h2 className={H2_DARK}>Dari Setup Akun Sampai Closing, Semua Dipraktekkan</h2>
              <p className={`${SUB} text-white/72`}>10 modul, 08.00–17.00 waktu setempat.</p>
            </div>
            <DayCard day={1} date="[TANGGAL HARI 1]" title="Fondasi & Iklan Meta yang Menjual" flow="Setup akun → Branding → Meta Ads → Jualan COD → Konten iklan" img={IMG.kurikulum[0]} ph="Screenshot materi / suasana kelas hari 1" mods={DAY1} offset={0} />
            <DayCard day={2} date="[TANGGAL HARI 2]" title="Channel Lain, Website & Closing" flow="Google Ads → TikTok Ads → Landing page → Baca data → Closing" img={IMG.kurikulum[1]} ph="Screenshot materi / suasana kelas hari 2" mods={DAY2} offset={5} />
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-[rgba(245,138,31,.3)] bg-[rgba(245,138,31,.1)] px-[clamp(20px,3vw,32px)] py-[clamp(20px,3vw,28px)]">
              <p className="m-0 max-w-[720px] text-[clamp(15px,1.6vw,18px)] leading-[1.5] text-pretty text-white"><strong className="text-[#F58A1F]">Teori 10%, praktek 90%.</strong> Pulang bawa iklan yang sudah jalan di akunmu sendiri.</p>
              <a href="#daftar" className="inline-flex rounded-xl bg-[#F58A1F] px-[26px] py-4 text-[15px] font-extrabold text-[#0B1530] hover:bg-[#FF9D3D] hover:text-[#0B1530]">Daftar sekarang</a>
            </div>
          </div>
        </section>

        {/* PEMBEDA */}
        <section className={`bg-[#0B1530] text-white ${SEC_PAD}`}>
          <div className="mx-auto flex max-w-[1000px] flex-col gap-12 px-[clamp(20px,4vw,40px)]">
            <div className="flex flex-col items-center gap-5 text-center">
              <Badge dark>Bukan kelas biasa</Badge>
              <h2 className={`${DISPLAY} m-0 text-[clamp(40px,6vw,72px)] leading-[.96] text-balance`}>Bukan Kelas Nonton Slide</h2>
              <p className={`${SUB} max-w-[600px] text-white/72`}>Kami lebih suka kamu langsung praktek di akunmu sendiri, dibimbing sampai bisa. Ini bedanya.</p>
            </div>
            <div className="flex flex-col overflow-hidden rounded-3xl border border-white/12">
              <div className="grid grid-cols-2 bg-white/4 text-xs font-bold tracking-[.14em] uppercase">
                <div className="px-[clamp(16px,3vw,32px)] py-4 text-white/50">Kelas lain</div>
                <div className="border-l border-white/12 px-[clamp(16px,3vw,32px)] py-4 text-[#F58A1F]">Di Adspreneur</div>
              </div>
              {COMPARE.map(([o, n]) => (
                <div key={o} className="grid grid-cols-2 border-t border-white/10">
                  <div className="px-[clamp(16px,3vw,32px)] py-5 text-[clamp(14px,1.6vw,18px)] text-white/50 line-through decoration-[rgba(240,81,79,.9)] decoration-[1.5px]">{o}</div>
                  <div className="flex items-baseline gap-2.5 border-l border-white/12 px-[clamp(16px,3vw,32px)] py-5 text-[clamp(15px,1.6vw,18px)] font-extrabold text-white"><span className="text-[#F58A1F]">✓</span><span>{n}</span></div>
                </div>
              ))}
            </div>
            <SectionCta label="Ikut kelas praktek" waLink={waLink} dark center />
          </div>
        </section>

        {/* TESTIMONI */}
        <section id="testimoni" className={`bg-[#F6F4EF] ${SEC_PAD}`}>
          <div className={`${WRAP} flex flex-col gap-10`}>
            <div className="mx-auto flex max-w-[800px] flex-col items-center gap-5 text-center">
              <Badge>Hasil peserta</Badge>
              <h2 className={H2_LIGHT}>Mereka Sudah Mulai Dapat Chat &amp; Orderan dari Iklannya Sendiri</h2>
              <p className={`${SUB} text-[#55607A]`}>Skincare, fashion, makanan, sampai bisnis jasa. Ini cerita dari peserta yang sudah praktek.</p>
            </div>
            <div className="flex flex-wrap items-stretch gap-5">
              <div className="grid min-w-0 flex-[1_1_560px] grid-cols-[repeat(auto-fit,minmax(min(100%,max(240px,calc(50%-10px))),1fr))] content-start gap-5">
                {VIDEOS.map((v) => <VideoCard key={v.id} v={v} playing={playing === v.id} onPlay={() => setPlaying(v.id)} />)}
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[18px] border-[1.5px] border-dashed border-[rgba(14,26,51,.22)] bg-[#E8E4DA] p-4 text-center">
                  <span className="rounded-[4px] bg-[#FFE45C] px-2 py-0.5 text-[13px] font-bold text-[#0E1A33]">[VIDEO SUASANA KELAS]</span>
                </div>
              </div>
              <div className="mx-auto flex min-w-[240px] flex-[0_1_300px] flex-col">
                <VideoCard v={SHORT} playing={playing === SHORT.id} onPlay={() => setPlaying(SHORT.id)} vertical />
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] gap-[clamp(12px,2vw,20px)]">
              {TESTI_SS.map((t, i) => (
                <div key={t.ph} className="flex flex-col gap-2.5">
                  <div className={`relative aspect-[3/4] overflow-hidden rounded-2xl border border-[rgba(14,26,51,.1)] bg-white ${LIFT_LIGHT}`}><Slot src={IMG.testi[i]} label={t.ph} tone="light" /></div>
                  <span className="text-[13px] font-semibold text-[#55607A]">{t.caption}</span>
                </div>
              ))}
            </div>
            <SectionCta label="Mulai hasilkan orderan" waLink={waLink} center />
          </div>
        </section>

        {/* MENTOR */}
        <section className="relative overflow-hidden border-t border-white/6 bg-[#0B1530] text-white">
          <div className="absolute top-0 left-0 h-[clamp(520px,70vw,680px)] w-full overflow-hidden min-[980px]:h-full min-[980px]:w-[55%]">
            <div className="absolute -top-[30%] -left-[18%] flex h-[170%] w-[130%] origin-center -rotate-12 gap-3.5">
              {[0, 1, 2].map((c) => (
                <div key={c} className="flex flex-[1_1_0] flex-col gap-3.5" style={{ animation: `adsDrift ${22 + c * 5}s ease-in-out ${-c * 4}s infinite alternate`, marginTop: c === 1 ? -120 : c === 2 ? -40 : 0 }}>
                  {[0, 1, 2, 3].map((r) => {
                    const n = c * 4 + r;
                    return (
                      <div key={r} className={`relative overflow-hidden rounded-[14px] border border-white/8 bg-[#16244A] ${r % 2 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                        <Slot src={IMG.mentorEvents[n]} label={`Foto kelas / event ${n + 1}`} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,21,48,.35)_0%,rgba(11,21,48,.25)_55%,#0B1530_100%)] min-[980px]:hidden" />
            <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(11,21,48,.25)_0%,rgba(11,21,48,.45)_55%,#0B1530_100%),linear-gradient(180deg,#0B1530_0%,transparent_14%,transparent_86%,#0B1530_100%)] min-[980px]:block" />
          </div>
          <div className="pointer-events-none relative mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,72px)] px-[clamp(20px,4vw,40px)] py-[clamp(72px,10vw,128px)]">
            <div className="flex min-h-[clamp(380px,44vw,520px)] items-center justify-center min-[980px]:justify-end">
              <div className="pointer-events-auto relative aspect-[4/5] w-[min(320px,72%)] overflow-hidden rounded-[20px] border border-[rgba(245,138,31,.45)] bg-[#111D3D] shadow-[0_0_0_6px_rgba(11,21,48,.6),0_0_70px_-6px_rgba(245,138,31,.45),0_40px_80px_-30px_rgba(0,0,0,.9)]">
                <img src={IMG.coach} alt="Coach Adspreneur" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            <div className="pointer-events-auto flex flex-col gap-[18px]">
              <Badge dark>Mentor kamu</Badge>
              <div className="flex flex-col gap-2">
                <h2 className={`${DISPLAY} m-0 text-[clamp(40px,5vw,60px)] leading-none`}><span className="rounded-md bg-[#FFE45C] px-2 text-[#0E1A33]">[NAMA COACH]</span></h2>
                <span className="text-sm font-bold text-[#FFB36B]">Praktisi iklan digital, 7 tahun di lapangan</span>
              </div>
              <p className="m-0 text-[clamp(15px,1.4vw,16px)] leading-[1.65] text-pretty text-white/75">7 tahun menjalankan iklan untuk berbagai bisnis. Yang diajarkan adalah cara yang dipakai sendiri, bukan teori buku.</p>
              <p className="m-0 text-sm leading-[1.6]"><span className="rounded-[4px] bg-[#FFE45C] px-1.5 font-semibold text-[#0E1A33]">[TAMBAHKAN 1–2 KALIMAT: bisnis atau klien yang pernah ditangani.]</span></p>
              <div className="flex flex-wrap gap-2">
                {['Meta Ads', 'Google Ads', 'TikTok Ads', 'Landing page & closing WA'].map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/4 px-3 py-[7px] text-[12.5px] font-bold text-white/85"><span className="h-1.5 w-1.5 rounded-full bg-[#F58A1F]" />{c}</span>
                ))}
              </div>
              <div className="mt-1 flex flex-wrap gap-3">
                {([['7 th', 'praktek ngiklan', false], ['[ANGKA]', 'alumni kelas', true], ['[ANGKA]', 'kota penyelenggaraan', true]] as [string, string, boolean][]).map(([big, label, todo]) => (
                  <div key={label} className={`flex flex-[1_1_140px] flex-col gap-1.5 rounded-[14px] border border-white/12 bg-white/3 p-[18px] ${LIFT_DARK}`}>
                    <span className={`${DISPLAY} text-[clamp(30px,3.2vw,40px)] leading-none text-[#F58A1F]`}>{todo ? <span className="rounded-[4px] bg-[#FFE45C] px-1.5 text-[.7em] text-[#0E1A33]">{big}</span> : big}</span>
                    <span className="text-[13px] font-semibold text-white/62">{label}</span>
                  </div>
                ))}
              </div>
              <blockquote className="m-0 mt-1.5 border-l-[3px] border-[#F58A1F] py-1 pl-5 text-[clamp(17px,1.7vw,20px)] leading-[1.5] font-bold text-pretty text-white">“Kamu cukup bayar pengalaman kami, tanpa buang banyak budget, waktu, dan salah uji coba sendiri.”</blockquote>
              <SectionCta label="Belajar langsung bareng coach" waLink={waLink} dark />
            </div>
          </div>
        </section>

        {/* SETELAH KELAS + GARANSI */}
        <section className={`bg-[#F6F4EF] ${SEC_PAD}`}>
          <div className={`${WRAP} flex flex-col gap-11`}>
            <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
              <Badge>Setelah kelas selesai</Badge>
              <h2 className={H2_LIGHT}>Kelas Selesai, Pendampingan Jalan Terus</h2>
              <p className={`${SUB} text-[#55607A]`}>Iklan butuh penyesuaian terus. Karena itu kamu nggak ditinggal setelah hari ke-2.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
              {AFTER.map((a, i) => (
                <div key={a.title} className={`relative flex flex-col gap-3 overflow-hidden rounded-[20px] border border-[rgba(14,26,51,.08)] bg-white p-7 ${LIFT_LIGHT}`}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#FFF3E6]"><Icon name={a.icon} className="h-[26px] w-[26px]" color="#F58A1F" /></span>
                    <span className={`${DISPLAY} pointer-events-none absolute -top-1 right-5 text-[84px] leading-none text-[rgba(26,79,160,.07)]`}>{pad2(i + 1)}</span>
                  </div>
                  <span className="text-lg leading-[1.3] font-extrabold text-[#0E1A33]">{a.title}</span>
                  <span className="text-[15px] leading-[1.6] text-[#55607A]">{a.body}</span>
                </div>
              ))}
            </div>
            <div className={`flex flex-wrap items-center gap-[clamp(20px,4vw,40px)] rounded-3xl bg-[#F58A1F] p-[clamp(20px,4vw,44px)] text-[#0B1530] ${LIFT} hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(245,138,31,.8)]`}>
              <div className={`${DISPLAY} flex aspect-square w-[clamp(84px,11vw,124px)] flex-col items-center justify-center rounded-full border-[3px] border-[#0B1530] text-center leading-none`}>
                <span className="text-[clamp(20px,2.6vw,28px)]">GARANSI</span>
                <span className="mt-1 text-[clamp(11px,1.2vw,13px)] tracking-[.12em]">ADSPRENEUR</span>
              </div>
              <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5">
                <h3 className={`${DISPLAY} m-0 text-[clamp(28px,3.6vw,42px)] leading-none text-balance`}>Garansi: rasakan hasil iklanmu sebelum kelas selesai</h3>
                <p className="m-0 text-[clamp(15px,1.4vw,16px)] leading-[1.6] text-pretty text-[#2A1A08]">Iklanmu tayang dan kamu lihat respons calon pembeli selama kelas, bukan setelah pulang.</p>
                <p className="m-0 text-[13px] leading-[1.5]"><span className={`${TODO} font-bold`}>[ISI SYARAT &amp; KETENTUAN GARANSI]</span></p>
              </div>
            </div>
            <SectionCta label="Daftar sekarang" waLink={waLink} center />
          </div>
        </section>

        {/* JADWAL & HARGA */}
        <section id="jadwal" className={`relative overflow-hidden bg-[#0B1530] text-white ${SEC_PAD}`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_30%_60%,rgba(245,138,31,.12),transparent_70%)]" />
          <div className="relative mx-auto flex max-w-[1080px] flex-col gap-11 px-[clamp(20px,4vw,40px)]">
            <div className="flex flex-col items-center gap-[18px] text-center">
              <span className="inline-flex items-center gap-2 self-center text-xs font-extrabold tracking-[.14em] text-[#FF6B5E] uppercase"><span className="h-2 w-2 rounded-full bg-[#FF6B5E]" />Jadwal &amp; pendaftaran</span>
              <h2 className={`${DISPLAY} m-0 text-[clamp(40px,6vw,68px)] leading-[.96] text-balance`}>Amankan Kursimu di Kelas Terdekat</h2>
              <p className="m-0 text-base leading-[1.6] text-white/70">Kursi dibatasi supaya setiap peserta tetap bisa dibimbing satu per satu.</p>
              <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
                {([[cd.d, 'HARI'], [cd.h, 'JAM'], [cd.m, 'MENIT'], [cd.s, 'DETIK']] as [string, string][]).map(([v, l]) => (
                  <div key={l} className="flex min-w-[68px] flex-col items-center gap-1 rounded-xl border border-white/14 bg-white/4 px-2.5 pt-3 pb-2.5">
                    <span className={`${DISPLAY} text-[34px] leading-none text-white tabular-nums`}>{v}</span>
                    <span className="text-[10px] font-bold tracking-[.14em] text-white/55">{l}</span>
                  </div>
                ))}
              </div>
              <span className="text-[13px] text-white/55">Hitung mundur ke kelas terdekat: <span className={`${TODO} font-semibold`}>[KOTA 1], [TANGGAL]</span></span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-7">
              <div className={`relative flex flex-col gap-[22px] rounded-3xl border-[1.5px] border-[rgba(245,138,31,.7)] bg-[linear-gradient(180deg,rgba(245,138,31,.08),rgba(255,255,255,.02))] px-[clamp(22px,3vw,32px)] pt-10 pb-[30px] shadow-[0_0_60px_-20px_rgba(245,138,31,.55)] ${LIFT} hover:-translate-y-1.5 hover:shadow-[0_0_80px_-16px_rgba(245,138,31,.7)]`}>
                <span className="absolute -top-3.5 left-6 rounded-full bg-[#F58A1F] px-3.5 py-[7px] text-[11px] font-extrabold tracking-[.1em] text-[#0B1530] uppercase shadow-[0_8px_20px_-8px_rgba(245,138,31,.9)]">Kelas offline 2 hari</span>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-[.14em] text-[#FFB36B] uppercase">Investasi kelas</span>
                  <span className="text-base text-white/50 line-through decoration-[rgba(240,81,79,.9)] decoration-[1.5px]"><span className={TODO}>[HARGA NORMAL]</span></span>
                  <span className={`${DISPLAY} text-[clamp(46px,5vw,60px)] leading-none`}><span className="rounded-md bg-[#FFE45C] px-2 text-[#0E1A33]">[HARGA KELAS]</span></span>
                </div>
                <div className="flex flex-col gap-4">
                  {FEATURES.map(([a, b]) => (
                    <div key={a} className="grid grid-cols-[20px_1fr] gap-3">
                      <span className="mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F58A1F] text-[11px] font-black text-[#0B1530]">✓</span>
                      <div className="flex flex-col gap-[3px]"><span className="text-[15px] font-bold text-white">{a}</span><span className="text-[13px] leading-[1.5] text-white/60">{b}</span></div>
                    </div>
                  ))}
                </div>
                <a href="#daftar" className="flex items-center justify-center gap-2.5 rounded-full bg-[#F58A1F] px-6 py-[19px] text-base font-extrabold text-[#0B1530] shadow-[0_16px_40px_-12px_rgba(245,138,31,.85)] hover:bg-[#FF9D3D] hover:text-[#0B1530]">Daftar sekarang <span className="text-lg">→</span></a>
              </div>
              <div className={`flex flex-col gap-5 rounded-3xl border border-white/12 bg-white/3 px-[clamp(22px,3vw,32px)] pt-10 pb-[30px] ${LIFT} hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,.75)]`}>
                <span className="text-xs font-bold tracking-[.14em] text-[#FFB36B] uppercase">Pilih kota &amp; tanggal</span>
                <div className="flex flex-col gap-2.5">
                  {SCHEDULE.map((s) => (
                    <div key={s.city} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3.5 rounded-2xl border bg-white/3 p-[18px] ${LIFT} hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,.75)] ${s.hot ? 'border-[rgba(245,138,31,.6)]' : 'border-white/10'}`}>
                      <div className="flex min-w-0 flex-col gap-2">
                        <span className={`${DISPLAY} text-2xl leading-none`}><span className={TODO}>{s.city}</span></span>
                        <span className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-[13px]"><span className={`${TODO} font-semibold`}>[TANGGAL]</span><span className={`${TODO} font-semibold`}>[NAMA VENUE]</span></span>
                      </div>
                      <span className={`whitespace-nowrap rounded-full px-3 py-[7px] text-xs font-extrabold ${s.hot ? 'bg-[#F58A1F] text-[#0B1530]' : 'bg-white/10 text-white'}`}>{s.status}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[13px] text-white/55">Semua kelas berlangsung 08.00–17.00 waktu setempat.</span>
                <a href={waLink} target="_blank" rel="noopener" className="flex justify-center rounded-full border-[1.5px] border-white/24 px-6 py-[18px] text-[15px] font-bold text-white hover:border-white hover:text-white">Tanya jadwal via WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section id="daftar" className={`relative overflow-hidden border-t border-white/6 bg-[#0B1530] text-white ${SEC_PAD}`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_45%,rgba(245,138,31,.1),transparent_70%)]" />
          <div className="relative mx-auto flex max-w-[760px] flex-col gap-9 px-[clamp(20px,4vw,40px)]">
            <div className="flex flex-col items-center gap-[18px] text-center">
              <Badge dark>Form pendaftaran</Badge>
              <h2 className={`${DISPLAY} m-0 text-[clamp(42px,6vw,68px)] leading-[.96]`}>Daftar Sekarang</h2>
              <p className="m-0 max-w-[560px] text-base leading-[1.6] text-pretty text-white/70">Isi data di bawah. Admin akan hubungi kamu via WhatsApp untuk konfirmasi jadwal &amp; pembayaran.</p>
            </div>
            <div className="rounded-3xl border border-[rgba(245,138,31,.45)] bg-[#08112A] px-[clamp(20px,6vw,72px)] py-[clamp(28px,6vw,56px)] shadow-[0_0_70px_-24px_rgba(245,138,31,.5)]">
              {sent ? (
                <div className="flex flex-col gap-2 rounded-2xl border border-[rgba(52,199,120,.4)] bg-[rgba(52,199,120,.1)] p-6">
                  <span className="text-lg font-extrabold text-white">Pendaftaran terkirim, {form.name}!</span>
                  <span className="text-[15px] leading-[1.6] text-white/75">Admin akan menghubungi kamu di {form.wa} untuk konfirmasi jadwal dan pembayaran.</span>
                  <button type="button" onClick={() => { setSent(false); setForm({ name: '', wa: '', city: '', biz: '' }); }} className="mt-1.5 cursor-pointer self-start border-0 bg-transparent p-0 text-sm font-bold text-[#F58A1F] underline">Isi ulang formulir</button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <span className={`${DISPLAY.replace('font-extrabold', 'font-bold')} text-[22px] text-white`}>Pilih kelas:</span>
                    <span className="text-[13px] font-bold text-white/75">Kota &amp; tanggal</span>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-px overflow-hidden rounded-xl border border-white/12 bg-white/12">
                      {SCHEDULE.map((s) => {
                        const opt = cityOption(s);
                        const on = form.city === opt;
                        return (
                          <button key={s.city} type="button" onClick={() => { setForm((f) => ({ ...f, city: opt })); setErr(''); }} className={`grid cursor-pointer grid-cols-[16px_1fr] items-start gap-2.5 border-0 p-3.5 text-left text-white outline-[1.5px] -outline-offset-[1.5px] ${on ? 'bg-[rgba(245,138,31,.12)] outline-solid outline-[#F58A1F]' : 'bg-[#131E3B] outline-transparent'}`}>
                            <span className={`mt-0.5 h-4 w-4 rounded-full bg-[#0B1530] ${on ? 'border-[5px] border-[#F58A1F]' : 'border-[1.5px] border-white/30'}`} />
                            <span className="flex flex-col gap-1"><span className="text-sm font-bold"><span className={TODO}>{s.city}</span></span><span className="text-xs text-white/60">{s.status}</span></span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className={`${DISPLAY.replace('font-extrabold', 'font-bold')} text-[22px] text-white`}>Data peserta:</span>
                    <input value={form.name} onChange={setField('name')} placeholder="Nama kamu" className={INPUT} />
                    <input value={form.wa} onChange={setField('wa')} placeholder="Nomor WhatsApp (08xx xxxx xxxx)" inputMode="tel" className={INPUT} />
                    <input value={form.biz} onChange={setField('biz')} placeholder="Jenis usaha — contoh: fashion, skincare, jasa" className={INPUT} />
                  </div>
                  {err && <div className="text-sm font-semibold text-[#FF7A70]">{err}</div>}
                  <div className="flex flex-col gap-3.5">
                    <button type="submit" className="cursor-pointer rounded-full border-0 bg-[#F58A1F] px-6 py-[19px] text-base font-extrabold text-[#0B1530] shadow-[0_16px_40px_-12px_rgba(245,138,31,.85)] hover:bg-[#FF9D3D]">Kirim pendaftaran →</button>
                    <a href={waLink} target="_blank" rel="noopener" className="text-center text-sm font-semibold text-white/70 hover:text-white">Masih ragu? <span className="text-[#F58A1F]">Tanya admin dulu via WhatsApp</span></a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={`bg-white ${SEC_PAD}`}>
          <div className="mx-auto flex max-w-[860px] flex-col gap-10 px-[clamp(20px,4vw,40px)]">
            <h2 className={`${H2_LIGHT} text-center`}>Pertanyaan yang Sering Ditanyakan</h2>
            <div className="flex flex-col border-t border-[rgba(14,26,51,.12)]">
              {FAQS.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="border-b border-[rgba(14,26,51,.12)]">
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="grid w-full cursor-pointer grid-cols-[1fr_32px] items-center gap-4 border-0 bg-transparent py-[22px] text-left text-[17px] leading-[1.4] font-bold text-[#0E1A33]">
                      <span>{f.q}</span>
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none ${open ? 'bg-[#0B1530] text-white' : 'bg-[#F1EEE7] text-[#0E1A33]'}`}>{open ? '−' : '+'}</span>
                    </button>
                    {open && (
                      <div className="pr-2 pb-[22px] text-[clamp(15px,1.4vw,16px)] leading-[1.65] text-[#3B4660]">
                        {f.todo ? <span className="rounded-[4px] bg-[#FFE45C] px-1.5 py-px font-semibold text-[#0E1A33]">{f.a}</span> : <span>{f.a}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <SectionCta label="Daftar sekarang" waLink={waLink} center />
          </div>
        </section>

        {/* CTA PENUTUP */}
        <section className="relative overflow-hidden bg-[#0B1530] py-[clamp(80px,11vw,140px)] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_110%,rgba(245,138,31,.35),transparent_70%)]" />
          <div className="relative mx-auto flex max-w-[900px] flex-col items-center gap-[26px] px-[clamp(20px,4vw,40px)] text-center">
            <h2 className={`${DISPLAY} m-0 text-[clamp(42px,6.4vw,80px)] leading-[.95] text-balance`}>Mulai Iklan yang <span className="text-[#F58A1F]">Menghasilkan</span>, Bukan yang Menghabiskan Budget</h2>
            <p className="m-0 max-w-[620px] text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-white/75">2 hari praktek langsung, pendampingan seumur hidup. Kursi terbatas di setiap kota.</p>
            <div className="flex w-full flex-wrap justify-center gap-3">
              <a href="#daftar" className="inline-flex max-w-full flex-[1_1_200px] justify-center rounded-xl bg-[#F58A1F] px-[30px] py-[18px] text-base font-extrabold text-[#0B1530] shadow-[0_14px_34px_-12px_rgba(245,138,31,.75)] hover:bg-[#FF9D3D] hover:text-[#0B1530] min-[720px]:max-w-max">Daftar sekarang</a>
              <a href={waLink} target="_blank" rel="noopener" className="inline-flex max-w-full flex-[1_1_240px] justify-center rounded-xl border-[1.5px] border-white/28 px-[26px] py-[18px] text-base font-bold text-white hover:border-white hover:text-white min-[720px]:max-w-max">Tanya jadwal via WhatsApp</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`bg-[#070E22] pt-10 text-white/62 ${showSticky ? 'pb-[110px]' : 'pb-10'}`}>
          <div className={`${WRAP} flex flex-wrap items-center justify-between gap-5`}>
            <img src={IMG.logo} alt="Adspreneur.id" className="h-[30px] w-auto opacity-90" />
            <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2 text-[13px]">
              <span>Adspreneur.id ©2026</span>
              <span className={`${TODO} font-semibold`}>[ALAMAT KANTOR]</span>
              <span className={`${TODO} font-semibold`}>[NOMOR WHATSAPP]</span>
              <span className={`${TODO} font-semibold`}>[INSTAGRAM]</span>
            </div>
          </div>
        </footer>

        {/* FLOATING WHATSAPP */}
        <a href={waLink} target="_blank" rel="noopener" aria-label="Chat WhatsApp admin" className={`fixed right-[clamp(14px,2.5vw,28px)] z-[45] flex h-[58px] items-center rounded-full bg-[#25D366] px-3.5 text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,.7)] transition-[transform,bottom] duration-300 hover:-translate-y-[3px] hover:scale-[1.03] hover:text-white ${stickyVisible ? 'bottom-[92px] min-[1240px]:bottom-[clamp(14px,2.5vw,28px)]' : 'bottom-[clamp(14px,2.5vw,28px)]'}`}>
          <img src="https://cdn.simpleicons.org/whatsapp/white" alt="" className="block h-[30px] w-[30px]" />
        </a>

        {/* STICKY CTA */}
        {stickyVisible && (
          <div className="fixed right-3 bottom-3.5 left-3 z-40 mx-auto flex max-w-[560px] items-center gap-3 rounded-2xl border border-white/14 bg-[#0B1530] py-2.5 pr-2.5 pl-5 text-white shadow-[0_20px_50px_-16px_rgba(0,0,0,.6)]">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-sm font-extrabold">Kursi terbatas di setiap kota</span>
              <span className="truncate text-xs text-white/62">Kelas offline 2 hari · praktek 90%</span>
            </div>
            <a href="#daftar" className="shrink-0 rounded-[11px] bg-[#F58A1F] px-[18px] py-[13px] text-sm font-extrabold text-[#0B1530] hover:bg-[#FF9D3D] hover:text-[#0B1530]">Daftar sekarang</a>
          </div>
        )}
      </div>
    </>
  );
}

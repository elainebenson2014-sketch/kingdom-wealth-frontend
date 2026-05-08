import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy: "#0B1930",
  navyMid: "#142444",
  navyLight: "#1E3560",
  gold: "#C8A84B",
  goldLight: "#E4C97A",
  goldPale: "#FDF6E3",
  goldBorder: "#E8D18A",
  forest: "#1A4A38",
  forestLight: "#236B52",
  sage: "#D0E8DC",
  cream: "#FAFAF6",
  white: "#FFFFFF",
  txt: "#0B1930",
  txtMid: "#3D4F6B",
  txtLight: "#7A8BA8",
  border: "#E4EAF2",
  danger: "#B83232",
  successBg: "#EBF7F1",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:${C.cream};color:${C.txt};line-height:1.65;-webkit-font-smoothing:antialiased}

:root{
  --navy:${C.navy};--gold:${C.gold};--forest:${C.forest};
  --serif:'Lora',Georgia,serif;--sans:'Plus Jakarta Sans',sans-serif;
}

/* ── LAYOUT ── */
.app{display:flex;flex-direction:column;min-height:100vh}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  height:64px;display:flex;align-items:center;justify-content:space-between;
  padding:0 2rem;
  background:rgba(11,25,48,0.97);
  border-bottom:1px solid rgba(200,168,75,0.18);
  backdrop-filter:blur(16px);
}
.nav-brand{display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none}
.nav-brand-mark{
  width:34px;height:34px;border-radius:8px;
  background:linear-gradient(135deg,${C.gold},${C.goldLight});
  display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;
}
.nav-brand-name{font-family:var(--serif);font-size:1rem;font-weight:600;color:white;letter-spacing:0.01em}
.nav-brand-name em{color:${C.goldLight};font-style:normal}
.nav-tabs{display:flex;gap:0.25rem}
.nav-tab{
  padding:7px 16px;border-radius:6px;font-size:0.82rem;font-weight:500;
  color:rgba(255,255,255,0.6);cursor:pointer;transition:all 0.15s;border:none;background:none;
}
.nav-tab:hover{color:white;background:rgba(255,255,255,0.07)}
.nav-tab.active{color:${C.goldLight};background:rgba(200,168,75,0.12)}
.nav-right{display:flex;gap:0.6rem;align-items:center}
.phase-badge{
  font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  padding:4px 12px;border-radius:100px;
  background:rgba(200,168,75,0.15);color:${C.goldLight};
  border:1px solid rgba(200,168,75,0.3);
}

/* ── BUTTONS ── */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:7px;
  padding:11px 24px;border-radius:8px;font-family:var(--sans);
  font-size:0.875rem;font-weight:600;cursor:pointer;transition:all 0.18s;border:none;
  letter-spacing:0.01em;
}
.btn-gold{background:linear-gradient(135deg,${C.gold},${C.goldLight});color:${C.navy};box-shadow:0 3px 12px rgba(200,168,75,0.3)}
.btn-gold:hover{transform:translateY(-1px);box-shadow:0 5px 18px rgba(200,168,75,0.4)}
.btn-navy{background:${C.navy};color:white;box-shadow:0 3px 12px rgba(11,25,48,0.2)}
.btn-navy:hover{background:${C.navyMid};transform:translateY(-1px)}
.btn-outline{background:transparent;color:${C.navy};border:1.5px solid ${C.border}}
.btn-outline:hover{border-color:${C.gold};color:${C.gold}}
.btn-ghost-dark{background:rgba(255,255,255,0.1);color:white;border:1px solid rgba(255,255,255,0.2)}
.btn-ghost-dark:hover{background:rgba(255,255,255,0.18)}
.btn-sm{padding:8px 18px;font-size:0.8rem}
.btn-lg{padding:15px 36px;font-size:0.95rem}
.btn-block{width:100%}
.btn:disabled{opacity:0.5;cursor:not-allowed;transform:none}

/* ── CARDS ── */
.card{background:white;border-radius:14px;border:1px solid ${C.border};box-shadow:0 2px 10px rgba(11,25,48,0.05);overflow:hidden}
.card-p{padding:1.75rem}
.card-navy{background:${C.navy};border-color:${C.navyMid};color:white}
.card-gold{background:linear-gradient(135deg,${C.gold},${C.goldLight});border:none;color:${C.navy}}
.card-forest{background:${C.forest};border-color:${C.forestLight};color:white}
.card-goldpale{background:${C.goldPale};border-color:${C.goldBorder}}
.card-sage{background:${C.sage};border-color:#A8D4BC}

/* ── PAGE SECTIONS ── */
.page{padding-top:64px;min-height:100vh}

/* ── HERO ── */
.hero{
  min-height:100vh;padding-top:64px;
  background:linear-gradient(150deg,${C.navy} 0%,${C.navyMid} 45%,${C.forest} 100%);
  display:flex;align-items:center;position:relative;overflow:hidden;
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 75% 50%,rgba(200,168,75,0.12) 0%,transparent 70%),
    radial-gradient(ellipse 40% 60% at 15% 80%,rgba(26,74,56,0.5) 0%,transparent 60%);
}
.hero-grid{max-width:1180px;margin:0 auto;padding:4rem 2rem;width:100%;display:grid;grid-template-columns:1.05fr 0.95fr;gap:5rem;align-items:center;position:relative;z-index:1}
.hero-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:100px;background:rgba(200,168,75,0.12);border:1px solid rgba(200,168,75,0.28);color:${C.goldLight};font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1.5rem}
.hero-pill-dot{width:6px;height:6px;border-radius:50%;background:${C.gold};animation:glow 2s ease-in-out infinite}
@keyframes glow{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(200,168,75,0)}50%{opacity:0.7;box-shadow:0 0 0 4px rgba(200,168,75,0.2)}}
.hero-h1{font-family:var(--serif);font-size:3.5rem;font-weight:600;line-height:1.1;color:white;margin-bottom:1.25rem}
.hero-h1 .g{color:${C.goldLight};font-style:italic}
.hero-lead{font-size:1.05rem;color:rgba(255,255,255,0.7);line-height:1.8;margin-bottom:2.5rem;max-width:460px}
.hero-ctas{display:flex;gap:0.85rem;flex-wrap:wrap;margin-bottom:3rem}
.hero-proof{display:flex;gap:1.75rem}
.proof-item{display:flex;align-items:center;gap:7px;font-size:0.78rem;color:rgba(255,255,255,0.55)}
.proof-dot{width:5px;height:5px;border-radius:50%;background:${C.gold};flex-shrink:0}

/* ── AGENT PREVIEW CARD ── */
.agent-preview{
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
  border-radius:18px;padding:1.5rem;backdrop-filter:blur(20px);
}
.agent-preview-header{display:flex;align-items:center;gap:10px;margin-bottom:1.25rem}
.agent-avatar-sm{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,${C.gold},${C.goldLight});display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.agent-name-sm{font-size:0.85rem;font-weight:600;color:white}
.agent-status{font-size:0.7rem;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:5px}
.status-dot{width:5px;height:5px;border-radius:50%;background:#4ADE80;animation:glow 2s infinite}
.preview-msgs{display:flex;flex-direction:column;gap:0.75rem}
.pmsg{padding:0.8rem 1rem;border-radius:10px;font-size:0.82rem;line-height:1.6}
.pmsg-ai{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);border-radius:10px 10px 10px 2px}
.pmsg-user{background:rgba(200,168,75,0.15);color:${C.goldLight};border-radius:10px 10px 2px 10px;text-align:right;align-self:flex-end;max-width:85%}
.preview-float{position:absolute;background:white;border-radius:10px;padding:0.85rem 1.1rem;box-shadow:0 8px 28px rgba(0,0,0,0.2);display:flex;align-items:center;gap:9px;white-space:nowrap}
.pf1{top:-16px;right:-16px}
.pf2{bottom:-16px;left:-16px}
.pf-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.pf-label{font-size:0.72rem;color:${C.txtLight}}
.pf-val{font-size:0.9rem;font-weight:700;color:${C.txt}}
.preview-wrap{position:relative}

/* ── SECTIONS ── */
.section{padding:5.5rem 2rem}
.sec-inner{max-width:1180px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:4rem}
.sec-eye{font-size:0.72rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${C.gold};margin-bottom:0.65rem}
.sec-h2{font-family:var(--serif);font-size:2.4rem;font-weight:600;color:${C.navy};line-height:1.2;margin-bottom:0.9rem}
.sec-h2 em{font-style:italic;color:${C.gold}}
.sec-sub{font-size:1rem;color:${C.txtMid};max-width:520px;margin:0 auto;line-height:1.85}

/* ── ROADMAP ── */
.roadmap{background:${C.navy};padding:5.5rem 2rem}
.roadmap-inner{max-width:1100px;margin:0 auto}
.phase-tabs{display:flex;gap:0.5rem;margin-bottom:3rem;justify-content:center;flex-wrap:wrap}
.phase-tab{padding:10px 24px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.15s;border:1.5px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5);background:transparent}
.phase-tab:hover{border-color:rgba(200,168,75,0.4);color:${C.goldLight}}
.phase-tab.active{background:rgba(200,168,75,0.15);border-color:${C.gold};color:${C.goldLight}}
.phase-content{display:grid;grid-template-columns:1fr 2fr;gap:3rem;align-items:start}
.phase-meta{}
.phase-num{font-family:var(--serif);font-size:5rem;font-weight:600;color:rgba(200,168,75,0.15);line-height:1;margin-bottom:0.5rem}
.phase-title{font-family:var(--serif);font-size:1.6rem;font-weight:600;color:white;margin-bottom:0.75rem}
.phase-desc{font-size:0.9rem;color:rgba(255,255,255,0.6);line-height:1.8;margin-bottom:1.5rem}
.phase-timing{display:inline-flex;align-items:center;gap:7px;padding:6px 14px;border-radius:100px;background:rgba(200,168,75,0.12);border:1px solid rgba(200,168,75,0.25);font-size:0.75rem;font-weight:600;color:${C.goldLight}}
.feature-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.85rem}
.feature-chip{display:flex;align-items:center;gap:10px;padding:1rem;border-radius:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);transition:all 0.15s}
.feature-chip:hover{background:rgba(200,168,75,0.08);border-color:rgba(200,168,75,0.2)}
.feature-chip-icon{font-size:1.25rem;flex-shrink:0}
.feature-chip-label{font-size:0.85rem;font-weight:500;color:rgba(255,255,255,0.8)}
.feature-chip-desc{font-size:0.75rem;color:rgba(255,255,255,0.45);margin-top:2px}

/* ── PRICING ── */
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:960px;margin:0 auto}
.price-card{padding:2.25rem;position:relative;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s}
.price-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(11,25,48,0.12)}
.price-card.featured{border:2px solid ${C.gold};box-shadow:0 4px 20px rgba(200,168,75,0.2)}
.price-card.featured::before{content:'Most Popular';position:absolute;top:0;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,${C.gold},${C.goldLight});color:${C.navy};font-size:0.7rem;font-weight:700;padding:4px 20px;border-radius:0 0 8px 8px;letter-spacing:0.08em;text-transform:uppercase}
.price-label{font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.txtLight};margin-bottom:0.5rem;margin-top:0.25rem}
.price-name{font-family:var(--serif);font-size:1.3rem;font-weight:600;color:${C.navy};margin-bottom:1rem}
.price-amount{display:flex;align-items:baseline;gap:4px;margin-bottom:0.25rem}
.price-dollar{font-family:var(--serif);font-size:2.8rem;font-weight:600;color:${C.navy};line-height:1}
.price-period{font-size:0.85rem;color:${C.txtLight}}
.price-note{font-size:0.78rem;color:${C.txtLight};margin-bottom:1.5rem}
.price-features{list-style:none;margin-bottom:2rem;display:flex;flex-direction:column;gap:0.6rem}
.price-features li{display:flex;align-items:flex-start;gap:9px;font-size:0.85rem;color:${C.txtMid}}
.price-features li::before{content:'✓';color:${C.forest};font-weight:700;flex-shrink:0;margin-top:1px}
.divider{height:1px;background:${C.border};margin:1.5rem 0}

/* ── TECH STACK ── */
.stack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;max-width:960px;margin:0 auto}
.stack-card{padding:1.5rem;display:flex;align-items:flex-start;gap:1rem;transition:transform 0.15s}
.stack-card:hover{transform:translateY(-2px)}
.stack-icon{font-size:2rem;flex-shrink:0;margin-top:2px}
.stack-name{font-size:0.95rem;font-weight:700;color:${C.navy};margin-bottom:0.2rem}
.stack-purpose{font-size:0.8rem;color:${C.txtLight};line-height:1.5}
.stack-badge{display:inline-block;margin-top:0.5rem;padding:2px 9px;border-radius:100px;font-size:0.68rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase}
.badge-ready{background:${C.successBg};color:${C.forest}}
.badge-phase2{background:rgba(200,168,75,0.12);color:#8B6914}

/* ── AGENT CHAT PAGE ── */
.agent-page{padding-top:64px;min-height:100vh;background:${C.cream};display:flex;flex-direction:column}
.agent-top-bar{
  background:white;border-bottom:1px solid ${C.border};
  padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;
}
.agent-top-info{display:flex;align-items:center;gap:12px}
.agent-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,${C.gold},${C.goldLight});display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.agent-top-name{font-weight:700;font-size:0.95rem;color:${C.navy}}
.agent-top-status{font-size:0.75rem;color:${C.txtLight};display:flex;align-items:center;gap:5px}
.agent-online-dot{width:6px;height:6px;border-radius:50%;background:#22C55E}
.agent-top-right{display:flex;gap:0.6rem;align-items:center}

.chat-layout{flex:1;display:flex;max-width:1100px;width:100%;margin:0 auto;padding:1.5rem 1.5rem;gap:1.5rem;align-items:flex-start}

/* sidebar */
.chat-sidebar{width:280px;flex-shrink:0;display:flex;flex-direction:column;gap:1rem;position:sticky;top:80px}
.sidebar-profile{padding:1.5rem}
.sidebar-avatar-lg{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,${C.navy},${C.navyLight});display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:1rem}
.sidebar-username{font-weight:700;font-size:1rem;color:${C.navy}}
.sidebar-email{font-size:0.78rem;color:${C.txtLight};margin-bottom:1.25rem}
.sidebar-stat{display:flex;justify-content:space-between;padding:0.6rem 0;border-top:1px solid ${C.border};font-size:0.82rem}
.sidebar-stat-label{color:${C.txtLight}}
.sidebar-stat-val{font-weight:700;color:${C.navy}}
.sidebar-stat-val.red{color:${C.danger}}
.sidebar-stat-val.green{color:${C.forest}}

.lesson-card{padding:1.25rem}
.lesson-title{font-family:var(--serif);font-size:0.95rem;font-weight:600;color:${C.navy};margin-bottom:0.3rem}
.lesson-desc{font-size:0.78rem;color:${C.txtMid};line-height:1.6;margin-bottom:0.85rem}

.checkin-card{padding:1.25rem}
.checkin-title{font-size:0.8rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.gold};margin-bottom:0.75rem}
.checkin-item{display:flex;align-items:center;gap:8px;font-size:0.82rem;color:${C.txtMid};margin-bottom:0.5rem}
.checkin-check{width:16px;height:16px;border-radius:4px;border:1.5px solid ${C.border};display:flex;align-items:center;justify-content:center;flex-shrink:0}
.checkin-check.done{background:${C.forest};border-color:${C.forest};color:white;font-size:9px}

/* chat main */
.chat-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:1rem}
.messages-box{flex:1;display:flex;flex-direction:column;gap:0.85rem;min-height:420px;max-height:520px;overflow-y:auto;padding:0.5rem 0.25rem}
.messages-box::-webkit-scrollbar{width:4px}
.messages-box::-webkit-scrollbar-track{background:transparent}
.messages-box::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}

.msg-row{display:flex;gap:10px;align-items:flex-start}
.msg-row.user{flex-direction:row-reverse}
.msg-avatar{width:32px;height:32px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:15px}
.msg-avatar.ai{background:linear-gradient(135deg,${C.gold},${C.goldLight})}
.msg-avatar.user{background:${C.navy};color:white;font-size:12px;font-weight:700}
.msg-bubble{max-width:78%;padding:0.9rem 1.1rem;border-radius:14px;font-size:0.88rem;line-height:1.7}
.msg-bubble.ai{background:white;border:1px solid ${C.border};color:${C.txt};border-radius:4px 14px 14px 14px;box-shadow:0 2px 8px rgba(11,25,48,0.06)}
.msg-bubble.user{background:${C.navy};color:white;border-radius:14px 4px 14px 14px}
.msg-bubble.ai strong{color:${C.navy}}
.msg-time{font-size:0.65rem;color:${C.txtLight};margin-top:4px;text-align:right}
.msg-time.ai-time{text-align:left}

.typing-indicator{display:flex;gap:5px;align-items:center;padding:0.75rem 1rem}
.typing-dot{width:7px;height:7px;border-radius:50%;background:${C.txtLight};animation:bounce 1.2s infinite}
.typing-dot:nth-child(2){animation-delay:0.2s}
.typing-dot:nth-child(3){animation-delay:0.4s}
@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}

.chat-input-area{background:white;border-radius:14px;border:1.5px solid ${C.border};overflow:hidden;box-shadow:0 2px 10px rgba(11,25,48,0.05)}
.chat-input-area:focus-within{border-color:${C.gold};box-shadow:0 0 0 3px rgba(200,168,75,0.12)}
.chat-textarea{width:100%;padding:1rem 1.25rem 0.5rem;border:none;outline:none;font-family:var(--sans);font-size:0.9rem;color:${C.txt};resize:none;line-height:1.6;background:transparent;min-height:56px;max-height:140px}
.chat-input-bottom{display:flex;align-items:center;justify-content:space-between;padding:0.5rem 1rem 0.75rem}
.chat-hints{display:flex;gap:0.5rem;flex-wrap:wrap}
.chat-hint{padding:4px 12px;border-radius:100px;font-size:0.72rem;font-weight:500;background:${C.cream};border:1px solid ${C.border};color:${C.txtMid};cursor:pointer;transition:all 0.15s;white-space:nowrap}
.chat-hint:hover{border-color:${C.gold};color:${C.gold};background:${C.goldPale}}
.send-btn{width:36px;height:36px;border-radius:8px;background:${C.navy};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;transition:all 0.15s;flex-shrink:0}
.send-btn:hover{background:${C.navyMid}}
.send-btn:disabled{opacity:0.4;cursor:not-allowed}

/* ── VISION ── */
.vision-section{background:${C.navy};padding:6rem 2rem}
.vision-inner{max-width:1100px;margin:0 auto;text-align:center}
.vision-circles{display:flex;justify-content:center;align-items:center;gap:0;margin-bottom:4rem;flex-wrap:wrap}
.vision-circle{
  width:160px;height:160px;border-radius:50%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;border:2px solid rgba(200,168,75,0.25);
  margin:-12px;position:relative;cursor:default;transition:all 0.2s;
}
.vision-circle:hover{transform:scale(1.08);z-index:10;border-color:${C.gold}}
.vision-circle-1{background:rgba(11,25,48,0.9);z-index:6}
.vision-circle-2{background:rgba(20,36,68,0.92);z-index:5}
.vision-circle-3{background:rgba(30,53,96,0.92);z-index:4}
.vision-circle-4{background:rgba(26,74,56,0.92);z-index:3}
.vision-circle-5{background:rgba(35,107,82,0.92);z-index:2}
.vision-circle-6{background:rgba(200,168,75,0.2);z-index:1;border-color:rgba(200,168,75,0.5)}
.vc-icon{font-size:1.6rem;margin-bottom:0.3rem}
.vc-label{font-size:0.72rem;font-weight:600;color:rgba(255,255,255,0.85);text-align:center;letter-spacing:0.02em;line-height:1.3;padding:0 0.5rem}
.vision-title{font-family:var(--serif);font-size:2.6rem;font-weight:600;color:white;margin-bottom:1rem;line-height:1.2}
.vision-sub{font-size:1rem;color:rgba(255,255,255,0.6);max-width:560px;margin:0 auto 3rem;line-height:1.85}
.vision-verse{font-family:var(--serif);font-size:1.25rem;font-style:italic;color:rgba(255,255,255,0.85);max-width:640px;margin:0 auto 0.5rem;line-height:1.7}
.vision-ref{font-size:0.8rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${C.goldLight}}

/* ── POSITION STATEMENT ── */
.position-bar{background:linear-gradient(135deg,${C.gold},${C.goldLight});padding:3rem 2rem;text-align:center}
.pos-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(11,25,48,0.6);margin-bottom:0.75rem}
.pos-statement{font-family:var(--serif);font-size:2rem;font-weight:600;color:${C.navy};line-height:1.3;max-width:700px;margin:0 auto}

/* ── FORM ── */
.form-group{margin-bottom:1.1rem}
.form-label{display:block;font-size:0.82rem;font-weight:600;color:${C.txt};margin-bottom:0.4rem}
.form-input{width:100%;padding:10px 14px;border:1.5px solid ${C.border};border-radius:8px;font-family:var(--sans);font-size:0.9rem;color:${C.txt};outline:none;background:white;transition:border-color 0.18s,box-shadow 0.18s}
.form-input:focus{border-color:${C.gold};box-shadow:0 0 0 3px rgba(200,168,75,0.12)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:0.85rem}

/* ── MODAL ── */
.modal-overlay{position:fixed;inset:0;background:rgba(11,25,48,0.65);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:1rem}
.modal-box{background:white;border-radius:18px;padding:2.25rem;width:100%;max-width:420px;position:relative;box-shadow:0 20px 60px rgba(11,25,48,0.25)}
.modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.2rem;cursor:pointer;color:${C.txtLight};padding:4px 8px;border-radius:6px}
.modal-close:hover{background:${C.cream};color:${C.txt}}
.modal-h2{font-family:var(--serif);font-size:1.65rem;font-weight:600;color:${C.navy};margin-bottom:0.25rem}
.modal-sub{font-size:0.85rem;color:${C.txtLight};margin-bottom:1.75rem}
.modal-switch{text-align:center;margin-top:1rem;font-size:0.82rem;color:${C.txtLight}}
.modal-switch button{background:none;border:none;color:${C.gold};font-weight:700;cursor:pointer;font-size:0.82rem}
.alert{padding:10px 14px;border-radius:8px;font-size:0.82rem;margin-bottom:1rem;border:1px solid}
.alert-error{background:#FFF5F5;border-color:#FED7D7;color:${C.danger}}

/* ── FOOTER ── */
.footer{background:${C.navy};padding:2.5rem;text-align:center;border-top:1px solid rgba(200,168,75,0.12)}
.footer-brand{font-family:var(--serif);font-size:1rem;color:white;margin-bottom:0.35rem}
.footer-copy{font-size:0.75rem;color:rgba(255,255,255,0.3)}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr;gap:2.5rem}
  .agent-preview{display:none}
  .phase-content{grid-template-columns:1fr}
  .pricing-grid{grid-template-columns:1fr}
  .stack-grid{grid-template-columns:1fr 1fr}
  .chat-layout{flex-direction:column}
  .chat-sidebar{width:100%;position:static}
  .feature-grid{grid-template-columns:1fr}
  .nav-tabs{display:none}
  .vision-circles{gap:0.5rem}
  .vision-circle{width:120px;height:120px;margin:0}
  .form-row{grid-template-columns:1fr}
}
@media(max-width:600px){
  .hero-h1{font-size:2.4rem}
  .stack-grid{grid-template-columns:1fr}
  .section{padding:3.5rem 1.25rem}
  .nav{padding:0 1rem}
  .pricing-grid{grid-template-columns:1fr}
}

/* ── ANIM ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.a1{animation:fadeUp 0.55s ease both 0.08s}
.a2{animation:fadeUp 0.55s ease both 0.2s}
.a3{animation:fadeUp 0.55s ease both 0.34s}
.a4{animation:fadeUp 0.55s ease both 0.48s}
.a5{animation:fadeUp 0.55s ease both 0.62s}

/* message content formatting */
.msg-bubble ul{padding-left:1.2em;margin-top:0.4em}
.msg-bubble li{margin-bottom:0.2em}
.msg-bubble p+p{margin-top:0.5em}
`;

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Kingdom Wealth AI — a warm, faith-centered, expert financial stewardship coach. You serve individuals and families who want to honor God with their finances.

Your personality:
- Deeply encouraging, never shame-based or cold
- Blend biblical wisdom with practical financial expertise
- Teach one concept at a time — never overwhelm
- Celebrate every small win enthusiastically
- Reference scripture naturally when it fits

Your capabilities:
- Build personalized budgets (50/30/20 or 10-10-80 Kingdom method)
- Create debt reduction strategies (snowball or avalanche method)
- Design savings goals with timeline projections
- Teach financial literacy one lesson at a time
- Provide weekly accountability check-ins
- Offer stewardship devotionals and scripture

When a user shares their financial situation:
1. Acknowledge their courage in being honest
2. Identify the most urgent issue
3. Give ONE clear, actionable next step
4. Offer encouragement grounded in scripture

Format responses with clear structure using **bold** for emphasis, short bullet points, and always end with an uplifting word or scripture if relevant.

Current date context: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;

// ─── CALL ANTHROPIC API ───────────────────────────────────────────────────────
async function callAI(messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  if (!response.ok) throw new Error("API error");
  const data = await response.json();
  return data.content?.[0]?.text || "I'm here to help! Could you tell me more about your financial situation?";
}

// ─── PHASE DATA ───────────────────────────────────────────────────────────────
const PHASES = [
  {
    num: "01", title: "MVP Launch", timing: "Launch Ready Now",
    desc: "Your essential first product. Everything needed to deliver real transformation to your first 100 users — clean, focused, and powerful.",
    features: [
      { icon: "📊", label: "Budget Generator", desc: "AI-powered personalized budget" },
      { icon: "💳", label: "Debt Payoff Planner", desc: "Snowball & avalanche strategies" },
      { icon: "💰", label: "Savings Tracker", desc: "Goal-based savings roadmap" },
      { icon: "📖", label: "Stewardship Devotionals", desc: "Daily faith + finance content" },
      { icon: "✅", label: "Weekly AI Check-ins", desc: "Accountability reminders" },
      { icon: "🎓", label: "Financial Literacy", desc: "One concept at a time" },
    ]
  },
  {
    num: "02", title: "Growth Features", timing: "3–6 Months Post-Launch",
    desc: "After you've validated with real users, layer in deeper engagement tools that increase retention and community.",
    features: [
      { icon: "📓", label: "AI Financial Journal", desc: "Reflect, track, and grow" },
      { icon: "🔍", label: "Spending Analysis", desc: "Find and fix financial leaks" },
      { icon: "🎯", label: "Goal Tracking", desc: "Visual milestone tracking" },
      { icon: "👥", label: "Accountability Partner", desc: "Peer-to-peer support" },
      { icon: "🏠", label: "Family Budgeting", desc: "Household financial planning" },
      { icon: "⛪", label: "Church Workshops", desc: "Group financial ministry" },
    ]
  },
  {
    num: "03", title: "Specialized Agents", timing: "12–18 Months",
    desc: "Deploy a full suite of specialized AI agents — each expert in one domain — creating the most comprehensive faith-based financial platform available.",
    features: [
      { icon: "🤖", label: "Budget Agent", desc: "Hyper-personalized budgeting AI" },
      { icon: "🤖", label: "Debt Agent", desc: "Intelligent debt elimination" },
      { icon: "🤖", label: "Savings Agent", desc: "Automated savings optimizer" },
      { icon: "🤖", label: "Business Coach Agent", desc: "Kingdom entrepreneur guidance" },
      { icon: "🤖", label: "Stewardship Agent", desc: "Giving and legacy planning" },
      { icon: "🤖", label: "Entrepreneurship Agent", desc: "Business launch & scaling" },
    ]
  }
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <Nav page={page} setPage={setPage} user={user} onAuth={() => setAuthModal("signup")} onSignin={() => setAuthModal("login")} onLogout={() => { setUser(null); setPage("landing"); }} />
        {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onAuth={(u) => { setUser(u); setAuthModal(null); }} switchMode={(m) => setAuthModal(m)} />}
        {page === "landing" && <LandingPage setPage={setPage} onStart={() => user ? setPage("coach") : setAuthModal("signup")} activePhase={activePhase} setActivePhase={setActivePhase} />}
        {page === "coach" && <CoachPage user={user} setPage={setPage} />}
      </div>
    </>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, user, onAuth, onSignin, onLogout }) {
  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => setPage("landing")}>
        <div className="nav-brand-mark">👑</div>
        <span className="nav-brand-name">Kingdom <em>Wealth</em> AI</span>
      </div>
      <div className="nav-tabs">
        {[["landing","Vision"],["coach","AI Coach"]].map(([p,l]) => (
          <button key={p} className={`nav-tab ${page===p?"active":""}`} onClick={() => setPage(p)}>{l}</button>
        ))}
      </div>
      <div className="nav-right">
        <div className="phase-badge">MVP Ready</div>
        {user ? (
          <>
            <span style={{ fontSize:"0.82rem",color:"rgba(255,255,255,0.6)" }}>Hi, {user.name.split(" ")[0]}</span>
            <button className="btn btn-ghost-dark btn-sm" onClick={onLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost-dark btn-sm" onClick={onSignin}>Sign In</button>
            <button className="btn btn-gold btn-sm" onClick={onAuth}>Get Started Free</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth, switchMode }) {
  const [f, setF] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");
  const isLogin = mode === "login";
  const submit = () => {
    if (!f.email || !f.password || (!isLogin && !f.name)) { setErr("Please fill in all fields."); return; }
    onAuth({ name: f.name || f.email.split("@")[0], email: f.email });
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ textAlign:"center",marginBottom:"1.5rem" }}>
          <div style={{ fontSize:"2.2rem",marginBottom:"0.5rem" }}>👑</div>
          <h2 className="modal-h2">{isLogin ? "Welcome Back" : "Begin Your Journey"}</h2>
          <p className="modal-sub">{isLogin ? "Sign in to your Kingdom Wealth account" : "Join thousands building Kingdom wealth"}</p>
        </div>
        {err && <div className="alert alert-error">{err}</div>}
        {!isLogin && <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="Your name" value={f.name} onChange={e => setF({...f,name:e.target.value})} /></div>}
        <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="you@email.com" value={f.email} onChange={e => setF({...f,email:e.target.value})} /></div>
        <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="••••••••" value={f.password} onChange={e => setF({...f,password:e.target.value})} /></div>
        <button className="btn btn-navy btn-block" style={{ marginTop:"0.5rem" }} onClick={submit}>{isLogin ? "Sign In" : "Create Free Account"}</button>
        <div className="modal-switch">{isLogin ? <>No account? <button onClick={() => switchMode("signup")}>Sign up free →</button></> : <>Have an account? <button onClick={() => switchMode("login")}>Sign in</button></>}</div>
      </div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ setPage, onStart, activePhase, setActivePhase }) {
  const tech = [
    { icon:"🧠", name:"OpenAI / Claude", purpose:"AI intelligence — budgets, coaching, insights", badge:"ready" },
    { icon:"🗄️", name:"Supabase", purpose:"User data, financial records, progress tracking", badge:"ready" },
    { icon:"💳", name:"Stripe", purpose:"Subscription billing — individual, family, church", badge:"ready" },
    { icon:"⚡", name:"n8n", purpose:"Automations — weekly check-ins, email sequences", badge:"ready" },
    { icon:"📱", name:"Twilio", purpose:"SMS accountability reminders & check-ins", badge:"phase2" },
    { icon:"🔧", name:"Retool", purpose:"Admin dashboard for coaches and church partners", badge:"phase2" },
  ];
  const pricing = [
    { label:"Individual", name:"Steward Plan", price:"19", period:"/month", note:"Perfect to start", featured:false, features:["AI Stewardship Coach","Budget Generator","Debt Payoff Planner","Savings Tracker","Weekly Check-ins","5 Financial Lessons/month"] },
    { label:"Family", name:"Legacy Plan", price:"49", period:"/month", note:"Best for families", featured:true, features:["Everything in Steward","Up to 6 family members","Family Budget Builder","Spouse & teen accounts","Accountability Partners","Unlimited Lessons + Devotionals"] },
    { label:"Church", name:"Kingdom License", price:"199", period:"/month", note:"Starting price", featured:false, features:["Everything in Legacy","Unlimited members","Church admin dashboard","Group workshop tools","Branded experience","Pastor/coach reporting"] },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="hero-pill a1"><div className="hero-pill-dot" />AI Stewardship Coach · MVP Ready</div>
            <h1 className="hero-h1 a2">Financial <span className="g">Freedom</span><br/>Through Faith &<br/>Intelligent Coaching.</h1>
            <p className="hero-lead a3">Kingdom Wealth AI helps individuals, families, and church communities build financial freedom through encouraging, educational, and transformational AI coaching — rooted in biblical stewardship.</p>
            <div className="hero-ctas a4">
              <button className="btn btn-gold btn-lg" onClick={onStart}>Start My Kingdom Plan →</button>
              <button className="btn btn-ghost-dark" onClick={() => document.getElementById("roadmap")?.scrollIntoView({ behavior:"smooth" })}>See the Roadmap</button>
            </div>
            <div className="hero-proof a5">
              {["Faith-Centered","AI-Powered","Church-Ready","Free to Start"].map(p => (
                <span key={p} className="proof-item"><span className="proof-dot" />{p}</span>
              ))}
            </div>
          </div>
          <div className="preview-wrap a3">
            <div className="agent-preview">
              <div className="agent-preview-header">
                <div className="agent-avatar-sm">👑</div>
                <div>
                  <div className="agent-name-sm">Kingdom Wealth AI</div>
                  <div className="agent-status"><div className="status-dot" />Live Agent · Ready to Coach</div>
                </div>
              </div>
              <div className="preview-msgs">
                <div className="pmsg pmsg-user">"I'm overwhelmed financially. I don't know where to start."</div>
                <div className="pmsg pmsg-ai"><strong>I hear you — and you're already being courageous by saying that out loud.</strong> Let's take this one step at a time. The first thing I want you to know: you are not defined by your debt or your bank balance. You are defined by your calling.<br/><br/>Tell me: what's your monthly take-home income? We'll build a clear plan from there. 🙏</div>
                <div className="pmsg pmsg-user">"About $4,200 after taxes. I have $14k in credit card debt."</div>
                <div className="pmsg pmsg-ai">📊 <strong>Great — here's your immediate action plan:</strong><br/>Your income is actually solid. This is very workable. I'm calculating your personalized budget and debt strategy now...</div>
              </div>
            </div>
            <div className="preview-float pf1">
              <div className="pf-icon" style={{ background:"rgba(42,107,82,0.1)" }}>🎯</div>
              <div><div className="pf-label">Debt-Free In</div><div className="pf-val">31 months</div></div>
            </div>
            <div className="preview-float pf2">
              <div className="pf-icon" style={{ background:"rgba(200,168,75,0.12)" }}>💰</div>
              <div><div className="pf-label">Monthly Savings</div><div className="pf-val">$420/mo</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* POSITION STATEMENT */}
      <div className="position-bar">
        <div className="pos-eyebrow">Our Mission Statement</div>
        <p className="pos-statement">"Helping families build financial freedom, stewardship, and legacy through intelligent, faith-centered coaching."</p>
      </div>

      {/* ROADMAP */}
      <section className="roadmap" id="roadmap">
        <div className="roadmap-inner">
          <div className="sec-head">
            <div className="sec-eye" style={{ color:C.goldLight }}>Product Roadmap</div>
            <h2 style={{ fontFamily:"var(--serif)",fontSize:"2.4rem",fontWeight:600,color:"white",marginBottom:"0.75rem" }}>Three phases.<br/><em style={{ color:C.goldLight,fontStyle:"italic" }}>One transformation.</em></h2>
            <p style={{ color:"rgba(255,255,255,0.6)",maxWidth:520,margin:"0 auto",lineHeight:1.85 }}>Start lean with the MVP that delivers real value, then scale into a complete Kingdom financial ecosystem.</p>
          </div>
          <div className="phase-tabs">
            {PHASES.map((p,i) => (
              <button key={i} className={`phase-tab ${activePhase===i?"active":""}`} onClick={() => setActivePhase(i)}>Phase {p.num} — {p.title}</button>
            ))}
          </div>
          <div className="phase-content">
            <div className="phase-meta">
              <div className="phase-num">{PHASES[activePhase].num}</div>
              <div className="phase-title">{PHASES[activePhase].title}</div>
              <p className="phase-desc">{PHASES[activePhase].desc}</p>
              <div className="phase-timing">⏱ {PHASES[activePhase].timing}</div>
              <div style={{ marginTop:"2rem" }}>
                <button className="btn btn-gold" onClick={onStart}>Start Building Phase 1 →</button>
              </div>
            </div>
            <div className="feature-grid">
              {PHASES[activePhase].features.map(f => (
                <div key={f.label} className="feature-chip">
                  <div className="feature-chip-icon">{f.icon}</div>
                  <div><div className="feature-chip-label">{f.label}</div><div className="feature-chip-desc">{f.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" style={{ background:"white" }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eye">Revenue Model</div>
            <h2 className="sec-h2">Simple, <em>scalable</em> pricing.</h2>
            <p className="sec-sub">Start with individuals, grow to families, scale to churches. Each tier funds the next phase of the mission.</p>
          </div>
          <div className="pricing-grid">
            {pricing.map(p => (
              <div key={p.name} className={`card price-card ${p.featured?"featured":""}`}>
                <div style={{ paddingTop: p.featured ? "1.5rem" : 0 }}>
                  <div className="price-label">{p.label}</div>
                  <div className="price-name">{p.name}</div>
                  <div className="price-amount"><span className="price-dollar">${p.price}</span><span className="price-period">{p.period}</span></div>
                  <div className="price-note">{p.note}</div>
                  <ul className="price-features">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
                  <button className={`btn ${p.featured?"btn-gold":"btn-outline"} btn-block`} onClick={onStart}>{p.featured ? "Get Started →" : "Choose Plan"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section" style={{ background:C.cream }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eye">Technology Stack</div>
            <h2 className="sec-h2">Launch fast.<br/><em>Scale smart.</em></h2>
            <p className="sec-sub">No massive engineering team needed. These tools let you go from idea to paying users in weeks, not months.</p>
          </div>
          <div className="stack-grid">
            {tech.map(t => (
              <div key={t.name} className="card stack-card">
                <div className="stack-icon">{t.icon}</div>
                <div>
                  <div className="stack-name">{t.name}</div>
                  <div className="stack-purpose">{t.purpose}</div>
                  <span className={`stack-badge badge-${t.badge}`}>{t.badge === "ready" ? "Phase 1 Ready" : "Phase 2"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="vision-section">
        <div className="vision-inner">
          <div className="sec-eye" style={{ color:C.goldLight,marginBottom:"1rem" }}>The Long-Term Vision</div>
          <h2 className="vision-title">AI-powered community<br/>transformation infrastructure.</h2>
          <p className="vision-sub">This is much bigger than budgeting software. Kingdom Wealth AI becomes the financial transformation layer for entire communities.</p>
          <div className="vision-circles">
            {[
              { icon:"⛪",label:"Churches",cls:"vision-circle-1" },
              { icon:"🏫",label:"Schools",cls:"vision-circle-2" },
              { icon:"🏠",label:"Families",cls:"vision-circle-3" },
              { icon:"🏢",label:"Nonprofits",cls:"vision-circle-4" },
              { icon:"🚀",label:"Entrepreneurs",cls:"vision-circle-5" },
              { icon:"💛",label:"Life Centers",cls:"vision-circle-6" },
            ].map(v => (
              <div key={v.label} className={`vision-circle ${v.cls}`}>
                <div className="vc-icon">{v.icon}</div>
                <div className="vc-label">{v.label}</div>
              </div>
            ))}
          </div>
          <p className="vision-verse">"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."</p>
          <div className="vision-ref" style={{ marginBottom:"3rem" }}>— Jeremiah 29:11</div>
          <button className="btn btn-gold btn-lg" onClick={onStart}>Launch My MVP Today →</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">Kingdom Wealth AI</div>
        <div className="footer-copy">© 2026 · Faith-centered financial transformation · Built with purpose</div>
      </footer>
    </>
  );
}

// ─── COACH PAGE ───────────────────────────────────────────────────────────────
function CoachPage({ user, setPage }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello${user ? `, ${user.name.split(" ")[0]}` : ""}! 👑 Welcome to Kingdom Wealth AI — I'm your personal stewardship coach.\n\nI'm here to walk alongside you on your financial journey with encouragement, practical guidance, and biblical wisdom. **There's no judgment here** — only a plan and a path forward.\n\nTo get started, you can:\n- Tell me about your financial situation\n- Ask me to build a budget\n- Ask about debt payoff strategies\n- Ask for a savings plan\n- Or just share what's on your heart financially\n\nWhat's going on with your finances today? 🙏`,
      time: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const bottomRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const hints = [
    "Build me a budget",
    "I have $12k in debt",
    "Help me save for an emergency fund",
    "I'm overwhelmed financially",
    "Teach me about the snowball method",
    "Give me a scripture for today",
  ];

  const send = async (text) => {
    const content = text || input.trim();
    if (!content || loading) return;
    setInput("");
    const time = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
    const newMsgs = [...messages, { role:"user", content, time }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const reply = await callAI(newMsgs.map(m => ({ role:m.role, content:m.content })));
      setMessages(prev => [...prev, { role:"assistant", content:reply, time: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }) }]);
    } catch {
      setMessages(prev => [...prev, { role:"assistant", content:"I'm sorry — something went wrong on my end. Please try again in a moment. You're not alone in this! 🙏", time }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const renderMsg = (content) => {
    return content.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} dangerouslySetInnerHTML={{ __html: bold }} style={{ marginBottom: line === "" ? 0 : "0.2em" }} />;
    });
  };

  const weeklyItems = [
    "Review last week's spending",
    "Make extra debt payment",
    "Add to emergency fund",
    "Read a stewardship devotional",
    "Track every expense this week",
  ];

  return (
    <div className="agent-page">
      <div className="agent-top-bar">
        <div className="agent-top-info">
          <div className="agent-avatar">👑</div>
          <div>
            <div className="agent-top-name">Kingdom Wealth AI — Stewardship Coach</div>
            <div className="agent-top-status"><div className="agent-online-dot" />Live Agent · Powered by Claude</div>
          </div>
        </div>
        <div className="agent-top-right">
          <div className="phase-badge">Phase 1 MVP</div>
          <button className="btn btn-sm btn-outline" onClick={() => setPage("landing")}>← Back to Vision</button>
        </div>
      </div>

      <div className="chat-layout">
        {/* SIDEBAR */}
        <aside className="chat-sidebar">
          <div className="card sidebar-profile">
            <div className="sidebar-avatar-lg">👤</div>
            <div className="sidebar-username">{user?.name || "Kingdom Builder"}</div>
            <div className="sidebar-email">{user?.email || "Start your journey"}</div>
            {[
              ["Monthly Income","—","",""],
              ["Total Debt","—","red",""],
              ["Savings","—","green",""],
              ["Monthly Budget","—","",""],
            ].map(([l,v,cls]) => (
              <div key={l} className="sidebar-stat">
                <span className="sidebar-stat-label">{l}</span>
                <span className={`sidebar-stat-val ${cls}`}>{v}</span>
              </div>
            ))}
            <p style={{ fontSize:"0.72rem",color:C.txtLight,marginTop:"0.85rem",lineHeight:1.6 }}>Share your income and expenses in the chat to populate your dashboard.</p>
          </div>

          <div className="card lesson-card">
            <div style={{ fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.gold,marginBottom:"0.75rem" }}>📖 Today's Lesson</div>
            <div className="lesson-title">The 10-10-80 Kingdom Method</div>
            <p className="lesson-desc">Give 10%, Save 10%, Live on 80%. This simple principle, rooted in biblical tithing, transforms your relationship with money from scarcity to stewardship.</p>
            <button className="btn btn-sm btn-outline btn-block" onClick={() => send("Teach me about the 10-10-80 Kingdom method")}>Learn More in Chat →</button>
          </div>

          <div className="card checkin-card">
            <div className="checkin-title">Weekly Check-In</div>
            {weeklyItems.map((item,i) => (
              <div key={i} className="checkin-item" style={{ cursor:"pointer" }} onClick={() => setCheckedItems(c => c.includes(i) ? c.filter(x=>x!==i) : [...c,i])}>
                <div className={`checkin-check ${checkedItems.includes(i)?"done":""}`}>{checkedItems.includes(i)?"✓":""}</div>
                <span style={{ textDecoration:checkedItems.includes(i)?"line-through":"none",color:checkedItems.includes(i)?C.txtLight:"inherit" }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop:"0.75rem",fontSize:"0.75rem",color:C.txtLight }}>{checkedItems.length}/{weeklyItems.length} complete this week</div>
          </div>
        </aside>

        {/* CHAT MAIN */}
        <div className="chat-main">
          <div className="card" style={{ flex:1,padding:"1.25rem" }}>
            <div className="messages-box">
              {messages.map((m,i) => (
                <div key={i} className={`msg-row ${m.role==="user"?"user":""}`}>
                  <div className={`msg-avatar ${m.role==="user"?"user":"ai"}`}>
                    {m.role==="user" ? (user?.name?.[0]?.toUpperCase()||"U") : "👑"}
                  </div>
                  <div style={{ display:"flex",flexDirection:"column" }}>
                    <div className={`msg-bubble ${m.role==="user"?"user":"ai"}`}>
                      {renderMsg(m.content)}
                    </div>
                    <div className={`msg-time ${m.role==="assistant"?"ai-time":""}`}>{m.time}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="msg-row">
                  <div className="msg-avatar ai">👑</div>
                  <div className="msg-bubble ai"><div className="typing-indicator"><div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/></div></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="chat-input-area">
            <textarea
              ref={textRef}
              className="chat-textarea"
              placeholder="Share your financial situation, ask a question, or just say what's on your heart..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={2}
            />
            <div className="chat-input-bottom">
              <div className="chat-hints">
                {hints.slice(0,4).map(h => (
                  <button key={h} className="chat-hint" onClick={() => send(h)}>{h}</button>
                ))}
              </div>
              <button className="send-btn" onClick={() => send()} disabled={!input.trim()||loading}>➤</button>
            </div>
          </div>

          <div style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap" }}>
            {hints.slice(4).map(h => (
              <button key={h} className="chat-hint" onClick={() => send(h)}>{h}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

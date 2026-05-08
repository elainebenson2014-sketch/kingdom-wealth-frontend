import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy: "#0D1F3C",
  navyMid: "#162E56",
  navyLight: "#1E3D70",
  gold: "#C9A84C",
  goldLight: "#E8C97A",
  goldPale: "#FDF7E8",
  goldBorder: "#E5D08A",
  forest: "#1B4D3C",
  forestLight: "#246B52",
  sage: "#D2E8DC",
  cream: "#FAFAF6",
  white: "#FFFFFF",
  txt: "#0D1F3C",
  txtMid: "#3E506B",
  txtLight: "#7A8BA8",
  border: "#E2EAF2",
  red: "#B53232",
  greenBg: "#EBF6F1",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;background:#FAFAF6;color:#0D1F3C;line-height:1.65;-webkit-font-smoothing:antialiased}
:root{--serif:'Lora',Georgia,serif;--sans:'Nunito',sans-serif}

.nav{position:fixed;top:0;left:0;right:0;z-index:300;height:66px;display:flex;align-items:center;justify-content:space-between;padding:0 2.25rem;background:rgba(13,31,60,0.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(201,168,76,0.18);}
.nav-brand{display:flex;align-items:center;gap:10px;cursor:pointer}
.nav-mark{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#C9A84C,#E8C97A);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.nav-name{font-family:var(--serif);font-size:1.05rem;font-weight:600;color:white}
.nav-name em{color:#E8C97A;font-style:normal}
.nav-center{display:flex;gap:4px}
.nav-tab{padding:8px 18px;border-radius:7px;font-size:0.82rem;font-weight:600;color:rgba(255,255,255,0.55);cursor:pointer;transition:all 0.15s;border:none;background:none;font-family:var(--sans)}
.nav-tab:hover{color:white;background:rgba(255,255,255,0.07)}
.nav-tab.active{color:#E8C97A;background:rgba(201,168,76,0.13)}
.nav-right{display:flex;gap:0.65rem;align-items:center}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:11px 26px;border-radius:8px;font-family:var(--sans);font-size:0.875rem;font-weight:700;cursor:pointer;transition:all 0.18s;border:none;letter-spacing:0.01em}
.btn-gold{background:linear-gradient(135deg,#C9A84C,#E8C97A);color:#0D1F3C;box-shadow:0 3px 14px rgba(201,168,76,0.32)}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 5px 20px rgba(201,168,76,0.42)}
.btn-navy{background:#0D1F3C;color:white;box-shadow:0 3px 12px rgba(13,31,60,0.2)}
.btn-navy:hover{background:#162E56;transform:translateY(-1px)}
.btn-outline{background:transparent;color:#0D1F3C;border:1.5px solid #E2EAF2}
.btn-outline:hover{border-color:#C9A84C;color:#C9A84C}
.btn-ghost{background:rgba(255,255,255,0.1);color:white;border:1px solid rgba(255,255,255,0.2)}
.btn-ghost:hover{background:rgba(255,255,255,0.18)}
.btn-sm{padding:8px 18px;font-size:0.8rem}
.btn-lg{padding:15px 38px;font-size:0.95rem}
.btn-block{width:100%}
.btn:disabled{opacity:0.45;cursor:not-allowed;transform:none !important}

.card{background:white;border-radius:14px;border:1px solid #E2EAF2;box-shadow:0 2px 10px rgba(13,31,60,0.05);overflow:hidden}
.card-p{padding:1.75rem}
.card-p-sm{padding:1.25rem}
.card-navy{background:#0D1F3C;border-color:#162E56;color:white}
.card-gold{background:linear-gradient(135deg,#C9A84C,#E8C97A);border:none;color:#0D1F3C}
.card-pale{background:#FDF7E8;border-color:#E5D08A}
.card-sage{background:#D2E8DC;border-color:#A8D4BC}
.card-hover{transition:transform 0.18s,box-shadow 0.18s}
.card-hover:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(13,31,60,0.1)}

.form-group{margin-bottom:1.1rem}
.form-label{display:block;font-size:0.82rem;font-weight:700;color:#0D1F3C;margin-bottom:0.4rem;letter-spacing:0.01em}
.form-label span{color:#7A8BA8;font-weight:400;font-size:0.75rem;margin-left:4px}
.form-input{width:100%;padding:11px 14px;border:1.5px solid #E2EAF2;border-radius:8px;font-family:var(--sans);font-size:0.9rem;color:#0D1F3C;outline:none;background:white;transition:border-color 0.18s,box-shadow 0.18s}
.form-input:focus{border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,0.13)}
.form-select{width:100%;padding:11px 14px;border:1.5px solid #E2EAF2;border-radius:8px;font-family:var(--sans);font-size:0.9rem;color:#0D1F3C;outline:none;background:white;cursor:pointer}
.form-select:focus{border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,0.13)}
.form-textarea{width:100%;padding:11px 14px;border:1.5px solid #E2EAF2;border-radius:8px;font-family:var(--sans);font-size:0.9rem;color:#0D1F3C;outline:none;resize:vertical;min-height:88px;line-height:1.6}
.form-textarea:focus{border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,0.13)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.curr{position:relative}
.curr::before{content:'$';position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#7A8BA8;font-size:0.9rem;pointer-events:none;z-index:1}
.curr .form-input{padding-left:26px}

.hero{min-height:100vh;padding-top:66px;background:linear-gradient(155deg,#0D1F3C 0%,#162E56 45%,#1B4D3C 100%);display:flex;align-items:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 60% at 72% 48%,rgba(201,168,76,0.11) 0%,transparent 65%),radial-gradient(ellipse 35% 50% at 10% 85%,rgba(27,77,60,0.5) 0%,transparent 55%);}
.hero-inner{max-width:1160px;margin:0 auto;padding:4rem 2rem;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;position:relative;z-index:1}
.hero-pill{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:100px;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.28);color:#E8C97A;font-size:0.71rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1.4rem}
.pill-pulse{width:6px;height:6px;border-radius:50%;background:#C9A84C;animation:pulse 2.2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4;box-shadow:0 0 0 4px rgba(201,168,76,0.2)}}
.hero-h1{font-family:var(--serif);font-size:3.4rem;font-weight:700;line-height:1.1;color:white;margin-bottom:1.2rem}
.hero-h1 .g{color:#E8C97A;font-style:italic}
.hero-lead{font-size:1.05rem;color:rgba(255,255,255,0.7);line-height:1.82;margin-bottom:2.5rem;max-width:455px}
.hero-ctas{display:flex;gap:0.85rem;flex-wrap:wrap;margin-bottom:3rem}
.hero-trust{display:flex;gap:1.75rem;flex-wrap:wrap}
.trust-item{display:flex;align-items:center;gap:7px;font-size:0.77rem;color:rgba(255,255,255,0.52)}
.trust-dot{width:5px;height:5px;border-radius:50%;background:#C9A84C;flex-shrink:0}

.hero-visual{position:relative}
.hero-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.13);border-radius:18px;padding:1.6rem;backdrop-filter:blur(18px)}
.hero-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.3rem}
.hc-title{font-family:var(--serif);font-size:0.95rem;color:white;font-weight:600}
.hc-badge{font-size:0.68rem;font-weight:700;padding:3px 10px;border-radius:100px;background:rgba(201,168,76,0.15);color:#E8C97A;border:1px solid rgba(201,168,76,0.25);letter-spacing:0.06em;text-transform:uppercase}
.hc-row{display:flex;justify-content:space-between;align-items:center;padding:0.65rem 0;border-bottom:1px solid rgba(255,255,255,0.07)}
.hc-row:last-of-type{border-bottom:none}
.hc-label{font-size:0.82rem;color:rgba(255,255,255,0.6)}
.hc-val{font-size:0.9rem;font-weight:700}
.hc-verse{margin-top:1.1rem;padding:1rem;background:rgba(201,168,76,0.1);border-radius:10px;border:1px solid rgba(201,168,76,0.18)}
.hc-verse p{font-family:var(--serif);font-size:0.82rem;font-style:italic;color:rgba(255,255,255,0.8);line-height:1.6}
.hc-verse cite{font-size:0.7rem;color:#E8C97A;font-style:normal;font-weight:700;letter-spacing:0.08em;margin-top:4px;display:block}
.float-chip{position:absolute;background:white;border-radius:10px;padding:0.8rem 1rem;box-shadow:0 6px 24px rgba(0,0,0,0.18);display:flex;align-items:center;gap:9px;white-space:nowrap}
.fc1{top:-16px;right:-12px}
.fc2{bottom:-16px;left:-12px}
.fc-icon{width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.fc-label{font-size:0.7rem;color:#7A8BA8}
.fc-val{font-size:0.88rem;font-weight:700;color:#0D1F3C}

.sec{padding:5.5rem 2rem}
.sec-inner{max-width:1160px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3.75rem}
.sec-eye{font-size:0.71rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A84C;margin-bottom:0.6rem}
.sec-h2{font-family:var(--serif);font-size:2.35rem;font-weight:700;color:#0D1F3C;line-height:1.2;margin-bottom:0.9rem}
.sec-h2 em{font-style:italic;color:#C9A84C}
.sec-sub{font-size:0.98rem;color:#3E506B;max-width:510px;margin:0 auto;line-height:1.88}

.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem}
.feat-card{padding:2rem;cursor:default}
.feat-icon{width:52px;height:52px;border-radius:13px;background:linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04));border:1px solid rgba(201,168,76,0.22);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:1.2rem}
.feat-title{font-family:var(--serif);font-size:1.1rem;font-weight:600;color:#0D1F3C;margin-bottom:0.5rem}
.feat-desc{font-size:0.875rem;color:#3E506B;line-height:1.78}

.mission{background:#0D1F3C;padding:5rem 2rem}
.mission-inner{max-width:720px;margin:0 auto;text-align:center}
.mission-verse{font-family:var(--serif);font-size:1.5rem;font-style:italic;color:rgba(255,255,255,0.9);line-height:1.72;margin-bottom:0.85rem}
.mission-ref{font-size:0.8rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#E8C97A}
.mission-line{width:56px;height:2px;background:#C9A84C;margin:2.25rem auto}
.mission-body{font-size:1.02rem;color:rgba(255,255,255,0.68);line-height:1.9}

.intake-page{min-height:100vh;padding:100px 1.5rem 4rem;background:linear-gradient(180deg,#FAFAF6 0%,white 100%)}
.intake-wrap{max-width:740px;margin:0 auto}
.progress-bar{height:4px;background:#E2EAF2;border-radius:100px;margin-bottom:2.25rem;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,#C9A84C,#E8C97A);border-radius:100px;transition:width 0.4s ease}
.step-label{font-size:0.78rem;color:#7A8BA8;margin-bottom:0.4rem;font-weight:600}
.intake-h1{font-family:var(--serif);font-size:1.85rem;font-weight:700;color:#0D1F3C;margin-bottom:0.3rem}
.intake-sub{font-size:0.9rem;color:#3E506B;margin-bottom:2rem;line-height:1.7}
.surplus-banner{padding:0.9rem 1.1rem;border-radius:9px;font-size:0.85rem;font-weight:600;margin-top:0.75rem}
.surplus-pos{background:#EBF6F1;border:1px solid #A8D4BC;color:#1B4D3C}
.surplus-neg{background:#FFF3F3;border:1px solid #F5C0C0;color:#B53232}
.intake-nav{display:flex;justify-content:space-between;margin-top:1.75rem;align-items:center}
.review-row{display:flex;justify-content:space-between;padding:0.75rem 1rem;background:#FAFAF6;border-radius:8px;margin-bottom:0.5rem}
.review-label{font-size:0.84rem;color:#7A8BA8}
.review-val{font-size:0.84rem;font-weight:700;color:#0D1F3C}

.loading-page{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:2rem;text-align:center;background:linear-gradient(160deg,#0D1F3C,#1B4D3C)}
.spinner{width:52px;height:52px;border:3px solid rgba(255,255,255,0.15);border-top-color:#C9A84C;border-radius:50%;animation:spin 0.85s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-h{font-family:var(--serif);font-size:1.5rem;color:white;font-weight:600}
.loading-s{font-size:0.88rem;color:rgba(255,255,255,0.55)}

.dash-layout{display:flex;min-height:100vh;padding-top:66px}
.sidebar{width:256px;flex-shrink:0;background:#0D1F3C;position:fixed;top:66px;bottom:0;left:0;overflow-y:auto;z-index:100;padding:1.5rem 0}
.sb-avatar{margin:0 1.1rem 1.5rem;display:flex;align-items:center;gap:10px;padding:1rem;background:rgba(255,255,255,0.06);border-radius:10px;border:1px solid rgba(255,255,255,0.1)}
.sb-av-circle{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#C9A84C,#E8C97A);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;color:#0D1F3C;flex-shrink:0}
.sb-av-name{font-size:0.88rem;font-weight:700;color:white;line-height:1.2}
.sb-av-role{font-size:0.72rem;color:rgba(255,255,255,0.4)}
.sb-section-label{font-size:0.68rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.3);padding:0 1.35rem;margin:1.4rem 0 0.4rem}
.sb-item{display:flex;align-items:center;gap:10px;padding:10px 1.35rem;cursor:pointer;font-size:0.875rem;font-weight:600;color:rgba(255,255,255,0.58);transition:all 0.15s;border-left:3px solid transparent;margin-bottom:1px}
.sb-item:hover{background:rgba(255,255,255,0.07);color:white}
.sb-item.active{background:rgba(201,168,76,0.13);color:#E8C97A;border-left-color:#C9A84C}
.sb-icon{width:18px;text-align:center;font-size:15px}

.dash-main{margin-left:256px;flex:1;padding:2.25rem}
.dash-welcome{font-family:var(--serif);font-size:1.9rem;font-weight:700;color:#0D1F3C}
.dash-sub{font-size:0.88rem;color:#7A8BA8;margin-top:0.2rem}

.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1.15rem;margin:1.75rem 0}
.stat-card{padding:1.4rem}
.stat-icon-wrap{font-size:1.4rem;margin-bottom:0.65rem}
.stat-lbl{font-size:0.72rem;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#7A8BA8;margin-bottom:0.4rem}
.stat-val{font-family:var(--serif);font-size:1.85rem;font-weight:700;color:#0D1F3C;line-height:1}
.stat-val.pos{color:#1B4D3C}
.stat-val.neg{color:#B53232}
.stat-note{font-size:0.75rem;color:#7A8BA8;margin-top:0.35rem}

.dash-grid-2{display:grid;grid-template-columns:1.3fr 1fr;gap:1.35rem;margin-bottom:1.35rem}
.dash-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.35rem;margin-bottom:1.35rem}
.dash-col{display:flex;flex-direction:column;gap:1.35rem}
.card-title{font-family:var(--serif);font-size:1.1rem;font-weight:600;color:#0D1F3C}
.card-subtitle{font-size:0.75rem;color:#7A8BA8;margin-top:2px}
.card-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.35rem}

.budget-row{display:flex;align-items:center;gap:10px;margin-bottom:0.9rem}
.bgt-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.bgt-label{flex:1;font-size:0.84rem;font-weight:600;color:#0D1F3C}
.bgt-bar-bg{flex:1.2;height:7px;background:#E2EAF2;border-radius:100px;overflow:hidden}
.bgt-bar-fill{height:100%;border-radius:100px;transition:width 0.6s ease}
.bgt-amount{font-size:0.82rem;font-weight:700;color:#3E506B;width:72px;text-align:right}

.debt-card-item{background:#FAFAF6;border-radius:10px;padding:1.1rem;margin-bottom:0.75rem}
.debt-name{font-size:0.88rem;font-weight:700;color:#0D1F3C;margin-bottom:0.35rem}
.debt-meta{display:flex;justify-content:space-between;font-size:0.78rem;color:#7A8BA8;margin-bottom:0.5rem}
.debt-bar-bg{height:6px;background:#E2EAF2;border-radius:100px;overflow:hidden}
.debt-bar-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#162E56,#1E3D70)}
.priority-tag{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:100px;font-size:0.68rem;font-weight:700;background:rgba(13,31,60,0.08);color:#0D1F3C;margin-bottom:0.4rem}

.savings-item{padding:1.25rem;margin-bottom:0.75rem}
.sav-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.6rem}
.sav-name{font-size:0.9rem;font-weight:700;color:#0D1F3C}
.sav-pct{font-size:0.84rem;font-weight:700;color:#C9A84C}
.sav-amts{display:flex;justify-content:space-between;font-size:0.75rem;color:#7A8BA8;margin-bottom:0.45rem}
.sav-bar-bg{height:9px;background:#E2EAF2;border-radius:100px;overflow:hidden}
.sav-bar-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#C9A84C,#E8C97A)}

.action-row{display:flex;align-items:flex-start;gap:11px;padding:1rem 0;border-bottom:1px solid #E2EAF2}
.action-row:last-child{border-bottom:none}
.action-cb{width:22px;height:22px;border-radius:6px;border:2px solid #E2EAF2;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all 0.15s;margin-top:1px}
.action-cb.done{background:#1B4D3C;border-color:#1B4D3C;color:white;font-size:11px}
.action-txt{font-size:0.875rem;color:#0D1F3C;line-height:1.55}
.action-txt.done{text-decoration:line-through;color:#7A8BA8}
.action-tag{display:inline-block;padding:2px 9px;border-radius:100px;font-size:0.68rem;font-weight:700;margin-top:4px;letter-spacing:0.06em;text-transform:uppercase}
.tag-budget{background:rgba(27,77,60,0.1);color:#1B4D3C}
.tag-debt{background:rgba(13,31,60,0.08);color:#0D1F3C}
.tag-savings{background:rgba(201,168,76,0.15);color:#8B6914}
.tag-faith{background:rgba(201,168,76,0.2);color:#7A5C10}

.scripture-card{background:linear-gradient(135deg,#0D1F3C,#162E56);padding:2rem;border-radius:14px;color:white;position:relative;overflow:hidden}
.scripture-card::before{content:'"';position:absolute;right:1.25rem;top:-0.75rem;font-family:var(--serif);font-size:9rem;color:rgba(201,168,76,0.08);line-height:1;pointer-events:none}
.scripture-eyebrow{font-size:0.7rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:#E8C97A;margin-bottom:0.75rem;position:relative}
.scripture-text{font-family:var(--serif);font-size:1.1rem;font-style:italic;line-height:1.72;color:rgba(255,255,255,0.9);margin-bottom:0.9rem;position:relative}
.scripture-ref{font-size:0.76rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#E8C97A}

.encourage-card{background:#FDF7E8;border:1px solid #E5D08A;padding:1.75rem;border-radius:14px}
.encourage-icon{font-size:1.75rem;margin-bottom:0.75rem}
.encourage-text{font-size:0.9rem;color:#0D1F3C;line-height:1.82}

.devot-card{padding:1.5rem}
.devot-day{font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C9A84C;margin-bottom:0.4rem}
.devot-title{font-family:var(--serif);font-size:1rem;font-weight:600;color:#0D1F3C;margin-bottom:0.4rem}
.devot-text{font-size:0.83rem;color:#3E506B;line-height:1.72;margin-bottom:0.85rem}
.devot-verse{font-family:var(--serif);font-size:0.82rem;font-style:italic;color:#0D1F3C;padding:0.75rem;background:#FAFAF6;border-radius:8px;border-left:3px solid #C9A84C;line-height:1.6}

.lesson-card{padding:1.5rem}
.lesson-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;font-size:0.68rem;font-weight:700;background:rgba(13,31,60,0.07);color:#0D1F3C;margin-bottom:0.7rem;text-transform:uppercase;letter-spacing:0.08em}
.lesson-title{font-family:var(--serif);font-size:1rem;font-weight:600;color:#0D1F3C;margin-bottom:0.4rem}
.lesson-body{font-size:0.83rem;color:#3E506B;line-height:1.74;margin-bottom:1rem}
.lesson-tip{padding:0.75rem;background:#EBF6F1;border-radius:8px;border-left:3px solid #1B4D3C;font-size:0.8rem;color:#1B4D3C;line-height:1.6;font-weight:500}

.checkin-wrap{padding:1.5rem}
.checkin-eyebrow{font-size:0.7rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:#C9A84C;margin-bottom:1rem}
.checkin-row{display:flex;align-items:center;gap:9px;padding:0.6rem 0;border-bottom:1px solid #E2EAF2;cursor:pointer}
.checkin-row:last-child{border-bottom:none}
.checkin-check{width:18px;height:18px;border-radius:5px;border:1.5px solid #E2EAF2;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s}
.checkin-check.done{background:#1B4D3C;border-color:#1B4D3C;color:white;font-size:9px}
.checkin-label{font-size:0.84rem;color:#3E506B;transition:all 0.15s}
.checkin-label.done{text-decoration:line-through;color:#7A8BA8}
.progress-mini{height:5px;background:#E2EAF2;border-radius:100px;overflow:hidden;margin-top:0.85rem}
.progress-mini-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#C9A84C,#E8C97A);transition:width 0.3s}

.modal-overlay{position:fixed;inset:0;background:rgba(13,31,60,0.68);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:1rem}
.modal-box{background:white;border-radius:18px;padding:2.25rem;width:100%;max-width:420px;position:relative;box-shadow:0 20px 60px rgba(13,31,60,0.25)}
.modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.2rem;cursor:pointer;color:#7A8BA8;padding:4px 8px;border-radius:6px}
.modal-close:hover{background:#FAFAF6}
.modal-h2{font-family:var(--serif);font-size:1.6rem;font-weight:700;color:#0D1F3C;margin-bottom:0.2rem}
.modal-sub{font-size:0.84rem;color:#7A8BA8;margin-bottom:1.7rem}
.modal-switch{text-align:center;margin-top:1rem;font-size:0.82rem;color:#7A8BA8}
.modal-switch button{background:none;border:none;color:#C9A84C;font-weight:700;cursor:pointer;font-size:0.82rem;font-family:var(--sans)}
.alert{padding:10px 14px;border-radius:8px;font-size:0.82rem;margin-bottom:1rem;border:1px solid}
.alert-err{background:#FFF5F5;border-color:#FED7D7;color:#B53232}

.div{height:1px;background:#E2EAF2;margin:1.25rem 0}

.footer{background:#0D1F3C;padding:2.5rem;text-align:center}
.footer-brand{font-family:var(--serif);font-size:1rem;color:white;margin-bottom:0.3rem}
.footer-copy{font-size:0.73rem;color:rgba(255,255,255,0.28)}

@media(max-width:900px){
  .hero-inner{grid-template-columns:1fr;gap:2.5rem}
  .hero-visual{display:none}
  .features-grid{grid-template-columns:1fr 1fr}
  .stats-row{grid-template-columns:1fr 1fr}
  .dash-grid-2,.dash-grid-3{grid-template-columns:1fr}
  .sidebar{display:none}
  .dash-main{margin-left:0}
  .form-row{grid-template-columns:1fr}
  .nav-center{display:none}
}
@media(max-width:600px){
  .hero-h1{font-size:2.3rem}
  .sec{padding:3.5rem 1.25rem}
  .features-grid{grid-template-columns:1fr}
  .nav{padding:0 1.1rem}
  .dash-main{padding:1.4rem}
}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.a1{animation:fadeUp 0.55s ease both 0.08s}
.a2{animation:fadeUp 0.55s ease both 0.2s}
.a3{animation:fadeUp 0.55s ease both 0.34s}
.a4{animation:fadeUp 0.55s ease both 0.48s}
.a5{animation:fadeUp 0.55s ease both 0.62s}

@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
`;

const SYSTEM_PROMPT = `You are the Kingdom Wealth Builders AI Coach — a warm, expert, faith-centered financial stewardship coach.

Personality:
- Deeply encouraging, never shame-based or cold
- Blend biblical wisdom naturally with practical financial expertise  
- Teach one concept at a time — never overwhelm
- Celebrate every small win enthusiastically
- Reference scripture naturally when relevant

Your Phase 1 MVP capabilities:
1. Build personalized budgets (50/30/20 or 10-10-80 Kingdom method)
2. Create debt reduction strategies (snowball method preferred)
3. Design savings goals with monthly contribution plans
4. Teach financial literacy one lesson at a time
5. Provide weekly accountability check-ins
6. Share stewardship devotionals and scripture

When someone shares their financial situation:
- Acknowledge their courage
- Identify the most urgent issue  
- Give ONE clear, actionable next step
- End with an uplifting word or scripture

Format with **bold** for key points, use simple bullet lists, keep responses warm and human.`;

async function askCoach(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) throw new Error("API error");
  const d = await res.json();
  return d.content?.[0]?.text || "I'm here to help — could you share a bit more?";
}

function buildPlan(form) {
  const inc = parseFloat(form.income) || 4000;
  const exp = parseFloat(form.expenses) || 3000;
  const debt = parseFloat(form.debt) || 8000;
  const sav = parseFloat(form.savings) || 500;
  const surplus = inc - exp;

  return {
    user: { name: form.name, email: form.email, goals: form.goals, stress: form.stress },
    income: inc, expenses: exp, debt, savings: sav, surplus,
    budget: [
      { cat: "Housing & Utilities", pct: 30, color: "#0D1F3C" },
      { cat: "Food & Groceries", pct: 12, color: "#1B4D3C" },
      { cat: "Transportation", pct: 10, color: "#C9A84C" },
      { cat: "Debt Payments", pct: 15, color: "#B53232" },
      { cat: "Savings & Giving", pct: 13, color: "#246B52" },
      { cat: "Personal & Other", pct: 20, color: "#7A8BA8" },
    ].map(b => ({ ...b, amount: Math.round(inc * b.pct / 100) })),
    debts: [
      { name: "Credit Card (High Interest)", bal: Math.round(debt * 0.45), rate: "21.9%", payment: Math.round(debt * 0.035), paidPct: 14, priority: 1 },
      { name: "Personal Loan", bal: Math.round(debt * 0.35), rate: "12.5%", payment: Math.round(debt * 0.028), paidPct: 28, priority: 2 },
      { name: "Medical / Other", bal: Math.round(debt * 0.20), rate: "0%", payment: Math.round(debt * 0.015), paidPct: 48, priority: 3 },
    ],
    savingsGoals: [
      { name: "Emergency Fund (3 months)", target: Math.round(inc * 3), current: sav, icon: "🛡️" },
      { name: "Tithe & Giving Fund", target: Math.round(inc * 0.1 * 12), current: Math.round(sav * 0.15), icon: "💛" },
      { name: "Future Vision Fund", target: 5000, current: Math.round(sav * 0.1), icon: "🌱" },
    ],
    actions: [
      { text: "Review your last 7 days of spending — categorize every transaction", tag: "budget" },
      { text: `Make an extra $${Math.max(50, Math.round(surplus * 0.3))} payment toward your highest-interest debt this week`, tag: "debt" },
      { text: "Set up an automatic $50 transfer to your Emergency Fund this Friday", tag: "savings" },
      { text: "Read Proverbs 3 and write down one principle you can apply to your finances today", tag: "faith" },
    ],
    scripture: { text: "Commit to the Lord whatever you do, and he will establish your plans.", ref: "Proverbs 16:3" },
    encouragement: `${form.name}, the fact that you're here today is already an act of courage and faith. You have a surplus to work with — that's your tool for transformation. Every wise dollar you put toward your debt and savings is a seed planted. Stay consistent, stay faithful. God honors diligent stewardship.`,
    devotional: {
      day: "This Week",
      title: "Money as a Tool, Not a Master",
      body: "God never intended money to be a source of anxiety. In Matthew 6:24, Jesus reminds us that we cannot serve both God and money — but we CAN use money to serve God. Your budget is not a cage; it's a roadmap for purpose.",
      verse: '"For where your treasure is, there your heart will be also." — Matthew 6:21',
    },
    lesson: {
      title: "The Debt Snowball Method",
      body: "List your debts from smallest to largest balance (ignore interest rates). Pay minimums on everything. Put every extra dollar on the smallest debt. When it's paid off, roll that payment to the next. The momentum — and the wins — will keep you going.",
      tip: "💡 Pro Tip: The snowball works because motivation beats math. Small wins build unstoppable momentum.",
    },
  };
}

const DEVOTIONALS = [
  { day: "Day 1", title: "Money as a Tool, Not a Master", body: "God never intended money to be your source of anxiety. You can use money to serve God. Your budget is a roadmap for purpose, not a cage.", verse: '"For where your treasure is, there your heart will be also." — Matthew 6:21' },
  { day: "Day 2", title: "The Discipline of Delayed Gratification", body: "Proverbs teaches that the ant gathers in summer to prepare for winter. Financial discipline isn't about deprivation — it's about wisdom and future focus.", verse: '"The plans of the diligent lead to profit." — Proverbs 21:5' },
  { day: "Day 3", title: "Generosity as a Wealth Strategy", body: "Counterintuitively, generous people tend to build more wealth. When we loosen our grip on money, God entrusts us with more. Giving is the antidote to financial fear.", verse: '"Give, and it will be given to you." — Luke 6:38' },
];

const LESSONS = [
  { badge: "Lesson 1", title: "The Debt Snowball Method", body: "List debts smallest to largest. Pay minimums on all, then attack the smallest with everything extra. When it's gone, roll that payment to the next.", tip: "💡 Momentum beats math. Small wins build unstoppable motivation." },
  { badge: "Lesson 2", title: "The 10-10-80 Kingdom Principle", body: "Give 10%, Save 10%, Live on 80%. This simple biblical framework transforms your relationship with money from scarcity to stewardship.", tip: "💡 Start where you are. Even 5-5-90 is a powerful starting point — growth happens gradually." },
  { badge: "Lesson 3", title: "Building Your Emergency Fund", body: "Before aggressively paying off debt, save $1,000 as a starter emergency fund. This protects your plan when life happens unexpectedly.", tip: "💡 An emergency fund converts a crisis into a mere inconvenience. It's peace of mind in a bank account." },
];

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [plan, setPlan] = useState(null);
  const [dashTab, setDashTab] = useState("overview");
  const [checked, setChecked] = useState([]);
  const [checkinChecked, setCheckinChecked] = useState([]);

  const login = u => { setUser(u); setAuthModal(null); };
  const logout = () => { setUser(null); setPage("landing"); setPlan(null); };
  const startJourney = () => user ? setPage("intake") : setAuthModal("signup");

  const navTabs = [
    { id: "landing", label: "Home" },
    { id: "intake", label: "My Finances" },
    { id: "dashboard", label: "Dashboard" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-brand" onClick={() => setPage("landing")}>
          <div className="nav-mark">👑</div>
          <span className="nav-name">Kingdom <em>Wealth</em> Builders</span>
        </div>
        <div className="nav-center">
          {navTabs.map(t => (
            <button key={t.id} className={`nav-tab ${page === t.id ? "active" : ""}`} onClick={() => t.id === "intake" ? startJourney() : setPage(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>Hi, {user.name.split(" ")[0]} 👑</span>
              <button className="btn btn-ghost btn-sm" onClick={logout}>Sign Out</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => setAuthModal("login")}>Sign In</button>
              <button className="btn btn-gold btn-sm" onClick={() => setAuthModal("signup")}>Join Free</button>
            </>
          )}
        </div>
      </nav>

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onAuth={login} switchMode={m => setAuthModal(m)} />}
      {page === "landing" && <LandingPage onStart={startJourney} />}
      {page === "intake" && <IntakePage user={user} onComplete={(p) => { setPlan(p); setPage("dashboard"); setDashTab("overview"); }} />}
      {page === "dashboard" && plan && (
        <Dashboard plan={plan} user={user} dashTab={dashTab} setDashTab={setDashTab} checked={checked} setChecked={setChecked} checkinChecked={checkinChecked} setCheckinChecked={setCheckinChecked} onLogout={logout} onRedo={() => setPage("intake")} />
      )}
    </>
  );
}

function AuthModal({ mode, onClose, onAuth, switchMode }) {
  const [f, setF] = useState({ name: "", email: "", password: "" });
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
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👑</div>
          <h2 className="modal-h2">{isLogin ? "Welcome Back" : "Start Your Journey"}</h2>
          <p className="modal-sub">{isLogin ? "Sign in to Kingdom Wealth Builders" : "Join and receive your free financial plan"}</p>
        </div>
        {err && <div className="alert alert-err">{err}</div>}
        {!isLogin && <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="Your full name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>}
        <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="you@email.com" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
        <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="••••••••" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
        <button className="btn btn-navy btn-block" style={{ marginTop: "0.5rem" }} onClick={submit}>{isLogin ? "Sign In" : "Create Free Account"}</button>
        <div className="modal-switch">
          {isLogin ? <>No account? <button onClick={() => switchMode("signup")}>Sign up free →</button></> : <>Have an account? <button onClick={() => switchMode("login")}>Sign in</button></>}
        </div>
      </div>
    </div>
  );
}

function LandingPage({ onStart }) {
  const features = [
    { icon: "📊", title: "Budget Generator", desc: "Receive a personalized Kingdom budget built around your income, goals, and the biblical 10-10-80 principle — give, save, and live intentionally." },
    { icon: "💳", title: "Debt Payoff Planner", desc: "Get a step-by-step snowball strategy to eliminate your debt — with the encouragement and accountability to actually see it through." },
    { icon: "💰", title: "Savings Tracker", desc: "Set meaningful savings goals — emergency fund, giving fund, future vision — and watch your progress week by week with clear milestones." },
    { icon: "📖", title: "Stewardship Devotionals", desc: "Daily faith and finance devotionals that connect biblical wisdom to your real financial decisions. Money and meaning together." },
    { icon: "✅", title: "Weekly AI Check-ins", desc: "Your AI coach checks in every week with encouragement, a new action step, and accountability — so you never feel alone on the journey." },
    { icon: "🎓", title: "Financial Literacy Lessons", desc: "Learn one concept at a time — budgeting methods, interest rates, debt strategies — in plain language with practical application." },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-pill a1"><div className="pill-pulse" />Phase 1 MVP · Faith-Based Financial Coaching</div>
            <h1 className="hero-h1 a2">Build <span className="g">Kingdom</span><br />Wealth With<br />Purpose & Peace.</h1>
            <p className="hero-lead a3">Kingdom Wealth Builders combines biblical stewardship principles with AI-powered coaching to help individuals and families budget, reduce debt, save, and grow — with faith at the center.</p>
            <div className="hero-ctas a4">
              <button className="btn btn-gold btn-lg" onClick={onStart}>Create My Free Plan →</button>
              <button className="btn btn-ghost" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>See How It Works</button>
            </div>
            <div className="hero-trust a5">
              {["Faith-Centered", "AI-Powered", "Encouraging", "100% Free to Start"].map(t => (
                <span key={t} className="trust-item"><span className="trust-dot" />{t}</span>
              ))}
            </div>
          </div>
          <div className="hero-visual a3">
            <div style={{ position: "relative" }}>
              <div className="hero-card">
                <div className="hero-card-header">
                  <span className="hc-title">Your Kingdom Overview</span>
                  <span className="hc-badge">Live Plan</span>
                </div>
                {[["Monthly Income", "$4,800", "#E8C97A"], ["Monthly Expenses", "$3,200", "rgba(255,255,255,0.65)"], ["Debt Remaining", "$11,400", "#F9A8A8"], ["Savings Balance", "$1,200", "#86EFAC"]].map(([l, v, c]) => (
                  <div key={l} className="hc-row">
                    <span className="hc-label">{l}</span>
                    <span className="hc-val" style={{ color: c }}>{v}</span>
                  </div>
                ))}
                <div className="hc-verse">
                  <p>"Honor the Lord with your wealth, with the firstfruits of all your crops."</p>
                  <cite>— Proverbs 3:9</cite>
                </div>
              </div>
              <div className="float-chip fc1">
                <div className="fc-icon" style={{ background: "rgba(27,77,60,0.1)" }}>🎯</div>
                <div><div className="fc-label">Debt-Free Target</div><div className="fc-val">26 months</div></div>
              </div>
              <div className="float-chip fc2">
                <div className="fc-icon" style={{ background: "rgba(201,168,76,0.1)" }}>💰</div>
                <div><div className="fc-label">Monthly Savings</div><div className="fc-val">$380/mo</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="mission-inner">
          <div className="mission-verse">"The plans of the diligent lead to profit as surely as haste leads to poverty."</div>
          <div className="mission-ref">Proverbs 21:5 (NIV)</div>
          <div className="mission-line" />
          <p className="mission-body">Kingdom Wealth Builders exists because financial freedom is not just a worldly goal — it's a spiritual calling. When we steward our resources wisely, we honor God, provide for our families, and become a blessing to our communities.</p>
        </div>
      </section>

      <section className="sec" style={{ background: "white" }} id="features">
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eye">Phase 1 Features</div>
            <h2 className="sec-h2">Six tools for complete<br /><em>financial wholeness.</em></h2>
            <p className="sec-sub">Everything you need in your MVP — clean, focused, and powerful enough to deliver real transformation from day one.</p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="card feat-card card-hover">
                <div className="feat-icon">{f.icon}</div>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg,#0D1F3C,#1B4D3C)", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 65%)" }} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>👑</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "2.6rem", fontWeight: 700, color: "white", marginBottom: "1rem", lineHeight: 1.2 }}>Your Kingdom financial<br />journey starts today.</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.68)", marginBottom: "2.5rem", lineHeight: 1.85 }}>Complete your financial intake in 5 minutes. Receive a personalized budget, debt strategy, savings goals, weekly actions, a devotional, and your first financial lesson — all rooted in faith.</p>
          <button className="btn btn-gold btn-lg" onClick={onStart}>Create My Free Financial Plan →</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">Kingdom Wealth Builders</div>
        <div className="footer-copy">© 2026 · Phase 1 MVP · Stewardship rooted in faith</div>
      </footer>
    </>
  );
}

function IntakePage({ user, onComplete }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", income: "", expenses: "", debt: "", savings: "", goals: "", stress: "", timeline: "1-2 years" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const steps = ["Personal Info", "Your Finances", "Goals & Vision", "Review"];
  const surplus = parseFloat(form.income || 0) - parseFloat(form.expenses || 0);

  const submit = () => {
    setLoading(true);
    setTimeout(() => { onComplete(buildPlan(form)); }, 1800);
  };

  if (loading) return (
    <div className="loading-page">
      <div className="spinner" />
      <div className="loading-h">Building Your Kingdom Plan…</div>
      <div className="loading-s">Crafting your budget, debt strategy, savings goals, devotional & first lesson.</div>
    </div>
  );

  return (
    <div className="intake-page">
      <div className="intake-wrap">
        <div className="step-label">Step {step + 1} of {steps.length} — {steps[step]}</div>
        <h1 className="intake-h1">{["Let's Get to Know You", "Your Financial Picture", "Your Goals & Vision", "Review & Build Your Plan"][step]}</h1>
        <p className="intake-sub">{["Your information is private and only used to build your personalized plan.", "Be honest — this creates the most accurate and helpful plan for you.", "Dream big. We'll build a plan that honors God and moves you toward your calling.", "Everything looks great. Let's generate your personalized Kingdom Wealth plan."][step]}</p>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>

        <div className="card card-p">
          {step === 0 && (
            <>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="Your full name" value={form.name} onChange={e => set("name", e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} /></div>
              </div>
              <div className="form-group">
                <label className="form-label">Financial Timeline</label>
                <select className="form-select" value={form.timeline} onChange={e => set("timeline", e.target.value)}>
                  <option value="6 months">6 months — Quick wins and momentum</option>
                  <option value="1-2 years">1–2 years — Steady, meaningful progress</option>
                  <option value="3-5 years">3–5 years — Deep transformation</option>
                  <option value="5+ years">5+ years — Generational wealth & legacy</option>
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Monthly Take-Home Income</label><div className="curr"><input className="form-input" type="number" placeholder="0.00" value={form.income} onChange={e => set("income", e.target.value)} /></div></div>
                <div className="form-group"><label className="form-label">Monthly Expenses</label><div className="curr"><input className="form-input" type="number" placeholder="0.00" value={form.expenses} onChange={e => set("expenses", e.target.value)} /></div></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Total Debt Amount</label><div className="curr"><input className="form-input" type="number" placeholder="0.00" value={form.debt} onChange={e => set("debt", e.target.value)} /></div></div>
                <div className="form-group"><label className="form-label">Current Savings</label><div className="curr"><input className="form-input" type="number" placeholder="0.00" value={form.savings} onChange={e => set("savings", e.target.value)} /></div></div>
              </div>
              {form.income && form.expenses && (
                <div className={`surplus-banner ${surplus >= 0 ? "surplus-pos" : "surplus-neg"}`}>
                  {surplus >= 0 ? "✓" : "⚠"} Monthly {surplus >= 0 ? "Surplus" : "Deficit"}: <strong>${Math.abs(surplus).toFixed(2)}</strong>
                  {surplus >= 0 ? " — Great! This is your transformation fuel." : " — We'll fix this together. No judgment here."}
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label className="form-label">Your Financial Goals</label>
                <textarea className="form-textarea" placeholder="e.g., Pay off my credit cards, build a 3-month emergency fund, save for a home..." value={form.goals} onChange={e => set("goals", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Your Biggest Financial Stress</label>
                <textarea className="form-textarea" placeholder="What keeps you up at night financially?" value={form.stress} onChange={e => set("stress", e.target.value)} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {[["Name", form.name], ["Email", form.email], ["Monthly Income", `$${parseFloat(form.income || 0).toLocaleString()}`], ["Monthly Expenses", `$${parseFloat(form.expenses || 0).toLocaleString()}`], ["Total Debt", `$${parseFloat(form.debt || 0).toLocaleString()}`], ["Current Savings", `$${parseFloat(form.savings || 0).toLocaleString()}`], ["Timeline", form.timeline]].filter(([, v]) => v).map(([l, v]) => (
                <div key={l} className="review-row"><span className="review-label">{l}</span><span className="review-val">{v}</span></div>
              ))}
              <div style={{ margin: "1.5rem 0", padding: "1.25rem", background: "#FDF7E8", border: "1px solid #E5D08A", borderRadius: 10 }}>
                <div style={{ fontSize: "0.82rem", color: "#8B6914", fontWeight: 700, marginBottom: "0.3rem" }}>🕊️ Before We Begin</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "0.88rem", fontStyle: "italic", color: "#7A5C10", lineHeight: 1.7 }}>"Trust in the Lord with all your heart and lean not on your own understanding." — Proverbs 3:5-6</div>
              </div>
            </>
          )}

          <div className="intake-nav">
            {step > 0 ? <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button> : <div />}
            {step < 3 ? (
              <button className="btn btn-navy" onClick={() => setStep(s => s + 1)}>Continue →</button>
            ) : (
              <button className="btn btn-gold btn-lg" onClick={submit}>✨ Build My Kingdom Plan</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ plan, user, dashTab, setDashTab, checked, setChecked, checkinChecked, setCheckinChecked, onLogout, onRedo }) {
  const sidebarItems = [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "budget", icon: "📊", label: "My Budget" },
    { id: "debt", icon: "💳", label: "Debt Payoff" },
    { id: "savings", icon: "💰", label: "Savings Goals" },
    { id: "actions", icon: "✅", label: "Weekly Actions" },
    { id: "devotional", icon: "📖", label: "Devotionals" },
    { id: "lessons", icon: "🎓", label: "Financial Lessons" },
    { id: "checkin", icon: "🔔", label: "Weekly Check-In" },
    { id: "coach", icon: "🤖", label: "AI Coach" },
    { id: "tracker", icon: "📒", label: "Budget Tracker" },
  ];
  const toggleCheck = i => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  const toggleCheckin = i => setCheckinChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);

  return (
    <div className="dash-layout">
      <aside className="sidebar">
        <div className="sb-avatar">
          <div className="sb-av-circle">{(user?.name || plan.user.name || "K")[0].toUpperCase()}</div>
          <div>
            <div className="sb-av-name">{user?.name || plan.user.name}</div>
            <div className="sb-av-role">Kingdom Steward</div>
          </div>
        </div>
        <div className="sb-section-label">Dashboard</div>
        {sidebarItems.map(item => (
          <div key={item.id} className={`sb-item ${dashTab === item.id ? "active" : ""}`} onClick={() => setDashTab(item.id)}>
            <span className="sb-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <div className="sb-section-label">Account</div>
        <div className="sb-item" onClick={onRedo}><span className="sb-icon">🔄</span><span>Update My Finances</span></div>
        <div className="sb-item" onClick={onLogout}><span className="sb-icon">🚪</span><span>Sign Out</span></div>
      </aside>

      <main className="dash-main">
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 className="dash-welcome">Good day, {(user?.name || plan.user.name || "Friend").split(" ")[0]}. 👑</h1>
          <p className="dash-sub">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · Your Kingdom financial dashboard</p>
        </div>

        <div className="stats-row">
          {[
            { icon: "💰", label: "Monthly Income", val: `$${plan.income.toLocaleString()}`, note: "Take-home pay", cls: "" },
            { icon: "💳", label: "Total Debt", val: `$${plan.debt.toLocaleString()}`, note: `${plan.debts.length} accounts`, cls: "neg" },
            { icon: "📈", label: "Total Savings", val: `$${plan.savings.toLocaleString()}`, note: "Across all goals", cls: "pos" },
            { icon: "✨", label: "Monthly Surplus", val: `$${Math.max(0, plan.surplus).toLocaleString()}`, note: "Available to allocate", cls: plan.surplus >= 0 ? "pos" : "neg" },
          ].map(s => (
            <div key={s.label} className="card stat-card">
              <div className="stat-icon-wrap">{s.icon}</div>
              <div className="stat-lbl">{s.label}</div>
              <div className={`stat-val ${s.cls}`}>{s.val}</div>
              <div className="stat-note">{s.note}</div>
            </div>
          ))}
        </div>

        {dashTab === "overview" && (
          <>
            <div className="dash-grid-2">
              <div className="card card-p">
                <div className="card-hdr">
                  <div><div className="card-title">Budget Breakdown</div><div className="card-subtitle">Based on ${plan.income.toLocaleString()}/month income</div></div>
                  <button className="btn btn-sm btn-outline" onClick={() => setDashTab("budget")}>Full View →</button>
                </div>
                {plan.budget.slice(0, 5).map(b => (
                  <div key={b.cat} className="budget-row">
                    <div className="bgt-dot" style={{ background: b.color }} />
                    <div className="bgt-label">{b.cat}</div>
                    <div className="bgt-bar-bg"><div className="bgt-bar-fill" style={{ width: `${b.pct}%`, background: b.color }} /></div>
                    <div className="bgt-amount">${b.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="dash-col">
                <div className="scripture-card">
                  <div className="scripture-eyebrow">📖 This Week's Scripture</div>
                  <p className="scripture-text">"{plan.scripture.text}"</p>
                  <div className="scripture-ref">— {plan.scripture.ref}</div>
                </div>
                <div className="encourage-card">
                  <div className="encourage-icon">✨</div>
                  <p className="encourage-text">{plan.encouragement.slice(0, 180)}…</p>
                  <button className="btn btn-sm btn-outline" style={{ marginTop: "0.9rem" }} onClick={() => setDashTab("devotional")}>Read More →</button>
                </div>
              </div>
            </div>
            <div className="dash-grid-2">
              <div className="card card-p">
                <div className="card-hdr"><div><div className="card-title">Debt Payoff Strategy</div><div className="card-subtitle">Snowball method</div></div><button className="btn btn-sm btn-outline" onClick={() => setDashTab("debt")}>Full View →</button></div>
                {plan.debts.map(d => (
                  <div key={d.name} className="debt-card-item">
                    <div className="priority-tag">#{d.priority} Priority</div>
                    <div className="debt-name">{d.name}</div>
                    <div className="debt-meta"><span>${d.bal.toLocaleString()} · {d.rate} APR</span><span>${d.payment}/mo</span></div>
                    <div className="debt-bar-bg"><div className="debt-bar-fill" style={{ width: `${d.paidPct}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="card card-p">
                <div className="card-hdr"><div><div className="card-title">This Week's Actions</div><div className="card-subtitle">{checked.length}/{plan.actions.length} done</div></div></div>
                {plan.actions.map((a, i) => (
                  <div key={i} className="action-row">
                    <div className={`action-cb ${checked.includes(i) ? "done" : ""}`} onClick={() => toggleCheck(i)}>{checked.includes(i) ? "✓" : ""}</div>
                    <div><div className={`action-txt ${checked.includes(i) ? "done" : ""}`}>{a.text}</div><span className={`action-tag tag-${a.tag}`}>{a.tag}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {dashTab === "budget" && (
          <div className="card card-p">
            <div className="card-hdr"><div><div className="card-title">Your Personalized Kingdom Budget</div><div className="card-subtitle">Generated from your monthly income of ${plan.income.toLocaleString()}</div></div></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              {plan.budget.map(b => (
                <div key={b.cat} style={{ padding: "1.2rem", background: "#FAFAF6", borderRadius: 10, borderLeft: `4px solid ${b.color}` }}>
                  <div style={{ fontSize: "0.75rem", color: "#7A8BA8", marginBottom: "0.25rem" }}>{b.pct}% of income</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 700, color: "#0D1F3C" }}>${b.amount.toLocaleString()}</div>
                  <div style={{ fontSize: "0.85rem", color: "#3E506B" }}>{b.cat}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "1.25rem", background: "#FDF7E8", border: "1px solid #E5D08A", borderRadius: 10 }}>
              <strong style={{ fontSize: "0.85rem", color: "#7A5C10" }}>👑 The 10-10-80 Kingdom Principle:</strong>
              <p style={{ fontSize: "0.85rem", color: "#8B6914", marginTop: "0.35rem", lineHeight: 1.75 }}>Give 10%, Save 10%, Live on 80%. Start wherever you are — even 5-5-90 is powerful.</p>
            </div>
          </div>
        )}

        {dashTab === "debt" && (
          <div className="card card-p">
            <div className="card-hdr"><div><div className="card-title">Your Debt Freedom Roadmap</div><div className="card-subtitle">Snowball method — attack smallest balance first</div></div></div>
            {plan.debts.map(d => (
              <div key={d.name} style={{ padding: "1.5rem", background: "#FAFAF6", borderRadius: 12, marginBottom: "1rem", borderLeft: `4px solid ${d.priority === 1 ? "#B53232" : d.priority === 2 ? "#0D1F3C" : "#7A8BA8"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div><div className="priority-tag">#{d.priority} Priority</div><div style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 600, color: "#0D1F3C" }}>{d.name}</div><div style={{ fontSize: "0.78rem", color: "#7A8BA8" }}>{d.rate} APR</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 700, color: d.priority === 1 ? "#B53232" : "#0D1F3C" }}>${d.bal.toLocaleString()}</div></div>
                </div>
                <div className="debt-bar-bg" style={{ height: 8 }}><div className="debt-bar-fill" style={{ width: `${d.paidPct}%` }} /></div>
                <div style={{ marginTop: "0.6rem", fontSize: "0.82rem", color: "#3E506B" }}>Min payment: <strong>${d.payment}/month</strong></div>
              </div>
            ))}
          </div>
        )}

        {dashTab === "savings" && (
          <div className="card card-p">
            <div className="card-hdr"><div><div className="card-title">Your Savings Goals</div></div></div>
            {plan.savingsGoals.map(g => {
              const pct = Math.min(100, Math.round((g.current / g.target) * 100));
              return (
                <div key={g.name} className="card savings-item" style={{ marginBottom: "1rem" }}>
                  <div className="sav-hdr"><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ fontSize: "1.4rem" }}>{g.icon}</span><span className="sav-name">{g.name}</span></div><span className="sav-pct">{pct}% funded</span></div>
                  <div className="sav-amts"><span>${g.current.toLocaleString()} saved</span><span>Goal: ${g.target.toLocaleString()}</span></div>
                  <div className="sav-bar-bg"><div className="sav-bar-fill" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        )}

        {dashTab === "actions" && (
          <div className="card card-p">
            <div className="card-hdr"><div><div className="card-title">This Week's Action Steps</div><div className="card-subtitle">{checked.length} of {plan.actions.length} completed</div></div></div>
            {plan.actions.map((a, i) => (
              <div key={i} className="action-row">
                <div className={`action-cb ${checked.includes(i) ? "done" : ""}`} onClick={() => toggleCheck(i)}>{checked.includes(i) ? "✓" : ""}</div>
                <div><div className={`action-txt ${checked.includes(i) ? "done" : ""}`}>{a.text}</div><span className={`action-tag tag-${a.tag}`}>{a.tag}</span></div>
              </div>
            ))}
          </div>
        )}

        {dashTab === "devotional" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div className="scripture-card" style={{ padding: "2.25rem" }}>
                <div className="scripture-eyebrow">📖 This Week's Scripture</div>
                <p style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontStyle: "italic", color: "white", lineHeight: 1.7, marginBottom: "1rem", position: "relative" }}>"{plan.scripture.text}"</p>
                <div className="scripture-ref">— {plan.scripture.ref}</div>
              </div>
            </div>
            <div className="dash-grid-3">
              {DEVOTIONALS.map(d => (
                <div key={d.day} className="card devot-card">
                  <div className="devot-day">{d.day}</div>
                  <div className="devot-title">{d.title}</div>
                  <p className="devot-text">{d.body}</p>
                  <div className="devot-verse">{d.verse}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dashTab === "lessons" && (
          <div className="dash-grid-3">
            {LESSONS.map(l => (
              <div key={l.badge} className="card lesson-card">
                <div className="lesson-badge">🎓 {l.badge}</div>
                <div className="lesson-title">{l.title}</div>
                <p className="lesson-body">{l.body}</p>
                <div className="lesson-tip">{l.tip}</div>
              </div>
            ))}
          </div>
        )}

        {dashTab === "checkin" && (
          <div className="dash-grid-2">
            <div className="card">
              <div className="checkin-wrap">
                <div className="checkin-eyebrow">🔔 Weekly Check-In</div>
                {["I tracked my spending this week", "I made my debt payment on time", "I moved money to savings", "I read a stewardship devotional", "I gave this week (tithe or offering)", "I stayed within my budget categories"].map((item, i) => (
                  <div key={i} className="checkin-row" onClick={() => toggleCheckin(i)}>
                    <div className={`checkin-check ${checkinChecked.includes(i) ? "done" : ""}`}>{checkinChecked.includes(i) ? "✓" : ""}</div>
                    <span className={`checkin-label ${checkinChecked.includes(i) ? "done" : ""}`}>{item}</span>
                  </div>
                ))}
                <div className="progress-mini"><div className="progress-mini-fill" style={{ width: `${(checkinChecked.length / 6) * 100}%` }} /></div>
                <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#7A8BA8" }}>{checkinChecked.length}/6 complete this week</div>
              </div>
            </div>
            <div className="scripture-card" style={{ alignSelf: "start" }}>
              <div className="scripture-eyebrow">📖 Encouragement</div>
              <p className="scripture-text">"Well done, good and faithful servant!"</p>
              <div className="scripture-ref">— Matthew 25:23</div>
            </div>
          </div>
        )}

        {dashTab === "coach" && <AICoach user={user} plan={plan} />}
        {dashTab === "tracker" && <BudgetTracker />}
      </main>
    </div>
  );
}

function AICoach({ user, plan }) {
  const name = user?.name || plan?.user?.name || "Friend";
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    content: `Hello, ${name.split(" ")[0]}! 👑 I'm your Kingdom Wealth Coach.\n\nI've reviewed your financial plan and I'm here to answer questions, teach you financial concepts, and provide encouragement.\n\n**You can ask me things like:**\n- "Walk me through my debt strategy"\n- "Teach me about budgeting"\n- "What should I focus on this week?"\n\nWhat's on your heart today? 🙏`,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const hints = ["Walk me through my budget", "How do I stay motivated?", "Explain the snowball method", "Give me a scripture for today"];

  const send = async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput("");
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const context = `User's financial snapshot: Income $${plan.income}/mo, Expenses $${plan.expenses}/mo, Debt $${plan.debt}, Savings $${plan.savings}.`;
    const newMsgs = [...msgs, { role: "user", content, time }];
    setMsgs(newMsgs);
    setLoading(true);
    try {
      const apiMsgs = [{ role: "user", content: `[Context: ${context}]\n\n${content}` }, ...newMsgs.slice(1).map(m => ({ role: m.role, content: m.content }))];
      const reply = await askCoach(apiMsgs);
      setMsgs(prev => [...prev, { role: "assistant", content: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: "I'm sorry — I couldn't reach the server right now. Please try again in a moment. 🙏", time }]);
    }
    setLoading(false);
  };

  const renderContent = content => content.split("\n").map((line, i) => {
    const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>");
    return <p key={i} dangerouslySetInnerHTML={{ __html: html }} style={{ marginBottom: line === "" ? 0 : "0.25em" }} />;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "1rem 1.25rem", background: "#0D1F3C", borderRadius: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#C9A84C,#E8C97A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👑</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "white" }}>Kingdom Wealth Coach</div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>Powered by Claude AI</div>
        </div>
      </div>

      <div className="card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxHeight: 460, overflowY: "auto", marginBottom: "1rem" }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: m.role === "user" ? "#0D1F3C" : "linear-gradient(135deg,#C9A84C,#E8C97A)", color: m.role === "user" ? "white" : "#0D1F3C", fontWeight: 700, fontSize: "0.75rem" }}>
                {m.role === "user" ? (name[0]?.toUpperCase() || "U") : "👑"}
              </div>
              <div style={{ maxWidth: "78%" }}>
                <div style={{ padding: "0.85rem 1rem", borderRadius: m.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px", fontSize: "0.875rem", lineHeight: 1.7, background: m.role === "user" ? "#0D1F3C" : "white", color: m.role === "user" ? "white" : "#0D1F3C", border: m.role === "user" ? "none" : "1px solid #E2EAF2" }}>
                  {renderContent(m.content)}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 9 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#C9A84C,#E8C97A)", display: "flex", alignItems: "center", justifyContent: "center" }}>👑</div>
              <div style={{ padding: "0.85rem 1rem", borderRadius: "4px 12px 12px 12px", background: "white", border: "1px solid #E2EAF2", display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#7A8BA8", animation: `bounce 1.2s ${d}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div style={{ borderTop: "1px solid #E2EAF2", paddingTop: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            {hints.map(h => <button key={h} style={{ padding: "4px 12px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600, background: "#FAFAF6", border: "1px solid #E2EAF2", color: "#3E506B", cursor: "pointer", fontFamily: "var(--sans)" }} onClick={() => send(h)}>{h}</button>)}
          </div>
          <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-end" }}>
            <textarea style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #E2EAF2", borderRadius: 8, fontFamily: "var(--sans)", fontSize: "0.9rem", color: "#0D1F3C", outline: "none", resize: "none", lineHeight: 1.6, minHeight: 44, background: "white" }} placeholder="Ask me anything about your finances, faith, or plan..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
            <button style={{ width: 40, height: 40, borderRadius: 8, background: loading || !input.trim() ? "#E2EAF2" : "#0D1F3C", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: loading || !input.trim() ? "#7A8BA8" : "white", fontSize: 16, flexShrink: 0 }} onClick={() => send()} disabled={!input.trim() || loading}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BUDGET TRACKER ───────────────────────────────────────────────────────────
const MILEAGE_RATES = { Business: 0.70, Medical: 0.21, Charity: 0.21, Personal: 0 };
const MONTHS_LIST = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function BudgetTracker() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [tab, setTab] = useState("income");
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [mileage, setMileage] = useState([]);
  const [bankRows, setBankRows] = useState([]);
  const [incSrc, setIncSrc] = useState(""); const [incCat, setIncCat] = useState("Primary job"); const [incAmt, setIncAmt] = useState("");
  const [expDate, setExpDate] = useState(now.toISOString().slice(0,10)); const [expDesc, setExpDesc] = useState(""); const [expCat, setExpCat] = useState("Housing"); const [expAmt, setExpAmt] = useState(""); const [expNotes, setExpNotes] = useState("");
  const [milDate, setMilDate] = useState(now.toISOString().slice(0,10)); const [milPurpose, setMilPurpose] = useState(""); const [milMiles, setMilMiles] = useState(""); const [milType, setMilType] = useState("Business");

  const key = `${year}-${month}`;
  const mInc = income.filter(r => r.key === key);
  const mExp = expenses.filter(r => r.key === key);
  const mMil = mileage.filter(r => r.key === key);
  const totalInc = mInc.reduce((s,r) => s+r.amt, 0);
  const totalExp = mExp.reduce((s,r) => s+r.amt, 0);
  const totalMi = mMil.reduce((s,r) => s+r.miles, 0);
  const totalMiVal = mMil.reduce((s,r) => s+(r.miles*(MILEAGE_RATES[r.type]||0)), 0);
  const surplus = totalInc - totalExp;

  const fmt = n => '$' + Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

  const addIncome = () => {
    if (!incSrc || !incAmt) return;
    setIncome(p => [...p, {id:Date.now(),key,src:incSrc,cat:incCat,amt:parseFloat(incAmt)}]);
    setIncSrc(""); setIncAmt("");
  };
  const addExpense = () => {
    if (!expDesc || !expAmt) return;
    setExpenses(p => [...p, {id:Date.now(),key,date:expDate,desc:expDesc,cat:expCat,amt:parseFloat(expAmt),notes:expNotes}]);
    setExpDesc(""); setExpAmt(""); setExpNotes("");
  };
  const addMileage = () => {
    if (!milPurpose || !milMiles) return;
    setMileage(p => [...p, {id:Date.now(),key,date:milDate,purpose:milPurpose,miles:parseFloat(milMiles),type:milType}]);
    setMilPurpose(""); setMilMiles("");
  };

  const parseCSV = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const lines = ev.target.result.split('\n').filter(l => l.trim());
      const rows = lines.slice(1).map(l => { const c = l.split(',').map(x => x.replace(/"/g,'').trim()); return {date:c[0]||'',desc:c[1]||'',amt:parseFloat(c[2])||parseFloat(c[3])||0}; }).filter(r => r.desc);
      setBankRows(rows);
    };
    reader.readAsText(file);
  };

  const generateAdvice = () => {
    const items = [];
    const savPct = totalInc > 0 ? (surplus/totalInc)*100 : 0;
    const givingAmt = mExp.filter(r => r.cat==='Giving / tithe').reduce((s,r) => s+r.amt, 0);
    const givingPct = totalInc > 0 ? (givingAmt/totalInc)*100 : 0;
    const foodAmt = mExp.filter(r => r.cat==='Food & groceries').reduce((s,r) => s+r.amt, 0);
    const foodPct = totalInc > 0 ? (foodAmt/totalInc)*100 : 0;
    const entAmt = mExp.filter(r => r.cat==='Entertainment').reduce((s,r) => s+r.amt, 0);
    const entPct = totalInc > 0 ? (entAmt/totalInc)*100 : 0;
    const debtAmt = mExp.filter(r => r.cat==='Debt payment').reduce((s,r) => s+r.amt, 0);
    if (totalInc === 0) return [{ icon:"ℹ️", text:"Add income sources to get personalized advice for this month." }];
    if (savPct >= 20) items.push({ icon:"⭐", text:`Outstanding! You saved ${savPct.toFixed(0)}% of income — above the 20% target. You're building real Kingdom wealth.` });
    else if (savPct >= 10) items.push({ icon:"✅", text:`Good work — ${savPct.toFixed(0)}% surplus. Push toward 20% by trimming one discretionary category.` });
    else if (surplus >= 0) items.push({ icon:"⚠️", text:`Small ${savPct.toFixed(0)}% surplus. Aim for 10-20% by reviewing your top spending categories.` });
    else items.push({ icon:"🚨", text:`Deficit of ${fmt(Math.abs(surplus))} this month. Review your largest expense categories and identify one to reduce.` });
    if (givingPct < 10) items.push({ icon:"❤️", text:`Giving was ${givingPct.toFixed(0)}% this month. The Kingdom 10-10-80 principle calls for 10%. Even small steps toward this honor God.` });
    else items.push({ icon:"❤️", text:`You gave ${givingPct.toFixed(0)}% — faithful stewardship! "Give, and it will be given to you." (Luke 6:38)` });
    if (foodPct > 15) items.push({ icon:"🛒", text:`Food & groceries at ${foodPct.toFixed(0)}% of income. Target 10-12% through meal planning and batch cooking.` });
    if (entPct > 5) items.push({ icon:"📺", text:`Entertainment at ${entPct.toFixed(0)}%. Cap it at 3-5% and redirect the difference to debt payoff or savings.` });
    if (debtAmt > 0 && totalInc > 0) { const dp = (debtAmt/totalInc)*100; if (dp > 20) items.push({ icon:"💳", text:`Debt payments are ${dp.toFixed(0)}% of income. Focus extra dollars on your smallest balance (snowball method) to build momentum.` }); }
    if (totalMi > 0) items.push({ icon:"🚗", text:`You logged ${totalMi.toFixed(1)} miles worth ${fmt(totalMiVal)} in deductible mileage. Keep tracking — this adds up to real tax savings!` });
    return items;
  };

  const annualStats = () => {
    let aInc=0,aExp=0,aMi=0,aMiVal=0,aGiving=0;
    const monthly=[];
    const catTotals={};
    for(let m=0;m<12;m++){
      const k=`${year}-${m}`;
      const mI=income.filter(r=>r.key===k).reduce((s,r)=>s+r.amt,0);
      const mE=expenses.filter(r=>r.key===k).reduce((s,r)=>s+r.amt,0);
      const mMi2=mileage.filter(r=>r.key===k).reduce((s,r)=>s+r.miles,0);
      const mMiV=mileage.filter(r=>r.key===k).reduce((s,r)=>s+(r.miles*(MILEAGE_RATES[r.type]||0)),0);
      aInc+=mI; aExp+=mE; aMi+=mMi2; aMiVal+=mMiV;
      monthly.push({m:MONTHS_LIST[m].slice(0,3),inc:mI,exp:mE});
      expenses.filter(r=>r.key===k).forEach(r=>{catTotals[r.cat]=(catTotals[r.cat]||0)+r.amt;});
    }
    aGiving=expenses.filter(r=>r.key.startsWith(`${year}-`)).filter(r=>r.cat==='Giving / tithe').reduce((s,r)=>s+r.amt,0);
    const bizMi=mileage.filter(r=>r.key.startsWith(`${year}-`)&&r.type==='Business').reduce((s,r)=>s+r.miles,0);
    const medMi=mileage.filter(r=>r.key.startsWith(`${year}-`)&&(r.type==='Medical'||r.type==='Charity')).reduce((s,r)=>s+r.miles,0);
    return {aInc,aExp,aMi,aMiVal,aGiving,monthly,catTotals,bizMi,medMi,surplus:aInc-aExp};
  };

  const inputSt = { width:'100%', padding:'8px 10px', border:'1.5px solid #E2EAF2', borderRadius:8, fontFamily:'Nunito,sans-serif', fontSize:'0.85rem', color:'#0D1F3C', outline:'none', background:'white' };
  const selSt = { ...inputSt, cursor:'pointer' };
  const tabBtnSt = (active) => ({ padding:'8px 14px', borderRadius:7, fontSize:'0.78rem', fontWeight:600, cursor:'pointer', border:'none', background: active ? 'rgba(201,168,76,0.13)' : 'none', color: active ? '#C9A84C' : 'rgba(13,31,60,0.55)', fontFamily:'Nunito,sans-serif', transition:'all 0.15s' });
  const metricCardSt = { background:'white', border:'1px solid #E2EAF2', borderRadius:10, padding:'1rem', flex:1 };

  return (
    <div style={{ fontFamily:'Nunito,sans-serif' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
        <div>
          <h2 style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1.4rem', fontWeight:700, color:'#0D1F3C' }}>📒 Budget Tracker</h2>
          <p style={{ fontSize:'0.8rem', color:'#7A8BA8', marginTop:2 }}>Track income, expenses, mileage & reconcile with your bank</p>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <select value={month} onChange={e=>setMonth(parseInt(e.target.value))} style={{...selSt, width:'auto'}}>
            {MONTHS_LIST.map((m,i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select value={year} onChange={e=>setYear(parseInt(e.target.value))} style={{...selSt, width:'auto'}}>
            <option value={2025}>2025</option><option value={2026}>2026</option>
          </select>
        </div>
      </div>

      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
        {[['💰 Income', fmt(totalInc), '#1B4D3C'], ['💸 Expenses', fmt(totalExp), '#B53232'], [surplus>=0?'✨ Surplus':'⚠️ Deficit', (surplus>=0?'+':'-')+fmt(surplus), surplus>=0?'#1B4D3C':'#B53232'], ['🚗 Miles', totalMi.toFixed(1)+' mi', '#0D1F3C'], ['📝 Mile value', fmt(totalMiVal), '#8B6914']].map(([label,val,color]) => (
          <div key={label} style={metricCardSt}>
            <div style={{ fontSize:'0.7rem', fontWeight:700, color:'#7A8BA8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{label}</div>
            <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1.3rem', fontWeight:700, color }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:4, marginBottom:'1.25rem', borderBottom:'1px solid #E2EAF2', paddingBottom:0 }}>
        {[['income','💵 Income'],['expenses','🧾 Expenses'],['mileage','🚗 Mileage'],['reconcile','🏦 Reconcile'],['monthly','📊 Monthly'],['annual','📄 Annual/Tax']].map(([id,label]) => (
          <button key={id} style={tabBtnSt(tab===id)} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'income' && (
        <div>
          <div className="card card-p" style={{ marginBottom:'1rem' }}>
            <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1rem', fontWeight:600, color:'#0D1F3C', marginBottom:12 }}>Add income source</div>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1.5fr 1fr auto', gap:8 }}>
              <input style={inputSt} placeholder="Source (e.g. Salary, Freelance)" value={incSrc} onChange={e=>setIncSrc(e.target.value)} />
              <select style={selSt} value={incCat} onChange={e=>setIncCat(e.target.value)}>
                {['Primary job','Side business','Freelance','Rental income','Investment','Gift / other'].map(o=><option key={o}>{o}</option>)}
              </select>
              <input style={inputSt} type="number" placeholder="Amount" value={incAmt} onChange={e=>setIncAmt(e.target.value)} />
              <button className="btn btn-navy" style={{ padding:'0 16px', height:38 }} onClick={addIncome}>+ Add</button>
            </div>
          </div>
          <div className="card" style={{ overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
              <thead><tr style={{ borderBottom:'1px solid #E2EAF2' }}>{['Source','Category','Amount',''].map(h=><th key={h} style={{ padding:'10px 12px', fontWeight:700, fontSize:'0.72rem', color:'#7A8BA8', textTransform:'uppercase', textAlign:'left' }}>{h}</th>)}</tr></thead>
              <tbody>
                {mInc.length === 0 && <tr><td colSpan={4} style={{ padding:'1.5rem', textAlign:'center', color:'#7A8BA8', fontSize:'0.85rem' }}>No income added for this month</td></tr>}
                {mInc.map(r => <tr key={r.id} style={{ borderBottom:'1px solid #F4F6FA' }}>
                  <td style={{ padding:'10px 12px', color:'#0D1F3C' }}>{r.src}</td>
                  <td style={{ padding:'10px 12px' }}><span style={{ background:'#EBF6F1', color:'#1B4D3C', padding:'2px 8px', borderRadius:6, fontSize:'0.72rem', fontWeight:700 }}>{r.cat}</span></td>
                  <td style={{ padding:'10px 12px', fontWeight:700, color:'#1B4D3C' }}>{fmt(r.amt)}</td>
                  <td style={{ padding:'10px 12px' }}><button onClick={()=>setIncome(p=>p.filter(x=>x.id!==r.id))} style={{ background:'none', border:'none', cursor:'pointer', color:'#7A8BA8', fontSize:16 }}>🗑</button></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'expenses' && (
        <div>
          <div className="card card-p" style={{ marginBottom:'1rem' }}>
            <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1rem', fontWeight:600, color:'#0D1F3C', marginBottom:12 }}>Add expense</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr 1.5fr 1fr 1.5fr auto', gap:8 }}>
              <input style={inputSt} type="date" value={expDate} onChange={e=>setExpDate(e.target.value)} />
              <input style={inputSt} placeholder="Description" value={expDesc} onChange={e=>setExpDesc(e.target.value)} />
              <select style={selSt} value={expCat} onChange={e=>setExpCat(e.target.value)}>
                {['Housing','Food & groceries','Transportation','Utilities','Healthcare','Debt payment','Savings','Giving / tithe','Personal care','Entertainment','Clothing','Education','Other'].map(o=><option key={o}>{o}</option>)}
              </select>
              <input style={inputSt} type="number" placeholder="Amount" value={expAmt} onChange={e=>setExpAmt(e.target.value)} />
              <input style={inputSt} placeholder="Notes (optional)" value={expNotes} onChange={e=>setExpNotes(e.target.value)} />
              <button className="btn btn-navy" style={{ padding:'0 16px', height:38 }} onClick={addExpense}>+ Add</button>
            </div>
          </div>
          <div className="card" style={{ overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
              <thead><tr style={{ borderBottom:'1px solid #E2EAF2' }}>{['Date','Description','Category','Amount','Notes',''].map(h=><th key={h} style={{ padding:'10px 12px', fontWeight:700, fontSize:'0.72rem', color:'#7A8BA8', textTransform:'uppercase', textAlign:'left' }}>{h}</th>)}</tr></thead>
              <tbody>
                {mExp.length === 0 && <tr><td colSpan={6} style={{ padding:'1.5rem', textAlign:'center', color:'#7A8BA8', fontSize:'0.85rem' }}>No expenses added for this month</td></tr>}
                {mExp.map(r => <tr key={r.id} style={{ borderBottom:'1px solid #F4F6FA' }}>
                  <td style={{ padding:'10px 12px', color:'#7A8BA8', fontSize:'0.8rem' }}>{r.date||'—'}</td>
                  <td style={{ padding:'10px 12px', color:'#0D1F3C' }}>{r.desc}</td>
                  <td style={{ padding:'10px 12px' }}><span style={{ background:'#FFF3F3', color:'#B53232', padding:'2px 8px', borderRadius:6, fontSize:'0.72rem', fontWeight:700 }}>{r.cat}</span></td>
                  <td style={{ padding:'10px 12px', fontWeight:700, color:'#B53232' }}>{fmt(r.amt)}</td>
                  <td style={{ padding:'10px 12px', color:'#7A8BA8', fontSize:'0.8rem' }}>{r.notes||'—'}</td>
                  <td style={{ padding:'10px 12px' }}><button onClick={()=>setExpenses(p=>p.filter(x=>x.id!==r.id))} style={{ background:'none', border:'none', cursor:'pointer', color:'#7A8BA8', fontSize:16 }}>🗑</button></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'mileage' && (
        <div>
          <div className="card card-p" style={{ marginBottom:'1rem' }}>
            <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1rem', fontWeight:600, color:'#0D1F3C', marginBottom:12 }}>Log a trip</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr 1fr 1fr auto', gap:8 }}>
              <input style={inputSt} type="date" value={milDate} onChange={e=>setMilDate(e.target.value)} />
              <input style={inputSt} placeholder="Purpose (e.g. Client visit, Medical)" value={milPurpose} onChange={e=>setMilPurpose(e.target.value)} />
              <input style={inputSt} type="number" placeholder="Miles" value={milMiles} onChange={e=>setMilMiles(e.target.value)} />
              <select style={selSt} value={milType} onChange={e=>setMilType(e.target.value)}>
                {['Business','Medical','Charity','Personal'].map(o=><option key={o}>{o}</option>)}
              </select>
              <button className="btn btn-navy" style={{ padding:'0 16px', height:38 }} onClick={addMileage}>+ Add</button>
            </div>
            <div style={{ fontSize:'0.75rem', color:'#7A8BA8', marginTop:6 }}>IRS 2026: $0.70/mi business · $0.21/mi medical & charity</div>
          </div>
          <div className="card" style={{ overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
              <thead><tr style={{ borderBottom:'1px solid #E2EAF2' }}>{['Date','Purpose','Type','Miles','Deductible value',''].map(h=><th key={h} style={{ padding:'10px 12px', fontWeight:700, fontSize:'0.72rem', color:'#7A8BA8', textTransform:'uppercase', textAlign:'left' }}>{h}</th>)}</tr></thead>
              <tbody>
                {mMil.length === 0 && <tr><td colSpan={6} style={{ padding:'1.5rem', textAlign:'center', color:'#7A8BA8', fontSize:'0.85rem' }}>No trips logged for this month</td></tr>}
                {mMil.map(r => { const v = r.miles*(MILEAGE_RATES[r.type]||0); return <tr key={r.id} style={{ borderBottom:'1px solid #F4F6FA' }}>
                  <td style={{ padding:'10px 12px', color:'#7A8BA8', fontSize:'0.8rem' }}>{r.date||'—'}</td>
                  <td style={{ padding:'10px 12px', color:'#0D1F3C' }}>{r.purpose}</td>
                  <td style={{ padding:'10px 12px' }}><span style={{ background:'#FDF7E8', color:'#8B6914', padding:'2px 8px', borderRadius:6, fontSize:'0.72rem', fontWeight:700 }}>{r.type}</span></td>
                  <td style={{ padding:'10px 12px', fontWeight:600 }}>{r.miles.toFixed(1)} mi</td>
                  <td style={{ padding:'10px 12px', fontWeight:700, color:'#8B6914' }}>{v>0?fmt(v):'—'}</td>
                  <td style={{ padding:'10px 12px' }}><button onClick={()=>setMileage(p=>p.filter(x=>x.id!==r.id))} style={{ background:'none', border:'none', cursor:'pointer', color:'#7A8BA8', fontSize:16 }}>🗑</button></td>
                </tr>; })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'reconcile' && (
        <div>
          <div className="card card-p" style={{ marginBottom:'1rem' }}>
            <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1rem', fontWeight:600, color:'#0D1F3C', marginBottom:12 }}>Upload bank statement (CSV)</div>
            <label style={{ display:'block', border:'1.5px dashed #E2EAF2', borderRadius:10, padding:'1.5rem', textAlign:'center', cursor:'pointer' }}>
              <div style={{ fontSize:'2rem', marginBottom:8 }}>📂</div>
              <div style={{ fontSize:'0.85rem', color:'#7A8BA8' }}><strong style={{ color:'#0D1F3C' }}>Click to upload</strong> your bank CSV</div>
              <div style={{ fontSize:'0.75rem', color:'#7A8BA8', marginTop:4 }}>Columns needed: Date, Description, Amount</div>
              <input type="file" accept=".csv" style={{ display:'none' }} onChange={parseCSV} />
            </label>
          </div>
          {bankRows.length > 0 && (
            <div>
              <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1rem' }}>
                {[['Bank rows', bankRows.length, '#0D1F3C'], ['Matched', bankRows.filter(r=>([...mInc,...mExp]).find(e=>Math.abs(Math.abs(e.amt)-Math.abs(r.amt))<0.02)).length, '#1B4D3C'], ['Unmatched', bankRows.filter(r=>!([...mInc,...mExp]).find(e=>Math.abs(Math.abs(e.amt)-Math.abs(r.amt))<0.02)).length, '#B53232']].map(([l,v,c]) => (
                  <div key={l} style={metricCardSt}><div style={{ fontSize:'0.7rem', fontWeight:700, color:'#7A8BA8', textTransform:'uppercase', marginBottom:4 }}>{l}</div><div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1.3rem', fontWeight:700, color:c }}>{v}</div></div>
                ))}
              </div>
              {bankRows.map((r,i) => {
                const match = [...mInc,...mExp].find(e => Math.abs(Math.abs(e.amt)-Math.abs(r.amt))<0.02);
                return <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:8, border:'1px solid #E2EAF2', marginBottom:8, fontSize:'0.85rem' }}>
                  <div style={{ width:80, color:'#7A8BA8', fontSize:'0.78rem', flexShrink:0 }}>{r.date}</div>
                  <div style={{ flex:1, color:'#0D1F3C' }}>{r.desc}</div>
                  <div style={{ fontWeight:700, color:r.amt<0?'#B53232':'#1B4D3C', width:90, textAlign:'right' }}>{r.amt<0?'-':'+'}${Math.abs(r.amt).toFixed(2)}</div>
                  <span style={{ padding:'2px 8px', borderRadius:6, fontSize:'0.72rem', fontWeight:700, background:match?'#EBF6F1':'#FDF7E8', color:match?'#1B4D3C':'#8B6914' }}>{match?'✓ Matched':'Unmatched'}</span>
                </div>;
              })}
            </div>
          )}
        </div>
      )}

      {tab === 'monthly' && (
        <div>
          <div className="card card-p" style={{ marginBottom:'1rem' }}>
            <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1.1rem', fontWeight:700, color:'#0D1F3C', marginBottom:'1rem' }}>{MONTHS_LIST[month]} {year} summary</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
              <div>
                <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#7A8BA8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Income breakdown</div>
                {mInc.length === 0 && <div style={{ fontSize:'0.85rem', color:'#7A8BA8' }}>No income logged</div>}
                {mInc.map(r => <div key={r.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.85rem', padding:'5px 0', borderBottom:'1px solid #F4F6FA' }}>
                  <span style={{ color:'#7A8BA8' }}>{r.src}</span><span style={{ fontWeight:700, color:'#1B4D3C' }}>{fmt(r.amt)}</span>
                </div>)}
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.85rem', padding:'8px 0', fontWeight:700 }}><span>Total</span><span style={{ color:'#1B4D3C' }}>{fmt(totalInc)}</span></div>
              </div>
              <div>
                <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#7A8BA8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Expenses by category</div>
                {Object.entries(mExp.reduce((acc,r)=>({...acc,[r.cat]:(acc[r.cat]||0)+r.amt}),{})).sort((a,b)=>b[1]-a[1]).map(([cat,amt]) => {
                  const pct = totalInc > 0 ? ((amt/totalInc)*100).toFixed(0) : 0;
                  const barW = totalExp > 0 ? (amt/totalExp*100).toFixed(0) : 0;
                  return <div key={cat} style={{ marginBottom:6 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', marginBottom:2 }}>
                      <span style={{ color:'#7A8BA8' }}>{cat}</span>
                      <span style={{ color:'#0D1F3C' }}>{fmt(amt)} <span style={{ color:'#7A8BA8' }}>({pct}%)</span></span>
                    </div>
                    <div style={{ height:5, background:'#E2EAF2', borderRadius:3, overflow:'hidden' }}>
                      <div style={{ height:'100%', background:'#B53232', borderRadius:3, width:`${barW}%` }} />
                    </div>
                  </div>;
                })}
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.85rem', padding:'8px 0', fontWeight:700, borderTop:'1px solid #E2EAF2', marginTop:4 }}><span>Total</span><span style={{ color:'#B53232' }}>{fmt(totalExp)}</span></div>
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px', background:'#FAFAF6', borderRadius:8 }}>
              <span style={{ fontSize:'0.9rem', fontWeight:700 }}>Net {surplus>=0?'surplus':'deficit'}</span>
              <span style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1.5rem', fontWeight:700, color:surplus>=0?'#1B4D3C':'#B53232' }}>{surplus>=0?'+':'-'}{fmt(surplus)}</span>
            </div>
          </div>
          <div className="card card-p">
            <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1rem', fontWeight:700, color:'#0D1F3C', marginBottom:'1rem' }}>💡 Constructive advice for {MONTHS_LIST[month]}</div>
            {generateAdvice().map((a,i) => (
              <div key={i} style={{ display:'flex', gap:10, padding:'10px', borderRadius:8, border:'1px solid #E2EAF2', marginBottom:8 }}>
                <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{a.icon}</span>
                <span style={{ fontSize:'0.85rem', color:'#3E506B', lineHeight:1.6 }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'annual' && (() => {
        const a = annualStats();
        const totalDeduct = a.bizMi*0.70 + a.medMi*0.21 + a.aGiving;
        const maxBar = Math.max(...a.monthly.map(d=>Math.max(d.inc,d.exp)),1);
        return (
          <div>
            <div className="card card-p" style={{ marginBottom:'1rem' }}>
              <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1.1rem', fontWeight:700, color:'#0D1F3C', marginBottom:'1rem' }}>📄 {year} annual summary</div>
              <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
                {[['Total income',fmt(a.aInc),'#1B4D3C'],['Total expenses',fmt(a.aExp),'#B53232'],['Net '+(a.surplus>=0?'surplus':'deficit'),(a.surplus>=0?'+':'-')+fmt(a.surplus),a.surplus>=0?'#1B4D3C':'#B53232'],['Total giving',fmt(a.aGiving),'#8B6914']].map(([l,v,c])=>(
                  <div key={l} style={metricCardSt}><div style={{ fontSize:'0.7rem', fontWeight:700, color:'#7A8BA8', textTransform:'uppercase', marginBottom:4 }}>{l}</div><div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1.2rem', fontWeight:700, color:c }}>{v}</div></div>
                ))}
              </div>
              <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#7A8BA8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>Monthly income vs expenses</div>
              {a.monthly.map(d => (
                <div key={d.m} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                  <span style={{ width:28, fontSize:'0.75rem', color:'#7A8BA8' }}>{d.m}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:2 }}>
                      <div style={{ flex:1, height:6, background:'#E2EAF2', borderRadius:3, overflow:'hidden' }}><div style={{ height:'100%', background:'#1B4D3C', borderRadius:3, width:`${(d.inc/maxBar*100).toFixed(0)}%` }}/></div>
                      <span style={{ fontSize:'0.72rem', color:'#1B4D3C', width:65 }}>{d.inc>0?fmt(d.inc):''}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <div style={{ flex:1, height:6, background:'#E2EAF2', borderRadius:3, overflow:'hidden' }}><div style={{ height:'100%', background:'#B53232', borderRadius:3, width:`${(d.exp/maxBar*100).toFixed(0)}%` }}/></div>
                      <span style={{ fontSize:'0.72rem', color:'#B53232', width:65 }}>{d.exp>0?fmt(d.exp):''}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ display:'flex', gap:16, marginTop:8, fontSize:'0.75rem', color:'#7A8BA8' }}>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><span style={{ width:10, height:10, background:'#1B4D3C', borderRadius:2, display:'inline-block' }}/> Income</span>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><span style={{ width:10, height:10, background:'#B53232', borderRadius:2, display:'inline-block' }}/> Expenses</span>
              </div>
            </div>
            <div className="card card-p" style={{ marginBottom:'1rem' }}>
              <div style={{ fontFamily:'Lora,Georgia,serif', fontSize:'1rem', fontWeight:700, color:'#0D1F3C', marginBottom:4 }}>🧾 Tax preparation summary — {year}</div>
              <div style={{ fontSize:'0.78rem', color:'#7A8BA8', marginBottom:'1rem' }}>Review with your tax professional. This is a summary tool, not tax advice.</div>
              <div style={{ fontSize:'0.82rem', fontWeight:700, color:'#0D1F3C', marginBottom:8 }}>Potential deductions</div>
              {[['Business mileage',`${a.bizMi.toFixed(1)} mi × $0.70 = ${fmt(a.bizMi*0.70)}`],['Medical/charity mileage',`${a.medMi.toFixed(1)} mi × $0.21 = ${fmt(a.medMi*0.21)}`],['Charitable giving',fmt(a.aGiving)]].map(([l,v])=>(
                <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #F4F6FA', fontSize:'0.85rem' }}>
                  <span style={{ color:'#7A8BA8' }}>{l}</span><span style={{ fontWeight:700 }}>{v}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', fontSize:'0.9rem', fontWeight:700 }}>
                <span>Total estimated deductions</span><span style={{ color:'#1B4D3C' }}>{fmt(totalDeduct)}</span>
              </div>
              <div style={{ marginTop:'1rem', fontSize:'0.82rem', fontWeight:700, color:'#0D1F3C', marginBottom:8 }}>Annual expenses by category</div>
              {Object.entries(a.catTotals).sort((x,y)=>y[1]-x[1]).map(([cat,amt])=>(
                <div key={cat} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #F4F6FA', fontSize:'0.85rem' }}>
                  <span style={{ color:'#7A8BA8' }}>{cat}</span><span style={{ fontWeight:700 }}>{fmt(amt)}</span>
                </div>
              ))}
              {Object.keys(a.catTotals).length === 0 && <div style={{ fontSize:'0.85rem', color:'#7A8BA8', padding:'8px 0' }}>No expenses logged for this year yet</div>}
              <div style={{ marginTop:'1rem', padding:'12px', background:'#EBF0F8', borderRadius:8, fontSize:'0.82rem', color:'#162E56', lineHeight:1.6 }}>
                ℹ️ Keep all receipts and mileage logs. Share this summary with your CPA for Schedule C, Schedule A, and charitable deduction documentation.
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

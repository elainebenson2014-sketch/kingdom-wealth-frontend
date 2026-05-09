import { useState, useRef, useEffect } from "react";
import React from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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

async function askCoach(messages, userContext) {
  const personalityGuide = {
    anxious: "This person is anxious about money — be extra gentle, reassuring, and calm. Never overwhelm. Focus on one step at a time.",
    spender: "This person is a natural spender — celebrate their wins generously, use motivating language, and make saving feel exciting not restrictive.",
    saver: "This person is already a saver — challenge them to give more generously and invest boldly. They're ready for the next level.",
    confused: "This person feels confused about money — use very simple language, avoid jargon, and explain everything step by step.",
    motivated: "This person is highly motivated — give them bold, ambitious targets and celebrate their drive. Match their energy.",
    rebuilding: "This person is rebuilding after setbacks — lead with grace, zero shame, and radical encouragement. Every step forward is a miracle.",
  };
  const faithGuide = {
    active: "They are an active tither — reference biblical stewardship naturally and frequently.",
    tithing_start: "They want to start tithing — gently encourage giving as a first step, not last.",
    faith_guided: "Faith guides them but they don't tithe yet — reference scripture naturally, encourage generosity without pressure.",
    exploring: "They are exploring faith-based finance — introduce biblical principles gently as wisdom, not dogma.",
    secular: "They are not religious — focus on practical financial wisdom. Skip religious references unless they bring it up.",
  };
  const personality = userContext?.moneyPersonality;
  const faith = userContext?.faithLevel;
  const household = userContext?.household;
  const dependents = userContext?.dependents;
  const systemPrompt = `You are the Kingdom Wealth Builders AI Coach — a warm, expert, faith-centered financial stewardship coach.

${personality ? `PERSONALITY GUIDANCE: ${personalityGuide[personality] || ""}` : ""}
${faith ? `FAITH GUIDANCE: ${faithGuide[faith] || ""}` : ""}
${household ? `HOUSEHOLD CONTEXT: ${household}${dependents && dependents !== "0" ? `, ${dependents} dependent(s)` : ""}` : ""}

Core approach:
- Deeply encouraging, never shame-based or cold
- Blend biblical wisdom naturally with practical financial expertise (adjust based on faith level above)
- Teach one concept at a time — never overwhelm
- Celebrate every small win enthusiastically
- Give ONE clear, actionable next step per response
- Format with **bold** for key points, use simple bullet lists, keep responses warm and human`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) throw new Error("API error");
  const d = await res.json();
  return d.content?.[0]?.text || "I'm here to help — could you share a bit more?";
}

function buildPlan(form) {
  const toMonthly = (amt, freq) => { const n=parseFloat(amt)||0; if(freq==="weekly")return n*4.33; if(freq==="biweekly")return n*2.167; if(freq==="annual")return n/12; return n; };
  const incStreams = form.incomeStreams || [];
  const inc = incStreams.length > 0 ? Math.round(incStreams.reduce((s,r)=>s+toMonthly(r.amt,r.freq),0)) : (parseFloat(form.income)||4000);
  const expCatMap = form.expenseCategories || {};
  const expFromCats = Object.values(expCatMap).reduce((s,v)=>s+(parseFloat(v)||0),0);
  const exp = expFromCats > 0 ? Math.round(expFromCats) : (parseFloat(form.expenses)||3000);
  const sav = parseFloat(form.savings) || 500;
  const surplus = inc - exp;
  const totalAssets = Object.values(form.assets||{}).reduce((s,v)=>s+(parseFloat(v)||0),0);

  const expCatKeys = [
    { cat:"Housing & Utilities", key:"housing", color:"#0D1F3C" },
    { cat:"Food & Groceries", key:"food", color:"#1B4D3C" },
    { cat:"Transportation", key:"transport", color:"#C9A84C" },
    { cat:"Healthcare", key:"healthcare", color:"#246B52" },
    { cat:"Personal & Entertainment", key:"personal", color:"#7A8BA8" },
    { cat:"Other Expenses", key:"other", color:"#B53232" },
  ];
  const budget = expFromCats > 0
    ? expCatKeys.map(b=>({cat:b.cat,color:b.color,amount:Math.round(parseFloat(expCatMap[b.key])||0),pct:inc>0?Math.round((parseFloat(expCatMap[b.key])||0)/inc*100):0})).filter(b=>b.amount>0)
    : [{cat:"Housing & Utilities",pct:30,color:"#0D1F3C"},{cat:"Food & Groceries",pct:12,color:"#1B4D3C"},{cat:"Transportation",pct:10,color:"#C9A84C"},{cat:"Debt Payments",pct:15,color:"#B53232"},{cat:"Savings & Giving",pct:13,color:"#246B52"},{cat:"Personal & Other",pct:20,color:"#7A8BA8"}].map(b=>({...b,amount:Math.round(inc*b.pct/100)}));

  // Use real debts entered by user, sorted by snowball (smallest balance first)
  const userDebts = (form.debts || []).length > 0
    ? [...form.debts].sort((a, b) => parseFloat(a.bal) - parseFloat(b.bal)).map((d, i) => ({
        name: d.name,
        bal: parseFloat(d.bal) || 0,
        rate: d.rate ? `${d.rate}%` : '—',
        payment: parseFloat(d.payment) || 0,
        paidPct: 0,
        priority: i + 1,
      }))
    : [{ name: "Add your debts in the intake form", bal: 0, rate: "—", payment: 0, paidPct: 0, priority: 1 }];

  const debt = userDebts.reduce((s, d) => s + d.bal, 0);

  return {
    user: { name: form.name, email: form.email, phone: form.phone, goals: form.goals, stress: form.stress, household: form.household, dependents: form.dependents, moneyPersonality: form.moneyPersonality, faithLevel: form.faithLevel, timeline: form.timeline },
    income: inc, expenses: exp, debt, savings: sav, surplus, totalAssets,
    incomeStreams: incStreams,
    budget,
    debts: userDebts,
    savingsGoals: (() => {
      const goals = form.selectedGoals || [];
      const base = [];
      if (goals.includes("emergency_fund") || goals.length === 0)
        base.push({ name: "Emergency Fund (3 months)", target: Math.round(inc * 3), current: sav, icon: "🛡️" });
      if (goals.includes("give_more") || goals.includes("generational") || goals.length === 0)
        base.push({ name: "Tithe & Giving Fund", target: Math.round(inc * 0.1 * 12), current: Math.round(sav * 0.15), icon: "💛" });
      if (goals.includes("save_home"))
        base.push({ name: "Home Down Payment", target: 20000, current: Math.round(sav * 0.2), icon: "🏠" });
      if (goals.includes("save_education"))
        base.push({ name: "Education Fund", target: 10000, current: Math.round(sav * 0.1), icon: "🎓" });
      if (goals.includes("generational"))
        base.push({ name: "Legacy / Investment Fund", target: 25000, current: Math.round(sav * 0.05), icon: "👑" });
      if (base.length === 0)
        base.push({ name: "Future Vision Fund", target: 5000, current: Math.round(sav * 0.1), icon: "🌱" });
      return base;
    })(),
    actions: (() => {
      const goals = form.selectedGoals || [];
      const acts = [
        { text: "Review your last 7 days of spending — categorize every transaction", tag: "budget" },
      ];
      if (goals.includes("payoff_debt") || form.debts?.length > 0)
        acts.push({ text: `Make an extra $${Math.max(50, Math.round(surplus * 0.3))} payment toward your smallest debt this week`, tag: "debt" });
      if (goals.includes("emergency_fund") || goals.length === 0)
        acts.push({ text: "Set up an automatic $50 transfer to your Emergency Fund this Friday", tag: "savings" });
      if (goals.includes("give_more"))
        acts.push({ text: `Set up a recurring $${Math.round(inc * 0.1)} monthly tithe or donation this week`, tag: "savings" });
      if (goals.includes("increase_income"))
        acts.push({ text: "List 3 skills you have that others would pay for — explore one side income idea", tag: "budget" });
      acts.push({ text: "Read Proverbs 3 and write down one principle you can apply to your finances today", tag: "faith" });
      return acts.slice(0, 4);
    })(),
    scripture: { text: "Commit to the Lord whatever you do, and he will establish your plans.", ref: "Proverbs 16:3" },
    encouragement: (() => {
      const p = form.moneyPersonality;
      const name = form.name || "Friend";
      if (p === "anxious") return `${name}, I want you to take a deep breath. You don't have to figure everything out today. You've already done the hard part — showing up. We'll take this one step at a time, together.`;
      if (p === "spender") return `${name}, your generosity and enjoyment of life are beautiful qualities. Now let's channel that same energy into building something that lasts. Your future self is going to thank you for starting today.`;
      if (p === "saver") return `${name}, you already have the discipline — that's the hardest part. Now let's put that discipline to work at a higher level — more giving, smarter investing, and building a legacy that outlasts you.`;
      if (p === "confused") return `${name}, feeling confused about money is more common than you think — and the fact that you're here means you're already ahead. We'll make everything simple and clear, one concept at a time.`;
      if (p === "motivated") return `${name}, your energy is exactly what this journey needs. Let's channel it into a plan that matches your drive. You're not here to play small — let's build something extraordinary.`;
      if (p === "rebuilding") return `${name}, setbacks are not the end of your story — they're part of it. Every person who has ever built something meaningful has had to rebuild at some point. Your comeback starts today.`;
      return `${name}, the fact that you're here today is already an act of courage and faith. God honors diligent stewardship — your journey starts right now.`;
    })(),
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

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error) { if (this.props.onError) this.props.onError(String(error)); }
  render() { if (this.state.hasError) return null; return this.props.children; }
}

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [plan, setPlan] = useState(null);
  const [dashTab, setDashTab] = useState("overview");
  const [checked, setChecked] = useState([]);
  const [checkinChecked, setCheckinChecked] = useState([]);
  const [appError, setAppError] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // ── Load saved plan from Supabase ─────────────────────────────────────────
  const loadPlan = async (supaUser) => {
    try {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", supaUser.id).single();
      const { data: savedPlan } = await supabase.from("plans").select("*").eq("user_id", supaUser.id).order("updated_at", { ascending: false }).limit(1).single();

      if (savedPlan) {
        const restored = {
          user: { name: profile?.name || supaUser.user_metadata?.name || "Friend", email: supaUser.email, household: profile?.household, moneyPersonality: profile?.money_personality, faithLevel: profile?.faith_level },
          income: savedPlan.income || 0,
          expenses: savedPlan.expenses || 0,
          savings: savedPlan.savings || 0,
          debt: savedPlan.total_debt || 0,
          totalAssets: savedPlan.total_assets || 0,
          surplus: savedPlan.surplus || 0,
          incomeStreams: savedPlan.income_streams || [],
          debts: (savedPlan.debts || []).sort((a,b) => parseFloat(a.bal)-parseFloat(b.bal)).map((d,i) => ({ ...d, priority: i+1, paidPct: 0, rate: d.rate ? `${d.rate}%` : "—", payment: parseFloat(d.payment)||0, bal: parseFloat(d.bal)||0 })),
          budget: savedPlan.expense_categories ? Object.entries(savedPlan.expense_categories).filter(([,v])=>parseFloat(v)>0).map(([k,v]) => {
            const colors = { housing:"#0D1F3C", food:"#1B4D3C", transport:"#C9A84C", healthcare:"#246B52", personal:"#7A8BA8", other:"#B53232" };
            const labels = { housing:"Housing & Utilities", food:"Food & Groceries", transport:"Transportation", healthcare:"Healthcare", personal:"Personal & Entertainment", other:"Other Expenses" };
            return { cat: labels[k]||k, color: colors[k]||"#7A8BA8", amount: Math.round(parseFloat(v)), pct: savedPlan.income > 0 ? Math.round(parseFloat(v)/savedPlan.income*100) : 0 };
          }) : [],
          savingsGoals: [
            { name: "Emergency Fund (3 months)", target: Math.round((savedPlan.income||0)*3), current: savedPlan.savings||0, icon: "🛡️" },
            { name: "Tithe & Giving Fund", target: Math.round((savedPlan.income||0)*0.1*12), current: Math.round((savedPlan.savings||0)*0.15), icon: "💛" },
          ],
          actions: [
            { text: "Review your last 7 days of spending", tag: "budget" },
            { text: "Make an extra payment toward your smallest debt", tag: "debt" },
            { text: "Transfer $50 to your Emergency Fund this week", tag: "savings" },
            { text: "Read Proverbs 3 and apply one principle today", tag: "faith" },
          ],
          scripture: { text: "Commit to the Lord whatever you do, and he will establish your plans.", ref: "Proverbs 16:3" },
          encouragement: `Welcome back, ${profile?.name||"Friend"}! Your plan is right here. Every day you stay consistent is a day closer to freedom. 👑`,
          devotional: { day:"This Week", title:"Staying the Course", body:"Financial transformation doesn't happen overnight — it happens one faithful decision at a time.", verse:'"The plans of the diligent lead to profit." — Proverbs 21:5' },
          lesson: { title:"The Debt Snowball Method", body:"List debts smallest to largest. Attack the smallest first. Roll each payment into the next.", tip:"💡 Momentum beats math. Small wins build unstoppable motivation." },
        };
        return restored;
      }
    } catch(e) { console.log("No saved plan found", e); }
    return null;
  };

  // ── Check for existing session on mount ───────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const name = u.user_metadata?.name || u.email?.split("@")[0] || "Friend";
        setUser({ name, email: u.email });
        const savedPlan = await loadPlan(u);
        if (savedPlan) { setPlan(savedPlan); setPage("dashboard"); }
      }
      setLoadingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const u = session.user;
        const name = u.user_metadata?.name || u.email?.split("@")[0] || "Friend";
        setUser({ name, email: u.email });
      }
      if (event === "SIGNED_OUT") { setUser(null); setPlan(null); setPage("landing"); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (u) => {
    setUser(u);
    setAuthModal(null);
    // Try to load their saved plan
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const savedPlan = await loadPlan(session.user);
      if (savedPlan) { setPlan(savedPlan); setPage("dashboard"); setDashTab("overview"); return; }
    }
    // No saved plan — go to intake
    setPage("intake");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null); setPlan(null); setPage("landing");
  };
  const startJourney = () => { setAppError(null); setPage("intake"); };

  const navTabs = [
    { id: "landing", label: "Home" },
    { id: "intake", label: "My Finances" },
    { id: "dashboard", label: "Dashboard" },
  ];

  // Show loading spinner while checking session
  if (loadingSession) return (
    <>
      <style>{CSS}</style>
      <div className="loading-page">
        <div className="spinner" />
        <div className="loading-h">Kingdom Wealth Builders</div>
        <div className="loading-s">Loading your plan…</div>
      </div>
    </>
  );

  const navTabs = [
    { id: "landing", label: "Home" },
    { id: "intake", label: "My Finances" },
    { id: "dashboard", label: "Dashboard" },
  ];

  if (appError) return (
    <>
      <style>{CSS}</style>
      <div style={{ padding: "2rem", maxWidth: 600, margin: "100px auto", fontFamily: "Nunito, sans-serif" }}>
        <h2 style={{ color: "#B53232", marginBottom: "1rem" }}>Something went wrong</h2>
        <pre style={{ background: "#FFF5F5", padding: "1rem", borderRadius: 8, fontSize: "0.8rem", color: "#B53232", whiteSpace: "pre-wrap", marginBottom: "1rem" }}>{appError}</pre>
        <button className="btn btn-navy" onClick={() => { setAppError(null); setPage("landing"); }}>← Back to Home</button>
      </div>
    </>
  );

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
            <button key={t.id} className={`nav-tab ${page === t.id ? "active" : ""}`} onClick={() => {
              if (t.id === "intake") startJourney();
              else if (t.id === "dashboard" && plan) setPage("dashboard");
              else if (t.id === "dashboard" && !plan) startJourney();
              else setPage(t.id);
            }}>{t.label}</button>
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
      {page === "intake" && (
        <ErrorBoundary onError={setAppError}>
          <IntakePage user={user} onComplete={(p, savedUser) => {
            try {
              if (savedUser && savedUser.email) setUser(savedUser);
              setPlan(p); setPage("dashboard"); setDashTab("overview");
            }
            catch(e) { setAppError(String(e)); }
          }} />
        </ErrorBoundary>
      )}
      {page === "dashboard" && (
        <ErrorBoundary onError={setAppError}>
          <Dashboard plan={plan || {income:0,expenses:0,debt:0,savings:0,surplus:0,totalAssets:0,incomeStreams:[],budget:[],debts:[],savingsGoals:[{name:"Emergency Fund",target:3000,current:0,icon:"🛡️"}],actions:[{text:"Review your spending this week",tag:"budget"}],scripture:{text:"Commit to the Lord whatever you do.",ref:"Proverbs 16:3"},encouragement:"Welcome! Complete your financial intake.",devotional:{day:"This Week",title:"Getting Started",body:"Every financial journey begins with a single step.",verse:'"The plans of the diligent lead to profit." — Proverbs 21:5'},lesson:{title:"The Debt Snowball Method",body:"Pay minimums on all debts.",tip:"💡 Small wins build momentum."},user:{name:user?.name||"Friend",email:""},incomeStreams:[]}} user={user} dashTab={dashTab} setDashTab={setDashTab} checked={checked} setChecked={setChecked} checkinChecked={checkinChecked} setCheckinChecked={setCheckinChecked} onLogout={logout} onRedo={() => setPage("intake")} />
        </ErrorBoundary>
      )}
    </>
  );
}

function AuthModal({ mode, onClose, onAuth, switchMode }) {
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isLogin = mode === "login";
  const submit = async () => {
    if (!f.email || !f.password || (!isLogin && !f.name)) { setErr("Please fill in all fields."); return; }
    setSubmitting(true); setErr("");
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email: f.email, password: f.password });
        if (error) { setErr(error.message); setSubmitting(false); return; }
        const name = data.user?.user_metadata?.name || f.email.split("@")[0];
        onAuth({ name, email: f.email });
      } else {
        const { data, error } = await supabase.auth.signUp({ email: f.email, password: f.password, options: { data: { name: f.name } } });
        if (error) { setErr(error.message); setSubmitting(false); return; }
        if (data.user) await supabase.from("profiles").upsert({ id: data.user.id, name: f.name });
        onAuth({ name: f.name, email: f.email });
      }
    } catch(e) { setErr("Something went wrong. Please try again."); setSubmitting(false); }
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
        <button className="btn btn-navy btn-block" style={{ marginTop: "0.5rem" }} onClick={submit} disabled={submitting}>{submitting ? "Please wait…" : isLogin ? "Sign In" : "Create Free Account"}</button>
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
            <p className="sec-sub">Everything you need — clean, focused, and powerful enough to deliver real transformation from day one.</p>
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
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>👑</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "2.6rem", fontWeight: 700, color: "white", marginBottom: "1rem", lineHeight: 1.2 }}>Your Kingdom financial<br />journey starts today.</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.68)", marginBottom: "2.5rem", lineHeight: 1.85 }}>Complete your financial intake in 5 minutes and receive a personalized budget, debt strategy, savings goals, and faith-centered coaching.</p>
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

  // ── All form state at the top level — no hooks inside render ──
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [household, setHousehold] = useState("single");
  const [dependents, setDependents] = useState("0");
  const [timeline, setTimeline] = useState("1-2 years");
  const [moneyPersonality, setMoneyPersonality] = useState("");
  const [faithLevel, setFaithLevel] = useState("");

  const [incomeStreams, setIncomeStreams] = useState([]);
  const [newIncSrc, setNewIncSrc] = useState("");
  const [newIncAmt, setNewIncAmt] = useState("");
  const [newIncFreq, setNewIncFreq] = useState("monthly");
  const [newIncCat, setNewIncCat] = useState("Primary job");
  const [expCatVals, setExpCatVals] = useState({ housing:"", food:"", transport:"", healthcare:"", personal:"", other:"" });
  const [assets, setAssets] = useState({ checking:"", retirement:"", car:"", home:"", other:"" });
  const [savings, setSavings] = useState("");

  const [debts, setDebts] = useState([]);
  const [debtName, setDebtName] = useState("");
  const [debtBal, setDebtBal] = useState("");
  const [debtRate, setDebtRate] = useState("");
  const [debtPayment, setDebtPayment] = useState("");

  const [selectedGoals, setSelectedGoals] = useState([]);
  const [stress, setStress] = useState("");

  // ── Derived values ──
  const toMonthly = (amt, freq) => {
    const n = parseFloat(amt) || 0;
    if (freq === "weekly") return n * 4.33;
    if (freq === "biweekly") return n * 2.167;
    if (freq === "annual") return n / 12;
    return n;
  };
  const totalInc = Math.round(incomeStreams.reduce((s, r) => s + toMonthly(r.amt, r.freq), 0));
  const totalExp = Math.round(Object.values(expCatVals).reduce((s, v) => s + (parseFloat(v) || 0), 0));
  const totalAssets = Math.round(Object.values(assets).reduce((s, v) => s + (parseFloat(v) || 0), 0));
  const liveSurplus = totalInc - totalExp;
  const totalDebt = debts.reduce((s, d) => s + (parseFloat(d.bal) || 0), 0);

  const steps = ["Personal Info", "Your Finances", "Your Debts", "Goals & Vision", "Review"];

  const addIncome = () => {
    if (!newIncSrc || !newIncAmt) return;
    setIncomeStreams(p => [...p, { id: Date.now(), src: newIncSrc, amt: newIncAmt, freq: newIncFreq, cat: newIncCat, monthly: Math.round(toMonthly(newIncAmt, newIncFreq)) }]);
    setNewIncSrc(""); setNewIncAmt("");
  };
  const removeIncome = (id) => setIncomeStreams(p => p.filter(r => r.id !== id));

  const addDebt = () => {
    if (!debtName || !debtBal) return;
    setDebts(p => [...p, { id: Date.now(), name: debtName, bal: debtBal, rate: debtRate, payment: debtPayment }]);
    setDebtName(""); setDebtBal(""); setDebtRate(""); setDebtPayment("");
  };
  const removeDebt = (id) => setDebts(p => p.filter(d => d.id !== id));

  const toggleGoal = (id) => setSelectedGoals(p => p.includes(id) ? p.filter(g => g !== id) : [...p, id]);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveEmail, setSaveEmail] = useState("");
  const [savePassword, setSavePassword] = useState("");
  const [saveName, setSaveName] = useState("");

  const submit = () => {
    // Show save modal before building plan
    setSaveName(name || "");
    setSaveEmail(email || "");
    setShowSaveModal(true);
  };

  const [saveError, setSaveError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const buildAndComplete = async (savedUser) => {
    setShowSaveModal(false);
    setLoading(true);
    const form = { name: savedUser?.name || name, email: savedUser?.email || email, phone, household, dependents, timeline, moneyPersonality, faithLevel, incomeStreams, income: String(totalInc), expenseCategories: expCatVals, expenses: String(totalExp), assets, savings, debts, selectedGoals, stress, goals: selectedGoals.join(", ") };
    setTimeout(() => { onComplete(buildPlan(form), savedUser); }, 1800);
  };

  const handleSave = async () => {
    if (!saveName || !saveEmail || !savePassword) { setSaveError("Please fill in all fields."); return; }
    setSaveLoading(true); setSaveError("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: saveEmail,
        password: savePassword,
        options: { data: { name: saveName } }
      });
      if (error) { setSaveError(error.message); setSaveLoading(false); return; }
      const user = data.user;
      if (user) {
        await supabase.from("profiles").upsert({ id: user.id, name: saveName, phone, household, dependents, timeline, money_personality: moneyPersonality, faith_level: faithLevel });
        await supabase.from("plans").upsert({ user_id: user.id, income: totalInc, expenses: totalExp, savings: parseFloat(savings)||0, total_debt: totalDebt, total_assets: totalAssets, surplus: liveSurplus, income_streams: incomeStreams, expense_categories: expCatVals, debts, selected_goals: selectedGoals, stress, updated_at: new Date().toISOString() });
      }
      buildAndComplete({ name: saveName, email: saveEmail });
    } catch(e) { setSaveError("Something went wrong. Please try again."); setSaveLoading(false); }
  };

  if (showSaveModal) return (
    <div style={{ minHeight:"100vh", paddingTop:66, background:"linear-gradient(180deg,#FAFAF6 0%,white 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 1.5rem 4rem" }}>
      <div style={{ maxWidth:440, width:"100%", background:"white", borderRadius:18, padding:"2.25rem", boxShadow:"0 20px 60px rgba(13,31,60,0.12)", border:"1px solid #E2EAF2" }}>
        <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>👑</div>
          <h2 style={{ fontFamily:"Lora,Georgia,serif", fontSize:"1.6rem", fontWeight:700, color:"#0D1F3C", marginBottom:"0.3rem" }}>Save Your Plan</h2>
          <p style={{ fontSize:"0.85rem", color:"#7A8BA8", lineHeight:1.6 }}>Create a free account to save your Kingdom Wealth plan and access it anytime.</p>
        </div>
        {saveError && <div style={{ padding:"10px 14px", background:"#FFF5F5", border:"1px solid #FED7D7", borderRadius:8, fontSize:"0.82rem", color:"#B53232", marginBottom:"1rem" }}>{saveError}</div>}
        <div style={{ marginBottom:"1rem" }}>
          <label style={{ display:"block", fontSize:"0.78rem", fontWeight:700, color:"#0D1F3C", marginBottom:"0.3rem" }}>Full Name</label>
          <input style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E2EAF2", borderRadius:8, fontFamily:"Nunito,sans-serif", fontSize:"0.9rem", color:"#0D1F3C", outline:"none" }} placeholder="Your full name" value={saveName} onChange={e=>setSaveName(e.target.value)} />
        </div>
        <div style={{ marginBottom:"1rem" }}>
          <label style={{ display:"block", fontSize:"0.78rem", fontWeight:700, color:"#0D1F3C", marginBottom:"0.3rem" }}>Email Address</label>
          <input style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E2EAF2", borderRadius:8, fontFamily:"Nunito,sans-serif", fontSize:"0.9rem", color:"#0D1F3C", outline:"none" }} type="email" placeholder="you@email.com" value={saveEmail} onChange={e=>setSaveEmail(e.target.value)} />
        </div>
        <div style={{ marginBottom:"1.5rem" }}>
          <label style={{ display:"block", fontSize:"0.78rem", fontWeight:700, color:"#0D1F3C", marginBottom:"0.3rem" }}>Create Password</label>
          <input style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E2EAF2", borderRadius:8, fontFamily:"Nunito,sans-serif", fontSize:"0.9rem", color:"#0D1F3C", outline:"none" }} type="password" placeholder="At least 6 characters" value={savePassword} onChange={e=>setSavePassword(e.target.value)} />
        </div>
        <button
          onClick={handleSave}
          disabled={saveLoading}
          style={{ width:"100%", padding:"13px", background: saveLoading ? "#E2EAF2" : "linear-gradient(135deg,#C9A84C,#E8C97A)", color: saveLoading ? "#7A8BA8" : "#0D1F3C", border:"none", borderRadius:9, fontFamily:"Nunito,sans-serif", fontSize:"0.95rem", fontWeight:700, cursor: saveLoading ? "not-allowed" : "pointer", marginBottom:"0.75rem" }}>
          {saveLoading ? "Saving your plan…" : "✨ Save & View My Plan →"}
        </button>
        <button
          onClick={() => buildAndComplete({ name: name || "Friend", email: email })}
          style={{ width:"100%", padding:"11px", background:"none", color:"#7A8BA8", border:"1.5px solid #E2EAF2", borderRadius:9, fontFamily:"Nunito,sans-serif", fontSize:"0.85rem", fontWeight:600, cursor:"pointer" }}>
          Skip for now — view without saving
        </button>
        <p style={{ textAlign:"center", fontSize:"0.75rem", color:"#7A8BA8", marginTop:"1rem", lineHeight:1.6 }}>
          🔒 Your information is private and never shared. Free forever.
        </p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="loading-page">
      <div className="spinner" />
      <div className="loading-h">Building Your Kingdom Plan…</div>
      <div className="loading-s">Crafting your budget, debt strategy, savings goals, devotional & first lesson.</div>
    </div>
  );

  // ── Shared styles ──
  const inputSt = { width:"100%", padding:"9px 12px", border:"1.5px solid #E2EAF2", borderRadius:8, fontFamily:"Nunito,sans-serif", fontSize:"0.875rem", color:"#0D1F3C", outline:"none", background:"white" };
  const selSt = { ...inputSt, cursor:"pointer" };
  const sectionHd = (label) => <div style={{ fontSize:"0.78rem", fontWeight:700, color:"#0D1F3C", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>{label}</div>;
  const divider = <div style={{ height:1, background:"#E2EAF2", margin:"0 0 1.25rem" }} />;

  const expCats = [
    { key:"housing", label:"Housing & Utilities", color:"#0D1F3C", hint:"Rent/mortgage, electric, water, internet" },
    { key:"food", label:"Food & Groceries", color:"#1B4D3C", hint:"Groceries, restaurants, coffee" },
    { key:"transport", label:"Transportation", color:"#C9A84C", hint:"Car payment, gas, insurance, bus" },
    { key:"healthcare", label:"Healthcare", color:"#246B52", hint:"Insurance, prescriptions, copays" },
    { key:"personal", label:"Personal & Entertainment", color:"#7A8BA8", hint:"Clothing, subscriptions, dining out" },
    { key:"other", label:"Other Expenses", color:"#B53232", hint:"Anything not listed above" },
  ];

  const GOAL_OPTIONS = [
    { id:"payoff_debt", icon:"💳", label:"Pay off all my debt", desc: totalDebt > 0 ? `You have $${Math.round(totalDebt).toLocaleString()} to eliminate` : "Add debts in Step 3", connects:"Debt Payoff tab — builds your full snowball roadmap" },
    { id:"emergency_fund", icon:"🛡️", label:"Build a 3-month emergency fund", desc: totalInc > 0 ? `Target: $${(totalInc*3).toLocaleString()}` : "Based on your income", connects:"Savings Goals tab — tracks your progress" },
    { id:"save_home", icon:"🏠", label:"Save for a home", desc:"Creates a Home Down Payment savings goal", connects:"Savings Goals tab — adds a custom goal" },
    { id:"give_more", icon:"❤️", label:"Give more generously", desc: totalInc > 0 ? `10% tithe = $${Math.round(totalInc*0.1).toLocaleString()}/mo` : "10% of your income", connects:"Budget tab — highlights giving category" },
    { id:"generational", icon:"👑", label:"Build generational wealth", desc:"Invest & save beyond your lifetime", connects:"Savings Goals tab — adds Legacy Fund goal" },
    { id:"reduce_stress", icon:"🕊️", label:"Reduce financial stress", desc:"Get a clear plan and accountability", connects:"AI Coach — prioritizes encouragement & clarity" },
    { id:"increase_income", icon:"📈", label:"Increase my income", desc:"Side business, raise, or new opportunity", connects:"AI Coach — suggests income growth strategies" },
    { id:"save_education", icon:"🎓", label:"Save for education", desc:"College fund or personal development", connects:"Savings Goals tab — adds Education Fund goal" },
  ];

  // ── Review calculations ──
  const surp = totalInc - totalExp;
  const sav = parseFloat(savings) || 0;
  const savRate = totalInc > 0 ? (surp/totalInc)*100 : 0;
  const debtToInc = totalInc > 0 ? (totalDebt/(totalInc*12))*100 : 100;
  let score = 50;
  if (savRate >= 20) score += 20; else if (savRate >= 10) score += 12; else if (savRate >= 0) score += 4; else score -= 10;
  if (debtToInc <= 15) score += 15; else if (debtToInc <= 36) score += 8; else if (debtToInc <= 50) score += 2; else score -= 8;
  if (sav >= totalInc*3) score += 10; else if (sav >= totalInc) score += 5; else if (sav > 0) score += 2;
  if (selectedGoals.includes("give_more")) score += 5;
  score = Math.min(100, Math.max(10, Math.round(score)));
  const scoreColor = score >= 75 ? "#86EFAC" : score >= 50 ? "#E8C97A" : "#FCA5A5";
  const scoreLabel = score >= 75 ? "Strong" : score >= 55 ? "Building" : score >= 40 ? "Developing" : "Starting Out";

  const sortedDebts = [...debts].sort((a,b) => parseFloat(a.bal)-parseFloat(b.bal));
  const smallest = sortedDebts[0];
  const extraPmt = Math.max(0, Math.round(surp*0.5));
  const totalMinPmts = debts.reduce((s,d) => s+(parseFloat(d.payment)||0), 0);
  const totalToDebt = totalMinPmts + extraPmt;
  const dfMonths = totalDebt > 0 && totalToDebt > 0 ? Math.ceil(totalDebt/totalToDebt) : null;
  const dfDate = dfMonths ? (() => { const d = new Date(); d.setMonth(d.getMonth()+dfMonths); return d.toLocaleDateString("en-US",{month:"long",year:"numeric"}); })() : null;
  const efTarget = Math.round(totalInc*3);
  const efRemain = Math.max(0, efTarget-sav);
  const efMo = Math.max(50, Math.round(surp*0.2));
  const efMonths = efMo > 0 && efRemain > 0 ? Math.ceil(efRemain/efMo) : null;
  const efDate = efMonths ? (() => { const d = new Date(); d.setMonth(d.getMonth()+efMonths); return d.toLocaleDateString("en-US",{month:"long",year:"numeric"}); })() : null;

  const priorities = [];
  if (surp < 0) priorities.push({ icon:"🚨", color:"#B53232", bg:"#FFF8F8", title:"Close your monthly deficit first", dollar:`Losing $${Math.abs(surp).toLocaleString()}/mo — $${Math.abs(surp*12).toLocaleString()}/year`, action:`List every expense and find $${Math.round(Math.abs(surp)*0.5).toLocaleString()} to cut this week`, delay:`Every month costs you $${Math.abs(surp).toLocaleString()} more` });
  if (sav < 1000) priorities.push({ icon:"🛡️", color:"#8B6914", bg:"#FDFAF0", title:"Build a $1,000 starter emergency fund", dollar:`Need $${Math.max(0,1000-sav).toLocaleString()} more — prevents new debt when life happens`, action:`Open a separate savings account and transfer $${Math.min(1000-sav, Math.max(25,Math.round(surp*0.3))).toLocaleString()} today`, delay:"Without this, one emergency adds $500-$1,500 to your debt" });
  if (smallest && parseFloat(smallest.bal) > 0) { const mi = Math.round(parseFloat(smallest.bal)*(parseFloat(smallest.rate||0)/100)/12); priorities.push({ icon:"💳", color:"#162E56", bg:"#F5F7FF", title:`Eliminate ${smallest.name} first`, dollar:`$${parseFloat(smallest.bal).toLocaleString()} balance${mi>0?` · costs ~$${mi}/mo in interest`:""}`, action:`Add $${Math.max(50,extraPmt).toLocaleString()} extra to this account this week`, delay:mi>0?`Waiting 6 months = $${mi*6} extra interest`:"Every month delayed loses momentum" }); }
  if (surp > 200 && totalDebt > 0 && priorities.length < 3) priorities.push({ icon:"⚡", color:"#1B4D3C", bg:"#F0FAF5", title:`Put your $${surp.toLocaleString()}/mo surplus to work`, dollar:`$${extraPmt.toLocaleString()}/mo extra to debt accelerates freedom dramatically`, action:`Set up an automatic extra payment of $${extraPmt.toLocaleString()} on payday`, delay:"Idle surplus is silently working against you" });
  const top3 = priorities.slice(0,3);

  const encouragement = moneyPersonality === "anxious" ? `${name||"Friend"}, take a deep breath. You don't have to figure everything out today. We'll take this one step at a time, together.`
    : moneyPersonality === "spender" ? `${name||"Friend"}, your love of life is beautiful. Now let's channel that energy into building something that lasts.`
    : moneyPersonality === "rebuilding" ? `${name||"Friend"}, setbacks are not the end of your story — they're part of it. Your comeback starts today.`
    : `${name||"Friend"}, the fact that you're here is already an act of courage. God honors diligent stewardship — your journey starts right now.`;

  return (
    <div className="intake-page">
      <div className="intake-wrap">
        <div className="step-label">Step {step + 1} of {steps.length} — {steps[step]}</div>
        <h1 className="intake-h1">{["Let's Get to Know You","Your Financial Picture","Your Debts","Your Goals & Vision","Review & Build Your Plan"][step]}</h1>
        <p className="intake-sub">{["Your information is private and only used to build your personalized plan.","Be honest — this creates the most accurate and helpful plan for you.","List each debt individually — this powers your snowball payoff strategy.","Select all that apply — your plan will be built around these goals.","Here's what we found. Let's build your plan."][step]}</p>
        <div className="progress-bar"><div className="progress-fill" style={{ width:`${((step+1)/steps.length)*100}%` }} /></div>

        <div className="card card-p">

          {/* ── STEP 1: PERSONAL INFO ── */}
          {step === 0 && <>
            {sectionHd("👤 About you")}
            <div className="form-row" style={{ marginBottom:8 }}>
              <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
            </div>
            <div className="form-group"><label className="form-label">Phone <span>optional — for weekly check-in reminders</span></label><input className="form-input" type="tel" placeholder="(555) 000-0000" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
            {divider}
            {sectionHd("🏠 Your household")}
            <div className="form-row">
              <div className="form-group"><label className="form-label">Household type</label>
                <select className="form-select" value={household} onChange={e=>setHousehold(e.target.value)}>
                  <option value="single">Single — just me</option>
                  <option value="married">Married / partnered, no kids</option>
                  <option value="married_kids">Married / partnered with kids</option>
                  <option value="single_parent">Single parent</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group"><label className="form-label">Dependents</label>
                <select className="form-select" value={dependents} onChange={e=>setDependents(e.target.value)}>
                  <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option>
                </select>
              </div>
            </div>
            {divider}
            {sectionHd("📅 Timeline")}
            <div className="form-group"><select className="form-select" value={timeline} onChange={e=>setTimeline(e.target.value)}>
              <option value="6 months">6 months — Quick wins and momentum</option>
              <option value="1-2 years">1–2 years — Steady, meaningful progress</option>
              <option value="3-5 years">3–5 years — Deep transformation</option>
              <option value="5+ years">5+ years — Generational wealth & legacy</option>
            </select></div>
            {divider}
            {sectionHd("💭 Money personality")}
            <div style={{ fontSize:"0.75rem", color:"#7A8BA8", marginBottom:10 }}>Be honest — this shapes how your AI Coach speaks to you</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:"1.25rem" }}>
              {[{id:"anxious",icon:"😟",label:"Anxious",desc:"Money stresses me out"},{id:"spender",icon:"💸",label:"Spender",desc:"I enjoy spending, struggle to save"},{id:"saver",icon:"🐿️",label:"Saver",desc:"I save but could give/invest more"},{id:"confused",icon:"🤷",label:"Confused",desc:"I don't know where money goes"},{id:"motivated",icon:"🔥",label:"Motivated",desc:"Ready to make big changes"},{id:"rebuilding",icon:"🌱",label:"Rebuilding",desc:"Starting fresh after setbacks"}].map(p=>(
                <div key={p.id} onClick={()=>setMoneyPersonality(p.id)} style={{ padding:"10px", borderRadius:10, border:moneyPersonality===p.id?"2px solid #C9A84C":"1.5px solid #E2EAF2", background:moneyPersonality===p.id?"#FDF7E8":"white", cursor:"pointer" }}>
                  <div style={{ fontSize:"1.3rem", marginBottom:3 }}>{p.icon}</div>
                  <div style={{ fontSize:"0.8rem", fontWeight:700, color:"#0D1F3C" }}>{p.label}</div>
                  <div style={{ fontSize:"0.7rem", color:"#7A8BA8", lineHeight:1.4, marginTop:2 }}>{p.desc}</div>
                </div>
              ))}
            </div>
            {divider}
            {sectionHd("✝️ Faith & giving context")}
            <div style={{ fontSize:"0.75rem", color:"#7A8BA8", marginBottom:10 }}>Helps your coach give relevant stewardship guidance</div>
            {[{id:"active",label:"Active church member & tither"},{id:"tithing_start",label:"Want to start tithing"},{id:"faith_guided",label:"Faith guides me but I don't tithe yet"},{id:"exploring",label:"Exploring faith-based finances"},{id:"secular",label:"Not religious — just want a good plan"}].map(f=>(
              <div key={f.id} onClick={()=>setFaithLevel(f.id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8, border:faithLevel===f.id?"2px solid #C9A84C":"1.5px solid #E2EAF2", background:faithLevel===f.id?"#FDF7E8":"white", cursor:"pointer", marginBottom:6 }}>
                <div style={{ width:16, height:16, borderRadius:"50%", border:faithLevel===f.id?"none":"2px solid #E2EAF2", background:faithLevel===f.id?"#C9A84C":"white", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"white" }}>{faithLevel===f.id?"✓":""}</div>
                <span style={{ fontSize:"0.85rem", color:"#0D1F3C", fontWeight:faithLevel===f.id?700:400 }}>{f.label}</span>
              </div>
            ))}
          </>}

          {/* ── STEP 2: FINANCES ── */}
          {step === 1 && <>
            {sectionHd("💰 Income sources")}
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr auto", gap:6, marginBottom:6 }}>
              <input style={inputSt} placeholder="Source (e.g. Salary, Freelance, Rental)" value={newIncSrc} onChange={e=>setNewIncSrc(e.target.value)} />
              <input style={inputSt} type="number" placeholder="Amount" value={newIncAmt} onChange={e=>setNewIncAmt(e.target.value)} />
              <select style={selSt} value={newIncFreq} onChange={e=>setNewIncFreq(e.target.value)}>
                <option value="weekly">Weekly</option><option value="biweekly">Bi-weekly</option><option value="monthly">Monthly</option><option value="annual">Annual</option>
              </select>
              <select style={selSt} value={newIncCat} onChange={e=>setNewIncCat(e.target.value)}>
                <option>Primary job</option><option>Side business</option><option>Freelance</option><option>Rental income</option><option>Investment</option><option>Benefits / Support</option><option>Other</option>
              </select>
              <button className="btn btn-navy" style={{ padding:"0 14px", height:40, fontSize:"0.82rem" }} onClick={addIncome}>+ Add</button>
            </div>
            {incomeStreams.length === 0 && <div style={{ padding:"10px 12px", background:"#FAFAF6", borderRadius:8, fontSize:"0.82rem", color:"#7A8BA8", marginBottom:8 }}>Add each income source above</div>}
            {incomeStreams.map(r=>(
              <div key={r.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:"#EBF6F1", borderRadius:8, marginBottom:4, fontSize:"0.82rem" }}>
                <span style={{ flex:1, fontWeight:600 }}>{r.src}</span>
                <span style={{ color:"#7A8BA8" }}>{r.freq!=="monthly"?`$${parseFloat(r.amt).toLocaleString()} ${r.freq} →`:""}</span>
                <span style={{ fontWeight:700, color:"#1B4D3C" }}>${r.monthly.toLocaleString()}/mo</span>
                <button onClick={()=>removeIncome(r.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#7A8BA8" }}>🗑</button>
              </div>
            ))}
            {totalInc > 0 && <div style={{ textAlign:"right", fontSize:"0.85rem", fontWeight:700, color:"#1B4D3C", marginBottom:8 }}>Total: ${totalInc.toLocaleString()}/mo</div>}
            {divider}
            {sectionHd("💸 Monthly expenses by category")}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
              {expCats.map(c=>(
                <div key={c.key}>
                  <label style={{ display:"block", fontSize:"0.72rem", fontWeight:700, color:"#7A8BA8", marginBottom:3 }}>{c.label} — {c.hint}</label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#7A8BA8", fontSize:"0.85rem", pointerEvents:"none" }}>$</span>
                    <input style={{ ...inputSt, paddingLeft:22 }} type="number" placeholder="0" value={expCatVals[c.key]} onChange={e=>setExpCatVals(p=>({ ...p, [c.key]:e.target.value }))} />
                  </div>
                  {parseFloat(expCatVals[c.key])>0 && totalInc>0 && <div style={{ height:4, background:"#E2EAF2", borderRadius:100, marginTop:3, overflow:"hidden" }}><div style={{ height:"100%", background:c.color, width:`${Math.min(100,parseFloat(expCatVals[c.key])/totalInc*100).toFixed(0)}%` }}/></div>}
                </div>
              ))}
            </div>
            {totalExp > 0 && <div style={{ textAlign:"right", fontSize:"0.85rem", fontWeight:700, color:"#B53232", marginBottom:8 }}>Total: ${totalExp.toLocaleString()}/mo</div>}
            {divider}
            {sectionHd("🏦 Assets")}
            <div style={{ fontSize:"0.75rem", color:"#7A8BA8", marginBottom:8 }}>Approximate values are fine</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:8 }}>
              {[["checking","Checking / Savings"],["retirement","Retirement (401k/IRA)"],["car","Vehicle value"],["home","Home equity"],["other","Other assets"]].map(([k,l])=>(
                <div key={k}>
                  <label style={{ display:"block", fontSize:"0.72rem", fontWeight:700, color:"#7A8BA8", marginBottom:3 }}>{l}</label>
                  <div style={{ position:"relative" }}><span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#7A8BA8", fontSize:"0.85rem", pointerEvents:"none" }}>$</span><input style={{ ...inputSt, paddingLeft:22 }} type="number" placeholder="0" value={assets[k]} onChange={e=>setAssets(p=>({...p,[k]:e.target.value}))} /></div>
                </div>
              ))}
            </div>
            {totalAssets > 0 && <div style={{ textAlign:"right", fontSize:"0.85rem", fontWeight:700, color:"#8B6914", marginBottom:8 }}>Total assets: ${totalAssets.toLocaleString()}</div>}
            {divider}
            <div className="form-group"><label className="form-label">💵 Current liquid savings <span>cash you can access today</span></label><div className="curr"><input className="form-input" type="number" placeholder="0.00" value={savings} onChange={e=>setSavings(e.target.value)} /></div></div>
            {totalInc > 0 && totalExp > 0 && (
              <div style={{ padding:"1rem", background:"linear-gradient(135deg,#0D1F3C,#162E56)", borderRadius:12, color:"white", marginTop:8 }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:10 }}>
                  {[["Income",totalInc,"#86EFAC"],["Expenses",totalExp,"#FCA5A5"],["Surplus",liveSurplus,liveSurplus>=0?"#86EFAC":"#FCA5A5"]].map(([l,v,c])=>(
                    <div key={l}><div style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", marginBottom:2 }}>{l}</div><div style={{ fontFamily:"Lora,Georgia,serif", fontSize:"1.1rem", fontWeight:700, color:c }}>{v<0?"-":""}${Math.abs(v).toLocaleString()}</div></div>
                  ))}
                </div>
                <div style={{ display:"flex", height:8, borderRadius:100, overflow:"hidden", gap:1 }}>
                  {expCats.filter(c=>parseFloat(expCatVals[c.key])>0).map(c=><div key={c.key} style={{ height:"100%", background:c.color, flex:parseFloat(expCatVals[c.key]) }}/>)}
                  {liveSurplus>0&&<div style={{ height:"100%", background:"rgba(134,239,172,0.3)", flex:liveSurplus }}/>}
                </div>
              </div>
            )}
          </>}

          {/* ── STEP 3: DEBTS ── */}
          {step === 2 && <>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr auto", gap:8, marginBottom:8 }}>
              <input className="form-input" placeholder="Debt name (e.g. Chase Visa, Car Loan)" value={debtName} onChange={e=>setDebtName(e.target.value)} />
              <div className="curr"><input className="form-input" type="number" placeholder="Balance" value={debtBal} onChange={e=>setDebtBal(e.target.value)} /></div>
              <input className="form-input" type="number" placeholder="Interest %" value={debtRate} onChange={e=>setDebtRate(e.target.value)} />
              <div className="curr"><input className="form-input" type="number" placeholder="Min. payment" value={debtPayment} onChange={e=>setDebtPayment(e.target.value)} /></div>
              <button className="btn btn-navy" style={{ padding:"0 14px", height:42 }} onClick={addDebt}>+ Add</button>
            </div>
            <div style={{ fontSize:"0.75rem", color:"#7A8BA8", marginBottom:"1rem" }}>Include all debts: credit cards, car loans, student loans, medical bills, personal loans, etc.</div>
            {debts.length === 0 && <div style={{ textAlign:"center", padding:"1.5rem", background:"#FAFAF6", borderRadius:10, color:"#7A8BA8", fontSize:"0.85rem" }}>No debts added — click Continue if you have no debt 🎉</div>}
            {debts.length > 0 && <>
              <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#7A8BA8", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Sorted smallest → largest (snowball method)</div>
              {[...debts].sort((a,b)=>parseFloat(a.bal)-parseFloat(b.bal)).map((d,i)=>(
                <div key={d.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"#FAFAF6", borderRadius:8, marginBottom:6, fontSize:"0.85rem" }}>
                  <span style={{ background:"#0D1F3C", color:"white", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.72rem", fontWeight:700, flexShrink:0 }}>{i+1}</span>
                  <span style={{ flex:1, fontWeight:600 }}>{d.name}</span>
                  <span style={{ color:"#B53232", fontWeight:700 }}>${parseFloat(d.bal).toLocaleString()}</span>
                  <span style={{ color:"#7A8BA8" }}>{d.rate?`${d.rate}%`:"—"} APR</span>
                  <span style={{ color:"#7A8BA8" }}>${d.payment||"—"}/mo</span>
                  <button onClick={()=>removeDebt(d.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#7A8BA8" }}>🗑</button>
                </div>
              ))}
              <div style={{ padding:"10px 12px", background:"#EBF0F8", borderRadius:8, fontSize:"0.82rem", color:"#162E56" }}>
                💡 Total: <strong>${Math.round(totalDebt).toLocaleString()}</strong> across {debts.length} account{debts.length!==1?"s":""}
              </div>
            </>}
          </>}

          {/* ── STEP 4: GOALS ── */}
          {step === 3 && <>
            <div style={{ fontSize:"0.82rem", color:"#7A8BA8", marginBottom:"1rem" }}>Select all that apply — your dashboard will be built around these.</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:"1.25rem" }}>
              {GOAL_OPTIONS.map(g=>{
                const sel = selectedGoals.includes(g.id);
                return (
                  <div key={g.id} onClick={()=>toggleGoal(g.id)} style={{ padding:"12px 14px", borderRadius:10, border:sel?"2px solid #C9A84C":"1.5px solid #E2EAF2", background:sel?"#FDF7E8":"white", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <div style={{ width:20, height:20, borderRadius:5, border:sel?"none":"2px solid #E2EAF2", background:sel?"#C9A84C":"white", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"white", fontWeight:700, marginTop:2 }}>{sel?"✓":""}</div>
                      <div>
                        <div style={{ fontSize:"0.85rem", fontWeight:700, color:"#0D1F3C", marginBottom:2 }}>{g.icon} {g.label}</div>
                        <div style={{ fontSize:"0.73rem", color:"#7A8BA8" }}>{g.desc}</div>
                        {sel&&<div style={{ fontSize:"0.68rem", color:"#8B6914", marginTop:3, fontWeight:600 }}>→ {g.connects}</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="form-group">
              <label className="form-label">Biggest financial stress <span>optional</span></label>
              <textarea className="form-textarea" style={{ minHeight:60 }} placeholder="What keeps you up at night financially?" value={stress} onChange={e=>setStress(e.target.value)} />
            </div>
            {selectedGoals.length > 0 && <div style={{ padding:"10px 14px", background:"#EBF6F1", border:"1px solid #A8D4BC", borderRadius:8, fontSize:"0.82rem", color:"#1B4D3C" }}>✓ {selectedGoals.length} goal{selectedGoals.length!==1?"s":""} selected</div>}
          </>}

          {/* ── STEP 5: REVIEW ── */}
          {step === 4 && <>
            {/* Health Score */}
            <div style={{ display:"flex", alignItems:"center", gap:"1.25rem", padding:"1.25rem", background:"linear-gradient(135deg,#0D1F3C,#162E56)", borderRadius:12, marginBottom:"1rem", color:"white" }}>
              <div style={{ textAlign:"center", flexShrink:0, minWidth:70 }}>
                <div style={{ fontFamily:"Lora,Georgia,serif", fontSize:"2.8rem", fontWeight:700, color:scoreColor, lineHeight:1 }}>{score}</div>
                <div style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.4)", textTransform:"uppercase" }}>/ 100</div>
                <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#E8C97A", marginTop:3 }}>{scoreLabel}</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"0.7rem", fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Financial health score</div>
                <div style={{ width:"100%", height:7, background:"rgba(255,255,255,0.1)", borderRadius:100, overflow:"hidden", marginBottom:8 }}>
                  <div style={{ height:"100%", width:`${score}%`, background:"linear-gradient(90deg,#C9A84C,#E8C97A)", borderRadius:100 }}/>
                </div>
                <div style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.68)", lineHeight:1.5 }}>{score >= 75?"Solid position — now optimize and grow.":score>=55?"Good foundation with clear room to grow.":score>=40?"Consistency will transform your situation quickly.":"Every journey starts somewhere. Your plan gives you a clear path."}</div>
              </div>
            </div>

            {/* Top Priorities */}
            {top3.length > 0 && (
              <div className="card card-p" style={{ marginBottom:"1rem" }}>
                <div style={{ fontFamily:"Lora,Georgia,serif", fontSize:"0.95rem", fontWeight:700, color:"#0D1F3C", marginBottom:12 }}>⚡ Your top {top3.length} priorities</div>
                {top3.map((p,i)=>(
                  <div key={i} style={{ padding:"12px", borderRadius:10, border:`1.5px solid ${p.color}33`, background:p.bg, marginBottom:i<top3.length-1?10:0 }}>
                    <div style={{ display:"flex", gap:10, marginBottom:8 }}>
                      <div style={{ width:22, height:22, borderRadius:"50%", background:p.color, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", fontWeight:700, flexShrink:0, marginTop:2 }}>{i+1}</div>
                      <div>
                        <div style={{ fontSize:"0.85rem", fontWeight:700, color:"#0D1F3C", marginBottom:2 }}>{p.icon} {p.title}</div>
                        <div style={{ fontSize:"0.78rem", fontWeight:700, color:p.color }}>{p.dollar}</div>
                      </div>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, paddingLeft:32 }}>
                      <div style={{ padding:"8px", background:"white", borderRadius:8, border:"1px solid #E2EAF2" }}>
                        <div style={{ fontSize:"0.65rem", fontWeight:700, color:"#1B4D3C", textTransform:"uppercase", marginBottom:2 }}>✅ 7-day action</div>
                        <div style={{ fontSize:"0.75rem", color:"#3E506B", lineHeight:1.5 }}>{p.action}</div>
                      </div>
                      <div style={{ padding:"8px", background:"white", borderRadius:8, border:"1px solid #E2EAF2" }}>
                        <div style={{ fontSize:"0.65rem", fontWeight:700, color:"#B53232", textTransform:"uppercase", marginBottom:2 }}>⏰ Cost of delay</div>
                        <div style={{ fontSize:"0.75rem", color:"#3E506B", lineHeight:1.5 }}>{p.delay}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projections */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"1rem" }}>
              <div className="card card-p">
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#7A8BA8", textTransform:"uppercase", marginBottom:6 }}>🎯 Debt-free target</div>
                {dfDate?<><div style={{ fontFamily:"Lora,Georgia,serif", fontSize:"1.2rem", fontWeight:700, color:"#1B4D3C" }}>{dfDate}</div><div style={{ fontSize:"0.72rem", color:"#7A8BA8", marginTop:4 }}>{dfMonths} months · ${totalToDebt.toLocaleString()}/mo to debt</div></>:<div style={{ fontSize:"0.82rem", color:"#7A8BA8" }}>Add debts in Step 3</div>}
              </div>
              <div className="card card-p">
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#7A8BA8", textTransform:"uppercase", marginBottom:6 }}>🛡️ Emergency fund by</div>
                {efDate&&totalInc>0?<><div style={{ fontFamily:"Lora,Georgia,serif", fontSize:"1.2rem", fontWeight:700, color:"#8B6914" }}>{efDate}</div><div style={{ fontSize:"0.72rem", color:"#7A8BA8", marginTop:4 }}>{efMonths} months · ${efMo.toLocaleString()}/mo · Goal: ${efTarget.toLocaleString()}</div></>:<div style={{ fontSize:"0.82rem", color:"#7A8BA8" }}>Add income in Step 2</div>}
              </div>
            </div>

            {/* Summary */}
            <div className="card card-p" style={{ marginBottom:"1rem" }}>
              <div style={{ fontFamily:"Lora,Georgia,serif", fontSize:"0.92rem", fontWeight:700, color:"#0D1F3C", marginBottom:8 }}>📋 Your summary</div>
              {[["Name",name],["Monthly income",totalInc>0?`$${totalInc.toLocaleString()}`:""],[" Monthly expenses",totalExp>0?`$${totalExp.toLocaleString()}`:""],[" Surplus / deficit",surp>=0?`+$${surp.toLocaleString()}`:`-$${Math.abs(surp).toLocaleString()}`],["Total debt",totalDebt>0?`$${Math.round(totalDebt).toLocaleString()} · ${debts.length} accounts`:"None 🎉"],["Savings",`$${sav.toLocaleString()}`],["Timeline",timeline],["Goals",`${selectedGoals.length} selected`]].filter(([,v])=>v).map(([l,v])=>(
                <div key={l} className="review-row"><span className="review-label">{l}</span><span className="review-val">{v}</span></div>
              ))}
            </div>

            {/* Encouragement */}
            <div style={{ padding:"1.1rem", background:"#FDF7E8", border:"1px solid #E5D08A", borderRadius:10 }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#8B6914", marginBottom:5 }}>🕊️ A word for your journey</div>
              <div style={{ fontFamily:"Lora,Georgia,serif", fontSize:"0.88rem", fontStyle:"italic", color:"#7A5C10", lineHeight:1.72 }}>{encouragement}</div>
              <div style={{ fontSize:"0.72rem", color:"#C9A84C", fontWeight:700, marginTop:7 }}>"Commit to the Lord whatever you do, and he will establish your plans." — Proverbs 16:3</div>
            </div>
          </>}

          <div className="intake-nav">
            {step > 0 ? <button className="btn btn-outline" onClick={()=>setStep(s=>s-1)}>← Back</button> : <div />}
            {step < 4
              ? <button className="btn btn-navy" onClick={()=>setStep(s=>s+1)}>Continue →</button>
              : <button className="btn btn-gold btn-lg" onClick={submit}>✨ Build My Kingdom Plan</button>
            }
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
            { icon: "💰", label: "Monthly Income", val: `$${plan.income.toLocaleString()}`, note: plan.incomeStreams?.length > 1 ? `${plan.incomeStreams.length} income sources` : "Take-home pay", cls: "" },
            { icon: "💳", label: "Total Debt", val: `$${plan.debt.toLocaleString()}`, note: `${plan.debts.length} accounts`, cls: "neg" },
            { icon: "📈", label: "Total Savings", val: `$${plan.savings.toLocaleString()}`, note: "Across all goals", cls: "pos" },
            { icon: "✨", label: "Monthly Surplus", val: `$${Math.max(0, plan.surplus).toLocaleString()}`, note: "Available to allocate", cls: plan.surplus >= 0 ? "pos" : "neg" },
            ...(plan.totalAssets > 0 ? [{ icon: "🏦", label: "Net Worth", val: `$${(plan.totalAssets - plan.debt).toLocaleString()}`, note: `$${plan.totalAssets.toLocaleString()} assets`, cls: (plan.totalAssets - plan.debt) >= 0 ? "pos" : "neg" }] : []),
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
      const reply = await askCoach(apiMsgs, plan?.user);
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

// end

import { useState, useRef, useEffect } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  navy:"#0A1C38",navyMid:"#132D57",navyLight:"#1C3F75",
  gold:"#C8A84B",goldL:"#E6C96F",goldPale:"#FDF6E3",goldBorder:"#E4CF88",
  forest:"#1A4A38",forestL:"#236B52",sage:"#D0E8DC",sageMid:"#A8D4BC",
  cream:"#F9F9F5",white:"#FFF",
  txt:"#0A1C38",txtM:"#3B4F6A",txtL:"#7688A5",border:"#E0E9F2",
  red:"#B03030",redBg:"#FFF2F2",
  green:"#1A4A38",greenBg:"#EBF6F0",
  amber:"#B57A10",amberBg:"#FDF4DF",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@300;400;500;600;700&display=swap');`;

const CSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;background:${C.cream};color:${C.txt};line-height:1.65;-webkit-font-smoothing:antialiased}
:root{--s:'DM Serif Display',Georgia,serif;--b:'Nunito',sans-serif}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:300;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(10,28,56,0.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(200,168,75,0.15)}
.nav-brand{display:flex;align-items:center;gap:9px;cursor:pointer}
.nav-mark{width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,${C.gold},${C.goldL});display:flex;align-items:center;justify-content:center;font-size:16px}
.nav-title{font-family:var(--s);font-size:1rem;color:white}
.nav-title em{color:${C.goldL};font-style:normal}
.nav-phase{font-size:0.68rem;font-weight:700;padding:3px 10px;border-radius:100px;background:rgba(200,168,75,0.15);color:${C.goldL};border:1px solid rgba(200,168,75,0.28);letter-spacing:0.1em;text-transform:uppercase}
.nav-tabs{display:flex;gap:3px}
.ntab{padding:7px 15px;border-radius:6px;font-size:0.8rem;font-weight:600;color:rgba(255,255,255,0.5);cursor:pointer;transition:all .15s;border:none;background:none;font-family:var(--b)}
.ntab:hover{color:white;background:rgba(255,255,255,0.07)}
.ntab.on{color:${C.goldL};background:rgba(200,168,75,0.12)}
.nav-r{display:flex;gap:8px;align-items:center}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 22px;border-radius:8px;font-family:var(--b);font-size:0.855rem;font-weight:700;cursor:pointer;transition:all .18s;border:none;letter-spacing:.01em}
.btn-gold{background:linear-gradient(135deg,${C.gold},${C.goldL});color:${C.navy};box-shadow:0 3px 12px rgba(200,168,75,.3)}
.btn-gold:hover{transform:translateY(-1px);box-shadow:0 5px 18px rgba(200,168,75,.4)}
.btn-navy{background:${C.navy};color:white;box-shadow:0 3px 10px rgba(10,28,56,.2)}
.btn-navy:hover{background:${C.navyMid};transform:translateY(-1px)}
.btn-outline{background:transparent;color:${C.txt};border:1.5px solid ${C.border}}
.btn-outline:hover{border-color:${C.gold};color:${C.gold}}
.btn-ghost{background:rgba(255,255,255,.1);color:white;border:1px solid rgba(255,255,255,.2)}
.btn-ghost:hover{background:rgba(255,255,255,.18)}
.btn-green{background:${C.forest};color:white}
.btn-green:hover{background:${C.forestL};transform:translateY(-1px)}
.btn-sm{padding:7px 16px;font-size:.78rem}
.btn-lg{padding:14px 36px;font-size:.93rem}
.btn-bl{width:100%}
.btn:disabled{opacity:.45;cursor:not-allowed;transform:none!important}

/* CARDS */
.card{background:white;border-radius:14px;border:1px solid ${C.border};box-shadow:0 2px 10px rgba(10,28,56,.05)}
.cp{padding:1.75rem}.cp-sm{padding:1.25rem}
.c-navy{background:${C.navy};border-color:${C.navyMid};color:white}
.c-gold{background:linear-gradient(135deg,${C.gold},${C.goldL});border:none;color:${C.navy}}
.c-pale{background:${C.goldPale};border-color:${C.goldBorder}}
.c-sage{background:${C.sage};border-color:${C.sageMid}}
.c-green{background:${C.greenBg};border-color:${C.sageMid}}
.chover{transition:transform .18s,box-shadow .18s}
.chover:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(10,28,56,.1)}

/* FORMS */
.fg{margin-bottom:1rem}
.fl{display:block;font-size:.8rem;font-weight:700;color:${C.txt};margin-bottom:.38rem}
.fl span{color:${C.txtL};font-weight:400;font-size:.72rem;margin-left:3px}
.fi{width:100%;padding:10px 13px;border:1.5px solid ${C.border};border-radius:8px;font-family:var(--b);font-size:.88rem;color:${C.txt};outline:none;background:white;transition:border-color .18s,box-shadow .18s}
.fi:focus{border-color:${C.gold};box-shadow:0 0 0 3px rgba(200,168,75,.12)}
.fsel{width:100%;padding:10px 13px;border:1.5px solid ${C.border};border-radius:8px;font-family:var(--b);font-size:.88rem;color:${C.txt};outline:none;background:white;cursor:pointer}
.fsel:focus{border-color:${C.gold};box-shadow:0 0 0 3px rgba(200,168,75,.12)}
.fta{width:100%;padding:10px 13px;border:1.5px solid ${C.border};border-radius:8px;font-family:var(--b);font-size:.88rem;color:${C.txt};outline:none;resize:vertical;min-height:80px;line-height:1.6}
.fta:focus{border-color:${C.gold};box-shadow:0 0 0 3px rgba(200,168,75,.12)}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}
.curr{position:relative}
.curr::before{content:'$';position:absolute;left:12px;top:50%;transform:translateY(-50%);color:${C.txtL};font-size:.88rem;pointer-events:none;z-index:1}
.curr .fi{padding-left:24px}

/* LAYOUT */
.dash-layout{display:flex;min-height:100vh;padding-top:64px}
.sidebar{width:250px;flex-shrink:0;background:${C.navy};position:fixed;top:64px;bottom:0;left:0;overflow-y:auto;z-index:100;padding:1.4rem 0}
.sb-av{margin:0 1rem 1.4rem;display:flex;align-items:center;gap:9px;padding:.9rem;background:rgba(255,255,255,.06);border-radius:10px;border:1px solid rgba(255,255,255,.09)}
.sb-av-c{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${C.gold},${C.goldL});display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;color:${C.navy};flex-shrink:0}
.sb-av-n{font-size:.85rem;font-weight:700;color:white;line-height:1.2}
.sb-av-r{font-size:.68rem;color:rgba(255,255,255,.38)}
.sb-sec{font-size:.66rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.28);padding:0 1.25rem;margin:1.3rem 0 .4rem}
.sb-it{display:flex;align-items:center;gap:9px;padding:9px 1.25rem;cursor:pointer;font-size:.845rem;font-weight:600;color:rgba(255,255,255,.55);transition:all .15s;border-left:3px solid transparent;margin-bottom:1px}
.sb-it:hover{background:rgba(255,255,255,.07);color:white}
.sb-it.on{background:rgba(200,168,75,.12);color:${C.goldL};border-left-color:${C.gold}}
.sb-badge{font-size:.62rem;font-weight:700;padding:1px 7px;border-radius:100px;background:rgba(200,168,75,.2);color:${C.goldL};margin-left:auto}
.sb-new{font-size:.62rem;font-weight:700;padding:1px 7px;border-radius:100px;background:rgba(26,74,56,.5);color:#7ED9A8;margin-left:auto}

.dash-main{margin-left:250px;flex:1;padding:2.25rem}
.dm-head{margin-bottom:1.75rem}
.dm-greet{font-family:var(--s);font-size:1.8rem;color:${C.txt}}
.dm-sub{font-size:.84rem;color:${C.txtL};margin-top:.2rem}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:1.5rem}
.stat-c{padding:1.3rem}
.s-icon{font-size:1.3rem;margin-bottom:.55rem}
.s-lbl{font-size:.68rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:${C.txtL};margin-bottom:.35rem}
.s-val{font-family:var(--s);font-size:1.75rem;color:${C.txt};line-height:1}
.s-val.pos{color:${C.forest}}
.s-val.neg{color:${C.red}}
.s-note{font-size:.72rem;color:${C.txtL};margin-top:.3rem}

/* GRIDS */
.g2{display:grid;grid-template-columns:1.35fr 1fr;gap:1.25rem;margin-bottom:1.25rem}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.25rem}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.25rem}
.gcol{display:flex;flex-direction:column;gap:1.25rem}
.ch{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem}
.ct{font-family:var(--s);font-size:1.05rem;color:${C.txt}}
.cs{font-size:.72rem;color:${C.txtL};margin-top:2px}

/* PROGRESS */
.pbar{height:7px;background:${C.border};border-radius:100px;overflow:hidden}
.pbar-fill{height:100%;border-radius:100px;transition:width .5s ease}
.pbar-gold{background:linear-gradient(90deg,${C.gold},${C.goldL})}
.pbar-navy{background:linear-gradient(90deg,${C.navy},${C.navyL})}
.pbar-green{background:linear-gradient(90deg,${C.forest},${C.forestL})}
.pbar-sm{height:5px}
.pbar-lg{height:10px}

/* BUDGET ROWS */
.brow{display:flex;align-items:center;gap:9px;margin-bottom:.82rem}
.bdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.blbl{flex:1;font-size:.82rem;font-weight:600;color:${C.txt}}
.bbg{flex:1.1;height:7px;background:${C.border};border-radius:100px;overflow:hidden}
.bfill{height:100%;border-radius:100px}
.bamt{font-size:.8rem;font-weight:700;color:${C.txtM};width:68px;text-align:right}

/* DEBT */
.ditem{background:${C.cream};border-radius:10px;padding:1.1rem;margin-bottom:.7rem}
.dname{font-size:.86rem;font-weight:700;color:${C.txt};margin-bottom:.3rem}
.dmeta{display:flex;justify-content:space-between;font-size:.76rem;color:${C.txtL};margin-bottom:.45rem}
.dpri{display:inline-flex;align-items:center;gap:4px;padding:1px 8px;border-radius:100px;font-size:.65rem;font-weight:700;background:rgba(10,28,56,.08);color:${C.txt};margin-bottom:.35rem}

/* ACTIONS */
.arow{display:flex;align-items:flex-start;gap:10px;padding:.95rem 0;border-bottom:1px solid ${C.border}}
.arow:last-child{border-bottom:none}
.acb{width:21px;height:21px;border-radius:6px;border:2px solid ${C.border};display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all .15s;margin-top:1px;font-size:10px}
.acb.done{background:${C.forest};border-color:${C.forest};color:white}
.atxt{font-size:.855rem;color:${C.txt};line-height:1.52}
.atxt.done{text-decoration:line-through;color:${C.txtL}}
.atag{display:inline-block;padding:2px 8px;border-radius:100px;font-size:.65rem;font-weight:700;margin-top:3px;letter-spacing:.06em;text-transform:uppercase}
.tag-b{background:rgba(26,74,56,.1);color:${C.forest}}
.tag-d{background:rgba(10,28,56,.08);color:${C.txt}}
.tag-s{background:rgba(200,168,75,.15);color:#8B6914}
.tag-f{background:rgba(200,168,75,.2);color:#7A5C10}
.tag-p{background:rgba(92,124,200,.12);color:#3050A0}

/* SCRIPTURE */
.scr{background:linear-gradient(135deg,${C.navy},${C.navyMid});padding:1.85rem;border-radius:14px;color:white;position:relative;overflow:hidden}
.scr::before{content:'"';position:absolute;right:1rem;top:-1rem;font-family:var(--s);font-size:9rem;color:rgba(200,168,75,.08);line-height:1;pointer-events:none}
.scr-eye{font-size:.68rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:${C.goldL};margin-bottom:.7rem;position:relative}
.scr-txt{font-family:var(--s);font-size:1.05rem;font-style:italic;line-height:1.7;color:rgba(255,255,255,.9);margin-bottom:.85rem;position:relative}
.scr-ref{font-size:.73rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.goldL}}

/* SAVINGS */
.sitem{padding:1.25rem;margin-bottom:.75rem}
.sav-h{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.55rem}
.sav-n{font-size:.88rem;font-weight:700;color:${C.txt};display:flex;align-items:center;gap:7px}
.sav-p{font-size:.82rem;font-weight:700;color:${C.gold}}
.sav-a{display:flex;justify-content:space-between;font-size:.73rem;color:${C.txtL};margin-bottom:.4rem}

/* JOURNAL */
.journal-entry{border-radius:12px;padding:1.25rem;margin-bottom:.85rem;border-left:3px solid ${C.gold};background:white;border:1px solid ${C.border};border-left:3px solid ${C.gold}}
.je-date{font-size:.7rem;font-weight:700;color:${C.txtL};letter-spacing:.08em;text-transform:uppercase;margin-bottom:.4rem}
.je-mood{display:flex;align-items:center;gap:6px;font-size:.78rem;font-weight:600;margin-bottom:.5rem}
.je-body{font-size:.86rem;color:${C.txtM};line-height:1.72}
.je-insight{margin-top:.75rem;padding:.7rem;background:${C.goldPale};border-radius:8px;font-size:.78rem;color:#7A5C10;line-height:1.65;border-left:2px solid ${C.gold}}

/* SPENDING */
.spend-cat{display:flex;align-items:center;gap:10px;padding:.85rem 0;border-bottom:1px solid ${C.border}}
.spend-cat:last-child{border-bottom:none}
.spend-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.spend-lbl{flex:1;font-size:.86rem;font-weight:600;color:${C.txt}}
.spend-meta{font-size:.73rem;color:${C.txtL}}
.spend-amt{font-size:.9rem;font-weight:700;text-align:right}
.spend-bar{flex:.8;height:6px;background:${C.border};border-radius:100px;overflow:hidden}
.spend-fill{height:100%;border-radius:100px}
.leak-badge{font-size:.65rem;font-weight:700;padding:2px 7px;border-radius:100px;background:#FEE2E2;color:${C.red};margin-left:auto}

/* GOALS */
.goal-card{padding:1.5rem;margin-bottom:.85rem}
.goal-h{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.7rem}
.goal-title{font-family:var(--s);font-size:1rem;color:${C.txt}}
.goal-status{font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:100px}
.gs-on{background:${C.greenBg};color:${C.forest}}
.gs-at{background:${C.amberBg};color:${C.amber}}
.gs-bh{background:${C.redBg};color:${C.red}}
.goal-meta{display:flex;gap:1.5rem;margin-bottom:.75rem}
.goal-m-item{font-size:.78rem;color:${C.txtL}}
.goal-m-val{font-weight:700;color:${C.txt};display:block;font-size:.9rem}
.milestone-row{display:flex;align-items:center;gap:8px;padding:.5rem 0;font-size:.8rem;color:${C.txtM}}
.ms-dot{width:14px;height:14px;border-radius:50%;border:2px solid ${C.border};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:8px}
.ms-dot.done{background:${C.forest};border-color:${C.forest};color:white}
.ms-dot.cur{border-color:${C.gold};background:${C.goldPale}}

/* PARTNER */
.partner-card{padding:1.5rem}
.partner-av{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;background:linear-gradient(135deg,${C.navyMid},${C.navyLight});margin-bottom:.9rem}
.partner-name{font-weight:700;font-size:.95rem;color:${C.txt};margin-bottom:.15rem}
.partner-role{font-size:.73rem;color:${C.txtL};margin-bottom:.85rem}
.partner-stat{display:flex;gap:1.25rem;margin-bottom:1rem}
.ps-item{font-size:.75rem;color:${C.txtL}}
.ps-val{font-weight:700;color:${C.txt};font-size:.9rem;display:block}
.msg-preview{background:${C.cream};border-radius:8px;padding:.75rem;font-size:.8rem;color:${C.txtM};line-height:1.6;border-left:2px solid ${C.gold};font-style:italic;margin-bottom:.85rem}

/* FAMILY */
.member-card{padding:1.25rem;text-align:center}
.mem-av{width:44px;height:44px;border-radius:50%;margin:0 auto .7rem;display:flex;align-items:center;justify-content:center;font-size:20px;background:linear-gradient(135deg,${C.navy},${C.navyLight})}
.mem-name{font-weight:700;font-size:.88rem;color:${C.txt};margin-bottom:.15rem}
.mem-role{font-size:.7rem;color:${C.txtL};margin-bottom:.75rem}
.mem-stat{font-size:.75rem;color:${C.txtL}}
.mem-val{font-weight:700;font-size:.92rem;display:block;color:${C.txt}}
.family-goal{padding:1.25rem;display:flex;align-items:center;gap:1rem}
.fg-icon{font-size:1.75rem;flex-shrink:0}
.fg-info{flex:1}
.fg-title{font-weight:700;font-size:.9rem;color:${C.txt};margin-bottom:.3rem}
.fg-meta{font-size:.75rem;color:${C.txtL}}

/* CHURCH */
.workshop-card{padding:1.5rem}
.ws-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem}
.ws-title{font-family:var(--s);font-size:1.05rem;color:${C.txt};margin-bottom:.4rem}
.ws-meta{font-size:.76rem;color:${C.txtL};margin-bottom:.75rem;display:flex;gap:1rem;flex-wrap:wrap}
.ws-meta span{display:flex;align-items:center;gap:4px}
.ws-desc{font-size:.82rem;color:${C.txtM};line-height:1.72;margin-bottom:1rem}
.ws-enrolled{display:flex;align-items:center;gap:-4px}
.ws-av-sm{width:24px;height:24px;border-radius:50%;border:2px solid white;margin-left:-6px;background:linear-gradient(135deg,${C.navy},${C.navyL});display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white}
.ws-av-sm:first-child{margin-left:0}
.ws-count{font-size:.75rem;color:${C.txtL};margin-left:8px}

/* AI COACH */
.chat-box{display:flex;flex-direction:column;gap:.8rem;max-height:420px;min-height:280px;overflow-y:auto;padding-right:.25rem;margin-bottom:1rem}
.chat-box::-webkit-scrollbar{width:3px}
.chat-box::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
.cmsg{display:flex;gap:8px;align-items:flex-start}
.cmsg.u{flex-direction:row-reverse}
.cav{width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px}
.cav.ai{background:linear-gradient(135deg,${C.gold},${C.goldL})}
.cav.u{background:${C.navy};color:white;font-size:.7rem;font-weight:700}
.cbub{max-width:80%;padding:.8rem 1rem;border-radius:12px;font-size:.845rem;line-height:1.65}
.cbub.ai{background:white;border:1px solid ${C.border};color:${C.txt};border-radius:3px 12px 12px 12px;box-shadow:0 2px 6px rgba(10,28,56,.05)}
.cbub.u{background:${C.navy};color:white;border-radius:12px 3px 12px 12px}
.ctime{font-size:.6rem;color:${C.txtL};margin-top:3px}
.tydot{width:6px;height:6px;border-radius:50%;background:${C.txtL};animation:bounce 1.2s infinite}
.tydot:nth-child(2){animation-delay:.2s}
.tydot:nth-child(3){animation-delay:.4s}
@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
.hint-btn{padding:4px 11px;border-radius:100px;font-size:.7rem;font-weight:600;background:${C.cream};border:1px solid ${C.border};color:${C.txtM};cursor:pointer;font-family:var(--b);white-space:nowrap;transition:all .15s}
.hint-btn:hover{border-color:${C.gold};color:${C.gold};background:${C.goldPale}}

/* MODAL */
.modal-ov{position:fixed;inset:0;background:rgba(10,28,56,.65);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:1rem}
.modal{background:white;border-radius:18px;padding:2.1rem;width:100%;max-width:420px;position:relative;box-shadow:0 20px 60px rgba(10,28,56,.25)}
.modal-x{position:absolute;top:.9rem;right:.9rem;background:none;border:none;font-size:1.1rem;cursor:pointer;color:${C.txtL};padding:4px 8px;border-radius:6px}
.modal-x:hover{background:${C.cream}}
.mh2{font-family:var(--s);font-size:1.5rem;color:${C.txt};margin-bottom:.2rem}
.msub{font-size:.82rem;color:${C.txtL};margin-bottom:1.6rem}
.mswitch{text-align:center;margin-top:.9rem;font-size:.8rem;color:${C.txtL}}
.mswitch button{background:none;border:none;color:${C.gold};font-weight:700;cursor:pointer;font-size:.8rem;font-family:var(--b)}
.alert{padding:9px 13px;border-radius:7px;font-size:.8rem;margin-bottom:.9rem;border:1px solid}
.alert-err{background:${C.redBg};border-color:#FED7D7;color:${C.red}}

/* TAGS/BADGES */
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;font-size:.67rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase}
.b-gold{background:rgba(200,168,75,.15);color:#8B6914;border:1px solid rgba(200,168,75,.25)}
.b-navy{background:rgba(10,28,56,.08);color:${C.txt}}
.b-green{background:${C.greenBg};color:${C.forest};border:1px solid ${C.sageMid}}
.b-new{background:#E8F5EE;color:#1A6B40;border:1px solid #A8D4BC}
.b-amber{background:${C.amberBg};color:${C.amber};border:1px solid #E8C97A}

/* MISC */
.div{height:1px;background:${C.border};margin:1.1rem 0}
.pill-live{display:flex;align-items:center;gap:5px;font-size:.7rem;color:rgba(255,255,255,.5)}
.pill-live-dot{width:5px;height:5px;border-radius:50%;background:#22C55E;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* HERO */
.hero{min-height:100vh;padding-top:64px;background:linear-gradient(155deg,${C.navy} 0%,${C.navyMid} 48%,${C.forest} 100%);display:flex;align-items:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 60% at 72% 48%,rgba(200,168,75,.1) 0%,transparent 65%),radial-gradient(ellipse 35% 50% at 10% 85%,rgba(26,74,56,.45) 0%,transparent 55%)}
.hero-in{max-width:1150px;margin:0 auto;padding:4rem 2rem;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;position:relative;z-index:1}
.hero-pill{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:100px;background:rgba(200,168,75,.12);border:1px solid rgba(200,168,75,.28);color:${C.goldL};font-size:.69rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:1.35rem}
.h1{font-family:var(--s);font-size:3.2rem;line-height:1.1;color:white;margin-bottom:1.15rem}
.h1 .g{color:${C.goldL};font-style:italic}
.hero-lead{font-size:1rem;color:rgba(255,255,255,.7);line-height:1.82;margin-bottom:2.4rem;max-width:450px}
.hero-ctas{display:flex;gap:.8rem;flex-wrap:wrap;margin-bottom:2.75rem}
.hero-trust{display:flex;gap:1.6rem;flex-wrap:wrap}
.trust-i{display:flex;align-items:center;gap:6px;font-size:.75rem;color:rgba(255,255,255,.5)}
.trust-d{width:5px;height:5px;border-radius:50%;background:${C.gold};flex-shrink:0}
.hero-vc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:18px;padding:1.5rem;backdrop-filter:blur(18px)}
.hvc-row{display:flex;justify-content:space-between;align-items:center;padding:.6rem 0;border-bottom:1px solid rgba(255,255,255,.07)}
.hvc-row:last-of-type{border-bottom:none}
.hvc-l{font-size:.8rem;color:rgba(255,255,255,.58)}
.hvc-v{font-size:.88rem;font-weight:700}
.float-chip{position:absolute;background:white;border-radius:10px;padding:.75rem 1rem;box-shadow:0 6px 22px rgba(0,0,0,.18);display:flex;align-items:center;gap:8px;white-space:nowrap}
.fc1{top:-15px;right:-10px}
.fc2{bottom:-15px;left:-10px}
.fc-ic{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.fc-l{font-size:.68rem;color:${C.txtL}}
.fc-v{font-size:.86rem;font-weight:700;color:${C.txt}}

/* SECTION */
.sec{padding:5rem 2rem}
.si{max-width:1150px;margin:0 auto}
.sh{text-align:center;margin-bottom:3.5rem}
.se{font-size:.69rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${C.gold};margin-bottom:.55rem}
.sh2{font-family:var(--s);font-size:2.25rem;color:${C.txt};line-height:1.2;margin-bottom:.85rem}
.sh2 em{font-style:italic;color:${C.gold}}
.ssub{font-size:.96rem;color:${C.txtM};max-width:500px;margin:0 auto;line-height:1.88}

/* INTAKE */
.intake{min-height:100vh;padding:100px 1.5rem 4rem;background:linear-gradient(180deg,${C.cream} 0%,white 100%)}
.intake-w{max-width:720px;margin:0 auto}
.prog-bar{height:4px;background:${C.border};border-radius:100px;margin-bottom:2.1rem;overflow:hidden}
.prog-fill{height:100%;background:linear-gradient(90deg,${C.gold},${C.goldL});border-radius:100px;transition:width .4s ease}
.step-lbl{font-size:.75rem;color:${C.txtL};margin-bottom:.35rem;font-weight:600}
.inh1{font-family:var(--s);font-size:1.75rem;color:${C.txt};margin-bottom:.25rem}
.insub{font-size:.88rem;color:${C.txtM};margin-bottom:1.85rem;line-height:1.68}
.surplus-ok{padding:.85rem 1rem;border-radius:8px;background:${C.greenBg};border:1px solid ${C.sageMid};color:${C.forest};font-size:.82rem;font-weight:600;margin-top:.65rem}
.surplus-no{padding:.85rem 1rem;border-radius:8px;background:${C.redBg};border:1px solid #FED7D7;color:${C.red};font-size:.82rem;font-weight:600;margin-top:.65rem}
.rev-row{display:flex;justify-content:space-between;padding:.7rem 1rem;background:${C.cream};border-radius:7px;margin-bottom:.45rem}
.rv-l{font-size:.82rem;color:${C.txtL}}
.rv-v{font-size:.82rem;font-weight:700;color:${C.txt}}
.in-nav{display:flex;justify-content:space-between;margin-top:1.6rem;align-items:center}

/* LOADING */
.loading{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4rem;padding:2rem;text-align:center;background:linear-gradient(160deg,${C.navy},${C.forest})}
.spinner{width:48px;height:48px;border:3px solid rgba(255,255,255,.15);border-top-color:${C.gold};border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.load-h{font-family:var(--s);font-size:1.4rem;color:white}
.load-s{font-size:.84rem;color:rgba(255,255,255,.5)}

/* FOOTER */
.footer{background:${C.navy};padding:2.25rem;text-align:center;border-top:1px solid rgba(200,168,75,.1)}
.foot-b{font-family:var(--s);font-size:.95rem;color:white;margin-bottom:.3rem}
.foot-c{font-size:.7rem;color:rgba(255,255,255,.26)}

/* PHASE 2 FEATURES STRIP */
.p2strip{background:linear-gradient(135deg,${C.forest},#1E6348);padding:1.25rem 2rem}
.p2strip-in{max-width:1150px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.85rem}
.p2-feats{display:flex;gap:1.5rem;flex-wrap:wrap}
.p2-feat{display:flex;align-items:center;gap:7px;font-size:.78rem;color:rgba(255,255,255,.8);font-weight:600}
.p2-feat-dot{width:5px;height:5px;border-radius:50%;background:${C.goldL};flex-shrink:0}

/* RESPONSIVE */
@media(max-width:920px){
  .hero-in{grid-template-columns:1fr;gap:2.5rem}
  .hero-vc{display:none}
  .stats{grid-template-columns:1fr 1fr 1fr}
  .g2,.g3,.g4{grid-template-columns:1fr}
  .sidebar{display:none}
  .dash-main{margin-left:0}
  .frow{grid-template-columns:1fr}
  .ntab{display:none}
}
@media(max-width:600px){
  .h1{font-size:2.3rem}
  .sec{padding:3.5rem 1.25rem}
  .nav{padding:0 1rem}
  .dash-main{padding:1.4rem}
  .stats{grid-template-columns:1fr 1fr}
}

/* ANIMATIONS */
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.a1{animation:fadeUp .55s ease both .07s}
.a2{animation:fadeUp .55s ease both .18s}
.a3{animation:fadeUp .55s ease both .3s}
.a4{animation:fadeUp .55s ease both .42s}
.a5{animation:fadeUp .55s ease both .55s}
`;

// ─── AI COACH ────────────────────────────────────────────────────────────────
const SYS = `You are the Kingdom Wealth Builders AI Coach — a warm, expert, faith-centered financial stewardship coach. Phase 2 upgrade.

Your personality: encouraging, never shame-based, blend biblical wisdom with practical expertise, teach one concept at a time, celebrate every win.

Phase 2 capabilities:
1. Budget generation (10-10-80 Kingdom method or 50/30/20)
2. Debt reduction (snowball method)  
3. Savings goal planning
4. Financial literacy lessons
5. Weekly check-ins & accountability
6. Stewardship devotionals & scripture
7. AI financial journaling — analyze journal entries for patterns and insights
8. Spending analysis — identify leaks, waste, and optimization opportunities
9. Goal tracking coaching — milestone guidance and encouragement
10. Accountability partner support — check in on commitments
11. Family budgeting — guide household financial decisions together
12. Church/community workshop preparation

Format with **bold** for key points, short bullets when listing, always warm and faith-centered. End with a scripture or uplifting word when relevant.`;

async function askCoach(msgs) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:SYS, messages:msgs.map(m=>({role:m.role,content:m.content})) })
  });
  if(!r.ok) throw new Error("api");
  const d = await r.json();
  return d.content?.[0]?.text || "I'm here — tell me more!";
}

// ─── PLAN BUILDER ────────────────────────────────────────────────────────────
function mkPlan(f) {
  const inc=parseFloat(f.income)||4500, exp=parseFloat(f.expenses)||3200;
  const debt=parseFloat(f.debt)||9500, sav=parseFloat(f.savings)||800;
  const surplus=inc-exp;
  return {
    user:{name:f.name,email:f.email,goals:f.goals,stress:f.stress,members:f.members||[]},
    income:inc,expenses:exp,debt,savings:sav,surplus,
    budget:[
      {cat:"Housing & Utilities",pct:30,color:"#0A1C38"},
      {cat:"Food & Groceries",pct:12,color:"#1A4A38"},
      {cat:"Transportation",pct:10,color:"#C8A84B"},
      {cat:"Debt Payments",pct:15,color:"#B03030"},
      {cat:"Savings & Giving",pct:13,color:"#236B52"},
      {cat:"Personal & Other",pct:20,color:"#7688A5"},
    ].map(b=>({...b,amount:Math.round(inc*b.pct/100)})),
    debts:[
      {name:"Credit Card",bal:Math.round(debt*.44),rate:"21.9%",payment:Math.round(debt*.034),paidPct:16,priority:1},
      {name:"Personal Loan",bal:Math.round(debt*.36),rate:"12.5%",payment:Math.round(debt*.027),paidPct:29,priority:2},
      {name:"Medical Bill",bal:Math.round(debt*.20),rate:"0%",payment:Math.round(debt*.014),paidPct:50,priority:3},
    ],
    savingsGoals:[
      {name:"Emergency Fund",target:Math.round(inc*3),current:sav,icon:"🛡️"},
      {name:"Tithe & Giving Fund",target:Math.round(inc*.1*12),current:Math.round(sav*.14),icon:"💛"},
      {name:"Home Down Payment",target:20000,current:Math.round(sav*.08),icon:"🏠"},
    ],
    actions:[
      {text:"Track every expense this week — log it same day",tag:"b"},
      {text:`Make an extra $${Math.max(50,Math.round(surplus*.28))} toward Credit Card debt`,tag:"d"},
      {text:"Set up auto-transfer $50 → Emergency Fund this Friday",tag:"s"},
      {text:"Write a 5-minute journal entry: how do you feel about money today?",tag:"f"},
      {text:"Check in with your accountability partner — share one win this week",tag:"p"},
    ],
    scripture:{text:"Commit to the Lord whatever you do, and he will establish your plans.",ref:"Proverbs 16:3"},
    encouragement:`${f.name}, you are stepping into something life-changing. Your surplus is your seed — every dollar you direct with intention is an act of faith. You are not defined by your past financial decisions. Starting today, your legacy is being written.`,
    spending:[
      {cat:"Dining Out",icon:"🍽️",budget:Math.round(inc*.06),actual:Math.round(inc*.09),color:"#B03030",leak:true},
      {cat:"Subscriptions",icon:"📱",budget:Math.round(inc*.02),actual:Math.round(inc*.035),color:"#C8A84B",leak:true},
      {cat:"Groceries",icon:"🛒",budget:Math.round(inc*.07),actual:Math.round(inc*.065),color:"#1A4A38",leak:false},
      {cat:"Transportation",icon:"🚗",budget:Math.round(inc*.1),actual:Math.round(inc*.09),color:"#1A4A38",leak:false},
      {cat:"Entertainment",icon:"🎬",budget:Math.round(inc*.04),actual:Math.round(inc*.06),color:"#B03030",leak:true},
      {cat:"Shopping",icon:"🛍️",budget:Math.round(inc*.05),actual:Math.round(inc*.048),color:"#1A4A38",leak:false},
    ],
    goals:[
      {title:"Debt Free by Dec 2026",status:"on",target:"Dec 2026",monthly:Math.round(debt/18),pct:22,milestones:[{label:"Credit Card paid off",done:false,cur:true},{label:"Personal Loan paid off",done:false},{label:"Fully debt-free",done:false}]},
      {title:"3-Month Emergency Fund",status:"at",target:"Sep 2026",monthly:200,pct:27,milestones:[{label:"$500 starter fund",done:true},{label:"$1,500 milestone",done:false,cur:true},{label:"Full 3 months",done:false}]},
      {title:"10% Monthly Giving",status:"bh",target:"Ongoing",monthly:Math.round(inc*.1),pct:60,milestones:[{label:"First tithe",done:true},{label:"Consistent 2 months",done:true},{label:"Reach 10%",done:false,cur:true}]},
    ],
    partner:{name:"Marcus J.",role:"Accountability Partner",streak:4,sharedGoal:"Debt Freedom",lastMsg:"Bro, I made an extra payment this week! God is faithful 🙌"},
    journal:[
      {date:"May 5, 2026",mood:"😤",moodLabel:"Stressed",body:"Felt overwhelmed looking at the credit card statement. But I remembered this is temporary. I made the minimum payment and put $80 extra toward the principal.",insight:"💡 Recognizing stress without surrendering to it is wisdom. You took action anyway — that's faith in motion."},
      {date:"Apr 28, 2026",mood:"😊",moodLabel:"Hopeful",body:"Tracked every expense this week for the first time ever. Found out I'm spending $180/month on subscriptions I forgot about. Cancelled 4 of them.",insight:"💡 Awareness is the first step. You just found $180/month — that's $2,160 per year to redirect toward freedom."},
    ],
    workshop:{title:"Money & Marriage: Building Together",date:"June 14, 2026",registered:24,capacity:40,topic:"family"},
  };
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const DEVOTIONALS=[
  {day:"Day 1",title:"Money as a Tool, Not a Master",body:"God never intended money to be your source of anxiety. Your budget is a roadmap for purpose, not a cage.",verse:'"For where your treasure is, there your heart will be also." — Matthew 6:21'},
  {day:"Day 2",title:"Discipline of Delayed Gratification",body:"Proverbs teaches that the ant gathers in summer. Financial discipline isn't deprivation — it's wisdom.",verse:'"The plans of the diligent lead to profit." — Proverbs 21:5'},
  {day:"Day 3",title:"Generosity as a Wealth Strategy",body:"Generous people tend to build more wealth. When we loosen our grip, God entrusts us with more.",verse:'"Give, and it will be given to you." — Luke 6:38'},
];
const LESSONS=[
  {badge:"Lesson 1",title:"The Debt Snowball Method",body:"List debts smallest to largest. Minimum payments on all. Attack the smallest with everything extra. Roll payments forward.",tip:"💡 Momentum beats math. Small wins build unstoppable motivation."},
  {badge:"Lesson 2",title:"The 10-10-80 Kingdom Principle",body:"Give 10%, Save 10%, Live on 80%. Biblical framework that transforms your relationship with money.",tip:"💡 Start at 5-5-90 if needed. Grow your percentages as God blesses your faithfulness."},
  {badge:"Lesson 3",title:"Emergency Fund: Your Peace Shield",body:"Save $1,000 first. Then build to 3 months of expenses. This converts a crisis into a mere inconvenience.",tip:"💡 An emergency fund is peace of mind in a bank account. It protects your debt payoff plan."},
  {badge:"Lesson 4",title:"The True Cost of Subscriptions",body:"Most people underestimate recurring costs by 40%. Audit every subscription monthly — cut what you don't use weekly.",tip:"💡 Spending analysis is a superpower. Knowing exactly where every dollar goes puts you in control."},
];
const WORKSHOPS=[
  {title:"Debt Freedom Blueprint",date:"May 24, 2026",registered:18,capacity:30,topic:"debt",icon:"💳",badge:"Debt",bc:"b-navy"},
  {title:"Kingdom Family Budget",date:"June 7, 2026",registered:31,capacity:40,topic:"family",icon:"🏠",badge:"Family",bc:"b-green"},
  {title:"Money & Marriage",date:"June 14, 2026",registered:24,capacity:40,topic:"family",icon:"💑",badge:"Couples",bc:"b-gold"},
  {title:"Stewardship 101",date:"June 28, 2026",registered:42,capacity:50,topic:"faith",icon:"⛪",badge:"Faith",bc:"b-amber"},
];

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("landing");
  const [user,setUser]=useState(null);
  const [auth,setAuth]=useState(null);
  const [plan,setPlan]=useState(null);
  const [tab,setTab]=useState("overview");
  const [checked,setChecked]=useState([]);
  const [ciChecked,setCiChecked]=useState([]);

  const login=u=>{setUser(u);setAuth(null)};
  const logout=()=>{setUser(null);setPage("landing");setPlan(null)};
  const go=()=>user?setPage("intake"):setAuth("signup");

  const navItems=[
    {id:"landing",label:"Home"},{id:"intake",label:"My Finances"},{id:"dashboard",label:"Dashboard"},
  ];

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-brand" onClick={()=>setPage("landing")}>
          <div className="nav-mark">👑</div>
          <span className="nav-title">Kingdom <em>Wealth</em> Builders</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div className="nav-tabs">
            {navItems.map(n=>(
              <button key={n.id} className={`ntab ${page===n.id?"on":""}`} onClick={()=>n.id==="intake"?go():setPage(n.id)}>{n.label}</button>
            ))}
          </div>
          <span className="nav-phase">Phase 2</span>
        </div>
        <div className="nav-r">
          {user?(
            <>
              <span style={{fontSize:".8rem",color:"rgba(255,255,255,.5)"}}>Hi, {user.name.split(" ")[0]} 👑</span>
              <button className="btn btn-ghost btn-sm" onClick={logout}>Sign Out</button>
            </>
          ):(
            <>
              <button className="btn btn-ghost btn-sm" onClick={()=>setAuth("login")}>Sign In</button>
              <button className="btn btn-gold btn-sm" onClick={()=>setAuth("signup")}>Join Free</button>
            </>
          )}
        </div>
      </nav>

      {auth&&<AuthModal mode={auth} onClose={()=>setAuth(null)} onAuth={login} switch={m=>setAuth(m)}/>}
      {page==="landing"&&<Landing onStart={go}/>}
      {page==="intake"&&<Intake user={user} onDone={p=>{setPlan(p);setPage("dashboard");setTab("overview")}}/>}
      {page==="dashboard"&&plan&&(
        <Dashboard plan={plan} user={user} tab={tab} setTab={setTab}
          checked={checked} setChecked={setChecked}
          ci={ciChecked} setCi={setCiChecked}
          onLogout={logout} onRedo={()=>setPage("intake")}/>
      )}
    </>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthModal({mode,onClose,onAuth,switch:sw}) {
  const [f,setF]=useState({name:"",email:"",password:""});
  const [err,setErr]=useState("");
  const isLogin=mode==="login";
  const sub=()=>{
    if(!f.email||!f.password||(!isLogin&&!f.name)){setErr("Fill in all fields.");return}
    onAuth({name:f.name||f.email.split("@")[0],email:f.email});
  };
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div style={{textAlign:"center",marginBottom:"1.4rem"}}>
          <div style={{fontSize:"2rem",marginBottom:".4rem"}}>👑</div>
          <div className="mh2">{isLogin?"Welcome Back":"Begin Your Journey"}</div>
          <p className="msub">{isLogin?"Sign in to Kingdom Wealth Builders":"Join and receive your free financial plan"}</p>
        </div>
        {err&&<div className="alert alert-err">{err}</div>}
        {!isLogin&&<div className="fg"><label className="fl">Full Name</label><input className="fi" placeholder="Your full name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></div>}
        <div className="fg"><label className="fl">Email</label><input className="fi" type="email" placeholder="you@email.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></div>
        <div className="fg"><label className="fl">Password</label><input className="fi" type="password" placeholder="••••••••" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/></div>
        <button className="btn btn-navy btn-bl" style={{marginTop:".4rem"}} onClick={sub}>{isLogin?"Sign In":"Create Free Account"}</button>
        <div className="mswitch">{isLogin?<>No account? <button onClick={()=>sw("signup")}>Sign up →</button></>:<>Have account? <button onClick={()=>sw("login")}>Sign in</button></>}</div>
      </div>
    </div>
  );
}

// ─── LANDING ─────────────────────────────────────────────────────────────────
function Landing({onStart}) {
  const p1=[
    {icon:"📊",title:"Budget Generator",desc:"AI-powered Kingdom budget with the 10-10-80 principle — give, save, and live with intention."},
    {icon:"💳",title:"Debt Payoff Planner",desc:"Step-by-step snowball strategy with encouragement and accountability to see it through."},
    {icon:"💰",title:"Savings Tracker",desc:"Goal-based savings with emergency fund, giving fund, and vision milestones."},
    {icon:"📖",title:"Stewardship Devotionals",desc:"Daily faith + finance devotionals connecting biblical wisdom to real financial decisions."},
    {icon:"✅",title:"Weekly AI Check-ins",desc:"Your coach checks in every week with encouragement and a fresh action step."},
    {icon:"🎓",title:"Financial Literacy",desc:"One concept at a time — budgeting, debt, interest — in plain language with practical application."},
  ];
  const p2=[
    {icon:"📓",title:"AI Financial Journal",desc:"Log your money mindset and receive AI insights about your spending patterns and emotional relationship with money."},
    {icon:"🔍",title:"Spending Analysis",desc:"Find and eliminate financial leaks — subscription creep, dining overage, impulse patterns — with data-backed coaching."},
    {icon:"🎯",title:"Goal Tracking",desc:"Visual milestone tracking with status indicators, monthly contribution guidance, and progress celebrations."},
    {icon:"🤝",title:"Accountability Partner",desc:"Pair with a trusted friend or community member to share wins, check in weekly, and stay the course together."},
    {icon:"🏠",title:"Family Budgeting",desc:"Household financial planning for couples and families — shared goals, individual roles, unified vision."},
    {icon:"⛪",title:"Church Workshops",desc:"Group financial ministry — live workshops, community cohorts, and church licensing for your congregation."},
  ];
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-in">
          <div>
            <div className="hero-pill a1"><span style={{width:5,height:5,borderRadius:"50%",background:C.gold,display:"inline-block"}}/>Phase 2 · Faith-Based Financial Coaching</div>
            <h1 className="h1 a2">Build <span className="g">Kingdom</span><br/>Wealth With<br/>Community & Purpose.</h1>
            <p className="hero-lead a3">Phase 2 adds AI journaling, spending analysis, goal tracking, accountability partners, family budgeting, and church workshops — built on Phase 1's powerful foundation.</p>
            <div className="hero-ctas a4">
              <button className="btn btn-gold btn-lg" onClick={onStart}>Create My Free Plan →</button>
              <button className="btn btn-ghost" onClick={()=>document.getElementById("p2feats")?.scrollIntoView({behavior:"smooth"})}>See Phase 2 Features</button>
            </div>
            <div className="hero-trust a5">
              {["Phase 1 + Phase 2","AI Journal","Accountability Partners","Family Budgeting","Church Workshops"].map(t=>(
                <span key={t} className="trust-i"><span className="trust-d"/>{t}</span>
              ))}
            </div>
          </div>
          <div style={{position:"relative"}} className="a3">
            <div className="hero-vc">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.1rem"}}>
                <span style={{fontFamily:"var(--s)",fontSize:".92rem",color:"white"}}>Phase 2 Dashboard</span>
                <div className="pill-live"><div className="pill-live-dot"/>Live</div>
              </div>
              {[["Budget on Track","✅ 5/6 categories","#86EFAC"],["Spending Leaks Found","3 identified","#FCA5A5"],["Goal Progress","22% debt free","#E8C97A"],["Accountability","Marcus checked in","#86EFAC"],["Journal Streak","7 days 🔥","#E8C97A"],["Workshop Seats","24/40 registered","#93C5FD"]].map(([l,v,c])=>(
                <div key={l} className="hvc-row">
                  <span className="hvc-l">{l}</span>
                  <span className="hvc-v" style={{color:c}}>{v}</span>
                </div>
              ))}
            </div>
            <div className="float-chip fc1">
              <div className="fc-ic" style={{background:"rgba(26,74,56,.1)"}}>🎯</div>
              <div><div className="fc-l">Goal Milestone</div><div className="fc-v">$500 saved! 🎉</div></div>
            </div>
            <div className="float-chip fc2">
              <div className="fc-ic" style={{background:"rgba(200,168,75,.1)"}}>🤝</div>
              <div><div className="fc-l">Partner Check-in</div><div className="fc-v">Marcus sent a win</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 2 STRIP */}
      <div className="p2strip">
        <div className="p2strip-in">
          <span style={{fontFamily:"var(--s)",fontSize:".9rem",color:"white",flexShrink:0}}>🆕 Phase 2 New Features</span>
          <div className="p2-feats">
            {["AI Financial Journal","Spending Analysis","Goal Tracking","Accountability Partner","Family Budgeting","Church Workshops"].map(f=>(
              <span key={f} className="p2-feat"><span className="p2-feat-dot"/>{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* PHASE 1 FEATURES */}
      <section className="sec" style={{background:"white"}}>
        <div className="si">
          <div className="sh">
            <div className="se">Phase 1 Foundation</div>
            <h2 className="sh2">The core six features<br/><em>still powering your journey.</em></h2>
            <p className="ssub">Everything from Phase 1 — now enhanced with Phase 2's community and analytics layer.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem"}}>
            {p1.map(f=>(
              <div key={f.title} className="card cp chover">
                <div style={{width:50,height:50,borderRadius:12,background:"linear-gradient(135deg,rgba(200,168,75,.12),rgba(200,168,75,.04))",border:"1px solid rgba(200,168,75,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:"1.1rem"}}>{f.icon}</div>
                <div style={{fontFamily:"var(--s)",fontSize:"1.05rem",color:C.txt,marginBottom:".45rem"}}>{f.title}</div>
                <p style={{fontSize:".845rem",color:C.txtM,lineHeight:1.76}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE 2 FEATURES */}
      <section className="sec" style={{background:C.cream}} id="p2feats">
        <div className="si">
          <div className="sh">
            <div className="se">Phase 2 Additions</div>
            <h2 className="sh2">Deeper community.<br/><em>Smarter insights.</em></h2>
            <p className="ssub">Six powerful upgrades that add community, analytics, and accountability to your financial journey.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem"}}>
            {p2.map(f=>(
              <div key={f.title} className="card cp chover" style={{borderTop:`3px solid ${C.gold}`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
                  <span style={{fontSize:22}}>{f.icon}</span>
                  <span className="badge b-new">New</span>
                </div>
                <div style={{fontFamily:"var(--s)",fontSize:"1.05rem",color:C.txt,marginBottom:".45rem"}}>{f.title}</div>
                <p style={{fontSize:".845rem",color:C.txtM,lineHeight:1.76}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="sec" style={{background:C.navy}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <div className="se" style={{color:C.goldL}}>Our Foundation</div>
          <p style={{fontFamily:"var(--s)",fontSize:"1.45rem",fontStyle:"italic",color:"rgba(255,255,255,.9)",lineHeight:1.72,margin:"1rem 0 .8rem"}}>"Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up."</p>
          <div style={{fontSize:".76rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.goldL,marginBottom:"2rem"}}>Ecclesiastes 4:9-10</div>
          <div style={{width:50,height:2,background:C.gold,margin:"0 auto 2rem"}}/>
          <p style={{fontSize:".98rem",color:"rgba(255,255,255,.65)",lineHeight:1.9}}>Phase 2 is built on this truth: financial transformation is more powerful in community. When you add an accountability partner, a family budget, and a church community — your chances of achieving lasting financial freedom multiply dramatically. Kingdom Wealth Builders is your community infrastructure for financial wholeness.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:`linear-gradient(135deg,${C.navy},${C.forest})`,padding:"5rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(200,168,75,.1) 0%,transparent 65%)"}}/>
        <div style={{maxWidth:600,margin:"0 auto",position:"relative"}}>
          <div style={{fontSize:"2rem",marginBottom:".9rem"}}>👑</div>
          <h2 style={{fontFamily:"var(--s)",fontSize:"2.5rem",color:"white",marginBottom:".9rem",lineHeight:1.2}}>Your Kingdom financial<br/>community starts today.</h2>
          <p style={{fontSize:".98rem",color:"rgba(255,255,255,.65)",marginBottom:"2.25rem",lineHeight:1.85}}>Complete your intake in 5 minutes. Get your personalized plan, spending analysis, goal tracker, accountability partner matching, and church workshop access — all rooted in faith.</p>
          <button className="btn btn-gold btn-lg" onClick={onStart}>Create My Free Plan →</button>
        </div>
      </section>

      <footer className="footer">
        <div className="foot-b">Kingdom Wealth Builders</div>
        <div className="foot-c">© 2026 · Phase 2 MVP · Faith-centered financial transformation</div>
      </footer>
    </>
  );
}

// ─── INTAKE ───────────────────────────────────────────────────────────────────
function Intake({user,onDone}) {
  const [step,setStep]=useState(0);
  const [loading,setLoading]=useState(false);
  const [f,setF]=useState({name:user?.name||"",email:user?.email||"",income:"",expenses:"",debt:"",savings:"",goals:"",stress:"",timeline:"1-2 years",members:[]});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const surplus=parseFloat(f.income||0)-parseFloat(f.expenses||0);
  const STEPS=["Personal Info","Your Finances","Goals & Vision","Family Setup","Review"];
  const [newMember,setNewMember]=useState({name:"",role:"Spouse"});

  const submit=()=>{setLoading(true);setTimeout(()=>onDone(mkPlan(f)),1900)};

  if(loading) return (
    <div className="loading">
      <div className="spinner"/>
      <div className="load-h">Building Your Phase 2 Kingdom Plan…</div>
      <div className="load-s">Budget · Debt · Savings · Journal · Spending Analysis · Goals · Accountability</div>
    </div>
  );

  return (
    <div className="intake">
      <div className="intake-w">
        <div className="step-lbl">Step {step+1} of {STEPS.length} — {STEPS[step]}</div>
        <h1 className="inh1">{["Let's Get to Know You","Your Financial Picture","Goals & Vision","Family Setup","Review & Build"][step]}</h1>
        <p className="insub">{["Private and secure — only used to build your personalized plan.","Be fully honest — accuracy creates the best plan for you.","Dream big. We'll build a plan that honors God and your calling.","Add family members for household budgeting (optional — skip if individual).","Everything looks great. Let's generate your complete Phase 2 plan."][step]}</p>
        <div className="prog-bar"><div className="prog-fill" style={{width:`${((step+1)/STEPS.length)*100}%`}}/></div>

        <div className="card cp">
          {step===0&&(
            <>
              <div className="frow">
                <div className="fg"><label className="fl">Full Name</label><input className="fi" placeholder="Your full name" value={f.name} onChange={e=>set("name",e.target.value)}/></div>
                <div className="fg"><label className="fl">Email</label><input className="fi" type="email" placeholder="you@email.com" value={f.email} onChange={e=>set("email",e.target.value)}/></div>
              </div>
              <div className="fg">
                <label className="fl">Financial Timeline</label>
                <select className="fsel" value={f.timeline} onChange={e=>set("timeline",e.target.value)}>
                  <option value="6 months">6 months — Quick wins</option>
                  <option value="1-2 years">1–2 years — Steady progress</option>
                  <option value="3-5 years">3–5 years — Deep transformation</option>
                  <option value="5+ years">5+ years — Generational legacy</option>
                </select>
              </div>
            </>
          )}
          {step===1&&(
            <>
              <div className="frow">
                <div className="fg"><label className="fl">Monthly Take-Home Income <span>after taxes</span></label><div className="curr"><input className="fi" type="number" placeholder="0.00" value={f.income} onChange={e=>set("income",e.target.value)}/></div></div>
                <div className="fg"><label className="fl">Monthly Expenses <span>all outflows</span></label><div className="curr"><input className="fi" type="number" placeholder="0.00" value={f.expenses} onChange={e=>set("expenses",e.target.value)}/></div></div>
              </div>
              <div className="frow">
                <div className="fg"><label className="fl">Total Debt <span>all accounts</span></label><div className="curr"><input className="fi" type="number" placeholder="0.00" value={f.debt} onChange={e=>set("debt",e.target.value)}/></div></div>
                <div className="fg"><label className="fl">Current Savings</label><div className="curr"><input className="fi" type="number" placeholder="0.00" value={f.savings} onChange={e=>set("savings",e.target.value)}/></div></div>
              </div>
              {f.income&&f.expenses&&(
                <div className={surplus>=0?"surplus-ok":"surplus-no"}>
                  {surplus>=0?"✓":"⚠"} Monthly {surplus>=0?"Surplus":"Deficit"}: <strong>${Math.abs(surplus).toFixed(0)}</strong>
                  {surplus>=0?" — Great! This is your seed money.":" — We'll build a plan to fix this together."}
                </div>
              )}
            </>
          )}
          {step===2&&(
            <>
              <div className="fg"><label className="fl">Your Financial Goals</label><textarea className="fta" placeholder="Pay off credit cards, build emergency fund, buy a home, give 10%, leave a legacy..." value={f.goals} onChange={e=>set("goals",e.target.value)}/></div>
              <div className="fg"><label className="fl">Biggest Financial Stress <span>be fully honest — no judgment</span></label><textarea className="fta" placeholder="What keeps you up at night? What feels most overwhelming right now?" value={f.stress} onChange={e=>set("stress",e.target.value)}/></div>
            </>
          )}
          {step===3&&(
            <>
              <div style={{marginBottom:"1.25rem"}}>
                <div style={{fontFamily:"var(--s)",fontSize:"1.05rem",color:C.txt,marginBottom:".5rem"}}>Family Members <span style={{fontWeight:400,fontSize:".8rem",color:C.txtL}}>(optional)</span></div>
                <p style={{fontSize:".82rem",color:C.txtM,lineHeight:1.68,marginBottom:"1rem"}}>Add your spouse, children, or any household members. This enables family budgeting, shared goals, and household accountability.</p>
                <div style={{display:"flex",gap:".75rem",marginBottom:"1rem",flexWrap:"wrap"}}>
                  <input className="fi" style={{flex:1,minWidth:140}} placeholder="Member name" value={newMember.name} onChange={e=>setNewMember(p=>({...p,name:e.target.value}))}/>
                  <select className="fsel" style={{flex:.6,minWidth:100}} value={newMember.role} onChange={e=>setNewMember(p=>({...p,role:e.target.value}))}>
                    {["Spouse","Child","Partner","Parent","Other"].map(r=><option key={r}>{r}</option>)}
                  </select>
                  <button className="btn btn-navy btn-sm" onClick={()=>{if(newMember.name.trim()){set("members",[...f.members,{...newMember,id:Date.now()}]);setNewMember({name:"",role:"Spouse"})}}}>+ Add</button>
                </div>
                {f.members.length>0&&(
                  <div style={{display:"flex",flexWrap:"wrap",gap:".6rem"}}>
                    {f.members.map(m=>(
                      <div key={m.id} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 12px",background:C.cream,borderRadius:8,border:`1px solid ${C.border}`,fontSize:".82rem"}}>
                        <span>👤</span><span style={{fontWeight:600}}>{m.name}</span><span style={{color:C.txtL}}>·</span><span style={{color:C.txtL}}>{m.role}</span>
                        <button onClick={()=>set("members",f.members.filter(x=>x.id!==m.id))} style={{background:"none",border:"none",cursor:"pointer",color:C.txtL,fontSize:"1rem",lineHeight:1,padding:"0 2px"}}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {f.members.length===0&&(
                <div style={{padding:"1rem",background:C.goldPale,border:`1px solid ${C.goldBorder}`,borderRadius:9,fontSize:".82rem",color:"#8B6914",lineHeight:1.7}}>
                  💡 You can skip this and use individual budgeting. You can always add family members later from your dashboard.
                </div>
              )}
            </>
          )}
          {step===4&&(
            <>
              {[["Name",f.name],["Email",f.email],["Monthly Income",`$${parseFloat(f.income||0).toLocaleString()}`],["Monthly Expenses",`$${parseFloat(f.expenses||0).toLocaleString()}`],["Total Debt",`$${parseFloat(f.debt||0).toLocaleString()}`],["Current Savings",`$${parseFloat(f.savings||0).toLocaleString()}`],["Timeline",f.timeline],["Family Members",f.members.length>0?f.members.map(m=>m.name).join(", "):"Individual plan"]].filter(([,v])=>v).map(([l,v])=>(
                <div key={l} className="rev-row"><span className="rv-l">{l}</span><span className="rv-v">{v}</span></div>
              ))}
              <div style={{margin:"1.25rem 0",padding:"1.15rem",background:C.goldPale,border:`1px solid ${C.goldBorder}`,borderRadius:9}}>
                <div style={{fontSize:".78rem",color:"#8B6914",fontWeight:700,marginBottom:".3rem"}}>🕊️ A Word Before We Begin</div>
                <div style={{fontFamily:"var(--s)",fontSize:".86rem",fontStyle:"italic",color:"#7A5C10",lineHeight:1.7}}>"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." — Proverbs 3:5-6</div>
              </div>
            </>
          )}

          <div className="in-nav">
            {step>0?<button className="btn btn-outline" onClick={()=>setStep(s=>s-1)}>← Back</button>:<div/>}
            {step<4?<button className="btn btn-navy" onClick={()=>setStep(s=>s+1)}>Continue →</button>:<button className="btn btn-gold btn-lg" onClick={submit}>✨ Build My Phase 2 Plan</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({plan,user,tab,setTab,checked,setChecked,ci,setCi,onLogout,onRedo}) {
  const name=user?.name||plan.user.name||"Friend";
  const p1Tabs=[
    {id:"overview",icon:"🏠",label:"Overview"},
    {id:"budget",icon:"📊",label:"Budget"},
    {id:"debt",icon:"💳",label:"Debt Payoff"},
    {id:"savings",icon:"💰",label:"Savings"},
    {id:"actions",icon:"✅",label:"Actions"},
    {id:"devotional",icon:"📖",label:"Devotionals"},
    {id:"lessons",icon:"🎓",label:"Lessons"},
    {id:"checkin",icon:"🔔",label:"Check-In"},
    {id:"coach",icon:"🤖",label:"AI Coach"},
  ];
  const p2Tabs=[
    {id:"journal",icon:"📓",label:"AI Journal",new:true},
    {id:"spending",icon:"🔍",label:"Spending",new:true},
    {id:"goals",icon:"🎯",label:"Goal Tracking",new:true},
    {id:"partner",icon:"🤝",label:"Partner",new:true},
    {id:"family",icon:"🏠",label:"Family Budget",new:true},
    {id:"workshops",icon:"⛪",label:"Workshops",new:true},
  ];
  const tk=i=>setChecked(c=>c.includes(i)?c.filter(x=>x!==i):[...c,i]);
  const tci=i=>setCi(c=>c.includes(i)?c.filter(x=>x!==i):[...c,i]);

  return (
    <div className="dash-layout">
      <aside className="sidebar">
        <div className="sb-av">
          <div className="sb-av-c">{(name[0]||"K").toUpperCase()}</div>
          <div><div className="sb-av-n">{name}</div><div className="sb-av-r">Kingdom Steward · Phase 2</div></div>
        </div>
        <div className="sb-sec">Phase 1 Core</div>
        {p1Tabs.map(t=>(
          <div key={t.id} className={`sb-it ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
            <span style={{fontSize:14}}>{t.icon}</span><span>{t.label}</span>
          </div>
        ))}
        <div className="sb-sec">Phase 2 New</div>
        {p2Tabs.map(t=>(
          <div key={t.id} className={`sb-it ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
            <span style={{fontSize:14}}>{t.icon}</span><span>{t.label}</span>
            {t.new&&<span className="sb-new">New</span>}
          </div>
        ))}
        <div className="sb-sec">Account</div>
        <div className="sb-it" onClick={onRedo}><span style={{fontSize:14}}>🔄</span><span>Update Finances</span></div>
        <div className="sb-it" onClick={onLogout}><span style={{fontSize:14}}>🚪</span><span>Sign Out</span></div>
      </aside>

      <main className="dash-main">
        <div className="dm-head">
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
            <div>
              <h1 className="dm-greet">Good day, {name.split(" ")[0]}. 👑</h1>
              <p className="dm-sub">{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} · Phase 2 Dashboard</p>
            </div>
            <div style={{display:"flex",gap:7,alignItems:"center"}}>
              <span className="badge b-new">Phase 2 Active</span>
              <div className="pill-live" style={{background:"rgba(10,28,56,.06)",padding:"5px 10px",borderRadius:100}}><div className="pill-live-dot"/>AI Coach Live</div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          {[
            {icon:"💰",lbl:"Monthly Income",val:`$${plan.income.toLocaleString()}`,note:"Take-home pay",cls:""},
            {icon:"💳",lbl:"Total Debt",val:`$${plan.debt.toLocaleString()}`,note:`${plan.debts.length} accounts`,cls:"neg"},
            {icon:"📈",lbl:"Savings",val:`$${plan.savings.toLocaleString()}`,note:"Total saved",cls:"pos"},
            {icon:"✨",lbl:"Surplus",val:`$${Math.max(0,plan.surplus).toLocaleString()}`,note:"To allocate",cls:"pos"},
            {icon:"🎯",lbl:"Goals Active",val:plan.goals.length.toString(),note:"Being tracked",cls:""},
          ].map(s=>(
            <div key={s.lbl} className="card stat-c">
              <div className="s-icon">{s.icon}</div>
              <div className="s-lbl">{s.lbl}</div>
              <div className={`s-val ${s.cls}`}>{s.val}</div>
              <div className="s-note">{s.note}</div>
            </div>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab==="overview"&&(
          <>
            <div className="g2">
              <div className="card cp">
                <div className="ch"><div><div className="ct">Budget Breakdown</div><div className="cs">Your monthly Kingdom budget</div></div><button className="btn btn-sm btn-outline" onClick={()=>setTab("budget")}>Full View →</button></div>
                {plan.budget.slice(0,5).map(b=>(
                  <div key={b.cat} className="brow">
                    <div className="bdot" style={{background:b.color}}/>
                    <div className="blbl">{b.cat}</div>
                    <div className="bbg"><div className="bfill" style={{width:`${b.pct}%`,background:b.color}}/></div>
                    <div className="bamt">${b.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="gcol">
                <div className="scr">
                  <div className="scr-eye">📖 This Week's Scripture</div>
                  <p className="scr-txt">"{plan.scripture.text}"</p>
                  <div className="scr-ref">— {plan.scripture.ref}</div>
                </div>
                <div className="card cp c-pale">
                  <div style={{fontSize:"1.5rem",marginBottom:".65rem"}}>✨</div>
                  <p style={{fontSize:".86rem",color:C.txt,lineHeight:1.78}}>{plan.encouragement.slice(0,170)}…</p>
                  <button className="btn btn-sm btn-outline" style={{marginTop:".85rem"}} onClick={()=>setTab("devotional")}>Read More →</button>
                </div>
              </div>
            </div>
            {/* Phase 2 overview panels */}
            <div className="g3">
              <div className="card cp" style={{borderTop:`3px solid ${C.gold}`}}>
                <div className="ch"><div><div className="ct">Spending Analysis</div><div className="cs">This month's leaks</div></div><span className="badge b-new">New</span></div>
                {plan.spending.filter(s=>s.leak).map(s=>(
                  <div key={s.cat} className="spend-cat">
                    <div className="spend-icon" style={{background:`${s.color}15`}}>{s.icon}</div>
                    <div style={{flex:1}}>
                      <div className="spend-lbl">{s.cat}</div>
                      <div className="spend-meta">Budget ${s.budget} · Actual ${s.actual}</div>
                    </div>
                    <span className="leak-badge">+${s.actual-s.budget} over</span>
                  </div>
                ))}
                <button className="btn btn-sm btn-outline btn-bl" style={{marginTop:".85rem"}} onClick={()=>setTab("spending")}>Full Analysis →</button>
              </div>
              <div className="card cp" style={{borderTop:`3px solid ${C.forest}`}}>
                <div className="ch"><div><div className="ct">Goal Tracking</div><div className="cs">Active milestones</div></div><span className="badge b-new">New</span></div>
                {plan.goals.map(g=>(
                  <div key={g.title} style={{marginBottom:".9rem"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:".35rem"}}>
                      <span style={{fontSize:".82rem",fontWeight:600,color:C.txt}}>{g.title}</span>
                      <span className={`goal-status ${g.status==="on"?"gs-on":g.status==="at"?"gs-at":"gs-bh"}`}>{g.status==="on"?"On Track":g.status==="at"?"At Risk":"Behind"}</span>
                    </div>
                    <div className="pbar pbar-sm"><div className={`pbar-fill ${g.status==="on"?"pbar-green":g.status==="at"?"pbar-gold":"pbar-navy"}`} style={{width:`${g.pct}%`}}/></div>
                    <div style={{fontSize:".7rem",color:C.txtL,marginTop:".25rem"}}>{g.pct}% complete</div>
                  </div>
                ))}
                <button className="btn btn-sm btn-outline btn-bl" style={{marginTop:".5rem"}} onClick={()=>setTab("goals")}>Manage Goals →</button>
              </div>
              <div className="card cp" style={{borderTop:`3px solid ${C.navyLight}`}}>
                <div className="ch"><div><div className="ct">Accountability Partner</div><div className="cs">{plan.partner.name}</div></div><span className="badge b-new">New</span></div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:".9rem"}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${C.navyMid},${C.navyLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>👤</div>
                  <div><div style={{fontWeight:700,fontSize:".88rem",color:C.txt}}>{plan.partner.name}</div><div style={{fontSize:".72rem",color:C.txtL}}>🔥 {plan.partner.streak} week streak · {plan.partner.sharedGoal}</div></div>
                </div>
                <div className="msg-preview">"{plan.partner.lastMsg}"</div>
                <button className="btn btn-sm btn-outline btn-bl" onClick={()=>setTab("partner")}>View Partner →</button>
              </div>
            </div>
            <div className="g2">
              <div className="card cp">
                <div className="ch"><div><div className="ct">This Week's Actions</div><div className="cs">{checked.length}/{plan.actions.length} done</div></div></div>
                {plan.actions.map((a,i)=>(
                  <div key={i} className="arow">
                    <div className={`acb ${checked.includes(i)?"done":""}`} onClick={()=>tk(i)}>{checked.includes(i)?"✓":""}</div>
                    <div><div className={`atxt ${checked.includes(i)?"done":""}`}>{a.text}</div><span className={`atag tag-${a.tag}`}>{a.tag==="b"?"budget":a.tag==="d"?"debt":a.tag==="s"?"savings":a.tag==="p"?"partner":"faith"}</span></div>
                  </div>
                ))}
              </div>
              <div className="card cp">
                <div className="ch"><div><div className="ct">Debt Progress</div><div className="cs">Snowball method</div></div><button className="btn btn-sm btn-outline" onClick={()=>setTab("debt")}>Details →</button></div>
                {plan.debts.map(d=>(
                  <div key={d.name} className="ditem">
                    <div className="dpri">#{d.priority}</div>
                    <div className="dname">{d.name}</div>
                    <div className="dmeta"><span>${d.bal.toLocaleString()} · {d.rate}</span><span>${d.payment}/mo</span></div>
                    <div className="pbar pbar-sm"><div className="pbar-fill pbar-navy" style={{width:`${d.paidPct}%`}}/></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── BUDGET ── */}
        {tab==="budget"&&(
          <div className="card cp">
            <div className="ch"><div><div className="ct">Your Kingdom Budget</div><div className="cs">Based on ${plan.income.toLocaleString()}/month income</div></div></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.35rem"}}>
              {plan.budget.map(b=>(
                <div key={b.cat} style={{padding:"1.15rem",background:C.cream,borderRadius:10,borderLeft:`4px solid ${b.color}`}}>
                  <div style={{fontSize:".72rem",color:C.txtL,marginBottom:".2rem"}}>{b.pct}%</div>
                  <div style={{fontFamily:"var(--s)",fontSize:"1.35rem",color:C.txt}}>${b.amount.toLocaleString()}</div>
                  <div style={{fontSize:".82rem",color:C.txtM}}>{b.cat}</div>
                </div>
              ))}
            </div>
            <div style={{padding:"1.15rem",background:C.goldPale,border:`1px solid ${C.goldBorder}`,borderRadius:9}}>
              <strong style={{fontSize:".82rem",color:"#7A5C10"}}>👑 10-10-80 Kingdom Principle:</strong>
              <p style={{fontSize:".82rem",color:"#8B6914",marginTop:".3rem",lineHeight:1.75}}>Give 10%, Save 10%, Live on 80%. Start where you are. "Honor the Lord with your wealth." — Proverbs 3:9</p>
            </div>
          </div>
        )}

        {/* ── DEBT ── */}
        {tab==="debt"&&(
          <div className="card cp">
            <div className="ch"><div><div className="ct">Debt Freedom Roadmap</div><div className="cs">Snowball — smallest balance first</div></div></div>
            {plan.debts.map(d=>(
              <div key={d.name} style={{padding:"1.4rem",background:C.cream,borderRadius:12,marginBottom:".9rem",borderLeft:`4px solid ${d.priority===1?"#B03030":d.priority===2?C.navy:"#7688A5"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:".7rem"}}>
                  <div><div className="dpri">#{d.priority} — Attack {d.priority===1?"First":d.priority===2?"Second":"Third"}</div><div style={{fontFamily:"var(--s)",fontSize:".98rem",color:C.txt}}>{d.name}</div><div style={{fontSize:".73rem",color:C.txtL}}>{d.rate} APR</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--s)",fontSize:"1.45rem",color:d.priority===1?C.red:C.txt}}>${d.bal.toLocaleString()}</div><div style={{fontSize:".68rem",color:C.txtL}}>remaining</div></div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:".72rem",color:C.txtL,marginBottom:".35rem"}}><span>Paid {d.paidPct}%</span></div>
                <div className="pbar pbar-lg"><div className="pbar-fill pbar-navy" style={{width:`${d.paidPct}%`}}/></div>
                <div style={{marginTop:".55rem",fontSize:".8rem",color:C.txtM}}>Min: <strong>${d.payment}/mo</strong></div>
              </div>
            ))}
            <div style={{padding:"1.1rem",background:"#EBF0F8",border:"1px solid #C0D0E8",borderRadius:9}}>
              <strong style={{fontSize:".82rem",color:"#162E56"}}>📊 Snowball Rule:</strong>
              <p style={{fontSize:".82rem",color:"#1E3D70",marginTop:".3rem",lineHeight:1.75}}>Minimums on #2 and #3. Everything extra on #1. When paid off, roll it forward. "The borrower is slave to the lender." — Proverbs 22:7. Freedom is coming.</p>
            </div>
          </div>
        )}

        {/* ── SAVINGS ── */}
        {tab==="savings"&&(
          <div className="card cp">
            <div className="ch"><div><div className="ct">Savings Goals</div><div className="cs">Building your financial foundation</div></div></div>
            {plan.savingsGoals.map(g=>{
              const pct=Math.min(100,Math.round((g.current/g.target)*100));
              return (
                <div key={g.name} className="card sitem" style={{marginBottom:"1rem"}}>
                  <div className="sav-h"><div className="sav-n"><span style={{fontSize:"1.3rem"}}>{g.icon}</span>{g.name}</div><span className="sav-p">{pct}%</span></div>
                  <div className="sav-a"><span>${g.current.toLocaleString()} saved</span><span>Goal: ${g.target.toLocaleString()}</span></div>
                  <div className="pbar pbar-lg"><div className="pbar-fill pbar-gold" style={{width:`${pct}%`}}/></div>
                  <div style={{fontSize:".72rem",color:C.txtL,marginTop:".4rem"}}>${(g.target-g.current).toLocaleString()} remaining · ~${Math.round((g.target-g.current)/12)}/mo to finish in 12 months</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── ACTIONS ── */}
        {tab==="actions"&&(
          <div className="card cp">
            <div className="ch"><div><div className="ct">Weekly Action Steps</div><div className="cs">{checked.length}/{plan.actions.length} complete</div></div>{checked.length===plan.actions.length&&<span style={{color:C.forest,fontWeight:700,fontSize:".82rem"}}>🎉 Week done!</span>}</div>
            <div style={{height:6,background:C.border,borderRadius:100,marginBottom:"1.35rem",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${(checked.length/plan.actions.length)*100}%`,background:`linear-gradient(90deg,${C.forest},${C.forestL})`,borderRadius:100,transition:"width .3s"}}/>
            </div>
            {plan.actions.map((a,i)=>(
              <div key={i} className="arow" style={{padding:"1.1rem 0"}}>
                <div className={`acb ${checked.includes(i)?"done":""}`} onClick={()=>tk(i)} style={{width:23,height:23}}>{checked.includes(i)?"✓":""}</div>
                <div><div className={`atxt ${checked.includes(i)?"done":""}`} style={{fontSize:".9rem"}}>{a.text}</div><span className={`atag tag-${a.tag}`}>{a.tag==="b"?"budget":a.tag==="d"?"debt":a.tag==="s"?"savings":a.tag==="p"?"partner":"faith"}</span></div>
              </div>
            ))}
          </div>
        )}

        {/* ── DEVOTIONALS ── */}
        {tab==="devotional"&&(
          <>
            <div style={{marginBottom:"1.25rem"}}><div className="scr" style={{padding:"2.15rem"}}>
              <div className="scr-eye">📖 This Week's Scripture</div>
              <p style={{fontFamily:"var(--s)",fontSize:"1.45rem",fontStyle:"italic",color:"rgba(255,255,255,.9)",lineHeight:1.7,marginBottom:"1rem",position:"relative"}}>"{plan.scripture.text}"</p>
              <div className="scr-ref">— {plan.scripture.ref}</div>
            </div></div>
            <div className="card cp c-pale" style={{marginBottom:"1.25rem"}}>
              <div style={{fontSize:"1.6rem",marginBottom:".65rem"}}>✨</div>
              <div style={{fontFamily:"var(--s)",fontSize:"1rem",color:C.txt,marginBottom:".65rem"}}>Your Personal Encouragement</div>
              <p style={{fontSize:".9rem",color:C.txt,lineHeight:1.82}}>{plan.encouragement}</p>
            </div>
            <div className="g3">
              {DEVOTIONALS.map(d=>(
                <div key={d.day} className="card cp">
                  <div style={{fontSize:".68rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:C.gold,marginBottom:".35rem"}}>{d.day}</div>
                  <div style={{fontFamily:"var(--s)",fontSize:"1rem",color:C.txt,marginBottom:".4rem"}}>{d.title}</div>
                  <p style={{fontSize:".82rem",color:C.txtM,lineHeight:1.72,marginBottom:".75rem"}}>{d.body}</p>
                  <div style={{padding:".7rem",background:C.cream,borderRadius:8,borderLeft:`3px solid ${C.gold}`,fontFamily:"var(--s)",fontSize:".8rem",fontStyle:"italic",color:C.txt,lineHeight:1.6}}>{d.verse}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── LESSONS ── */}
        {tab==="lessons"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
            {LESSONS.map(l=>(
              <div key={l.badge} className="card cp">
                <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:100,fontSize:".65rem",fontWeight:700,background:"rgba(10,28,56,.07)",color:C.txt,marginBottom:".65rem",textTransform:"uppercase",letterSpacing:".07em"}}>🎓 {l.badge}</div>
                <div style={{fontFamily:"var(--s)",fontSize:"1rem",color:C.txt,marginBottom:".4rem"}}>{l.title}</div>
                <p style={{fontSize:".82rem",color:C.txtM,lineHeight:1.74,marginBottom:".9rem"}}>{l.body}</p>
                <div style={{padding:".75rem",background:C.greenBg,borderRadius:8,borderLeft:`3px solid ${C.forest}`,fontSize:".78rem",color:C.forest,fontWeight:500,lineHeight:1.6}}>{l.tip}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── CHECK-IN ── */}
        {tab==="checkin"&&(
          <div className="g2">
            <div className="card cp">
              <div className="ch"><div><div className="ct">Weekly Check-In</div><div className="cs">{ci.length}/6 complete</div></div></div>
              {["Tracked every expense this week","Made debt payment on time","Moved money to savings","Read a devotional","Gave this week (tithe/offering)","Stayed within budget","Checked in with accountability partner"].slice(0,6).map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:".65rem 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}} onClick={()=>tci(i)}>
                  <div className={`acb ${ci.includes(i)?"done":""}`} style={{width:18,height:18,fontSize:9}}>{ci.includes(i)?"✓":""}</div>
                  <span style={{fontSize:".83rem",color:C.txtM,textDecoration:ci.includes(i)?"line-through":"none",transition:"all .15s"}}>{item}</span>
                </div>
              ))}
              <div style={{height:5,background:C.border,borderRadius:100,overflow:"hidden",marginTop:".85rem"}}>
                <div style={{height:"100%",width:`${(ci.length/6)*100}%`,background:`linear-gradient(90deg,${C.gold},${C.goldL})`,borderRadius:100,transition:"width .3s"}}/>
              </div>
            </div>
            <div className="gcol">
              <div className="card cp">
                <div className="ct" style={{marginBottom:".85rem"}}>Weekly Summary</div>
                {[["Surplus Available",`$${Math.max(0,plan.surplus).toLocaleString()}`,plan.surplus>=0?C.forest:C.red],["Actions Done",`${checked.length}/${plan.actions.length}`,C.txt],["Savings Progress",`${Math.round((plan.savings/plan.savingsGoals[0].target)*100)}%`,C.gold],["Check-in Score",`${ci.length}/6`,C.txt],["Partner Streak","🔥 4 weeks",C.txt]].map(([l,v,c])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:".65rem 0",borderBottom:`1px solid ${C.border}`}}>
                    <span style={{fontSize:".82rem",color:C.txtL}}>{l}</span>
                    <span style={{fontFamily:"var(--s)",fontSize:".95rem",fontWeight:700,color:c}}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="scr">
                <div className="scr-eye">📖 Keep Going</div>
                <p className="scr-txt">"Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things."</p>
                <div className="scr-ref">— Matthew 25:23</div>
              </div>
            </div>
          </div>
        )}

        {/* ── AI COACH ── */}
        {tab==="coach"&&<AICoach user={user} plan={plan}/>}

        {/* ── JOURNAL (PHASE 2) ── */}
        {tab==="journal"&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.35rem"}}>
              <div className="ct">AI Financial Journal</div>
              <span className="badge b-new">Phase 2</span>
            </div>
            <div className="g2">
              <div>
                <div className="card cp" style={{marginBottom:"1.25rem"}}>
                  <div className="ch"><div><div className="ct">New Journal Entry</div><div className="cs">How are you feeling about money today?</div></div></div>
                  <JournalEntry plan={plan}/>
                </div>
                <div>
                  <div style={{fontFamily:"var(--s)",fontSize:"1rem",color:C.txt,marginBottom:"1rem"}}>Past Entries</div>
                  {plan.journal.map((e,i)=>(
                    <div key={i} className="journal-entry">
                      <div className="je-date">{e.date}</div>
                      <div className="je-mood"><span style={{fontSize:"1.1rem"}}>{e.mood}</span><span style={{fontWeight:600,color:C.txt}}>{e.moodLabel}</span></div>
                      <p className="je-body">{e.body}</p>
                      <div className="je-insight">{e.insight}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="gcol">
                <div className="card cp c-green">
                  <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.forest,marginBottom:".6rem"}}>📊 Journal Insights</div>
                  <div style={{fontFamily:"var(--s)",fontSize:"1.05rem",color:C.forest,marginBottom:".6rem"}}>Your Money Mindset</div>
                  <p style={{fontSize:".82rem",color:C.forest,lineHeight:1.75}}>Your journal shows a pattern of stress on bill-pay days but growing confidence on action days. This is exactly the trajectory of transformation. You are rewiring your financial identity.</p>
                </div>
                <div className="card cp c-pale">
                  <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#8B6914",marginBottom:".6rem"}}>🔥 Journal Streak</div>
                  <div style={{fontFamily:"var(--s)",fontSize:"2.5rem",color:C.gold,lineHeight:1}}>7</div>
                  <div style={{fontSize:".82rem",color:"#8B6914",marginTop:".3rem"}}>Days in a row. Keep going — this is building a lifelong habit.</div>
                </div>
                <div className="card cp">
                  <div style={{fontFamily:"var(--s)",fontSize:"1rem",color:C.txt,marginBottom:".75rem"}}>Mood Trends</div>
                  {[["Hopeful","😊",68],["Stressed","😤",20],["Grateful","🙏",12]].map(([m,e,p])=>(
                    <div key={m} style={{display:"flex",alignItems:"center",gap:9,marginBottom:".65rem"}}>
                      <span style={{fontSize:"1.1rem"}}>{e}</span>
                      <span style={{fontSize:".8rem",fontWeight:600,color:C.txt,width:65}}>{m}</span>
                      <div style={{flex:1,height:6,background:C.border,borderRadius:100,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${C.gold},${C.goldL})`,borderRadius:100}}/></div>
                      <span style={{fontSize:".75rem",color:C.txtL,width:30,textAlign:"right"}}>{p}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── SPENDING (PHASE 2) ── */}
        {tab==="spending"&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.35rem"}}>
              <div className="ct">Spending Analysis</div>
              <span className="badge b-new">Phase 2</span>
            </div>
            <div className="g2">
              <div className="card cp">
                <div className="ch"><div><div className="ct">Category Breakdown</div><div className="cs">Budget vs. Actual this month</div></div></div>
                {plan.spending.map(s=>{
                  const over=s.actual>s.budget;
                  const pct=Math.round((s.actual/s.budget)*100);
                  return (
                    <div key={s.cat} className="spend-cat">
                      <div className="spend-icon" style={{background:`${s.color}18`}}>{s.icon}</div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:".3rem"}}>
                          <span className="spend-lbl">{s.cat}</span>
                          {s.leak&&<span className="leak-badge">+${s.actual-s.budget} over</span>}
                        </div>
                        <div style={{height:5,background:C.border,borderRadius:100,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:over?`linear-gradient(90deg,${C.red},#E05050)`:`linear-gradient(90deg,${C.forest},${C.forestL})`,borderRadius:100}}/>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:".7rem",color:C.txtL,marginTop:".25rem"}}>
                          <span>Budget: ${s.budget}</span>
                          <span style={{color:over?C.red:C.forest,fontWeight:600}}>Actual: ${s.actual}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="gcol">
                <div className="card cp" style={{borderTop:`3px solid ${C.red}`,background:C.redBg}}>
                  <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.red,marginBottom:".6rem"}}>⚠️ Financial Leaks Found</div>
                  <div style={{fontFamily:"var(--s)",fontSize:"1.3rem",color:C.red,marginBottom:".35rem"}}>${plan.spending.filter(s=>s.leak).reduce((sum,s)=>sum+(s.actual-s.budget),0)}/month</div>
                  <p style={{fontSize:".8rem",color:C.red,lineHeight:1.7,marginBottom:".85rem"}}>That's ${plan.spending.filter(s=>s.leak).reduce((sum,s)=>sum+(s.actual-s.budget),0)*12}/year leaving your plan unnecessarily.</p>
                  {plan.spending.filter(s=>s.leak).map(s=>(
                    <div key={s.cat} style={{display:"flex",justifyContent:"space-between",fontSize:".8rem",padding:".4rem 0",borderBottom:`1px solid rgba(176,48,48,.15)`}}>
                      <span style={{color:C.red}}>{s.icon} {s.cat}</span>
                      <span style={{fontWeight:700,color:C.red}}>+${s.actual-s.budget}/mo</span>
                    </div>
                  ))}
                </div>
                <div className="card cp c-green">
                  <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.forest,marginBottom:".6rem"}}>💡 AI Coaching Tip</div>
                  <p style={{fontSize:".84rem",color:C.forest,lineHeight:1.75}}>Your biggest leak is dining out — ${plan.spending.find(s=>s.cat==="Dining Out")?.actual-plan.spending.find(s=>s.cat==="Dining Out")?.budget || 0}/month over. Try a "meal prep Sunday" habit. Redirect that savings directly to your Credit Card — it accelerates payoff by ~2 months.</p>
                </div>
                <div className="card cp c-pale">
                  <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#8B6914",marginBottom:".6rem"}}>📊 Savings Opportunity</div>
                  <div style={{fontFamily:"var(--s)",fontSize:"1.5rem",color:C.gold}}>+${plan.spending.filter(s=>s.leak).reduce((sum,s)=>sum+(s.actual-s.budget),0)}/mo</div>
                  <p style={{fontSize:".78rem",color:"#8B6914",marginTop:".35rem",lineHeight:1.7}}>If redirected to debt payoff, you could be debt-free 4 months sooner.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── GOALS (PHASE 2) ── */}
        {tab==="goals"&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.35rem"}}>
              <div className="ct">Goal Tracking</div>
              <span className="badge b-new">Phase 2</span>
            </div>
            {plan.goals.map(g=>(
              <div key={g.title} className="card goal-card" style={{marginBottom:"1.25rem"}}>
                <div className="goal-h">
                  <div className="goal-title">{g.title}</div>
                  <span className={`goal-status ${g.status==="on"?"gs-on":g.status==="at"?"gs-at":"gs-bh"}`}>{g.status==="on"?"✅ On Track":g.status==="at"?"⚠️ At Risk":"🔴 Behind"}</span>
                </div>
                <div className="goal-meta">
                  <div className="goal-m-item"><span className="goal-m-val">{g.target}</span>Target Date</div>
                  <div className="goal-m-item"><span className="goal-m-val">${g.monthly}/mo</span>Monthly Needed</div>
                  <div className="goal-m-item"><span className="goal-m-val">{g.pct}%</span>Complete</div>
                </div>
                <div className="pbar pbar-lg" style={{marginBottom:"1.1rem"}}><div className={`pbar-fill ${g.status==="on"?"pbar-green":g.status==="at"?"pbar-gold":"pbar-navy"}`} style={{width:`${g.pct}%`}}/></div>
                <div style={{fontWeight:700,fontSize:".78rem",color:C.txtL,marginBottom:".6rem",letterSpacing:".06em",textTransform:"uppercase"}}>Milestones</div>
                {g.milestones.map((m,i)=>(
                  <div key={i} className="milestone-row">
                    <div className={`ms-dot ${m.done?"done":m.cur?"cur":""}`}>{m.done?"✓":m.cur?"◉":""}</div>
                    <span style={{color:m.done?C.forest:m.cur?C.txt:C.txtL,fontWeight:m.cur?600:400}}>{m.label}</span>
                    {m.done&&<span style={{fontSize:".65rem",color:C.forest,marginLeft:"auto"}}>✅ Done</span>}
                    {m.cur&&!m.done&&<span style={{fontSize:".65rem",color:C.gold,marginLeft:"auto"}}>→ Current</span>}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {/* ── PARTNER (PHASE 2) ── */}
        {tab==="partner"&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.35rem"}}>
              <div className="ct">Accountability Partner</div>
              <span className="badge b-new">Phase 2</span>
            </div>
            <div className="g2">
              <div className="gcol">
                <div className="card partner-card">
                  <div className="partner-av">👤</div>
                  <div className="partner-name">{plan.partner.name}</div>
                  <div className="partner-role">Accountability Partner · {plan.partner.sharedGoal}</div>
                  <div className="partner-stat">
                    <div className="ps-item"><span className="ps-val">🔥 {plan.partner.streak}</span>Week Streak</div>
                    <div className="ps-item"><span className="ps-val">✅ 4/5</span>Actions Done</div>
                    <div className="ps-item"><span className="ps-val">💛 12</span>Check-ins</div>
                  </div>
                  <div className="msg-preview">"{plan.partner.lastMsg}"</div>
                  <button className="btn btn-navy btn-bl btn-sm">Send Encouragement →</button>
                </div>
                <div className="card cp c-sage">
                  <div style={{fontFamily:"var(--s)",fontSize:"1rem",color:C.txt,marginBottom:".65rem"}}>This Week's Shared Commitment</div>
                  <div style={{display:"flex",flexDirection:"column",gap:".55rem"}}>
                    {["Both make an extra debt payment","Share one financial win by Friday","Pray together for financial breakthrough"].map((c,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:".84rem",color:C.txt}}>
                        <div style={{width:18,height:18,borderRadius:5,border:`1.5px solid ${C.gold}`,flexShrink:0,background:i===0?C.goldPale:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.gold}}>{i===0?"✓":""}</div>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="gcol">
                <div className="card cp">
                  <div className="ch"><div><div className="ct">Encouragement Exchange</div><div className="cs">Recent messages</div></div></div>
                  {[{from:"Marcus",msg:"Just made my extra payment! $150 extra toward debt this month 🎉",time:"2h ago",mine:false},{from:"You",msg:"That's incredible! I did $80 extra. We're both moving! 💪",time:"1h ago",mine:true},{from:"Marcus",msg:"Bro, God is faithful. Keep going. Proverbs 16:3 all day!",time:"30m ago",mine:false}].map((m,i)=>(
                    <div key={i} style={{display:"flex",flexDirection:m.mine?"row-reverse":"row",gap:8,marginBottom:".85rem"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:m.mine?`linear-gradient(135deg,${C.navy},${C.navyL})`:"linear-gradient(135deg,#3D9970,#27AE60)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>👤</div>
                      <div style={{maxWidth:"78%",padding:".75rem 1rem",borderRadius:m.mine?"12px 3px 12px 12px":"3px 12px 12px 12px",fontSize:".8rem",background:m.mine?C.navy:C.cream,color:m.mine?"white":C.txt,lineHeight:1.65}}>
                        {m.msg}
                        <div style={{fontSize:".62rem",color:m.mine?"rgba(255,255,255,.4)":C.txtL,marginTop:3}}>{m.time}</div>
                      </div>
                    </div>
                  ))}
                  <input className="fi" placeholder="Send encouragement…" style={{marginTop:".5rem"}}/>
                </div>
                <div className="card cp c-pale">
                  <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#8B6914",marginBottom:".65rem"}}>💡 Find an Accountability Partner</div>
                  <p style={{fontSize:".82rem",color:"#7A5C10",lineHeight:1.75,marginBottom:".9rem"}}>Don't have a partner yet? Connect with someone from your church, small group, or community. Or request a match from our Kingdom Wealth community.</p>
                  <button className="btn btn-gold btn-sm btn-bl">Request a Match →</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── FAMILY (PHASE 2) ── */}
        {tab==="family"&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.35rem"}}>
              <div className="ct">Family Budgeting</div>
              <span className="badge b-new">Phase 2</span>
            </div>
            {plan.user.members&&plan.user.members.length>0?(
              <>
                <div className="g4" style={{marginBottom:"1.35rem"}}>
                  {[{name:"You",role:"Primary Steward",icon:"👑",budget:plan.income,contrib:Math.round(plan.income*.6)},...plan.user.members.map(m=>({...m,icon:"👤",budget:null,contrib:null}))].map((m,i)=>(
                    <div key={i} className="card member-card">
                      <div className="mem-av">{m.icon}</div>
                      <div className="mem-name">{m.name}</div>
                      <div className="mem-role">{m.role}</div>
                      {m.budget&&<div className="mem-stat"><span className="mem-val">${m.budget.toLocaleString()}</span>Monthly Income</div>}
                    </div>
                  ))}
                </div>
                <div className="g2">
                  <div className="card cp">
                    <div className="ch"><div><div className="ct">Family Budget Overview</div></div></div>
                    {plan.budget.map(b=>(
                      <div key={b.cat} className="brow">
                        <div className="bdot" style={{background:b.color}}/>
                        <div className="blbl">{b.cat}</div>
                        <div className="bbg"><div className="bfill" style={{width:`${b.pct}%`,background:b.color}}/></div>
                        <div className="bamt">${b.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  <div className="gcol">
                    <div className="card cp c-sage">
                      <div style={{fontFamily:"var(--s)",fontSize:"1rem",color:C.txt,marginBottom:".85rem"}}>Shared Family Goals</div>
                      {[{icon:"🏠",title:"Home Down Payment",target:"$20,000",progress:8},{icon:"🎓",title:"Education Fund",target:"$10,000",progress:5},{icon:"🌴",title:"Family Vacation",target:"$3,000",progress:22}].map(g=>(
                        <div key={g.title} className="family-goal">
                          <div className="fg-icon">{g.icon}</div>
                          <div className="fg-info">
                            <div className="fg-title">{g.title}</div>
                            <div className="fg-meta">Goal: {g.target}</div>
                            <div className="pbar pbar-sm" style={{marginTop:".4rem"}}><div className="pbar-fill pbar-gold" style={{width:`${g.progress}%`}}/></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="card cp c-pale">
                      <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#8B6914",marginBottom:".5rem"}}>👑 Family Stewardship Tip</div>
                      <p style={{fontSize:".82rem",color:"#7A5C10",lineHeight:1.75}}>"A good person leaves an inheritance for their children's children." — Proverbs 13:22. Every decision you make together today is building a legacy your grandchildren will benefit from.</p>
                    </div>
                  </div>
                </div>
              </>
            ):(
              <div className="card cp" style={{textAlign:"center",padding:"3rem"}}>
                <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🏠</div>
                <div style={{fontFamily:"var(--s)",fontSize:"1.25rem",color:C.txt,marginBottom:".65rem"}}>Set Up Family Budgeting</div>
                <p style={{fontSize:".88rem",color:C.txtM,lineHeight:1.8,maxWidth:440,margin:"0 auto 1.5rem"}}>You're currently on an individual plan. Add family members to unlock shared goals, household budgeting, couples financial planning, and family accountability features.</p>
                <button className="btn btn-gold" onClick={()=>{}}>Add Family Members →</button>
              </div>
            )}
          </>
        )}

        {/* ── WORKSHOPS (PHASE 2) ── */}
        {tab==="workshops"&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.35rem"}}>
              <div className="ct">Church & Community Workshops</div>
              <span className="badge b-new">Phase 2</span>
            </div>
            <div style={{marginBottom:"1.35rem",padding:"1.25rem",background:`linear-gradient(135deg,${C.navy},${C.forest})`,borderRadius:14,color:"white",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 50%,rgba(200,168,75,.1) 0%,transparent 60%)"}}/>
              <div style={{position:"relative"}}>
                <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:C.goldL,marginBottom:".5rem"}}>⛪ Church Licensing</div>
                <div style={{fontFamily:"var(--s)",fontSize:"1.3rem",color:"white",marginBottom:".5rem"}}>Bring Kingdom Wealth Builders to your church</div>
                <p style={{fontSize:".84rem",color:"rgba(255,255,255,.65)",lineHeight:1.78,marginBottom:"1rem",maxWidth:520}}>License Kingdom Wealth Builders for your entire congregation. Get group workshop tools, church admin dashboard, and a branded experience for your members.</p>
                <div style={{display:"flex",gap:".8rem",flexWrap:"wrap"}}>
                  <button className="btn btn-gold btn-sm">Request Church License →</button>
                  <button className="btn btn-ghost btn-sm">Learn More</button>
                </div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1.25rem"}}>
              {WORKSHOPS.map(w=>(
                <div key={w.title} className="card workshop-card">
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
                    <span style={{fontSize:"1.75rem"}}>{w.icon}</span>
                    <span className={`badge ${w.bc}`}>{w.badge}</span>
                  </div>
                  <div className="ws-title" style={{marginTop:".75rem"}}>{w.title}</div>
                  <div className="ws-meta">
                    <span>📅 {w.date}</span>
                    <span>👥 {w.registered}/{w.capacity} enrolled</span>
                  </div>
                  <div className="pbar pbar-sm" style={{marginBottom:".85rem"}}>
                    <div className="pbar-fill pbar-gold" style={{width:`${Math.round((w.registered/w.capacity)*100)}%`}}/>
                  </div>
                  <div className="ws-enrolled">
                    {["🙂","😊","🙏","👤"].map((av,i)=><div key={i} className="ws-av-sm">{av}</div>)}
                    <span className="ws-count">+{w.registered-4} enrolled</span>
                  </div>
                  <div style={{marginTop:"1rem",display:"flex",gap:".6rem"}}>
                    <button className="btn btn-navy btn-sm" style={{flex:1}}>Register →</button>
                    <button className="btn btn-outline btn-sm">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── JOURNAL ENTRY (PHASE 2) ──────────────────────────────────────────────────
function JournalEntry({plan}) {
  const [mood,setMood]=useState("");
  const [text,setText]=useState("");
  const [insight,setInsight]=useState("");
  const [loading,setLoading]=useState(false);
  const [saved,setSaved]=useState(false);

  const analyze=async()=>{
    if(!text.trim()) return;
    setLoading(true);
    try {
      const reply=await askCoach([{role:"user",content:`I'm writing in my financial journal. Mood: ${mood||"neutral"}. Entry: "${text}"\n\nPlease provide a brief, warm AI coaching insight (2-3 sentences) about what patterns or themes you notice, and one specific encouragement or action. Be faith-centered and warm. Context: income $${plan.income}/mo, debt $${plan.debt}.`}]);
      setInsight(reply);
    } catch { setInsight("💡 Reflection is the beginning of transformation. Every honest entry you write is building financial self-awareness — the foundation of lasting change."); }
    setLoading(false);
  };
  const save=()=>{setSaved(true);setTimeout(()=>{setSaved(false);setText("");setMood("");setInsight("")},2000)};

  return (
    <div>
      <div style={{display:"flex",gap:".6rem",marginBottom:"1rem",flexWrap:"wrap"}}>
        {[["😊","Hopeful"],["😤","Stressed"],["🙏","Grateful"],["😔","Worried"],["💪","Motivated"]].map(([e,l])=>(
          <button key={l} onClick={()=>setMood(l)} style={{padding:"6px 14px",borderRadius:100,fontSize:".78rem",fontWeight:600,cursor:"pointer",fontFamily:"var(--b)",background:mood===l?C.navy:"transparent",color:mood===l?"white":C.txtM,border:`1.5px solid ${mood===l?C.navy:C.border}`,display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}>
            {e} {l}
          </button>
        ))}
      </div>
      <textarea className="fta" style={{minHeight:100,marginBottom:".85rem"}} placeholder="How are you feeling about your finances today? What challenged you? What are you grateful for? Be honest — this is your safe space..." value={text} onChange={e=>setText(e.target.value)}/>
      {insight&&<div className="je-insight" style={{marginBottom:".85rem"}}>{insight.replace(/\*\*(.*?)\*\*/g,"$1")}</div>}
      {saved&&<div style={{padding:".7rem",background:C.greenBg,border:`1px solid ${C.sageMid}`,borderRadius:8,fontSize:".8rem",color:C.forest,marginBottom:".85rem"}}>✅ Entry saved!</div>}
      <div style={{display:"flex",gap:".7rem"}}>
        <button className="btn btn-outline btn-sm" onClick={analyze} disabled={!text.trim()||loading}>{loading?"Analyzing…":"✨ Get AI Insight"}</button>
        <button className="btn btn-navy btn-sm" onClick={save} disabled={!text.trim()||saved}>Save Entry</button>
      </div>
    </div>
  );
}

// ─── AI COACH ─────────────────────────────────────────────────────────────────
function AICoach({user,plan}) {
  const name=user?.name||plan?.user?.name||"Friend";
  const [msgs,setMsgs]=useState([{
    role:"assistant",
    content:`Hello, ${name.split(" ")[0]}! 👑 I'm your Kingdom Wealth Coach — Phase 2 upgrade active.\n\nI now have access to your **spending analysis**, **goal tracking**, **journal insights**, and **accountability data** to give you the most personalized coaching possible.\n\n**Ask me anything:**\n- "Analyze my spending leaks"\n- "Help me with my debt freedom goal"\n- "I need encouragement today"\n- "What should I journal about this week?"\n- "How do I approach budgeting with my spouse?"\n\nWhat's on your heart today? 🙏`,
    time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})
  }]);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const bot=useRef(null);

  useEffect(()=>{bot.current?.scrollIntoView({behavior:"smooth"})},[msgs,typing]);

  const hints=["Analyze my spending","Help me with my debt goal","I need encouragement","Journal prompt for today","How to budget with my spouse","Give me a scripture"];

  const send=async(txt)=>{
    const content=(txt||input).trim();
    if(!content||typing) return;
    setInput("");
    const t=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
    const ctx=`User Phase 2 data: Income $${plan.income}/mo, Expenses $${plan.expenses}/mo, Surplus $${plan.surplus}/mo, Debt $${plan.debt}, Savings $${plan.savings}. Goals: ${plan.goals.map(g=>`${g.title} (${g.status})`).join(", ")}. Spending leaks: ${plan.spending.filter(s=>s.leak).map(s=>s.cat).join(", ")}.`;
    const history=[...msgs,{role:"user",content,time:t}];
    setMsgs(history);
    setTyping(true);
    try {
      const apiMsgs=[{role:"user",content:`[Context: ${ctx}]\n\n${content}`},...history.slice(1).map(m=>({role:m.role,content:m.content}))];
      const r=await askCoach(apiMsgs);
      setMsgs(p=>[...p,{role:"assistant",content:r,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]);
    } catch {
      setMsgs(p=>[...p,{role:"assistant",content:"I couldn't reach the server — please try again. You're not alone! 🙏",time:t}]);
    }
    setTyping(false);
  };

  const render=c=>c.split("\n").map((l,i)=>{
    const h=l.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>");
    return <p key={i} dangerouslySetInnerHTML={{__html:h}} style={{marginBottom:l===""?0:".2em"}}/>;
  });

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem",padding:"1rem 1.25rem",background:C.navy,borderRadius:12}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.gold},${C.goldL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>👑</div>
        <div>
          <div style={{fontWeight:700,fontSize:".88rem",color:"white"}}>Kingdom Wealth Coach — Phase 2</div>
          <div className="pill-live"><div className="pill-live-dot"/>Spending · Goals · Journal · Partner data active</div>
        </div>
      </div>
      <div className="card cp">
        <div className="chat-box">
          {msgs.map((m,i)=>(
            <div key={i} className={`cmsg ${m.role==="user"?"u":""}`}>
              <div className={`cav ${m.role==="user"?"u":"ai"}`}>{m.role==="user"?(name[0]?.toUpperCase()||"U"):"👑"}</div>
              <div>
                <div className={`cbub ${m.role==="user"?"u":"ai"}`}>{render(m.content)}</div>
                <div className={`ctime`} style={{textAlign:m.role==="user"?"right":"left"}}>{m.time}</div>
              </div>
            </div>
          ))}
          {typing&&(
            <div className="cmsg">
              <div className="cav ai">👑</div>
              <div className="cbub ai" style={{display:"flex",gap:5,alignItems:"center",padding:".75rem 1rem"}}>
                <div className="tydot"/><div className="tydot"/><div className="tydot"/>
              </div>
            </div>
          )}
          <div ref={bot}/>
        </div>
        <div className="div"/>
        <div style={{display:"flex",gap:".45rem",marginBottom:".75rem",flexWrap:"wrap"}}>
          {hints.map(h=><button key={h} className="hint-btn" onClick={()=>send(h)}>{h}</button>)}
        </div>
        <div style={{display:"flex",gap:".6rem",alignItems:"flex-end"}}>
          <textarea style={{flex:1,padding:"9px 13px",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"var(--b)",fontSize:".875rem",color:C.txt,outline:"none",resize:"none",lineHeight:1.6,minHeight:42,background:"white"}} placeholder="Ask about spending, goals, journaling, accountability, family budgeting…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
          <button style={{width:38,height:38,borderRadius:8,background:typing||!input.trim()?C.border:C.navy,border:"none",cursor:typing||!input.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:typing||!input.trim()?C.txtL:"white",fontSize:16,flexShrink:0,transition:"all .15s"}} onClick={()=>send()} disabled={!input.trim()||typing}>➤</button>
        </div>
      </div>
    </div>
  );
}

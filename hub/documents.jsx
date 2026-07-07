/* ============================================================
   documents.jsx — branded document renderers (brand-aware)
   exposes window.HUBDOCS.renderDoc(templateId, brand, values)
   ============================================================ */

function fmtDate(s){
  let d = s ? new Date(s+'T00:00:00') : new Date();
  if(isNaN(d)) d = new Date();
  return d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
}
function paras(text, style){
  const blocks = String(text||'').split(/\n\n+/).filter(Boolean);
  return blocks.map((b,i)=> React.createElement('p',{key:i,style},
    b.split('\n').map((ln,j)=> React.createElement(React.Fragment,{key:j}, j>0?React.createElement('br'):null, ln))
  ));
}

/* brand style helper */
function bs(brand){
  const chief = brand.id==='chief';
  return {
    chief, accent:brand.accent, accent2:brand.accent2, ink:brand.ink,
    fd:brand.fontDisplay, fdoc:brand.fontDoc, fui:brand.fontUi, logo:brand.docLogo,
    ink1: chief?'#1c1a15':'#16202f', ink2: chief?'#3a3529':'#33404f',
    muted: chief?'#6b6353':'#5e6b7b', hair: chief?'#e6ddcc':'#dae1e9',
    soft: chief? 'rgba(181,130,63,.09)':'rgba(30,58,102,.07)',
  };
}
const PAD = '0.8in';

function DocHead(brand, t){
  return React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-end',borderBottom:`2px solid ${t.accent}`,paddingBottom:14,marginBottom:30}},
    React.createElement('img',{src:t.logo,style:{height:t.chief?40:58,objectFit:'contain'}}),
    React.createElement('div',{style:{textAlign:'right',fontFamily:t.fui,fontSize:8.5,letterSpacing:'.14em',textTransform:'uppercase',color:t.muted,lineHeight:1.9}},
      React.createElement('div',null,brand.web),
      React.createElement('div',null,brand.phone),
      React.createElement('div',null,brand.addr),
    )
  );
}
function DocFoot(brand, t){
  return React.createElement('div',{style:{position:'absolute',left:PAD,right:PAD,bottom:'0.55in',borderTop:`1px solid ${t.hair}`,paddingTop:10,display:'flex',justifyContent:'space-between',fontFamily:t.fui,fontSize:8,letterSpacing:'.12em',textTransform:'uppercase',color:t.muted}},
    React.createElement('span',null,brand.name),
    React.createElement('span',null,brand.docTag),
  );
}
function eyebrow(text,t){
  return React.createElement('div',{style:{fontFamily:t.fui,fontSize:10,letterSpacing:'.22em',textTransform:'uppercase',color:t.accent,fontWeight:700,marginBottom:10}}, text);
}
function secH(text,t){
  return React.createElement('h2',{style:{fontFamily:t.fd,fontSize:t.chief?17:16,letterSpacing:t.chief?'.06em':'.01em',textTransform:t.chief?'uppercase':'none',color:t.ink1,fontWeight:t.chief?600:800,margin:'0 0 12px'}}, text);
}

/* ---------------- PROPOSAL ---------------- */
function docProposal(brand,v){
  const t=bs(brand); const body={fontFamily:t.fdoc,fontSize:12.5,lineHeight:1.7,color:t.ink2,margin:'0 0 12px'};
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    DocHead(brand,t),
    eyebrow('Proposal · Confidential',t),
    React.createElement('h1',{style:{fontFamily:t.fd,fontSize:t.chief?34:30,letterSpacing:t.chief?'.02em':'-.01em',color:t.ink1,fontWeight:t.chief?600:800,lineHeight:1.1,margin:'0 0 6px',textTransform:t.chief?'none':'none'}}, v.title),
    React.createElement('div',{style:{fontFamily:t.fui,fontSize:12,color:t.muted,marginBottom:26}},
      'Prepared for ',React.createElement('strong',{style:{color:t.ink1}},v.clientCompany),
      v.clientName?(' · Attn: '+v.clientName):'', ' · ', fmtDate(v.date)),
    secH('Executive Summary',t),
    React.createElement('div',null, paras(v.intro, body)),
    React.createElement('div',{style:{height:22}}),
    secH('Scope of Work',t),
    (v.scope||[]).map((s,i)=>React.createElement('div',{key:i,style:{display:'flex',gap:14,marginBottom:14}},
      React.createElement('div',{style:{fontFamily:t.fd,fontSize:14,fontWeight:700,color:t.accent,minWidth:26}}, String(i+1).padStart(2,'0')),
      React.createElement('div',null,
        React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:13,color:t.ink1,marginBottom:2}}, s.title),
        React.createElement('div',{style:{fontFamily:t.fdoc,fontSize:12,lineHeight:1.6,color:t.ink2}}, s.desc),
      )
    )),
    React.createElement('div',{style:{height:22}}),
    secH('Investment',t),
    React.createElement('div',{style:{border:`1px solid ${t.hair}`,borderRadius:2}},
      (v.pricing||[]).map((p,i)=>React.createElement('div',{key:i,style:{display:'flex',justifyContent:'space-between',padding:'11px 16px',borderBottom:i<v.pricing.length-1?`1px solid ${t.hair}`:'none',fontFamily:t.fui}},
        React.createElement('span',{style:{fontSize:12.5,color:t.ink2}}, p.item),
        React.createElement('span',{style:{fontSize:12.5,fontWeight:700,color:t.ink1}}, p.amt),
      ))
    ),
    React.createElement('div',{style:{height:24}}),
    secH('Timeline & Next Steps',t),
    React.createElement('div',null, paras(v.timeline, {...body,fontSize:12})),
    React.createElement('div',{style:{height:14}}),
    React.createElement('div',{style:{background:t.soft,borderLeft:`3px solid ${t.accent}`,padding:'12px 16px',fontFamily:t.fui,fontSize:11,color:t.ink2,lineHeight:1.6}},
      React.createElement('strong',{style:{color:t.ink1}},'Terms — '), v.terms,
      React.createElement('div',{style:{marginTop:6,color:t.muted}},'This proposal is valid for ',v.validUntil,'.')),
    React.createElement('div',{style:{marginTop:30,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}},
      React.createElement('div',null,
        React.createElement('div',{style:{width:200,borderTop:`1px solid ${t.ink1}`,paddingTop:6,fontFamily:t.fui,fontSize:11,color:t.muted}},
          React.createElement('div',{style:{fontWeight:700,color:t.ink1,fontSize:12}}, v.preparedBy||'____________________'),
          v.preparedByTitle),
      ),
      React.createElement('img',{src:t.logo,style:{height:t.chief?26:34,opacity:.5,objectFit:'contain'}})
    ),
    DocFoot(brand,t)
  );
}

/* ---------------- AGREEMENT ---------------- */
function docAgreement(brand,v){
  const t=bs(brand);
  const clauseB={fontFamily:t.fdoc,fontSize:11.5,lineHeight:1.7,color:t.ink2,margin:'0 0 4px'};
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    React.createElement('div',{style:{textAlign:'center',marginBottom:26}},
      React.createElement('img',{src:t.logo,style:{height:t.chief?44:64,objectFit:'contain',marginBottom:16}}),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:9.5,letterSpacing:'.28em',textTransform:'uppercase',color:t.muted}}, brand.docTag),
    ),
    React.createElement('h1',{style:{textAlign:'center',fontFamily:t.fd,fontSize:t.chief?24:22,letterSpacing:t.chief?'.05em':'.01em',textTransform:'uppercase',color:t.ink1,fontWeight:t.chief?600:800,margin:'0 0 4px'}}, v.atype),
    React.createElement('div',{style:{textAlign:'center',width:70,borderBottom:`2px solid ${t.accent}`,margin:'10px auto 22px'}}),
    React.createElement('p',{style:{...clauseB,textAlign:'justify'}},
      'This ',React.createElement('strong',null,v.atype),' (the "Agreement") is entered into as of ',
      React.createElement('strong',null,fmtDate(v.effectiveDate)),', by and between ',
      React.createElement('strong',null,brand.name),' ("Company") and ',
      React.createElement('strong',null,v.counterparty),' ("Counterparty"), collectively the "Parties."'),
    React.createElement('p',{style:{...clauseB,textAlign:'justify',marginBottom:18}}, v.recitals),
    (v.clauses||[]).map((c,i)=>React.createElement('div',{key:i,style:{marginBottom:14}},
      React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:12,color:t.ink1,marginBottom:4,letterSpacing:'.01em'}}, c.h),
      React.createElement('p',{style:{...clauseB,textAlign:'justify'}}, c.b),
    )),
    React.createElement('div',{style:{marginBottom:14}},
      React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:12,color:t.ink1,marginBottom:4}},'Term & Governing Law'),
      React.createElement('p',{style:{...clauseB,textAlign:'justify'}},'This Agreement shall remain in effect for ',React.createElement('strong',null,v.term),' and shall be governed by the laws of the ',React.createElement('strong',null,v.governingLaw),', without regard to its conflict-of-laws provisions.'),
    ),
    React.createElement('div',{style:{display:'flex',gap:40,marginTop:40}},
      [[brand.name,v.signName,v.signTitle],[v.counterparty,v.cpSignName,'Authorized Signatory']].map((s,i)=>
        React.createElement('div',{key:i,style:{flex:1}},
          React.createElement('div',{style:{borderTop:`1px solid ${t.ink1}`,paddingTop:7,marginTop:34,fontFamily:t.fui}},
            React.createElement('div',{style:{fontWeight:700,fontSize:12,color:t.ink1}}, s[1]||'____________________'),
            React.createElement('div',{style:{fontSize:10.5,color:t.muted}}, s[2]),
            React.createElement('div',{style:{fontSize:10.5,color:t.muted,marginTop:2}}, s[0]),
            React.createElement('div',{style:{fontSize:9.5,color:t.muted,marginTop:10}},'Date: ______________'),
          )
        ))
    ),
    DocFoot(brand,t)
  );
}

/* ---------------- MUTUAL NDA / NON-CIRCUMVENTION ---------------- */
function docMNDA(brand,v){
  const t=bs(brand);
  const co = brand.name;
  const roleMap = { 'Intermediary / broker':'an intermediary or broker', 'Buyer':'a buyer or principal', 'Seller':'a seller or principal' };
  const roleText = roleMap[v.ourRole] || 'a buyer, seller, principal, intermediary, or broker, as the case may be';
  const clauseB={fontFamily:t.fdoc,fontSize:11.5,lineHeight:1.7,color:t.ink2,margin:'0 0 4px',textAlign:'justify'};
  const sections=(v.sections||[]).map(s=>({h:s.h,b:String(s.b||'').split('[[CO]]').join(co).split('[[LAW]]').join(brand.jurisdiction||'the State of Florida')}));
  const num=n=>String(n)+'.';
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    React.createElement('div',{style:{textAlign:'center',marginBottom:22}},
      React.createElement('img',{src:t.logo,style:{height:t.chief?42:60,objectFit:'contain',marginBottom:14}}),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:9.5,letterSpacing:'.28em',textTransform:'uppercase',color:t.muted}}, brand.docTag)),
    React.createElement('div',{style:{textAlign:'center',fontFamily:t.fui,fontSize:9.5,letterSpacing:'.24em',textTransform:'uppercase',color:t.accent,fontWeight:700,marginBottom:6}},'Mutual Agreement · Confidential'),
    React.createElement('h1',{style:{textAlign:'center',fontFamily:t.fd,fontSize:t.chief?22:20,letterSpacing:t.chief?'.04em':'.01em',textTransform:'uppercase',color:t.ink1,fontWeight:t.chief?600:800,margin:'0 0 4px',lineHeight:1.2}}, 'Mutual Non-Disclosure & Non-Circumvention Agreement'),
    React.createElement('div',{style:{width:70,borderBottom:`2px solid ${t.accent}`,margin:'10px auto 22px'}}),
    React.createElement('p',{style:{...clauseB,marginBottom:18}},
      'This Mutual Non-Disclosure & Non-Circumvention Agreement (the “Agreement”) is made as of ',
      React.createElement('strong',null,fmtDate(v.effectiveDate)),' (the “Effective Date”) between ',
      React.createElement('strong',null,co),' (“Company”), ',(brand.coEntity||'a limited liability company'),', and ',
      React.createElement('strong',null,v.counterparty||'________________________'),' (“Counterparty”), a ',v.cpEntity||'____________',' organised under the laws of the ',v.cpState||'____________','. The Company and the Counterparty are together the “Parties.” In connection with the Purpose, the Company may act as ',roleText,'.'),
    React.createElement('div',{style:{marginBottom:12}},
      React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:12,color:t.ink1,marginBottom:4,letterSpacing:'.01em'}}, num(1),' Purpose'),
      React.createElement('p',{style:clauseB}, v.purpose)),
    sections.map((c,i)=>React.createElement('div',{key:i,style:{marginBottom:12}},
      React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:12,color:t.ink1,marginBottom:4,letterSpacing:'.01em'}}, num(i+2),' ',c.h),
      React.createElement('p',{style:clauseB}, c.b))),
    React.createElement('div',{style:{display:'flex',gap:40,marginTop:34}},
      [[co,v.signName,v.signTitle],[v.counterparty||'Counterparty',v.cpSignName,v.cpSignTitle||'Authorized Signatory']].map((s,i)=>
        React.createElement('div',{key:i,style:{flex:1}},
          React.createElement('div',{style:{fontFamily:t.fui,fontSize:9.5,letterSpacing:'.12em',textTransform:'uppercase',color:t.muted,marginBottom:4}}, i===0?'Company':'Counterparty'),
          React.createElement('div',{style:{borderTop:`1px solid ${t.ink1}`,paddingTop:7,marginTop:30,fontFamily:t.fui}},
            React.createElement('div',{style:{fontSize:9,color:t.muted,marginBottom:8}},'By: ______________________________'),
            React.createElement('div',{style:{fontWeight:700,fontSize:12,color:t.ink1}}, s[1]||'____________________'),
            React.createElement('div',{style:{fontSize:10.5,color:t.muted}}, s[2]||'Title'),
            React.createElement('div',{style:{fontSize:10.5,color:t.muted,marginTop:2}}, s[0]),
            React.createElement('div',{style:{fontSize:9.5,color:t.muted,marginTop:10}},'Date: ______________'))))),
    DocFoot(brand,t)
  );
}

/* ---------------- LETTERHEAD ---------------- */
function docLetterhead(brand,v){
  const t=bs(brand); const body={fontFamily:t.fdoc,fontSize:12.5,lineHeight:1.75,color:t.ink2,margin:'0 0 13px',textAlign:'justify'};
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    DocHead(brand,t),
    React.createElement('div',{style:{fontFamily:t.fui,fontSize:12,color:t.muted,marginBottom:22}}, fmtDate(v.date)),
    React.createElement('div',{style:{fontFamily:t.fui,fontSize:12,color:t.ink2,lineHeight:1.6,marginBottom:22}},
      React.createElement('div',{style:{fontWeight:700,color:t.ink1}}, v.recipient),
      React.createElement('div',null, v.recipTitle),
      paras(v.recipAddr,{margin:0,fontSize:12,color:t.ink2}),
    ),
    React.createElement('div',{style:{...body,marginBottom:16}}, v.salutation),
    React.createElement('div',null, paras(v.body, body)),
    React.createElement('div',{style:{marginTop:24,fontFamily:t.fdoc,fontSize:12.5,color:t.ink2}}, v.signoff),
    React.createElement('div',{style:{marginTop:36,fontFamily:t.fui}},
      React.createElement('div',{style:{fontWeight:700,fontSize:13,color:t.ink1}}, v.senderName||'____________________'),
      React.createElement('div',{style:{fontSize:11.5,color:t.muted}}, v.senderTitle),
      React.createElement('div',{style:{fontSize:11.5,color:t.accent}}, brand.name),
    ),
    DocFoot(brand,t)
  );
}

/* ---------------- ONE PAGER ---------------- */
function docOnePager(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{padding:0,fontFamily:t.fdoc,display:'flex',flexDirection:'column'}},
    React.createElement('div',{style:{background:t.chief?t.ink:brand.accent,color:'#fff',padding:`0.7in ${PAD} 0.55in`}},
      React.createElement('img',{src:t.chief?brand.logoDark:t.logo,style:{height:t.chief?36:52,objectFit:'contain',marginBottom:22,filter:t.chief?'none':'brightness(0) invert(1)'}}),
      React.createElement('h1',{style:{fontFamily:t.fd,fontSize:t.chief?40:34,letterSpacing:t.chief?'.01em':'-.01em',fontWeight:t.chief?700:800,lineHeight:1.05,margin:'0 0 10px',color:'#fff'}}, v.headline),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:14,color:t.chief?brand.accent:'rgba(255,255,255,.85)',letterSpacing:'.02em'}}, v.subhead),
    ),
    React.createElement('div',{style:{padding:`0.5in ${PAD} 0.4in`,flex:1}},
      React.createElement('p',{style:{fontFamily:t.fdoc,fontSize:13,lineHeight:1.75,color:t.ink2,margin:'0 0 26px',maxWidth:'none'}}, v.overview),
      eyebrow('What We Do',t),
      React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px 26px',marginBottom:28}},
        (v.services||[]).map((s,i)=>React.createElement('div',{key:i},
          React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:13,color:t.ink1,marginBottom:4,display:'flex',alignItems:'center',gap:8}},
            React.createElement('span',{style:{width:6,height:6,background:t.accent,display:'inline-block',borderRadius:t.chief?0:6,transform:t.chief?'rotate(45deg)':'none'}}), s.t),
          React.createElement('div',{style:{fontFamily:t.fdoc,fontSize:12,lineHeight:1.6,color:t.ink2}}, s.d),
        ))
      ),
      React.createElement('div',{style:{display:'flex',gap:0,borderTop:`2px solid ${t.accent}`,borderBottom:`1px solid ${t.hair}`}},
        (v.stats||[]).map((s,i)=>React.createElement('div',{key:i,style:{flex:1,padding:'16px 4px',textAlign:'center',borderRight:i<v.stats.length-1?`1px solid ${t.hair}`:'none'}},
          React.createElement('div',{style:{fontFamily:t.fd,fontSize:26,fontWeight:t.chief?700:800,color:t.accent}}, s.v),
          React.createElement('div',{style:{fontFamily:t.fui,fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',color:t.muted,marginTop:4}}, s.l),
        ))
      ),
    ),
    React.createElement('div',{style:{padding:`14px ${PAD}`,background:t.soft,fontFamily:t.fui,fontSize:10.5,letterSpacing:'.06em',color:t.ink2,display:'flex',justifyContent:'space-between'}},
      React.createElement('span',null, brand.web), React.createElement('span',null, brand.email), React.createElement('span',null, brand.phone))
  );
}

/* ---------------- CASE STUDY ---------------- */
function docCaseStudy(brand,v){
  const t=bs(brand); const body={fontFamily:t.fdoc,fontSize:12.5,lineHeight:1.72,color:t.ink2,margin:'0 0 10px'};
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    DocHead(brand,t),
    eyebrow('Case Study · '+v.industry,t),
    React.createElement('h1',{style:{fontFamily:t.fd,fontSize:t.chief?32:28,fontWeight:t.chief?700:800,lineHeight:1.1,color:t.ink1,margin:'0 0 6px',letterSpacing:t.chief?'.01em':'-.01em'}}, v.headline),
    React.createElement('div',{style:{fontFamily:t.fui,fontSize:12,color:t.muted,marginBottom:26}}, 'Client: ',React.createElement('strong',{style:{color:t.ink1}},v.client)),
    secH('The Challenge',t), React.createElement('div',null, paras(v.challenge, body)),
    React.createElement('div',{style:{height:16}}),
    secH('Our Approach',t), React.createElement('div',null, paras(v.approach, body)),
    React.createElement('div',{style:{height:22}}),
    React.createElement('div',{style:{display:'flex',gap:0,background:t.chief?t.ink:brand.accent,borderRadius:2}},
      (v.results||[]).map((r,i)=>React.createElement('div',{key:i,style:{flex:1,padding:'20px 10px',textAlign:'center',borderRight:i<v.results.length-1?'1px solid rgba(255,255,255,.14)':'none'}},
        React.createElement('div',{style:{fontFamily:t.fd,fontSize:30,fontWeight:t.chief?700:800,color:t.chief?brand.accent:'#fff'}}, r.v),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:10,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,.75)',marginTop:5}}, r.l),
      ))
    ),
    React.createElement('div',{style:{marginTop:26,borderLeft:`3px solid ${t.accent}`,paddingLeft:18}},
      React.createElement('div',{style:{fontFamily:t.fd,fontSize:t.chief?19:17,fontStyle:t.chief?'italic':'normal',fontWeight:t.chief?500:600,color:t.ink1,lineHeight:1.4}}, '\u201C',v.quote,'\u201D'),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:11,color:t.muted,marginTop:8,letterSpacing:'.04em'}}, '\u2014 ',v.quoteBy),
    ),
    DocFoot(brand,t)
  );
}

/* ---------------- SOP ---------------- */
function docSOP(brand,v){
  const t=bs(brand); const body={fontFamily:t.fdoc,fontSize:12,lineHeight:1.65,color:t.ink2,margin:'0 0 8px'};
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    DocHead(brand,t),
    React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}},
      React.createElement('div',null,
        eyebrow('Standard Operating Procedure',t),
        React.createElement('h1',{style:{fontFamily:t.fd,fontSize:t.chief?26:24,fontWeight:t.chief?600:800,color:t.ink1,margin:0,textTransform:t.chief?'uppercase':'none',letterSpacing:t.chief?'.03em':'0'}}, v.title)),
      React.createElement('table',{style:{fontFamily:t.fui,fontSize:10,color:t.muted,borderCollapse:'collapse'}},
        React.createElement('tbody',null,
          [['Doc ID',v.docId],['Owner',v.owner],['Revised',fmtDate(v.revised)]].map((r,i)=>
            React.createElement('tr',{key:i},
              React.createElement('td',{style:{padding:'2px 10px 2px 0',letterSpacing:'.1em',textTransform:'uppercase'}}, r[0]),
              React.createElement('td',{style:{padding:'2px 0',fontWeight:700,color:t.ink1}}, r[1]),
            ))
        ))
    ),
    secH('Purpose',t), React.createElement('div',null, paras(v.purpose, body)),
    React.createElement('div',{style:{height:14}}),
    secH('Scope',t), React.createElement('div',null, paras(v.scope, body)),
    React.createElement('div',{style:{height:18}}),
    secH('Procedure',t),
    (v.steps||[]).map((s,i)=>React.createElement('div',{key:i,style:{display:'flex',gap:14,marginBottom:12,alignItems:'flex-start'}},
      React.createElement('div',{style:{width:26,height:26,borderRadius:t.chief?0:20,background:t.chief?t.ink:brand.accent,color:t.chief?brand.accent:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:t.fui,fontWeight:700,fontSize:12,flex:'none'}}, i+1),
      React.createElement('div',null,
        React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:12.5,color:t.ink1}}, s.t),
        React.createElement('div',{style:{fontFamily:t.fdoc,fontSize:11.5,lineHeight:1.6,color:t.ink2}}, s.d),
      )
    )),
    DocFoot(brand,t)
  );
}

/* ---------------- EMAIL SIGNATURE ---------------- */
function docEmailSig(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{width:600,minHeight:0,padding:'46px 40px',display:'flex',flexDirection:'column',gap:26}},
    React.createElement('div',{style:{fontFamily:t.fui,fontSize:11,letterSpacing:'.14em',textTransform:'uppercase',color:t.muted}},'Email signature preview'),
    React.createElement('table',{cellPadding:0,cellSpacing:0,style:{borderCollapse:'collapse',margin:'6px auto'}},
      React.createElement('tbody',null, React.createElement('tr',null,
        React.createElement('td',{style:{paddingRight:24,borderRight:`2px solid ${brand.accent}`,verticalAlign:'middle'}},
          React.createElement('img',{src:t.logo,style:{height:t.chief?66:88,maxWidth:200,objectFit:'contain',display:'block'}})),
        React.createElement('td',{style:{paddingLeft:24,verticalAlign:'middle',fontFamily:t.fui}},
          React.createElement('div',{style:{fontFamily:t.fd,fontSize:17,fontWeight:t.chief?600:800,color:t.ink1,letterSpacing:t.chief?'.04em':'0'}}, v.name),
          React.createElement('div',{style:{fontSize:12,color:brand.accent,fontWeight:600,marginBottom:7}}, v.title),
          React.createElement('div',{style:{fontSize:11.5,color:t.ink2,lineHeight:1.7}},
            v.phone&&React.createElement('div',null, v.phone),
            React.createElement('div',null, v.email||brand.email),
            React.createElement('div',{style:{color:brand.accent}}, v.web||brand.web),
          ),
          v.tagline&&React.createElement('div',{style:{marginTop:7,fontSize:10.5,fontStyle:'italic',color:t.muted}}, v.tagline),
        )
      ))
    ),
    React.createElement('div',{style:{fontFamily:t.fui,fontSize:11,color:t.muted,borderTop:`1px solid ${t.hair}`,paddingTop:16,lineHeight:1.6}},
      'Use the ',React.createElement('strong',{style:{color:t.ink1}},'Copy signature'),' action to copy this block, then paste it into your email client\u2019s signature settings.')
  );
}

/* ---------------- EMAIL TEMPLATE ---------------- */
function docEmailTemplate(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{width:640,minHeight:0,padding:0,background:t.chief?'#f4f0e9':'#eef2f6'}},
    React.createElement('div',{style:{padding:'26px 20px 40px'}},
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:11,color:t.muted,marginBottom:6}},'Subject: ',React.createElement('strong',{style:{color:t.ink1}},v.subject)),
      React.createElement('div',{style:{background:'#fff',borderRadius:6,overflow:'hidden',boxShadow:'0 2px 14px rgba(0,0,0,.08)'}},
        React.createElement('div',{style:{background:t.chief?t.ink:brand.accent,padding:'22px 28px',textAlign:'center'}},
          React.createElement('img',{src:t.chief?brand.logoDark:t.logo,style:{height:t.chief?30:44,objectFit:'contain',filter:t.chief?'none':'brightness(0) invert(1)'}})),
        React.createElement('div',{style:{padding:'30px 32px'}},
          React.createElement('div',{style:{fontFamily:t.fui,fontSize:9.5,letterSpacing:'.2em',textTransform:'uppercase',color:brand.accent,fontWeight:700,marginBottom:14}}, v.etype),
          React.createElement('div',{style:{fontFamily:t.fdoc,fontSize:14,color:t.ink1,marginBottom:14}}, v.greeting),
          React.createElement('div',null, paras(v.body, {fontFamily:t.fdoc,fontSize:13.5,lineHeight:1.7,color:t.ink2,margin:'0 0 14px'})),
          React.createElement('div',{style:{textAlign:'center',margin:'26px 0 20px'}},
            React.createElement('span',{style:{display:'inline-block',background:brand.accent,color:'#fff',fontFamily:t.fui,fontWeight:700,fontSize:13,padding:'13px 30px',borderRadius:t.chief?2:6,letterSpacing:'.02em'}}, v.ctaLabel)),
          React.createElement('div',{style:{fontFamily:t.fdoc,fontSize:13.5,color:t.ink2,marginTop:10}}, v.signName,',',React.createElement('br'),
            React.createElement('span',{style:{color:brand.accent,fontWeight:600}}, brand.name)),
        ),
        React.createElement('div',{style:{borderTop:`1px solid ${t.hair}`,padding:'16px 32px',fontFamily:t.fui,fontSize:10,color:t.muted,textAlign:'center',letterSpacing:'.04em'}},
          brand.name,' · ',brand.addr,' · ',brand.web),
      )
    )
  );
}

/* ---------------- BUSINESS CARD ---------------- */
function docBusinessCard(brand,v){
  const t=bs(brand);
  const card={width:'3.5in',height:'2in',borderRadius:6,overflow:'hidden',boxShadow:'0 6px 24px rgba(0,0,0,.18)',position:'relative'};
  return React.createElement('div',{className:'doc-paper',style:{width:'auto',minHeight:0,padding:44,background:'transparent',boxShadow:'none',display:'flex',gap:34,flexWrap:'wrap',justifyContent:'center'}},
    // FRONT
    React.createElement('div',{style:{...card,background:t.ink,padding:'0.28in 0.3in',display:'flex',flexDirection:'column',justifyContent:'space-between'}},
      React.createElement('img',{src:t.chief?brand.logoDark:t.logo,style:{height:t.chief?28:40,objectFit:'contain',alignSelf:'flex-start',filter:t.chief?'none':'brightness(0) invert(1)'}}),
      React.createElement('div',{style:{fontFamily:t.fui}},
        React.createElement('div',{style:{fontFamily:t.fd,fontSize:15,fontWeight:t.chief?600:800,color:'#fff',letterSpacing:t.chief?'.04em':'0'}}, v.name),
        React.createElement('div',{style:{fontSize:10,color:brand.accent,letterSpacing:'.06em',textTransform:'uppercase',marginTop:2}}, v.title),
      )
    ),
    // BACK
    React.createElement('div',{style:{...card,background:'#fff',border:`1px solid ${t.hair}`,padding:'0.3in',display:'flex',flexDirection:'column',justifyContent:'center',gap:7}},
      React.createElement('div',{style:{width:34,height:3,background:brand.accent,marginBottom:6}}),
      [['Phone',v.phone||brand.phone],['Email',v.email||brand.email],['Web',v.web||brand.web],['',brand.addr]].map((r,i)=>
        React.createElement('div',{key:i,style:{fontFamily:t.fui,fontSize:10.5,color:t.ink2}},
          r[0]&&React.createElement('span',{style:{color:t.muted,letterSpacing:'.08em',textTransform:'uppercase',fontSize:8.5,marginRight:8}}, r[0]), r[1])),
    )
  );
}

/* ---------------- SOCIAL GRAPHIC ---------------- */
function docSocial(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{width:1080,height:1080,minHeight:0,padding:0,background:t.chief?t.ink:brand.accent,position:'relative',overflow:'hidden',color:'#fff'}},
    React.createElement('div',{style:{position:'absolute',inset:0,background:t.chief?'radial-gradient(circle at 78% 12%, rgba(181,130,63,.28), transparent 46%)':'radial-gradient(circle at 80% 84%, rgba(255,255,255,.12), transparent 50%)'}}),
    React.createElement('div',{style:{position:'relative',height:'100%',padding:96,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}},
      React.createElement('img',{src:t.chief?brand.logoDark:t.logo,style:{height:t.chief?134:150,objectFit:'contain',filter:t.chief?'none':'brightness(0) invert(1)'}}),
      React.createElement('div',{style:{marginTop:'auto'}},
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:26,letterSpacing:'.34em',textTransform:'uppercase',color:t.chief?brand.accent:'rgba(255,255,255,.8)',fontWeight:700,marginBottom:34}}, v.kicker),
        React.createElement('div',{style:{fontFamily:t.fd,fontSize:78,fontWeight:t.chief?700:800,lineHeight:1.06,letterSpacing:t.chief?'.005em':'-.01em',color:'#fff',marginBottom:40}}, v.headline),
        React.createElement('div',{style:{width:110,height:5,background:t.chief?brand.accent:'#fff',margin:'0 auto 40px'}}),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:34,color:'rgba(255,255,255,.9)',lineHeight:1.4,fontWeight:400}}, v.sub),
      ),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:26,color:t.chief?brand.accent:'rgba(255,255,255,.85)',marginTop:60,letterSpacing:'.04em',fontWeight:600}}, v.handle),
    )
  );
}

/* ---------------- LEAD MAGNET / GUIDE ---------------- */
function docLeadMagnet(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{padding:0,fontFamily:t.fdoc,display:'flex',flexDirection:'column'}},
    React.createElement('div',{style:{background:t.chief?t.ink:brand.accent,color:'#fff',padding:`0.6in ${PAD} 0.5in`}},
      React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}},
        React.createElement('img',{src:t.chief?brand.logoDark:t.logo,style:{height:t.chief?30:44,objectFit:'contain',filter:t.chief?'none':'brightness(0) invert(1)'}}),
        React.createElement('span',{style:{fontFamily:t.fui,fontSize:10,letterSpacing:'.24em',textTransform:'uppercase',color:t.chief?brand.accent:'rgba(255,255,255,.85)',fontWeight:700,border:`1px solid ${t.chief?brand.accent:'rgba(255,255,255,.4)'}`,padding:'5px 12px',borderRadius:t.chief?0:20}}, v.kicker)),
      React.createElement('h1',{style:{fontFamily:t.fd,fontSize:t.chief?36:32,fontWeight:t.chief?700:800,lineHeight:1.08,letterSpacing:t.chief?'.005em':'-.01em',color:'#fff',margin:'0 0 12px'}}, v.title),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:14,color:t.chief?'rgba(235,203,148,.92)':'rgba(255,255,255,.82)',lineHeight:1.5,maxWidth:'46ch'}}, v.subtitle)),
    React.createElement('div',{style:{padding:`0.45in ${PAD} 0.3in`,flex:1}},
      React.createElement('p',{style:{fontFamily:t.fdoc,fontSize:13,lineHeight:1.75,color:t.ink2,margin:'0 0 24px'}}, v.intro),
      (v.items||[]).map((it,i)=>React.createElement('div',{key:i,style:{display:'flex',gap:16,marginBottom:16,paddingBottom:16,borderBottom:i<v.items.length-1?`1px solid ${t.hair}`:'none'}},
        React.createElement('div',{style:{width:32,height:32,flex:'none',borderRadius:t.chief?0:20,background:t.soft,color:t.accent,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:t.fd,fontWeight:800,fontSize:14}}, i+1),
        React.createElement('div',null,
          React.createElement('div',{style:{fontFamily:t.fui,fontWeight:700,fontSize:14,color:t.ink1,marginBottom:3}}, it.t),
          React.createElement('div',{style:{fontFamily:t.fdoc,fontSize:12.5,lineHeight:1.6,color:t.ink2}}, it.d)))
      )),
    React.createElement('div',{style:{margin:`4px ${PAD} 0`,background:t.soft,borderLeft:`3px solid ${t.accent}`,padding:'16px 20px',fontFamily:t.fui,fontSize:12.5,lineHeight:1.6,color:t.ink1,fontWeight:600}}, v.cta),
    React.createElement('div',{style:{padding:`14px ${PAD}`,fontFamily:t.fui,fontSize:10.5,letterSpacing:'.06em',color:t.muted,display:'flex',justifyContent:'space-between'}},
      React.createElement('span',null, brand.web), React.createElement('span',null, brand.phone)))
  ;
}

/* ---------------- OUTREACH SEQUENCE ---------------- */
function docOutreach(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    DocHead(brand,t),
    eyebrow('Outreach Sequence',t),
    React.createElement('h1',{style:{fontFamily:t.fd,fontSize:t.chief?28:26,fontWeight:t.chief?700:800,lineHeight:1.1,color:t.ink1,margin:'0 0 16px',letterSpacing:t.chief?'.01em':'-.01em'}}, v.name),
    React.createElement('div',{style:{display:'flex',gap:0,border:`1px solid ${t.hair}`,borderRadius:2,marginBottom:26}},
      [['Audience',v.audience],['Goal',v.goal]].map((r,i)=>React.createElement('div',{key:i,style:{flex:1,padding:'12px 16px',borderRight:i===0?`1px solid ${t.hair}`:'none'}},
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:t.muted,marginBottom:4}}, r[0]),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:12,color:t.ink1,fontWeight:600,lineHeight:1.4}}, r[1]))),
    ),
    (v.steps||[]).map((s,i)=>React.createElement('div',{key:i,style:{marginBottom:16,border:`1px solid ${t.hair}`,borderRadius:2,overflow:'hidden'}},
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',background:t.soft,borderBottom:`1px solid ${t.hair}`}},
        React.createElement('span',{style:{fontFamily:t.fui,fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#fff',background:t.accent,padding:'4px 10px',borderRadius:t.chief?0:12}}, s.day),
        React.createElement('span',{style:{fontFamily:t.fui,fontSize:12.5,fontWeight:700,color:t.ink1}}, 'Subject: ',s.subject)),
      React.createElement('div',{style:{padding:'14px 16px'}}, paras(s.body,{fontFamily:t.fdoc,fontSize:12,lineHeight:1.65,color:t.ink2,margin:'0 0 8px'}))
    )),
    DocFoot(brand,t)
  );
}

/* ---------------- INVOICE ---------------- */
function docInvoice(brand,v){
  const t=bs(brand);
  const num = s => parseFloat(String(s||'').replace(/[^0-9.\-]/g,''))||0;
  const items = v.items||[];
  const subtotal = items.reduce((a,it)=>a+num(it.amt),0);
  const tax = num(v.taxAmt);
  const total = subtotal + tax;
  const money = n => '$'+n.toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:2});
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:30}},
      React.createElement('div',null,
        React.createElement('img',{src:t.logo,style:{height:t.chief?40:56,objectFit:'contain',marginBottom:10}}),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:9.5,color:t.muted,lineHeight:1.7}},
          React.createElement('div',{style:{fontWeight:700,color:t.ink1}}, brand.name),
          React.createElement('div',null, brand.addr), React.createElement('div',null, brand.email))),
      React.createElement('div',{style:{textAlign:'right'}},
        React.createElement('div',{style:{fontFamily:t.fd,fontSize:t.chief?30:28,fontWeight:t.chief?600:800,letterSpacing:t.chief?'.08em':'.01em',textTransform:'uppercase',color:t.accent}}, 'Invoice'),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:11,color:t.muted,marginTop:8,lineHeight:1.9}},
          React.createElement('div',null,'No. ',React.createElement('strong',{style:{color:t.ink1}},v.invoiceNo)),
          React.createElement('div',null,'Issued ',React.createElement('strong',{style:{color:t.ink1}},fmtDate(v.date))),
          React.createElement('div',null,'Terms ',React.createElement('strong',{style:{color:t.ink1}},v.dueDate))))),
    React.createElement('div',{style:{marginBottom:24}},
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:t.muted,marginBottom:6}},'Bill To'),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:13,fontWeight:700,color:t.ink1}}, v.billName),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:12,color:t.ink2}}, v.billCompany),
      paras(v.billAddr,{fontFamily:t.fui,fontSize:11.5,color:t.muted,margin:'2px 0 0',lineHeight:1.5})),
    React.createElement('div',{style:{border:`1px solid ${t.hair}`,borderRadius:2,overflow:'hidden'}},
      React.createElement('div',{style:{display:'flex',justifyContent:'space-between',padding:'10px 16px',background:t.chief?t.ink:brand.accent}},
        React.createElement('span',{style:{fontFamily:t.fui,fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',color:t.chief?brand.accent:'#fff',fontWeight:700}},'Description'),
        React.createElement('span',{style:{fontFamily:t.fui,fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',color:t.chief?brand.accent:'#fff',fontWeight:700}},'Amount')),
      items.map((it,i)=>React.createElement('div',{key:i,style:{display:'flex',justifyContent:'space-between',padding:'12px 16px',borderBottom:`1px solid ${t.hair}`,fontFamily:t.fui}},
        React.createElement('span',{style:{fontSize:12.5,color:t.ink2}}, it.desc),
        React.createElement('span',{style:{fontSize:12.5,fontWeight:600,color:t.ink1}}, it.amt))),
      React.createElement('div',{style:{padding:'12px 16px'}},
        [['Subtotal',money(subtotal),false], v.taxLabel?[v.taxLabel,money(tax),false]:null, ['Total Due',money(total),true]].filter(Boolean).map((r,i)=>
          React.createElement('div',{key:i,style:{display:'flex',justifyContent:'flex-end',gap:40,padding:'4px 0',borderTop:r[2]?`2px solid ${t.accent}`:'none',marginTop:r[2]?8:0,paddingTop:r[2]?10:4}},
            React.createElement('span',{style:{fontFamily:t.fui,fontSize:r[2]?13:11.5,fontWeight:r[2]?700:500,color:r[2]?t.ink1:t.muted,letterSpacing:r[2]?'.02em':0}}, r[0]),
            React.createElement('span',{style:{fontFamily:t.fd,fontSize:r[2]?18:12.5,fontWeight:r[2]?(t.chief?700:800):600,color:r[2]?t.accent:t.ink1,minWidth:90,textAlign:'right'}}, r[1]))))),
    React.createElement('div',{style:{marginTop:22,background:t.soft,borderLeft:`3px solid ${t.accent}`,padding:'12px 16px',fontFamily:t.fui,fontSize:11,lineHeight:1.6,color:t.ink2}},
      React.createElement('strong',{style:{color:t.ink1}},'Payment — '), v.notes),
    DocFoot(brand,t)
  );
}

/* ---------------- PARTNER / TEAM SPOTLIGHT (1080²) ---------------- */
function docPartnerSpotlight(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{width:1080,height:1080,minHeight:0,padding:0,background:t.chief?t.ink:brand.accent,position:'relative',overflow:'hidden',color:'#fff'}},
    React.createElement('div',{style:{position:'absolute',inset:0,background:t.chief?'radial-gradient(circle at 12% 88%, rgba(181,130,63,.26), transparent 46%)':'radial-gradient(circle at 88% 12%, rgba(255,255,255,.12), transparent 50%)'}}),
    React.createElement('div',{style:{position:'relative',height:'100%',padding:88,display:'flex',flexDirection:'column'}},
      React.createElement('div',{style:{textAlign:'center'}},
        React.createElement('img',{src:t.chief?brand.logoDark:t.logo,style:{height:t.chief?120:140,objectFit:'contain',filter:t.chief?'none':'brightness(0) invert(1)'}}),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:20,letterSpacing:'.28em',textTransform:'uppercase',color:t.chief?brand.accent:'rgba(255,255,255,.85)',fontWeight:700,marginTop:12}}, v.stype)),
      React.createElement('div',{style:{display:'flex',gap:52,alignItems:'center',marginTop:'auto'}},
        React.createElement('div',{style:{width:300,height:360,flex:'none',borderRadius:8,border:`2px solid ${t.chief?'rgba(235,203,148,.4)':'rgba(255,255,255,.35)'}`,background:'repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 16px, rgba(255,255,255,.02) 16px 32px)',display:'flex',alignItems:'center',justifyContent:'center'}},
          React.createElement('span',{style:{fontFamily:'ui-monospace,Menlo,monospace',fontSize:16,letterSpacing:'.12em',color:'rgba(255,255,255,.5)'}}, 'HEADSHOT')),
        React.createElement('div',{style:{flex:1}},
          React.createElement('div',{style:{fontFamily:t.fd,fontSize:66,fontWeight:t.chief?700:800,lineHeight:1.05,color:'#fff',letterSpacing:t.chief?'.01em':'-.01em'}}, v.name),
          React.createElement('div',{style:{fontFamily:t.fui,fontSize:26,color:t.chief?brand.accent:'rgba(255,255,255,.9)',fontWeight:600,marginTop:6,marginBottom:26}}, v.role),
          React.createElement('div',{style:{width:90,height:5,background:t.chief?brand.accent:'#fff',marginBottom:26}}),
          React.createElement('div',{style:{fontFamily:t.fd,fontSize:34,fontStyle:t.chief?'italic':'normal',fontWeight:t.chief?500:600,lineHeight:1.3,color:'#fff',marginBottom:22}}, '\u201C',v.quote,'\u201D'),
          React.createElement('div',{style:{fontFamily:t.fui,fontSize:21,lineHeight:1.5,color:'rgba(255,255,255,.82)'}}, v.bio))),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:22,color:t.chief?brand.accent:'rgba(255,255,255,.85)',marginTop:56,letterSpacing:'.02em',fontWeight:600}}, v.tag))
  );
}

/* ---------------- TESTIMONIAL CARD (1080²) ---------------- */
function docSocialQuote(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{width:1080,height:1080,minHeight:0,padding:0,background:'#fff',position:'relative',overflow:'hidden'}},
    React.createElement('div',{style:{position:'absolute',top:0,left:0,right:0,height:14,background:t.accent}}),
    React.createElement('div',{style:{position:'relative',height:'100%',padding:110,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}},
      React.createElement('img',{src:t.logo,style:{height:t.chief?126:146,objectFit:'contain',marginBottom:16}}),
      React.createElement('span',{style:{fontFamily:t.fui,fontSize:22,letterSpacing:'.3em',textTransform:'uppercase',color:t.accent,fontWeight:700}}, v.kicker),
      React.createElement('div',{style:{marginTop:'auto'}},
        React.createElement('div',{style:{fontFamily:t.fd,fontSize:150,lineHeight:.7,color:t.chief?'rgba(181,130,63,.22)':'rgba(30,58,102,.16)',fontWeight:800,height:80}}, '\u201C'),
        React.createElement('div',{style:{fontFamily:t.fd,fontSize:62,fontStyle:t.chief?'italic':'normal',fontWeight:t.chief?500:700,lineHeight:1.22,color:t.ink1,marginBottom:44}}, v.quote),
        React.createElement('div',{style:{width:110,height:5,background:t.accent,margin:'0 auto 26px'}}),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:30,fontWeight:700,color:t.ink1}}, v.author),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:24,color:t.muted,marginTop:4}}, v.authorTitle)),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:20,color:t.muted,marginTop:56,letterSpacing:'.04em'}}, brand.web))
  );
}

/* ---------------- STAT / PROOF CARD (1080²) ---------------- */
function docSocialStat(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{width:1080,height:1080,minHeight:0,padding:0,background:t.chief?t.ink:brand.accent,position:'relative',overflow:'hidden',color:'#fff'}},
    React.createElement('div',{style:{position:'absolute',inset:0,background:t.chief?'radial-gradient(circle at 50% 0%, rgba(181,130,63,.3), transparent 55%)':'radial-gradient(circle at 50% 100%, rgba(255,255,255,.13), transparent 55%)'}}),
    React.createElement('div',{style:{position:'relative',height:'100%',padding:96,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}},
      React.createElement('img',{src:t.chief?brand.logoDark:t.logo,style:{height:t.chief?128:146,objectFit:'contain',filter:t.chief?'none':'brightness(0) invert(1)'}}),
      React.createElement('div',{style:{margin:'auto 0'}},
        React.createElement('div',{style:{fontFamily:t.fd,fontSize:216,fontWeight:800,lineHeight:.9,letterSpacing:'-.01em',color:t.chief?brand.accent:'#fff'}}, v.statValue),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:36,letterSpacing:'.08em',textTransform:'uppercase',color:'#fff',fontWeight:600,marginTop:14}}, v.statLabel),
        React.createElement('div',{style:{width:120,height:5,background:t.chief?brand.accent:'#fff',margin:'40px auto'}}),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:30,lineHeight:1.5,color:'rgba(255,255,255,.9)',maxWidth:'22ch',margin:'0 auto',fontWeight:400}}, v.context)),
      React.createElement('div',{style:{fontFamily:t.fui,fontSize:24,color:t.chief?brand.accent:'rgba(255,255,255,.85)',letterSpacing:'.04em',fontWeight:600}}, v.handle))
  );
}

/* ---------------- BRAND GUIDELINES ---------------- */
function docBrandGuidelines(brand,v){
  const t=bs(brand);
  return React.createElement('div',{className:'doc-paper',style:{padding:PAD,paddingBottom:'1.1in',fontFamily:t.fdoc}},
    DocHead(brand,t),
    eyebrow('Brand Guidelines',t),
    React.createElement('h1',{style:{fontFamily:t.fd,fontSize:t.chief?30:28,fontWeight:t.chief?700:800,color:t.ink1,margin:'0 0 6px',letterSpacing:t.chief?'.01em':'-.01em'}}, brand.name),
    React.createElement('div',{style:{fontFamily:t.fui,fontSize:12,color:t.muted,marginBottom:26}}, brand.tagline),
    secH('Logo',t),
    React.createElement('div',{style:{display:'flex',gap:14,marginBottom:26}},
      React.createElement('div',{style:{flex:1,background:'#fff',border:`1px solid ${t.hair}`,borderRadius:2,padding:'26px',display:'flex',alignItems:'center',justifyContent:'center',minHeight:110}},
        React.createElement('img',{src:brand.logoLight,style:{maxHeight:60,maxWidth:'80%',objectFit:'contain'}})),
      React.createElement('div',{style:{flex:1,background:t.ink,borderRadius:2,padding:'26px',display:'flex',alignItems:'center',justifyContent:'center',minHeight:110}},
        React.createElement('img',{src:brand.logoDark,style:{maxHeight:60,maxWidth:'80%',objectFit:'contain',filter:brand.id==='ssp'?'brightness(0) invert(1)':'none'}}))),
    secH('Color',t),
    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,marginBottom:26}},
      (brand.palette||[]).map((c,i)=>React.createElement('div',{key:i},
        React.createElement('div',{style:{height:56,borderRadius:2,background:c.hx,border:'1px solid rgba(0,0,0,.08)'}}),
        React.createElement('div',{style:{fontFamily:t.fui,fontSize:10,fontWeight:700,color:t.ink1,marginTop:6}}, c.nm),
        React.createElement('div',{style:{fontFamily:'ui-monospace,Menlo,monospace',fontSize:9,color:t.muted,textTransform:'uppercase'}}, c.hx)))),
    secH('Typography',t),
    React.createElement('div',{style:{marginBottom:26}},
      (brand.fonts||[]).map((f,i)=>React.createElement('div',{key:i,style:{display:'flex',alignItems:'baseline',gap:16,padding:'10px 0',borderBottom:i<brand.fonts.length-1?`1px solid ${t.hair}`:'none'}},
        React.createElement('div',{style:{width:130,flex:'none',fontFamily:t.fui,fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',color:t.muted}}, f.role),
        React.createElement('div',{style:{fontFamily:f.css,fontSize:24,color:t.ink1}}, f.name),
        React.createElement('div',{style:{marginLeft:'auto',fontFamily:f.css,fontSize:15,color:t.ink2}}, 'Aa Bb Cc 0123')))),
    secH('Voice & Tone',t),
    React.createElement('p',{style:{fontFamily:t.fdoc,fontSize:13,lineHeight:1.7,color:t.ink2,margin:'0 0 20px'}}, brand.voice),
    secH('Usage',t),
    React.createElement('p',{style:{fontFamily:t.fdoc,fontSize:12.5,lineHeight:1.7,color:t.ink2,margin:0}}, v.usage),
    DocFoot(brand,t)
  );
}

const RENDERERS = {
  proposal:docProposal, agreement:docAgreement, letterhead:docLetterhead,
  one_pager:docOnePager, case_study:docCaseStudy, sop:docSOP,
  email_signature:docEmailSig, email_template:docEmailTemplate,
  business_card:docBusinessCard, social_graphic:docSocial,
  mnda:docMNDA,
  lead_magnet:docLeadMagnet, outreach_sequence:docOutreach, invoice:docInvoice,
  partner_spotlight:docPartnerSpotlight, social_quote:docSocialQuote,
  social_stat:docSocialStat, brand_guidelines:docBrandGuidelines,
};
function renderDoc(tplId, brand, values){
  const fn = RENDERERS[tplId];
  if(!fn) return React.createElement('div',{style:{padding:60}},'No renderer');
  return fn(brand, values||{});
}
window.HUBDOCS = { renderDoc };

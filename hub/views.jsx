/* ============================================================
   views.jsx — Home, Gallery, Assets, Launcher
   exposes window.HUBVIEWS
   ============================================================ */
const { useState:vUseState, useEffect:vUseEffect, useRef:vUseRef } = React;

function useElWidth(){
  const ref = vUseRef(null);
  const [w,setW] = vUseState(300);
  vUseEffect(()=>{
    const calc=()=>{ if(ref.current) setW(ref.current.clientWidth); };
    calc(); const ro=new ResizeObserver(calc); if(ref.current) ro.observe(ref.current);
    return ()=>ro.disconnect();
  },[]);
  return [ref,w];
}

function timeAgo(ts){
  const s=(Date.now()-ts)/1000;
  if(s<60) return 'just now';
  if(s<3600) return Math.floor(s/60)+'m ago';
  if(s<86400) return Math.floor(s/3600)+'h ago';
  return Math.floor(s/86400)+'d ago';
}
function tplById(id){ return window.HUB.TEMPLATES.find(t=>t.id===id); }

/* ---- template thumbnail (scaled live doc) ---- */
function TemplateThumb({ tpl, brand }){
  const [ref,w] = useElWidth();
  const docW = ({social_graphic:1080,partner_spotlight:1080,social_quote:1080,social_stat:1080,email_template:640,email_signature:600,business_card:794})[tpl.id]||816;
  const scale = w/docW;
  const doc = window.HUBDOCS.renderDoc(tpl.id, brand, window.HUB.defaultsFor(tpl, brand.id));
  return React.createElement('div',{className:'tpl-thumb',ref},
    React.createElement('span',{className:'tpl-cat'}, tpl.cat),
    React.createElement('div',{className:'mini',style:{width:docW,transform:`scale(${scale})`}}, doc)
  );
}

function TemplateCard({ tpl, brand, onOpen }){
  return React.createElement('div',{className:'card tpl-card',onClick:()=>onOpen(tpl.id)},
    React.createElement(TemplateThumb,{tpl,brand}),
    React.createElement('div',{className:'tpl-body'},
      React.createElement('h3',null, tpl.name),
      React.createElement('p',null, tpl.desc),
      React.createElement('div',{className:'tpl-foot'},
        React.createElement('span',{className:'chip chip-both'}, tpl.cat),
        React.createElement('span',{style:{marginLeft:'auto',color:'var(--accent)',fontSize:12,fontWeight:600,display:'inline-flex',alignItems:'center',gap:4}},'Use', React.createElement(Icon,{name:'arrow',size:13}))
      )
    )
  );
}

/* ---------------- HOME ---------------- */
function Home({ brand, drafts, user, onOpenTemplate, onOpenDraft, setView }){
  const quick = [
    {id:'proposal',t:'New Proposal',s:'Scope, pricing & terms',ic:'briefcase'},
    {id:'agreement',t:'New Agreement',s:'NDA · MSA · Service',ic:'contract'},
    {id:'one_pager',t:'One-Pager',s:'Capabilities sheet',ic:'file'},
    {id:'email_template',t:'Email',s:'Branded outreach',ic:'mail'},
  ];
  const saved = drafts.filter(d=>d.status==='saved').length;
  const inDraft = drafts.filter(d=>d.status==='draft').length;
  const recent = [...drafts].sort((a,b)=>b.updated-a.updated).slice(0,6);
  return React.createElement('div',{className:'content'},
    React.createElement('div',{className:'pagehead'},
      React.createElement('div',{className:'eyebrow'}, 'Document Hub · ',brand.short),
      React.createElement('h1',null, 'Welcome back, ',user.split(' ')[0],'.'),
      React.createElement('p',null, 'Every branded document your team needs — create, edit, and send on ',brand.name,' letterhead in minutes.')
    ),
    React.createElement('div',{className:'stat-row'},
      [['files',window.HUB.TEMPLATES.length,'Branded templates'],
       ['layers',drafts.length,'Documents in hub'],
       ['check',saved,'Saved'],
       ['file',inDraft,'In draft']].map((s,i)=>React.createElement('div',{className:'stat',key:i},
         React.createElement('div',{className:'ic'}, React.createElement(Icon,{name:s[0],size:18})),
         React.createElement('div',{className:'v'}, s[1]),
         React.createElement('div',{className:'l'}, s[2])))
    ),
    React.createElement('div',{className:'sec-title'}, React.createElement('h2',null,'Start something new'),
      React.createElement('a',{onClick:()=>setView('gallery')},'Browse all templates \u2192')),
    React.createElement('div',{className:'quicklaunch'},
      quick.map(q=>React.createElement('button',{className:'ql',key:q.id,onClick:()=>onOpenTemplate(q.id)},
        React.createElement('div',{className:'ic'}, React.createElement(Icon,{name:q.ic,size:20})),
        React.createElement('div',null,
          React.createElement('div',{className:'t'}, q.t),
          React.createElement('div',{className:'s'}, q.s)))),
    ),
    React.createElement('div',{className:'sec-title'}, React.createElement('h2',null,'Recent documents'),
      React.createElement('a',{onClick:()=>setView('recent')},'View all \u2192')),
    recent.length ? React.createElement('div',{className:'drafts'},
      recent.map(d=>React.createElement(DraftRow,{key:d.id, d, onOpen:onOpenDraft}))
    ) : React.createElement('div',{className:'card empty'}, React.createElement(Icon,{name:'files',size:40}),
        React.createElement('div',null,'No documents yet — start one above.'))
  );
}

function DraftRow({ d, onOpen }){
  const tpl = tplById(d.tpl); const b = window.HUB.BRANDS[d.brand];
  return React.createElement('div',{className:'draft-row',onClick:()=>onOpen(d)},
    React.createElement('div',{className:'dt'},
      React.createElement('div',{className:'di'}, React.createElement(Icon,{name:tpl?tpl.icon:'file',size:17})),
      React.createElement('div',{style:{minWidth:0}},
        React.createElement('div',{className:'dn'}, d.title),
        React.createElement('div',{className:'dm'}, tpl?tpl.name:''))),
    React.createElement('div',{className:'meta'}, React.createElement('span',{className:'bpill '+d.brand}, b?b.short:d.brand)),
    React.createElement('div',null, React.createElement('span',{className:'badge '+d.status}, d.status.charAt(0).toUpperCase()+d.status.slice(1))),
    React.createElement('div',{className:'meta'}, timeAgo(d.updated)),
    React.createElement('div',{className:'rowmenu'}, React.createElement(Icon,{name:'chevright',size:16}))
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery({ brand, query, onOpenTemplate }){
  const [cat,setCat] = vUseState('All');
  const cats = ['All', ...window.HUB.CATS];
  let list = window.HUB.TEMPLATES;
  if(cat!=='All') list = list.filter(t=>t.cat===cat);
  if(query) { const q=query.toLowerCase(); list = list.filter(t=> t.name.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.cat.toLowerCase().includes(q)); }
  return React.createElement('div',{className:'content'},
    React.createElement('div',{className:'pagehead'},
      React.createElement('div',{className:'eyebrow'},'Template Library'),
      React.createElement('h1',null,'Branded documents'),
      React.createElement('p',null,'Pick a template — it opens pre-styled for ',React.createElement('strong',null,brand.name),'. Fill the fields, and it stays on-brand automatically.')),
    React.createElement('div',{className:'filterbar'},
      cats.map(c=>React.createElement('button',{key:c,className:'fpill'+(cat===c?' on':''),onClick:()=>setCat(c)}, c))),
    list.length ? React.createElement('div',{className:'grid g-auto'},
      list.map(t=>React.createElement(TemplateCard,{key:t.id, tpl:t, brand, onOpen:onOpenTemplate}))
    ) : React.createElement('div',{className:'card empty'}, React.createElement(Icon,{name:'search',size:40}),
        React.createElement('div',null,'No templates match “',query,'”.'))
  );
}

/* ---------------- RECENT (all docs) ---------------- */
function Recent({ drafts, query, onOpenDraft }){
  let list = [...drafts].sort((a,b)=>b.updated-a.updated);
  if(query){ const q=query.toLowerCase(); list=list.filter(d=>d.title.toLowerCase().includes(q)); }
  return React.createElement('div',{className:'content'},
    React.createElement('div',{className:'pagehead'},
      React.createElement('div',{className:'eyebrow'},'Library'),
      React.createElement('h1',null,'Document Library'),
      React.createElement('p',null,'Every document saved across the company — open any of them to pick up where you left off.')),
    list.length ? React.createElement('div',{className:'drafts'},
      list.map(d=>React.createElement(DraftRow,{key:d.id, d, onOpen:onOpenDraft}))
    ) : React.createElement('div',{className:'card empty'}, React.createElement(Icon,{name:'files',size:40}), React.createElement('div',null,'Nothing here yet.'))
  );
}

/* ---------------- ASSETS ---------------- */
function Assets({ brand, showToast }){
  const copy=(hx)=>{ navigator.clipboard?.writeText(hx); showToast(hx+' copied','copy'); };
  return React.createElement('div',{className:'content'},
    React.createElement('div',{className:'pagehead'},
      React.createElement('div',{className:'eyebrow'},'Brand Assets · ',brand.short),
      React.createElement('h1',null,'Brand kit'),
      React.createElement('p',null,'Logos, colors, and type for ',brand.name,'. Download marks and copy color values for on-brand work anywhere.')),
    React.createElement('div',{className:'assets-grid'},
      // logos
      React.createElement('div',{className:'asset-card'},
        React.createElement('div',{className:'ah'}, React.createElement('h3',null,'Primary logo'),
          React.createElement('a',{className:'btn btn-ghost btn-sm',href:brand.logoLight,download:true}, React.createElement(Icon,{name:'download',size:14}),'PNG')),
        React.createElement('div',{className:'asset-preview on-light'}, React.createElement('img',{src:brand.logoLight}))),
      React.createElement('div',{className:'asset-card'},
        React.createElement('div',{className:'ah'}, React.createElement('h3',null,'Logo on dark'),
          React.createElement('a',{className:'btn btn-ghost btn-sm',href:brand.logoDark,download:true}, React.createElement(Icon,{name:'download',size:14}),'PNG')),
        React.createElement('div',{className:'asset-preview on-dark'}, React.createElement('img',{src:brand.logoDark, style: brand.id==='ssp'?{filter:'brightness(0) invert(1)'}:{}}))),
      // colors
      React.createElement('div',{className:'asset-card',style:{gridColumn:'span 2'}},
        React.createElement('div',{className:'ah'}, React.createElement('h3',null,'Color palette'),
          React.createElement('span',{style:{fontSize:12,color:'var(--muted)'}},'Click to copy')),
        React.createElement('div',{className:'swatches'},
          brand.palette.map((c,i)=>React.createElement('div',{className:'swatch',key:i,onClick:()=>copy(c.hx)},
            React.createElement('span',{className:'chip',style:{background:c.hx}}),
            React.createElement('div',{className:'nm'}, c.nm),
            React.createElement('div',{className:'hx'}, c.hx))))),
      // fonts
      React.createElement('div',{className:'asset-card',style:{gridColumn:'span 2'}},
        React.createElement('div',{className:'ah'}, React.createElement('h3',null,'Typography')),
        brand.fonts.map((f,i)=>React.createElement('div',{className:'fontrow',key:i},
          React.createElement('div',{className:'fn'}, f.role,' · ',f.name),
          React.createElement('div',{className:'fs-',style:{fontFamily:f.css}}, 'Command every table. 0123'))) ),
      // voice
      React.createElement('div',{className:'asset-card',style:{gridColumn:'span 2'}},
        React.createElement('div',{className:'ah'}, React.createElement('h3',null,'Voice & tone')),
        React.createElement('div',{style:{padding:'18px'}},
          React.createElement('p',{style:{margin:0,color:'var(--muted)',fontSize:14,lineHeight:1.7}}, brand.voice)))
    )
  );
}

/* ---------------- LAUNCHER MODAL ---------------- */
function Launcher({ brand, onClose, onOpenTemplate }){
  const [q,setQ] = vUseState('');
  let list = window.HUB.TEMPLATES;
  if(q){ const s=q.toLowerCase(); list=list.filter(t=>t.name.toLowerCase().includes(s)||t.cat.toLowerCase().includes(s)); }
  return React.createElement('div',{className:'overlay',onClick:onClose},
    React.createElement('div',{className:'launcher',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'lh'},
        React.createElement('h2',null,'Create a document'),
        React.createElement('p',null,'Starting in ',React.createElement('strong',null,brand.name),' branding.')),
      React.createElement('div',{className:'lsearch'},
        React.createElement(Icon,{name:'search',size:17}),
        React.createElement('input',{autoFocus:true,placeholder:'Search templates…',value:q,onChange:e=>setQ(e.target.value)})),
      React.createElement('div',{className:'llist'},
        list.map(t=>React.createElement('div',{className:'lopt',key:t.id,onClick:()=>onOpenTemplate(t.id)},
          React.createElement('div',{className:'ic'}, React.createElement(Icon,{name:t.icon,size:18})),
          React.createElement('div',null,
            React.createElement('div',{className:'t'}, t.name),
            React.createElement('div',{className:'s'}, t.desc)),
          React.createElement('div',{className:'cat'}, t.cat))))
    )
  );
}

window.HUBVIEWS = { Home, Gallery, Recent, Assets, Launcher };

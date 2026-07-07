/* ============================================================
   editor.jsx — document editor (form + live preview + save/print/send)
   exposes window.HUBEDITOR.Editor
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

const DOC_WIDTH = { social_graphic:1080, partner_spotlight:1080, social_quote:1080, social_stat:1080, email_template:640, email_signature:600, business_card:794 };
function widthFor(id){ return DOC_WIDTH[id] || 816; }

function TextField({ f, value, onChange }){
  const common = { value:value??'', onChange:e=>onChange(e.target.value), placeholder:f.ph||'' };
  return React.createElement('div',{className:'fld'},
    React.createElement('label',null, f.label),
    f.type==='textarea' ? React.createElement('textarea',{...common, rows:4})
    : f.type==='select' ? React.createElement('select',{value:value??'',onChange:e=>onChange(e.target.value)}, (f.options||[]).map(o=>React.createElement('option',{key:o,value:o},o)))
    : React.createElement('input',{type:f.type==='date'?'date':(f.type==='number'?'number':'text'), ...common}),
    f.hint && React.createElement('div',{className:'hint'}, f.hint)
  );
}

function ListField({ f, value, onChange }){
  const rows = Array.isArray(value)?value:[];
  const setRow = (i,k,val)=>{ const nx=rows.map((r,ri)=> ri===i?{...r,[k]:val}:r); onChange(nx); };
  const addRow = ()=>{ const blank={}; f.cols.forEach(c=>blank[c.k]=''); onChange([...rows,blank]); };
  const delRow = (i)=> onChange(rows.filter((_,ri)=>ri!==i));
  return React.createElement('div',{className:'fld'},
    React.createElement('label',null, f.label),
    React.createElement('div',{className:'listrows'},
      rows.map((r,i)=>React.createElement('div',{className:'listrow',key:i},
        React.createElement('button',{className:'del',onClick:()=>delRow(i),title:'Remove'}, React.createElement(Icon,{name:'x',size:14})),
        f.cols.map(c=>React.createElement('div',{className:'rr',key:c.k},
          c.type==='textarea'
            ? React.createElement('textarea',{rows:2,placeholder:c.label,value:r[c.k]??'',onChange:e=>setRow(i,c.k,e.target.value),style:{fontSize:12.5}})
            : React.createElement('input',{type:'text',placeholder:c.label,value:r[c.k]??'',onChange:e=>setRow(i,c.k,e.target.value),style:{fontSize:12.5}})
        ))
      )),
      React.createElement('button',{className:'addrow',onClick:addRow}, React.createElement(Icon,{name:'plus',size:14}), 'Add ',f.label.toLowerCase())
    )
  );
}

async function logoDataURL(url, maxW){
  const img=new Image(); img.crossOrigin='anonymous';
  await new Promise((res,rej)=>{ img.onload=res; img.onerror=rej; img.src=url; });
  const scale=Math.min(1, maxW/(img.naturalWidth||maxW));
  const w=Math.round((img.naturalWidth||maxW)*scale), h=Math.round((img.naturalHeight||maxW)*scale);
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  c.getContext('2d').drawImage(img,0,0,w,h);
  return c.toDataURL('image/png');
}
function buildSignatureHTML(brand, v, logoOverride){
  const acc=brand.accent, ink='#1c1a15', muted='#888';
  const logo = logoOverride || new URL(brand.docLogo, location.href).href;
  const web = v.web||brand.web;
  return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse"><tr>`+
    `<td style="padding-right:22px;border-right:2px solid ${acc};vertical-align:middle">`+
    `<img src="${logo}" alt="${brand.name}" style="height:60px;width:auto;display:block" /></td>`+
    `<td style="padding-left:22px;vertical-align:middle;font-size:12px;color:#444;line-height:1.6">`+
    `<div style="font-size:16px;font-weight:bold;color:${ink}">${v.name||''}</div>`+
    `<div style="font-size:12px;color:${acc};font-weight:bold;margin:2px 0 6px">${v.title||''}</div>`+
    (v.phone?`<div>${v.phone}</div>`:``)+
    `<div>${v.email||brand.email}</div>`+
    `<div><a href="https://${web}" style="color:${acc};text-decoration:none">${web}</a></div>`+
    (v.tagline?`<div style="font-size:11px;font-style:italic;color:${muted};margin-top:5px">${v.tagline}</div>`:``)+
    `</td></tr></table>`;
}

function Editor({ draft, template, brand, onSave, onBack, showToast }){
  const [title,setTitle] = useState(draft.title);
  const baseDefaults = window.HUB.defaultsFor(template, brand.id);
  const [values,setValues] = useState(()=> draft.values ? {...baseDefaults, ...draft.values} : {...baseDefaults});
  const [status,setStatus] = useState(draft.status||'draft');
  const [saved,setSaved] = useState(true);
  const [zoom,setZoom] = useState(1);
  const [fit,setFit] = useState(0.7);
  const regionRef = useRef(null);
  const saveTimer = useRef(null);

  const setVal = (k,val)=> setValues(p=>({...p,[k]:val}));

  // autosave
  useEffect(()=>{
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(()=>{
      onSave({ ...draft, title, values, status, updated:Date.now() });
      setSaved(true);
    }, 600);
    return ()=> clearTimeout(saveTimer.current);
  }, [title, values, status]);

  // fit-to-width
  useEffect(()=>{
    const calc = ()=>{
      if(!regionRef.current) return;
      const w = regionRef.current.clientWidth - 72;
      setFit(Math.min(1.1, Math.max(0.28, w / widthFor(template.id))));
    };
    calc();
    const ro = new ResizeObserver(calc); if(regionRef.current) ro.observe(regionRef.current);
    return ()=> ro.disconnect();
  }, [template.id]);

  const scale = fit * zoom;
  const doPrint = ()=>{
    const stage = regionRef.current && regionRef.current.querySelector('.pv-stage');
    const papers = stage ? [...stage.querySelectorAll('.doc-paper')] : [];
    if(!papers.length){ window.print(); return; }
    const w = Math.round(papers[0].offsetWidth), h = Math.round(papers[0].offsetHeight);
    const parts = papers.map(p=>{
      const clone = p.cloneNode(true);
      const srcImgs = p.querySelectorAll('img'), dstImgs = clone.querySelectorAll('img');
      dstImgs.forEach((img,i)=>{ if(srcImgs[i]) img.setAttribute('src', srcImgs[i].currentSrc || srcImgs[i].src); });
      clone.style.boxShadow='none'; clone.style.margin='0';
      return clone.outerHTML;
    });
    const fontImport = "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600;700&family=Archivo:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600;700&display=swap');";
    const win = window.open('', '_blank');
    if(!win){ // popup blocked → fall back to in-page print
      document.body.classList.add('is-printing');
      setTimeout(()=>{ try{ window.print(); }catch(e){} document.body.classList.remove('is-printing'); }, 60);
      return;
    }
    const docHTML =
      '<!doctype html><html><head><meta charset="utf-8"><title>'+(title||'Document')+'</title><style>'+
      fontImport+
      '*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}'+
      'html,body{margin:0;padding:0;background:#fff;}'+
      '.doc-paper{width:'+w+'px;min-height:'+h+'px;background:#fff;color:#1a1a1a;position:relative;overflow:hidden;}'+
      '.doc-paper + .doc-paper{page-break-before:always;}'+
      '@page{size:'+w+'px '+h+'px;margin:0;}'+
      '</style></head><body>'+parts.join('')+
      '<scr'+'ipt>(function(){function go(){setTimeout(function(){window.focus();window.print();},250);}'+
      'if(document.fonts&&document.fonts.ready){document.fonts.ready.then(go);setTimeout(go,1200);}else{window.onload=go;}})();</scr'+'ipt>'+
      '</body></html>';
    win.document.open(); win.document.write(docHTML); win.document.close();
  };
  const copySig = async ()=>{
    // Embed the logo inline (base64) so the signature travels self-contained — no external URL to break.
    let logoSrc;
    try{ logoSrc = await logoDataURL(new URL(brand.docLogo, location.href).href, 520); }
    catch(e){ logoSrc = new URL(brand.docLogo, location.href).href; }
    const html = buildSignatureHTML(brand,values,logoSrc);
    // Primary: select a rendered richtext block and copy — pastes formatted (logo + layout) in Gmail/Outlook.
    try{
      const holder=document.createElement('div');
      holder.contentEditable='true'; holder.innerHTML=html;
      holder.style.cssText='position:fixed;left:0;top:0;opacity:0;pointer-events:none;white-space:normal';
      document.body.appendChild(holder);
      const range=document.createRange(); range.selectNodeContents(holder);
      const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      const ok=document.execCommand('copy');
      sel.removeAllRanges(); holder.remove();
      if(ok){ showToast('Signature copied \u2014 paste into your email signature settings','copy'); return; }
    }catch(e){}
    // Fallback: modern async clipboard with HTML + plain text
    try{
      if(navigator.clipboard && window.ClipboardItem){
        await navigator.clipboard.write([ new ClipboardItem({
          'text/html': new Blob([html],{type:'text/html'}),
          'text/plain': new Blob([html],{type:'text/plain'})
        }) ]);
        showToast('Signature copied \u2014 paste into your email signature settings','copy');
        return;
      }
    }catch(e){}
    showToast('Copy blocked by browser \u2014 try again','x');
  };

  const doc = window.HUBDOCS.renderDoc(template.id, brand, values);

  return React.createElement('div',{className:'editor'},
    // ---- FORM ----
    React.createElement('div',{className:'ed-form no-print'},
      React.createElement('div',{className:'ed-formhead'},
        React.createElement('button',{className:'ed-back',onClick:onBack}, React.createElement(Icon,{name:'back',size:15}),'All documents'),
        React.createElement('input',{className:'ed-title-in',value:title,onChange:e=>setTitle(e.target.value)}),
        React.createElement('div',{className:'ed-sub'}, template.name,' · ',
          React.createElement('span',{className:'bpill '+brand.id,style:{marginLeft:4}}, brand.short))
      ),
      React.createElement('div',{className:'ed-fields'},
        template.fields.map((grp,gi)=>React.createElement('div',{className:'fs',key:gi},
          React.createElement('div',{className:'fs-h'}, grp.g),
          grp.f.map(f=> f.type==='list'
            ? React.createElement(ListField,{key:f.k, f, value:values[f.k], onChange:val=>setVal(f.k,val)})
            : React.createElement(TextField,{key:f.k, f, value:values[f.k], onChange:val=>setVal(f.k,val)})
          )
        ))
      ),
      React.createElement('div',{className:'ed-actions'},
        React.createElement('span',{className:'saved'+(saved?' on':'')}, React.createElement(Icon,{name:saved?'check':'clock',size:13}), saved?'Saved':'Saving\u2026'),
        template.id==='email_signature' && React.createElement('button',{className:'btn btn-ghost btn-sm',onClick:copySig}, React.createElement(Icon,{name:'copy',size:14}),'Copy'),
        React.createElement('button',{className:'btn btn-primary btn-sm',onClick:doPrint}, React.createElement(Icon,{name:'download',size:14}),'Save as PDF')
      )
    ),
    // ---- PREVIEW ----
    React.createElement('div',{className:'ed-preview',ref:regionRef},
      React.createElement('div',{className:'ed-pv-bar no-print'},
        React.createElement('span',{style:{fontFamily:'var(--font-ui)',fontSize:12.5,color:'var(--muted)',fontWeight:500}}, 'Live preview'),
        React.createElement('select',{value:status,onChange:e=>setStatus(e.target.value),style:{fontSize:12,padding:'6px 10px',border:'1px solid var(--line)',borderRadius:7,background:'var(--card)',color:'var(--text)'}},
          React.createElement('option',{value:'draft'},'Draft'),
          React.createElement('option',{value:'saved'},'Saved')),
        React.createElement('div',{className:'zoom'},
          React.createElement('button',{onClick:()=>setZoom(z=>Math.max(.5,z-.1))}, React.createElement(Icon,{name:'zout',size:15})),
          React.createElement('span',null, Math.round(scale*100)+'%'),
          React.createElement('button',{onClick:()=>setZoom(z=>Math.min(2,z+.1))}, React.createElement(Icon,{name:'zin',size:15})),
        )
      ),
      React.createElement('div',{className:'pv-scroll'},
        React.createElement('div',{className:'pv-stage print-region',style:{transform:`scale(${scale})`,width:widthFor(template.id)}}, doc)
      )
    )
  );
}

window.HUBEDITOR = { Editor };

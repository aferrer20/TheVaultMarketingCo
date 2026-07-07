/* ============================================================
   app.jsx — auth gate, shell, nav, brand switch, routing, drafts
   ============================================================ */
const { useState:aUseState, useEffect:aUseEffect } = React;
const LS_BRAND='tvhub_brand_v1', LS_DRAFTS='tvhub_drafts_v1', LS_USER='tvhub_user_v1';
const SB = window.SUPA || { enabled:false };
const USE_SUPA = !!SB.enabled;

function loadDrafts(){
  try{ const r=JSON.parse(localStorage.getItem(LS_DRAFTS)); if(Array.isArray(r)&&r.length) return r.map(migrateStatus); }catch(e){}
  return window.HUB.SEED_DRAFTS.map(d=>({...d}));
}
function migrateStatus(d){ return { ...d, status: (d.status==='draft' ? 'draft' : 'saved') }; }
function loadUser(){
  try{ const id=localStorage.getItem(LS_USER); return window.HUB.USERS.find(u=>u.id===id)||null; }catch(e){ return null; }
}
function newId(){ return USE_SUPA && window.crypto && crypto.randomUUID ? crypto.randomUUID() : 'd'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }

/* ---------------- LOGIN ---------------- */
function Login({ onSubmit }){
  const [email,setEmail] = aUseState('');
  const [pass,setPass]   = aUseState('');
  const [err,setErr]     = aUseState('');
  const [busy,setBusy]   = aUseState(false);
  const submit = async (e)=>{
    e.preventDefault();
    if(busy) return;
    setBusy(true); setErr('');
    const msg = await onSubmit(email, pass);
    if(msg){ setErr(msg); setBusy(false); }
    // on success the auth listener swaps the view; no need to reset busy
  };
  return React.createElement('div',{className:'login-wrap'},
    React.createElement('div',{className:'login-panel'},
      React.createElement('div',{className:'login-brand'},
        React.createElement('div',{className:'login-mark'},'TV'),
        React.createElement('div',null,
          React.createElement('div',{className:'login-co'},'The Vault Marketing Co'),
          React.createElement('div',{className:'login-sub'},'Document Hub'))),
      React.createElement('h1',{className:'login-h'},'Sign in'),
      React.createElement('p',{className:'login-note'},'Access is limited to the workspace you’re registered under.'),
      React.createElement('form',{className:'login-form',onSubmit:submit},
        React.createElement('label',null,'Work email',
          React.createElement('input',{type:'email',value:email,autoFocus:true,placeholder:'you@company.com',onChange:e=>{setEmail(e.target.value);setErr('');}})),
        React.createElement('label',null,'Password',
          React.createElement('input',{type:'password',value:pass,placeholder:'••••••••',onChange:e=>{setPass(e.target.value);setErr('');}})),
        err && React.createElement('div',{className:'login-err'}, err),
        React.createElement('button',{className:'btn btn-primary btn-lg login-btn',type:'submit',disabled:busy}, busy?'Signing in…':'Sign in')),
      React.createElement('p',{className:'login-help'},'Trouble signing in? Contact your workspace administrator.'))
  );
}

function Sidebar({ me, brand, brandId, myBrands, setBrand, view, setView, draftCount, editing, onLogout }){
  const B = window.HUB.BRANDS;
  const multi = myBrands.length > 1;
  const nav = [
    {v:'home',label:'Home',ic:'home'},
    {v:'gallery',label:'Templates',ic:'grid'},
    {v:'recent',label:'Document Library',ic:'files',cnt:draftCount},
    {v:'assets',label:'Brand Assets',ic:'palette'},
  ];
  return React.createElement('aside',{className:'sidebar no-print'},
    React.createElement('div',{className:'sb-brandcard'},
      React.createElement('div',{className:'sb-logochip'}, React.createElement('img',{src:brand.logoLight,alt:brand.name})),
      React.createElement('div',{className:'sb-brandmeta'},
        React.createElement('div',{className:'bn'}, brand.short),
        React.createElement('div',{className:'bt'}, brand.tagline))),
    React.createElement('div',{className:'sb-switch'},
      React.createElement('div',{className:'sb-switch-label'}, multi ? 'Active workspace' : 'Workspace'),
      multi
        ? React.createElement('div',{className:'brandtoggle'},
            myBrands.map(id=>React.createElement('button',{key:id,className:brandId===id?'on':'',onClick:()=>setBrand(id)}, B[id].short)))
        : React.createElement('div',{className:'sb-locked'},
            React.createElement(Icon,{name:'idcard',size:14}),
            React.createElement('span',null, brand.short))),
    React.createElement('nav',{className:'sb-nav'},
      React.createElement('div',{className:'grp'},'Workspace'),
      nav.map(n=>React.createElement('button',{key:n.v,className:'navitem'+((view===n.v&&!editing)?' on':''),onClick:()=>setView(n.v)},
        React.createElement(Icon,{name:n.ic,size:18}),
        React.createElement('span',null,n.label),
        n.cnt!=null && React.createElement('span',{className:'cnt'},n.cnt)))),
    React.createElement('div',{className:'sb-foot'},
      React.createElement('div',{className:'sb-user'},
        React.createElement('div',{className:'av'}, me.name.split(' ').map(x=>x[0]).join('').slice(0,2)),
        React.createElement('div',{className:'sb-user-meta'},
          React.createElement('div',{className:'nm'}, me.name),
          React.createElement('div',{className:'rl'}, me.role==='founder' ? 'Founder' : brand.short, ' · ', me.title)),
        React.createElement('button',{className:'sb-logout',title:'Sign out',onClick:onLogout}, React.createElement(Icon,{name:'back',size:16}))))
  );
}

function Topbar({ query, setQuery, onNew }){
  return React.createElement('div',{className:'topbar no-print'},
    React.createElement('div',{className:'search'},
      React.createElement(Icon,{name:'search',size:17}),
      React.createElement('input',{placeholder:'Search templates & documents…',value:query,onChange:e=>setQuery(e.target.value)})),
    React.createElement('div',{className:'spacer'}),
    React.createElement('button',{className:'iconbtn',title:'Notifications'}, React.createElement(Icon,{name:'bell',size:19})),
    React.createElement('button',{className:'btn btn-primary',onClick:onNew}, React.createElement(Icon,{name:'plus',size:16}),'New document')
  );
}

function App(){
  const [me,setMe] = aUseState(USE_SUPA ? null : loadUser);
  const [authReady,setAuthReady] = aUseState(!USE_SUPA);
  const [view,setView] = aUseState('home');
  const [drafts,setDrafts] = aUseState(USE_SUPA ? [] : loadDrafts);
  const [editing,setEditing] = aUseState(null); // {draft, template}
  const [query,setQuery] = aUseState('');
  const [launcher,setLauncher] = aUseState(false);
  const [toast,setToast] = aUseState(null);

  const myBrands = me ? me.brands : [];
  const [brandId,setBrandId] = aUseState('chief');

  // ---- Supabase auth: restore session + subscribe to changes ----
  aUseEffect(()=>{
    if(!USE_SUPA) return;
    let alive = true;
    const resolve = async (user)=>{
      if(!alive) return;
      if(!user){ setMe(null); setAuthReady(true); return; }
      try{ const prof = await SB.profile(user); if(alive){ setMe(prof); } }
      catch(err){ if(alive){ setMe(null); if(err && err.code==='no-profile'){ setToast({msg:'Signed in, but your profile isn’t set up yet.',icon:'x'}); await SB.signOut(); } } }
      if(alive) setAuthReady(true);
    };
    SB.currentUser().then(resolve);
    // safety net: never let the gate hang — if auth hasn't resolved shortly, show the login
    const guard = setTimeout(()=>{ if(alive) setAuthReady(true); }, 2500);
    const unsub = SB.onChange((user)=>{ setAuthReady(false); resolve(user); });
    return ()=>{ alive=false; clearTimeout(guard); unsub && unsub(); };
  }, []);

  // ---- load documents once we know who this is ----
  aUseEffect(()=>{
    if(!me){ if(USE_SUPA) setDrafts([]); return; }
    if(!USE_SUPA){ setDrafts(loadDrafts()); return; }
    let alive = true;
    SB.listDocs().then(rows=>{ if(alive) setDrafts(rows); })
      .catch(()=>{ if(alive) setToast({msg:'Could not load documents — check the database setup.',icon:'x'}); });
    return ()=>{ alive=false; };
  }, [me]);

  // keep the active workspace inside what this user is allowed to see
  aUseEffect(()=>{
    if(!me) return;
    const saved = localStorage.getItem(LS_BRAND);
    setBrandId(myBrands.includes(saved) ? saved : myBrands[0]);
  }, [me]);

  const brand = window.HUB.BRANDS[brandId] || window.HUB.BRANDS[myBrands[0]||'chief'];
  const themeBrand = editing ? editing.draft.brand : brandId;
  aUseEffect(()=>{ document.documentElement.setAttribute('data-brand', me ? themeBrand : 'chief'); }, [themeBrand, me]);
  aUseEffect(()=>{ if(me) localStorage.setItem(LS_BRAND, brandId); }, [brandId, me]);
  aUseEffect(()=>{ if(!USE_SUPA) localStorage.setItem(LS_DRAFTS, JSON.stringify(drafts)); }, [drafts]);

  const showToast = (msg,icon='check')=>{ setToast({msg,icon}); };
  aUseEffect(()=>{ if(!toast) return; const t=setTimeout(()=>setToast(null),2600); return ()=>clearTimeout(t); },[toast]);

  // ---- auth gate ----
  // (No blocking "loading" screen — always paint the branded login so a slow/blocked
  //  auth check can never leave a blank page. The auth effect swaps in the app when ready.)
  if(!me){
    const doSignIn = async (email, pass)=>{
      if(!USE_SUPA){
        const u = window.HUB.authenticate(email, pass);
        if(!u) return 'Those credentials don’t match an account.';
        localStorage.setItem(LS_USER,u.id); setMe(u); setView('home'); setEditing(null); return null;
      }
      const { error } = await SB.signIn(email, pass);
      if(error) return 'Those credentials don’t match an account.';
      setView('home'); setEditing(null); return null; // auth listener loads the profile
    };
    return React.createElement(Login,{ onSubmit:doSignIn });
  }

  // access control: only documents belonging to workspaces this user can access
  const visibleDrafts = drafts.filter(d=>myBrands.includes(d.brand));

  const logout = ()=>{ if(USE_SUPA){ SB.signOut(); setMe(null); } else { localStorage.removeItem(LS_USER); setMe(null); } setEditing(null); setQuery(''); setView('home'); };
  const setBrand = (id)=>{ if(myBrands.includes(id)) setBrandId(id); };
  const goto = (v)=>{ setEditing(null); setView(v); };

  const openTemplate = (tplId)=>{
    const tpl = window.HUB.TEMPLATES.find(t=>t.id===tplId);
    const draft = { id:newId(), tpl:tplId, brand:brandId, title:tpl.name+' — Untitled', status:'draft', values:null, updated:Date.now() };
    setDrafts(d=>[draft,...d]);
    setEditing({ draft, template:tpl });
    setLauncher(false);
    if(USE_SUPA) SB.saveDoc(draft).catch(()=>showToast('Save failed — check connection','x'));
  };
  const openDraft = (d)=>{
    if(!myBrands.includes(d.brand)) return; // guard cross-workspace access
    const tpl = window.HUB.TEMPLATES.find(t=>t.id===d.tpl);
    setEditing({ draft:d, template:tpl });
  };
  const saveDraft = (updated)=>{
    setDrafts(list=> list.some(x=>x.id===updated.id) ? list.map(x=> x.id===updated.id? updated : x) : [updated,...list]);
    setEditing(e=> e? {...e, draft:updated}:e);
    if(USE_SUPA) SB.saveDoc(updated).catch(()=>showToast('Save failed — check connection','x'));
  };

  const onSearch = (v)=>{ setQuery(v); if(v && !['gallery','recent'].includes(view)){ setEditing(null); setView('gallery'); } };

  let content;
  if(editing){
    content = React.createElement(window.HUBEDITOR.Editor,{
      draft:editing.draft, template:editing.template, brand:window.HUB.BRANDS[editing.draft.brand],
      onSave:saveDraft, onBack:()=>{ setEditing(null); }, showToast });
  } else if(view==='home'){
    content = React.createElement(window.HUBVIEWS.Home,{ brand, drafts:visibleDrafts, user:me.name, onOpenTemplate:openTemplate, onOpenDraft:openDraft, setView:goto });
  } else if(view==='gallery'){
    content = React.createElement(window.HUBVIEWS.Gallery,{ brand, query, onOpenTemplate:openTemplate });
  } else if(view==='recent'){
    content = React.createElement(window.HUBVIEWS.Recent,{ drafts:visibleDrafts, query, onOpenDraft:openDraft });
  } else if(view==='assets'){
    content = React.createElement(window.HUBVIEWS.Assets,{ brand, showToast });
  }

  return React.createElement('div',{className:'shell'},
    React.createElement(Sidebar,{ me, brand, brandId, myBrands, setBrand, view, setView:goto, draftCount:visibleDrafts.length, editing:!!editing, onLogout:logout }),
    React.createElement('div',{className:'main'},
      !editing && React.createElement(Topbar,{ query, setQuery:onSearch, onNew:()=>setLauncher(true) }),
      content
    ),
    launcher && React.createElement(window.HUBVIEWS.Launcher,{ brand, onClose:()=>setLauncher(false), onOpenTemplate:openTemplate }),
    toast && React.createElement('div',{className:'toast no-print'}, React.createElement(Icon,{name:toast.icon,size:17}), toast.msg)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

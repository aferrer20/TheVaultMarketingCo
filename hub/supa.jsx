/* ============================================================
   supa.jsx — Supabase integration layer
   Activates when window.SUPA_CONFIG is present AND supabase-js loaded.
   Exposes window.SUPA with:
     .enabled
     async currentUser()          -> auth user | null
     onChange(cb)                 -> unsubscribe fn (cb(user|null))
     async signIn(email, pass)    -> { error } | {}
     async signOut()
     async profile(user)          -> app "me" object | throws
     async listDocs()             -> [draft]  (RLS scopes automatically)
     async saveDoc(draft)         -> row
     async deleteDoc(id)
   Draft shape (app): { id, tpl, brand, title, status, values, updated }
   Row shape (db):    { id, owner, company, template, title, status, values, updated_at }
   ============================================================ */
(function(){
  const cfg = window.SUPA_CONFIG;
  const lib = window.supabase; // UMD global from CDN
  if(!cfg || !cfg.url || !cfg.key || !lib){
    window.SUPA = { enabled:false };
    return;
  }
  const sb = lib.createClient(cfg.url, cfg.key, {
    auth:{ persistSession:true, autoRefreshToken:true, storageKey:'tvhub_sb_auth' }
  });

  // brand ⇄ company are 1:1 here (chief / ssp / singlesky). 'vault' is the agency (sees all).
  function brandsFor(company, isFounder){
    if(isFounder || company==='vault') return ['chief','ssp','singlesky'];
    if(company==='chief' || company==='ssp' || company==='singlesky') return [company];
    return [];
  }
  function displayFor(email){
    const dir = (window.HUB && window.HUB.USERS) || [];
    const hit = dir.find(u => u.email.toLowerCase() === String(email||'').toLowerCase());
    if(hit) return { name:hit.name, title:hit.title };
    const local = String(email||'').split('@')[0].replace(/[._-]+/g,' ');
    return { name: local.replace(/\b\w/g, c=>c.toUpperCase()) || 'Team Member', title:'Team Member' };
  }

  function rowToDraft(r){
    return {
      id:r.id, tpl:r.template, brand:r.company, title:r.title,
      status:r.status||'draft', values:r.values||null,
      updated: r.updated_at ? Date.parse(r.updated_at) : Date.now()
    };
  }
  function draftToRow(d, ownerId){
    return {
      id:d.id, owner:ownerId, company:d.brand, template:d.tpl,
      title:d.title, status:d.status||'draft', values:d.values||null,
      updated_at:new Date(d.updated||Date.now()).toISOString()
    };
  }

  window.SUPA = {
    enabled:true,
    client: sb,
    async currentUser(){
      // getSession reads from local storage (no network) — instant, and works offline / from file://
      try{
        const { data } = await sb.auth.getSession();
        return data && data.session ? data.session.user : null;
      }catch(e){ return null; }
    },
    onChange(cb){
      const { data:sub } = sb.auth.onAuthStateChange((_e, session)=> cb(session ? session.user : null));
      return ()=> { try{ sub.subscription.unsubscribe(); }catch(e){} };
    },
    async signIn(email, pass){
      const { error } = await sb.auth.signInWithPassword({ email:String(email||'').trim(), password:pass });
      return { error };
    },
    async signOut(){ await sb.auth.signOut(); },
    async profile(user){
      const { data, error } = await sb.from('profiles').select('company,is_founder,email').eq('id', user.id).maybeSingle();
      if(error) throw error;
      if(!data) { const e = new Error('no-profile'); e.code='no-profile'; throw e; }
      const email = data.email || user.email;
      const disp = displayFor(email);
      const isFounder = !!data.is_founder;
      return {
        id:user.id, email,
        name:disp.name,
        title: isFounder ? (disp.title||'Founder') : disp.title,
        role: isFounder ? 'founder' : 'member',
        company:data.company,
        brands: brandsFor(data.company, isFounder)
      };
    },
    async listDocs(){
      const { data, error } = await sb.from('documents').select('*').order('updated_at',{ascending:false});
      if(error) throw error;
      return (data||[]).map(rowToDraft);
    },
    async saveDoc(draft){
      const u = await this.currentUser();
      if(!u) throw new Error('not-authed');
      const { data, error } = await sb.from('documents').upsert(draftToRow(draft, u.id)).select().maybeSingle();
      if(error) throw error;
      return data ? rowToDraft(data) : draft;
    },
    async deleteDoc(id){
      const { error } = await sb.from('documents').delete().eq('id', id);
      if(error) throw error;
    }
  };
})();

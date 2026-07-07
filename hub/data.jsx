/* ============================================================
   data.jsx — brands, icon set, template catalog, seed drafts
   exposes window.HUB
   ============================================================ */

/* ---------------- ICONS (lucide-style stroke) ---------------- */
const ICON_PATHS = {
  home:'<path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.4V21H10v-6h4v6h4.5V9.4"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
  files:'<path d="M15 2H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6z"/><path d="M15 2v4h4"/><path d="M5 8v12a2 2 0 0 0 2 2h8"/>',
  contract:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 12h4"/><path d="M9 16h2"/><path d="m14.5 16.5 1.6 1.6 3-3"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  idcard:'<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2.2"/><path d="M5 16c.6-1.6 4.4-1.6 5 0"/><path d="M14 9h5M14 12.5h5M14 16h3"/>',
  page:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 3 3-2 4 4"/>',
  award:'<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7L12 18l5 2.5-1.5-7"/>',
  book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5V20.5"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.1"/><circle cx="12" cy="8" r="1.1"/><circle cx="16" cy="10" r="1.1"/><path d="M12 21a3 3 0 0 0 0-6 2 2 0 0 1 0-4"/>',
  download:'<path d="M12 4v11"/><path d="m8 11 4 4 4-4"/><path d="M5 19h14"/>',
  printer:'<path d="M7 9V3h10v6"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M7 14h10v6H7z"/>',
  send:'<path d="M22 3 11 14"/><path d="M22 3 15 21l-4-7-7-4z"/>',
  save:'<path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M8 3v5h7V3"/><path d="M8 21v-7h8v7"/>',
  back:'<path d="m14 6-6 6 6 6"/>',
  chevright:'<path d="m9 6 6 6-6 6"/>',
  x:'<path d="M6 6 18 18M18 6 6 18"/>',
  trash:'<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7"/>',
  check:'<path d="m5 12 5 5 9-11"/>',
  sparkle:'<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  zin:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4-4M11 8v6M8 11h6"/>',
  zout:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4-4M8 11h6"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 11.4-3.6 12 0"/><path d="M16 6a3 3 0 0 1 0 6M22 20c-.3-2-2-3.2-4-3.6"/>',
  filter:'<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  bell:'<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
  receipt:'<path d="M6 2h12v20l-2.5-1.6L13 22l-2.5-1.6L8 22l-2.5-1.6L6 22z" transform="translate(0 -1)"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  chart:'<path d="M4 4v16h16"/><rect x="7" y="12" width="2.6" height="5"/><rect x="11.5" y="8" width="2.6" height="9"/><rect x="16" y="5" width="2.6" height="12"/>',
  quote:'<path d="M6 7h4v6H7c0 2 .6 2.8 2 3v2c-2.6-.3-4-2-4-5z"/><path d="M15 7h4v6h-3c0 2 .6 2.8 2 3v2c-2.6-.3-4-2-4-5z"/>',
  dot:'<circle cx="12" cy="6" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="18" r="1.4"/>',
};
function Icon({ name, size=18, style, cls }){
  return React.createElement('svg', {
    width:size, height:size, viewBox:'0 0 24 24', fill:'none',
    stroke:'currentColor', strokeWidth:1.7, strokeLinecap:'round', strokeLinejoin:'round',
    className:cls, style, dangerouslySetInnerHTML:{ __html: ICON_PATHS[name]||'' }
  });
}

/* ---------------- BRANDS ---------------- */
const BRANDS = {
  chief:{
    id:'chief',
    name:'The Chief Negotiators',
    short:'Chief Negotiators',
    tagline:'Elite deal advisory & negotiation',
    logoLight:'assets/cn-doc-t.png',          // on white
    logoDark:'assets/cn-doc-dark-t.png',      // on black
    docLogo:'assets/cn-doc-t.png',
    accent:'#B5823F', accent2:'#9A6330', ink:'#0F0E0D',
    fontDisplay:"'Cinzel', serif", fontDoc:"'EB Garamond', Georgia, serif", fontUi:"'Outfit', sans-serif",
    docTag:'CONFIDENTIAL · PRIVILEGED',
    web:'thechiefnegotiators.com', email:'advisory@thechiefnegotiators.com', phone:'(727) 555-0142',
    addr:'St. Petersburg, Florida',
    jurisdiction:'the State of Florida, USA, and the Parties submit to the exclusive jurisdiction of the courts of that State', coEntity:'a limited liability company organised under the laws of the State of Florida, USA',
    palette:[
      {nm:'Onyx',hx:'#0F0E0D'},{nm:'Graphite',hx:'#1A1815'},{nm:'Copper',hx:'#B5823F'},
      {nm:'Bronze',hx:'#9A6330'},{nm:'Champagne',hx:'#EBCB94'},{nm:'Warm White',hx:'#F4F0E9'},
    ],
    fonts:[{role:'Display',name:'Cinzel',css:"'Cinzel', serif"},{role:'Document body',name:'EB Garamond',css:"'EB Garamond', serif"},{role:'Interface',name:'Outfit',css:"'Outfit', sans-serif"}],
    voice:'Elite · high-stakes · authoritative. Short, commanding sentences. No hedging.',
  },
  ssp:{
    id:'ssp',
    name:'Strategic Supply Partners',
    short:'SSP',
    tagline:'Procurement & supply chain strategy',
    logoLight:'assets/ssp-doc.png',
    logoDark:'assets/ssp-doc.png',
    docLogo:'assets/ssp-doc.png',
    accent:'#1E3A66', accent2:'#2E568F', ink:'#122240',
    fontDisplay:"'Archivo', sans-serif", fontDoc:"'Barlow', sans-serif", fontUi:"'Barlow', sans-serif",
    docTag:'STRATEGIC SUPPLY PARTNERS',
    web:'strategicsupplypartners.com.au', email:'partners@strategicsupplypartners.com.au', phone:'+61 2 5550 0199',
    addr:'Sydney, NSW, Australia',
    jurisdiction:'the State of New South Wales, Australia, and the Parties submit to the non-exclusive jurisdiction of the courts of New South Wales and the courts competent to hear appeals from them', coEntity:'a company incorporated under the Corporations Act 2001 (Cth) of Australia',
    palette:[
      {nm:'Navy',hx:'#122240'},{nm:'Primary Blue',hx:'#1E3A66'},{nm:'Sky Accent',hx:'#2E568F'},
      {nm:'Steel',hx:'#8A929E'},{nm:'Mist',hx:'#DAE1E9'},{nm:'Paper',hx:'#EDF1F5'},
    ],
    fonts:[{role:'Display',name:'Archivo',css:"'Archivo', sans-serif"},{role:'Body & interface',name:'Barlow',css:"'Barlow', sans-serif"}],
    voice:'Confident, precise, corporate. Data-forward. Clear and direct.',
  },
  singlesky:{
    id:'singlesky',
    name:'Single Sky',
    short:'Single Sky',
    tagline:'Global technology & connectivity',
    logoLight:'assets/singlesky-doc.png',
    logoDark:'assets/singlesky-doc-dark.png',
    docLogo:'assets/singlesky-doc.png',
    accent:'#1BA0E0', accent2:'#127CB8', ink:'#13233F',
    fontDisplay:"'Outfit', sans-serif", fontDoc:"'Outfit', sans-serif", fontUi:"'Outfit', sans-serif",
    docTag:'SINGLE SKY · CONFIDENTIAL',
    web:'singlesky.com', email:'hello@singlesky.com', phone:'',
    addr:'',
    jurisdiction:'the State of Delaware, USA, and the Parties submit to the exclusive jurisdiction of the courts of that State', coEntity:'a company organised under the laws of the State of Delaware, USA',
    palette:[
      {nm:'Deep Navy',hx:'#13233F'},{nm:'Sky Blue',hx:'#1BA0E0'},{nm:'Azure',hx:'#127CB8'},
      {nm:'Slate',hx:'#8795A8'},{nm:'Cloud',hx:'#DCE7F1'},{nm:'Paper',hx:'#F1F6FB'},
    ],
    fonts:[{role:'Display & interface',name:'Outfit',css:"'Outfit', sans-serif"},{role:'Document body',name:'Outfit',css:"'Outfit', sans-serif"}],
    voice:'Modern, clear, and forward-looking. Confident without jargon.',
  },
};

/* ---------------- TEMPLATE CATALOG ---------------- */
const CATS = ['Proposals','Lead Generation','Contracts','Business','Correspondence','Marketing','Brand Collateral','Operations'];

const TEMPLATES = [
  {
    id:'proposal', name:'Sales Proposal', cat:'Proposals', icon:'briefcase',
    desc:'Full capabilities proposal with scope, pricing, and terms.',
    fields:[
      {g:'Deal', f:[
        {k:'clientCompany',label:'Client company',type:'text',ph:'Meridian Holdings'},
        {k:'clientName',label:'Client contact',type:'text',ph:'Jordan Ellis'},
        {k:'title',label:'Proposal title',type:'text',ph:'Strategic Negotiation Engagement'},
        {k:'date',label:'Date',type:'date'},
        {k:'validUntil',label:'Valid until',type:'text',ph:'30 days from issue'},
      ]},
      {g:'Content', f:[
        {k:'intro',label:'Executive summary',type:'textarea'},
        {k:'scope',label:'Scope of work',type:'list',cols:[{k:'title',label:'Item',type:'text'},{k:'desc',label:'Detail',type:'textarea'}]},
        {k:'pricing',label:'Investment',type:'list',cols:[{k:'item',label:'Line item',type:'text'},{k:'amt',label:'Amount',type:'text'}]},
        {k:'timeline',label:'Timeline & next steps',type:'textarea'},
        {k:'terms',label:'Terms',type:'textarea'},
      ]},
      {g:'Prepared by', f:[
        {k:'preparedBy',label:'Name',type:'text'},
        {k:'preparedByTitle',label:'Title',type:'text'},
      ]},
    ],
    defaults:{
      clientCompany:'Meridian Holdings', clientName:'Jordan Ellis',
      title:'Strategic Negotiation Engagement', date:'', validUntil:'30 days from issue',
      intro:'This proposal outlines a focused engagement to secure decisive advantage at your next negotiation table. We bring disciplined strategy, proprietary leverage analysis, and seasoned representation to protect your position and expand your outcome.',
      scope:[
        {title:'Leverage & Position Analysis',desc:'Full assessment of your position, counterparty motivations, and the leverage points others miss.'},
        {title:'Negotiation Strategy & Playbook',desc:'A tailored strategy, concession architecture, and scripted contingencies for every scenario.'},
        {title:'Live Representation',desc:'Direct representation or advisory support through close, keeping you in command at every stage.'},
      ],
      pricing:[
        {item:'Strategy & preparation',amt:'$8,500'},
        {item:'Live representation (per engagement)',amt:'$12,000'},
        {item:'Post-deal advisory (30 days)',amt:'Included'},
      ],
      timeline:'Week 1 — Discovery & leverage analysis.\nWeek 2 — Strategy build & rehearsal.\nWeek 3+ — Live negotiation & close.',
      terms:'50% due on engagement, balance on close. Fees exclude third-party costs. Engagement confidential under mutual NDA.',
      preparedBy:'', preparedByTitle:'Managing Partner',
    },
  },
  {
    id:'agreement', name:'Agreement (NDA · MSA · Service)', cat:'Contracts', icon:'contract',
    desc:'Switchable legal agreement — NDA, master service, or service agreement.',
    fields:[
      {g:'Agreement', f:[
        {k:'atype',label:'Agreement type',type:'select',options:['Non-Disclosure Agreement','Master Service Agreement','Service Agreement']},
        {k:'counterparty',label:'Counterparty (other party)',type:'text',ph:'Meridian Holdings, LLC'},
        {k:'effectiveDate',label:'Effective date',type:'date'},
        {k:'term',label:'Term',type:'text',ph:'Two (2) years'},
        {k:'governingLaw',label:'Governing law',type:'text',ph:'State of Florida'},
      ]},
      {g:'Body', f:[
        {k:'recitals',label:'Purpose / recitals',type:'textarea'},
        {k:'clauses',label:'Clauses',type:'list',cols:[{k:'h',label:'Heading',type:'text'},{k:'b',label:'Body',type:'textarea'}]},
      ]},
      {g:'Signatures', f:[
        {k:'signName',label:'Your signatory name',type:'text'},
        {k:'signTitle',label:'Your signatory title',type:'text'},
        {k:'cpSignName',label:'Counterparty signatory',type:'text'},
      ]},
    ],
    defaults:{
      atype:'Non-Disclosure Agreement', counterparty:'Meridian Holdings, LLC', effectiveDate:'',
      term:'Two (2) years', governingLaw:'State of Florida',
      recitals:'The parties wish to explore a potential business relationship and, in connection therewith, may disclose to each other certain confidential and proprietary information. This Agreement governs the protection and permitted use of that information.',
      clauses:[
        {h:'1. Confidential Information',b:'"Confidential Information" means all non-public information disclosed by one party to the other, whether oral, written, or electronic, that is designated confidential or would reasonably be understood to be confidential.'},
        {h:'2. Obligations',b:'The receiving party shall hold Confidential Information in strict confidence, use it solely for the stated purpose, and disclose it only to representatives with a need to know who are bound by like obligations.'},
        {h:'3. Exclusions',b:'Confidential Information does not include information that is or becomes public through no fault of the receiving party, was known prior to disclosure, or is independently developed.'},
        {h:'4. Term & Return',b:'The obligations herein survive for the stated term. Upon request, the receiving party shall return or destroy all Confidential Information.'},
      ],
      signName:'', signTitle:'Managing Partner', cpSignName:'',
    },
  },
  {
    id:'mnda', name:'Mutual NDA & Non-Circumvention', cat:'Contracts', icon:'contract',
    desc:'Reciprocal NCNDA — protects you as buyer, seller, or intermediary on any introduced deal.',
    fields:[
      {g:'Parties', f:[
        {k:'counterparty',label:'Counterparty legal name',type:'text',ph:'Acme Sourcing, LLC'},
        {k:'cpEntity',label:'Counterparty entity type',type:'text',ph:'limited liability company'},
        {k:'cpState',label:'Counterparty jurisdiction',type:'text',ph:'State of Delaware'},
        {k:'ourRole',label:'Our role in this deal',type:'select',options:['Either — buyer, seller, or intermediary','Intermediary / broker','Buyer','Seller']},
        {k:'effectiveDate',label:'Effective date',type:'date'},
      ]},
      {g:'Purpose', f:[
        {k:'purpose',label:'Purpose of agreement',type:'textarea'},
      ]},
      {g:'Sections', f:[
        {k:'sections',label:'Numbered sections',type:'list',cols:[{k:'h',label:'Heading',type:'text'},{k:'b',label:'Body',type:'textarea'}]},
      ]},
      {g:'Signatures', f:[
        {k:'signName',label:'Your signatory name',type:'text'},
        {k:'signTitle',label:'Your signatory title',type:'text'},
        {k:'cpSignName',label:'Counterparty signatory name',type:'text'},
        {k:'cpSignTitle',label:'Counterparty signatory title',type:'text'},
      ]},
    ],
    defaults:{
      counterparty:'', cpEntity:'limited liability company', cpState:'State of Delaware', ourRole:'Either — buyer, seller, or intermediary', effectiveDate:'',
      purpose:'The purpose of this Agreement is to facilitate discussions, introductions, evaluations, sourcing opportunities, and potential transactions involving infrastructure, hardware, AI systems, GPU inventory, data center solutions, networking equipment, software, and related technology opportunities. [[CO]] may participate in such opportunities as a buyer, seller, principal, intermediary, or broker, and this Agreement protects [[CO]] in each such capacity.',
      sections:[
        {h:'Confidential Information',b:'\u201CConfidential Information\u201D means all non-public business, operational, financial, technical, pricing, sourcing, inventory, supplier, customer, strategic, and transactional information disclosed by either Party, whether orally, electronically, visually, or in writing, and whether or not marked as confidential. Confidential Information does not include information that: (a) is or becomes publicly available other than through a breach of this Agreement; (b) was lawfully known to the receiving Party before disclosure; (c) is lawfully received from a third party without restriction; or (d) is independently developed by the receiving Party without reference to the disclosing Party\u2019s Confidential Information.'},
        {h:'Mutual Non-Disclosure',b:'Each Party must hold the other Party\u2019s Confidential Information in strict confidence, use it solely for the purpose of evaluating potential business opportunities between the Parties, and not disclose it to any third party except to those of its personnel, advisers, or representatives who have a genuine need to know for that purpose and who are bound by obligations of confidentiality no less protective than those in this Agreement, or as required by law.'},
        {h:'Non-Circumvention',b:'During the term of this Agreement and throughout the Tail Period defined in the Term clause, neither Party shall, directly or indirectly, circumvent, bypass, avoid, compete for, or exclude the other Party from any opportunity, transaction, relationship, supplier, source, manufacturer, buyer, seller, lender, or introduction that is disclosed, presented, or facilitated by or through the other Party (each, a \u201cProtected Opportunity\u201d). Without limiting the foregoing, each Party specifically agrees not to circumvent, displace, reduce, or diminish the participation, role, or compensation of [[CO]] in any Protected Opportunity, whether [[CO]] acts as buyer, seller, principal, intermediary, or broker. Prohibited circumvention includes contacting or transacting with an introduced party for the purpose of avoiding the other Party; using affiliates, agents, nominees, or third parties to bypass an introduced relationship; restructuring, renaming, or re-routing a transaction to defeat this Agreement; or concealing transaction activity connected to a Protected Opportunity. The Parties acknowledge that this restraint is reasonable and necessary to protect their legitimate business interests, including Confidential Information, the time and investment made to identify and develop opportunities, and their substantial relationships with introduced parties and counterparties. This clause has effect as a series of separate covenants applying to each Protected Opportunity, party, and introduction, and for the full period and each lesser period comprised within it; if any such separate covenant is unenforceable but would be enforceable with a reduced scope or period, it applies with the minimum modification necessary to make it enforceable.'},
        {h:'Fees & Economic Protection',b:'Where [[CO]] introduces, sources, or facilitates a Protected Opportunity, any commission, brokerage fee, referral fee, or transaction compensation shall be negotiated separately and documented independently in writing; provided, however, that in no event shall [[CO]]’s compensation on any completed transaction be less than one percent (1%) of the total gross transaction value. Where [[CO]] participates as a principal (whether as buyer or seller), no Party shall interpose itself, an affiliate, or any third party so as to reduce, share, divert, or displace [[CO]]’s economic position or margin in the transaction. Unless stated otherwise in the relevant documentation, all such amounts are expressed exclusive of any goods and services tax or equivalent transaction tax.'},
        {h:'Remedies',b:'Each Party acknowledges that a breach of the confidentiality or non-circumvention obligations in this Agreement may cause the other Party, and in particular [[CO]], irreparable harm for which monetary damages alone are an inadequate remedy. Accordingly, the non-breaching Party (and [[CO]] in every case) is entitled to seek injunctive and other equitable relief, without the need to post bond where permitted by law, in addition to any other remedy available at law or in equity. If a Party circumvents [[CO]] in breach of this Agreement, [[CO]] is entitled to recover the greater of the commission, brokerage fee, or margin it would have earned or received had the circumvention not occurred, together with its reasonable legal costs of enforcement.'},
        {h:'Term',b:'The confidentiality and non-circumvention obligations set out in this Agreement remain in full force and effect for a period of twelve (12) months from the Effective Date. In addition, the non-circumvention obligations continue to apply to each Protected Opportunity for twenty-four (24) months following the date it is first disclosed, presented, or facilitated (the “Tail Period”), and apply to any transaction that closes within that Tail Period even if it is initiated or completed after expiry of the general term.'},
        {h:'Return or Destruction of Information',b:'On written request by the disclosing Party, the receiving Party must promptly return or destroy all Confidential Information in its possession or control, together with any copies, except for one copy that may be retained solely for legal or compliance record-keeping purposes and that remains subject to this Agreement.'},
        {h:'No Obligation to Transact',b:'Nothing in this Agreement obligates either Party to enter into any transaction, purchase, sale, or business relationship. All opportunities remain subject to separate commercial negotiation and mutually agreed transaction terms.'},
        {h:'Independent Status',b:'Where [[CO]] acts as an intermediary or broker in respect of a Protected Opportunity, it does so as an independent contractor. Nothing in this Agreement creates a partnership, joint venture, agency, employment, or fiduciary relationship between the Parties.'},
        {h:'Governing Law & Jurisdiction',b:'This Agreement is governed by and construed in accordance with the laws of [[LAW]].'},
        {h:'Severability',b:'If any provision of this Agreement is held to be invalid or unenforceable, that provision is to be read down to the extent necessary, or otherwise severed, without affecting the validity or enforceability of the remaining provisions.'},
        {h:'Entire Agreement',b:'This Agreement constitutes the entire understanding between the Parties in relation to its subject matter and supersedes all prior discussions and understandings. Any variation must be in writing and signed by both Parties.'},
        {h:'Counterparts',b:'This Agreement may be executed in any number of counterparts, including by electronic signature, each of which is an original and all of which together constitute one instrument.'},
      ],
      signName:'Amanda Ferrer', signTitle:'Founder / Managing Member', cpSignName:'', cpSignTitle:'',
    },
  },
  {
    id:'letterhead', name:'Letterhead & Cover Letter', cat:'Correspondence', icon:'page',
    desc:'Branded letterhead for formal correspondence and cover letters.',
    fields:[
      {g:'Recipient', f:[
        {k:'date',label:'Date',type:'date'},
        {k:'recipient',label:'Recipient name',type:'text',ph:'Ms. Jordan Ellis'},
        {k:'recipTitle',label:'Recipient title / company',type:'text',ph:'VP Operations, Meridian Holdings'},
        {k:'recipAddr',label:'Recipient address',type:'textarea'},
      ]},
      {g:'Letter', f:[
        {k:'salutation',label:'Salutation',type:'text',ph:'Dear Ms. Ellis,'},
        {k:'body',label:'Body',type:'textarea'},
        {k:'signoff',label:'Sign-off',type:'text',ph:'With regard,'},
        {k:'senderName',label:'Your name',type:'text'},
        {k:'senderTitle',label:'Your title',type:'text'},
      ]},
    ],
    defaults:{
      date:'', recipient:'Ms. Jordan Ellis', recipTitle:'VP Operations, Meridian Holdings',
      recipAddr:'1200 Central Avenue\nSt. Petersburg, FL 33701',
      salutation:'Dear Ms. Ellis,',
      body:'Thank you for the opportunity to discuss the road ahead. Following our conversation, I am confident we can secure terms that protect your interests and expand your position at the table.\n\nEnclosed you will find our proposed scope and engagement structure. We are prepared to begin immediately and would welcome a brief call this week to align on priorities.\n\nWe look forward to representing you.',
      signoff:'With regard,', senderName:'', senderTitle:'Managing Partner',
    },
  },
  {
    id:'email_signature', name:'Email Signature', cat:'Correspondence', icon:'idcard',
    desc:'Copy-ready HTML email signature block.',
    fields:[
      {g:'Signature', f:[
        {k:'name',label:'Full name',type:'text'},
        {k:'title',label:'Title',type:'text'},
        {k:'phone',label:'Phone',type:'text'},
        {k:'email',label:'Email',type:'text'},
        {k:'web',label:'Website',type:'text'},
        {k:'tagline',label:'Tagline (optional)',type:'text'},
      ]},
    ],
    defaults:{ name:'Amanda Ferrer', title:'Managing Partner', phone:'', email:'', web:'', tagline:'' },
  },
  {
    id:'email_template', name:'Email Template', cat:'Correspondence', icon:'mail',
    desc:'Branded outreach / follow-up email with header and CTA.',
    fields:[
      {g:'Email', f:[
        {k:'etype',label:'Type',type:'select',options:['Cold outreach','Follow-up','Proposal delivery']},
        {k:'subject',label:'Subject line',type:'text'},
        {k:'preheader',label:'Preheader',type:'text'},
        {k:'greeting',label:'Greeting',type:'text',ph:'Hi Jordan,'},
        {k:'body',label:'Body',type:'textarea'},
        {k:'ctaLabel',label:'Button label',type:'text',ph:'Book a call'},
        {k:'signName',label:'Sign-off name',type:'text'},
      ]},
    ],
    defaults:{
      etype:'Cold outreach', subject:'An investment-grade offtaker for your capacity',
      preheader:'One introduction, direct to the buyer. Fifteen minutes?',
      greeting:'Hi there,',
      body:'Most data center capacity changes hands through three or four brokers before it ever reaches the buyer \u2014 each one adding cost and diluting the relationship.\n\nWe work directly with operators worldwide and bring you large, investment-grade offtakers. The real buyers, not another middleman.\n\nIf you have capacity to place, one call could put a serious counterparty in front of you \u2014 and cut the broker chain out entirely.',
      ctaLabel:'Book a 15-minute call', signName:'Amanda',
    },
  },
  {
    id:'one_pager', name:'Company One-Pager', cat:'Marketing', icon:'file',
    desc:'Capabilities and spec sheet on a single branded page.',
    fields:[
      {g:'Header', f:[
        {k:'headline',label:'Headline',type:'text'},
        {k:'subhead',label:'Subhead',type:'text'},
      ]},
      {g:'Body', f:[
        {k:'overview',label:'Overview',type:'textarea'},
        {k:'services',label:'What we do',type:'list',cols:[{k:'t',label:'Service',type:'text'},{k:'d',label:'Description',type:'textarea'}]},
        {k:'stats',label:'Proof points',type:'list',cols:[{k:'v',label:'Value',type:'text'},{k:'l',label:'Label',type:'text'}]},
      ]},
    ],
    defaults:{
      headline:'Command every table.', subhead:'Elite negotiation strategy for high-stakes deals.',
      overview:'We prepare, position, and represent decision-makers in their most consequential negotiations. From acquisition to contract to crisis, we turn pressure into leverage — and leverage into outcome.',
      services:[
        {t:'Deal Strategy',d:'Leverage mapping, concession architecture, and scenario planning built for your specific table.'},
        {t:'Live Representation',d:'Seasoned negotiators at the table or in your ear, protecting your position through close.'},
        {t:'Deal Advisory',d:'Trusted counsel for the negotiations that define your quarter, your year, your legacy.'},
      ],
      stats:[{v:'$500M+',l:'Value negotiated'},{v:'98%',l:'Favorable outcomes'},{v:'20+ yrs',l:'At the table'}],
    },
  },
  {
    id:'case_study', name:'Case Study', cat:'Marketing', icon:'award',
    desc:'Client success story with challenge, approach, and measurable results.',
    fields:[
      {g:'Client', f:[
        {k:'client',label:'Client (or "Confidential")',type:'text'},
        {k:'industry',label:'Industry',type:'text'},
        {k:'headline',label:'Headline outcome',type:'text'},
      ]},
      {g:'Story', f:[
        {k:'challenge',label:'The challenge',type:'textarea'},
        {k:'approach',label:'Our approach',type:'textarea'},
        {k:'results',label:'Results',type:'list',cols:[{k:'v',label:'Metric',type:'text'},{k:'l',label:'Label',type:'text'}]},
        {k:'quote',label:'Client quote',type:'textarea'},
        {k:'quoteBy',label:'Quote attribution',type:'text'},
      ]},
    ],
    defaults:{
      client:'Confidential — Private Equity', industry:'Acquisitions',
      headline:'$14M saved on a contested acquisition.',
      challenge:'Our client faced a hardened counterparty and a closing deadline that favored the other side. Prior rounds had stalled, and momentum was slipping.',
      approach:'We re-sequenced the negotiation, exposed the counterparty\u2019s true constraints, and rebuilt the concession plan around a single decisive lever — resetting the balance of the room.',
      results:[{v:'$14M',l:'Purchase price reduced'},{v:'11 days',l:'To close'},{v:'2x',l:'Better than target terms'}],
      quote:'They saw the leverage we didn\u2019t \u2014 and it changed the outcome.',
      quoteBy:'Managing Director, PE Firm',
    },
  },
  {
    id:'social_graphic', name:'Social Graphic', cat:'Marketing', icon:'image',
    desc:'1080×1080 branded post for LinkedIn / Instagram.',
    fields:[
      {g:'Post', f:[
        {k:'kicker',label:'Kicker',type:'text',ph:'INSIGHT'},
        {k:'headline',label:'Headline',type:'textarea'},
        {k:'sub',label:'Supporting line',type:'text'},
        {k:'handle',label:'Handle / URL',type:'text'},
      ]},
    ],
    defaults:{
      kicker:'THE EDGE', headline:'Most deals are lost before anyone sits down.',
      sub:'Walk in with leverage. Leave with the outcome.', handle:'@thechiefnegotiators',
    },
  },
  {
    id:'business_card', name:'Business Card', cat:'Brand Collateral', icon:'idcard',
    desc:'Print-ready 3.5×2in business card, front and back.',
    fields:[
      {g:'Card', f:[
        {k:'name',label:'Full name',type:'text'},
        {k:'title',label:'Title',type:'text'},
        {k:'phone',label:'Phone',type:'text'},
        {k:'email',label:'Email',type:'text'},
        {k:'web',label:'Website',type:'text'},
      ]},
    ],
    defaults:{ name:'Amanda Ferrer', title:'Managing Partner', phone:'', email:'', web:'' },
  },
  {
    id:'sop', name:'SOP / Training Doc', cat:'Operations', icon:'book',
    desc:'Standard operating procedure or onboarding guide.',
    fields:[
      {g:'Document', f:[
        {k:'title',label:'Procedure title',type:'text'},
        {k:'docId',label:'Document ID',type:'text',ph:'SOP-014'},
        {k:'owner',label:'Owner',type:'text'},
        {k:'revised',label:'Last revised',type:'date'},
      ]},
      {g:'Content', f:[
        {k:'purpose',label:'Purpose',type:'textarea'},
        {k:'scope',label:'Scope',type:'textarea'},
        {k:'steps',label:'Procedure steps',type:'list',cols:[{k:'t',label:'Step',type:'text'},{k:'d',label:'Detail',type:'textarea'}]},
      ]},
    ],
    defaults:{
      title:'Client Engagement Intake', docId:'SOP-014', owner:'Operations', revised:'',
      purpose:'To ensure every new client engagement is scoped, documented, and staffed consistently before work begins.',
      scope:'Applies to all new engagements from signed proposal through kickoff.',
      steps:[
        {t:'Confirm signed proposal',d:'Verify the signed proposal and deposit are received before opening the file.'},
        {t:'Open engagement file',d:'Create the client folder using the standard structure and assign an engagement code.'},
        {t:'Assign the team',d:'Confirm lead and support staffing and calendar the kickoff within 5 business days.'},
        {t:'Kickoff & brief',d:'Run the intake call, capture objectives, and log leverage points in the strategy doc.'},
      ],
    },
  },
  {
    id:'lead_magnet', name:'Lead Magnet / Guide', cat:'Lead Generation', icon:'target',
    desc:'Value-first downloadable checklist or guide that captures leads.',
    fields:[
      {g:'Cover', f:[
        {k:'kicker',label:'Kicker',type:'text',ph:'FREE GUIDE'},
        {k:'title',label:'Title',type:'text'},
        {k:'subtitle',label:'Subtitle',type:'textarea'},
      ]},
      {g:'Content', f:[
        {k:'intro',label:'Intro',type:'textarea'},
        {k:'items',label:'Points',type:'list',cols:[{k:'t',label:'Point',type:'text'},{k:'d',label:'Detail',type:'textarea'}]},
        {k:'cta',label:'Call to action',type:'textarea'},
      ]},
    ],
    defaults:{
      kicker:'FREE GUIDE', title:'5 Questions to Ask Before Any High-Stakes Negotiation',
      subtitle:'The pre-table checklist used by dealmakers who refuse to leave money on the table.',
      intro:'Most negotiations are won or lost in preparation. Before you take your seat, work through these five questions — each one exposes leverage the other side is hoping you\u2019ll miss.',
      items:[
        {t:'What does the other side actually need?',d:'Separate their stated position from their real constraint. The gap between the two is your leverage.'},
        {t:'What is my walk-away — and is it real?',d:'A walk-away you haven\u2019t pressure-tested is a wish. Define it, in writing, before you enter the room.'},
        {t:'Where can I create value before I claim it?',d:'Trades that cost you little and mean much to them expand the pie before anyone divides it.'},
        {t:'What will I concede, and in what order?',d:'Plan your concession architecture in advance. Never give a concession without a reason and a return.'},
        {t:'What does a great outcome look like on paper?',d:'Write the deal you want before the meeting. If you can\u2019t describe it, you can\u2019t negotiate toward it.'},
      ],
      cta:'Want these answered for your specific deal? Book a 15-minute leverage call — no pitch, just a sharper read on your position.',
    },
  },
  {
    id:'outreach_sequence', name:'Outreach Sequence', cat:'Lead Generation', icon:'send',
    desc:'Multi-touch prospecting email sequence with timing and copy.',
    fields:[
      {g:'Campaign', f:[
        {k:'name',label:'Sequence name',type:'text'},
        {k:'audience',label:'Target audience',type:'text'},
        {k:'goal',label:'Goal / conversion',type:'text'},
      ]},
      {g:'Emails', f:[
        {k:'steps',label:'Sequence steps',type:'list',cols:[{k:'day',label:'Timing',type:'text'},{k:'subject',label:'Subject',type:'text'},{k:'body',label:'Body',type:'textarea'}]},
      ]},
    ],
    defaults:{
      name:'Executive Outreach — Founders & GCs', audience:'Founders, general counsel, and heads of corp dev with a live deal',
      goal:'Book a 15-minute leverage call',
      steps:[
        {day:'Day 1',subject:'A stronger position at your next table',body:'Most deals are lost before anyone sits down. We help decision-makers walk in with leverage, a plan, and representation that keeps them in command.\n\nIf you have a negotiation on the horizon, I\u2019d welcome 15 minutes to share how we\u2019d approach it.'},
        {day:'Day 4',subject:'Re: a stronger position',body:'Following up briefly. The teams that win the room are the ones that prepared for it — and even a short conversation can surface leverage you already hold.\n\nWorth a quick call this week?'},
        {day:'Day 9',subject:'Closing the loop',body:'I\u2019ll leave it here for now, but the offer stands. When a consequential negotiation lands on your desk, we\u2019re the team you want in your corner.\n\nReply anytime and we\u2019ll make room.'},
      ],
    },
  },
  {
    id:'invoice', name:'Invoice', cat:'Business', icon:'receipt',
    desc:'Professional branded invoice with line items and totals.',
    fields:[
      {g:'Invoice', f:[
        {k:'invoiceNo',label:'Invoice #',type:'text'},
        {k:'date',label:'Issue date',type:'date'},
        {k:'dueDate',label:'Terms / due',type:'text',ph:'Net 15'},
      ]},
      {g:'Bill to', f:[
        {k:'billName',label:'Contact',type:'text'},
        {k:'billCompany',label:'Company',type:'text'},
        {k:'billAddr',label:'Address',type:'textarea'},
      ]},
      {g:'Line items', f:[
        {k:'items',label:'Items',type:'list',cols:[{k:'desc',label:'Description',type:'text'},{k:'amt',label:'Amount',type:'text'}]},
      ]},
      {g:'Totals & terms', f:[
        {k:'taxLabel',label:'Tax label (optional)',type:'text',ph:'Sales tax (7%)'},
        {k:'taxAmt',label:'Tax amount (optional)',type:'text',ph:'$0'},
        {k:'notes',label:'Payment notes',type:'textarea'},
      ]},
    ],
    defaults:{
      invoiceNo:'INV-1042', date:'', dueDate:'Net 15',
      billName:'Jordan Ellis', billCompany:'Meridian Holdings, LLC', billAddr:'1200 Central Avenue\nSt. Petersburg, FL 33701',
      items:[
        {desc:'Strategy & preparation — leverage analysis',amt:'$8,500'},
        {desc:'Live representation — acquisition negotiation',amt:'$12,000'},
        {desc:'Post-deal advisory (30 days)',amt:'$0'},
      ],
      taxLabel:'', taxAmt:'',
      notes:'50% due on engagement, balance on close. Payable by wire or ACH; details on request. Thank you for your business.',
    },
  },
  {
    id:'partner_spotlight', name:'Team / Partner Spotlight', cat:'Marketing', icon:'users',
    desc:'1080×1080 spotlight card for team members or strategic partners.',
    fields:[
      {g:'Spotlight', f:[
        {k:'stype',label:'Type',type:'select',options:['Team Spotlight','Partner Spotlight','New Hire']},
        {k:'name',label:'Name',type:'text'},
        {k:'role',label:'Role / title',type:'text'},
      ]},
      {g:'Details', f:[
        {k:'quote',label:'Pull quote',type:'textarea'},
        {k:'bio',label:'Short bio',type:'textarea'},
        {k:'tag',label:'Footer tag',type:'text'},
      ]},
    ],
    defaults:{
      stype:'Team Spotlight', name:'Amanda Ferrer', role:'Managing Partner',
      quote:'Leverage isn\u2019t loud. It\u2019s prepared.',
      bio:'Two decades at the table across acquisitions, disputes, and crisis negotiations — and the discipline to make preparation the client\u2019s edge.',
      tag:'Meet the team behind every table.',
    },
  },
  {
    id:'social_quote', name:'Testimonial Card', cat:'Marketing', icon:'quote',
    desc:'1080×1080 client quote / testimonial post.',
    fields:[
      {g:'Post', f:[
        {k:'kicker',label:'Kicker',type:'text',ph:'CLIENT RESULTS'},
        {k:'quote',label:'Quote',type:'textarea'},
        {k:'author',label:'Attribution',type:'text'},
        {k:'authorTitle',label:'Author org / title',type:'text'},
      ]},
    ],
    defaults:{
      kicker:'CLIENT RESULTS', quote:'They saw the leverage we didn\u2019t \u2014 and it changed the outcome.',
      author:'Managing Director', authorTitle:'Private Equity Firm',
    },
  },
  {
    id:'social_stat', name:'Stat / Proof Card', cat:'Marketing', icon:'chart',
    desc:'1080×1080 big-number proof point for social.',
    fields:[
      {g:'Post', f:[
        {k:'statValue',label:'Big number',type:'text',ph:'$500M+'},
        {k:'statLabel',label:'What it measures',type:'text'},
        {k:'context',label:'Context line',type:'textarea'},
        {k:'handle',label:'Handle / URL',type:'text'},
      ]},
    ],
    defaults:{
      statValue:'$500M+', statLabel:'in value negotiated',
      context:'Across acquisitions, disputes, and high-stakes contracts — we turn pressure into leverage.',
      handle:'@thechiefnegotiators',
    },
  },
  {
    id:'brand_guidelines', name:'Brand Guidelines', cat:'Brand Collateral', icon:'palette',
    desc:'One-page brand standards — logo, color, type, and voice.',
    fields:[
      {g:'Standards', f:[
        {k:'usage',label:'Usage notes',type:'textarea'},
      ]},
    ],
    defaults:{
      usage:'Always give the mark room to breathe — clear space of at least the logo\u2019s cap height on every side. Never stretch, recolor, rotate, or add effects to the logo. Use palette values exactly as specified. When in doubt, choose restraint.',
    },
  },
];

/* ---------------- USER DIRECTORY / ACCESS ----------------
   role 'founder' => access to every workspace (Amanda & Arron).
   role 'member'  => access limited to the brands listed.
   NOTE: this is a front-end demo gate, not real authentication.
   ---------------------------------------------------------- */
const USERS = [
  { id:'amanda', name:'Amanda Ferrer', email:'amanda@thechiefnegotiators.com',        pass:'vault2026', role:'founder', title:'Managing Partner',  brands:['chief','ssp'] },
  { id:'camila', name:'Camila',        email:'camila@thevaultmarketingco.com',        pass:'vault2026', role:'founder', title:'Marketing Lead',     brands:['chief','ssp'] },
  { id:'arron',  name:'Arron',         email:'arron@strategicsupplypartners.com.au',  pass:'vault2026', role:'founder', title:'Founder',            brands:['ssp'] },
  { id:'dan',    name:'Dan',           email:'dan@thechiefnegotiators.com',           pass:'vault2026', role:'member',  title:'Team Member',        brands:['chief'] },
  { id:'blake',  name:'Blake',         email:'blake@thechiefnegotiators.com',         pass:'vault2026', role:'member',  title:'Team Member',        brands:['chief'] },
  { id:'maxim',  name:'Maxim',         email:'maxim@strategicsupplypartners.com.au',  pass:'vault2026', role:'member',  title:'Team Member',        brands:['ssp'] },
  { id:'bradley',name:'Bradley',       email:'bradley@singlesky.com',                 pass:'vault2026', role:'member',  title:'Team Member',        brands:['singlesky'] },
  { id:'rondell',name:'Rondell',       email:'rondell@singlesky.com',                 pass:'vault2026', role:'member',  title:'Team Member',        brands:['singlesky'] },
];
function authenticate(email, pass){
  const u = USERS.find(x => x.email.toLowerCase() === String(email||'').trim().toLowerCase());
  if(!u || u.pass !== pass) return null;
  return u;
}

/* ---------------- SEED DRAFTS ---------------- */
const SEED_DRAFTS = [];

/* ---------------- BRAND-SPECIFIC DEFAULT COPY ---------------- */
const BRAND_DEFAULTS = {
  ssp:{
    proposal:{
      title:'Supply Chain Optimization Engagement',
      intro:'This proposal outlines a structured engagement to reduce cost, de-risk your supplier base, and build resilience into your procurement operation. We combine category expertise, supplier intelligence, and disciplined sourcing to deliver measurable, verifiable savings.',
      scope:[
        {title:'Spend & Supplier Analysis',desc:'A full baseline of spend, supplier concentration, and risk exposure across your categories.'},
        {title:'Sourcing Strategy & RFP',desc:'Category strategy, supplier shortlisting, and managed RFP through to competitive award.'},
        {title:'Implementation & Savings Tracking',desc:'Contract rollout, supplier onboarding, and quarterly verification of realized savings.'},
      ],
      pricing:[
        {item:'Diagnostic & spend baseline',amt:'$9,500'},
        {item:'Strategic sourcing & negotiation',amt:'$18,000'},
        {item:'Savings tracking (quarterly)',amt:'Included'},
      ],
      timeline:'Weeks 1\u20132 \u2014 Spend baseline & supplier risk map.\nWeeks 3\u20135 \u2014 Sourcing event & supplier negotiation.\nWeek 6+ \u2014 Award, rollout & savings tracking.',
    },
    one_pager:{
      headline:'Supply chains, engineered.', subhead:'Strategic procurement and sourcing for resilient operations.',
      overview:'We help operations and procurement leaders cut cost, reduce risk, and strengthen their supplier base. From category strategy to supplier negotiation to implementation, we turn spend into leverage \u2014 and leverage into savings.',
      services:[
        {t:'Strategic Sourcing',d:'Category strategy, RFP management, and supplier negotiation to competitive award.'},
        {t:'Supplier Risk',d:'Concentration analysis, dual-sourcing, and resilience planning across your base.'},
        {t:'Cost Reduction',d:'Baseline, benchmark, and capture verified savings across your spend.'},
      ],
      stats:[{v:'$120M+',l:'Spend managed'},{v:'14%',l:'Avg. cost reduction'},{v:'500+',l:'Suppliers vetted'}],
    },
    social_graphic:{
      kicker:'SUPPLY INSIGHT', headline:'Your supply chain is only as strong as your weakest supplier.',
      sub:'Build resilience before you need it.', handle:'strategicsupplypartners.com.au',
    },
    case_study:{
      client:'Confidential \u2014 Industrial Manufacturer', industry:'Manufacturing',
      headline:'14% cost reduction across indirect spend.',
      challenge:'Our client faced rising input costs and a fragmented supplier base with dangerous single-source exposure across several critical categories.',
      approach:'We rebaselined spend, ran a competitive sourcing event across the highest-value categories, and introduced dual-sourcing to remove single points of failure \u2014 all without disrupting production.',
      results:[{v:'14%',l:'Cost reduction'},{v:'$4.2M',l:'Annual savings'},{v:'0',l:'Supply disruptions'}],
      quote:'They found savings we\u2019d walked past for years \u2014 and made us more resilient doing it.',
      quoteBy:'VP Procurement, Manufacturer',
    },
    email_template:{
      signName:'Arron',
    },
    letterhead:{
      body:'Thank you for the opportunity to discuss your procurement priorities. Following our conversation, I am confident we can reduce cost and strengthen the resilience of your supplier base.\n\nEnclosed you will find our proposed scope and engagement structure. We are ready to begin immediately and would welcome a brief call this week to align on categories and targets.\n\nWe look forward to partnering with you.',
    },
    lead_magnet:{
      kicker:'FREE GUIDE', title:'5 Questions to Ask Before Your Next Sourcing Event',
      subtitle:'The pre-RFP checklist procurement leaders use to protect cost, reduce risk, and avoid rework.',
      intro:'Savings and resilience are decided before the RFP ever goes out. Run through these five questions first — each one surfaces cost or risk that\u2019s easy to miss and expensive to fix later.',
      items:[
        {t:'Do I actually know my baseline?',d:'You can\u2019t claim savings you can\u2019t measure. Establish a clean spend and volume baseline before you source.'},
        {t:'Where is my single-source exposure?',d:'Map concentration by category. A supplier you can\u2019t replace is a supplier that sets your price.'},
        {t:'Is the specification driving cost I don\u2019t need?',d:'Over-specification is silent overspend. Challenge requirements before you challenge suppliers.'},
        {t:'What is the total cost, not just the price?',d:'Freight, terms, quality, and switching costs all move the real number. Compare landed cost, not line price.'},
        {t:'How will I verify the savings actually land?',d:'A signed contract is not a captured saving. Define the tracking and the owner before award.'},
      ],
      cta:'Want these pressure-tested against your own spend? Book a 15-minute call — we\u2019ll show you where the leverage is.',
    },
    outreach_sequence:{
      name:'Procurement Outreach — Ops & Supply Leaders', audience:'COOs, VPs of Procurement, and supply chain leaders with growing spend',
      goal:'Book a 15-minute spend review',
      steps:[
        {day:'Day 1',subject:'A more resilient, lower-cost supply base',body:'Most procurement savings hide in plain sight — in supplier concentration, off-contract spend, and categories no one has re-sourced in years.\n\nIf you\u2019re carrying cost or risk you\u2019d like a second set of eyes on, I\u2019d welcome a short call to share how we\u2019d approach it.'},
        {day:'Day 4',subject:'Re: your supply base',body:'Quick follow-up. We typically find 8\u201314% in categories leaders assumed were already optimized — without disrupting production.\n\nWorth 15 minutes to see if the same holds for your spend?'},
        {day:'Day 9',subject:'Closing the loop',body:'I\u2019ll leave it here for now. When cost pressure or a supplier risk lands on your desk, we\u2019re built to move fast.\n\nReply anytime and we\u2019ll set up a short review.'},
      ],
    },
    invoice:{
      invoiceNo:'INV-2087', dueDate:'Net 30',
      billName:'Morgan Vasquez', billCompany:'Cascade Industrial, Inc.', billAddr:'4400 Gateway Blvd\nTampa, FL 33607',
      items:[
        {desc:'Spend diagnostic & baseline',amt:'$9,500'},
        {desc:'Strategic sourcing & supplier negotiation',amt:'$18,000'},
        {desc:'Savings tracking (Q1)',amt:'$0'},
      ],
      notes:'Net 30 from issue date. Payable by wire or ACH; details on request. Thank you for your partnership.',
    },
    partner_spotlight:{
      stype:'Team Spotlight', name:'Arron', role:'Founder',
      quote:'The cheapest supplier is rarely the lowest cost.',
      bio:'Builds resilient, competitively-sourced supply bases for operations leaders — turning fragmented spend into leverage and verified savings.',
      tag:'Meet the team engineering better supply chains.',
    },
    social_quote:{
      kicker:'CLIENT RESULTS', quote:'They found savings we\u2019d walked past for years — and made us more resilient doing it.',
      author:'VP Procurement', authorTitle:'Industrial Manufacturer',
    },
    social_stat:{
      statValue:'$120M+', statLabel:'in spend under management',
      context:'Category strategy, supplier negotiation, and risk reduction that turns spend into savings.',
      handle:'strategicsupplypartners.com.au',
    },
    mnda:{
      signName:'Arron', signTitle:'Founder',
    },
    one_pager_stat:{},
  },
};
function defaultsFor(tpl, brandId){
  const ov = (BRAND_DEFAULTS[brandId]||{})[tpl.id];
  return ov ? { ...tpl.defaults, ...ov } : { ...tpl.defaults };
}

window.HUB = { Icon, ICON_PATHS, BRANDS, TEMPLATES, CATS, SEED_DRAFTS, BRAND_DEFAULTS, defaultsFor, USERS, authenticate };
Object.assign(window, { Icon });

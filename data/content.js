/* Fii Polițist.Ro — structură editorială pentru baza de date. */
const CONTENT_DB = {
  exams:[
    {id:'campina',name:'Școala de Agenți de Poliție',institutions:['Poliție'],subjects:['romana','legislatie','istorie','limba-straina','educatie-civica','logica']},
    {id:'academia-politie',name:'Academia de Poliție — Facultatea de Poliție',institutions:['Poliție','Jandarmerie','Frontieră'],subjects:['romana','istorie','legislatie']},
    {id:'frontiera',name:'Poliția de Frontieră',institutions:['Poliția de Frontieră'],subjects:['romana','legislatie','limba-straina','educatie-civica','logica']},
    {id:'pompieri',name:'Pompieri / Facultatea de Pompieri',institutions:['Pompieri'],subjects:['matematica','fizica','legislatie']},
    {id:'jandarmerie',name:'Jandarmerie',institutions:['Jandarmerie'],subjects:['romana','legislatie','educatie-civica','logica']}
  ],
  subjects:[
    {id:'romana',name:'Limba română',chapters:['Gramatică','Ortografie și punctuație','Vocabular','Sintaxă','Morfologie','Înțelegerea enunțului']},
    {id:'engleza',name:'Limba engleză',chapters:['Vocabulary','Grammar','Reading comprehension','Communication']},
    {id:'matematica',name:'Matematică',chapters:['Algebră','Ecuații și inecuații','Funcții','Analiză matematică','Probleme']},
    {id:'istorie',name:'Istorie',chapters:['România modernă','România contemporană','Constituirea statului român','Instituții și societate']},
    {id:'legislatie',name:'Legislație',chapters:['Poliția Română','Statutul polițistului','Jandarmeria Română','Poliția de Frontieră','Situații de urgență','Constituție și administrație publică']},
    {id:'educatie-civica',name:'Educație civică',chapters:['Drepturi și libertăți','Instituții publice','Cetățenie și responsabilitate']},
    {id:'logica',name:'Raționament logic',chapters:['Serii','Analogie','Clasificare','Raționament verbal','Raționament numeric']},
    {id:'fizica',name:'Fizică',chapters:['Mecanică','Electricitate','Termodinamică','Optică']}
  ],
  officialSources:[
    {id:'acp-2026',title:'Academia de Poliție — admitere 2026',authority:'Academia de Poliție',url:'https://admitere.academiadepolitie.ro/',type:'Regulament / tematică / bibliografie'},
    {id:'mai-recrutare',title:'MAI — recrutare și admitere',authority:'Ministerul Afacerilor Interne',url:'https://www.mai.gov.ro/',type:'Anunțuri și documente oficiale'},
    {id:'pol-frontiera',title:'Poliția de Frontieră — admitere și carieră',authority:'Poliția de Frontieră Română',url:'https://www.politiadefrontiera.ro/',type:'Informații instituționale'},
    {id:'lege-218',title:'Legea nr. 218/2002 — Poliția Română',authority:'Portal Legislativ',url:'https://legislatie.just.ro/Public/DetaliiDocument/257252',type:'Act normativ'},
    {id:'lege-360',title:'Legea nr. 360/2002 — Statutul polițistului',authority:'Portal Legislativ',url:'https://legislatie.just.ro/Public/DetaliiDocument/38129',type:'Act normativ'},
    {id:'lege-550',title:'Legea nr. 550/2004 — Jandarmeria Română',authority:'Portal Legislativ',url:'https://legislatie.just.ro/Public/DetaliiDocument/56826',type:'Act normativ'},
    {id:'oug-104',title:'OUG nr. 104/2001 — Poliția de Frontieră Română',authority:'Portal Legislativ',url:'https://legislatie.just.ro/Public/DetaliiDocument/29614',type:'Act normativ'},
    {id:'igsu',title:'Inspectoratul General pentru Situații de Urgență',authority:'IGSU',url:'https://www.igsu.ro/',type:'Informații instituționale'}
  ],
  sampleQuestions:[
    {id:'db-ro-001',exam:'campina',subject:'romana',chapter:'Gramatică',difficulty:'ușor',question:'Care este forma corectă la imperativul afirmativ al verbului „a fi”?',answers:['Fii atent!','Fi atent!','Fii-atent!','Fii atenți!'],correct:0,explanation:'Forma corectă este „fii”.',sourceId:'mai-recrutare'},
    {id:'db-lg-001',exam:'campina',subject:'legislatie',chapter:'Poliția Română',difficulty:'mediu',question:'De ce trebuie verificată forma actualizată a unui act normativ?',answers:['Pentru că actele pot fi modificate','Pentru că titlul se schimbă zilnic','Pentru că numărul de articole este irelevant','Pentru că textele normative nu au dată'],correct:0,explanation:'Actele normative pot fi modificate sau completate.',sourceId:'lege-218'},
    {id:'db-lg-002',exam:'jandarmerie',subject:'legislatie',chapter:'Jandarmeria Română',difficulty:'mediu',question:'Care este actul normativ de bază privind Jandarmeria Română?',answers:['Legea nr. 550/2004','Legea nr. 218/2002','Legea nr. 360/2002','OUG nr. 104/2001'],correct:0,explanation:'Legea nr. 550/2004 reglementează organizarea și funcționarea Jandarmeriei Române.',sourceId:'lege-550'},
    {id:'db-lg-003',exam:'frontiera',subject:'legislatie',chapter:'Poliția de Frontieră',difficulty:'mediu',question:'Ce act normativ reglementează organizarea și funcționarea Poliției de Frontieră Române?',answers:['OUG nr. 104/2001','Legea nr. 550/2004','Legea nr. 360/2002','Legea nr. 218/2002'],correct:0,explanation:'OUG nr. 104/2001 este actul normativ de referință.',sourceId:'oug-104'}
  ]
};
function getSubjectById(id){return CONTENT_DB.subjects.find(s=>s.id===id);}
function getSourceById(id){return CONTENT_DB.officialSources.find(s=>s.id===id);}
function getDbQuestions(filters={}){
  const all=(typeof QUESTIONS!=='undefined'?QUESTIONS:[]);
  const roman=all.filter(q=>q.subject==='romana').map(q=>({id:q.id,exam:'campina',subject:q.subject,chapter:q.chapter,difficulty:q.difficulty,question:q.q,answers:q.a,correct:q.c,explanation:q.e,sourceId:'mai-recrutare'}));
  const combined=roman.concat(CONTENT_DB.sampleQuestions);
  return combined.filter(q=>!filters.exam||q.exam===filters.exam).filter(q=>!filters.subject||q.subject===filters.subject).filter(q=>!filters.chapter||q.chapter===filters.chapter);
}

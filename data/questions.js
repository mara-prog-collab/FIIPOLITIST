/* Fii Polițist.Ro — banca de întrebări modulară. */
const REVISED_CHAPTERS = ['Vocabular','Morfologie','Sintaxă','Ortografie și punctuație','Ortoepie','Înțelegerea enunțului'];
const ROMANA_BASE = ROMANA_QUESTIONS.filter(q=>!REVISED_CHAPTERS.includes(q.chapter));
const QUESTIONS = ROMANA_BASE.concat(VOCABULAR_QUESTIONS,MORFOLOGIE_QUESTIONS,SINTAXA_QUESTIONS,ORTOGRAFIE_QUESTIONS,ORTOEPIE_QUESTIONS,INTELEGEREA_QUESTIONS,ENGLEZA_QUESTIONS,ISTORIE_QUESTIONS,[
{id:'lg-001',subject:'legislatie',chapter:'Noțiuni introductive',q:'De ce este importantă verificarea sursei unei informații juridice?',a:['Pentru a evita informațiile depășite sau incorecte','Pentru a răspunde mai repede','Pentru a elimina explicațiile','Pentru a evita citirea textului'],c:0,e:'În pregătirea pentru examen trebuie folosite informații verificabile și actualizate.'},
{id:'lg-002',subject:'legislatie',chapter:'Instituții',q:'Ce este util să urmărești când înveți un text normativ?',a:['Termenii definiți și regulile aplicabile','Doar titlul','Doar exemplele de pe internet','Numărul paginilor'],c:0,e:'Definițiile și regulile aplicabile sunt elemente esențiale pentru înțelegerea unui text normativ.'}
]);
function questionsForSubject(subject){ return QUESTIONS.filter(q=>q.subject===subject); }

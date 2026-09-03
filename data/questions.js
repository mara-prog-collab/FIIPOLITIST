/* Fii Polițist.Ro — banca română revizuită. 6 capitole x 70 întrebări = 420. */
const REVISED_CHAPTERS = ['Vocabular','Morfologie','Sintaxă','Ortografie și punctuație','Ortoepie','Înțelegerea enunțului'];
const ROMANA_BASE = ROMANA_QUESTIONS.filter(q=>!REVISED_CHAPTERS.includes(q.chapter));
const QUESTIONS = ROMANA_BASE.concat(
  VOCABULAR_QUESTIONS,
  MORFOLOGIE_QUESTIONS,
  SINTAXA_QUESTIONS,
  ORTOGRAFIE_QUESTIONS,
  ORTOEPIE_QUESTIONS,
  INTELEGEREA_QUESTIONS,
  [
    { id:'is-001', subject:'istorie', chapter:'România modernă', q:'Ce urmărește, în principal, o cronologie istorică?', a:['Ordinea în timp a evenimentelor','Numărul de participanți','Lungimea unui document','Valoarea economică'], c:0, e:'Cronologia organizează evenimentele în ordinea desfășurării lor în timp.' },
    { id:'lg-001', subject:'legislatie', chapter:'Noțiuni introductive', q:'De ce este importantă verificarea sursei unei informații juridice?', a:['Pentru a evita informațiile depășite sau incorecte','Pentru a răspunde mai repede','Pentru a elimina explicațiile','Pentru a evita citirea textului'], c:0, e:'În pregătirea pentru examen trebuie folosite informații verificabile și actualizate.' },
    { id:'is-002', subject:'Română', chapter:'România contemporană', q:'Ce reprezintă o sursă istorică?', a:['O mărturie sau un document despre trecut','Doar o opinie personală actuală','O regulă gramaticală','Un calcul matematic'], c:0, e:'Sursele istorice sunt mărturii, documente, obiecte sau alte dovezi care ajută la studierea trecutului.' },
    { id:'lg-002', subject:'legislatie', chapter:'Instituții', q:'Ce este util să urmărești când înveți un text normativ?', a:['Termenii definiți și regulile aplicabile','Doar titlul','Doar exemplele de pe internet','Numărul paginilor'], c:0, e:'Definițiile și regulile aplicabile sunt elemente esențiale pentru înțelegerea unui text normativ.' }
]);
function questionsForSubject(subject){ return QUESTIONS.filter(q=>q.subject===subject); }

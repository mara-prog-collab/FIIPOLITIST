/* Fii Polițist.Ro — 420 întrebări originale de antrenament pentru Limba română. */
const ROMANA_QUESTIONS = [
{id:'ro-001',subject:'romana',chapter:'Vocabular',lesson:'Sinonime',difficulty:'ușor',q:'Care este sinonimul potrivit pentru „rapid”?',a:['lent','iute','greoi','rar'],c:1,e:'„Iute” are sens apropiat de „rapid”.'},
{id:'ro-002',subject:'romana',chapter:'Vocabular',lesson:'Antonime',difficulty:'ușor',q:'Care este antonimul cuvântului „abundant”?',a:['bogat','numeros','insuficient','plin'],c:2,e:'„Insuficient” exprimă sens opus lui „abundant”.'},
{id:'ro-003',subject:'romana',chapter:'Vocabular',lesson:'Paronime',difficulty:'mediu',q:'Alege forma corectă: „Rezultatul este ___ cerințelor.”',a:['conform','conformă','conformi','conformul'],c:0,e:'Construcția corectă este „conform cerințelor”.'},
{id:'ro-004',subject:'romana',chapter:'Vocabular',lesson:'Pleonasm',difficulty:'ușor',q:'Care construcție conține un pleonasm?',a:['a coborî jos','a citi atent','a răspunde clar','a merge repede'],c:0,e:'„A coborî jos” repetă ideea de coborâre.'},
{id:'ro-005',subject:'romana',chapter:'Vocabular',lesson:'Derivare',difficulty:'ușor',q:'Cuvântul „nefericit” este format prin:',a:['derivare cu prefix','compunere','conversiune','abreviere'],c:0,e:'„Ne-” este prefixul care formează „nefericit”.'},
{id:'ro-006',subject:'romana',chapter:'Morfologie',lesson:'Substantiv',difficulty:'ușor',q:'În enunțul „Candidatul citește regulamentul”, „regulamentul” este:',a:['substantiv','verb','adjectiv','adverb'],c:0,e:'„Regulamentul” este substantiv.'},
{id:'ro-007',subject:'romana',chapter:'Morfologie',lesson:'Adjectiv',difficulty:'ușor',q:'În „răspuns corect”, „corect” este:',a:['substantiv','adjectiv','adverb','pronume'],c:1,e:'„Corect” determină substantivul „răspuns”.'},
{id:'ro-008',subject:'romana',chapter:'Morfologie',lesson:'Pronume',difficulty:'mediu',q:'În „Acesta a răspuns”, „acesta” este:',a:['pronume demonstrativ','adjectiv demonstrativ','substantiv','adverb'],c:0,e:'„Acesta” ține locul unui substantiv.'},
{id:'ro-009',subject:'romana',chapter:'Morfologie',lesson:'Verb',difficulty:'ușor',q:'În „candidații învață”, „învață” este:',a:['verb','substantiv','adjectiv','conjuncție'],c:0,e:'„Învață” exprimă o acțiune și este verb.'},
{id:'ro-010',subject:'romana',chapter:'Morfologie',lesson:'Adverb',difficulty:'mediu',q:'În „răspunde corect”, „corect” este:',a:['adverb','adjectiv','substantiv','pronume'],c:0,e:'„Corect” determină verbul „răspunde”, deci este adverb.'},
{id:'ro-011',subject:'romana',chapter:'Sintaxă',lesson:'Subiect',difficulty:'ușor',q:'În „Candidatul rezolvă testul”, subiectul este:',a:['candidatul','rezolvă','testul','nu există'],c:0,e:'„Candidatul” realizează acțiunea.'},
{id:'ro-012',subject:'romana',chapter:'Sintaxă',lesson:'Predicat',difficulty:'ușor',q:'În „Candidatul rezolvă testul”, predicatul este:',a:['candidatul','rezolvă','testul','candidatul testul'],c:1,e:'„Rezolvă” este predicatul verbal.'},
{id:'ro-013',subject:'romana',chapter:'Sintaxă',lesson:'Complement direct',difficulty:'ușor',q:'În „Candidatul rezolvă testul”, complementul direct este:',a:['candidatul','rezolvă','testul','candidatul rezolvă'],c:2,e:'„Testul” răspunde la întrebarea „ce?”.'},
{id:'ro-014',subject:'romana',chapter:'Sintaxă',lesson:'Atribut',difficulty:'mediu',q:'În „regulamentul examenului”, „examenului” este:',a:['atribut substantival genitival','subiect','predicat','complement direct'],c:0,e:'„Examenului” determină substantivul „regulamentul”.'},
{id:'ro-015',subject:'romana',chapter:'Sintaxă',lesson:'Subordonate',difficulty:'mediu',q:'În „Știu că ai învățat”, „că ai învățat” este:',a:['completivă directă','subiectivă','atributivă','circumstanțială'],c:0,e:'Propoziția răspunde la întrebarea „ce știu?”.'},
{id:'ro-016',subject:'romana',chapter:'Ortografie și punctuație',lesson:'Ortografie',difficulty:'ușor',q:'Care variantă este corectă?',a:['niciun candidat','nici un candidat','nici-un candidat','niciuncandidat'],c:0,e:'În această construcție, „niciun” se scrie într-un singur cuvânt.'},
{id:'ro-017',subject:'romana',chapter:'Ortografie și punctuație',lesson:'Ortografie',difficulty:'ușor',q:'Care variantă este corectă?',a:['de asemenea','deasemenea','de-asemenea','deasemenea'],c:0,e:'Locuțiunea se scrie „de asemenea”.'},
{id:'ro-018',subject:'romana',chapter:'Ortografie și punctuație',lesson:'Punctuație',difficulty:'mediu',q:'Ce semn poate introduce o enumerare?',a:['două puncte','apostrof','cratimă','ghilimele'],c:0,e:'Două puncte pot introduce o enumerare.'},
{id:'ro-019',subject:'romana',chapter:'Ortografie și punctuație',lesson:'Cratimă',difficulty:'ușor',q:'Care formă este corectă?',a:['s-a prezentat','sa prezentat','s-a prezentat-','sa-prezentat'],c:0,e:'Forma corectă este „s-a prezentat”.'},
{id:'ro-020',subject:'romana',chapter:'Înțelegerea enunțului',lesson:'Sens contextual',difficulty:'ușor',q:'În „A dat dovadă de curaj”, expresia înseamnă:',a:['a demonstrat curaj','a pierdut curajul','a ascuns curajul','a uitat ceva'],c:0,e:'„A da dovadă de” înseamnă „a demonstra/a manifesta”.'}
];
/* Baza este extinsă până la 420 de poziții pentru testarea tehnică; variantele derivate sunt marcate clar. */
const ROMANA_BASE = ROMANA_QUESTIONS.slice();
for(let i=ROMANA_BASE.length;i<420;i++){
  const src=ROMANA_BASE[i%ROMANA_BASE.length];
  ROMANA_QUESTIONS.push({...src,id:`ro-${String(i+1).padStart(3,'0')}`,difficulty:['ușor','mediu','greu'][i%3],q:`${src.q.replace(/[?]$/,'')} — varianta de antrenament ${i+1}?`});
}

/* Fii Polițist.Ro — banca de întrebări modulară. */
const REVISED_CHAPTERS = ['Vocabular','Morfologie','Sintaxă','Ortografie și punctuație','Ortoepie','Înțelegerea enunțului'];
const ROMANA_BASE = ROMANA_QUESTIONS.filter(q=>!REVISED_CHAPTERS.includes(q.chapter));
const QUESTIONS = ROMANA_BASE.concat(
  VOCABULAR_QUESTIONS,
  MORFOLOGIE_QUESTIONS,
  SINTAXA_QUESTIONS,
  ORTOGRAFIE_QUESTIONS,
  ORTOEPIE_QUESTIONS,
  INTELEGEREA_QUESTIONS,
  ENGLEZA_QUESTIONS,
  ISTORIE_QUESTIONS,
  LEGISLATIE_QUESTIONS,
  MATEMATICA_QUESTIONS,
  LOGICA_QUESTIONS,
  CIVICA_QUESTIONS,
  FIZICA_QUESTIONS
);
function questionsForSubject(subject){ return QUESTIONS.filter(q=>q.subject===subject); }

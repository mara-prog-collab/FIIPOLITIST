const EXAMS = {
  campina: {
    name: 'Școala de Agenți de Poliție',
    shortName: 'Câmpina / Cluj-Napoca',
    description: 'Pregătire organizată pe materii și capitole, cu teste grilă și simulări.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Ortografie și punctuație', 'Sintaxă'] },
      { id: 'engleza', name: 'Limba engleză', icon: 'EN', chapters: ['Grammar', 'Vocabulary', 'Reading'] },
      { id: 'legislatie', name: 'Legislație MAI', icon: 'LG', chapters: ['Poliția Română', 'Statutul polițistului', 'Instituții și norme'] },
      { id: 'educatie-civica', name: 'Educație civică', icon: 'CV', chapters: ['Cetățenie', 'Drepturi și obligații', 'Instituții'] },
      { id: 'logica', name: 'Analiză și raționament', icon: 'LO', chapters: ['Logică', 'Analiză', 'Sinteză'] }
    ]
  },
  academia: {
    name: 'Academia de Poliție',
    shortName: 'Facultatea de Poliție — licență',
    description: 'Pregătire pentru proba de cunoștințe, structurată pe discipline și capitole.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Sintaxă', 'Ortografie și punctuație'] },
      { id: 'istorie', name: 'Istorie', icon: 'IS', chapters: ['Romanitatea românilor', 'Evul Mediu', 'România modernă', 'România contemporană'] },
      { id: 'engleza', name: 'Limba engleză', icon: 'EN', chapters: ['Grammar', 'Vocabulary', 'Reading'] }
    ]
  },
  frontiera: {
    name: 'Poliția de Frontieră',
    shortName: 'Pregătire admitere',
    description: 'Pregătire pentru admiterea în structurile Poliției de Frontieră, cu materii și teste dedicate.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Ortografie și punctuație', 'Sintaxă'] },
      { id: 'engleza', name: 'Limba engleză', icon: 'EN', chapters: ['Grammar', 'Vocabulary', 'Reading'] },
      { id: 'legislatie', name: 'Legislație MAI', icon: 'LG', chapters: ['Poliția de Frontieră', 'Statutul polițistului', 'Instituții și norme'] },
      { id: 'educatie-civica', name: 'Educație civică', icon: 'CV', chapters: ['Cetățenie', 'Drepturi și obligații', 'Instituții'] },
      { id: 'logica', name: 'Analiză și raționament', icon: 'LO', chapters: ['Logică', 'Analiză', 'Sinteză'] }
    ]
  },
  pompieri: {
    name: 'Pompieri',
    shortName: 'Facultatea de Pompieri / pregătire IGSU',
    description: 'Pregătire pentru probele specifice, inclusiv matematică și fizică pentru Facultatea de Pompieri.',
    subjects: [
      { id: 'matematica', name: 'Matematică', icon: 'MA', chapters: ['Algebră', 'Funcții', 'Analiză matematică', 'Ecuații și probleme'] },
      { id: 'fizica', name: 'Fizică', icon: 'FI', chapters: ['Mecanică', 'Fizică moleculară și termodinamică', 'Electricitate'] }
    ]
  },
  jandarmerie: {
    name: 'Jandarmerie',
    shortName: 'Pregătire admitere',
    description: 'Teste și simulări pentru consolidarea cunoștințelor necesare admiterii.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Ortografie și punctuație', 'Sintaxă'] },
      { id: 'engleza', name: 'Limba engleză', icon: 'EN', chapters: ['Grammar', 'Vocabulary', 'Reading'] },
      { id: 'legislatie', name: 'Legislație MAI', icon: 'LG', chapters: ['Jandarmeria Română', 'Statutul polițistului', 'Instituții și norme'] },
      { id: 'educatie-civica', name: 'Educație civică', icon: 'CV', chapters: ['Cetățenie', 'Drepturi și obligații', 'Instituții'] },
      { id: 'logica', name: 'Analiză și raționament', icon: 'LO', chapters: ['Logică', 'Analiză', 'Sinteză'] }
    ]
  }
};

function getSelectedExamKey() {
  return localStorage.getItem('fp_exam_key') || 'campina';
}
function setSelectedExamKey(key) {
  if (EXAMS[key]) localStorage.setItem('fp_exam_key', key);
}

const EXAMS = {
  campina: {
    name: 'Școala de Agenți de Poliție',
    shortName: 'Câmpina / Cluj-Napoca',
    description: 'Pregătire organizată pe materii și capitole, cu teste grilă și simulări.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Ortografie și punctuație'] },
      { id: 'legislatie', name: 'Legislație', icon: 'LG', chapters: ['Noțiuni introductive', 'Instituții și autorități', 'Norme și proceduri'] },
      { id: 'istorie', name: 'Istorie', icon: 'IS', chapters: ['România modernă', 'România contemporană', 'Constituirea statului român'] }
    ]
  },
  academia: {
    name: 'Academia de Poliție',
    shortName: 'Admitere licență',
    description: 'Pregătire pentru probele academice, structurată pe discipline.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Sintaxă'] },
      { id: 'istorie', name: 'Istorie', icon: 'IS', chapters: ['Istorie modernă', 'Istorie contemporană', 'Instituții'] },
      { id: 'legislatie', name: 'Legislație', icon: 'LG', chapters: ['Noțiuni juridice', 'Instituții publice', 'Norme'] }
    ]
  },
  frontiera: {
    name: 'Poliția de Frontieră',
    shortName: 'Pregătire admitere',
    description: 'Teste de antrenament și simulări pentru pregătirea admiterii.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Ortografie'] },
      { id: 'legislatie', name: 'Legislație', icon: 'LG', chapters: ['Legislație relevantă', 'Instituții', 'Proceduri'] }
    ]
  },
  pompieri: {
    name: 'Pompieri',
    shortName: 'Școli de subofițeri',
    description: 'Pregătire pentru probele teoretice, cu progres pe discipline.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Ortografie'] },
      { id: 'legislatie', name: 'Legislație', icon: 'LG', chapters: ['Noțiuni de bază', 'Instituții', 'Reguli'] }
    ]
  },
  jandarmerie: {
    name: 'Jandarmerie',
    shortName: 'Pregătire admitere',
    description: 'Teste și simulări pentru consolidarea cunoștințelor.',
    subjects: [
      { id: 'romana', name: 'Limba română', icon: 'RO', chapters: ['Gramatică', 'Vocabular', 'Ortografie'] },
      { id: 'legislatie', name: 'Legislație', icon: 'LG', chapters: ['Noțiuni de bază', 'Instituții', 'Reguli'] }
    ]
  }
};

function getSelectedExamKey() {
  return localStorage.getItem('fp_exam_key') || 'campina';
}
function setSelectedExamKey(key) {
  if (EXAMS[key]) localStorage.setItem('fp_exam_key', key);
}

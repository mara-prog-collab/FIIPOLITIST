const SUBJECTS={
 romana:{id:'romana',name:'Limba română',icon:'RO',chapters:['Vocabular','Morfologie','Sintaxă','Ortografie și punctuație','Ortoepie','Înțelegerea enunțului']},
 engleza:{id:'engleza',name:'Limba engleză',icon:'EN',chapters:['Grammar','Vocabulary','Tenses','Conditionals','Prepositions & phrasal verbs']},
 istorie:{id:'istorie',name:'Istorie',icon:'IS',chapters:['Romanitatea românilor','Evul Mediu','România modernă','România contemporană']},
 legislatie:{id:'legislatie',name:'Legislație MAI',icon:'LG',chapters:['Poliția Română','Statutul polițistului','Jandarmeria Română','Poliția de Frontieră','Instituții și norme']},
 civica:{id:'educatie-civica',name:'Educație civică',icon:'CV',chapters:['Cetățenie','Drepturi și obligații','Instituții','Analiză și sinteză']},
 logica:{id:'logica',name:'Analiză și raționament',icon:'LO',chapters:['Logică','Analiză','Sinteză']},
 matematica:{id:'matematica',name:'Matematică',icon:'MA',chapters:['Algebră','Funcții','Analiză matematică','Ecuații și probleme']},
 fizica:{id:'fizica',name:'Fizică',icon:'FI',chapters:['Mecanică','Fizică moleculară și termodinamică','Electricitate']}
};
const EXAMS={
 campina:{name:'Școala de Agenți de Poliție',shortName:'Câmpina / Cluj-Napoca',description:'Pregătire pentru testul de cunoștințe, organizată pe discipline și capitole.',subjects:[SUBJECTS.romana,SUBJECTS.engleza,SUBJECTS.legislatie,SUBJECTS.civica,SUBJECTS.logica]},
 academia:{name:'Academia de Poliție',shortName:'Facultatea de Poliție — licență',description:'Pregătire pentru proba de cunoștințe, structurată pe discipline și capitole.',subjects:[SUBJECTS.romana,SUBJECTS.istorie,SUBJECTS.engleza]},
 frontiera:{name:'Poliția de Frontieră',shortName:'Pregătire admitere',description:'Pregătire pentru admiterea în structurile Poliției de Frontieră, cu materii și teste dedicate.',subjects:[SUBJECTS.romana,SUBJECTS.engleza,SUBJECTS.legislatie,SUBJECTS.civica,SUBJECTS.logica]},
 pompieri:{name:'Facultatea de Pompieri',shortName:'Academia de Poliție — Pompieri',description:'Pregătire pentru proba teoretică de admitere la Facultatea de Pompieri.',subjects:[SUBJECTS.matematica,SUBJECTS.fizica]},
 jandarmerie:{name:'Jandarmerie',shortName:'Pregătire admitere',description:'Teste și simulări pentru consolidarea cunoștințelor necesare admiterii.',subjects:[SUBJECTS.romana,SUBJECTS.engleza,SUBJECTS.legislatie,SUBJECTS.civica,SUBJECTS.logica]}
};
function getSelectedExamKey(){return localStorage.getItem('fp_exam_key')||'campina'}
function setSelectedExamKey(key){if(EXAMS[key])localStorage.setItem('fp_exam_key',key)}
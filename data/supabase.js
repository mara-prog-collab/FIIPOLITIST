/* Fii Polițist.Ro — client Supabase.
   Dacă nu sunt configurate, aplicația continuă să folosească localStorage. */

const SUPABASE_URL = 'https://dduzavdfkxyutrdagsvp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_aKM9MqejuiTbx2xoMp4j9w_fpjSACk5';

let fpSupabase = null;

function supabaseConfigured(){
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY && window.supabase);
}

function getSupabase(){
  if(!supabaseConfigured()) return null;
  if(!fpSupabase) fpSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  return fpSupabase;
}

async function fpUser(){
  const client=getSupabase();
  if(!client) return null;
  const {data}=await client.auth.getUser();
  return data?.user || null;
}

async function fpSaveAttempt(attempt, answers=[]){
  const client=getSupabase(), user=await fpUser();
  if(!client || !user) return false;
  const {data,error}=await client.from('test_attempts').insert({
    user_id:user.id, exam_key:attempt.examKey, mode:attempt.mode || 'test',
    total_questions:attempt.totalQuestions, correct_answers:attempt.correctAnswers,
    score:attempt.score ?? null, duration_seconds:attempt.durationSeconds ?? null
  }).select('id').single();
  if(error) throw error;
  if(answers.length){
    const rows=answers.map(a=>({
      attempt_id:data.id,user_id:user.id,question_id:String(a.id),subject_id:a.subject||null,
      chapter:a.chapter||null,selected_answer:a.selected||null,correct:Boolean(a.correct)
    }));
    const result=await client.from('question_answers').insert(rows);
    if(result.error) throw result.error;
  }
  return true;
}

async function fpSaveProgress(examKey, subjectId, answered, correct, testsCompleted=0){
  const client=getSupabase(), user=await fpUser();
  if(!client || !user) return false;
  const result=await client.from('user_progress').upsert({
    user_id:user.id,exam_key:examKey,subject_id:subjectId,
    questions_answered:answered,correct_answers:correct,tests_completed:testsCompleted,
    updated_at:new Date().toISOString()
  },{onConflict:'user_id,exam_key,subject_id'});
  if(result.error) throw result.error;
  return true;
}

async function fpLoadProgress(examKey){
  const client=getSupabase(), user=await fpUser();
  if(!client || !user) return null;
  const {data,error}=await client.from('user_progress').select('*').eq('user_id',user.id).eq('exam_key',examKey);
  if(error) throw error;
  return data || [];
}

async function fpToggleFavorite(questionId, active){
  const client=getSupabase(), user=await fpUser();
  if(!client || !user) return false;
  if(active){
    const r=await client.from('favorites').upsert({user_id:user.id,question_id:String(questionId)});
    if(r.error) throw r.error;
  }else{
    const r=await client.from('favorites').delete().eq('user_id',user.id).eq('question_id',String(questionId));
    if(r.error) throw r.error;
  }
  return true;
}

async function fpToggleWrong(questionId, active){
  const client=getSupabase(), user=await fpUser();
  if(!client || !user) return false;
  if(active){
    const r=await client.from('wrong_questions').upsert({user_id:user.id,question_id:String(questionId),last_answered_at:new Date().toISOString()});
    if(r.error) throw r.error;
  }else{
    const r=await client.from('wrong_questions').delete().eq('user_id',user.id).eq('question_id',String(questionId));
    if(r.error) throw r.error;
  }
  return true;
}

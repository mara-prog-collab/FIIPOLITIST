/* Fii Polițist.Ro — acces PRO sincronizat cu abonamentul din Supabase. */
const PRO_PRICE='15 lei/lună';
function isPro(){return localStorage.getItem('fp_pro')==='active'}
function setPro(active){localStorage.setItem('fp_pro',active?'active':'inactive');window.dispatchEvent(new Event('fp-pro-change'))}
async function fpSubscription(){
  const client=getSupabase();
  if(!client) return null;
  const user=await fpUser();
  if(!user) return null;
  const {data,error}=await client.from('subscriptions').select('*').eq('user_id',user.id).maybeSingle();
  if(error) throw error;
  return data;
}
async function fpRefreshPro(){
  try{const sub=await fpSubscription(); const active=!!sub && ['active','trialing'].includes(sub.status) && (!sub.current_period_end || new Date(sub.current_period_end)>new Date()); setPro(active); return active;}catch(e){return isPro()}
}
async function requirePro(){
  const active=await fpRefreshPro();
  if(active)return true;
  location.href='abonament.html';
  return false;
}

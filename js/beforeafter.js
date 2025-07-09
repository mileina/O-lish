document.querySelectorAll('.ba-slider').forEach(slider=>{
  const before  = slider.querySelector('.ba-before');
  const handle  = slider.querySelector('.ba-handle');
  let   drag    = false;

  const clamp=(v,mn,mx)=>Math.min(Math.max(v,mn),mx);

  function move(x){
    const r   = slider.getBoundingClientRect();
    const pct = clamp((x-r.left)/r.width,0,1);            // 0 → 1
    const perc = (pct*100).toFixed(2)+'%';
    before.style.clipPath = `inset(0 ${100-pct*100}% 0 0)`; // masque droite
    handle.style.left     = perc;
  }

  const down=e=>{drag=true;move(e.touches?e.touches[0].clientX:e.clientX);}
  const moveEvt=e=>{if(drag)move(e.touches?e.touches[0].clientX:e.clientX);}
  const up=()=>drag=false;

  slider.addEventListener('mousedown',down);
  slider.addEventListener('touchstart',down,{passive:true});
  window.addEventListener('mousemove',moveEvt);
  window.addEventListener('touchmove',moveEvt,{passive:false});
  window.addEventListener('mouseup',up);
  window.addEventListener('touchend',up);
});

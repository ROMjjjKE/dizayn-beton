(function(){
  var burger=document.getElementById('burger'),drawer=document.getElementById('drawer'),dclose=document.getElementById('dclose');
  function openD(){drawer.setAttribute('data-open','true');document.body.classList.add('is-locked');document.body.style.overflow='hidden';burger&&burger.setAttribute('aria-expanded','true');}
  function closeD(){drawer.setAttribute('data-open','false');document.body.classList.remove('is-locked');document.body.style.overflow='';burger&&burger.setAttribute('aria-expanded','false');}
  burger&&burger.addEventListener('click',openD);
  dclose&&dclose.addEventListener('click',closeD);
  drawer&&drawer.addEventListener('click',function(e){if(e.target===drawer)closeD();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeD();});

  var root=document.getElementById('calcOut'); if(!root) return;
  var H=document.getElementById('hH'), W=document.getElementById('hW'), out=document.getElementById('calcOut'), plan=document.getElementById('calcPlan'), btn=document.getElementById('calcBtn');
  function val(id,d){var e=document.getElementById(id);var v=parseFloat((e&&e.value||'').replace(',','.'));return isFinite(v)?v:d;}
  function fmt(n,d){return n.toFixed(d).replace('.',',');}
  function type(){var r=document.querySelector('input[name=tType]:checked');return r?r.value:'pryam';}
  function calc(){
    var h=V('hH',2900), w=V('hW',1000), t=type();
    var n=Math.max(3,Math.round(h/175)), riser=h/n, tread=(t==='z'?270:300);
    var flights=(t==='pryam'?1:2);
    var run=(n-1)*tread;
    var slab=Math.sqrt(run*run+h*h)/1000*(w/1000)*(t==='z'?0.11:0.12);
    var st=n*0.5*(riser/1000)*(tread/1000)*(w/1000);
    var vol=slab+st, weight=vol*2.5;
    var cells=[['ступеней','<b>'+n+'</b><span>подъём '+Math.round(riser)+' мм</span>'],
      ['проступь','<b>'+tread+' мм</b><span>ширина марша '+w+' мм</span>'],
      ['длина марша','<b>'+Math.round(run/10)*10+' мм</b><span>'+(flights>1?'два марша и площадка':'один марш')+'</span>'],
      ['объём бетона','<b>'+fmt(vol,2)+' м³</b><span>с запасом на примыкания</span>'],
      ['вес монолита','<b>'+fmt(weight,1)+' т</b><span>плотность 2,5 т/м³</span>'],
      ['набор прочности','<b>28 дней</b><span>распалубка на 7–10 день</span>']];
    out.innerHTML='';
    cells.forEach(function(c){var d=document.createElement('div');d.innerHTML=c[1];out.appendChild(d);});
    draw(n,riser,tread,h,w,run);
    var msg='Расчёт лестницы с сайта Дизайн-Бетон: высота этажа '+h+' мм, '+(t==='pryam'?'прямая':t==='g'?'Г-образная':t==='p'?'П-образная':'с забежными ступенями')+', ширина марша '+w+' мм. Ступеней '+n+', подъём '+Math.round(riser)+' мм, проступь '+tread+' мм, длина марша '+Math.round(run)+' мм, объём бетона '+fmt(vol,2)+' м³, вес '+fmt(weight,1)+' т.';
    btn.href='https://wa.me/375333827488?text='+encodeURIComponent(msg);
  }
  function draw(n,riser,tread,h,w,run){
    var Wp=520,Hp=250,pad=44;
    var sx=(Wp-pad*2)/Math.max(run,1), sy=(Hp-pad*2)/Math.max(h,1), s=Math.min(sx,sy);
    var pts=[],x=pad,y=Hp-pad;
    pts.push([x,y]);
    for(var i=0;i<n;i++){x+=tread*s;pts.push([x,y]);y-=riser*s;pts.push([x,y]);}
    var poly=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');
    var svg='<svg viewBox="0 0 '+Wp+' '+Hp+'" role="img" aria-label="Разрез лестницы"><rect width="'+Wp+'" height="'+Hp+'" fill="#F7F6F2"/>';
    svg+='<polyline points="'+poly+'" fill="none" stroke="#16181A" stroke-width="2"/>';
    svg+='<line x1="'+pad+'" y1="'+(Hp-pad)+'" x2="'+(pad+run*s)+'" y2="'+(Hp-pad)+'" stroke="#8F5A38" stroke-width="1"/>';
    svg+='<line x1="'+pad+'" y1="'+(Hp-pad)+'" x2="'+pad+'" y2="'+(Hp-pad-h*s)+'" stroke="#8F5A38" stroke-width="1" stroke-dasharray="4 3"/>';
    svg+='<text x="'+(pad+run*s+4)+'" y="'+(Hp-pad+12)+'" font-family="IBM Plex Mono,monospace" font-size="9" fill="#8F5A38">'+Math.round(run)+' мм</text>';
    svg+='<text x="4" y="'+(Hp-pad-h*s+4)+'" font-family="IBM Plex Mono,monospace" font-size="9" fill="#8F5A38">'+Math.round(h)+' мм</text>';
    svg+='<text x="'+pad+'" y="18" font-family="IBM Plex Mono,monospace" font-size="9" fill="#6B7075">'+n+' ступеней · подъём '+Math.round(riser)+' мм · проступь '+tread+' мм</text>';
    svg+='</svg>';
    plan.innerHTML=svg;
  }
  function V(id,d){var e=document.getElementById(id);if(!e)return d;if(e.value==='')return d;var v=parseFloat(String(e.value).replace(',','.'));return isFinite(v)?v:d;}
  ['hH','hW'].forEach(function(id){var e=document.getElementById(id);e&&e.addEventListener('input',calc);e&&e.addEventListener('change',calc);});
  Array.prototype.forEach.call(document.querySelectorAll('input[name=tType]'),function(r){r.addEventListener('change',calc);});
  calc();
})();

document.getElementById('sendForm')&&document.getElementById('sendForm').addEventListener('click',function(e){
  e.preventDefault();var g=function(n){var el=document.querySelector('[name='+n+']');return el?el.value.trim():'';};
  var msg='Заявка с сайта Дизайн-Бетон: '+g('name')+' · '+g('tel')+' · объект: '+g('obj')+' · задача: '+g('task');
  document.getElementById('formout').textContent='Открываем WhatsApp с готовым сообщением';
  window.open('https://wa.me/375333827488?text='+encodeURIComponent(msg),'_blank');
});

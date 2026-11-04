// Roda antes da pintura: aplica o tema salvo (escuro por padrão) e marca que há JS.
export const THEME_SCRIPT = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem("theme")}catch(e){}d.dataset.theme=t==="light"?"light":"dark";d.classList.add("js")})()`;

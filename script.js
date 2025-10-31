document.addEventListener("DOMContentLoaded", () => {
  const sidebar=document.querySelector(".sidebar");
  const toggleBtn=document.querySelector(".toggle-btn");
  const themeBtn=document.querySelector(".theme-btn");
  const body=document.body;

  // Sidebar
  toggleBtn.addEventListener("click",()=>sidebar.classList.toggle("hidden"));
  document.querySelectorAll(".menu a").forEach(a=>{
    a.addEventListener("click",()=>{ if(window.innerWidth<=820) sidebar.classList.add("hidden") })
  });

  // Dark mode con localStorage
  if(localStorage.getItem("theme")==="dark"){body.classList.add("dark-mode");themeBtn.innerHTML='<i class="fas fa-sun"></i>';}
  themeBtn.addEventListener("click",()=>{
    body.classList.toggle("dark-mode");
    if(body.classList.contains("dark-mode")){
      localStorage.setItem("theme","dark");
      themeBtn.innerHTML='<i class="fas fa-sun"></i>';
    }else{
      localStorage.setItem("theme","light");
      themeBtn.innerHTML='<i class="fas fa-moon"></i>';
    }
  });

  // Scroll suave
  document.querySelectorAll(".menu a").forEach(link=>{
    link.addEventListener("click",e=>{
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({behavior:"smooth"});
    });
  });

  // Contador animado
  function animateCounter(el,target,duration=1500){
    let start=0;const step=target/(duration/16);
    const t=setInterval(()=>{
      start+=step;
      if(start>=target){el.textContent=target;clearInterval(t)}
      else el.textContent=Math.floor(start);
    },16);
  }
  const statsObserver=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll(".stat-number").forEach(num=>{
          animateCounter(num,parseInt(num.textContent,10)||0);
        });
        statsObserver.unobserve(e.target);
      }
    });
  });
  const funFacts=document.querySelector(".fun-facts");
  if(funFacts) statsObserver.observe(funFacts);
});

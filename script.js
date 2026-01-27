function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

function toggleTheme(){
  document.body.classList.toggle("light-mode");
}

// Fade-in
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity=1;
      entry.target.style.transform="translateY(0)";
    }
  });
});

sections.forEach(sec=>observer.observe(sec));

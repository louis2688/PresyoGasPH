/** Runs before paint to avoid a light flash when dark mode is saved. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('presyogas-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.style.colorScheme='light';}}catch(e){}})();`;

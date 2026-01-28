const main = async () => {
  const resp = await fetch('data/slides.json');
  const slides = await resp.json();
  const grid = document.getElementById('talksGrid');
  slides.forEach((slide) => {
    const { link, title } = slide;
    const sectionEl = document.createElement('section');
    sectionEl.className =
      'talk-card rounded-xl min-h-[5rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] group';
    const anchorEl = document.createElement('a');
    anchorEl.className = 'w-full h-full flex items-center justify-center px-6 py-4';
    anchorEl.href = `slides.html?md=${encodeURIComponent(
      link
    )}&title=${encodeURIComponent(title)}`;
    anchorEl.target = '_blank';
    
    // Create text-only title for cleaner professional look
    const titleSpan = document.createElement('span');
    titleSpan.className = 'font-bold text-lg text-gray-200 group-hover:text-blue-400 transition-colors text-center tracking-wide uppercase leading-tight';
    titleSpan.textContent = title;

    anchorEl.appendChild(titleSpan);
    sectionEl.appendChild(anchorEl);
    
    // Prepend to ensure presentations come first
    grid.prepend(sectionEl);
    
    // Prepend to ensure presentations come first, or append if desired. 
    // Grid handles layout. Using prepend so the presentation is first item.
    grid.prepend(sectionEl);
  });
};

main();

const main = async () => {
  const resp = await fetch('data/slides.json');
  const slides = await resp.json();
  const grid = document.getElementById('talksGrid');
  slides.forEach((slide) => {
    const { link, title } = slide;
    const sectionEl = document.createElement('section');
    sectionEl.className =
      'talk-card rounded-md p-4 cursor-pointer transition-all duration-200';
    const anchorEl = document.createElement('a');
    anchorEl.className = 'w-full h-full block text-lg';
    anchorEl.href = `slides.html?md=${encodeURIComponent(
      link
    )}&title=${encodeURIComponent(title)}`;
    anchorEl.target = '_blank';
    anchorEl.textContent = title;
    sectionEl.appendChild(anchorEl);
    grid.appendChild(sectionEl);
  });
};

main();

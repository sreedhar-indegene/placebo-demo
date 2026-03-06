export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cols = row.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  const titleText = cols[0].querySelector('p')?.textContent.trim();
  const urlText = cols[1].querySelector('p')?.textContent.trim();

  if (!urlText) return;

  let videoId = '';

  try {
    const url = new URL(urlText);

    if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.replace('/', '');
    } else if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v');
    }
  } catch (e) {
    return;
  }

  if (!videoId) return;

  // Main container
  const container = document.createElement('div');
  container.className = 'pbvideo-container';

  // Title
  if (titleText) {
    const title = document.createElement('h3');
    title.className = 'pbvideo-title';
    title.textContent = titleText;
    container.append(title);
  }

  // Video wrapper
  const frame = document.createElement('div');
  frame.className = 'pbvideo-frame';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  iframe.loading = 'lazy';
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  frame.append(iframe);
  container.append(frame);

  block.textContent = '';
  block.append(container);
}
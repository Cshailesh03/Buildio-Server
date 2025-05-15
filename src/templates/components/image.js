export function renderImage(props = {}) {
  const style = styleObjToString(props.style);
  const src = props.src || '';
  const alt = props.alt || '';
  return `<img src="${src}" alt="${alt}" style="${style}" />`;
}

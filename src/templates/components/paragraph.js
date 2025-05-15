export default function renderParagraph(props = {}) {
  const { text = '', fontSize = '16px' } = props;
  return `<p style="font-size: ${fontSize}">${text}</p>`;
}

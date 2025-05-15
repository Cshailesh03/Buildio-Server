export default function renderHeading(props = {}) {
  const { text = '', fontSize = '24px' } = props;
  return `<h1 style="font-size: ${fontSize}">${text}</h1>`;
}

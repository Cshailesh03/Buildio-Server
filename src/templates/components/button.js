export default function renderButton(props = {}) {
  const { text = 'Click', targetUrl = '#', backgroundColor = '#007bff', color = '#fff' } = props;
  return `<a href="${targetUrl}" style="display:inline-block;padding:10px 20px;background:${backgroundColor};color:${color};text-decoration:none;border-radius:5px;">${text}</a>`;
}

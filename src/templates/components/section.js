export default function renderSection(props = {}, children = '') {
  const style = propsToStyle(props);
  return `<section style="${style}">${children}</section>`;
}

function propsToStyle(props) {
  return Object.entries(props)
    .map(([key, val]) => `${camelToKebab(key)}: ${val}`)
    .join('; ');
}

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

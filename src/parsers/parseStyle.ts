import css from 'css';

export function parseStyle(style: string) {
  const ast = css.parse(style);
  const rules: Array<css.Rule> = ast?.stylesheet?.rules || [];
  for (const rule of rules) {
    if (rule.type !== 'rule') continue;
    const declarations: Array<css.Declaration> = rule.declarations || [];
    for (let i = 0; i < declarations.length; i++) {
      if (!isBlacklisted(declarations[i])) continue;
      declarations.splice(i, 1);
      i--;
    }
  }
  return css.stringify(ast);
}

function isBlacklisted(dec: css.Declaration) {
  if (dec.property === 'font-family') return true;
  if (dec.property === 'font-size') return true;
  if (dec.property === 'letter-spacing') return true;
  if (dec.property === 'line-height') return true;
  if (dec.property === 'text-align' && (dec.value === 'justify' || dec.value === 'left')) return true;
  if (dec.property === 'word-spacing') return true;
  return false;
}

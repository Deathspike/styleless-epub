import css from 'css';

export function parseStyle(style: string) {
  const ast = css.parse(style);
  const rules: Array<css.Rule> = ast?.stylesheet?.rules || [];
  for (const rule of rules) {
    if (rule.type !== 'rule') continue;
    const declarations: Array<css.Declaration> = rule.declarations || [];
    for (let i = 0; i < declarations.length; i++) {
      const declaration = declarations[i];
      if (!declaration.property) continue;
      if (!blacklist.includes(declaration.property)) continue;
      declarations.splice(i, 1);
      i--;
    }
  }
  return css.stringify(ast);
}

const blacklist = [
  'color',
  'font-family',
  'font-size',
  'letter-spacing',
  'line-height',
  'text-indent',
  'word-spacing'
];

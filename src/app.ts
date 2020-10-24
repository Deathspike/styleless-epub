import AdmZip from 'adm-zip';
import css from 'css';
const blacklist = [
  'line-height',
  'letter-spacing',
  'font-family',
  'font-size',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left'
];

async function fileAsync(filePath: string) {
  const zip = new AdmZip(filePath);
  const zipEntries = zip.getEntries();
  for (const zipEntry of zipEntries) {
    if (!/\.css$/.test(zipEntry.name)) continue;
    const originalCss = zipEntry.getData().toString('utf8');
    const modifiedCss = parse(originalCss);
    debugger;
  }
}

function parse(code: string) {
  const ast = css.parse(code);
  const rules = ofType<css.Rule>(ast?.stylesheet?.rules || []);

  for (const rule of rules) {
    if (rule.type !== 'rule') continue;
    const declarations = rule.declarations || [];
    for (let i = 0; i < declarations.length; i++) {
      const declaration = <css.Declaration> declarations[i];
      if (!declaration.property) continue;
      if (!blacklist.includes(declaration.property)) continue;
      declarations.splice(i, 1);
      i--;
      //declarations[i] = {comment: `${declaration.property}: ${declaration.value}`};
    }
  }

  return css.stringify(ast);
}

function ofType<T>(item: any[]) {
  return item as T[];
}


fileAsync('R:\\Books\\Keiichi Sigsawa\\Allison, Vol. 01_ Allison - Allison (17)\\Allison, Vol. 01_ Allison - All - Keiichi Sigsawa.epub')
  .catch(console.log.bind(console));

import * as app from '..';
import AdmZip from 'adm-zip';
import util from 'util';

export async function parseFileAsync(filePath: string) {
  const zip = new AdmZip(filePath);
  const zipEntries = zip.getEntries();
  for (const zipEntry of zipEntries) {
    if (!zipEntry.entryName.endsWith('.css')) continue;
    const originalCss = zipEntry.getData().toString('utf8');
    const modifiedCss = app.parseStyle(originalCss);
    zip.updateFile(zipEntry, Buffer.from(modifiedCss, 'utf8'));
    zip.addFile(`${zipEntry.entryName}.old`, Buffer.from(originalCss, 'utf8'))
  }
  await util.promisify(zip.writeZip)(undefined);
}

import * as app from '..';
import AdmZip from 'adm-zip';
import util from 'util';

export async function parseFileAsync(filePath: string) {
  console.log(`Fetching ${filePath}`);
  const zip = new AdmZip(filePath);
  const zipEntries = recordSet(zip.getEntries());
  for (const zipEntry of Object.values(zipEntries)) {
    if (!zipEntry.entryName.endsWith('.css')) continue;
    const backupName = `${zipEntry.entryName}.old`;
    const originalCss = zipEntry.getData().toString('utf8');
    const modifiedCss = app.parseStyle(originalCss);
    zip.updateFile(zipEntry, Buffer.from(modifiedCss, 'utf8'));
    if (zipEntries.hasOwnProperty(backupName)) continue;
    zip.addFile(backupName, Buffer.from(originalCss, 'utf8'))
  }
  await util.promisify(zip.writeZip)(undefined);
  console.log(`Finished ${filePath}`);
}

function recordSet(entries: AdmZip.IZipEntry[]) {
  const result: Record<string, AdmZip.IZipEntry> = {};
  entries.forEach(x => result[x.entryName] = x);
  return result;
}

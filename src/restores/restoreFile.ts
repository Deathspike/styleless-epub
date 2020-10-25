import AdmZip from 'adm-zip';
import util from 'util';

export async function restoreFileAsync(filePath: string) {
  console.log(`Fetching ${filePath}`);
  const zip = new AdmZip(filePath);
  const zipEntries = recordSet(zip.getEntries());
  for (const currentEntry of Object.values(zipEntries)) {
    if (!currentEntry.entryName.endsWith('.css.old')) continue;
    const otherEntry = zipEntries[currentEntry.entryName.replace(/\.old$/, '')];
    if (!otherEntry) continue;
    zip.updateFile(otherEntry, currentEntry.getData());
    zip.deleteFile(currentEntry);
  }
  await util.promisify(zip.writeZip)(undefined);
  console.log(`Finished ${filePath}`);
}

function recordSet(entries: AdmZip.IZipEntry[]) {
  const result: Record<string, AdmZip.IZipEntry> = {};
  entries.forEach(x => result[x.entryName] = x);
  return result;
}

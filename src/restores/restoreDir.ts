import * as app from '..';
import fs from 'fs';
import path from 'path';
import util from 'util';

export async function restoreDirAsync(dirPath: string) {
  const resourceNames = await util.promisify(fs.readdir)(dirPath);
  const resourcePaths = resourceNames.map(x => path.join(dirPath, x));
  for (const resourcePath of resourcePaths) {
    const stat = await util.promisify(fs.stat)(resourcePath);
    if (stat.isDirectory()) {
      await restoreDirAsync(resourcePath);
    } else if (resourcePath.endsWith('.epub')) {
      await app.restoreFileAsync(resourcePath);
    }
  }
}

import * as app from '..';
import fs from 'fs';
import path from 'path';
import util from 'util';

export async function parseDirAsync(dirPath: string) {
  const resourceNames = await util.promisify(fs.readdir)(dirPath);
  const resourcePaths = resourceNames.map(x => path.join(dirPath, x));
  for (const resourcePath of resourcePaths) {
    const stat = await util.promisify(fs.stat)(resourcePath);
    if (stat.isDirectory()) {
      await parseDirAsync(resourcePath);
    } else if (resourcePath.endsWith('.epub')) {
      console.log(`Fetching ${resourcePath}`);
      await app.parseFileAsync(resourcePath);
      console.log(`Finished ${resourcePath}`);
    }
  }
}

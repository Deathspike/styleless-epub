import * as app from '.';

app.parseDirAsync('R:\\Books')
  .then(() => app.restoreDirAsync('R:\\Books'))
  .catch(console.log.bind(console));

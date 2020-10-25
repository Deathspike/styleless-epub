import * as app from '.';
import commander from 'commander';

commander.createCommand()
  .description(require('../package').description)
  .name(require('../package').name)
  .version(require('../package').version)
  .addCommand(commander.createCommand('parse')
    .arguments('<resourcePath...>')
    .description('Parses epub styles.')
    .action(app.actions.parseAsync))
  .addCommand(commander.createCommand('restore')
    .arguments('<resourcePath...>')
    .description('Restores epub styles.')
    .action(app.actions.restoreAsync))
  .parse();

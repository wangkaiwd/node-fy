#!/usr/bin/env node
import { translate } from './main';

const program = require('commander');

program
  .version('0.0.1', '-v, --version', 'output the current version')
  .name('fy')
  .usage('<english>')
  .action((word: string): void => {
    translate(word);
  });

program.parse(process.argv);

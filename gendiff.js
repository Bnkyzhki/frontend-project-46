import { Command } from 'commander';
import { compareFiles } from './compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format[type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = compareFiles(filepath1, filepath2);
    console.log(diff);
  });

  program.configureHelp({
    optionTerm: (option) => option.flags,
    optionDescription: (option) => {
      if (option.flags === '-h, --help') {
        return 'output usage information';
      }
      return option.description;
    }
  });

program.parse(process.argv)
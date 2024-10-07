import { Command } from 'commander';
import path from 'path';
import { compareFiles } from './compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format[type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);
    const result = compareFiles(absolutePath1, absolutePath2);
    console.log(result);
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
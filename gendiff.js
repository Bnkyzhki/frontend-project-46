import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

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
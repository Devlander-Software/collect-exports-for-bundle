import inquirer from 'inquirer';
import yargs from 'yargs';
import { autoExporter } from './auto-exporter';
import { runCLI } from './cli-config'; // Assuming you've exported the function

jest.mock('inquirer');
jest.mock('yargs');
jest.mock('./auto-exporter');
test('Should parse arguments correctly', async () => {
    const mockYargsOutput = {
      directory: 'test',
      includeExtensions: ['.js'],
      excludeExtensions: [],
      excludeFolders: [],
      files: [],
    };
    
    (yargs as any).mockReturnValueOnce({
      argv: mockYargsOutput,
    });
  
    await runCLI();
  
    expect(autoExporter).toHaveBeenCalledWith(mockYargsOutput);
  });
  

  test('Should use inquirer for interactive prompts', async () => {
    const mockInquirerOutput = {
      directory: 'test',
      includeExtensions: ['.js'],
      excludeExtensions: [],
      excludeFolders: [],
      files: [],
    };
  
    (inquirer.prompt as jest.Mock).mockResolvedValueOnce(mockInquirerOutput);
  
    await runCLI();
  
    expect(autoExporter).toHaveBeenCalledWith(mockInquirerOutput);
  });
  
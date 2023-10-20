import { colorfulLog } from './color-log';
import { simulateProgressBar } from './stimulate-progress-bar'; // Replace 'your-module' with the actual module path

// Mock the colorfulLog function to track its calls
jest.mock('./color-log', () => ({
  colorfulLog: jest.fn(),
}));

describe('simulateProgressBar function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call colorfulLog with the correct message and color', () => {
    const message = 'Downloading:';
    const total = 100;
    const current = 50;

    simulateProgressBar(message, total, current);

    // Ensure colorfulLog is called with the expected message and color
    expect(colorfulLog).toHaveBeenCalledWith(expect.stringContaining(message), 'blue');
  });

  it('should call colorfulLog with the correct progress bar', () => {
    const message = 'Downloading:';
    const total = 100;
    const current = 50;

    simulateProgressBar(message, total, current);

    // Ensure colorfulLog is called with the expected progress bar format
    expect(colorfulLog).toHaveBeenCalledWith(
      expect.stringContaining(`[${'='.repeat(current)}${' '.repeat(total - current)}]`),
      'blue'
    );
  });

  it('should calculate the correct percentage', () => {
    const message = 'Downloading:';
    const total = 100;
    const current = 50;

    simulateProgressBar(message, total, current);

    // Ensure colorfulLog is called with the correct percentage
    expect(colorfulLog).toHaveBeenCalledWith(expect.stringContaining('50.00%'), 'blue');
  });
});

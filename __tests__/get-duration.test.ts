import { getDuration } from '../src/utils/get-duration';

describe('getDuration', () => {
  it('calculates duration correctly for valid times', () => {
    const oneHourMs = 3600000; // 1 hour in milliseconds
    const startTime = Date.now() - oneHourMs;
    const endTime = Date.now();

    const duration = getDuration(startTime, endTime);
    expect(duration).toBe('1h 0m 0s 0ms');
  });

  it('returns 0h 0m 0s when start time and end time are the same', () => {
    const time = Date.now();
    const duration = getDuration(time, time);
    expect(duration).toBe('0h 0m 0s 0ms');
  });

  it('throws an error when start time is after end time', () => {
    const startTime = Date.now();
    const endTime = startTime - 1000; // 1 second before start time

    expect(() => getDuration(startTime, endTime)).toThrow('Start time must be before end time');
  });

  // Additional tests can be added for other scenarios and edge cases
});

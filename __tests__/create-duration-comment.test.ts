import { createDurationComment } from "../src/comments/create-duration-comment";
import { getDuration } from "../src/utils/get-duration";

describe('createDurationComment', () => {

  it('should create a correct duration comment', () => {
    const startTime = 1000;
    const endTime = 2000;
   
    let duration = getDuration(startTime, endTime);
    const expectedComment = `/**
   * Start Time: ${new Date(startTime).toLocaleString()}
   * End Time: ${new Date(endTime).toLocaleString()}
   * Duration: ${duration}
   */
  `;
    const result = createDurationComment(startTime, endTime);
    expect(result).toBe(expectedComment);
  });

  // Additional tests can be added to cover different scenarios
});

import { createTitleComment } from '../src/utils/create-title-comment';

describe('createTitleComment', () => {
  test('should create a comment with given title and description', () => {
    const title = "Sample Function";
    const description = "This function does something";
    const currentDate = new Date().toISOString().split('T')[0];



    const expectedComment = `/**
    * Title: ${title}
    * Description: ${description}
    * Date: ${currentDate}
    */
    `.trim()
    const actualComment = createTitleComment(title, description);
    expect(actualComment).toBe(expectedComment);
  });

  // Additional test case: Empty title and description
  test('should handle empty title and description', () => {
    const title = "";
    const description = "";

    const expectedComment = '';
    const actualComment = createTitleComment(title, description);
    expect(actualComment).toBe(expectedComment);
  });
});

import { createTitleComment } from "../src/comments/create-title-comment";

describe('createTitleComment', () => {
  test('should create a comment with given title and description', () => {
    const title = "Sample Function";
    const description = "This function does something";
    const currentDate = new Date().toISOString().split('T')[0];

    // Note the indentation and the newline at the end
    const expectedComment = 
`/**
   * Title: ${title}
   * Description: ${description}
   * Date: ${currentDate}
   */
  `.trim();

    const actualComment = createTitleComment(title, description).trim();
    expect(actualComment).toBe(expectedComment);
  });

  // Additional test cases...
});

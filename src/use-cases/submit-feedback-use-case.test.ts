import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a example of a comment',
        screenshot: 'data:image/png;base64,8f0asg0f80asa',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a example of a comment',
        screenshot: 'data:image/png;base64,8f0asg0f80asa',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,8f0asg0f80asa',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot format', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a example of a comment',
        screenshot: 'image/png',
      }),
    ).rejects.toThrow();
  });
});

// o teste unitário é responsável por testar o corpo da função

import { SubmitFeedbackFunction } from "./submit-feedback-function";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackFunction(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "This is a bug",
      screenshot: "data:image/png;base64,9u3y48y4hrh"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "This is a bug",
      screenshot: "data:image/png;base64,9u3y48y4hrh"
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: "IDEA",
      comment: "",
      screenshot: "data:image/png;base64,9u3y48y4hrh"
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an screenshot format error', async () => {
    await expect(submitFeedback.execute({
      type: "IDEA",
      comment: "ta tudo bugado",
      screenshot: "teste.jpg"
    })).rejects.toThrow();
  });
})
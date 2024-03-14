import * as feedbackService from './feedbackService.js';

const getFeedback = async (c) => {
  const count = c.req.param('value');
  return c.text(
    `Feedback ${await count}: ${await feedbackService.getFeedback(count)}`
  );
};

const incremendAndGetFeedback = async (c) => {
  const count = c.req.param('value');
  await feedbackService.incrementFeedback(count);
  return c.text(await feedbackService.getFeedback(count));
};

const resetFeedbacks = async (c) => {
  await feedbackService.resetFeedbacks();
  return c.text('Feedbacks reset to zero.');
};

export { getFeedback, incremendAndGetFeedback, resetFeedbacks };

import { Eta } from 'https://deno.land/x/eta@v3.1.0/src/index.ts';
import * as feedbackService from './feedbackService.js';

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showFeedbackForm = async (c) => {
  const kv = await Deno.openKv();
  return c.html(eta.render('index.eta', { title: 'Feedbacks' }));
};

const getFeedback = async (c) => {
  const count = c.req.param('value');
  return c.text(
    `Feedback ${await count}: ${await feedbackService.getFeedback(count)}`
  );
};

const submitFeedback = async (c) => {
  const count = c.req.param('value');
  await feedbackService.submitFeedback(count);
  return c.redirect('/');
};

const resetFeedbacks = async (c) => {
  await feedbackService.resetFeedbacks();
  return c.text('Feedbacks reset to zero.');
};

export { getFeedback, submitFeedback, resetFeedbacks, showFeedbackForm };

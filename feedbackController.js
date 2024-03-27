import { Eta } from 'https://deno.land/x/eta@v3.1.0/src/index.ts';
import {
  getSignedCookie,
  setSignedCookie,
} from 'https://deno.land/x/hono@v3.7.4/helper.ts';
import * as feedbackService from './feedbackService.js';

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
export const secret = 'secret';
export const sessionFeedback = new Map();

const showFeedbackForm = async (c) => {
  const kv = await Deno.openKv();
  return c.html(eta.render('index.eta', { title: 'Feedbacks' }));
};

const getFeedback = async (c) => {
  const count = c.req.param('value');
  const id = c.req.param('id');
  return c.text(
    `Feedback ${await count}: ${await feedbackService.getFeedback(count, id)}`
  );
};

const submitFeedback = async (c) => {
  const count = c.req.param('value');
  const id = c.req.param('id');

  const sessionId =
    (await getSignedCookie(c, secret, 'sessionId')) ?? crypto.randomUUID();
  await setSignedCookie(c, 'sessionId', sessionId, secret, {
    path: '/',
  });

  await feedbackService.submitFeedback(count, id);
  sessionFeedback.set(sessionId + id, true);
  return c.redirect(`/courses/${id}`);
};

const resetFeedbacks = async (c) => {
  const value = c.req.param('value');
  const id = c.req.param('id');
  await feedbackService.resetFeedbacks(value, id);
  return c.redirect(`/courses/${id}`);
};

export { getFeedback, submitFeedback, resetFeedbacks, showFeedbackForm };

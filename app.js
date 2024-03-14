import { Hono } from 'https://deno.land/x/hono@v3.7.4/mod.ts';
import * as countController from './countController.js';
import * as feedbackController from './feedbackController.js';

const app = new Hono();

app.get('/', countController.getCount);
app.post('/', countController.incrementAndGetCount);

app.get('/feedbacks/:value', feedbackController.getFeedback);
app.post('/feedbacks/:value', feedbackController.incremendAndGetFeedback);
app.post('/reset-feedbacks', feedbackController.resetFeedbacks);

export default app;

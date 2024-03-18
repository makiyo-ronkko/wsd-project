import { Hono } from 'https://deno.land/x/hono@v3.7.4/mod.ts';
import { Eta } from 'https://deno.land/x/eta@v3.1.0/src/index.ts';
// import * as countController from './countController.js';
import * as feedbackController from './feedbackController.js';

// const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const app = new Hono();

app.get('/', feedbackController.showFeedbackForm);
app.get('/feedbacks/:value', feedbackController.getFeedback);
app.post('/feedbacks/:value', feedbackController.submitFeedback);
app.post('/reset-feedbacks', feedbackController.resetFeedbacks);

// app.get('/', (c) => c.html(eta.render('index.eta', { title: 'Feedbacks' })));
// app.get('/about', (c) => c.html(eta.render('index.eta', { title: 'About' })));
// app.get('/contact', (c) =>
//   c.html(eta.render('index.eta', { title: 'Contact us' }))
// );

// app.get('/', countController.getCount);
// app.post('/', countController.incrementAndGetCount);

export default app;

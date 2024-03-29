import { Hono } from 'https://deno.land/x/hono@v3.7.4/mod.ts';
// import { Eta } from 'https://deno.land/x/eta@v3.1.0/src/index.ts';
import * as courseController from './courseController.js';
// import * as countController from './countController.js';
import * as feedbackController from './feedbackController.js';

const app = new Hono();

// app.get('/', feedbackController.showFeedbackForm);
app.get('/courses', courseController.showForm);
app.get('/courses/:id', courseController.showCourse);
app.post('/courses', courseController.createCourse);
app.post('/courses/:id', courseController.updateCourse);
app.post('/courses/:id/delete', courseController.deleteCourse);

app.get('/courses/:id/feedbacks/:value', feedbackController.getFeedback);
app.post('/courses/:id/feedbacks/:value', feedbackController.submitFeedback);
app.post('/courses/:id/reset-feedbacks', feedbackController.resetFeedbacks);

export default app;

// app.get('/', (c) => c.html(eta.render('index.eta', { title: 'Feedbacks' })));
// app.get('/about', (c) => c.html(eta.render('index.eta', { title: 'About' })));
// app.get('/contact', (c) =>
//   c.html(eta.render('index.eta', { title: 'Contact us' }))
// );

// app.get('/', countController.getCount);
// app.post('/', countController.incrementAndGetCount);

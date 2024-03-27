import { Eta } from 'https://deno.land/x/eta@v3.1.0/src/index.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import {
  getSignedCookie,
  setSignedCookie,
} from 'https://deno.land/x/hono@v3.7.4/helper.ts';
import * as courseService from './courseService.js';
import { secret, sessionFeedback } from './feedbackController.js';

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const validator = z.object({
  name: z
    .string({
      message: 'The course name should be a string of at least 4 characters.',
    })
    .min(4, {
      message: 'The course name should be a string of at least 4 characters.',
    }),
});

const showForm = async (c) => {
  return c.html(
    eta.render('courses.eta', {
      courses: await courseService.listCourses(),
      title: 'Courses',
    })
  );
};

const showCourse = async (c) => {
  const id = c.req.param('id');

  const sessionId =
    (await getSignedCookie(c, secret, 'sessionId')) ?? crypto.randomUUID();
  await setSignedCookie(c, 'sessionId', sessionId, secret, {
    path: '/',
  });
  const hasSessionFeedback = sessionFeedback.has(sessionId + id);

  return c.html(
    eta.render('course.eta', {
      sessionFeedback: sessionFeedback.has(sessionId + id),
      course: await courseService.getCourse(id),
      text: hasSessionFeedback
        ? 'You have already given feedback for this course. Thank you!'
        : '',
    })
  );
};

const createCourse = async (c) => {
  const body = await c.req.parseBody();
  const validationResult = validator.safeParse(body);
  if (!validationResult.success) {
    return c.html(
      eta.render('courses.eta', {
        ...body,
        courses: await courseService.listCourses(),
        errors: validationResult.error.format(),
        title: 'Courses',
      })
    );
  }
  await courseService.createCourse(body);
  return c.redirect('/courses');
};

const updateCourse = async (c) => {
  const id = c.req.param('id');
  const body = await c.req.parseBody();
  await courseService.updateCourse(id, body);
  return c.redirect(`/courses/${id}`);
};

const deleteCourse = async (c) => {
  const id = c.req.param('id');
  await courseService.deleteCourse(id);
  return c.redirect('/courses');
};

export { showForm, createCourse, showCourse, updateCourse, deleteCourse };

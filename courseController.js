import { Eta } from 'https://deno.land/x/eta@v3.1.0/src/index.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import * as courseService from './courseService.js';

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
  return c.html(
    eta.render('course.eta', { course: await courseService.getCourse(id) })
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

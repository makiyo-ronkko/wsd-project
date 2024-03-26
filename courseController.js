import { Eta } from 'https://deno.land/x/eta@v3.1.0/src/index.ts';
import * as courseService from './courseService.js';

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showForm = async (c) => {
  return c.html(
    eta.render('index.eta', {
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

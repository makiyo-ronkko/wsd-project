const getFeedback = async (value, id) => {
  const kv = await Deno.openKv();
  const feedback = await kv.get([`feedback_${id}_${value}`]);
  return feedback.value ?? 0;
};

const submitFeedback = async (value, id) => {
  let count = await getFeedback(value, id);
  count++;
  await setFeedback(count, value, id);
};

const setFeedback = async (count, value, id) => {
  const kv = await Deno.openKv();
  await kv.set([`feedback_${id}_${value}`], count);
};

const resetFeedbacks = async (value, id) => {
  const kv = await Deno.openKv();
  await kv.set([`feedback_${id}_${value}`], 0);
};

export { getFeedback, submitFeedback, resetFeedbacks };

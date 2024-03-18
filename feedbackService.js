const getFeedback = async (value) => {
  const kv = await Deno.openKv();
  const feedback = await kv.get([`feedback_${value}`]);
  return feedback.value ?? 0;
};

const submitFeedback = async (value) => {
  let count = await getFeedback(value);
  count++;
  await setFeedback(count, value);
};

const setFeedback = async (count, value) => {
  const kv = await Deno.openKv();
  await kv.set([`feedback_${value}`], count);
};

const resetFeedbacks = async () => {
  const kv = await Deno.openKv();
  await kv.set([`feedback_${value}`], 0);
};

export { getFeedback, submitFeedback, resetFeedbacks };

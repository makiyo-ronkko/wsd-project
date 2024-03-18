const getFeedback = async (c) => {
  const kv = await Deno.openKv();
  const feedback = await kv.get(['feedback']);
  return feedback.value ?? c ?? 0;
};

const submitFeedback = async (c) => {
  await setFeedback(c);
};

const setFeedback = async (feedback) => {
  const kv = await Deno.openKv();
  await kv.set(['feedback'], feedback);
};

const resetFeedbacks = async () => {
  const kv = await Deno.openKv();
  await kv.set(['feedback'], 0);
};

export { getFeedback, submitFeedback, resetFeedbacks };

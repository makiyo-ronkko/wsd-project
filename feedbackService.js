const getFeedback = async (c) => {
  const kv = await Deno.openKv();
  const feedback = await kv.get(['feedback']);
  return feedback.value ?? c ?? 0;
};

const incrementFeedback = async (c) => {
  let count = await getFeedback(c);
  count++;
  await setFeedback(count);
};

const setFeedback = async (feedback) => {
  const kv = await Deno.openKv();
  await kv.set(['feedback'], feedback);
};

const resetFeedbacks = async () => {
  const kv = await Deno.openKv();
  await kv.set(['feedback'], 0);
};

export { getFeedback, incrementFeedback, resetFeedbacks };

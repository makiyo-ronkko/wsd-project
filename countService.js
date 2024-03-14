const getCount = async () => {
  // openKv() built-in key value store
  const kv = await Deno.openKv();
  const count = await kv.get(['count']);
  return count.value ?? 0;
};

const incrementCount = async () => {
  let count = await getCount();
  count++;
  await setCount(count);
};

const setCount = async (count) => {
  const kv = await Deno.openKv();
  await kv.set(['count'], count);
};

export { getCount, incrementCount };

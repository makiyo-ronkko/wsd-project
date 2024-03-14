import * as countService from './countService.js';

const getCount = async (c) => {
  return c.text(await countService.getCount());
};

const incrementAndGetCount = async (c) => {
  await countService.incrementCount();
  return c.text(await countService.getCount());
};

export { getCount, incrementAndGetCount };

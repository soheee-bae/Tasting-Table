export const getUnusedId = (ids: number[]) => {
  let unusedNum = 0;
  let i = 0;
  while (unusedNum === 0 && i < 50) {
    if (!ids.includes(i)) {
      unusedNum = i;
    }
    i++;
  }
  return unusedNum;
};

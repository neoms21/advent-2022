import path from 'path';
import read from '../readInput';
const solution = async () => {
  const input: string[] = await read(path.join(__dirname, './input.txt'));

  const compare = (val1: string, val2: string) => {
    const [num1, num2] = val1.split('-').map((x) => Number(x));
    const [num3, num4] = val2.split('-').map((x) => Number(x));

    if ((num1 >= num3 && num2 <= num4) || (num3 >= num1 && num4 <= num2))
      return true;
  };

  const compare2 = (val1: string, val2: string) => {
    const [num1, num2] = val1.split('-').map((x) => Number(x));
    const [num3, num4] = val2.split('-').map((x) => Number(x));

    if ((num3 >= num1 && num3 <= num2) || (num1 >= num3 && num1 <= num4))
      return true;
  };

  const part1 = (
    compareFn: (v1: string, v2: string) => boolean | undefined,
  ) => {
    return input.reduce((acc, item) => {
      const [first, second] = item.split(',');
      return acc + (compareFn(first, second) ? 1 : 0);
    }, 0);
  };

  console.log(part1(compare), part1(compare2));
};

export default solution;

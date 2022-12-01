import path from 'path';
import read from '../readInput';

const solution = async () => {
  const input = await read(path.join(__dirname, './input.txt'));

  let tempArr: string[] = [];

  const result = input.map((item: string) => {
    if (item !== '') {
      tempArr.push(item);
      return 0;
    } else {
      const x = tempArr.reduce((a, i) => a + Number(i), 0);
      tempArr = [];
      return x;
    }

    return 0;
  }, []);
  const res = result.sort(function (a: number, b: number) {
    return b - a;
  });
  console.log(res[0] + res[1] + res[2]);
};

export default solution;

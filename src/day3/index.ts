import path from 'path';
import read from '../readInput';
const map: any = {};
const solution = async () => {
  //   const input = [
  //     'vJrwpWtwJgWrhcsFMMfFFhFp',
  //     'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  //     'PmmdzqPrVvPwwTWBwg',
  //     'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  //     'ttgJtRGJQctTZtZT',
  //     'CrZsJsPPZsGzwwsLwLmpwMDw',
  //   ];

  const chunk = (array: any[], size: number) =>
    array.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(array.slice(i, i + size));
      return acc;
    }, []);

  //   console.log(chunked);
  const input: string[] = await read(path.join(__dirname, './input.txt'));
  for (let i = 97; i <= 122; i++) {
    map[String.fromCharCode(i)] = i - 96;
  }
  for (let i = 65; i <= 90; i++) {
    map[String.fromCharCode(i)] = i - 38;
  }

  const part1 = () => {
    return input.reduce((acc, item) => {
      const firstHalf = item.substring(0, item.length / 2);
      const secondHalf = item.substring(item.length / 2);

      const obj1: any = firstHalf
        .split('')
        .reduce((acc, i) => ({ ...acc, [i]: 1 }), {});
      const obj2: any = secondHalf
        .split('')
        .reduce((acc, i) => ({ ...acc, [i]: 1 }), {});

      const val = new Array(firstHalf.length).fill(null).map((x, i) => {
        if (obj1[firstHalf[i]] === obj2[firstHalf[i]]) return firstHalf[i];
        return null;
      });
      return acc + map[val.find((v) => !!v)!];
    }, 0);
  };

  const part2 = () => {
    const chunked = chunk(input, 3);
    return chunked.reduce((acc: number, item: string[]) => {
      const [firstHalf, secondHalf, thirdHalf] = item;

      const obj1: any = firstHalf
        .split('')
        .reduce((acc, i) => ({ ...acc, [i]: 1 }), {});
      const obj2: any = secondHalf
        .split('')
        .reduce((acc, i) => ({ ...acc, [i]: 1 }), {});

      const obj3: any = thirdHalf
        .split('')
        .reduce((acc, i) => ({ ...acc, [i]: 1 }), {});

      const val = Object.keys(obj1).find((key) => obj2[key] && obj3[key]);

      return acc + map[val!];
    }, 0);
  };

  console.log(part2());
};

export default solution;

import path from 'path';
import read from '../readInput';

const solution = async () => {
  const moves: string[] = await read(path.join(__dirname, './input.txt'));

  //   const stacks = [['N', 'Z'], ['D', 'C', 'M'], ['P']];

  const stacks = [
    ['G', 'J', 'Z'],
    ['C', 'V', 'F', 'W', 'P', 'R', 'L', 'Q'],
    ['R', 'G', 'L', 'C', 'M', 'P', 'F'],
    ['M', 'H', 'P', 'W', 'B', 'F', 'L'],
    ['Q', 'V', 'S', 'F', 'C', 'G'],
    ['L', 'T', 'Q', 'M', 'Z', 'J', 'H', 'W'],
    ['V', 'B', 'S', 'F', 'H'],
    ['S', 'Z', 'J', 'F'],
    ['T', 'B', 'H', 'F', 'P', 'D', 'C', 'M'],
  ];

  //   const moves = [
  //     'move 1 from 2 to 1',
  //     'move 3 from 1 to 3',
  //     'move 2 from 2 to 1',
  //     'move 1 from 1 to 2',
  //   ];

  moves.forEach((m) => {
    const matches = m.match(/\d+/g);

    const [itemCount, from, to] = matches!.map((m) => Number(m));

    //Part 1
    // for (let i = 0; i < itemCount; i++) {
    //   const x = stacks[from - 1].shift();
    //   stacks[to - 1].splice(0, 0, x!);
    // }

    //part 2
    const x = stacks[from - 1].splice(0, itemCount);
    stacks[to - 1].splice(0, 0, ...x);
    // console.log('🚀 ~ file: index.ts:37 ~ moves.forEach ~ stacks', stacks);
  });

  console.log(
    '🚀 ~ file: index.ts:25 ~ operations ~ stacks',
    stacks.map((c) => c[0]).join(''),
  );
};

export default solution;

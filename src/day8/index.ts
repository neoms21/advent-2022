import path, { dirname } from 'path';
import read from '../readInput';

// const iterator = (arr, init, cond, increment, item) => {
//   for (let k = init; cond; increment ? k++ : k--) {
//     arr.push(item);
//   }
// };

const part2Obj: any = [];

const solution = async () => {
  const commands: string[] = await read(path.join(__dirname, './input.txt'));
  const totalItems = commands.length;
  const lenEachItem = commands[0].length;
  const perimeterVisible = totalItems * 2 + (totalItems - 2) * 2;
  const arrangement = commands.map((c) => c.split(''));
  //   console.log('🚀 ~ file: index.ts:10 ~ solution ~ arrangement', arrangement);
  let innerCount = 0;

  for (let i = 1; i < totalItems - 1; i++) {
    for (let j = 1; j <= lenEachItem - 2; j++) {
      const current = arrangement[i][j];
      const top = [];
      const right = [];
      const left = [];
      const bottom = [];

      for (let k = i - 1; k >= 0; k--) {
        top.push(arrangement[k][j]);
      }

      for (let k = i + 1; k < totalItems; k++) {
        bottom.push(arrangement[k][j]);
      }

      for (let k = j - 1; k >= 0; k--) {
        left.push(arrangement[i][k]);
      }

      for (let k = j + 1; k < lenEachItem; k++) {
        right.push(arrangement[i][k]);
      }

      //part 1
      //   if (
      //     top.every((t) => t < current) ||
      //     right.every((t) => t < current) ||
      //     bottom.every((t) => t < current) ||
      //     left.every((t) => t < current)
      //   ) {
      //     innerCount += 1;
      //   }
      part2Obj.push({ item: current, neighbours: [top, left, bottom, right] });
      //
    }

    //   console.log('-----------------');
  }
  const scores: any = [];
  part2Obj.forEach((element: any) => {
    const { item, neighbours } = element;
    let score = 1;
    let count: number;
    neighbours.forEach((direction: any) => {
      count = 0;
      for (let i = 0; i < direction.length; i++) {
        count++;
        if (direction[i] >= item) break;
      }

      score = score * count!;
    });

    scores.push(score);
  });

  //   console.log(perimeterVisible + innerCount);

  console.log(scores.sort((a: number, b: number) => b - a)[0]);
};

export default solution;

//top : start: x-1, end: 0, right: y+1, end: lenEachItem

// 1,1 = top: x-1,y , left: x, y-1, bottom: x+1, y, right: x, y+1

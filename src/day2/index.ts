import path from 'path';
import read from '../readInput';

enum Items {
  Rock = 'rock',
  Scissors = 'scissors',
  Paper = 'paper',
}

const keys: Record<string, { type: Items; score: number }> = {
  X: { type: Items.Rock, score: 1 },
  Y: { type: Items.Paper, score: 2 },
  Z: { type: Items.Scissors, score: 3 },
  A: { type: Items.Rock, score: 1 },
  B: { type: Items.Paper, score: 2 },
  C: { type: Items.Scissors, score: 3 },
};

const scores = {
  [Items.Scissors]: 3,
  [Items.Paper]: 2,
  [Items.Rock]: 1,
};

const map = {
  [Items.Scissors]: { [Items.Rock]: 0, [Items.Paper]: 6, [Items.Scissors]: 3 },
  [Items.Rock]: { [Items.Rock]: 3, [Items.Paper]: 0, [Items.Scissors]: 6 },
  [Items.Paper]: { [Items.Rock]: 6, [Items.Paper]: 3, [Items.Scissors]: 0 },
};

const map2 = {
  [Items.Scissors]: { winning: Items.Paper, losing: Items.Rock },
  [Items.Rock]: { winning: Items.Scissors, losing: Items.Paper },
  [Items.Paper]: { winning: Items.Rock, losing: Items.Scissors },
};

const getMyItem = (opponent: string, key: string) => {
  if (key === 'Y') return keys[opponent].type;
  if (key === 'X') return map2[keys[opponent].type].winning;
  if (key === 'Z') return map2[keys[opponent].type].losing;
};

const solution = async () => {
  //   const input = ['A Y', 'B X', 'C Z'];
  const input = await read(path.join(__dirname, './input.txt'));
  //   console.log('🚀 ~ file: index.ts:27 ~ solution ~ input', input.length);
  let score = 0;

  const part1 = () =>
    input.forEach((i: string) => {
      const [opponent, mine] = i.split(' ');
      const winPoints =
        map[keys[mine as Items].type][keys[opponent as Items].type] +
        keys[mine as Items].score;
      score = score + winPoints;
    });

  const part2 = () => {
    input.forEach((i: string) => {
      const [opponent, mine] = i.split(' ');
      const myItem = getMyItem(opponent, mine);

      const winPoints =
        map[myItem as Items][keys[opponent as Items].type] +
        scores[myItem as Items];
      score = score + winPoints;
    });

    return score;
  };

  console.log(part2());

  //   console.log(input);
};

export default solution;

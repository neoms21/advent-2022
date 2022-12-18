import path, { dirname } from 'path';
import read from '../readInput';
import { tree } from './tree';
import { v4 as uuidv4 } from 'uuid';

enum CommandType {
  DIRECTORY_CHANGE = 'dir_change',
  FILE = 'file',
  LIST = 'list',
  DIRNAME = 'dirname',
  MOVEUP = 'moveup',
}

const regexes = [
  { regex: /\$ cd \w/, type: CommandType.DIRECTORY_CHANGE },
  { regex: /dir \w/, type: CommandType.DIRNAME },
  { regex: /\$ ls/, type: CommandType.LIST },
  { regex: /\$ cd \.\./, type: CommandType.MOVEUP },
  { regex: /\d{1,100} .*/, type: CommandType.FILE },
];

type Structure = {
  id: string;
  name: string;
  children: Array<Structure>;
  files: Array<{ fileName: string; size: number }>;
  level: number;
  totalSize: number;
  parentName: string;
};

let structure: Structure;
let activeDir: Structure | undefined;

let parent: Structure | null;
// const sizeCalculator = (tree: Structure): any => {
//   if (tree.children.length === 0) {
//     result.push({ name: tree.name, size: tree.totalSize });
//   } else {
//     result.push({
//       name: tree.name,
//       size:
//         tree.totalSize + tree.children.reduce((acc, c) => acc + c.totalSize, 0),
//     });
//     tree.children.forEach((c) => sizeCalculator(c));
//   }

//   return result;
// };
// let active: Structure;

const findParent = (
  tree: Structure[],
  level: number,
  childName: string,
  parentName: string,
) => {
  if (parent) return;

  tree.forEach((node) => {
    if (
      node.level === level &&
      node.id === parentName &&
      node.children.find((c) => c.name === childName)
    ) {
      parent = node;
      return;
    } else {
      return findParent(node.children, level, childName, parentName); // if not found go one level deeper.Ÿ
    }
  });
};

const solution = async () => {
  const commands: string[] = await read(path.join(__dirname, './input.txt'));

  commands.forEach((command, index) => {
    if (command === '$ cd /') {
      const dirName = command.replace('$ cd ', '');
      if (!structure) {
        structure = {
          id: uuidv4(),
          name: dirName,
          children: [],
          files: [],
          level: 0,
          totalSize: 0,
          parentName: 'root',
        };
        activeDir = structure;
      }
      return;
    }
    const type = regexes.find((r) => r.regex.test(command))?.type;

    switch (type) {
      case CommandType.FILE: {
        const [size, fileName] = command.split(' ');
        activeDir?.files?.push({ size: Number(size), fileName });
        if (activeDir) activeDir.totalSize = activeDir.totalSize + Number(size);
        break;
      }
      case CommandType.DIRNAME: {
        const [_, name] = command.split(' ');

        activeDir?.children?.push({
          id: uuidv4(),
          name,
          children: [],
          level: activeDir?.level + 1,
          files: [],
          totalSize: 0,
          parentName: activeDir?.id,
        });

        break;
      }
      case CommandType.DIRECTORY_CHANGE: {
        const dirName = command.replace('$ cd ', '');
        const childDir = activeDir?.children.find(
          (s: any) => s.name === dirName,
        );
        // if (index === 397) {
        // console.log(command, dirName, activeDir);
        // }
        activeDir = childDir;

        break;
      }

      case CommandType.MOVEUP: {
        parent = null;

        const levelToFind = (activeDir?.level || 0) - 1;
        if (index >= 33 && index <= 35) {
          console.log(
            '🚀 ~ file: index.ts:123 ~ commands.forEach ~ levelToFind',
            command,
            activeDir?.level,
            activeDir?.name,
            activeDir?.parentName,
            index,
          );
        }
        if (levelToFind === 0) {
          parent = structure;
        } else
          findParent(
            structure.children,
            levelToFind,
            activeDir?.name || '',
            activeDir?.parentName || '',
          );
        if (index >= 33 && index <= 35) {
          console.log(
            '🚀After finding parent',
            command,
            parent?.level,
            parent?.name,
            index,
          );
        }
        activeDir = parent!;

        break;
      }
      default:
        break;
    }
  });

  console.log(JSON.stringify(structure));
};

export default solution;

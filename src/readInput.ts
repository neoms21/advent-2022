import fs from 'fs';

const read = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err: any, data: any) {
      if (err) reject(err);
      resolve(data.split('\n'));
    });
  });
};

export default read;

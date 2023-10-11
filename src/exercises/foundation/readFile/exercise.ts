import { readFile } from "fs";

type Context = {
  readFile: typeof readFile;
};

export default ({ readFile }: Context) =>
  (path: string) => {
    return new Promise((resolve, reject) => {
      readFile(path, (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res);
      });
    });
  };

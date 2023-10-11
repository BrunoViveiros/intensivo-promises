type Context = {
  setTimeout: typeof setTimeout;
};

export default ({ setTimeout }: Context) =>
  (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, ms);
    });
  };

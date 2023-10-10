type Context = {
  firstStep: (data: string) => Promise<string>;
  secondStep: (data: string) => Promise<string>;
  thirdStep: (data: string) => Promise<string>;
};

export default ({ firstStep, secondStep, thirdStep }: Context) =>
  async (list: Array<string>) => {
    const allPromises = list.map((item) => {
      return firstStep(item)
        .then((res) => secondStep(res))
        .then((res) => thirdStep(res));
    });

    return Promise.all(allPromises);
  };

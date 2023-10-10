type Context = {
  getData: (data: string) => Promise<string>;
};

export default ({ getData }: Context) =>
  async (data: string) => {
    const retryTimes = async (times: number) => {
      const errors = [];

      for (let i = 0; i <= times; i++) {
        try {
          const response = await getData(data);

          return response;
        } catch (error) {
          errors.push(error);

          if (i === times) {
            throw errors;
          }
        }
      }
    };

    return retryTimes(3);
  };

export type Translation = {
  phrase: string;
  meaning: string;
};

export type Data = {
  headlist: Translation[];
};

/**
 * In format YYYY-MM-DD
 */
export type DateStr = string;

const Storage = {
  putTrans: (date: DateStr, trans: Translation) => {
    const staleData = localStorage.getItem(date);

    if (staleData === null) {
      const newData = { headlist: [trans] };
      localStorage.setItem(date, JSON.stringify(newData));
    } else {
      const staleDataParsed: Data = JSON.parse(staleData);
      const newData = { headlist: [...staleDataParsed.headlist, trans] };
      localStorage.setItem(date, JSON.stringify(newData));
    }
  },
};

export default Storage;

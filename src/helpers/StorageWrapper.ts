export type Translation = {
  phrase: string;
  meaning: string;
};

export type Goal = {
  goal: "CREATE HEADLIST" | "CONTINUE HEADLIST";
  completed: boolean;
};

export type Data = {
  headlist: Translation[];
  goals: Goal[] | null;
};

/**
 * In format YYYY-MM-DD
 */
export type DateStr = string;

const Storage = {
  putTrans: (date: DateStr, trans: Translation) => {
    const staleData = localStorage.getItem(date);

    if (staleData === null) {
      const newData: Data = { headlist: [trans], goals: null };
      localStorage.setItem(date, JSON.stringify(newData));
    } else {
      const staleDataParsed: Data = JSON.parse(staleData);
      const newData: Data = {
        headlist: [...staleDataParsed.headlist, trans],
        goals: staleDataParsed.goals,
      };
      localStorage.setItem(date, JSON.stringify(newData));
    }
  },
  postGoals: (date: DateStr, goals: Goal[]) => {
    const staleData = localStorage.getItem(date);

    if (staleData === null) {
      const newData: Data = { headlist: [], goals: goals };
      localStorage.setItem(date, JSON.stringify(newData));
    } else {
      const staleDataParsed: Data = JSON.parse(staleData);
      const newData: Data = {
        headlist: [...staleDataParsed.headlist],
        goals: goals,
      };
      localStorage.setItem(date, JSON.stringify(newData));
    }
  },
  getHeadlist: (date: DateStr) => {
    const data = localStorage.getItem(date);

    if (data === null) {
      return null;
    } else {
      const parsedData: Data = JSON.parse(data);
      return parsedData.headlist;
    }
  },
  getGoals: (date: DateStr) => {
    const data = localStorage.getItem(date);

    if (data === null) {
      return null;
    } else {
      const parsedData: Data = JSON.parse(data);
      return parsedData.goals;
    }
  },
};

export function formatNum(num: number): string {
  return num < 10 ? "0" + num : "" + num;
}

export function getToday() {
  const today = new Date();
  return `${today.getFullYear()}-${formatNum(today.getMonth() + 1)}-${formatNum(today.getDate())}`;
}

export default Storage;

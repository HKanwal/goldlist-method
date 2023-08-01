type Translation = {
  phrase: string;
  meaning: string;
};

type List = "hl" | "d1" | "d2" | "d3";

type LocalStorageData = {
  headlist: Translation[];
  d1: null | Translation[];
  d2: null | Translation[];
  d3: null | Translation[];
};

const Storage = {
  putTrans: () => {},
};

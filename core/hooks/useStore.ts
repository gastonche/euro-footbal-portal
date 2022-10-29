import { proxy, useSnapshot } from "valtio";
import QueryResult from "../domains/QueryResult";

interface Store {
  query: string;
  history: QueryResult[];
  result?: QueryResult;
}

const store = proxy<Store>({
  query: "",
  history: [],
  result: {
    query: "",
    data: [],
    timestamp: 0
  },
});

export const setQuery = (query: string) => {
  store.query = query;
};

export const setHistory = (history: QueryResult[]) => {
  store.history = history;
};

export const addHistory = (result: QueryResult) => {
  store.history.unshift(result);
}

export const setResults = (results?: QueryResult) => {
  store.result = results;
};

const useStore = () => useSnapshot(store);

export default useStore;

import {proxy, useSnapshot} from "valtio";

const state = proxy<{isLoading: boolean}>({isLoading: false});
const useLoadingProcess = () => {
  const {isLoading} = useSnapshot(state);

  const show = () => state.isLoading = true;
  const hide = () => state.isLoading = false;

  return {
    isLoading,
    show,
    hide
  }
}

export default useLoadingProcess;
import { useAuthContext } from './useAuthContext.js';
import { useWorkoutsContext } from './useWorkoutsContext.js';


export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    //update global state
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
    //delete token from local storage
    localStorage.removeItem('user');
  }
  return { logout };
}

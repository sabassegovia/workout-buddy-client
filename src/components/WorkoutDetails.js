import { useState } from 'react';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  
  const [currTitle, setTitle] = useState(workout.title);
  const [currReps, setReps] = useState(workout.reps);
  const [currLoad, setLoad] = useState(workout.load);
  const [updateInput, setUpdateInput] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteClick = async () => {
    if (!user) {
      setError("You must be logged in");
      return
    }
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data });
    }
  }
  const handleUpdate = async (e) => {
    if (!user) {
      setError("You must be logged in");
      return
    }
    e.preventDefault()
    let updateObj = {
      title: currTitle || workout.title,
      load: currLoad || workout.load,
      reps: currReps || workout.reps,
      _id: workout._id
    };
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user.token}`
      }
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      setError(null);
      dispatch({ type: 'UPDATE_WORKOUT' , payload: updateObj})
    }
    //set all to the update obj
    setUpdateInput(false);
  }



  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load Kg: </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>

      <span className="material-symbols-outlined delete" onClick={handleDeleteClick}>delete</span>
      {error && <div className="error">{error}</div>}
      <span className="material-symbols-outlined update" onClick={() => setUpdateInput(!updateInput)}>settings</span>

      {updateInput && <form onSubmit={handleUpdate} className="updateInput">
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => { setTitle(e.target.value) }}
          value={currTitle}
        />
        <label>Exercise Load (in Kg):</label>
        <input
          type="number"
          onChange={(e) => {setLoad(e.target.value)}}
          value={currLoad}
        />

        <label>Exercise Reps:</label>
        <input
          type="number"
          onChange={(e) => {setReps(e.target.value)}}
          value={currReps}
        />
        <button>Update</button>
        {error && <div className="error">{error}</div>}
      </form>}
    </div>
  )
}

export default WorkoutDetails;
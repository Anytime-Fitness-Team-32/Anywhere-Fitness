import { useState } from "react";
//MatUI Date Picker
import DateMomentUtils from "@date-io/moment"; // choose your lib
import {
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { baseURL } from "../../utils/baseURL";

export default function EditClass(props) {
  const { c, setIsEditing, classes, setClasses, deleteClass, instructor } =
    props;
  const [formValues, setFormValues] = useState({
    name: c.name,
    type: c.type,
    starttime: c.starttime,
    date: c.date,
    duration: c.duration,
    intensitylevel: c.intensitylevel,
    location: c.location,
    maxsize: c.maxsize,
    numregisteredattendees: c.numregisteredattendees,
    classid: c.classid,
  });

  const handleChanges = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const newClass = {
      ...formValues,
      duration: parseInt(formValues.duration),
      maxsize: parseInt(formValues.maxsize),
      starttime: `${moment(formValues.starttime).format("h:mm a")}`,
      instructor: instructor,
    };
    console.log(newClass);
    axiosWithAuth()
      .patch(`${baseURL}/classes/class/${c.classid}`, newClass)
      .then((res) => {
        console.log(res);
        setClasses([
          ...classes.filter((cl) => cl.classid !== newClass.classid),
          newClass,
        ]);
      })
      .catch((err) => console.log(err));
    //put request to where changes are made to classes
    //set changes global state (classes) so we can see in app.

    setIsEditing(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>
      <form onSubmit={saveChanges}>
        <label htmlFor="name">Name: </label>
        <input
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleChanges}
        />

        <label htmlFor="type">Type of Class: </label>
        <select name="type" onChange={handleChanges} value={formValues.type}>
          <option>-- Type --</option>
          <option value="Yoga">Yoga</option>
          <option value="Pilates">Pilates</option>
          <option value="Weight Lifting">Weight Lifting</option>
          <option value="Cardio">Cardio</option>
          <option value="Movement">Movement</option>
        </select>

        <label htmlFor="startDate">Start Date: </label>
        <DateTimePicker
          value={formValues.starttime}
          onChange={(date) =>
            setFormValues({
              ...formValues,
              starttime: date._d,
            })
          }
          minDate={new Date()}
          format="LL"
        />

        <label htmlFor="startTime">Start Time: </label>
        <TimePicker
          name="startTime"
          onChange={(date) =>
            setFormValues({
              ...formValues,
              starttime: date._d,
            })
          }
          value={formValues.starttime}
        />

        <label htmlFor="duration">Duration of Class: </label>
        <select
          name="duration"
          onChange={handleChanges}
          value={formValues.duration}
        >
          <option>-- Minutes --</option>
          <option value={Number(30)}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1 hour 30 minutes</option>
          <option value={120}>2 hours</option>
          <option value={180}>3 hours</option>
        </select>

        <label htmlFor="intensitylevel">Intensity Level: </label>
        <select
          name="intensitylevel"
          value={formValues.intensitylevel}
          onChange={handleChanges}
        >
          <option>-- Intensity --</option>
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="EXPERT">EXPERT</option>
        </select>

        <label htmlFor="location">Location: </label>
        <input
          name="location"
          type="text"
          value={formValues.location}
          onChange={handleChanges}
        />
        <label htmlFor="maxsize">Max Class Size: </label>
        <input
          name="maxsize"
          type="text"
          value={formValues.maxsize}
          onChange={handleChanges}
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => deleteClass()}>
          DELETE
        </button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel Changes
        </button>
      </form>
    </MuiPickersUtilsProvider>
  );
}

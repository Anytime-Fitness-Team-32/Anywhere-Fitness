import { useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

//MatUI Date Picker
import DateMomentUtils from "@date-io/moment"; // choose your lib
import {
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import { baseURL } from "../../utils/baseURL";

export default function CreateClassPage(props) {
  const { classes, setClasses, setIsCreating, instructor } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
    duration: 0,
    intensitylevel: "",
    location: "",
    numregisteredattendees: 0,
    maxsize: 0,
  });

  const handleChanges = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  //Create new object and POST to DB
  const submitClass = (e) => {
    e.preventDefault();
    const newClass = {
      ...formValues,
      duration: parseInt(formValues.duration),
      maxsize: parseInt(formValues.maxsize),
      starttime: `${moment(selectedDate).format("h:mm a")}`,
      date: `${moment(selectedDate).format("MMM Do YYYY")}`,
      instructor: instructor,
    };
    console.log(newClass);
    axiosWithAuth()
      .post(`${baseURL}/classes/class`, newClass)
      .then((res) => {
        setClasses([...classes, res.data]);
        setIsCreating(false);
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>
      <form onSubmit={submitClass}>
        <legend>Create a Class</legend>
        <label htmlFor="name">Class Name: </label>
        <input
          name="name"
          type="text"
          onChange={handleChanges}
          value={formValues.name}
        />

        <label htmlFor="type">Type of Class: </label>
        <select name="type" onChange={handleChanges} value={formValues.type}>
          <option>-- Type --</option>
          <option value="Yoga">Yoga</option>
          <option value="Pilates">Pilates</option>
          <option value="Weightlifting">Weightlifting</option>
          <option value="Cardio">Cardio</option>
          <option value="Movement">Movement</option>
        </select>

        <label htmlFor="startDate">Start Date: </label>
        <DateTimePicker
          animateYearScrolling
          value={selectedDate}
          onChange={(date) => setSelectedDate(date._d)}
          minDate={new Date()}
          format="LL"
        />

        <label htmlFor="startTime">Start Time: </label>
        <TimePicker
          name="startTime"
          onChange={(date) => setSelectedDate(date._d)}
          value={selectedDate}
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
          onChange={handleChanges}
          value={formValues.intensitylevel}
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
          onChange={handleChanges}
          value={formValues.location}
        />
        <label htmlFor="maxsize">Max Class Size: </label>
        <input
          name="maxsize"
          type="text"
          onChange={handleChanges}
          value={formValues.maxsize}
        />
        <button type="submit">Create a Class</button>
        <button type="button" onClick={() => setIsCreating(false)}>
          Cancel
        </button>
      </form>
    </MuiPickersUtilsProvider>
  );
}

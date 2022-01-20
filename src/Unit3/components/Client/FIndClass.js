import { useState } from "react";

const initialFormValues = {
  starttime: "",
  date: "",
  duration: "",
  type: "",
  intensity: "",
  location: "",
};

export default function FindClass(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { classes, setClasses } = props;

  // 2 differnet search functions just to have searchability

  const handleChanges = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
    setClasses(classes.filter((c) => c.duration === formValues.duration));
  };

  return (
    <form>
      <label htmlFor="starttime"> Time: </label>
      <input
        name="starttime"
        type="text"
        value={formValues.time}
        onChange={handleChanges}
      />
      <label htmlFor="date"> Date: </label>
      <input
        name="date"
        type="text"
        value={formValues.date}
        onChange={handleChanges}
      />
      <label htmlFor="duration"> Duration: </label>
      <input
        name="duration"
        type="text"
        value={formValues.duration}
        onChange={handleChanges}
      />
      <label htmlFor="type"> Class Type: </label>
      <input
        name="type"
        type="text"
        value={formValues.type}
        onChange={handleChanges}
      />
      <label htmlFor="intensity"> Intensity: </label>
      <input
        name="intensity"
        type="text"
        value={formValues.intensity}
        onChange={handleChanges}
      />
      <label htmlFor="location"> Location: </label>
      <input
        name="location"
        type="text"
        value={formValues.location}
        onChange={handleChanges}
      />
    </form>
  );
}

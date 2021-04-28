import { useState } from 'react';
//MatUI Date Picker
import DateMomentUtils from '@date-io/moment'; // choose your lib
import {
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

export default function EditClass(props) {
    const { c, setIsEditing, deleteClass } = props;
    const [formValues, setFormValues] = useState({
        name: c.name,
        type: c.type,
        starttime: c.starttime,
        duration: c.duration,
        intensitylevel: c.intensitylevel,
        location: c.location,
        maxclasssize: c.maxclasssize,
        numregisteredattendees: c.numregisteredattendees,
        id: c.id
    })

    const handleChanges = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const saveChanges = (e) => {
        e.preventDefault();
        const newClass = {
            ...formValues,
            duration: parseInt(formValues.duration),
            maxclasssize: parseInt(formValues.maxclasssize),
            starttime: `${moment(formValues.starttime).format("MMM Do YYYY")}, ${moment(formValues.starttime).format('h:mm a')}`
        }
        console.log(newClass)
        //put request to where changes are made to classes
        //set changes global state (classes) so we can see in app.

        setIsEditing(false)
    }

    return (<MuiPickersUtilsProvider utils={DateMomentUtils}>
            <form onSubmit={saveChanges}>
                <label htmlFor='name'>Name: </label>
                <input
                    name='name'
                    type='text'
                    value={formValues.name}
                    onChange={handleChanges}
                />

                <label htmlFor='type'>Type of Class: </label>
                <select name='type' onChange={handleChanges} value={formValues.type}>
                    <option>-- Type --</option>
                    <option value='Yoga'>Yoga</option>
                    <option value='Pilates'>Pilates</option>
                    <option value='Weight Lifting'>Weight Lifting</option>
                    <option value='Cardio'>Cardio</option>
                    <option value='Movement'>Movement</option>
                </select>

                <label htmlFor='startDate'>Start Date: </label>
                <DateTimePicker
                        animateYearScrolling
                        clearable
                        value={formValues.starttime}
                        onChange={date => setFormValues({
                            ...formValues,
                            starttime: date._d
                        })}
                        minDate={new Date()}
                        format="LL"
                />
                    
                <label htmlFor='startTime'>Start Time: </label>
                <TimePicker
                        name='startTime'
                        onChange={date => setFormValues({
                            ...formValues,
                            starttime: moment(date._d).format("MMM Do YYYY")
                        })}
                        value={formValues.starttime}
                />

                <label htmlFor='duration'>Duration of Class: </label>
                <select name='duration' onChange={handleChanges} value={formValues.duration}>
                    <option>-- Minutes --</option>
                    <option value={Number(30)}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1 hour 30 minutes</option>
                    <option value={120}>2 hours</option>
                    <option value={180}>3 hours</option>
                </select>

                <label htmlFor='intensitylevel'>Intensity Level: </label>
                <input
                    name='intensitylevel'
                    type='text'
                    value={formValues.intensitylevel}
                    onChange={handleChanges}
                />
                <label htmlFor='location'>Location: </label>
                <input
                    name='location'
                    type='text'
                    value={formValues.location}
                    onChange={handleChanges}
                />
                <label htmlFor='maxclasssize'>Max Class Size: </label>
                <input
                    name='maxclasssize'
                    type='text'
                    value={formValues.maxclasssize}
                    onChange={handleChanges}
                />
                <button type='submit'>Save Changes</button>
                <button type='button' onClick={() => deleteClass()}>delete</button>
                <button type='button' onClick={() => setIsEditing(false)}>Cancel Changes</button>
            </form>
        </MuiPickersUtilsProvider>)
}
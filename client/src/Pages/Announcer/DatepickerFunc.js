import React from 'react';
import {
    FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider, KeyboardDateTimePicker,
} from '@material-ui/pickers';
import {Controller, useFormContext} from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns';
import {StoreContext} from '../../contexts/MobxStoreContext';
import {useObserver} from "mobx-react";
import {Input} from "../utils/Input";

const DatePickerFunc = () => {


        const {control, register, formState: {errors}} = useFormContext();

        const store = React.useContext(StoreContext);

        return useObserver(() =>
            <>
                <FormControl className={`mt-2 pb-3`} component="fieldset">
                    <FormLabel component="legend">Schedule Your Broadcast</FormLabel>
                    <Controller
                        render={({field}) => {
                            const {onChange} = field;
                            return (
                                <RadioGroup aria-label="scheduler" {...field}

                                            onChange={(e) => {
                                                onChange(e);
                                                console.log(e.target.value);
                                                store.isScheduleLater = false
                                                if (e.target.value === "Schedule for later") {
                                                    store.isScheduleLater = true
                                                }

                                            }}
                                            value={field.value || false}
                                >
                                    <FormControlLabel
                                        value="BroadCast right now"
                                        control={<Radio/>}
                                        label="BroadCast right now"
                                    />
                                    <FormControlLabel
                                        value="Schedule for later"
                                        control={<Radio/>}
                                        label="Schedule for later"/>
                                </RadioGroup>
                            )
                        }}
                        rules={{ required: "This is required " }}
                        name="scheduler"
                        control={control}
                        error={!!errors.schedule}
                        helperText={errors?.schedule?.message}
                    />
                </FormControl>

                {store.isScheduleLater &&
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Controller
                            render={({
                                         field: {onChange, onBlur, value, name, ref},
                                     }) => (
                                <KeyboardDateTimePicker
                                    minDate={new Date()}
                                    margin={"normal"}
                                    label={"Select Date & Time"}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                            name={'dateSchedule'}
                            defaultValue={null}
                            control={control}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                }
            </>
        )
    }
;

export default DatePickerFunc;

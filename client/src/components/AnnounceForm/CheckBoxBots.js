import React, {memo, useMemo} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Checkbox, FormLabel} from "@material-ui/core";
import formJson from "./Files/formJson";
import {capitalizeFirstLetter} from "../../Pages/utils/CommonFunctions";
import {Input} from "../../Pages/utils/Input";

const formValues = formJson()


const CheckBoxBots = memo(
    ({register, formState: {isDirty, errors}, control}) => <div component="fieldset" className={'d-block mt-3 pb-3'}
                                                                id={'checkBoxComponent'}>
        <FormLabel component="legend">Please Choose the platform you want the message to be
            broadcasted</FormLabel>
        {

            Object.entries(formValues).map(entry => {
                console.log("errors")
                console.log(errors)
                const {label} = entry[1]
                return useMemo(() => {
                        return <div key={'' + Math.random()} className={'d-inline'}>
                            <section className={'d-inline'}>
                                <Controller
                                    // as={<Checkbox/>}

                                    name={label}
                                    type="checkbox"
                                    control={control}
                                    render={({field}) => <Checkbox
                                        onChange={e => field.onChange(e.target.checked)}
                                        checked={field.value || false}
                                        // inputRef={...register({ validate: v => v.length > 0 })}
                                    />}
                                    error={!!(errors.twitter || errors.teams || errors.slack)}
                                    helperText={errors?.twitter?.message}


                                />
                                <label htmlFor={label}>{capitalizeFirstLetter(label)}</label>
                            </section>
                        </div>
                    }, [{label}]
                )
            })
        }
            </div>,
            (prevProps, nextProps) =>
            prevProps.formState.isDirty === nextProps.formState.isDirty
            );

            export default CheckBoxBots

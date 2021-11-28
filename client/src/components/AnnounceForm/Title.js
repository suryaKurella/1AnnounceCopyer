import React, {useContext} from 'react';
import {Input} from "../../Pages/utils/Input";
import IconAdornmentField from "../../Pages/utils/IconAdornmentField";
import PersonIcon from "@mui/icons-material/Person";
import {Controller, useFormContext} from "react-hook-form";
import {useAuth} from "../../contexts/AuthContext";
import TitleIcon from '@mui/icons-material/Title';

const Title = () => {
    const {control, register, formState: {errors}} = useFormContext();
    const {currentUser} = useAuth()
    return (
        <Controller
            control={control}
            name="title"
            render={({field}) => {
                return (
                    <Input
                        label={'Title'}
                        InputProps={{
                            startAdornment: (
                                <IconAdornmentField>
                                    <TitleIcon style={{fill: "green"}}/>
                                </IconAdornmentField>
                            )
                        }}
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors?.title?.message}
                        // value={currentUser.displayName}
                        /*{...register("userName")}*/
                        // error={!!errors.userName}
                        // helperText={errors?.userName?.message}
                        // disabled={true}
                    />
                )
            }}
                />
                );
            };

export default Title;

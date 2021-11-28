import React, {useContext} from 'react';
import {Input} from "../../Pages/utils/Input";
import IconAdornmentField from "../../Pages/utils/IconAdornmentField";
import PersonIcon from "@mui/icons-material/Person";
import {Controller, useFormContext} from "react-hook-form";
import {useAuth} from "../../contexts/AuthContext";


const UserName = () => {
    const {control, register, formState: {errors}} = useFormContext();
    const {currentUser} = useAuth()
    return (
        <Controller
            control={control}
            name="userName"
            render={({field}) => {
                return (
                    <Input
                        label={'User Name'}
                        InputProps={{
                            startAdornment: (
                                <IconAdornmentField>
                                    <PersonIcon/>
                                </IconAdornmentField>
                            )
                        }}
                        value={currentUser.displayName}
                        /*{...register("userName")}*/
                        // error={!!errors.userName}
                        // helperText={errors?.userName?.message}
                        disabled={true}
                    />
                )
            }}
                />
                );
            };

export default UserName;

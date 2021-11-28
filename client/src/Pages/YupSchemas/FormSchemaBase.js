import * as yup from "yup";

let formSchemaBase = () => {

    return yup.object().shape({
        // userName:
        //     yup.string().matches(/^([^0-9]*)$/, "User Name should not contain numbers")
        //         .required("Please enter your User Name"),
        title:
            yup.string()
                .required("Please enter a title for your announcement"),

        message:
            yup.string().required("Please enter your message"),
        scheduler:
            yup.string().oneOf(["BroadCast right now","Schedule for later"]).required('Please choose atleast one type of scheduler'),
        twitter: yup.bool(),
        teams: yup.bool(),
        slack: yup.bool()
    }).test(
        'twitter',
        null,
        (obj) => {
            if (obj.twitter || obj.teams || obj.slack) {
                return true; // everything is fine
            }
            return new yup.ValidationError(
                '❗ Check at least one checkbox',
                null,
                'checkbox'
            );
        }
    )


    // return yup.object().shape({
    //     userName:
    //         yup.string().matches(/^([^0-9]*)$/, "User Name should not contain numbers")
    //             .required("Please enter your User Name"),
    //     message:
    //         yup.string().required("Please enter your message"),
    //     twitter:yup.bool(),
    //     teams:yup.bool(),
    //     slack:yup.bool()
    // })
}

export default formSchemaBase

import type { StudentFormData } from "../studenttypes"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addNewStudent, updateSingleStudent } from "../service/student.service";
import styles from "./StudentForm.module.css"
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./Loader";

function StudentForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<StudentFormData>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state?.student) {
            reset(location.state.student);
        } else {
            reset({
                name: "",
                email: "",
                course: "",
                gender: "",
                hobbies: []
            });
        }
    }, [location.state, reset]);

    const handleOnSubmit: SubmitHandler<StudentFormData> = async (data) => {
        try {
            if (location.state) {
                const studentId = location.state.student.student_id

                setLoading(true)
                const response = await updateSingleStudent(studentId, data)


                navigate("/", { replace: true, state: null });
                toast.success(response.data.message)


            } else {
                setLoading(true)
                const response = await addNewStudent(data)
                console.log(response.data)
                reset()
                toast.success(response.data.message)

            }


        } catch (error) {
            console.error("POST/PATCH REQUEST ERROR:", error)

            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ?? "something went wrong!"
                )
            }
        } finally {
            setLoading(false)
        }

    }

    const handleOnClick = () => {
        navigate("/studentdata")
    }



    return (
        <>
            <div className={styles.formContainer}>
                <div>
                    <h1 className={styles.title}>Student Registration</h1>
                    <p className={styles.subtitle}>
                        Enter your details to register as a student
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleOnSubmit)}>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="name">Name</label>
                        <input className={styles.input} type="text" id="name" {...register("name", {
                            required: "name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters"
                            },
                            maxLength: {
                                value: 30,
                                message: "Name cannot exceed 30 characters"
                            },
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "enter valid name"
                            }
                        })} />
                        {errors.name && (<p className={styles.error}>{errors.name.message}</p>)}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input className={styles.input} type="email" id="email" {...register("email", {
                            required: "email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "enter a valid email"
                            }
                        })} />
                        {errors.email && (<p className={styles.error}>{errors.email.message}</p>)}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="course">Course</label>
                        <select className={styles.select} id="course" {...register("course", { required: "please select a course" })}>
                            <option value="">select course</option>
                            <option value="BTECH">BTECH</option>
                            <option value="MTECH">MTECH</option>
                            <option value="BCA">BCA</option>
                            <option value="MCA">MCA</option>
                            <option value="BSCIT">BSCIT</option>
                            <option value="MSCIT">MSCIT</option>
                            <option value="DIPLOMA">DIPLOMA</option>
                        </select>
                        {errors.course && (<p className={styles.error}>{errors.course.message}</p>)}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Gender</label>

                        <div className={styles.options}>
                            <label className={styles.option} htmlFor="male">Male
                                <input id="male" type="radio" value="male" {...register("gender", { required: "please choose gender" })} />
                            </label>

                            <label className={styles.option} htmlFor="female">Female
                                <input id="female" type="radio" value="female" {...register("gender", { required: "please choose gender" })} />
                            </label>

                            <label className={styles.option} htmlFor="other">Other
                                <input id="other" type="radio" value="other" {...register("gender", { required: "please choose gender" })} />
                            </label>
                        </div>
                        {errors.gender && (<p className={styles.error}>{errors.gender.message}</p>)}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Hobby</label>

                        <div className={styles.options}>
                            <label className={styles.option} htmlFor="coding">Coding
                                <input id="coding" type="checkbox" value="coding" {...register("hobbies", {
                                    validate: (value) => value.length > 0 || "Choose at least one hobby"
                                })} />
                            </label>

                            <label className={styles.option} htmlFor="reading">Reading
                                <input id="reading" type="checkbox" value="reading" {...register("hobbies", {
                                    validate: (value) => value.length > 0 || "Choose at least one hobby"
                                })} />
                            </label>

                            <label className={styles.option} htmlFor="writing">Writing
                                <input id="writing" type="checkbox" value="writing" {...register("hobbies", {
                                    validate: (value) => value.length > 0 || "Choose at least one hobby"
                                })} />
                            </label>

                            <label className={styles.option} htmlFor="singing">Singing
                                <input id="singing" type="checkbox" value="singing" {...register("hobbies", {
                                    validate: (value) => value.length > 0 || "Choose at least one hobby"
                                })} />
                            </label>

                            <label className={styles.option} htmlFor="swimming">Swimming
                                <input id="swimming" type="checkbox" value="swimming" {...register("hobbies", {
                                    validate: (value) => value.length > 0 || "Choose at least one hobby"
                                })} />
                            </label>
                        </div>
                        {errors.hobbies && (<p className={styles.error}>{errors.hobbies.message}</p>)}
                    </div>

                    <button
                        className={styles.submitButton}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                        {loading && <Loader />}
                    </button>

                </form>

                <button className={styles.viewButton} onClick={handleOnClick}>View Data</button>
            </div>
        </>
    )
}

export default StudentForm
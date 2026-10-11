import { useEffect, useState } from "react"
import type { Student } from "../studenttypes"
import { useNavigate } from "react-router-dom"
import { deleteSingleStudent, getAllStudents } from "../service/student.service"
import styles from "./StudentDataTable.module.css"
import { toast } from "react-toastify"
import axios from "axios"
import SearchInput from "./SearchInput"
import Loader from "./Loader"

function StudentDataTable() {
    const [studentData, setStudentData] = useState<Student[]>([])
    const [searchtext, setSearchText] = useState("")
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const response = await getAllStudents()

            setStudentData(response.data.data)
        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ?? "something went wrong!"
                )
            }
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getData()
    }, [])

    const handleEditClick = (studentId: string) => {
        const student = studentData.find((student) => {
            return student.student_id === studentId
        })

        navigate(
            {
                pathname: "/"
            },
            {
                state: { student: student }
            }
        )


    }

    const handleDelete = async (studentId: string) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            console.log(studentId)
            const response = await deleteSingleStudent(studentId)

            setStudentData((prev) =>
                prev.filter((student) => student.student_id !== studentId)
            );

            toast.success(response.data.message)


        } catch (error) {
            console.error(error)


            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ?? "something went wrong!"
                )
            }
        }
    }

    const handleAddOnClick = () => {
        navigate("/")
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const filteredStudents = studentData.filter((student) => {
        return student.name.toLowerCase().includes(searchtext.toLocaleLowerCase())
    })

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Student Records</h1>
                        <p className={styles.subtitle}>Manage your student information</p>
                    </div>

                    <button className={styles.addButton} onClick={handleAddOnClick}>
                        Add Student
                    </button>
                </div>

                <SearchInput handleOnChange={handleOnChange} searchtext={searchtext} />
                <br /><br />

                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Gender</th>
                                <th>Hobbies</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {loading ? null : (
                            <tbody>
                                {
                                    filteredStudents.length > 0 ? (
                                        filteredStudents.map((student: Student, index) => (
                                            <tr key={student.student_id}>
                                                <td>{index + 1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.course}</td>
                                                <td>{student.gender}</td>
                                                <td>{student.hobbies.join(", ")}</td>
                                                <td>
                                                    <div className={styles.actionButtons}>
                                                        <button
                                                            className={styles.editButton}
                                                            onClick={() => { handleEditClick(student.student_id) }}
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className={styles.deleteButton}
                                                            onClick={() => { handleDelete(student.student_id) }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) :
                                        <tr>
                                            <td colSpan={7} className={styles.noData}>
                                                {studentData.length === 0
                                                    ? "No student records found"
                                                    : "No matching students found"}
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        )}

                    </table>
                    {loading ? (
                        <div className={styles.loaderContainer}>
                            <Loader />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default StudentDataTable

import StudentForm from "./components/StudentForm";
import StudentDataTable from "./components/StudentDataTable";
import NotFound from "./components/NotFound";

const routes = [
    {
        path:"*",
        Component:NotFound
    },
    {
        path:"/",
        Component:StudentForm
    },
    {
        path:"/studentdata",
        Component:StudentDataTable
    }
]

export default routes
import { useDispatch, useSelector } from "react-redux"

const ResolutionsList = props=>{
 const loggedIn = useSelector((state) => state.todo.loggedIn);
    const dispatch = useDispatch()
    // console.log('zzz',loggedIn)
    return <>ResolutionsList </>
}
export default ResolutionsList 
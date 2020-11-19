import React,{Fragment,useEffect, useState} from 'react'

export default function InputTodo() {

    const [description, setDescription] = useState("")
 
    const onChange = (e)=>{
        const { value} = e.target
        setDescription(value)
    }
    console.log("description", description)
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
            console.log(response);
            window.location = "/"
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form onSubmit={onSubmit} className="d-flex mt-5">
                <input type="text" placeholder="Enter a TODO" name="description" value={description} className="form-control" onChange={onChange}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

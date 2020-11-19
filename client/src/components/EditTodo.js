import React,{Fragment, useState} from 'react'

export default function EditTodo({todo}) {

    const [description, setDescription] = useState(todo.description)

    const onChange = (e) => {
        const{value} = e.target;
        setDescription(value)
    }

    const editHandler = async(e)=>{
        e.preventDefault();
        try {
            const data = {description};
            await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(data) 
            })
            window.location="/"
            
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
            Edit 
            </button>
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)} >
                <div className="modal-dialog">
                    <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button type="button"  onClick={() => setDescription(todo.description)} className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
                <input type="text" className="form-control" value={description} key={todo.todo_id} onChange={onChange} name="description"/>
            </div>

            <div className="modal-footer">
                <button type="button" onClick={e => editHandler(e)} className="btn btn-warning" data-dismiss="modal">Edit</button>
                <button type="button" onClick={() => setDescription(todo.description)} className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
    </div>
    </Fragment>
    )
}

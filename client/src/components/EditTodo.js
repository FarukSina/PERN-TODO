import React,{Fragment, useState} from 'react'

export default function EditTodo({todo}) {

    const [desc, setDesc] = useState(todo.description)

    const onChange = (e) => {
        const{value} = e.target;
        setDesc(value)
    }
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Edit 
            </button>
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit Todo</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <input type="text" className="form-control" value={todo.description} key={todo.todo_id} onChange={onChange} name="description"/>
            </div>

            <div class="modal-footer">
                <button type="button" onClick={() => editTodoHandler()} class="btn btn-warning" data-dismiss="modal">Edit</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
    </div>
    </Fragment>
    )
}


export const Login = (data)=>({
type:"LOGIN",
payload:data
})

export const Token = (data)=>({
  type:"TOKEN",
  payload:data
})







































export const persistTodos = () => ({
    type: "PERSIST_TODOS"
  });


  export const Part1 = value => ({
    type: "PART1",
    payload : value
  })

  export const Part2 = value => ({
    type: "PART2",
    payload : value
  })

  export const Part3 = value => ({
    type: "PART3",
    payload : value
  })


  export const addText = value => ({
    type: "ADD_TEXT",
    payload: value
  });
  export const addTodo = todo => ({
    type: "ADD_TODO",
    payload: todo
  });
  
  export const deleteTodo = key => ({
    type: "DELETE_TODO",
    payload: key
  });
  
  export const editTodo = key => ({
    type: "EDIT_TODO",
    payload: key
  });
  
  export const editAddTodo = obj => ({
    type: "EDIT_ADD_TODO",
    payload: obj
  });
  
  export const deleteAll = () => ({
    type: "DELETE_ALL"
  });
  
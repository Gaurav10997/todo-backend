const todoData = [
    { "todoName": "Work" },
    { "todoName": "Personal" },
    { "todoName": "Home" },
    { "todoName": "Study" },
    { "todoName": "Health" },
    { "todoName": "Fitness" },
    { "todoName": "Travel" },
    { "todoName": "Shopping" },
    { "todoName": "Finance" },
    { "todoName": "Hobbies" }
  ];

// Replace ':userId' with the actual user ID
const userId = '6576aaae6c2e044a510b424e';
  
  async function postTodo(todo) {
    try {
      const response = await fetch('http://localhost:200/post-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
  
      if (!response.ok) {
        throw new Error('Post todo request failed');
      }
  
      const data = await response.json();
      console.log('Todo posted successfully:', data);
    } catch (error) {
      console.error('There was a problem posting the todo:', error);
    }
  }
  

  
  // Post each todo in the todoData array
  todoData.forEach(todo => {
    // Adding userId to the todo object
    todo.userId = userId;
    postTodo(todo);
  });
  
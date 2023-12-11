const tasks = [
    {
        "userId": "6576aaae6c2e044a510b424e",
        "todoId": "6576b1342f7dceac0b3b3eee",
        "name": "Finish quarterly report"
    },
    {
        "userId": "6576aaae6c2e044a510b424e",
        "todoId": "6576b1342f7dceac0b3b3eee",
        "name": "Call Mom about weekend plans"
    },
    {
        "userId": "6576aaae6c2e044a510b424e",
        "todoId": "6576b1342f7dceac0b3b3eee",
        "name": "Buy groceries for the week"
    },
    {
        "userId": "6576aaae6c2e044a510b424e",
        "todoId": "6576b1342f7dceac0b3b3eee",
        "name": "Attend project meeting at 2 PM"
    },
    {
        "userId": "6576aaae6c2e044a510b424e",
        "todoId": "6576b1342f7dceac0b3b3eee",
        "name": "Complete coding assignment"
    },
    {
        "userId": "6576aaae6c2e044a510b424e",
        "todoId": "6576b1342f7dceac0b3b3eee",
        "name": "Go for a 30-minute run"
    },
    {
        "userId": "6576aaae6c2e044a510b424e",
        "todoId": "6576b1342f7dceac0b3b3eee",
        "name": "Read chapters 5-7 of"
    }
]


async function postTasks(tasksData) {
    try {
        const response = await fetch('http://localhost:200/post-task-by-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tasksData)
        });

        if (!response.ok) {
            throw new Error('Post tasks request failed');
        }

        const responseData = await response.json();
        console.log('Tasks posted successfully:', responseData);
    } catch (error) {
        console.error('There was a problem posting the tasks:', error);
    }
}

// Post the tasks data to the endpoint
postTasks(tasks);
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

const taskList = document.getElementById('taskList')

async function loadTasks() {

  const { data, error } = await client
    .from('tasks')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error(error)
    return
  }

  taskList.innerHTML = ''

  data.forEach(task => {

    const li = document.createElement('li')

    li.innerHTML = `
      ${task.title}
      <button onclick="deleteTask(${task.id})">
        X
      </button>
    `

    taskList.appendChild(li)
  })
}

async function addTask() {

  const input = document.getElementById('taskInput')

  if (!input.value) return

  const { error } = await client
    .from('tasks')
    .insert([
      { title: input.value }
    ])

  if (error) {
    console.error(error)
    return
  }

  input.value = ''

  loadTasks()
}

async function deleteTask(id) {

  const { error } = await client
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    return
  }

  loadTasks()
}

loadTasks()
let token = '';
let userId = '';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    userId = data.userId;
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('taskSection').style.display = 'block';
    loadTasks();
  } else {
    alert('Échec de connexion');
  }
});

async function register() {
  const username = prompt("Nom d'utilisateur ?");
  const password = prompt("Mot de passe ?");
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  alert(res.ok ? 'Inscription réussie' : 'Erreur');
}

async function addTask() {
  const title = document.getElementById('taskTitle').value;
  const deadline = document.getElementById('deadline').value;
  const status = document.getElementById('status').value;

  const res = await fetch('http://localhost:5000/api/tasks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ title, deadline, status })
  });

  loadTasks();
}

async function loadTasks() {
  const res = await fetch('http://localhost:5000/api/tasks/', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.title} - Échéance: ${task.deadline} - Statut: ${task.status}`;
    list.appendChild(li);
  });
}

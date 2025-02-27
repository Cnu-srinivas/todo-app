from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import sqlite3
from datetime import datetime
import uvicorn
import os

app = FastAPI()

# Ensure the static directory exists
static_dir = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

# Database setup
def init_db():
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()

# Initialize database
init_db()

# Pydantic models
class TodoCreate(BaseModel):
    task: str

class TodoUpdate(BaseModel):
    status: str

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Add a root redirect to ensure users are directed to the HTML interface
@app.get("/api")
async def api_root():
    return {"message": "API is running. Please visit the root URL for the Todo app interface."}

@app.get("/api/todos")
async def get_todos():
    conn = sqlite3.connect('todos.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM todos ORDER BY created_at DESC')
    todos = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return todos

@app.post("/api/todos", status_code=201)
async def add_todo(todo: TodoCreate):
    if not todo.task:
        raise HTTPException(status_code=400, detail="Task cannot be empty")
    
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO todos (task) VALUES (?)', (todo.task,))
    conn.commit()
    todo_id = cursor.lastrowid
    conn.close()
    
    return {
        'id': todo_id,
        'task': todo.task,
        'status': 'pending',
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

@app.delete("/api/todos/{todo_id}")
async def delete_todo(todo_id: int):
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
    conn.commit()
    conn.close()
    return {"message": "Todo deleted successfully"}

@app.put("/api/todos/{todo_id}/status")
async def update_status(todo_id: int, todo_update: TodoUpdate):
    if todo_update.status not in ['pending', 'completed']:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE todos SET status = ? WHERE id = ?', (todo_update.status, todo_id))
    conn.commit()
    conn.close()
    return {"message": "Todo status updated successfully"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True) 
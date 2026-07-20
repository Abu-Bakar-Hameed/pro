from fastapi import FastAPI, HTTPException
from models import Student, StudentUpdate


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Student Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# In-memory database
students = [
    {
        "roll_no": "SE-001",
        "name": "John",
        "age": 20,
        "department": "Software Engineering",
        "semester": 5,
    },
    {
        "roll_no": "CS-002",
        "name": "Ali",
        "age": 21,
        "department": "Computer Science",
        "semester": 6,
    },
    {
        "roll_no": "AI-003",
        "name": "Ahmed",
        "age": 22,
        "department": "Artificial Intelligence",
        "semester": 7,
    },
    {
        "roll_no": "IT-004",
        "name": "Hassan",
        "age": 20,
        "department": "Information Technology",
        "semester": 4,
    },
    {
        "roll_no": "SE-005",
        "name": "Fatima",
        "age": 21,
        "department": "Software Engineering",
        "semester": 5,
    },
    {
        "roll_no": "CS-006",
        "name": "Ayesha",
        "age": 19,
        "department": "Computer Science",
        "semester": 3,
    },
    {
        "roll_no": "AI-007",
        "name": "Bilal",
        "age": 23,
        "department": "Artificial Intelligence",
        "semester": 8,
    },
    {
        "roll_no": "IT-008",
        "name": "Zain",
        "age": 20,
        "department": "Information Technology",
        "semester": 4,
    },
    {
        "roll_no": "SE-009",
        "name": "Sara",
        "age": 22,
        "department": "Software Engineering",
        "semester": 6,
    },
    {
        "roll_no": "CS-010",
        "name": "Usman",
        "age": 21,
        "department": "Computer Science",
        "semester": 5,
    },
]


# -------------------------------
# Helper Function
# -------------------------------
def find_student(roll_no: str):
    for student in students:
        if student["roll_no"] == roll_no:
            return student
    return None


# -------------------------------
# 1. Home
# -------------------------------
@app.get("/")
def home():
    return {
        "message": "Welcome to Student Management API"
    }


# -------------------------------
# 2. Get All Students
# -------------------------------
@app.get("/students")
def get_all_students():
    return {
        "total_students": len(students),
        "students": students
    }


# -------------------------------
# 3. Get Student by Roll Number
# -------------------------------
@app.get("/students/{roll_no}")
def get_student(roll_no: str):
    student = find_student(roll_no)

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


# -------------------------------
# 4. Add Student
# -------------------------------
@app.post("/students", status_code=201)
def add_student(student: Student):

    if find_student(student.roll_no):
        raise HTTPException(
            status_code=400,
            detail="Roll number already exists"
        )

    students.append(student.model_dump())

    return {
        "message": "Student added successfully",
        "student": student
    }


# -------------------------------
# 5. Update Student
# -------------------------------
@app.put("/students/{roll_no}")
def update_student(roll_no: str, updated_student: StudentUpdate):

    student = find_student(roll_no)

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    update_data = updated_student.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        student[key] = value

    return {
        "message": "Student updated successfully",
        "student": student
    }


# -------------------------------
# 6. Delete Student
# -------------------------------
@app.delete("/students/{roll_no}")
def delete_student(roll_no: str):

    student = find_student(roll_no)

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    students.remove(student)

    return {
        "message": "Student deleted successfully"
    }


# -------------------------------
# 7. Total Students
# -------------------------------
@app.get("/students/count")
def total_students():
    return {
        "total_students": len(students)
    }


# -------------------------------
# 8. Search Students by Department
# -------------------------------
@app.get("/students/department/{department}")
def get_students_by_department(department: str):

    result = [
        student
        for student in students
        if student["department"].lower() == department.lower()
    ]

    return {
        "department": department,
        "count": len(result),
        "students": result
    }


# -------------------------------
# 9. Search Students by Semester
# -------------------------------
@app.get("/students/semester/{semester}")
def get_students_by_semester(semester: int):

    result = [
        student
        for student in students
        if student["semester"] == semester
    ]

    return {
        "semester": semester,
        "count": len(result),
        "students": result
    }
# -------------------------------
# 10. Delete All Students
# -------------------------------
@app.delete("/students")
def delete_all_students():

    students.clear()

    return {
        "message": "All students deleted successfully"
    }
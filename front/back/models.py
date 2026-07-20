from pydantic import BaseModel

class Student(BaseModel):
    roll_no: str
    name: str
    age: int
    department: str
    semester: int


class StudentUpdate(BaseModel):
    name: str | None = None
    age: int | None = None
    department: str | None = None
    semester: int | None = None
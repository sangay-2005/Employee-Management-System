from pydantic import BaseModel
from datetime import date
from typing import Optional

class EmployeeBase(BaseModel):
    full_name: str
    email: str
    position: Optional[str] = None
    hire_date: date
    department_id: Optional[int] = None

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    position: Optional[str] = None
    hire_date: Optional[date] = None
    department_id: Optional[int] = None

class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True

from fastapi import APIRouter, Depends, Query
from typing import List

from app.db.session import get_db
from app.schemas.employee import Employee as EmployeeSchema, EmployeeCreate, EmployeeUpdate
from app.services.employee import create_employee, get_employees, get_employee, update_employee, delete_employee

router = APIRouter()

@router.post("/", response_model=EmployeeSchema)
async def create(employee: EmployeeCreate, db = Depends(get_db)):
    return await create_employee(db, employee)

@router.get("/", response_model=List[EmployeeSchema])
async def read_employees(skip: int = Query(0), limit: int = Query(10), search: str | None = Query(None), sort_by: str = Query("id"), order: str = Query("asc"), db = Depends(get_db)):
    employees, _ = await get_employees(db, skip, limit, search, sort_by, order)
    return employees

@router.get("/{employee_id}", response_model=EmployeeSchema)
async def read_employee(employee_id: int, db = Depends(get_db)):
    return await get_employee(db, employee_id)

@router.put("/{employee_id}", response_model=EmployeeSchema)
async def update(employee_id: int, employee: EmployeeUpdate, db = Depends(get_db)):
    return await update_employee(db, employee_id, employee)

@router.delete("/{employee_id}")
async def delete(employee_id: int, db = Depends(get_db)):
    await delete_employee(db, employee_id)
    return {"detail": "Employee deleted"}

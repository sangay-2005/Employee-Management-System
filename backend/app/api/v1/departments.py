from fastapi import APIRouter, Depends
from typing import List

from app.db.session import get_db
from app.schemas.department import Department as DepartmentSchema, DepartmentCreate
from app.services.department import create_department, get_departments, get_department, update_department, delete_department

router = APIRouter()

@router.post("/", response_model=DepartmentSchema)
async def create(department: DepartmentCreate, db = Depends(get_db)):
    return await create_department(db, department)

@router.get("/", response_model=List[DepartmentSchema])
async def read_departments(db = Depends(get_db)):
    return await get_departments(db)

@router.get("/{department_id}", response_model=DepartmentSchema)
async def read_department(department_id: int, db = Depends(get_db)):
    return await get_department(db, department_id)

@router.put("/{department_id}", response_model=DepartmentSchema)
async def update(department_id: int, department: DepartmentCreate, db = Depends(get_db)):
    return await update_department(db, department_id, department)

@router.delete("/{department_id}")
async def delete(department_id: int, db = Depends(get_db)):
    await delete_department(db, department_id)
    return {"detail": "Department deleted"}

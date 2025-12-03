from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from fastapi import HTTPException
from typing import List, Tuple

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from app.db.session import AsyncSession

async def create_employee(db: AsyncSession, employee: EmployeeCreate) -> Employee:
    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    await db.commit()
    await db.refresh(db_employee)
    return db_employee

async def get_employees(db: AsyncSession, skip: int = 0, limit: int = 10, search: str | None = None, sort_by: str = "id", order: str = "asc") -> Tuple[List[Employee], int]:
    query = select(Employee).options(selectinload(Employee.department))
    if search:
        query = query.where(Employee.full_name.ilike(f"%{search}%") | Employee.email.ilike(f"%{search}%"))
    total_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(total_query)).scalar_one()
    order_clause = getattr(Employee, sort_by).asc() if order == "asc" else getattr(Employee, sort_by).desc()
    query = query.order_by(order_clause).offset(skip).limit(limit)
    employees = (await db.execute(query)).scalars().all()
    return employees, total

async def get_employee(db: AsyncSession, employee_id: int) -> Employee:
    query = select(Employee).options(selectinload(Employee.department)).where(Employee.id == employee_id)
    employee = (await db.execute(query)).scalar_one_or_none()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

async def update_employee(db: AsyncSession, employee_id: int, employee_update: EmployeeUpdate) -> Employee:
    db_employee = await get_employee(db, employee_id)
    update_data = employee_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_employee, key, value)
    await db.commit()
    await db.refresh(db_employee)
    return db_employee

async def delete_employee(db: AsyncSession, employee_id: int):
    db_employee = await get_employee(db, employee_id)
    await db.delete(db_employee)
    await db.commit()

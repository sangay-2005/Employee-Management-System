from sqlalchemy import select
from fastapi import HTTPException

from app.models.department import Department
from app.schemas.department import DepartmentCreate
from app.db.session import AsyncSession

async def create_department(db: AsyncSession, department: DepartmentCreate) -> Department:
    db_department = Department(**department.model_dump())
    db.add(db_department)
    await db.commit()
    await db.refresh(db_department)
    return db_department

async def get_departments(db: AsyncSession) -> list[Department]:
    result = await db.execute(select(Department))
    return result.scalars().all()

async def get_department(db: AsyncSession, department_id: int) -> Department:
    department = await db.get(Department, department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    return department

async def update_department(db: AsyncSession, department_id: int, department_update: DepartmentCreate) -> Department:
    db_department = await get_department(db, department_id)
    update_data = department_update.model_dump()
    for key, value in update_data.items():
        setattr(db_department, key, value)
    await db.commit()
    await db.refresh(db_department)
    return db_department

async def delete_department(db: AsyncSession, department_id: int):
    db_department = await get_department(db, department_id)
    await db.delete(db_department)
    await db.commit()

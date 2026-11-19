"""
Persistent storage for EngineerMind guided workflows using SQLite via SQLAlchemy.
Supports session persistence, recovery after refresh, and decision audit logs.
"""
import os
import json
from typing import Optional, List
from sqlalchemy import create_engine, Column, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime, timezone

from engineering_engine.workflow.models import WorkflowState, EngineerDecisionRecord

Base = declarative_base()

class WorkflowCaseEntity(Base):
    __tablename__ = "workflow_cases"

    case_id = Column(String(64), primary_key=True)
    title = Column(String(255), nullable=False)
    current_stage = Column(String(64), nullable=False)
    state_json = Column(Text, nullable=False)
    created_at = Column(String(64), nullable=False)
    updated_at = Column(String(64), nullable=False)

class WorkflowStorage:
    def __init__(self, db_path: Optional[str] = None):
        if not db_path:
            db_dir = os.path.join(os.path.dirname(__file__), "..", "..", "data")
            os.makedirs(db_dir, exist_ok=True)
            db_path = os.path.join(db_dir, "workflows.db")

        self.engine = create_engine(f"sqlite:///{db_path}", echo=False)
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def save_state(self, state: WorkflowState) -> WorkflowState:
        session = self.Session()
        try:
            state.updated_at = datetime.now(timezone.utc).isoformat()
            entity = session.query(WorkflowCaseEntity).filter_by(case_id=state.case_id).first()
            if entity:
                entity.current_stage = state.current_stage.value
                entity.state_json = state.model_dump_json()
                entity.updated_at = state.updated_at
            else:
                entity = WorkflowCaseEntity(
                    case_id=state.case_id,
                    title=state.title,
                    current_stage=state.current_stage.value,
                    state_json=state.model_dump_json(),
                    created_at=state.created_at,
                    updated_at=state.updated_at
                )
                session.add(entity)
            session.commit()
            return state
        finally:
            session.close()

    def get_state(self, case_id: str) -> Optional[WorkflowState]:
        session = self.Session()
        try:
            entity = session.query(WorkflowCaseEntity).filter_by(case_id=case_id).first()
            if not entity:
                return None
            data = json.loads(entity.state_json)
            return WorkflowState(**data)
        finally:
            session.close()

    def list_cases(self) -> List[dict]:
        session = self.Session()
        try:
            rows = session.query(WorkflowCaseEntity).all()
            return [
                {
                    "case_id": r.case_id,
                    "title": r.title,
                    "current_stage": r.current_stage,
                    "updated_at": r.updated_at
                }
                for r in rows
            ]
        finally:
            session.close()

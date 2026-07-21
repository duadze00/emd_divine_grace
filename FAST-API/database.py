from sqlalchemy import create_engine, Column, Integer, String, Float, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Location of your local SQLite database file
DATABASE_URL = "sqlite:///./shop.db"

# 2. Database connection engine setup
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# 3. Session builder factory for staging operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Declarative base class mapping Python classes to SQL tables
Base = declarative_base()


# --- 📐 DATABASE MODEL (Unified Product Table Schema) ---


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)

    # Track items purchased without scrubbing historical table logs entirely
    is_sold = Column(Boolean, default=False)


# 5. Initialization engine module
def init_db():
    Base.metadata.create_all(bind=engine)

from sqlmodel import Session, create_engine, select
from backend.models import Item

# Database connection
sqlite_file_name = "database_v2.db"
sqlite_url = f"sqlite:///backend/{sqlite_file_name}"
engine = create_engine(sqlite_url)

def fix_ysl_image():
    with Session(engine) as session:
        statement = select(Item).where(Item.title == "Saint Laurent Sunset Bag")
        results = session.exec(statement)
        item = results.first()

        if item:
            print(f"Updating {item.title}...")
            # Using the local file we just created
            item.image = "/assets/ysl_sunset.png"
            session.add(item)
            session.commit()
            print("Successfully updated Saint Laurent Sunset Bag image!")
        else:
            print("Item not found!")

if __name__ == "__main__":
    fix_ysl_image()

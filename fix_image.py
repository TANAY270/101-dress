from sqlmodel import Session, create_engine, select
from backend.models import Item

# Database connection
sqlite_file_name = "database_v2.db"
sqlite_url = f"sqlite:///backend/{sqlite_file_name}"
engine = create_engine(sqlite_url)

def update_jacket_image():
    with Session(engine) as session:
        # Find the jacket
        statement = select(Item).where(Item.title == "Acne Studios Leather Jacket")
        results = session.exec(statement)
        jacket = results.first()

        if jacket:
            print(f"Found item: {jacket.title}")
            print(f"Old image: {jacket.image}")
            
            # Update image path
            # Since it's in public/assets, frontend can access it via /assets/acne_jacket.png
            jacket.image = "/assets/acne_jacket.png"
            session.add(jacket)
            session.commit()
            session.refresh(jacket)
            
            print(f"New image: {jacket.image}")
            print("Successfully updated image path!")
        else:
            print("Item 'Acne Studios Leather Jacket' not found!")

if __name__ == "__main__":
    update_jacket_image()

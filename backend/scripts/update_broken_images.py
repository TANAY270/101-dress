from sqlmodel import Session, create_engine, select
from backend.models import Item

# Database connection
sqlite_file_name = "database_v2.db"
sqlite_url = f"sqlite:///backend/{sqlite_file_name}"
engine = create_engine(sqlite_url)

def update_images():
    updates = {
        "Balenciaga Track Sneakers": "/assets/balenciaga_sneakers.png",
        "Prada Cleo Shoulder Bag": "/assets/prada_cleo.png",
        "Gucci GG Marmont Belt": "/assets/gucci_belt.png",
        # Placeholders for the ones we couldn't generate yet, using reliable Unsplash IDs
        "Saint Laurent Sunset Bag": "https://images.unsplash.com/photo-1584917671242-79017ad30030?q=80&w=1000", # Reusing Prada style placeholder
        "Dior Book Tote": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000", # Shorts, decent placeholder
        "Celine Triomphe Sunglasses": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000", # Sunglasses
    }

    with Session(engine) as session:
        for title, new_image_path in updates.items():
            statement = select(Item).where(Item.title == title)
            results = session.exec(statement)
            item = results.first()

            if item:
                print(f"Updating {item.title}...")
                item.image = new_image_path
                session.add(item)
            else:
                print(f"Item not found: {title}")
        
        session.commit()
        print("All images updated successfully!")

if __name__ == "__main__":
    update_images()

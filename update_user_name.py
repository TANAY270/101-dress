from sqlmodel import Session, create_engine, select
from backend.models import User

# Database connection
sqlite_file_name = "database_v2.db"
sqlite_url = f"sqlite:///backend/{sqlite_file_name}"
engine = create_engine(sqlite_url)

def update_user_name():
    with Session(engine) as session:
        # We know the user ID is 'u1' from the seed data
        statement = select(User).where(User.id == "u1")
        results = session.exec(statement)
        user = results.first()

        if user:
            print(f"Found user: {user.name}")
            user.name = "Adhitya Chandel"
            session.add(user)
            session.commit()
            session.refresh(user)
            print(f"Updated user name to: {user.name}")
        else:
            print("User 'u1' not found!")
            
        # Also check by email just in case
        statement_email = select(User).where(User.email == "alex@example.com")
        results_email = session.exec(statement_email)
        user_email = results_email.first()
        
        if user_email and user_email.name != "Adhitya Chandel":
             print(f"Found user by email with old name: {user_email.name}")
             user_email.name = "Adhitya Chandel"
             session.add(user_email)
             session.commit()
             print(f"Updated user (by email) name to: {user_email.name}")

if __name__ == "__main__":
    update_user_name()

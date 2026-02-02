# 101 Dress Backend

A FastAPI-based backend for the 101 Dress platform.

## Environment Variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Required environment variables:
- `SECRET_KEY` - Secret key for JWT token generation
- `DATABASE_URL` - Database connection string
- `CORS_ORIGINS` - Comma-separated list of allowed frontend origins
- `PORT` - Server port (default: 8001)

## Local Development

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
python -m backend.main
```

The API will be available at `http://localhost:8001`

## Deployment

### Render

1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy using the `render.yaml` configuration

### Railway

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically using `railway.toml`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8001/docs`
- ReDoc: `http://localhost:8001/redoc`

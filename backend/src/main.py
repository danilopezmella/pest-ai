from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from pathlib import Path

# Add the src directory to Python path
src_path = str(Path(__file__).parent)
if src_path not in sys.path:
    sys.path.append(src_path)

from api.routes import router
from routes.search_routes import router as search_router

app = FastAPI()

# Add CORS middleware with more permissive configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=False,  # Set to False since we're not using credentials
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the routers
app.include_router(router)
app.include_router(search_router, prefix="/api/search")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

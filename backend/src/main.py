from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from pathlib import Path
import os

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
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the routers
app.include_router(search_router, prefix="/api/search")

if __name__ == "__main__":
    import uvicorn
    
    # Get port from environment variable (for Railway)
    port = int(os.getenv("PORT", 8000))
    
    # Run with reload only in development
    reload = os.getenv("ENVIRONMENT") != "production"
    
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0", 
        port=port,
        reload=reload
    )

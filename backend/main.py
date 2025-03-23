from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import analyze, remix, stems

# Initialize FastAPI app
app = FastAPI(
    title="AI Music Remix & Mood Detection API",
    description="An API for analyzing music mood, tempo, and generating remixes",
    version="1.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routes
app.include_router(analyze.router, prefix="/api", tags=["Mood Analysis"])
app.include_router(remix.router, prefix="/api", tags=["Remix Generation"])
app.include_router(stems.router, prefix="/api", tags=["Audio Stems"])

# Root Endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the AI Music Remix & Mood Detection API!"}

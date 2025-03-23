import os
from spleeter.separator import Separator
from fastapi import APIRouter, UploadFile, File, HTTPException
from tempfile import NamedTemporaryFile
from pathlib import Path
import shutil

router = APIRouter()

# Initialize Spleeter with 4-stem separation (vocals, drums, bass, other)
separator = Separator("spleeter:4stems")

# Saves uploaded file temporarily
def save_temp_file(uploaded_file: UploadFile) -> str:
    temp = NamedTemporaryFile(delete=False, suffix=".mp3")
    temp.write(uploaded_file.file.read())
    temp.close()
    return temp.name

# Performs stem separation
def separate_stems(file_path: str, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)
    separator.separate_to_file(file_path, output_dir)
    
    # Get separated stem file paths
    stem_dir = os.path.join(output_dir, Path(file_path).stem)
    stems = {
        "vocals": os.path.join(stem_dir, "vocals.wav"),
        "drums": os.path.join(stem_dir, "drums.wav"),
        "bass": os.path.join(stem_dir, "bass.wav"),
        "other": os.path.join(stem_dir, "other.wav")
    }
    return stems

# API Route for stem separation
@router.post("/separate")
async def separate_audio(file: UploadFile = File(...)):
    try:
        file_path = save_temp_file(file)
        output_dir = "output/stems"

       
        stems = separate_stems(file_path, output_dir)

        return {
            "message": "Stem separation successful",
            "stems": stems
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        os.remove(file_path)

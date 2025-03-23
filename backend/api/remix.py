import os
import librosa
import numpy as np
import soundfile as sf
from pydub import AudioSegment
from spleeter.separator import Separator
from fastapi import APIRouter, UploadFile, File, HTTPException
from tempfile import NamedTemporaryFile
import ffmpeg
from typing import Optional

router = APIRouter()

# Initialize Spleeter for stem separation
separator = Separator('spleeter:2stems')  # Separate vocals & instrumentals

# Saves uploaded file temporarily
def save_temp_file(uploaded_file: UploadFile) -> str:
    temp = NamedTemporaryFile(delete=False, suffix=".mp3")
    temp.write(uploaded_file.file.read())
    temp.close()
    return temp.name

# Detect BPM and key
def analyze_audio(file_path: str):
    y, sr = librosa.load(file_path, sr=None)
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    key = np.argmax(np.mean(chroma, axis=1))
    return tempo, key

# Applies effects  such as Reverb, Echo, Equalization
def apply_effects(audio: AudioSegment, effect_type: Optional[str] = "reverb"):
    if effect_type == "reverb":
        return audio.overlay(AudioSegment.silent(duration=500)).fade_in(200).fade_out(200)
    elif effect_type == "echo":
        return audio.overlay(audio - 10, delay=250)
    elif effect_type == "lowpass":
        return audio.low_pass_filter(300)
    return audio

# Generates mashup
def generate_mashup(file1: str, file2: str, output_path: str):
    audio1 = AudioSegment.from_file(file1)
    audio2 = AudioSegment.from_file(file2)

   
    tempo1, key1 = analyze_audio(file1)
    tempo2, key2 = analyze_audio(file2)

    speed_factor = tempo1 / tempo2 if tempo2 != 0 else 1.0
    audio2 = audio2.speedup(playback_speed=speed_factor)

    # Audio mixing
    mashup = audio1.overlay(audio2)
    mashup = apply_effects(mashup, "reverb")

    # Export final remix
    mashup.export(output_path, format="mp3")
    return output_path

# API Route for remixing
@router.post("/remix")
async def remix_audio(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    try:
        file1_path = save_temp_file(file1)
        file2_path = save_temp_file(file2)
        output_path = f"output/remix_{os.path.basename(file1_path)}"

        
        final_file = generate_mashup(file1_path, file2_path, output_path)

        return {"message": "Remix generated successfully", "file_url": final_file}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        os.remove(file1_path)
        os.remove(file2_path)

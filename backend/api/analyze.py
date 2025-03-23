from fastapi import APIRouter, UploadFile, File
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import librosa
import numpy as np

# FastAPI Router
router = APIRouter()

# Load Pretrained BERT Model for Mood Classification
MODEL_NAME = "distilbert-base-uncased"  # Replacing LyEmoBERT with DistilBERT
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)


MOOD_LABELS = ["Happy", "Sad", "Energetic", "Calm"]

def classify_lyrics(lyrics: str) -> str:
    """Predict mood from song lyrics using DistilBERT."""
    inputs = tokenizer(lyrics, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    
    predicted_label = torch.argmax(outputs.logits, dim=1).item()
    return MOOD_LABELS[predicted_label % len(MOOD_LABELS)]  # Prevent out-of-range errors

def analyze_audio(audio_path: str) -> dict:
    """Extract tempo and key from audio file using Librosa."""
    y, sr = librosa.load(audio_path, sr=None)

    # Compute tempo (BPM)
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=sr)[0]

    # Estimate key
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    key_idx = np.argmax(np.mean(chroma, axis=1))
    key_mapping = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    key = key_mapping[key_idx]

    return {"tempo": round(tempo), "key": key}

@router.post("/analyze/lyrics/")
async def analyze_lyrics(lyrics: str):
    """API endpoint to analyze lyrics and predict mood."""
    mood = classify_lyrics(lyrics)
    return {"mood": mood}

@router.post("/analyze/audio/")
async def analyze_audio_file(file: UploadFile = File(...)):
    """API endpoint to analyze audio file for tempo and key detection."""
    file_path = f"temp_{file.filename}"
    
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    # Analyze audio
    result = analyze_audio(file_path)

    return {"tempo": result["tempo"], "key": result["key"]}

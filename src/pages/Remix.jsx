import { useState } from "react";
import Navbar from "../sections/Navbar";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [audioPreview, setAudioPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("audio/")) {
      setFile(selectedFile);
      setMessage("");
      setAudioPreview(URL.createObjectURL(selectedFile)); // Create a preview URL
    } else {
      setMessage("Please select a valid audio file.");
      setFile(null);
      setAudioPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("YOUR_BACKEND_URL", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("File uploaded successfully!");
        console.log("Success:", data);
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      setMessage("Error uploading file.");
      console.error("Error:", error);
    }

    setUploading(false);
  };

  return (
    <>
      <Navbar />
      <div className="c-space my-20 flex flex-col items-center">
        {/* File Upload Box */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer w-80 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
        >
          <div className="flex flex-col items-center">
            <span className="text-purple-500 text-3xl">⬆️</span>
            <span className="text-lg text-gray-700 mt-2">Upload Audio File</span>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Preview Section */}
        {audioPreview && (
          <div className="mt-4">
            <audio controls className="w-80">
              <source src={audioPreview} type={file.type} />
              Your browser does not support the audio element.
            </audio>
            <p className="text-sm text-gray-600 mt-2">{file.name}</p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`mt-4 px-6 py-2 text-white rounded-lg ${
            uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {/* Status Message */}
        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>
    </>
  );
};

export default FileUploader;

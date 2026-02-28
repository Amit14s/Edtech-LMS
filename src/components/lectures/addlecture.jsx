import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { addlecture } from "../../redux/slice/lectureslice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/homelayout"

function AddLecture() {
  const dispatch = useDispatch();
  const {state}=useLocation()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  if (!state?.id) {
  alert("Course ID missing");
  return;
}
  // 🔹 when file is selected
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  // 🔹 upload video + dispatch lecture
  const uploadLecture = async () => {
    if (!file || !title || !description) return;

    try {
      setUploading(true);

      // 1️⃣ upload to Cloudinary
      const videoData = new FormData();
      videoData.append("file", file);
      videoData.append("upload_preset", "course_lectures"); // your preset

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhn0lsla/video/upload",
        videoData,
        {
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          },
        }
      );

      const videoUrl = cloudRes.data.secure_url;
      
      // 2️⃣ create lecture formData
      const lectureData = {
      "title":title,
      "description": description,
      "videoUrl":videoUrl,
      "courseid":state.id
      }
      console.log(lectureData)

      // 3️⃣ dispatch redux action
      await dispatch(addlecture(lectureData));

      // reset
      setTitle("");
      setDescription("");
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    maxFiles: 1,
  });

  return (
   <HomeLayout>
     <div className=" ml-20 min-h-[90vh] flex justify-center items-center">
 <div className="relative h-110 w-100">
  <div
    className="absolute -inset-0 rounded-3xl
               bg-blue-600/70
               blur-xl
               animate-spin-slow">
  </div>
             <div className=" relative max-w-lg mx-auto space-y-4 border p-6 rounded-2xl bg-gray-950">

      <input
        type="text"
        placeholder="Lecture title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className=" mt-7 rounded-2xl w-full p-2 border rounded text-white"
      />

      <textarea
        placeholder="Lecture description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className=" mt-5 rounded-2xl flex  w-full p-2 border rounded text-white"
      />

      <div
        {...getRootProps()}
        className=" mt-5 rounded-2xl flex border-dashed border-2 p-4 text-center cursor-pointer text-white"
      >
        <input {...getInputProps()} />
        {file ? file.name : "Drop video here or click to select"}
      </div>

      <button
        onClick={uploadLecture}
        disabled={uploading}
        className=" mt-5 rounded-2xl w-full bg-blue-600 text-white p-2 rounded"
      >
        {uploading ? "Uploading..." : "Add Lecture"}
      </button>

      {progress > 0 && (
        <div className="text-white">
          Uploading: {progress}%
          <div className="w-full bg-gray-300 h-5 rounded-2xl">
            <div
              className="bg-green-500 h-5 rounded-2xl"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
     </div>
     </div>
   </HomeLayout>
  );
}
export default AddLecture
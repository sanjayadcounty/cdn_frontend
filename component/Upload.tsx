"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const userId = params.id as string;

  const fetchFiles = async () => {
   try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/upload/user/${userId}`
      );
      setFiles(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchFiles();
  }, [userId]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warn("Please select a file to upload");
      return;
    }
    

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      if (password) formData.append("password", password);

      const res = await axios.post("http://localhost:8000/api/upload", formData, {
        withCredentials: true,
      });

      const newFile = {
        
        _id: res.data.file._id,
        fileName: res.data.file.fileName,
        createdAt: res.data.file.createdAt,
        file_url: res.data.file.file_url,
       
        password: password || null,
      };

      setFiles((prevFiles) => [newFile, ...prevFiles]);

      setFile(null);
      setPassword("");
      toast.success("File uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };



  const copyToClipboard = async (text: string | null) => {
    if (!text) return toast.warn("No password to copy");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Password copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  // const handleFileAction = async (file: any, action: "view" | "download") => {
  //   const enteredPassword = prompt(
  //     `Enter  password to ${action} "${file.fileName}":`
  //   );

  //   if (!enteredPassword) return;

  //   try {
  //     await axios.post(
  //       `http://localhost:8000/api/auth/verify-password/${file._id}`,
  //       { password: enteredPassword },
  //       { withCredentials: true }
  //     );

  //     if (action === "view") {
  //       window.open(file.file_url, "_blank", "noopener,noreferrer");
  //     } else {
  //       const a = document.createElement("a");
  //       a.href = file.file_url;
  //       a.download = file.fileName;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //     }

  //     toast.success(`${action === "view" ? "Opened" : "Downloaded"} successfully`);
  //   } catch (err: any) {
  //     toast.error(err.response?.data?.message || "Incorrect password");
  //   }
  // };

  const handleFileAction = async (file: any, action: "view" | "download") => {
  const enteredPassword = prompt(
    `Enter password to ${action} "${file.fileName}":`
  );

  
  if (enteredPassword === null || enteredPassword === "") {
    return;
  }

  try {
    
    await axios.post(
      `http://localhost:8000/api/auth/verify-password/${file._id}`,
      { password: enteredPassword },
      {
        withCredentials: true, 
      }
    );

    
    if (action === "view") {
      window.open(file.file_url, "_blank", "noopener,noreferrer");
      toast.success("File opened successfully");
    } else if (action === "download") {
      const link = document.createElement("a");
      link.href = file.file_url;
      link.download = file.fileName || "downloaded-file"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
      toast.success("File downloaded successfully");
    }
  } catch (err: any) {
    
    const message =
      err.response?.data?.message ||
      (err.response?.status === 401
        ? "Incorrect password"
        : "Failed to verify password");
    toast.error(message);
  }
};
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-black">Upload File</h1>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full file:px-6 file:py-3 file:rounded-lg file:bg-blue-600 file:text-white file:border-0 file:font-medium file:mr-4"
                  disabled={uploading}
                  required
                />
                   <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password 
                </label>
                <div className="flex gap-2">
                  <input
                   required
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                </div>
              </div>
              </div>

            

              <button
                type="submit"
                disabled={uploading || !file}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>

        {/* Files List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <h2 className="text-xl font-bold p-6 border-b bg-gray-50 text-black">
            My Files ({files?.length})
          </h2>

          {loading ? (
            <p className="p-10 text-center text-gray-500">Loading files...</p>
          ) : files?.length === 0 ? (
            <p className="p-10 text-center text-gray-600">
              No files uploaded yet. Upload your first file above!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="text-left p-4 font-medium">File Name</th>
                    <th className="text-left p-4 font-medium">Password</th>
                    <th className="text-left p-4 font-medium">Uploaded</th>
                    <th className="text-center p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {files?.map((f) => (
                    <tr key={f._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">
                        {f.fileName.length > 40
                          ? `${f.fileName.substring(0, 37)}...`
                          : f.fileName}
                      </td>
                      <td className="p-4 text-gray-700 text-sm">
                        {f.password ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm truncate max-w-[180px]">
                              {f.password}
                            </span>
                            <button
                              onClick={() => copyToClipboard(f.password)}
                              className="px-2 py-1 bg-gray-200 rounded text-xs hover:bg-gray-300 transition"
                            >
                              Copy
                            </button>
                          </div>
                        ) : f.hasPassword ? (
                          <span className="text-orange-600 font-medium text-sm">
                            Protected
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">—</span>
                        )}
                      </td>
                      <td className="p-4 text-gray-600 text-sm">
                        {new Date(f.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-4 text-center space-x-3">
                        <button
                          onClick={() => handleFileAction(f, "view")}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleFileAction(f, "download")}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}
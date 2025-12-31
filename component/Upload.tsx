// "use client";

// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UploadPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [password, setPassword] = useState<string>("");
//   const [uploading, setUploading] = useState(false);
//   const [files, setFiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const params = useParams();
//   const userId = params.id as string;

//   const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

//   const fetchFiles = async () => {
//    try {
//       setLoading(true);
//       const res = await axios.get(
//         `${API_BASE_URL}/upload/user/${userId}`
//       );
//       setFiles(res.data);
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to load files");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) fetchFiles();
//   }, [userId]);

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       toast.warn("Please select a file to upload");
//       return;
//     }
    

//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("userId", userId);
//       if (password) formData.append("password", password);

//       const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
//         withCredentials: true,
//       });

//       const newFile = {
        
//         _id: res.data.file._id,
//         fileName: res.data.file.fileName,
//         createdAt: res.data.file.createdAt,
//         file_url: res.data.file.file_url,
       
//         password: password || null,
//       };

//       setFiles((prevFiles) => [newFile, ...prevFiles]);

//       setFile(null);
//       setPassword("");
//       toast.success("File uploaded successfully!");
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };



//   const copyToClipboard = async (text: string | null) => {
//     if (!text) return toast.warn("No password to copy");
//     try {
//       await navigator.clipboard.writeText(text);
//       toast.success("Password copied to clipboard!");
//     } catch (err) {
//       toast.error("Failed to copy");
//     }
//   };



//   const handleFileAction = async (file: any, action: "view" | "download") => {
//   const enteredPassword = prompt(
//     `Enter password to ${action} "${file.fileName}":`
//   );

  
//   if (enteredPassword === null || enteredPassword === "") {
//     return;
//   }

//   try {
    
//     await axios.post(
//       `${API_BASE_URL}/auth/verify-password/${file._id}`,
//       { password: enteredPassword },
//       {
//         withCredentials: true, 
//       }
//     );

    
//     if (action === "view") {
//       window.open(file.file_url, "_blank", "noopener,noreferrer");
//       toast.success("File opened successfully");
//     } else if (action === "download") {
//       const link = document.createElement("a");
//       link.href = file.file_url;
//       link.download = file.fileName || "downloaded-file"; 
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link); 
//       toast.success("File downloaded successfully");
//     }
//   } catch (err: any) {
    
//     const message =
//       err.response?.data?.message ||
//       (err.response?.status === 401
//         ? "Incorrect password"
//         : "Failed to verify password");
//     toast.error(message);
//   }
// };
//   return (
//     <>
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Upload Card */}
//         <div className="bg-white rounded-xl shadow-md p-8 mb-8">
//           <h1 className="text-2xl font-bold mb-6 text-black">Upload File</h1>
//           <form onSubmit={handleUpload} className="space-y-6">
//             <div className="flex flex-col sm:flex-row gap-4 items-end">
//               <div className="flex-1 w-full">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select File
//                 </label>
//                 <input
//                   type="file"
//                   onChange={(e) => setFile(e.target.files?.[0] || null)}
//                   className="w-full file:px-6 file:py-3 file:rounded-lg file:bg-blue-600 file:text-white file:border-0 file:font-medium file:mr-4"
//                   disabled={uploading}
//                   required
//                 />
//                    <div className="w-full sm:w-auto">
//                 <label className="block text-sm font-medium text-gray-700 my-2">
//                   Password 
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                    required
//                     type="text"
//                     placeholder="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
                  
//                 </div>
//               </div>
//               </div>

            

//               <button
//                 type="submit"
//                 disabled={uploading || !file}
//                 className="px-8 py-3 bg-blue-600 hover:cursor-pointer text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
//               >
//                 {uploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Files List */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <h2 className="text-xl font-bold p-6 border-b bg-gray-50 text-black">
//             My Files ({files?.length})
//           </h2>

//           {loading ? (
//             <p className="p-10 text-center text-gray-500">Loading files...</p>
//           ) : files?.length === 0 ? (
//             <p className="p-10 text-center text-gray-600">
//               No files uploaded yet. Upload your first file above!
//             </p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="text-left p-4 font-medium">File Name</th>
//                     <th className="text-left p-4 font-medium">Password</th>
//                     <th className="text-left p-4 font-medium">Uploaded</th>
//                     <th className="text-center p-4 font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {files?.map((f) => (
//                     <tr key={f._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="p-4 font-medium text-gray-800">
//                         {f.fileName.length > 40
//                           ? `${f.fileName.substring(0, 37)}...`
//                           : f.fileName}
//                       </td>
//                       <td className="p-4 text-gray-700 text-sm">
//                         {f.password ? (
//                           <div className="flex items-center gap-2">
//                             <span className="font-mono text-sm truncate max-w-[180px]">
//                               {f.password}
//                             </span>
//                             <button
//                               onClick={() => copyToClipboard(f.password)}
//                               className="px-2 py-1 bg-gray-200 rounded text-xs hover:bg-gray-300 transition"
//                             >
//                               Copy
//                             </button>
//                           </div>
//                         ) : f.hasPassword ? (
//                           <span className="text-orange-600 font-medium text-sm">
//                             Protected
//                           </span>
//                         ) : (
//                           <span className="text-gray-500 text-sm">—</span>
//                         )}
//                       </td>
//                       <td className="p-4 text-gray-600 text-sm">
//                         {new Date(f.createdAt).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </td>
//                       <td className="p-4 text-center space-x-3">
//                         <button
//                           onClick={() => handleFileAction(f, "view")}
//                           className="px-4 py-2 hover:cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleFileAction(f, "download")}
//                           className="px-4 py-2 bg-blue-600 hover:cursor-pointer text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition"
//                         >
//                            Download
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// }

"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import {
  Menu,
  X,
  Shield,
  Upload,
  FileText,
  Eye,
  Download,
  Copy,
  Lock,
  LogOut,
  ChevronLeft,
  User,
  Users,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const params = useParams();
  const userId = params.id as string;

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

  // Mock admin name - replace with real auth later
  const adminUsername = "Admin";

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/upload/user/${userId}`, {
        withCredentials: true,
      });
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

      const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const newFile = res.data.file;
      setFiles((prev) => [newFile, ...prev]);

      setFile(null);
      setPassword("");
      (document.getElementById("file-input") as HTMLInputElement).value = "";
      toast.success("File uploaded successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Password copied!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleFileAction = async (file: any, action: "view" | "download") => {
    const enteredPassword = prompt(
      `Enter password to ${action} "${file.fileName}":`
    );

    if (!enteredPassword) return;

    try {
      await axios.post(
        `${API_BASE_URL}/auth/verify-password/${file._id}`,
        { password: enteredPassword },
        { withCredentials: true }
      );

      if (action === "view") {
        window.open(file.file_url, "_blank", "noopener,noreferrer");
        toast.success("File opened in new tab");
      } else {
        const link = document.createElement("a");
        link.href = file.file_url;
        link.download = file.fileName;
        link.click();
        toast.success("Download started");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          (err.response?.status === 401 ? "Incorrect password" : "Access denied")
      );
    }
  };

  const handleLogout = async () => {
    try {

      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (err) {}
    window.location.href = "/";
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar - Same as AllUser page */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-blue-500 shadow-2xl flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-8 border-b border-white/10">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
        <Shield className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-xl font-bold text-white">Admin</h1>
    </div>
    <button
      onClick={() => setSidebarOpen(false)}
      className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition"
    >
      <X className="w-5 h-5" />
    </button>
  </div>

  {/* Navigation - Scrollable if needed */}
  <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <Link
      href="/alluser"
      className="flex items-center gap-4 px-4 py-3 text-white/80 hover:bg-white/10 rounded-xl transition"
    >
      <Users className="w-5 h-5" />
      <span className="text-sm font-medium">All Users</span>
    </Link>

    <div className="flex items-center gap-4 px-4 py-3 text-white bg-white/10 rounded-xl cursor-default">
      <FileText className="w-5 h-5" />
      <span className="text-sm font-medium">Upload Files</span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-70" />
    </div>
  </nav>

  {/* Bottom Logout Section - Always Pinned */}
  <div className="p-6 border-t border-white/10">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <User className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{adminUsername}</p>
        <p className="text-white/70 text-xs">Administrator</p>
      </div>
    </div>
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-3 rounded-lg transition shadow-md"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  </div>
</aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 flex flex-col">
          {/* Mobile Header */}
          <header className="bg-white shadow-sm lg:hidden">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold">Upload Files</h2>
              <Link href="/alluser" className="text-indigo-600">
                <ChevronLeft className="w-6 h-6" />
              </Link>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              {/* Back Link & Title */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link
                    href="/alluser"
                    className="hidden lg:flex items-center gap-2 text-black font-medium"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Users
                  </Link>
               
                </div>
                <div className="text-sm text-gray-600 bg-gray-200 px-4 py-2 rounded-full">
                  Total Files: <span className="font-bold">{files.length}</span>
                </div>
              </div>

              {/* Upload Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <Upload className="w-8 h-8 text-gray-200" />
                  <h2 className="text-xl font-bold text-gray-900">Upload New File</h2>
                </div>

                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* File Input */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choose File
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-400 file:text-white  cursor-pointer"
                        disabled={uploading}
                        required
                      />
                      {file && (
                        <p className="mt-2 text-sm text-gray-600">
                          Selected: <span className="font-medium">{file.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Password Protection
                        </div>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter the password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading || !file}
                    className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition shadow-md"
                  >
                    <Upload className="w-5 h-5" />
                    {uploading ? "Uploading..." : "Upload File"}
                  </button>
                </form>
              </div>

              {/* Files List */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-blue-500 px-8 py-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <FileText className="w-7 h-7" />
                    Uploaded Files ({files.length})
                  </h3>
                </div>

                {loading ? (
                  <div className="p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-indigo-600"></div>
                    <p className="mt-4 text-gray-600">Loading files...</p>
                  </div>
                ) : files.length === 0 ? (
                  <div className="p-16 text-center">
                    <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-xl text-gray-600">No files uploaded yet</p>
                    <p className="text-gray-500 mt-2">Upload your first file above</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            File Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Password
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Uploaded On
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {files.map((f) => (
                          <tr key={f._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-500" />
                                <span className="font-medium text-gray-900 truncate max-w-xs">
                                  {f.fileName}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {f.password ? (
                                <div className="flex items-center gap-2">
                                  <Lock className="w-4 h-4 text-orange-600" />
                                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    {f.password}
                                  </code>
                                  <button
                                    onClick={() => copyToClipboard(f.password)}
                                    className="p-1 hover:bg-gray-200 rounded transition"
                                    title="Copy password"
                                  >
                                    <Copy className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-gray-500 text-sm">No password</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(f.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-3">
                                <button
                                  onClick={() => handleFileAction(f, "view")}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </button>
                                <button
                                  onClick={() => handleFileAction(f, "download")}
                                  className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 font-medium transition"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastClassName="font-medium"
      />
    </>
  );
}
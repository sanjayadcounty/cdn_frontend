// 'use client';
// import { useEffect, useState } from 'react';
// import { getFiles, getSecureUrl } from '@/lib/api';
//  interface FileItem {
//     _id: string;
//     fileName: string;
//     createdAt: string;
//  }  

// export default function FileList() {
//   const [files, setFiles] = useState<FileItem[]>([]);

//   useEffect(() => {
//     getFiles().then(res => setFiles(res.data)).catch(() => alert('Login required'));
//   }, []);

//   const openFile = async (f: FileItem) => {
//     const key = prompt(`Enter access key for "${f.fileName}"`);
//     if (!key) return;

//     try {
//       const { data } = await getSecureUrl(f._id, key);
//       window.open(data.url, '_blank');
//     } catch {
//       alert('Wrong key!');
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 px-4">
//       <h1 className="text-4xl font-bold text-center mb-10">My Secure Files</h1>
//       <div className="grid gap-6 md:grid-cols-3">
//         {files.map(f => (
//           <div key={f._id} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
//             <h3 className="font-semibold truncate">{f.fileName}</h3>
//             <p className="text-sm text-gray-500">{new Date(f.createdAt).toLocaleDateString()}</p>
//             <button
//               onClick={() => openFile(f)}
//               className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg"
//             >
//               View / Download (Key Required)
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
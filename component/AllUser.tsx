// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// interface User {
//   _id: string;
//   fullname: string;
//   email: string;
//   mobile: string;
//   address: string;
// }

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// export default function AllUser() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     mobile: "",
//     address: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/users`);
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       alert("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       await axios.post(`${API_BASE_URL}/users`, formData);

     
//       setFormData({ fullname: "", email: "", mobile: "", address: "" });

     
//       await fetchUsers();

//       alert("User added successfully!");
//     } catch (error: any) {
//       console.error("Error adding user:", error);
//       alert(error.response?.data?.message || "Failed to add user");
//     } finally {
//       setLoading(false);
//     }
//   };

// //   const handleGoToUpload = (userId: string) => {
// //     axios
// //       .get(`${API_BASE_URL}/upload/${userId}`)
// //       .then(() => {
// //         router.push(`/upload?userId=${userId}`);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching user details:", error);
// //         alert("Failed to fetch user details");
// //       });
// //   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Form Card */}
//       <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-12">
//         <div className="bg-gray-400 text-white px-6 py-4">
//           <h2 className="text-2xl font-bold">Add New User</h2>
//         </div>
//         <div className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="fullname"
//                   value={formData.fullname}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   placeholder="Enter full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   placeholder="Enter email address"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mobile
//                 </label>
//                 <input
//                   type="text"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   placeholder="Enter mobile number"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   placeholder="Enter address"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-green-600 text-white hover:cursor-pointer py-2 px-8 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition font-medium"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-gray-400 text-white">
//           <h3 className="text-xl font-bold">Users List</h3>
//         </div>

//         {loading && users.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">Loading users...</div>
//         ) : users.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">No users found.</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     S No.
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Full Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Mobile
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Address
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {users.map((user, index) => (
//                   <tr key={user._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {user.fullname}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {user.mobile}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {user.address}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <Link
//                         href={`/upload/${user._id}`}
//                         className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium inline-block"
//                       >
//                         Go
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  Users,
  LogOut,
  UserPlus,
  Shield,
  ChevronRight,
  PlusCircle,
} from "lucide-react";

interface User {
  _id: string;
  fullname: string;
  email: string;
  mobile: string;
  address: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export default function AllUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const adminUsername = "Admin"; // Replace with real auth later

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users`, {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users. Please log in again.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/users`, formData, {
        withCredentials: true,
      });

      setFormData({ fullname: "", email: "", mobile: "", address: "" });
      await fetchUsers();
      alert("User added successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Enhanced Sidebar - Fixed, Clean & Professional */}
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-800 to-purple-900 shadow-2xl flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-8 border-b border-white/10">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
        <Shield className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-xl font-bold text-white">Admin Portal</h1>
    </div>
    <button
      onClick={() => setSidebarOpen(false)}
      className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition"
    >
      <X className="w-5 h-5" />
    </button>
  </div>

  {/* Navigation - Takes available space */}
  <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
    <Link
      href="/alluser"
      className="flex items-center gap-4 px-4 py-3 text-white bg-white/10 rounded-xl transition hover:bg-white/20"
    >
      <Users className="w-5 h-5" />
      <span className="text-sm font-medium">All Users</span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-70" />
    </Link>
    {/* Add more nav items here in future */}
  </nav>

  {/* Logout Section - Pinned to Bottom */}
  <div className="p-6 border-t border-white/10">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <Shield className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{adminUsername}</p>
        <p className="text-white/70 text-xs">Administrator</p>
      </div>
    </div>
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-lg transition shadow-md"
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
                className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Users Management</h2>
              <div className="w-10" />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
            

              {/* Add User Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                  <h4 className="text-xl font-bold text-white flex items-center gap-3">
                    <UserPlus className="w-5 h-5" />
                    Add New User
                  </h4>
                </div>

                <div className="p-8">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["fullname", "email", "mobile", "address"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {field === "fullname" ? "Full Name" : field}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                          placeholder={
                            field === "fullname"
                              ? "Enter your Name"
                              : field === "email"
                              ? "Enter your email"
                              : field === "mobile"
                              ? "+91 98765 43210"
                              : "Enter your Address"
                          }
                        />
                      </div>
                    ))}

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed transition shadow-lg"
                      >
                        <PlusCircle className="w-5 h-5" />
                        {loading ? "Adding User..." : "Add User"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                  <h4 className="text-xl font-bold text-white flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    All Users ({users.length})
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  {loading && users.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-indigo-600"></div>
                      <p className="mt-4 text-gray-600">Loading users...</p>
                    </div>
                  ) : users.length === 0 ? (
                    <div className="p-16 text-center text-gray-500">
                      <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-xl">No users found</p>
                      <p className="mt-2">Start by adding a new user above</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          {["S.No", "Full Name", "Email", "Mobile", "Address", "Action"].map((header) => (
                            <th
                              key={header}
                              className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user, index) => (
                          <tr key={user._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.fullname}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{user.mobile}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{user.address}</td>
                            <td className="px-6 py-4">
                              <Link
                                href={`/upload/${user._id}`}
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition shadow"
                              >
                                Upload Files
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}

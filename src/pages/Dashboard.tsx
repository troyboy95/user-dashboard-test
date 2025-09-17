import { useState } from "react";
import { useUserContext } from "../UserContext";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import Modal from "../components/Modal";
import { UserPlus } from "lucide-react";

const Dashboard = () => {
  const { users, isUserFormOpen,setIsUserFormOpen, isLoading } = useUserContext();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 sticky top-0">
      <header>
        <h1>User&apos;s Dashboard</h1>
      </header>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="sm:w-2/3 h-12 px-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setIsUserFormOpen(true)}
          className="bg-blue-500 hover:text-white text-gray-200 sm:px-4 sm:py-2 p-1 flex items-center sm:gap-3 gap-2 sm:text-lg text-sm rounded"
        >
          <UserPlus width={20} height={20} /> User
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredUsers.length > 0 ? filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))
        :
        (
            !isLoading ?
            <span>No such user found!</span>
            : 
            <span>Loading...</span>
        )
    }
      </div>

      <Modal isOpen={isUserFormOpen} onClose={() => setIsUserFormOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Create New User</h2>
        <UserForm />
      </Modal>
    </div>
  );
};

export default Dashboard;

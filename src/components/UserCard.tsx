import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Building, MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }: { user: any }) => {

    const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: user.name,  
      size: 128,
    }).toDataUri();
  }, []);

    return (
        <Link to={`/user/${user.id}`}>
            <div className="bg-gray-100 rounded-xl shadow p-4 hover:shadow-lg hover:scale-105 hover:bg-gray-200 transition space-y-3 sm:max-w-full max-w-2xl">
                <img src={avatar} alt="Avatar" className=" mx-auto" />
                <div className="flex items-center justify-center sm:space-x-2 space-x-1">
                    <UserIcon className="text-black" width={20} height={20} />
                    <h2 className="font-semibold text-lg"> {user.name}</h2>
                </div>
                <div className="flex items-center justify-center sm:space-x-2 space-x-1">
                    <MailIcon className="text-black" width={20} height={20} />
                    <h2 className="font-semibold text-sm text-gray-600">{user.email}</h2>
                </div>
                <div className="flex items-center justify-center sm:space-x-2 space-x-1">
                    <PhoneIcon className="text-black" width={20} height={20} />
                    <h2 className="font-semibold text-sm text-gray-600">{user.phone}</h2>
                </div>
                <div className="flex items-center justify-center sm:space-x-2 space-x-1">
                    <Building className="text-black" width={20} height={20} />
                    <h2 className="font-semibold text-sm text-gray-600">{user.company.name}</h2>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;

import { useForm } from "react-hook-form";
import { useUserContext } from "../UserContext";

type FormData = {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    companyName: string;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    lat: string;
    lng: string;
};

const UserForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const { addUser, setIsUserFormOpen } = useUserContext();

    const onSubmit = (data: FormData) => {
        const newUser: any = {
            id: 999,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            website: data.website,
            company: { name: data.companyName },
            address: {
                street: data.street,
                suite: data.suite,
                city: data.city,
                zipcode: data.zipcode,
                geo: { lat: data.lat, lng: data.lng },
            },
        };
        addUser(newUser);
        reset();
        setIsUserFormOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register("phone", {
                        required: "Phone is required",
                        minLength: { value: 10, message: "Phone must number be 10 digits" },
                        maxLength: { value: 10, message: "Phone must number be 10 digits" }
                    })}
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register("companyName", { required: "Company name is required" })}
                    placeholder="Company"
                    className="w-full p-2 border rounded"
                />
                {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    {...register("street", { required: "Street is required" })}
                    placeholder="Street"
                    className={`w-full p-2 border rounded ${errors.street ? "border-red-500" : ""}`}
                />
                <input
                    {...register("suite")}
                    placeholder="Suite"
                    className="w-full p-2 border rounded"
                />
                <input
                    {...register("city", { required: "City is required" })}
                    placeholder="City"
                    className={`w-full p-2 border rounded ${errors.city ? "border-red-500" : ""}`}
                />
               
                <input
                    {...register("zipcode", { required: "Zip code is required" })}
                    placeholder="Zip Code"
                    className={`w-full p-2 border rounded ${errors.zipcode ? "border-red-500" : ""}`}
                />
                
            </div>

            <div className="grid grid-cols-2 gap-3">
                <input
                    {...register("lat", { required: "Latitude required" })}
                    placeholder="Latitude"
                    className={`w-full p-2 border rounded ${errors.lat ? "border-red-500" : ""}`}
                />
                <input
                    {...register("lng", { required: "Longitude required" })}
                    placeholder="Longitude"
                    className={`w-full p-2 border rounded ${errors.lng ? "border-red-500" : ""}`}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                Add User
            </button>
        </form>
    );
};

export default UserForm;

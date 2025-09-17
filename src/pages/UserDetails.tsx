import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../UserContext";

const UserDetails = () => {
  const { id } = useParams();
  const { users, isLoading } = useUserContext();

  
  if(isLoading) return <p>Loading user...</p>
  
  const user = users.find((u) => u.id === Number(id));
  if (!user && !isLoading) return <p>User not found</p>;
  const geoCoords = user.address.geo;
  const mapUrl = geoCoords && `https://www.openstreetmap.org/export/embed.html?bbox=${geoCoords.lng}%2C${geoCoords.lat}%2C${geoCoords.lng}%2C${geoCoords.lat}&layer=mapnik&marker=${geoCoords.lat},${geoCoords.lng}&zoom=1`;

  return (
    <div className="mx-auto">
      <Link to="/" className="text-blue-600">&larr; Back</Link>
        <h1 className="sm:text-2xl my-5 text-xl font-bold">{user.name}</h1>
      <div className="space-y-3 sm:mt-7 mt-4 text-lg">
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Company: {user.company.name}</p>
        <p>
            Address: {user.address.street}, {user.address.city} ({user.address.zipcode})
        </p>
        <p>Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
      </div>
      <iframe
        width="100%"
        height="300"
        src={mapUrl}
        className="mt-4 rounded shadow"
      ></iframe>
    </div>
  );
};

export default UserDetails;

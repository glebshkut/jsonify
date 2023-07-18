import { Role } from "@/lib/types";
import { Portal } from "./Portal";
import axios from "axios";
import { useSession } from "next-auth/react";


const RoleModal = () => {
  const { data: session } = useSession();

  const handleRoleChange = (role: Role) => {
    axios.post("/api/updateRole", {
      email: session?.user?.email,
      role: role
    })
      .then((res) => {
        console.log(`Role updated to ${role}`, res.data.user)
      })
  }

  return (
    <Portal>
      <div className="absolute flex flex-col items-center py-5 h-fit w-fit px-10 rounded-xl top-0 bottom-0 left-0 right-0 m-auto bg-black text-white">
        <p className="text-3xl">Choose role</p>
        <div className="flex flex-col text-xl">
          {Object.keys(Role).map((role) => {
            return (
              <button
                key={role}
                onClick={() => handleRoleChange(role as Role)}
                className="border-2 border-white rounded-full px-5 py-2 my-2 hover:bg-white hover:text-black"
              >{role}</button>
            )
          }
          )}
        </div>
      </div>
    </Portal>
  );
};

export default RoleModal;

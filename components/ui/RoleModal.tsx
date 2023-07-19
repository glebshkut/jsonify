import { Role } from "@/lib/types";
import { Portal } from "@/components/helpers/Portal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from '@/components/store/hooks';
import { userActions } from "@/components/store/userSlice";
import { getUserRole } from "@/components/selectors/getUserRole";
import { useOnClickOutside } from 'usehooks-ts'
import { useRef } from "react";
interface RoleModalProps {
  setRoleModalOpen: (open: boolean) => void;
}

const RoleModal = (props: RoleModalProps) => {
  const { setRoleModalOpen } = props;
  const { data: session } = useSession();
  const currentRole = useAppSelector(getUserRole)
  const dispatch = useAppDispatch();
  const { updateUserRole } = userActions;

  const closeModal = () => {
    setRoleModalOpen(false);
  }

  const ref = useRef(null)
  useOnClickOutside(ref, closeModal)

  const handleRoleChange = (role: Role) => {
    axios.post("/api/updateRole", {
      email: session?.user?.email,
      role: role
    })
      .then((res) => {
        dispatch(updateUserRole(res.data.user))
      })
    closeModal();
  }


  return (
    <Portal>
      <div ref={ref} className="z-30 absolute flex flex-col items-center py-5 h-fit w-fit px-10 rounded-xl top-0 bottom-0 left-0 right-0 m-auto bg-black text-white">
        <p className="text-3xl">Choose role</p>
        <div className="flex flex-col text-xl">
          {Object.keys(Role).map((role) => {
            return (
              <button
                key={role}
                onClick={() => handleRoleChange(role as Role)}
                className="border-2 border-white rounded-full px-5 py-2 my-2 hover:bg-white hover:text-black"
                style={{ textDecoration: role === currentRole ? "underline" : "none" }}
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

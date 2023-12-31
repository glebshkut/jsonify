import { Portal } from "@/components/helpers/Portal";
import { Role } from "@/lib/types";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { useOnClickOutside } from 'usehooks-ts';
interface RoleModalProps {
  setRoleModalOpen: (open: boolean) => void;
}

const RoleModal = (props: RoleModalProps) => {
  const { setRoleModalOpen } = props;
  const { data: session, update } = useSession();
  const user = useMemo(() => session?.user as User, [session]);
  const t = useTranslations("role");

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
        update({ session: { ...session, user: res.data.user } })
      })
    closeModal();
  }


  return (
    <Portal>
      <div ref={ref} className="z-30 absolute flex flex-col items-center gap-3 py-5 h-fit w-fit px-10 rounded-xl top-0 bottom-0 left-0 right-0 m-auto bg-blue-500 text-white dark:bg-slate-900 dark:text-slate-200">
        <p className="text-3xl">{t("chooseRole")}</p>
        <div className="flex flex-col text-xl gap-2">
          {Object.keys(Role).map((role) => {
            return (
              <button
                key={role}
                onClick={() => handleRoleChange(role as Role)}
                className="border-2 border-white rounded-full px-5 py-2 hover:bg-blue-300 hover:text-gray-700 dark:hover:bg-slate-300 dark:hover:text-slate-900"
                style={{ textDecoration: role === user.role ? "underline" : "none" }}
              >{t(role)}</button>
            )
          }
          )}
        </div>
      </div>
    </Portal>
  );
};

export default RoleModal;

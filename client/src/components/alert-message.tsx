// import type { RootState } from "@/store";
// import { useSelector } from "react-redux";

// const AlertMessage = () => {
//   const alert = useSelector((state: RootState) => state.alert);
//   return (
//     alert !== null &&
//     alert.length > 0 &&
//     alert.map((alert) => (
//       <div
//         key={alert.id}
//         className={
//           alert.alertType === "success"
//             ? `bg-green-200 text-green-500 px-5`
//             : `bg-red-200 text-red-500 px-5`
//         }
//       >
//         {alert.msg}
//       </div>
//     ))
//   );
// };

// export default AlertMessage;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { toast } from "sonner";

const AlertMessage = () => {
  const alert = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    alert.map((a) => {
      if (a.alertType === "success") {
        toast.success(a.msg, { duration: 5000 });
      } else if (a.alertType === "error") {
        toast.error(a.msg, { duration: 5000 });
      }
    });
  }, [alert]);

  return null;
};

export default AlertMessage;

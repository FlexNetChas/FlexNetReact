import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

// A generic state to match a state of a useActionState, ex. Login/Register
interface GenericState {
  errors?: {
    [key: string]: string[] | undefined;
    form?: string[];
  };
  success?: boolean;
}

// Configuration options
interface ToastOptions {
  successMessage?: string;
  duration?: number;
}

/* Exemple use case
 useToasts(state, {
    successMessage: " message ",
    duration: number in milliseconds
 });
 */

export const useToasts = (
  state: GenericState | undefined,
  options?: ToastOptions
) => {
  const { successMessage = "Success", duration = 5000 } = options || {};

  useEffect(() => {
    if (!state) return;

    if (state.errors) {
      // Handle form errors and input field errors from server
      Object.keys(state.errors).forEach((key) => {
        state.errors![key]?.forEach((errorMessage) =>
          toast(
            <div className="flex items-center justify-between gap-2 p-2">
              <div className="flex items-center gap-2">
                <span className="text-error">{errorMessage}</span>
              </div>
              <div
                className="rounded-full border border-error p-1 cursor-pointer bg-red-50 text-error transition transform hover:scale-105 hover:bg-red-100 flex-shrink-0"
                onClick={() => toast.dismiss()}
              >
                <X size={13} />
              </div>
            </div>,
            {
              duration: Infinity,
              className: "bg-white text-black shadow-md",
              icon: null,
            }
          )
        );
      });
    }

    /* Unlike error message. Sucess message will not come from backend and had to be set manually in child component
     * Success message will also be a quick notification that will auto-dismiss after a few seconds
     * If we want to disable auto-dismiss do we need to include a dissmiss button like error messages */
    if (state.success) {
      toast(
        <div className="flex items-center justify-between gap-2 p-2">
          <div className="flex items-center gap-2">
            <span className="text-success">{successMessage}</span>
          </div>
        </div>,
        {
          duration,
          className: "bg-white text-black shadow-md",
          icon: null,
        }
      );
    }
  }, [state, successMessage, duration]);
};

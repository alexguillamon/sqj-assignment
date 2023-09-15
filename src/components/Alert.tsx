"use client";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "../utils/helpers";

export default function Alert({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  const Icon = type === "success" ? CheckCircleIcon : XCircleIcon;

  return (
    <div
      className={classNames(
        "rounded-md p-4",
        type === "success" ? "bg-green-50" : "bg-red-50"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={classNames(
              "h-5 w-5",
              type === "success" ? "text-green-400" : "text-red-400"
            )}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p
            className={classNames(
              `text-sm font-medium`,
              type === "success" ? `text-green-800` : "text-red-800"
            )}
          >
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={classNames(
                "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                type === "success"
                  ? "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600"
                  : "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600"
              )}
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: I would refactor this to use the compound component pattern.
// This would make the modal more reusable and flexible. Example structure:
//
// Example usage:
// <Modal>
//   <Modal.Backdrop />
//   <Modal.Panel>
//     <Modal.Title>Make a Payment</Modal.Title>
//     <Modal.Description>Payment details...</Modal.Description>
//     <Modal.Content>
//       {/* Form content */}
//     </Modal.Content>
//     <Modal.Footer>
//       <Modal.Button>Pay</Modal.Button>
//     </Modal.Footer>
//   </Modal.Panel>
// </Modal>

import { twMerge } from "tailwind-merge";
import {
  XMarkIcon,
  BoltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import type { Filter } from "../types/accounts";
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export function MobileFilterModal({
  isOpen,
  onClose,
  filter,
  setFilter,
}: MobileFilterModalProps) {
  const handleReset = () => {
    setFilter({ energyType: "", search: "" });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 2xl:hidden">
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="fixed inset-0 flex items-end justify-center">
        <DialogPanel
          className={twMerge(
            "w-full bg-white rounded-t-3xl shadow-xl",
            "transform transition-all duration-300 ease-out",
            "max-h-[85vh] overflow-y-auto"
          )}
        >
          <div
            className={twMerge(
              "sticky top-0 bg-white border-b border-blue-100 px-4 py-4 flex items-center justify-between"
            )}
          >
            <div className={twMerge("flex items-center gap-2 max-w-3xl mx-auto w-full")}>
              <DialogTitle className={twMerge("text-xl font-semibold text-grey-900")}>
                Filters
              </DialogTitle>
              {Object.values(filter).some(Boolean) && (
                <button
                  onClick={handleReset}
                  className={twMerge(
                    "px-2.5 py-1 rounded-full border border-blue-200 text-blue-600",
                    "text-xs font-medium hover:bg-blue-50 transition-colors"
                  )}
                >
                  Reset
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className={twMerge(
                "p-1.5 rounded-full hover:bg-grey-100 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              )}
            >
              <XMarkIcon className={twMerge("h-6 w-6 text-grey-500")} />
            </button>
          </div>

          <div className={twMerge("p-4 space-y-6 max-w-3xl mx-auto w-full")}>
            <div className={twMerge("space-y-3")}>
              <div
                className={twMerge(
                  "flex items-center gap-2 text-sm font-medium text-grey-700"
                )}
              >
                <BoltIcon className={twMerge("h-4 w-4 text-blue-400")} />
                <span>Energy Type</span>
              </div>
              <div className={twMerge("grid grid-cols-2 gap-2")}>
                {[
                  { value: "", label: "All Types" },
                  { value: "ELECTRICITY", label: "Electricity" },
                  { value: "GAS", label: "Gas" },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() =>
                      setFilter((prev) => ({
                        ...prev,
                        energyType: type.value as Filter["energyType"],
                      }))
                    }
                    className={twMerge(
                      "py-2.5 px-3 rounded-xl text-sm font-medium transition-colors",
                      "border border-blue-100",
                      filter.energyType === type.value
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-white text-grey-700 hover:bg-grey-50"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={twMerge("space-y-3")}>
              <div
                className={twMerge(
                  "flex items-center gap-2 text-sm font-medium text-grey-700"
                )}
              >
                <MagnifyingGlassIcon
                  className={twMerge("h-4 w-4 text-blue-400")}
                />
                <span>Search Address</span>
              </div>
              <div className={twMerge("relative")}>
                <input
                  type="text"
                  value={filter.search}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, search: e.target.value }))
                  }
                  placeholder="Enter address..."
                  className={twMerge(
                    "w-full py-2.5 px-4 rounded-xl border border-blue-100",
                    "text-sm text-grey-900 placeholder:text-grey-400",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
                    "bg-white"
                  )}
                />
              </div>
            </div>
          </div>

          <div
            className={twMerge(
              "sticky bottom-0 bg-white border-t border-blue-100 p-4"
            )}
          >
            <div className="max-w-3xl mx-auto w-full">
              <button
                onClick={onClose}
                className={twMerge(
                  "w-full py-3.5 px-4 bg-blue-500 text-white font-semibold rounded-xl",
                  "hover:bg-blue-600 active:bg-blue-700 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  "text-base"
                )}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

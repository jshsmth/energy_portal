import { twMerge } from "tailwind-merge";

interface PaymentSuccessProps {
  onClose: () => void;
}

export function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="rounded-full bg-green-100 p-2">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Payment Processed Successfully
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>We&apos;ve sent you an email with all the details of your payment.</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className={twMerge(
          "w-full py-3.5 px-4 bg-blue-500 text-white font-semibold rounded-xl cursor-pointer",
          "hover:bg-blue-600 active:bg-blue-700 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
          "text-base"
        )}
        onClick={onClose}
      >
        Got it, thanks!
      </button>
    </div>
  );
} 
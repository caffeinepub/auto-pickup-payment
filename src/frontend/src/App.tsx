import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertCircle,
  Car,
  CheckCircle,
  Copy,
  CreditCard,
  Lock,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const UPI_ID = "rin668087-1@okicici";
const PAYEE_NAME = "Muhammed S";
const PAYMENT_PURPOSE = "Auto Service Payment";

function buildUPILink(amount: string, appPackage?: string): string {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    am: amount,
    cu: "INR",
    tn: PAYMENT_PURPOSE,
  });
  const baseParams = params.toString();

  if (appPackage) {
    return `intent://pay?${baseParams}#Intent;scheme=upi;package=${appPackage};end`;
  }
  return `upi://pay?${baseParams}`;
}

const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

const UPI_APPS = [
  {
    id: "gpay",
    name: "Google Pay",
    package: "com.google.android.apps.nbu.paisa.user",
    icon: (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border shadow-xs">
        <span
          className="text-xs font-bold"
          style={{ color: "#4285F4", fontSize: "9px", lineHeight: 1 }}
        >
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>P</span>
          <span style={{ color: "#34A853" }}>a</span>
          <span style={{ color: "#FBBC05" }}>y</span>
        </span>
      </div>
    ),
    bgClass: "bg-white",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    package: "com.phonepe.app",
    icon: (
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full"
        style={{ backgroundColor: "#5f259f" }}
      >
        <span className="text-white text-xs font-black">Pe</span>
      </div>
    ),
    bgClass: "bg-white",
  },
  {
    id: "paytm",
    name: "Paytm",
    package: "net.one97.paytm",
    icon: (
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full"
        style={{ backgroundColor: "#002970" }}
      >
        <span className="text-white font-black" style={{ fontSize: "8px" }}>
          Paytm
        </span>
      </div>
    ),
    bgClass: "bg-white",
  },
  {
    id: "bhim",
    name: "BHIM UPI",
    package: undefined,
    icon: (
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full"
        style={{ backgroundColor: "#FF6600" }}
      >
        <span className="text-white text-xs font-black">BHIM</span>
      </div>
    ),
    bgClass: "bg-white",
  },
];

export default function App() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const validateAmount = (val: string): boolean => {
    if (!val || val.trim() === "") {
      setError("Please enter an amount");
      return false;
    }
    const num = Number.parseFloat(val);
    if (Number.isNaN(num) || num < 100) {
      setError("Minimum amount is ₹100");
      return false;
    }
    setError("");
    return true;
  };

  const handlePayNow = () => {
    if (!validateAmount(amount)) return;
    const link = buildUPILink(amount);
    window.location.href = link;
  };

  const handleAppPay = (app: (typeof UPI_APPS)[0]) => {
    if (!validateAmount(amount)) return;
    const link =
      isMobile() && app.package
        ? buildUPILink(amount, app.package)
        : buildUPILink(amount);
    window.location.href = link;
    toast.success(`Opening ${app.name}...`, { duration: 2000 });
  };

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy. Please copy manually.");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    if (error) setError("");
  };

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.973 0.004 247)" }}
    >
      <Toaster position="top-center" />

      {/* Header */}
      <header className="w-full bg-card border-b border-border shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ backgroundColor: "oklch(0.53 0.12 162)" }}
            >
              <Car className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-foreground text-sm sm:text-base tracking-tight">
                Muhammed S
              </span>
              <span className="text-muted-foreground text-xs hidden sm:block">
                Auto Service
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield
              className="w-4 h-4"
              style={{ color: "oklch(0.53 0.12 162)" }}
            />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Secure Payments
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Payment Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card-lg overflow-hidden">
            {/* Card Header Banner */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ backgroundColor: "oklch(0.95 0.045 162)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "oklch(0.53 0.12 162)" }}
                >
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.53 0.12 162)" }}
                  >
                    Secure UPI Payment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    256-bit encrypted
                  </p>
                </div>
              </div>
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-white text-sm"
                style={{ backgroundColor: "oklch(0.53 0.12 162)" }}
              >
                M
              </div>
            </div>

            {/* Payee Info Row */}
            <div className="px-6 py-3 flex items-center justify-between bg-card">
              <div>
                <p className="text-xs text-muted-foreground">Paying to</p>
                <p className="font-semibold text-foreground text-sm">
                  {PAYEE_NAME}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Purpose</p>
                <p className="font-medium text-sm text-foreground">
                  {PAYMENT_PURPOSE}
                </p>
              </div>
            </div>

            <Separator />

            {/* Amount Section */}
            <div className="px-6 pt-5 pb-2">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                Enter Payment Amount
              </h1>
              <p className="text-muted-foreground text-sm mb-5">
                in Indian Rupees (INR)
              </p>

              <div className="space-y-1.5">
                <Label
                  htmlFor="amount"
                  className="text-sm font-semibold text-foreground"
                >
                  Amount
                </Label>
                <div className="relative">
                  <div
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none"
                    style={{ color: "oklch(0.53 0.12 162)" }}
                  >
                    ₹
                  </div>
                  <Input
                    id="amount"
                    data-ocid="payment.input"
                    type="number"
                    min="100"
                    step="1"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountChange}
                    onKeyDown={(e) => e.key === "Enter" && handlePayNow()}
                    className={[
                      "pl-8 pr-4 h-13 text-lg sm:text-xl font-semibold rounded-xl transition-all",
                      "placeholder:text-muted-foreground/50",
                      error
                        ? "border-destructive focus-visible:ring-destructive"
                        : "focus-visible:ring-2",
                    ].join(" ")}
                    style={{
                      backgroundColor: error
                        ? undefined
                        : "oklch(0.95 0.045 162)",
                      borderColor: error ? undefined : "oklch(0.65 0.12 162)",
                      fontSize: "1.15rem",
                      height: "3.25rem",
                    }}
                    aria-describedby={error ? "amount-error" : undefined}
                    aria-invalid={!!error}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-destructive text-sm"
                    id="amount-error"
                    data-ocid="payment.error_state"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </div>

              {/* Amount Note */}
              <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.53 0.12 162)" }}
                />
                Amount will be pre-filled in your UPI app
              </p>
            </div>

            {/* PAY NOW CTA */}
            <div className="px-6 pt-3 pb-4">
              <Button
                data-ocid="payment.primary_button"
                onClick={handlePayNow}
                className="w-full h-13 rounded-full text-base font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.53 0.12 162), oklch(0.58 0.12 162))",
                  height: "3.25rem",
                }}
              >
                <Lock className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            </div>

            <Separator />

            {/* UPI App Selection */}
            <div className="px-6 py-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Or pay with UPI app
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {UPI_APPS.map((app, idx) => (
                  <motion.button
                    key={app.id}
                    data-ocid={`payment.button.${idx + 1}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.07, duration: 0.3 }}
                    onClick={() => handleAppPay(app)}
                    className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border border-border bg-card hover:border-brand-border hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                    type="button"
                    aria-label={`Pay with ${app.name}`}
                  >
                    {app.icon}
                    <span className="text-xs text-muted-foreground font-medium leading-tight text-center">
                      {app.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <Separator />

            {/* UPI ID Copy */}
            <div className="px-6 py-4">
              <div
                className="flex items-center justify-between rounded-xl px-4 py-2.5 border"
                style={{
                  backgroundColor: "oklch(0.97 0.003 247)",
                  borderColor: "oklch(0.922 0.005 247)",
                }}
              >
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-xs text-muted-foreground mb-0.5">UPI ID</p>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-foreground truncate">
                    {UPI_ID}
                  </p>
                </div>
                <Button
                  data-ocid="payment.secondary_button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUPI}
                  className="flex-shrink-0 h-8 px-3 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    borderColor: copied ? "oklch(0.53 0.12 162)" : undefined,
                    color: copied ? "oklch(0.53 0.12 162)" : undefined,
                  }}
                  aria-label="Copy UPI ID"
                >
                  {copied ? (
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 mr-1" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Security Footer */}
            <div
              className="px-6 py-3 text-center"
              style={{ backgroundColor: "oklch(0.975 0.003 247)" }}
            >
              <div className="flex items-center justify-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Payments are processed securely via UPI
                </p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              RBI Approved
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              256-bit SSL
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="text-xs text-muted-foreground">NPCI Regulated</div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" />
            <span>
              &copy; {currentYear} Muhammed S Auto Service. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secure payments via UPI
            </span>
            <span>·</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

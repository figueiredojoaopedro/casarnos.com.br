"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Info, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

type AlertProps = {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  description?: string;
  className?: string;
};

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

const AlertaComponent = ({
  variant = "info",
  title,
  description,
  className,
}: AlertProps) => {
  const Icon = iconMap[variant];

  return (
    <Alert
      className={cn(
        "flex items-start gap-3 p-4 border-l-4",
        {
          "border-blue-500": variant === "info",
          "border-green-500": variant === "success",
          "border-yellow-500": variant === "warning",
          "border-red-500": variant === "error",
        },
        className
      )}
    >
      <Icon className="w-5 h-5 mt-1" />
      <div>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{description}</AlertDescription>
      </div>
    </Alert>
  );
};

export default AlertaComponent;

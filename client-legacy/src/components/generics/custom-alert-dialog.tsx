"use client";

import type React from "react";

import { AlertTriangle, AlertCircle, XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type TCustomAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
  variant?: "warning" | "danger" | "info";
  icon?: React.ReactNode;
  confirmDisabled?: boolean;
  cancelDisabled?: boolean;
};

const CustomAlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  variant = "warning",
  icon,
  confirmDisabled = false,
  cancelDisabled = false,
}: TCustomAlertDialogProps) => {
  // Simplified variant styles
  const variantStyles = {
    warning: {
      iconColor: "text-amber-500",
      icon: icon || <AlertTriangle className="h-5 w-5" />,
      confirmButton: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    danger: {
      iconColor: "text-red-500",
      icon: icon || <XCircle className="h-5 w-5" />,
      confirmButton: "bg-red-600 hover:bg-red-700 text-white",
    },
    info: {
      iconColor: "text-purple-600",
      icon: icon || <AlertCircle className="h-5 w-5" />,
      confirmButton: "bg-purple-600 hover:bg-purple-700 text-white",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className={currentVariant.iconColor}>
              {currentVariant.icon}
            </span>
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 mt-4">
          <Button
          variant={'outline'}
            disabled={cancelDisabled}
            onClick={() => onOpenChange(false)}
            className="mt-0"
          >
            {cancelText}
          </Button>
          <Button
            disabled={confirmDisabled}
            onClick={() => {
              onConfirm();
            }}
            className={cn("mt-0", currentVariant.confirmButton)}
          >
            {confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;

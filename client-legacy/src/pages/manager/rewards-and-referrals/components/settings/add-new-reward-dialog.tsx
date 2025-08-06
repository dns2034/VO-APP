import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";
import { useState } from "react";

export default function AddNewRewardDialog({
  setClose,
  open,
}: {
  open: boolean;
  setClose: () => void;
}) {
  const [formData, setFormData] = useState({
    rewardName: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({
    rewardName: false,
    description: false,
    price: false,
  });

  const [touched, setTouched] = useState({
    rewardName: false,
    description: false,
    price: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const fieldName =
      id === "reward-name" ? "rewardName" : (id as keyof typeof touched);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (touched[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: value.trim() === "",
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id } = e.target;
    const fieldName =
      id === "reward-name" ? "rewardName" : (id as keyof typeof touched);

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: formData[fieldName].trim() === "",
    }));
  };

  const handleSubmit = () => {
    // Check all fields
    const newErrors = {
      rewardName: formData.rewardName.trim() === "",
      description: formData.description.trim() === "",
      price: formData.price.trim() === "",
    };

    setErrors(newErrors);
    setTouched({
      rewardName: true,
      description: true,
      price: true,
    });

    // If no errors, proceed with submission
    if (!Object.values(newErrors).some(Boolean)) {
      console.log("Form submitted:", formData);
      // Add your submission logic here
      resetForm();
      setClose();
    }
  };

  const resetForm = () => {
    setFormData({
      rewardName: "",
      description: "",
      price: "",
    });
    setErrors({
      rewardName: false,
      description: false,
      price: false,
    });
    setTouched({
      rewardName: false,
      description: false,
      price: false,
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    setClose(); //
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center gap-2">
          <Settings className="h-6 w-6 text-purple-500" />
          <DialogTitle className="text-xl font-bold">
            Add New Rewards
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-6 text-gray-600">
            Configure settings for Rewards & Referrals
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="reward-name"
                className="block text-sm font-medium text-purple-600"
              >
                Reward Name
              </label>
              <Input
                id="reward-name"
                value={formData.rewardName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                  errors.rewardName ? "border-red-500" : ""
                }`}
              />
              {errors.rewardName && touched.rewardName && (
                <p className="mt-1 text-xs text-red-500">
                  Reward name is required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-purple-600"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`min-h-[100px] w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && touched.description && (
                <p className="mt-1 text-xs text-red-500">
                  Description is required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-purple-600"
              >
                Price
              </label>
              <Input
                id="price"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && touched.price && (
                <p className="mt-1 text-xs text-red-500">Price is required</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-800 hover:bg-gray-50"
                onClick={() => setClose()}
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400"
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

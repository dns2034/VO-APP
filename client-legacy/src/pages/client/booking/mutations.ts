import { useMutation } from "@tanstack/react-query";
import { cancelBooking, createBooking } from "../../shared/services/booking-service";

export const useCreateBookingMutation = () =>
  useMutation({ mutationFn: createBooking });

export const useCancelBookingMutation = () =>
  useMutation({ mutationFn: cancelBooking });

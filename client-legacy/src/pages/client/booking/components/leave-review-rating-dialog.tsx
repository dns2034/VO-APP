import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface LeaveReviewRatingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: number, remarks: string) => void;
}

const ratingLabels = ['Poor', 'Average', 'Good', 'Great', 'Excellent'];

export const LeaveReviewRatingDialog: React.FC<LeaveReviewRatingDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleSubmit = () => {
    onSubmit(rating, remarks);
    onOpenChange(false);
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoveredRating(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredRating(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="flex items-start justify-between mb-4">
            <div className="flex items-center text-purple-600">
              <div className="flex items-center gap-2">
                <div className="text-purple-600">
                  <Star className="h-5 w-5 fill-purple-600" />
                </div>
                <span className="font-medium">Rating</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full absolute right-4 top-4"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Leave a review/rating
            </h2>
            <p className="text-gray-600">
              Please review/rate your experience
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleStarClick(index)}
                  onMouseEnter={() => handleStarHover(index)}
                  onMouseLeave={handleStarLeave}
                  className="p-1"
                >
                  <Star 
                    className={`h-10 w-10 ${
                      (hoveredRating !== null ? index < hoveredRating : index < rating)
                        ? 'fill-black'
                        : 'text-black'
                    }`}
                  />
                </button>
                <span className="text-xs mt-1">{ratingLabels[index]}</span>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Remarks</h3>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Please provide details about the review/ratings of your experience (e.g., The experience is superb)"
              className="w-full h-32 resize-none"
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveReviewRatingDialog;
import { Review } from "../../types/Review";

export default function ReviewCard({ review }: { review: Review }) {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0].toUpperCase()).join("");
    return initials.slice(0, 2); // max 2 letters
  };

  return (
    <div className="bg-card-background w-56 shrink-0 rounded-xl p-4 sm:w-100 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="mb-2 flex items-center gap-3 sm:mb-6">
          {review.imageUrl ? (
            <img
              src={review.imageUrl}
              alt={review.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-700">
              {getInitials(review.name)}
            </div>
          )}
          <h3 className="text-xs font-semibold sm:text-sm">{review.name}</h3>
        </div>
        <div className="mb-3 flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.946c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.946a1 1 0 00-.364-1.118L2.037 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-foreground text-sm whitespace-pre-line sm:text-base">
        "{review.text}"
      </p>
    </div>
  );
}

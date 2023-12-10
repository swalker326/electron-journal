import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Link } from "react-router-dom";
import Markdown from "marked-react";
import { formatDistance, formatDistanceToNow } from "date-fns";

const CarouselCard = ({
  id,
  title,
  content,
  createdAt
}: {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}) => {
  return (
    <div className="snap-center shrink-0 min-h-full ">
      <Link to={`/entries/${id}`}>
        <Card className="w-[350px] inline-block min-h-full bg-gray-100 hover:bg-white dark:hover:bg-gray-900">
          <CardHeader className="pb-1">
            <CardTitle className="text-red-500 font-light">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500">
              {formatDistanceToNow(createdAt)}
            </div>
            <article className="prose dark:prose-invert mt-2">
              <Markdown>{content.slice(0, 200)}</Markdown>
            </article>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export const Carousel = ({
  items
}: {
  items: { id: number; title: string; content: string; createdAt: Date }[];
}) => {
  //make my carousel slide left and right using tailwindcss translate
  //when it gets to the end, it should snap back to the beginning
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollComplete, setScrollComplete] = useState(0);
  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }
    const scrollHandler = () => {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current!;
      const sc = scrollLeft / (scrollWidth - clientWidth);
      setScrollComplete(sc);
    };

    sliderRef.current.addEventListener("scroll", scrollHandler);
    return () => {
      sliderRef.current?.removeEventListener("scroll", scrollHandler);
    };
  }, [sliderRef.current]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent blur" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent blur" />
      <div
        ref={sliderRef}
        className="flex items-stretch space-x-4 snap-x snap-mandatory overflow-x-auto p-4 no-scrollbar "
      >
        {items.map((i) => {
          return <CarouselCard key={i.id} {...i} />;
        })}
      </div>
      <div className="absolute top-1/2 left-0 z-20 -translate-y-1/2 transform">
        {scrollComplete !== 0 && (
          <button
            className=" shadow-lg rounded-full bg-gray-100"
            onClick={() => {
              sliderRef.current?.scrollBy({
                left: -550,
                behavior: "smooth"
              });
            }}
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
        )}
      </div>
      <div className="absolute top-1/2 right-0 z-20 -translate-y-1/2 transform">
        {scrollComplete !== 1 && (
          <button
            className=" shadow-lg rounded-full bg-gray-100"
            onClick={() => {
              sliderRef.current?.scrollBy({
                left: 550,
                behavior: "smooth"
              });
            }}
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
          </button>
        )}
      </div>
    </div>
  );
};

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

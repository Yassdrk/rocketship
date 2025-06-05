"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  joinDate: string;
  stats: {
    creations: number;
    rating: number;
    reviews: number;
    followers: number;
  };
}

interface Creation {
  id: number;
  name: string;
  image: string;
  likes: number;
  date: string;
  reactions: {
    likes: number;
    wows: number;
    prints: number;
  };
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  modelName: string;
}

// Temporary data (to be replaced with real data later)
const userProfiles: Record<string, UserProfile> = {
  neo: {
    name: "Thomas Anderson",
    username: "@neo",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    bio: "Passionate 3D artist and designer. Creating unique pieces that blend art and functionality.",
    joinDate: "January 2024",
    stats: {
      creations: 24,
      rating: 4.8,
      reviews: 32,
      followers: 156,
    },
  },
  chuckNorris: {
    name: "Chuck Norris",
    username: "@chuckNorris",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Action star turned 3D artist. Creating powerful and dynamic character designs.",
    joinDate: "December 2023",
    stats: {
      creations: 45,
      rating: 4.9,
      reviews: 28,
      followers: 234,
    },
  },
  jean: {
    name: "Jean Dupont",
    username: "@jean",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "French 3D artist specializing in character design and animation.",
    joinDate: "February 2024",
    stats: {
      creations: 18,
      rating: 4.6,
      reviews: 15,
      followers: 89,
    },
  },
  alice: {
    name: "Alice Martin",
    username: "@alice",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    bio: "Digital artist exploring the boundaries of character design and storytelling.",
    joinDate: "January 2024",
    stats: {
      creations: 31,
      rating: 4.7,
      reviews: 24,
      followers: 167,
    },
  },
};

const userCreations: Record<string, Creation[]> = {
  neo: [
    {
      id: 1,
      name: "Cyber Dragon",
      image:
        "https://cdn.meshy.ai/uploads/prod/7efdd1e3c13248762155121b6ef32b3bc887f9dbaff704d955a4410bc95d6bff/publish/cover-portrait/01970a79-6f6b-7f60-8b21-55f7f4a2f02b.jpg",
      likes: 45,
      date: "2 days ago",
      reactions: {
        likes: 45,
        wows: 23,
        prints: 12,
      },
    },
    {
      id: 2,
      name: "Space Explorer",
      image:
        "https://cdn.meshy.ai/uploads/prod/56c87eb4985a785a552ae286c7a9f989d027ca2a50fbaabc57fa55077a81b1c9/publish/cover-portrait/01970a99-b532-7b10-ae72-84bea1daaf67.jpg",
      likes: 32,
      date: "5 days ago",
      reactions: {
        likes: 32,
        wows: 18,
        prints: 8,
      },
    },
    {
      id: 3,
      name: "Forest Spirit",
      image:
        "https://cdn.meshy.ai/uploads/prod/bff133a4a98b09b2c0c5beb75706358727ba96f93aae73f22cc54adbc9f75d05/publish/cover-portrait/01970a0c-5f07-7340-88ec-25ecef464147.jpg",
      likes: 67,
      date: "1 week ago",
      reactions: {
        likes: 67,
        wows: 42,
        prints: 15,
      },
    },
  ],
  chuckNorris: [
    {
      id: 1,
      name: "Action Hero",
      image:
        "https://cdn.meshy.ai/uploads/prod/56c87eb4985a785a552ae286c7a9f989d027ca2a50fbaabc57fa55077a81b1c9/publish/cover-portrait/01970a99-b532-7b10-ae72-84bea1daaf67.jpg",
      likes: 78,
      date: "1 day ago",
      reactions: { likes: 78, wows: 45, prints: 20 },
    },
  ],
  jean: [
    {
      id: 1,
      name: "French Knight",
      image:
        "https://cdn.meshy.ai/uploads/prod/bff133a4a98b09b2c0c5beb75706358727ba96f93aae73f22cc54adbc9f75d05/publish/cover-portrait/01970a0c-5f07-7340-88ec-25ecef464147.jpg",
      likes: 56,
      date: "3 days ago",
      reactions: { likes: 56, wows: 34, prints: 15 },
    },
  ],
  alice: [
    {
      id: 1,
      name: "Forest Guardian",
      image:
        "https://cdn.meshy.ai/uploads/prod/7efdd1e3c13248762155121b6ef32b3bc887f9dbaff704d955a4410bc95d6bff/publish/cover-portrait/01970a79-6f6b-7f60-8b21-55f7f4a2f02b.jpg",
      likes: 89,
      date: "4 days ago",
      reactions: { likes: 89, wows: 67, prints: 25 },
    },
  ],
};

const userReviews: Record<string, Review[]> = {
  neo: [
    {
      id: "REV-001",
      author: "Alice Martin",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      comment:
        "Exceptional print quality! The model is perfectly detailed and the final result is beautiful.",
      date: "2024-01-15",
      modelName: "Cyber Dragon",
    },
    {
      id: "REV-002",
      author: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      comment:
        "Great attention to detail. Fast delivery and the model perfectly matches my expectations.",
      date: "2024-01-10",
      modelName: "Space Explorer",
    },
  ],
  chuckNorris: [
    {
      id: "REV-001",
      author: "Jean Dupont",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      comment:
        "Incredible attention to detail in the character design. The action poses are perfect!",
      date: "2024-01-18",
      modelName: "Action Hero",
    },
  ],
  jean: [
    {
      id: "REV-001",
      author: "Alice Martin",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      rating: 5,
      comment:
        "The medieval design elements are beautifully executed. Amazing work!",
      date: "2024-01-20",
      modelName: "French Knight",
    },
  ],
  alice: [
    {
      id: "REV-001",
      author: "Thomas Anderson",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5,
      comment:
        "The organic elements and fluid design are breathtaking. A true masterpiece!",
      date: "2024-01-22",
      modelName: "Forest Guardian",
    },
  ],
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-yellow-400">
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default function ProfilePage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState<"creations" | "reviews">(
    "creations"
  );

  const userProfile = userProfiles[slug as string];
  const creations = userCreations[slug as string] || [];
  const reviews = userReviews[slug as string] || [];

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-cal text-white mb-4">
            Profile not found
          </h1>
          <Link href="/" className="text-purple-500 hover:text-purple-400">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        {/* Profile header */}
        <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden">
          {/* Banner */}
          <div className="h-48 w-full bg-gradient-to-r from-[#1a0b2e] via-[#1f1145] to-[#1a0b2e] relative">
            {/* Profile picture - positioned to overflow */}
            <img
              src="https://png.pngtree.com/background/20250105/original/pngtree-cutting-edge-design-youtube-channel-art-with-gradient-texture-technology-picture-image_15298381.jpg"
              alt="Profile banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute -bottom-12 left-8">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-32 h-32 rounded-full border-4 border-[#111111]"
              />
            </div>
          </div>

          {/* Profile info - adjusted padding to accommodate the overflowing image */}
          <div className="py-4 px-8">
            <div className="flex items-start gap-6">
              <div className="w-32" /> {/* Spacer for the overflowing image */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-2xl font-cal text-white">
                    {userProfile.name}
                  </h1>
                  <span className="text-gray-400">{userProfile.username}</span>
                </div>
                <p className="text-gray-300 mb-4">{userProfile.bio}</p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-white">
                      {userProfile.stats.creations}
                    </div>
                    <div className="text-sm text-gray-400">Creations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-white flex items-center justify-center">
                      <span className="text-yellow-400 mr-1">★</span>{" "}
                      {userProfile.stats.rating}
                    </div>
                    <div className="text-sm text-gray-400">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-white">
                      {userProfile.stats.reviews}
                    </div>
                    <div className="text-sm text-gray-400">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-white">
                      {userProfile.stats.followers}
                    </div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 pt-2 border-b border-[#222222]">
          <button
            onClick={() => setActiveTab("creations")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "creations"
                ? "text-white border-b-2 border-[#333333]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Creations
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "reviews"
                ? "text-white border-b-2 border-[#333333]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Reviews ({userProfile.stats.reviews})
          </button>
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 gap-8">
          {activeTab === "creations" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creations.map((creation) => (
                <Link href={`/design/${creation.id}`} key={creation.id}>
                  <div
                    className="group rounded-xl p-3
                  bg-[#111111]
                  border border-[#222222]
                  hover:bg-[#181818] hover:border-[#333333]
                  transition-all duration-200 relative"
                  >
                    {/* Design Info */}
                    <a href="/about" className="flex items-center gap-3 mb-3">
                      <div>
                        <span className="text-white text-sm block">
                          {creation.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {creation.date}
                        </span>
                      </div>
                    </a>
                    <img
                      src={creation.image}
                      alt={creation.name}
                      className="w-full h-64 object-cover border border-[#222222] rounded-lg"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#111111] border border-[#222222] rounded-xl p-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-white font-medium">
                            {review.author}
                          </div>
                          <p className="text-sm text-gray-400">
                            For {review.modelName}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          <span className="text-sm text-gray-400">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

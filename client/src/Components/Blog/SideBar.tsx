const categories = [
  "Career Advice",
  "Remote Work",
  "Industry Insights",
  "Career Growth",
  "Job Market",
  "Upskilling",
  "Work Culture",
  "Freelancing",
  "Tech Trends",
];

const recentPosts = [
  "Top 10 Tips to Ace Your Next Job Interview",
  "Highest Paying Tech Jobs in 2025",
  "Best Online Courses to Learn Full Stack Development",
  "Is Freelancing the Future of Work?",
];

const Sidebar = () => {
  return (
    <aside className=" w-full p-4 space-y-6">
      {/* Categories  lg:w-1/4  */}
      <div className="bg-mine-shaft-900 shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">📂 Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat, i) => (
            <li
              key={i}
              className=" hover:text-bright-sun-600 cursor-pointer transition"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-mine-shaft-900 shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">📰 Recent Posts</h2>
        <ul className="space-y-2">
          {recentPosts.map((post, i) => (
            <li
              key={i}
              className=" hover:text-bright-sun-600 cursor-pointer transition text-sm"
            >
              {post}
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-bright-sun-500 to-bright-sun-600 rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-semibold mb-2">📩 Subscribe</h2>
        <p className="text-sm mb-3">
          Get the latest job tips and career news delivered to your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-3 rounded-lg text-black"
        />
        <button className="w-full bg-mine-shaft-900 text-bright-sun-600 font-semibold py-2 rounded-lg hover:bg-mine-shaft-500 transition">
          Subscribe
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import { blogData } from "../../Data/BlogData";

const Sidebar = () => {
  return (
    <aside className=" w-full p-4 space-y-6">
      {/* Categories  lg:w-1/4  */}
      <div className="bg-mine-shaft-900 shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">📂 Categories</h2>
        <ul className="space-y-2">
          {blogData.map((cat, i) => (
            <li
              key={i}
              className=" hover:text-bright-sun-600 cursor-pointer transition"
            >
              {cat.category}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-mine-shaft-900 shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">📰 Recent Posts</h2>
        <ul className="space-y-2">
          {blogData.map((post, i) => i < 4 && (
            <li
              key={i}
              className=" hover:text-bright-sun-600 cursor-pointer transition text-sm"
            >
              {post.title}
              <span onClick={() => {window.location.href=`/blogs/${post.id}`}}></span>
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
        <button className="w-full bg-mine-shaft-900 text-bright-sun-600 font-semibold py-2 rounded-lg hover:bg-white transition">
          Subscribe
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

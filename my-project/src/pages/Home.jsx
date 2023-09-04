import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPosts, setEditPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getPosts();
  }, [posts]);
  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blog");
    const data = await response.json();
    setPosts(data.blogs);
  };

  const deletePosts = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      toast.success("Blog deleted successfully");
    } else {
      toast.error("Somthing went wrong");
    }
  };
  const updatePost = async (id) => {
    console.log(title, description, id);
    const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (response.status === 200) {
      toast.success("Blog updated successfully");
    } else {
      toast.error("Somthing went wrong");
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="my-10 flex flex-col gap-3">
        {posts.map((post) => {
          return (
            <div
              className="w-[40vw] border-2 mx-auto p-3 rounded-md shadow-md"
              key={post._id}
            >
              <div className="flex justify-end text-lg gap-2 mb-3">
                <AiOutlineDelete
                  className={`${
                    selectedPost === post._id && editPosts
                      ? "text-red-400 scale-110"
                      : "text-gray-400"
                  } text-gray-400  hover:text-red-400 cursor-pointer hover:scale-110 transition-all`}
                  onClick={() => deletePosts(post._id)}
                />
                <HiOutlinePencilAlt
                  className="text-gray-400  hover:text-red-400  cursor-pointer hover:scale-110 transition-all"
                  onClick={() => {
                    setEditPosts(!editPosts);
                    setSelectedPost(post._id);
                  }}
                />
              </div>
              <h2
                className="text-lg font-bold mb-2 outline-none focus:bg-gray-200"
                contentEditable={editPosts}
                onInput={(e) => setTitle(e.target.innerText)}
              >
                {post.title}
              </h2>
              <h3
                className="text-gray-500 font-semibold selection:bg-blue-200 outline-none focus:bg-gray-100"
                contentEditable={editPosts}
                onInput={(e) => setDescription(e.target.innerText)}
              >
                {post.description}
              </h3>
              <button
                className={`${
                  selectedPost === post._id && editPosts ? "block" : "hidden"
                }  bg-purple-400 hover:bg-purple-600 px-3 py-1 my-1 rounded-md font-bold text-white`}
                onClick={() => updatePost(post._id)}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Home;

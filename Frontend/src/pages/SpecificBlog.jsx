import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SpecificBlog = () => {

  const { id } = useParams();
  const location = useLocation();
  const data = location.state || {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    pera: "",
    img: "",
  });

  useEffect(() => {
    setFormData({
      title: data.title,
      pera: data.pera,
      img: data.img,
    });
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    if (formData.img == "" || formData.title == "" || formData.pera == "") {
      toast.error("All Fields are mendatory");
    } else {
      axios
        .patch(`https://test-repo-taupe-seven.vercel.app/api/v1/blog/${id}`, formData)
        .then((res) => {
          if (res.data.succes == true) {
            console.log(res.data);
            toast.success("UPdated SuccessFully");
            navigate(-1);
          } else {
            console.log(res);
            toast.error("Something went wrong Try again later");
          }
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
          console.log(err);
        });
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "First_time_using_clodinary");
    data.append("cloud_name", " dvpzwwrcd");
    axios
      .post("https://api.cloudinary.com/v1_1/dvpzwwrcd/image/upload", data)
      .then((res) => {
        // setUrl(res.data.url);
        setFormData({ ...formData, img: res.data.url });
      })
      .catch((err) => {
        toast.error("Something Went Wrong While Uploading Image");
        console.log(err);
      });
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-9/10 md:w-4/5 max-w-[500px] flex flex-col gap-6 p-2 border rounded-2xl"
      >
        <h1 className="text-2xl font-bold">Update Blog with id: {data._id}</h1>
        <div className="flex flex-col">
          <h1>Change Title :</h1>
          <input
            type="text"
            className="border p-2 rounded-md"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col">
          <h1>Change Blog Data:</h1>
          <textarea
            type="text"
            className="border p-2 rounded-md h-[300px] resize-none"
            placeholder="Enter Title ..."
            value={formData.pera}
            onChange={(e) => {
              setFormData({ ...formData, pera: e.target.value });
            }}
          />
        </div>
        <div>
          {formData.img != "" ? (
            <img
              src={formData.img}
              alt={"old image"}
              className="w-[50px] h-[50px]"
            />
          ) : null}
          <h1>Change Image:</h1>
          <input
            type="file"
            className="border w-fit rounded-sm"
            onChange={handleImageUpload}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-2xl border bg-black text-white cursor-pointer hover:scale-95 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default SpecificBlog;

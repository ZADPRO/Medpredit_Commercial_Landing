import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { decryptAPIResponse } from "../../utils";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import decrypt from "../07-Subscription/helper";

interface BlogArray {
  blogTitle: string;
  blogContent: string;
  blogImage: string;
  refBlogId: string;
}

interface FormErrors {
  blogTitle: string;
  blogContent: string;
  blogImage?: string;
}

const BlogPage: React.FC = () => {
  const [inputs, setInputs] = useState<{
    blogTitle: string;
    blogContent: string;
    blogImage: string;
  }>({
    blogTitle: "",
    blogContent: "",
    blogImage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    blogTitle: "",
    blogContent: "",
    blogImage: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useRef<Toast>(null);

  const [_profileImage, setProfileImage] = useState("");

  const [blogs, setBlogs] = useState<BlogArray[]>([]);

  const [_editBlogd, setEditBlogId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      blogTitle: "",
      blogContent: "",
      // blogImage: "",
    };

    let isValid = true;

    // Validate blog title
    if (!inputs.blogTitle.trim()) {
      newErrors.blogTitle = "Blog title is required";
      isValid = false;
    }

    // Validate blog content
    if (!inputs.blogContent.trim()) {
      newErrors.blogContent = "Blog content is required";
      isValid = false;
    }

    // Validate blog image
    // if (!profileImage && !file) {
    //   newErrors.blogImage = "Blog image is required";
    //   isValid = false;
    // }

    setErrors(newErrors);

    // Show warning toast if validation fails
    if (!isValid) {
      toast.current?.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please fill all required fields",
        life: 3000,
      });
    }

    return isValid;
  };

  // const uploadImage = async () => {
  //   if (!file) return;

  //   try {
  //     const response = await axios.post(
  //       import.meta.env.VITE_API_URL + "/WebsiteRoutes/blogImage",
  //       {
  //         fileName: file.name,
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     const data = decryptAPIResponse(
  //       response.data[1],
  //       response.data[0],
  //       import.meta.env.VITE_ENCRYPTION_KEY
  //     );

  //     localStorage.setItem("token", "Bearer " + data.token);

  //     if (data.status === true) {
  //       const uploadImage = await axios.put(data.uploadUrl, file, {
  //         headers: {
  //           "Content-Type": file?.type,
  //         },
  //       });

  //       if (uploadImage.status) {
  //         setProfileImage(data.fileName);
  //         return data.fileName;
  //       } else {
  //         throw new Error("Error in uploading the Image");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("error in uploading Image", error);
  //     throw error;
  //   }
  // };

  const Addblogs = async () => {
    // Prevent multiple submissions
    if (isSubmitting) return;

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image first if file is selected
      // let imagePath = profileImage;
      // if (file && !profileImage) {
      //   imagePath = await uploadImage();
      // }

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/uploadBlog",
        {
          blogTitle: inputs.blogTitle,
          blogContent: inputs.blogContent,
          // filePath: imagePath,
          filePath: null,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log("data---------->employeedta", data);
      if (data.status === true) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Blog added successfully!",
          life: 3000,
        });
        fetchBlogs();

        // Reset form
        setInputs({
          blogTitle: "",
          blogContent: "",
          blogImage: "",
        });
        setProfileImage("");
        setFile(null);
        setErrors({
          blogTitle: "",
          blogContent: "",
          blogImage: "",
        });
      }
    } catch (e) {
      console.log("Error adding blog:", e);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add blog. Please try again.",
        life: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchBlogs = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listBlogs", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const resData = response.data;

        if (!resData || !resData[0] || !resData[1]) {
          console.error("Invalid blog response:", resData);
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Invalid response from server while fetching blogs.",
            life: 3000,
          });
          return;
        }

        const data = decrypt(
          resData[1],
          resData[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log("Before setBlogs------------>", data);

        if (data.status === true) {
          localStorage.setItem("token", "Bearer " + data.token);
          console.log("After setBlogs  --------->", data.image);
          setBlogs(data.image);
        }
      })
      .catch((e) => {
        console.log("Error fetching Blogs:", e);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Modified file selection handler - only sets the file, doesn't upload
  const handleFileSelect = (event: any) => {
    const selectedFile = event.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);

      // Clear image error when file is selected
      if (errors.blogImage) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          blogImage: "",
        }));
      }

      toast.current?.show({
        severity: "info",
        summary: "File Selected",
        detail: `Selected: ${selectedFile.name}`,
        life: 3000,
      });
    }
  };

  const actionDeleteBlogs = (rowData: any) => {
    console.log("data--------->", rowData.blogId);

    return (
      <Button
        icon="pi pi-trash"
        severity="danger"
        onClick={() => deleteBlogs(rowData.blogId)}
      />
    );
  };

  // delete
  const deleteBlogs = async (id: any) => {
    console.log("deleteBlogs called with id:", id);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/deleteBlog",
        {
          blogId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("API Response:", data);

      if (data.status === true) {
        localStorage.setItem("token", "Bearer " + data.token);

        toast.current?.show({
          severity: "error",
          summary: "Success",
          detail: "Blog deleted successfully",
          life: 3000,
        });
        fetchBlogs();
      } else {
        console.error("API update failed:", data);
      }
    } catch (e) {
      console.error("Error deleting blog:", e);
      setEditBlogId(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Addblogs();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Prevent form submission on Enter key
    if (e.key === "Enter" && e.target !== e.currentTarget) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">Blog Management</h1>

        <Toast ref={toast} />
        <TabView activeIndex={0}>
          <TabPanel header="Add Blogs">
            <div className="w-full px-4">
              <form
                onSubmit={handleFormSubmit}
                onKeyPress={handleKeyPress}
                className="w-full max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Blog Title */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="blogTitle" className="font-semibold">
                      Blog Title <span className="text-[#e02929]">*</span>
                    </label>
                    <InputText
                      name="blogTitle"
                      value={inputs.blogTitle}
                      onChange={handleInput}
                      placeholder="Enter Title"
                      className={`p-inputtext-sm w-full ${
                        errors.blogTitle ? "p-invalid" : ""
                      }`}
                      required
                    />
                    {errors.blogTitle && (
                      <small className="text-[#e02929]">
                        {errors.blogTitle}
                      </small>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="blogContent" className="font-semibold">
                      Blog Content <span className="text-[#e02929]">*</span>
                    </label>
                    <Editor
                      value={inputs.blogContent || ""}
                      onTextChange={(e: EditorTextChangeEvent) => {
                        const content = e.htmlValue || "";
                        setInputs({ ...inputs, blogContent: content });

                        // Clear error when user starts typing
                        if (errors.blogContent && content.trim()) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            blogContent: "",
                          }));
                        }
                      }}
                      style={{ height: "320px", width: "100%" }}
                      placeholder="Enter Blog Content"
                      className={errors.blogContent ? "p-invalid" : ""}
                    />
                    {errors.blogContent && (
                      <small className="text-[#e02929]">
                        {errors.blogContent}
                      </small>
                    )}
                  </div>

                  {/* Blog Image Upload */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="blogImage" className="font-semibold">
                      Blog Image <span className="text-[#e02929]">*</span>
                    </label>
                    <h2 className="text-sm text-gray-600">Choose Blog Image</h2>
                    <FileUpload
                      name="logo"
                      mode="basic"
                      auto={false}
                      customUpload={false}
                      className={`mt-2 ${errors.blogImage ? "p-invalid" : ""}`}
                      onSelect={handleFileSelect}
                      accept="image/*"
                      maxFileSize={10000000}
                      chooseLabel="Choose Image"
                    />
                    {file && (
                      <div className="mt-2 p-2 bg-gray-50 rounded border">
                        <p className="text-sm text-gray-700">
                          Selected: <strong>{file.name}</strong>
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                    )}
                    {errors.blogImage && (
                      <small className="text-[#e02929]">
                        {errors.blogImage}
                      </small>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                  <Button
                    type="submit"
                    label={isSubmitting ? "Submitting..." : "Submit"}
                    className="px-6 py-2"
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel header="View Blogs">
            <DataTable
              value={blogs}
              tableStyle={{ minWidth: "50rem" }}
              paginator
              scrollable
              scrollHeight="500px"
              rows={5}
            >
              <Column
                headerStyle={{ width: "4rem" }}
                body={(_, options) => options.rowIndex + 1}
                header={"S.No"}
              />

              <Column
                headerStyle={{ width: "15rem" }}
                field="blogTitle"
                header={"Blog Title"}
              />
              <Column
                headerStyle={{ width: "100rem" }}
                field="blogContent"
                header="Blog Content"
                body={(blog) => (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: blog.blogContent,
                    }}
                  />
                )}
              />

              <Column
                headerStyle={{ width: "15rem" }}
                body={actionDeleteBlogs}
                header={"Delete"}
              />
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default BlogPage;

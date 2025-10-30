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
import { Sidebar } from "primereact/sidebar";
import decrypt from "../07-Subscription/helper";

interface BlogArray {
  blogTitle: string;
  blogContent: string;
  blogImage: string;
  refBlogId: string;
  blogId: number;
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
  const [profileImage, setProfileImage] = useState("");
  const [blogs, setBlogs] = useState<BlogArray[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const editorRef = useRef<any>(null);

  // Edit sidebar states
  const [editSidebarVisible, setEditSidebarVisible] = useState(false);
  const [editBlogId, setEditBlogId] = useState<number | null>(null);
  const [editInputs, setEditInputs] = useState<{
    blogTitle: string;
    blogContent: string;
    blogImage: string;
  }>({
    blogTitle: "",
    blogContent: "",
    blogImage: "",
  });
  const [editErrors, setEditErrors] = useState<FormErrors>({
    blogTitle: "",
    blogContent: "",
    blogImage: "",
  });
  const [editProfileImage, setEditProfileImage] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  const fileUploadRef = useRef<any>(null);
  const editFileUploadRef = useRef<any>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editErrors[name as keyof FormErrors]) {
      setEditErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      blogTitle: "",
      blogContent: "",
    };

    let isValid = true;

    if (!inputs.blogTitle.trim()) {
      newErrors.blogTitle = "Blog title is required";
      isValid = false;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = inputs.blogContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    if (!textContent.trim()) {
      newErrors.blogContent = "Blog content is required";
      isValid = false;
    }

    if (!profileImage && !file) {
      newErrors.blogImage = "Blog image is required";
      isValid = false;
    }

    setErrors(newErrors);

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

  const validateEditForm = (): boolean => {
    const newErrors: FormErrors = {
      blogTitle: "",
      blogContent: "",
    };

    let isValid = true;

    if (!editInputs.blogTitle.trim()) {
      newErrors.blogTitle = "Blog title is required";
      isValid = false;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editInputs.blogContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    if (!textContent.trim()) {
      newErrors.blogContent = "Blog content is required";
      isValid = false;
    }

    setEditErrors(newErrors);

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

  const uploadImage = async () => {
    if (!file) return null;

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/blogImage",
        {
          fileName: file.name,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      localStorage.setItem("token", "Bearer " + data.token);

      if (data.status === true) {
        const uploadImage = await axios.put(data.uploadUrl, file, {
          headers: {
            "Content-Type": file?.type,
          },
        });

        if (uploadImage.status === 200) {
          const imagePath = data.fileName;
          setProfileImage(imagePath);
          console.log("Image uploaded successfully:", imagePath);
          return imagePath;
        } else {
          throw new Error("Error in uploading the Image");
        }
      }
    } catch (error) {
      console.error("error in uploading Image", error);
      toast.current?.show({
        severity: "error",
        summary: "Upload Error",
        detail: "Failed to upload image",
        life: 3000,
      });
      throw error;
    }
  };

  const uploadEditImage = async () => {
    if (!editFile) return null;

    try {
      console.log("Starting edit image upload for:", editFile.name);

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/blogImage",
        {
          fileName: editFile.name,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      localStorage.setItem("token", "Bearer " + data.token);

      console.log("=============>", data)

      if (data.status === true) {
        const uploadImage = await axios.put(data.uploadUrl, editFile, {
          headers: {
            "Content-Type": editFile?.type,
          },
        });

        if (uploadImage.status === 200) {
          const imagePath = data.fileName;
          console.log("Edit image uploaded successfully:", imagePath);
          return imagePath;
        } else {
          throw new Error("Error in uploading the Image");
        }
      }
      return null;
    } catch (error) {
      console.error("error in uploading edit Image", error);
      toast.current?.show({
        severity: "error",
        summary: "Upload Error",
        detail: "Failed to upload image",
        life: 3000,
      });
      return null;
    }
  };

  const Addblogs = async () => {
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let imagePath = profileImage;
      if (file && !profileImage) {
        imagePath = await uploadImage();
      }

      if (!imagePath) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Image upload failed",
          life: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/uploadBlog",
        {
          blogTitle: inputs.blogTitle,
          blogContent: inputs.blogContent,
          filePath: imagePath,
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
      console.log("--------------blog data---------------------------data")

      if (data.status === true) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Blog added successfully!",
          life: 3000,
        });
        fetchBlogs();

        setInputs({
          blogTitle: "",
          blogContent: "",
          blogImage: "",
        });
        setProfileImage("");
        setFile(null);
        if (fileUploadRef.current) {
          fileUploadRef.current.clear();
        }
        setErrors({
          blogTitle: "",
          blogContent: "",
          blogImage: "",
        });
      }
    } catch (e) {
      console.error("Error adding blog:", e);
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

  const fetchBlogDetails = async (blogId: number) => {
    try {
      const blogDetails = blogs.find((blog) => blog.blogId === blogId);

      console.log("Fetching blog details for ID:", blogId);
      console.log("Blog found:", blogDetails);

      if (blogDetails) {
        setEditInputs({
          blogTitle: blogDetails.blogTitle || "",
          blogContent: blogDetails.blogContent || "",
          blogImage: blogDetails.blogImage || "",
        });

        // FIXED: Set the full image URL
        const imagePath = blogDetails.blogImage || "";
        setEditProfileImage(imagePath);
        console.log("Setting edit profile image to:", imagePath);

        setEditErrors({
          blogTitle: "",
          blogContent: "",
          blogImage: "",
        });

        setEditFile(null);
        if (editFileUploadRef.current) {
          editFileUploadRef.current.clear();
        }
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Blog not found.",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch blog details.",
        life: 3000,
      });
    }
  };

  const updateBlog = async () => {
    if (isEditSubmitting) return;

    if (!validateEditForm()) {
      return;
    }

    setIsEditSubmitting(true);

    try {
      // FIXED: Use existing image from editInputs.blogImage, not editProfileImage
      let imagePath = editInputs.blogImage;

      console.log("Current edit blog image:", editInputs.blogImage);
      console.log("Edit file present:", !!editFile);

      // Only upload new image if a file was selected
      if (editFile) {
        console.log("Uploading new image...");
        const uploadedImagePath = await uploadEditImage();

        if (uploadedImagePath) {
          console.log("New image uploaded successfully:", uploadedImagePath);
          imagePath = uploadedImagePath;
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Upload Failed",
            detail: "Failed to upload new image",
            life: 3000,
          });
          setIsEditSubmitting(false);
          return;
        }
      }

      console.log("Updating blog with image path:", imagePath);
      console.log("Blog ID:", editBlogId);

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/updateBlog",
        {
          blogTitle: editInputs.blogTitle,
          blogContent: editInputs.blogContent,
          imagePath: imagePath,
          blogId: editBlogId,
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

      console.log("Update response:", data);

      if (data.status === true) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Blog updated successfully!",
          life: 3000,
        });

        await fetchBlogs();

        setEditSidebarVisible(false);

        // Reset edit form
        setEditInputs({
          blogTitle: "",
          blogContent: "",
          blogImage: "",
        });
        setEditProfileImage("");
        setEditFile(null);
        if (editFileUploadRef.current) {
          editFileUploadRef.current.clear();
        }
        setEditBlogId(null);
        setEditErrors({
          blogTitle: "",
          blogContent: "",
          blogImage: "",
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: data.message || "Failed to update blog",
          life: 3000,
        });
      }
    } catch (e) {
      console.error("Error updating blog:", e);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update blog. Please try again.",
        life: 3000,
      });
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/listBlogs",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

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

      if (data.status === true) {
        localStorage.setItem("token", "Bearer " + data.token);
        console.log("Fetched blogs:", data.image);
        setBlogs(data.image || []);
      }
    } catch (e) {
      console.error("Error fetching Blogs:", e);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch blogs",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFileSelect = (event: any) => {
    const selectedFile = event.files[0];
    if (selectedFile) {
      setFile(selectedFile);

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

  const handleEditFileSelect = (event: any) => {
    const selectedFile = event.files[0];
    console.log("Edit file selected:", selectedFile?.name);
    if (selectedFile) {
      setEditFile(selectedFile);

      if (editErrors.blogImage) {
        setEditErrors((prevErrors) => ({
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

  const deleteBlogs = async (id: any) => {
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

      if (data.status === true) {
        localStorage.setItem("token", "Bearer " + data.token);

        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Blog deleted successfully",
          life: 3000,
        });
        fetchBlogs();
      }
    } catch (e) {
      console.error("Error deleting blog:", e);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Addblogs();
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBlog();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target !== e.currentTarget) {
      e.preventDefault();
    }
  };

  const blogTitleBody = (rowData: any) => {
    return (
      <span
        className="underline text-[#0a5c9c] cursor-pointer"
        onClick={() => {
          setEditBlogId(rowData.blogId);
          setEditSidebarVisible(true);
          fetchBlogDetails(rowData.blogId);
        }}
      >
        {rowData.blogTitle}
      </span>
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">Blog Management</h1>

        <Toast ref={toast} />

        <style>{`
          .blog-content-preview h1 {
            font-size: 2em;
            font-weight: bold;
            margin: 0.67em 0;
            line-height: 1.2;
          }
          .blog-content-preview h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin: 0.75em 0;
            line-height: 1.3;
          }
          .blog-content-preview h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin: 0.83em 0;
            line-height: 1.4;
          }
          .blog-content-preview h4 {
            font-size: 1em;
            font-weight: bold;
            margin: 1em 0;
          }
          .blog-content-preview h5 {
            font-size: 0.83em;
            font-weight: bold;
            margin: 1.17em 0;
          }
          .blog-content-preview h6 {
            font-size: 0.67em;
            font-weight: bold;
            margin: 1.33em 0;
          }
          .blog-content-preview p {
            margin: 1em 0;
            line-height: 1.6;
          }
          .blog-content-preview ul, .blog-content-preview ol {
            margin: 1em 0;
            padding-left: 2em;
            line-height: 1.6;
            list-style-position: outside;
          }
          .blog-content-preview ul {
            list-style-type: disc;
          }
          .blog-content-preview ol {
            list-style-type: decimal;
          }
          .blog-content-preview ul ul {
            list-style-type: circle;
          }
          .blog-content-preview ul ul ul {
            list-style-type: square;
          }
          .blog-content-preview li {
            margin: 0.5em 0;
            display: list-item;
          }
          .blog-content-preview a {
            color: #0066cc;
            text-decoration: underline;
          }
          .blog-content-preview strong {
            font-weight: bold;
          }
          .blog-content-preview em {
            font-style: italic;
          }
          .blog-content-preview blockquote {
            border-left: 4px solid #ccc;
            padding-left: 1em;
            margin: 1em 0;
            color: #666;
          }
          .blog-content-preview img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
          }
          
          .p-editor-container .ql-editor {
            min-height: 300px;
          }
          .p-editor-toolbar {
            background: #f8f9fa !important;
            border-bottom: 1px solid #dee2e6 !important;
          }
        `}</style>

        <TabView activeIndex={0}>
          <TabPanel header="Add Blogs">
            <div className="w-full px-4">
              <form
                onSubmit={handleFormSubmit}
                onKeyPress={handleKeyPress}
                className="w-full max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="blogTitle" className="font-semibold">
                      Blog Title <span className="text-[#e02929]">*</span>
                    </label>
                    <InputText
                      name="blogTitle"
                      value={inputs.blogTitle}
                      onChange={handleInput}
                      placeholder="Enter Title"
                      className={`p-inputtext-sm w-full ${errors.blogTitle ? "p-invalid" : ""
                        }`}
                      required
                    />
                    {errors.blogTitle && (
                      <small className="text-[#e02929]">
                        {errors.blogTitle}
                      </small>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="blogContent" className="font-semibold">
                      Blog Content <span className="text-[#e02929]">*</span>
                    </label>
                    <Editor
                      ref={editorRef}
                      value={inputs.blogContent || ""}
                      onTextChange={(e: EditorTextChangeEvent) => {
                        const content = e.htmlValue || "";
                        setInputs({ ...inputs, blogContent: content });

                        if (errors.blogContent && content.trim()) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            blogContent: "",
                          }));
                        }
                      }}
                      style={{ height: "400px", width: "100%" }}
                      placeholder="Enter Blog Content"
                      className={errors.blogContent ? "p-invalid" : ""}
                    />
                    {errors.blogContent && (
                      <small className="text-[#e02929]">
                        {errors.blogContent}
                      </small>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="blogImage" className="font-semibold">
                      Blog Image <span className="text-[#e02929]">*</span>
                    </label>
                    <h2 className="text-sm text-gray-600">Choose Blog Image</h2>
                    <FileUpload
                      ref={fileUploadRef}
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
                body={blogTitleBody}
              />
              <Column
                headerStyle={{ width: "100rem" }}
                field="blogContent"
                header="Blog Content"
                body={(blog) => (
                  <div
                    className="blog-content-preview"
                    dangerouslySetInnerHTML={{
                      __html: blog.blogContent,
                    }}
                    style={{
                      maxHeight: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  />
                )}
              />

              <Column
                headerStyle={{ width: "10rem" }}
                header={"Actions"}
                body={(rowData) => (
                  <div className="flex gap-2">
                    <Button
                      icon="pi pi-pencil"
                      severity="info"
                      size="small"
                      onClick={() => {
                        setEditBlogId(rowData.blogId);
                        setEditSidebarVisible(true);
                        fetchBlogDetails(rowData.blogId);
                      }}
                      tooltip="Edit"
                    />
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      size="small"
                      onClick={() => deleteBlogs(rowData.blogId)}
                      tooltip="Delete"
                    />
                  </div>
                )}
              />
            </DataTable>
          </TabPanel>
        </TabView>

        {/* Edit Sidebar */}
        <Sidebar
          visible={editSidebarVisible}
          style={{ width: "60%" }}
          onHide={() => {
            setEditSidebarVisible(false);
            setEditInputs({
              blogTitle: "",
              blogContent: "",
              blogImage: "",
            });
            setEditProfileImage("");
            setEditFile(null);
            if (editFileUploadRef.current) {
              editFileUploadRef.current.clear();
            }
            setEditBlogId(null);
          }}
          position="right"
        >
          <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
          <div className="w-full px-4">
            <form
              onSubmit={handleEditFormSubmit}
              onKeyPress={handleKeyPress}
              className="w-full bg-white p-6 md:p-8 rounded-xl shadow-md"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="blogTitle" className="font-semibold">
                    Blog Title <span className="text-[#e02929]">*</span>
                  </label>
                  <InputText
                    name="blogTitle"
                    value={editInputs.blogTitle}
                    onChange={handleEditInput}
                    placeholder="Enter Title"
                    className={`p-inputtext-sm w-full ${editErrors.blogTitle ? "p-invalid" : ""
                      }`}
                    required
                  />
                  {editErrors.blogTitle && (
                    <small className="text-[#e02929]">
                      {editErrors.blogTitle}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="blogContent" className="font-semibold">
                    Blog Content <span className="text-[#e02929]">*</span>
                  </label>
                  <Editor
                    value={editInputs.blogContent || ""}
                    onTextChange={(e: EditorTextChangeEvent) => {
                      const content = e.htmlValue || "";
                      setEditInputs({ ...editInputs, blogContent: content });

                      if (editErrors.blogContent && content.trim()) {
                        setEditErrors((prevErrors) => ({
                          ...prevErrors,
                          blogContent: "",
                        }));
                      }
                    }}
                    style={{ height: "400px", width: "100%" }}
                    placeholder="Enter Blog Content"
                    className={editErrors.blogContent ? "p-invalid" : ""}
                  />
                  {editErrors.blogContent && (
                    <small className="text-[#e02929]">
                      {editErrors.blogContent}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="blogImage" className="font-semibold">
                    Blog Image
                  </label>

                  {editInputs.blogImage && (
                    <div className="mt-2 mb-3">
                      <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                      <img
                        src={editInputs.blogImage}
                        alt="Current blog"
                        className="max-w-xs h-auto rounded border border-gray-300"
                        style={{ maxHeight: '200px' }}
                        onError={(e) => {
                          console.error("Error loading image:", editInputs.blogImage);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <h2 className="text-sm text-gray-600">
                    {editInputs.blogImage ? "Upload New Image (Optional)" : "No image uploaded yet"}
                  </h2>
                  <FileUpload
                    ref={editFileUploadRef}
                    name="logo"
                    mode="basic"
                    auto={false}
                    customUpload={false}
                    className="mt-2"
                    onSelect={handleEditFileSelect}
                    accept="image/*"
                    maxFileSize={10000000}
                    chooseLabel={editInputs.blogImage ? "Change Image" : "Choose Image"}
                  />
                  {editFile && (
                    <div className="mt-2 p-2 bg-gray-50 rounded border">
                      <p className="text-sm text-gray-700">
                        New image selected: <strong>{editFile.name}</strong>
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {Math.round(editFile.size / 1024)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-8 gap-4">
                <Button
                  type="button"
                  label="Cancel"
                  className="px-6 py-2"
                  severity="secondary"
                  onClick={() => setEditSidebarVisible(false)}
                />
                <Button
                  type="submit"
                  label={isEditSubmitting ? "Updating..." : "Update Blog"}
                  className="px-6 py-2"
                  disabled={isEditSubmitting}
                />
              </div>
            </form>
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default BlogPage;
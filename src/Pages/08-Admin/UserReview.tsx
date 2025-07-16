import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
import { decryptAPIResponse } from "../../utils";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import { FileUpload } from "primereact/fileupload";
// import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";

const UserReview: React.FC = () => {
  const toast = useRef<Toast>(null);

  const [_editBlogId, setEditBlogId] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [feedbackData, setFeedbackData] = useState({
    userName: "",
    useremail: "",
    reviewContent: "",
    ratings: "",
  });

  const [status, setStatus] = useState<{
    reviewId: string;
    newstatus: string;
  }>({
    reviewId: "",
    newstatus: "",
  });
  console.log("status.reviewId--------->34", status.reviewId);
  console.log("status.newstatus-------->35", status.newstatus);

  const handleStatusToggle = (rowData: any) => {
    console.log("🔄 Toggle triggered for:", rowData);
    console.log("Current refViewStatus:", rowData.refViewStatus);

    // Toggle between "Show" and "Null"
    const newStatus = rowData.refViewStatus === "Show" ? "" : "Show";

    console.log("New status will be:", newStatus);
    console.log("Review ID:", rowData.reviewId);

    // Validate that we have the required data
    if (!rowData.reviewId) {
      console.log("❌ Missing reviewId in rowData:", rowData);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Review ID is missing",
        life: 3000,
      });
      return;
    }

    // Call UpdateReview directly with the data instead of relying on state
    UpdateReviewDirect(rowData.reviewId, newStatus);
  };

  const UpdateReviewDirect = async (reviewId: string, newStatus: string) => {
    const token = localStorage.getItem("token");

    console.log("✅ Sending payload directly:", {
      reviewId: reviewId,
      newstatus: newStatus,
    });

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/updateViewStatus",
        {
          reviewId: reviewId,
          newstatus: newStatus,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Raw API Response:", response.data);

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log("Decrypted data:", data);

      if (data.status === true) {
        // Update the state for UI consistency
        setStatus({
          reviewId: reviewId,
          newstatus: newStatus,
        });

        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Review status updated successfully!",
          life: 3000,
        });
        fetchUserReview();
      } else {
        console.log("❌ API returned false status:", data);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: data.message || "Failed to update review status",
          life: 3000,
        });
      }
    } catch (e) {
      console.log("❌ Error updating review:", e);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update review. Please try again.",
        life: 3000,
      });
    }
  };
  // Action body function for the Enable/Disable column - Updated for "Show"/"Null"
  const actionToggleStatus = (rowData: any) => {
    console.log("rowData--->", rowData);

    const isVisible = rowData.refViewStatus === "Show";

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Button
          icon={isVisible ? "pi pi-eye" : "pi pi-eye-slash"}
          className={`p-button-rounded p-button-text ${
            isVisible ? "p-button-success" : "p-button-secondary"
          }`}
          tooltip={isVisible ? "Hide Review" : "Show Review"}
          tooltipOptions={{ position: "top" }}
          onClick={() => handleStatusToggle(rowData)}
          style={{
            color: isVisible ? "#10B981" : "#6B7280",
            fontSize: "1.2rem",
          }}
        />
        <span
          style={{
            fontSize: "0.875rem",
            color: isVisible ? "#10B981" : "#6B7280",
            fontWeight: "500",
          }}
        >
          {isVisible ? "Visible" : "Hidden"}
        </span>
      </div>
    );
  };

  const fetchUserReview = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listReviews", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = decryptAPIResponse(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data setUserReviews------------>", data);

        if (data.status === true) {
          localStorage.setItem("token", "Bearer " + data.token);
          console.log("setUserReviews  --------->", data);
          setUserReviews(data.result);
        }
      })
      .catch((e) => {
        console.log("Error fetching Blogs:", e);
      });
  };
  useEffect(() => {
    fetchUserReview();
  }, []);

  const actionDeleteBlogs = (rowData: any) => {
    console.log(rowData.reviewId);

    return (
      <Button
        icon="pi pi-trash"
        severity="danger"
        onClick={() => deleteBlogs(rowData.reviewId)}
      />
    );
  };

  //delete
  const deleteBlogs = async (id: any) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/deleteReviews",
        {
          reviewId: id,
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
          detail: "Deleted Successfully",
          life: 3000,
        });
        fetchUserReview();
      } else {
        console.error("API update failed:", data);
      }
    } catch (e) {
      console.error("Error updating package:", e);

      setEditBlogId(null);
    }
  };

  const handleFeedbackSubmit = async () => {
    console.log("Feedback Data:", feedbackData);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/userReviews",
        {
          userName: feedbackData.userName,
          useremail: feedbackData.useremail,
          reviewContent: feedbackData.reviewContent,
          ratings: parseInt(feedbackData.ratings),
        }
      );

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("Feedback Response:", data);

      if (data.status === true) {
        setFeedbackData({
          userName: "",
          useremail: "",
          reviewContent: "",
          ratings: "",
        });
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Feedback submitted successfully",
          life: 3000,
        });
        fetchUserReview();
      } else {
        console.error("Feedback submission failed: Server returned error");
      }
    } catch (error) {
      console.error("Feedback submission failed", error);
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">User Review</h1>

        <Toast ref={toast} />
        <Toast ref={toast} />
        <TabView activeIndex={0}>
          <TabPanel header="Add Review">
            <div className="w-full px-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFeedbackSubmit();
                }}
                className="p-8 space-y-4"
              >
                <Toast ref={toast} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="userName"
                      className="mb-1 text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="userName"
                      type="text"
                      placeholder="Name"
                      name="userName"
                      required
                      value={feedbackData.userName}
                      onChange={(e) =>
                        setFeedbackData({
                          ...feedbackData,
                          userName: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-transparent border border-gray-600 text-[#000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="useremail"
                      className="mb-1 text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="useremail"
                      type="email"
                      placeholder="Email"
                      name="useremail"
                      required
                      value={feedbackData.useremail}
                      onChange={(e) =>
                        setFeedbackData({
                          ...feedbackData,
                          useremail: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-transparent border border-gray-600 text-[#000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="ratings"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <div className="flex items-center">
                    <Rating
                      id="ratings"
                      required
                      value={parseInt(feedbackData.ratings) || 0}
                      onChange={(e) =>
                        setFeedbackData({
                          ...feedbackData,
                          ratings: e.value?.toString() || "0",
                        })
                      }
                      cancel={false}
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="reviewContent"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="reviewContent"
                    placeholder="Your Message"
                    name="reviewContent"
                    value={feedbackData.reviewContent}
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        reviewContent: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full p-3 bg-transparent border border-gray-600 text-[#000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                  ></textarea>
                </div>

                <div className="flex justify-center mt-8">
                  <Button type="submit" label="Submit" className="px-6 py-2" />
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel header="View Reviews">
            <DataTable
              value={userReviews}
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
                field="userName"
                header={"User Name"}
              />
              <Column
                headerStyle={{ width: "15rem" }}
                field="useremail"
                header={"User Email"}
              />
              <Column
                headerStyle={{ width: "15rem" }}
                field="ratings"
                header={"Rating"}
              />
              <Column
                headerStyle={{ width: "100rem" }}
                field="reviewContent"
                header={"Review Content"}
              />
              <Column
                headerStyle={{ width: "15rem" }}
                body={actionToggleStatus}
                header={"Enable/Disable"}
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

export default UserReview;

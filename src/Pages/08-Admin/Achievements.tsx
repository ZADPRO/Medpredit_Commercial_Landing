import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { decryptAPIResponse } from "../../utils";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Achievements {
  achievementTitle: string;
  achievementDescription: string;
  achievedOn: string;
}

const Achievements: React.FC = () => {
  const [inputs, setInputs] = useState<{
    achievementTitle: string;
    achievementDescription: string;
    achievedOn: Nullable<Date>;
  }>({
    achievementTitle: "",
    achievementDescription: "",
    achievedOn: null,
  });

  const toast = useRef<Toast>(null);

  const [achievement, setAchievement] = useState<Achievements[]>([]);

  const [_editAchievementId, setEditAchievementId] = useState<number | null>(
    null
  );

  // Form validation state
  const [errors, setErrors] = useState<{
    achievementTitle: string;
    achievementDescription: string;
    achievedOn: string;
  }>({
    achievementTitle: "",
    achievementDescription: "",
    achievedOn: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleInputDate = (e: any) => {
    const selectedDate = e.value;

    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";

    setInputs((prev) => ({
      ...prev,
      achievedOn: formattedDate,
    }));

    // Clear error when user selects a date
    if (errors.achievedOn) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        achievedOn: "",
      }));
    }
  };

  const handleEditorChange = (e: EditorTextChangeEvent) => {
    setInputs({
      ...inputs,
      achievementDescription: e.htmlValue || "",
    });

    // Clear error when user starts typing in editor
    if (errors.achievementDescription) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        achievementDescription: "",
      }));
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors = {
      achievementTitle: "",
      achievementDescription: "",
      achievedOn: "",
    };

    let isValid = true;

    // Validate achievement title
    if (!inputs.achievementTitle.trim()) {
      newErrors.achievementTitle = "Achievement Title is required";
      isValid = false;
    }

    // Validate achievement description
    if (
      !inputs.achievementDescription.trim() ||
      inputs.achievementDescription.trim() === "<p></p>" ||
      inputs.achievementDescription.trim() === "<br>"
    ) {
      newErrors.achievementDescription = "Achievement Description is required";
      isValid = false;
    }

    // Validate achieved on date
    if (!inputs.achievedOn) {
      newErrors.achievedOn = "Achieved On date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const AddAchievements = async () => {
    // Validate form before submission
    if (!validateForm()) {
      toast.current?.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please fill in all required fields",
        life: 4000,
      });
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/addAchievement",
        {
          achievementTitle: inputs.achievementTitle,
          achievementDescription: inputs.achievementDescription,
          achievedOn: inputs.achievedOn,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      console.log("token line 126======", token);

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log("data---------->AddAchievements", data);
      if (data.status === true) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: " Added successfully!",
          life: 3000,
        });

        setInputs({
          achievementTitle: "",
          achievementDescription: "",
          achievedOn: null,
        });

        // Clear any validation errors
        setErrors({
          achievementTitle: "",
          achievementDescription: "",
          achievedOn: "",
        });

        // Refresh the achievements list
        fetchAchievements();
      }
    } catch (e) {
      console.log("Error adding achievements:", e);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add achievement. Please try again.",
        life: 4000,
      });
    }
  };

  const fetchAchievements = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listAchievement", {
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
        console.log("Before setAchievements------------>", data);

        if (data.status === true) {
          console.log("After setAchievements  --------->", data.result);
          setAchievement(data.result);
        }
      })
      .catch((e) => {
        console.log("Error fetching Achievements:", e);
      });
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const actionDeleteAchievements = (rowData: any) => {
    console.log("rowID---------->", rowData.achievementId);

    return (
      <Button
        icon="pi pi-trash"
        severity="danger"
        onClick={() => deleteAchievements(rowData.achievementId)}
      />
    );
  };

  //   delete
  const deleteAchievements = async (id: any) => {
    console.log("deleteAchievements called with id:", id);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/deleteAchivements",
        {
          achievementId: id,
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
        fetchAchievements();
        toast.current?.show({
          severity: "error",
          detail: "Deleted Successfully",
          life: 3000,
        });
      } else {
        console.error("API update failed:", data);
      }
    } catch (e) {
      console.error("Error updating package:", e);

      setEditAchievementId(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    AddAchievements();
  };

  // Handle key press to prevent Enter key submission
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target !== e.currentTarget) {
      // Allow Enter in Editor component, but prevent in other inputs
      if ((e.target as HTMLElement).closest(".ql-editor")) {
        return; // Allow Enter in rich text editor
      }
      e.preventDefault();
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">
          Achievements Management
        </h1>

        <Toast ref={toast} />
        <TabView activeIndex={0}>
          <TabPanel header="Add Achievements">
            <div className="w-full px-4">
              <form
                onSubmit={handleSubmit}
                onKeyPress={handleKeyPress}
                className="w-full max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Achievement Title - One Column */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="achievementTitle" className="font-semibold">
                      Achievement Title <span className="text-red-500">*</span>
                    </label>
                    <InputText
                      id="achievementTitle"
                      name="achievementTitle"
                      value={inputs.achievementTitle || ""}
                      onChange={handleInput}
                      placeholder="Enter Title"
                      className={`p-inputtext-sm w-full ${
                        errors.achievementTitle ? "p-invalid" : ""
                      }`}
                      required
                    />
                    {errors.achievementTitle && (
                      <small className="text-red-500">
                        {errors.achievementTitle}
                      </small>
                    )}
                  </div>

                  {/* Achieved On - Calendar - Same Row */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="achievedOn" className="font-semibold">
                      Achieved On <span className="text-red-500">*</span>
                    </label>
                    <Calendar
                      id="achievedOn"
                      name="achievedOn"
                      value={
                        inputs.achievedOn ? new Date(inputs.achievedOn) : null
                      }
                      onChange={handleInputDate}
                      placeholder="Select Achieved Date"
                      className={`p-inputtext-sm w-full ${
                        errors.achievedOn ? "p-invalid" : ""
                      }`}
                      showIcon
                      required
                    />
                    {errors.achievedOn && (
                      <small className="text-red-500">
                        {errors.achievedOn}
                      </small>
                    )}
                  </div>
                </div>

                {/* Achievement Content */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="achievementDescription"
                    className="font-semibold"
                  >
                    Achievement Content <span className="text-red-500">*</span>
                  </label>
                  <Editor
                    id="achievementDescription"
                    value={inputs.achievementDescription || ""}
                    onTextChange={handleEditorChange}
                    style={{ height: "320px", width: "100%" }}
                    placeholder="Enter Achievement Description"
                    className={errors.achievementDescription ? "p-invalid" : ""}
                    required
                  />
                  {errors.achievementDescription && (
                    <small className="text-red-500">
                      {errors.achievementDescription}
                    </small>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                  <Button type="submit" label="Submit" className="px-6 py-2" />
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel header="View Achievements">
            <DataTable
              value={achievement}
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
                field="achievementTitle"
                header={"Achievement Title"}
              />
              <Column
                headerStyle={{ width: "15rem" }}
                header="Achievement Description"
                body={(rowData) => (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: rowData.achievementDescription,
                    }}
                  />
                )}
              />

              <Column
                headerStyle={{ width: "15rem" }}
                field="achievedOn"
                header={"Achieved On"}
                body={(rowData) => {
                  return new Date(rowData.achievedOn).toLocaleDateString();
                }}
              />

              <Column
                headerStyle={{ width: "15rem" }}
                body={actionDeleteAchievements}
                header={"Delete"}
              />
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Achievements;

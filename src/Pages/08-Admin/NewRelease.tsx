import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
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
  version: string;
  notes: string;
  releaseDate: string;
  refStatus: string;
}

const NewRelease: React.FC = () => {
  const [inputs, setInputs] = useState<{
    version: string;
    notes: string;
    releaseDate: Nullable<Date>;
    refStatus: string;
  }>({
    version: "",
    notes: "",
    releaseDate: null,
    refStatus: "",
  });

  const toast = useRef<Toast>(null);

  const [newRelease, setNewRelease] = useState<Achievements[]>([]);

  const [_editNewReleaseId, setEditNewReleaseId] = useState<number | null>(
    null
  );

  // Status options for dropdown
  const statusOptions = [
    { label: "Latest", value: "Latest" },
    { label: "Stable", value: "Stable" },
    { label: "Previous", value: "Previous" },
    { label: "Archive", value: "Archive" },
  ];

  // Form validation state
  const [errors, setErrors] = useState<{
    version: string;
    notes: string;
    releaseDate: string;
    refStatus: string;
  }>({
    version: "",
    notes: "",
    releaseDate: "",
    refStatus: "",
  });

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Latest":
        return "bg-green-100 text-green-800 border-green-200";
      case "Stable":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Previous":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Archive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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

  const handleDropdownChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      refStatus: e.value,
    }));

    // Clear error when user selects a status
    if (errors.refStatus) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        refStatus: "",
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
      releaseDate: formattedDate,
    }));

    // Clear error when user selects a date
    if (errors.releaseDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        releaseDate: "",
      }));
    }
  };

  const handleEditorChange = (e: EditorTextChangeEvent) => {
    setInputs({
      ...inputs,
      notes: e.htmlValue || "",
    });

    // Clear error when user starts typing in editor
    if (errors.notes) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        notes: "",
      }));
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors = {
      version: "",
      notes: "",
      releaseDate: "",
      refStatus: "",
    };

    let isValid = true;

    // Validate version
    if (!inputs.version.trim()) {
      newErrors.version = "Version is required";
      isValid = false;
    }

    // Validate notes
    if (
      !inputs.notes.trim() ||
      inputs.notes.trim() === "<p></p>" ||
      inputs.notes.trim() === "<br>"
    ) {
      newErrors.notes = "Overview Notes are required";
      isValid = false;
    }

    // Validate release date
    if (!inputs.releaseDate) {
      newErrors.releaseDate = "Release Date is required";
      isValid = false;
    }

    // Validate status
    if (!inputs.refStatus) {
      newErrors.refStatus = "Status is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const AddNewRelease = async () => {
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
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/addRelease",
        {
          version: inputs.version,
          notes: inputs.notes,
          releaseDate: inputs.releaseDate,
          refStatus: inputs.refStatus,
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

      console.log("data---------->", data);
      if (data.status === true) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: " Added successfully!",
          life: 3000,
        });
        fetchNewRelease();

        setInputs({
          version: "",
          notes: "",
          releaseDate: null,
          refStatus: "",
        });

        // Clear any validation errors
        setErrors({
          version: "",
          notes: "",
          releaseDate: "",
          refStatus: "",
        });
      }
    } catch (e) {
      console.log("Error adding AddNewRelease:", e);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add new release. Please try again.",
        life: 4000,
      });
    }
  };

  const fetchNewRelease = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listRelease", {
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
          console.log("After setNewRelease  --------->", data.result);
          setNewRelease(data.result);
        }
      })
      .catch((e) => {
        console.log("Error fetching NewRelease:", e);
      });
  };

  useEffect(() => {
    fetchNewRelease();
  }, []);

  const actionDelete = (rowData: any) => {
    console.log("rowID---------->", rowData.releaseId);

    return (
      <Button
        icon="pi pi-trash"
        severity="danger"
        onClick={() => deleteNewRelease(rowData.releaseId)}
      />
    );
  };

  //   delete
  const deleteNewRelease = async (id: any) => {
    console.log("deleteNewRelease called with id:", id);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/deleteRelease",
        {
          releaseId: id,
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
        fetchNewRelease();
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

      setEditNewReleaseId(null);
    }
  };

  //update

  const handleStatusUpdate = async (rowData: any, newStatus: string) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/updateRelease",
        {
          releaseId: rowData.releaseId,
          refStatus: newStatus,
          version: rowData.version,
          notes: rowData.notes,
          releaseDate: rowData.releaseDate,
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
        toast.current?.show({
          severity: "success",
          summary: "Status Updated",
          detail: `Changed to ${newStatus}`,
          life: 3000,
        });
        fetchNewRelease(); // Refresh data after update
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Update Failed",
          detail: "Failed to update status",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.current?.show({
        severity: "error",
        summary: "API Error",
        detail: "Something went wrong. Try again.",
        life: 3000,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    AddNewRelease();
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
        <h1 className="text-2xl font-bold text-center mb-6">New Release</h1>

        <Toast ref={toast} />
        <TabView activeIndex={0}>
          <TabPanel header="Add New Release">
            <div className="w-full px-4">
              <form
                onSubmit={handleSubmit}
                onKeyPress={handleKeyPress}
                className="w-full max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Version */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="version" className="font-semibold">
                      Version <span className="text-red-500">*</span>
                    </label>
                    <InputText
                      id="version"
                      name="version"
                      value={inputs.version || ""}
                      onChange={handleInput}
                      placeholder="Enter Version"
                      className={`p-inputtext-sm w-full ${
                        errors.version ? "p-invalid" : ""
                      }`}
                      required
                    />
                    {errors.version && (
                      <small className="text-red-500">{errors.version}</small>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="refStatus" className="font-semibold">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      id="refStatus"
                      name="refStatus"
                      value={inputs.refStatus}
                      onChange={handleDropdownChange}
                      options={statusOptions}
                      placeholder="Select Status"
                      className={`p-inputtext-sm w-full ${
                        errors.refStatus ? "p-invalid" : ""
                      }`}
                      required
                    />
                    {errors.refStatus && (
                      <small className="text-red-500">{errors.refStatus}</small>
                    )}
                  </div>

                  {/* Release Date - Calendar */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="releaseDate" className="font-semibold">
                      Release Date <span className="text-red-500">*</span>
                    </label>
                    <Calendar
                      id="releaseDate"
                      name="releaseDate"
                      value={
                        inputs.releaseDate ? new Date(inputs.releaseDate) : null
                      }
                      onChange={handleInputDate}
                      placeholder="Select Release Date"
                      className={`p-inputtext-sm w-full ${
                        errors.releaseDate ? "p-invalid" : ""
                      }`}
                      showIcon
                      required
                    />
                    {errors.releaseDate && (
                      <small className="text-red-500">
                        {errors.releaseDate}
                      </small>
                    )}
                  </div>
                </div>

                {/* Overview Notes */}
                <div className="flex flex-col gap-2 mt-6">
                  <label htmlFor="notes" className="font-semibold">
                    Overview Notes <span className="text-red-500">*</span>
                  </label>
                  <Editor
                    id="notes"
                    value={inputs.notes || ""}
                    onTextChange={handleEditorChange}
                    style={{ height: "320px", width: "100%" }}
                    placeholder="Enter Overview Notes"
                    className={errors.notes ? "p-invalid" : ""}
                    required
                  />
                  {errors.notes && (
                    <small className="text-red-500">{errors.notes}</small>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                  <Button type="submit" label="Submit" className="px-6 py-2" />
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel header="View New Releases">
            <DataTable
              value={newRelease}
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
                field="version"
                header={"Version"}
              />

              {/* <Column
                headerStyle={{ width: "15rem" }}
                field="refStatus"
                header={"Status"}
                body={(rowData) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      rowData.refStatus
                    )}`}
                  >
                    {rowData.refStatus}
                  </span>
                )}
              /> */}
              <Column
                headerStyle={{ width: "15rem" }}
                field="refStatus"
                header="Status"
                body={(rowData) => (
                  <Dropdown
                    value={rowData.refStatus}
                    options={statusOptions}
                    onChange={(e) => handleStatusUpdate(rowData, e.value)}
                    className={`p-inputtext-sm ${getStatusColor(
                      rowData.refStatus
                    )}`}
                    style={{ width: "100%" }}
                  />
                )}
              />

              <Column
                headerStyle={{ width: "200rem" }}
                header="Notes"
                body={(rowData) => (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: rowData.notes,
                    }}
                  />
                )}
              />

              <Column
                headerStyle={{ width: "15rem" }}
                field="releaseDate"
                header={"Release Date"}
                body={(rowData) => {
                  return new Date(rowData.releaseDate).toLocaleDateString();
                }}
              />

              <Column
                headerStyle={{ width: "15rem" }}
                body={actionDelete}
                header={"Delete"}
              />
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default NewRelease;

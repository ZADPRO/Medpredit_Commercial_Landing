import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import decrypt from "./helper";
import logo from "../../assets/images/fav.png";
import "./Subscription.css";
import Lottie from "lottie-react";
import tickAnimation from "./tickanimation.json";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Package {
  createdAt: string;
  createdBy: string;
  refIsOffer: boolean;
  refOfferPrice: number;
  refPkgDescription: string;
  refPkgEndDate: string;
  refPkgId: number;
  refPkgName: string;
  refPkgStartDate: string;
  refPkgStatus: boolean;
  refPkgValidDays: number;
  refPkgValidMembers: number;
  refPkgAmount: number;
  updatedAt: string | null;
  updatedBy: string | null;
}

interface GstInfo {
  refGSTId: number;
  refCGST: string;
  refSGST: string;
}

interface UpgradeInfo {
  isFirstPackage: boolean;
  minus_amount: number;
  minus_cgst: number;
  minus_sgst: number;
  newPackage_amount: number;
  newPackage_cgst: number;
  newPackage_sgst: number;
  totalPackage: number;
  totalPackageValue: number;
  totalminus: number;
}

const Subscription = () => {
  const { t, i18n } = useTranslation("global");

  const queryParams = new URLSearchParams(window.location.search);
  const accessdata = {
    token: queryParams.get("token") || "",
    packageId: queryParams.get("packageId") || "",
    refLanCode: queryParams.get("refLanCode") || "",
  };

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userCustId: null, phNumber: null, firstName: null, lastName: null };

  const [selectPackage, setSelectedPackage] = useState<Package>();
  const [gstInfo, setGstInfo] = useState<GstInfo>();
  const [upgradeInfo, setUpgradeInfo] = useState<UpgradeInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  const paymentMethod = ["UPI", "Credit Card", "Debit Card", "Net Banking"];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();

  function addDaysToDate(convertDate: string, daysToAdd: number): string {
    const [day, month, year] = convertDate.split("/").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (
      queryParams.get("token") &&
      queryParams.get("packageId") &&
      queryParams.get("refLanCode")
    ) {
      // setAccessData({
      //     token: queryParams.get('token') || "",
      //     packageId: queryParams.get('packageId') || "",
      //     refLanCode: queryParams.get('refLanCode') || ""
      // })
      i18n.changeLanguage(queryParams.get("refLanCode") || "english");
      getSelectedPackage();

      console.log(queryParams.get("refLanCode"));
    } else {
      navigate("/");
    }
  }, []);

  const getSelectedPackage = () => {
    setLoading(true);
    const tokenString = accessdata.token;
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/getOneValidPackage`,
            { packageId: accessdata.packageId },
            {
              headers: {
                Authorization: tokenString,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            console.log(data);
            if (data.status) {
              setSelectedPackage(data.result[0]);
              setGstInfo(data.getGST[0]);
              setUpgradeInfo({
                isFirstPackage: data.isFirstPackage ?? false,
                minus_amount: data.minus_amount ?? 0,
                minus_cgst: data.minus_cgst ?? 0,
                minus_sgst: data.minus_sgst ?? 0,
                newPackage_amount: data.newPackage_amount ?? 0,
                newPackage_cgst: data.newPackage_cgst ?? 0,
                newPackage_sgst: data.newPackage_sgst ?? 0,
                totalPackage: data.totalPackage ?? 0,
                totalPackageValue: data.totalPackageValue ?? 0,
                totalminus: data.totalminus ?? 0,
              });
              setLoading(false);
            } else {
              console.error("Data consoled false - chekc this");
              setLoading(false);
            }
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      console.log("Token Missing");
    }
  };
  // const floatPkgAmount = parseFloat(String(selectPackage?.refPkgAmount ?? "0"));

  let gstAmount;
  let grandTotal;

  useEffect(() => {
    selectedPaymentMethod && handlePayment();
  }, [selectedPaymentMethod]);

  const handlePayment = () => {
    console.log(selectedPaymentMethod);
    console.log("Payment---------------------------------->");

    if (upgradeInfo?.isFirstPackage == true) {
      gstAmount =
        ((selectPackage?.refPkgAmount || 0) *
          (Number(gstInfo?.refCGST) + Number(gstInfo?.refSGST))) /
        100;
      grandTotal = ((selectPackage?.refPkgAmount || 0) + gstAmount) * 100;
    } else {
      grandTotal = (upgradeInfo?.totalPackageValue || 0) * 100;
    }

    if (selectedPaymentMethod === "Credit Card") {
      const options = {
        key: `${import.meta.env.VITE_RZR_API_KEY}`,
        amount: Math.round(grandTotal), // Razorpay requires amount in paise
        currency: "INR",
        name: "Medpredit",
        description: "Payment for services",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            setLoading(true);
            // setShowModal(true);
            sendPayment(response.razorpay_payment_id);
          }
          // paymentToBackend(
          //   response.razorpay_payment_id,
          //   Math.round(finalAmount * 100)
          // );
          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: `${userDeatilsObj.firstName + " " + userDeatilsObj.lastName}`,
          // email: "johndoe@example.com",
          contact: `${userDeatilsObj.phNumber}`,
        },
        method: {
          upi: false,
          card: true,
          netbanking: false,
          wallet: false,
        },
        theme: {
          color: "rgba(12, 75, 65, 1)",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else if (selectedPaymentMethod === "Debit Card") {
      const options = {
        key: `${import.meta.env.VITE_RZR_API_KEY}`,
        amount: Math.round(grandTotal),
        currency: "INR",
        name: "Medpredit",
        description: "Payment for Package",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            setLoading(true);
            // setShowModal(true);
            sendPayment(response.razorpay_payment_id);
          }
          // paymentToBackend(response.razorpay_payment_id, grandTotal * 100);

          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: `${userDeatilsObj.firstName + " " + userDeatilsObj.lastName}`,
          // email: "johndoe@example.com",
          contact: `${userDeatilsObj.phNumber}`,
        },
        method: {
          upi: false,
          card: true,
          netbanking: false,
          wallet: false,
        },
        theme: {
          color: "rgba(12, 75, 65, 1)",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else if (selectedPaymentMethod === "UPI") {
      const options = {
        key: `${import.meta.env.VITE_RZR_API_KEY}`,
        amount: Math.round(grandTotal),
        currency: "INR",
        name: "Medpredit",
        description: "Payment for Package",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            setLoading(true);
            // setShowModal(true);
            sendPayment(response.razorpay_payment_id);
          }
          // paymentToBackend(response.razorpay_payment_id, grandTotal * 100);

          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: `${userDeatilsObj.firstName + " " + userDeatilsObj.lastName}`,
          // email: "johndoe@example.com",
          contact: `${userDeatilsObj.phNumber}`,
        },
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
        },
        theme: {
          color: "rgba(12, 75, 65, 1)",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else if (selectedPaymentMethod === "Net Banking") {
      const options = {
        key: `${import.meta.env.VITE_RZR_API_KEY}`,
        amount: Math.round(grandTotal),
        currency: "INR",
        name: "Medpredit",
        description: "Payment for Package",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            setLoading(true);
            // setShowModal(true);
            sendPayment(response.razorpay_payment_id);
          }
          // paymentToBackend(response.razorpay_payment_id, grandTotal * 100);

          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: `${userDeatilsObj.firstName + " " + userDeatilsObj.lastName}`,
          // email: "johndoe@example.com",
          contact: `${userDeatilsObj.phNumber}`,
        },
        method: {
          upi: false,
          card: false,
          netbanking: true,
          wallet: false,
        },
        theme: {
          color: "rgba(12, 75, 65, 1)",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  const sendPayment = (razor_payment_id: string) => {
    console.log(razor_payment_id);
    const tokenString = accessdata.token;
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/purchasePackage`,
            {
              txnkey: razor_payment_id,
              packageId: selectPackage?.refPkgId,
              method: selectedPaymentMethod,
            },
            {
              headers: {
                Authorization: tokenString,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            console.log(data);
            if (data.status) {
              // setToastOpen({
              //   status: true,
              //   textColor: "green",
              //   message: "Payment successful!",
              // });
              setLoading(false);
              setShowModal(true);
            } else {
              console.error("Data consoled false - chekc this");
              setLoading(false);
            }
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#f9fff7" }}>
      {loading ? (
        <>
          <div className="w-[100%] h-[100%] flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="title-04a desc-04a"
              aria-live="polite"
              aria-busy="true"
              className="animate h-10 w-10 animate-spin"
            >
              <title id="title-04a">Icon title</title>
              <desc id="desc-04a">Some desc</desc>
              <circle
                cx="12"
                cy="12"
                r="10"
                className="stroke-slate-200"
                strokeWidth="4"
              />
              <path
                d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
                className="stroke-emerald-500"
                strokeWidth="4"
              />
            </svg>
          </div>
        </>
      ) : (
        <>
          {showModal && (
            <>
              <div
                className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-700/50 backdrop-blur-sm"
                aria-labelledby="header-3a content-3a"
                aria-modal="true"
                role="dialog"
              >
                <div
                  className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded-lg bg-white p-0 text-slate-500 shadow-xl shadow-slate-700/10"
                  role="document"
                >
                  <div className="modalContent">
                    <div className="lottie-container">
                      <Lottie
                        animationData={tickAnimation}
                        loop={false}
                        style={{ width: 150, height: 150 }}
                        onComplete={() =>
                          setTimeout(() => {
                            window.location.href =
                              "medpreditcommercial://open/transactionHistory";
                            // history.replace("/subscriptionPlans", { refreshPage: true });
                            setShowModal(false);
                          }, 1000)
                        }
                      />
                    </div>
                    <p
                      className="w-[100%] flex justify-center"
                      style={{
                        fontWeight: "700",
                        fontSize: "x-large",
                        marginTop: "0%",
                      }}
                    >
                      {t("subPayment.Payment Successful")}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {showPaymentModal && (
            <>
              <div
                className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-700/50 backdrop-blur-sm"
                aria-labelledby="header-3a content-3a"
                aria-modal="true"
                role="dialog"
              >
                <div
                  className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded-lg bg-white p-2 text-slate-500 shadow-xl shadow-slate-700/10"
                  role="document"
                >
                  <header id="header-3a" className="flex items-center gap-4">
                    <h3 className="flex-1 text-xl font-medium text-slate-700">
                      {t("subPayment.Payment Method")}
                    </h3>
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="inline-flex items-center justify-center h-8 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                      aria-label="close dialog"
                    >
                      <span className="relative only:-mx-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          role="graphics-symbol"
                          aria-labelledby="title-79 desc-79"
                        >
                          <title id="title-79">Icon title</title>
                          <desc id="desc-79">
                            A more detailed description of the icon
                          </desc>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </button>
                  </header>

                  <div className="mt-[-10px]">
                    {paymentMethod.map((method) => (
                      <div
                        className="text-[1rem] font-semibold p-2 border-2 rounded mb-2"
                        onClick={() => {
                          setSelectedPaymentMethod(method);
                          setShowPaymentModal(false);
                        }}
                        key={method}
                      >
                        <p>{method}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <div style={{ width: "100%", height: "8vh", padding: "5px 20px" }}>
            <div
              style={{
                fontSize: "1.2rem",
                fontFamily: "Inter",
                fontWeight: "600",
                display: "flex",
                alignItems: "flex-end",
                gap: "20px",
                color: "#000",
              }}
            >
              <img src={logo} style={{ height: "40px" }} alt="Logo" />
              {t("subPayment.Subscription Plan")}
            </div>
          </div>
          {upgradeInfo?.isFirstPackage == true ? (
            <>
              <div
                style={{
                  height: "83vh",
                  padding: "20px 20px",
                  overflow: "auto",
                }}
                className="w-[100%]"
              >
                <>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontFamily: "Inter",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "20px",
                      color: "#0c4b41",
                      marginTop: "-15px",
                    }}
                  >
                    {selectPackage?.refPkgName}
                  </div>

                  <div
                    style={{
                      fontSize: "1.7rem",
                      fontFamily: "Inter",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "20px",
                      color: "#000",
                      marginTop: "0px",
                    }}
                  >
                    {"₹ " +
                      (upgradeInfo?.totalPackageValue != undefined
                        ? upgradeInfo?.totalPackageValue
                        : "0")}
                  </div>

                  <p
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Inter",
                      fontWeight: "600",
                      marginTop: "0px",
                    }}
                  >
                    {"₹" +
                      (selectPackage?.refPkgAmount != undefined
                        ? selectPackage.refPkgAmount +
                          " Base" +
                          " + " +
                          "₹" +
                          selectPackage?.refPkgAmount *
                            (Number(gstInfo?.refCGST) / 100 +
                              Number(gstInfo?.refSGST) / 100) +
                          "GST"
                        : "0")}
                  </p>

                  <table
                    className="subscription-detail-table"
                    style={{ marginTop: "5px" }}
                  >
                    <tbody>
                      <tr>
                        <td>{t("subPayment.Plan Type")}</td>
                        <td>{selectPackage?.refPkgName}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Description")}</td>
                        <td>{selectPackage?.refPkgDescription}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Plan Validity")}</td>
                        <td>
                          {selectPackage?.refPkgValidDays}{" "}
                          {t("subPayment.days")}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Valid Members")}</td>
                        <td>{selectPackage?.refPkgValidMembers}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Start Date")}</td>
                        <td>{new Date().toISOString().split("T")[0]}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Expiry Date")}</td>
                        <td>
                          {selectPackage?.refPkgValidDays &&
                            addDaysToDate(
                              new Date().toLocaleDateString(),
                              selectPackage?.refPkgValidDays
                            )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  height: "83vh",
                  padding: "20px 20px",
                  overflow: "auto",
                }}
              >
                <>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontFamily: "Inter",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "20px",
                      color: "#0c4b41",
                      marginTop: "-15px",
                    }}
                  >
                    {selectPackage?.refPkgName}
                  </div>

                  <div
                    className="subscription-detail-price"
                    style={{
                      fontSize: "1.7rem",
                      fontFamily: "Inter",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "20px",
                      color: "#000",
                      marginTop: "0px",
                    }}
                  >
                    <s>
                      {"₹ " +
                        (upgradeInfo?.totalPackage != undefined
                          ? upgradeInfo?.totalPackage
                          : "0")}
                    </s>
                    <span>
                      {"₹ " +
                        (upgradeInfo?.totalPackageValue != undefined
                          ? upgradeInfo?.totalPackageValue
                          : "0")}
                    </span>
                  </div>

                  <p
                    style={{
                      fontStyle: "italic",
                      fontFamily: "Inter",
                      fontWeight: "600",
                      marginTop: "0px",
                    }}
                  >
                    {`₹${(
                      (upgradeInfo?.newPackage_amount ?? 0) -
                      (upgradeInfo?.minus_amount ?? 0)
                    ).toFixed(2)} Base + ₹${(
                      (upgradeInfo?.newPackage_cgst ?? 0) +
                      (upgradeInfo?.newPackage_sgst ?? 0) -
                      (upgradeInfo?.minus_cgst ?? 0) -
                      (upgradeInfo?.minus_sgst ?? 0)
                    ).toFixed(2)} GST`}
                  </p>

                  <table
                    className="subscription-detail-table"
                    style={{ marginTop: "5px" }}
                  >
                    <tbody>
                      <tr>
                        <td>{t("subPayment.Plan Type")}</td>
                        <td>{selectPackage?.refPkgName}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Description")}</td>
                        <td>{selectPackage?.refPkgDescription}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Plan Validity")}</td>
                        <td>
                          {selectPackage?.refPkgValidDays}{" "}
                          {t("subPayment.days")}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Valid Members")}</td>
                        <td>{selectPackage?.refPkgValidMembers}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Start Date")}</td>
                        <td>{new Date().toISOString().split("T")[0]}</td>
                      </tr>
                      <tr>
                        <td>{t("subPayment.Expiry Date")}</td>
                        <td>
                          {selectPackage?.refPkgValidDays &&
                            addDaysToDate(
                              new Date().toLocaleDateString(),
                              selectPackage?.refPkgValidDays
                            )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              </div>
            </>
          )}
          <div
            style={{
              width: "100%",
              height: "9vh",
              padding: "0px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "6vh",
                background: "#0c4b41",
                color: "#a5e768",
                borderRadius: "10px",
              }}
            >
              <button
                // onClick={() => {
                //   selectPackage?.refPkgAmount && handlePayment();
                // }}
                onClick={() => {
                  setSelectedPaymentMethod("");
                  setShowPaymentModal(true);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "6vh",
                  fontWeight: 600,
                }}
                className="medCustom-button02"
              >
                {t("subPayment.Proceed")} {t("subPayment.Payment")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscription;

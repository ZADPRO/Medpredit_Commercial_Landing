import axios from "axios"
import { useEffect, useState } from "react"
import decrypt from "../../helper";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState([]);

    const [modelNDelete, setModelNDelete] = useState({ status: false, id: "", custId: "" });

    const [modelHDelete, setModelHDelete] = useState({ status: false, id: "", custId: "", headId: "" })

    const [nDeleteLoad, setNDeleteLoad] = useState(false);

    const handleActiveStatus = (value: any, doctorId: any) => {


        console.log(value, doctorId)

        setNDeleteLoad(true);

        const userDetails = localStorage.getItem("userDetails");

        if (!userDetails) {
            localStorage.clear();
            navigate("/login");
            return;
        }

        let tokenObject = JSON.parse(userDetails);
        if (tokenObject) {
            try {
                axios
                    .post(
                        `${import.meta.env.VITE_API_URL}/postActiveStatus`,
                        {
                            doctorId: doctorId,
                            value: value,
                        },
                        {
                            headers: {
                                Authorization: tokenObject.token,
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

                        if (data.status) {
                            loadData();
                            setModelNDelete({ status: false, id: "", custId: "" })
                        }
                    });
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        }

        setNDeleteLoad(false);
    };

    const loadData = () => {
        setLoading(true);
        try {
            const userDetails = localStorage.getItem("userDetails");
            console.log(userDetails);

            if (!userDetails) {
                localStorage.clear();
                navigate("/login");
                return;
            }

            let tokenObject;
            try {
                tokenObject = JSON.parse(userDetails);
            } catch (error) {
                console.error("Error parsing userDetails:", error);
                localStorage.clear();
                navigate("/login");
                return;
            }

            if (!tokenObject?.token || !tokenObject?.phNumber) {
                localStorage.clear();
                navigate("/login");
                return;
            }

            const token = tokenObject.token.replace("Bearer ", ""); // Remove "Bearer " if present

            axios.post(
                `${import.meta.env.VITE_API_URL}/getPatientData`,
                { mobileNumber: tokenObject.phNumber },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
                        setUserData(data.data);
                        setLoading(false);
                    } else {
                        console.error("Data returned false - check this");
                        localStorage.clear();
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching patient data:", error);
                    localStorage.clear();
                    navigate("/login");
                });
        } catch (error) {
            console.error("Unexpected error:", error);
            localStorage.clear();
            navigate("/login");
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const [headDeleteStepper, setHeadDeleteStepper] = useState("1");


    const handleDeleteAllUser = () => {
        setNDeleteLoad(true)
        try {
            const userDetails = localStorage.getItem("userDetails");
            console.log(userDetails);

            if (!userDetails) {
                localStorage.clear();
                navigate("/login");
                return;
            }

            let tokenObject;
            try {
                tokenObject = JSON.parse(userDetails);
            } catch (error) {
                console.error("Error parsing userDetails:", error);
                localStorage.clear();
                navigate("/login");
                return;
            }

            if (!tokenObject?.token || !tokenObject?.phNumber) {
                localStorage.clear();
                navigate("/login");
                return;
            }

            const token = tokenObject.token.replace("Bearer ", ""); // Remove "Bearer " if present


            let id: any = [];

            userData.map((data: any) => {
                id.push(data.refUserId)
            })


            axios.post(
                `${import.meta.env.VITE_API_COMMERCIAL_URL}/deleteMultipleUser`,
                { id: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
                        loadData();
                        setHeadDeleteStepper("1");
                        setModelHDelete({ status: false, id: "", custId: "", headId: "" })
                        localStorage.clear();
                        navigate("/home#home");
                    } else {
                        console.error("Data returned false - check this");
                        localStorage.clear();
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching patient data:", error);
                    localStorage.clear();
                    navigate("/login");
                });
        } catch (error) {
            console.error("Unexpected error:", error);
            localStorage.clear();
            navigate("/login");
        }

        setNDeleteLoad(false)
    }


    const handleChangeUser = () => {
        setNDeleteLoad(true)
        try {
            const userDetails = localStorage.getItem("userDetails");
            console.log(userDetails);

            if (!userDetails) {
                localStorage.clear();
                navigate("/login");
                return;
            }

            let tokenObject;
            try {
                tokenObject = JSON.parse(userDetails);
            } catch (error) {
                console.error("Error parsing userDetails:", error);
                localStorage.clear();
                navigate("/login");
                return;
            }

            if (!tokenObject?.token || !tokenObject?.phNumber) {
                localStorage.clear();
                navigate("/login");
                return;
            }

            const token = tokenObject.token.replace("Bearer ", ""); // Remove "Bearer " if present

            axios.post(
                `${import.meta.env.VITE_API_COMMERCIAL_URL}/changeUserId`,
                {
                    id: modelHDelete.id,
                    headUserId: modelHDelete.headId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
                        loadData();
                        setHeadDeleteStepper("1");
                        setModelHDelete({ status: false, id: "", custId: "", headId: "" })
                        localStorage.clear();
                        navigate("/login");
                    } else {
                        console.error("Data returned false - check this");
                        localStorage.clear();
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching patient data:", error);
                    localStorage.clear();
                    navigate("/login");
                });
        } catch (error) {
            console.error("Unexpected error:", error);
            localStorage.clear();
            navigate("/login");
        }

        setNDeleteLoad(false)
    }


    return (
        <>
            {
                loading ? (
                    <>
                        <div className="w-[100%] h-[70vh] flex py-10 justify-center items-center flex-col">
                            <h1 className="text-[2rem] font-bold">Loading</h1></div></>
                ) : (
                    <div className="w-[100%] flex py-10 justify-center items-center flex-col">

                        {
                            modelNDelete.status ? (
                                <>
                                    <div
                                        className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
                                        aria-labelledby="header-3a content-3a"
                                        aria-modal="true"
                                        //   tabindex="-1"
                                        role="dialog"
                                    >
                                        {/*    <!-- Modal --> */}
                                        <div
                                            className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                                            id="modal"
                                            role="document"
                                        >
                                            {/*        <!-- Modal header --> */}
                                            <header id="header-3a" className="flex items-center gap-4">
                                                <h3 className="flex-1 text-xl font-medium text-slate-700">
                                                    Delete User ID : {modelNDelete.custId}
                                                </h3>
                                                <button
                                                    onClick={() => setModelNDelete({ status: false, id: "", custId: "" })}
                                                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
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
                                                            <title id="title-79">Cancel</title>
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
                                            {/*        <!-- Modal body --> */}
                                            <div id="content-3a" className="flex-1 overflow-auto">
                                                <p>
                                                    Are you sure you want to delete user {modelNDelete.custId}? Once deleted, all associated details will be permanently removed and cannot be recovered.
                                                </p>
                                                <div className="flex justify-between gap-5 pt-5">
                                                    <div className="w-[100%] bg-[#0f3b36] font-bold text-[#fff] flex justify-center items-center rounded h-12 cursor-pointer" onClick={() => { !nDeleteLoad && handleActiveStatus('inactive', modelNDelete.id) }}>{nDeleteLoad ? 'Loading' : 'Delete'}</div>
                                                    <div onClick={() => setModelNDelete({ status: false, id: "", custId: "" })} className="w-[100%] bg-[#ee6868] font-bold text-[#fff] flex justify-center items-center rounded h-12 cursor-pointer">Cancel</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>

                            ) : null
                        }

                        {
                            modelHDelete.status ? (
                                <>
                                    <div
                                        className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
                                        aria-labelledby="header-3a content-3a"
                                        aria-modal="true"
                                        //   tabindex="-1"
                                        role="dialog"
                                    >
                                        {
                                            headDeleteStepper === "1" ? (
                                                <div
                                                    className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                                                    id="modal"
                                                    role="document"
                                                >
                                                    {/*        <!-- Modal header --> */}
                                                    <header id="header-3a" className="flex items-center gap-4">
                                                        <h3 className="flex-1 text-xl font-medium text-slate-700">
                                                            Delete User ID : {modelHDelete.custId}
                                                        </h3>
                                                        <button
                                                            onClick={() => { setModelHDelete({ status: false, id: "", custId: "", headId: "" }); setHeadDeleteStepper("1"); }}
                                                            className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
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
                                                                    <title id="title-79">Cancel</title>
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
                                                    {/*        <!-- Modal body --> */}
                                                    <div id="content-3a" className="flex-1 overflow-auto">
                                                        <p>
                                                            Are you sure you want to delete user {modelHDelete.custId}? Once deleted, all associated details will be permanently removed and cannot be recovered.
                                                        </p>
                                                        <div className="flex justify-between gap-5 pt-5">
                                                            <div className="w-[100%] bg-[#0f3b36] font-bold text-[#fff] flex justify-center items-center rounded h-14 cursor-pointer"
                                                                onClick={() => { !nDeleteLoad && handleDeleteAllUser() }}
                                                            >{nDeleteLoad ? 'Loading' : 'Delete All User'}</div>
                                                            <div onClick={() => { setHeadDeleteStepper("2") }} className="w-[100%] bg-[#ee6868] font-bold text-[#fff] flex justify-center items-center rounded h-14 cursor-pointer text-[1rem] p-2">Delete User & Reassign Access</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : headDeleteStepper === "2" && (
                                                <div
                                                    className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                                                    id="modal"
                                                    role="document"
                                                >
                                                    {/*        <!-- Modal header --> */}
                                                    <header id="header-3a" className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => setHeadDeleteStepper("1")}
                                                            className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                                                            aria-label="close dialog"
                                                        > <span className="relative only:-mx-5"><svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            role="graphics-symbol"
                                                            aria-labelledby="title-back desc-back"
                                                        >
                                                            <title id="title-back">Go Back</title>
                                                            <desc id="desc-back">A left arrow indicating the go back action</desc>
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15 19l-7-7 7-7"
                                                            />
                                                        </svg></span></button>
                                                        <h3 className="flex-1 text-xl font-medium text-slate-700">
                                                            Delete User ID : {modelHDelete.custId}
                                                        </h3>
                                                        <button
                                                            onClick={() => { setModelHDelete({ status: false, id: "", custId: "", headId: "" }); setHeadDeleteStepper("1"); }}
                                                            className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
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
                                                                    <title id="title-79">Cancel</title>
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
                                                    {/*        <!-- Modal body --> */}
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleChangeUser();
                                                    }}>
                                                        <div id="content-3a" className="flex-1 overflow-auto">
                                                            <p>
                                                                Are you sure you want to delete user {modelHDelete.custId}? Once deleted, all associated details will be permanently removed and cannot be recovered.
                                                            </p>
                                                            <div className="w-full pt-3">
                                                                <div className="relative mt-3 mb-2 w-full">
                                                                    <select
                                                                        id="selectUser"
                                                                        name="id-04"
                                                                        required
                                                                        onInput={(e: any) => {
                                                                            setModelHDelete({
                                                                                ...modelHDelete,
                                                                                ["headId"]: e.target.value
                                                                            })
                                                                        }}
                                                                        className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                                                    >
                                                                        <option value="" disabled selected></option>
                                                                        {
                                                                            userData.map((data: any) => (
                                                                                <>
                                                                                    {
                                                                                        data.headStatus === "false" && (
                                                                                            <option value={data.refUserId}>{data.refUserFname} {data.refUserLname} ({data.refUserCustId})</option>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <label
                                                                        htmlFor="selectUser"
                                                                        className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                                                                    >
                                                                        Choose a User to Assign Access
                                                                    </label>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                        aria-labelledby="title-04 description-04"
                                                                        role="graphics-symbol"
                                                                    >
                                                                        <title id="title-04">Arrow Icon</title>
                                                                        <desc id="description-04">Arrow icon of the select list.</desc>
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between gap-5 pt-5">
                                                                <button type={nDeleteLoad ? 'button' : 'submit'} className="w-[100%] bg-[#0f3b36] font-bold text-[#fff] flex justify-center items-center rounded h-14 cursor-pointer"
                                                                >{nDeleteLoad ? 'Loading' : 'Submit'}</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            )
                                        }
                                    </div>
                                </>

                            ) : null
                        }

                        <div className="font-[#333] text-[2rem] font-bold">
                            All Users
                        </div>
                        <div className="w-[100%] flex justify-center items-center py-10 flex-col">
                            {
                                userData.map((data: any, index) => (
                                    <>
                                        {
                                            data.headStatus === "true" && (
                                                <>
                                                    <div className=" w-[70%] lg:w-[30%] flex pb-1 font-bold text-[#234d48]">Primary ID</div>
                                                    <div key={index} className="mb-2 w-[70%] lg:w-[30%] bg-[#234d48] h-[60px] flex justify-between px-4 items-center rounded">
                                                        <div>
                                                            <div className="text-[#ffa377] font-bold text-[0.7rem]">
                                                                {data.refUserCustId}
                                                            </div>
                                                            <div className="text-[#fff] font-bold text-[1rem]">
                                                                {data.refUserFname} {data.refUserLname}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="bg-[#fa3636] h-[1.4rem] w-[3rem] flex justify-around items-center rounded text-[#fff] cursor-pointer text-[0.8rem] font-normal" onClick={() => {
                                                                setModelHDelete({ status: true, id: data.refUserId, custId: data.refUserCustId, headId: "" })
                                                            }}>
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </>
                                ))
                            }
                            <div className=" w-[70%] lg:w-[30%] flex pb-1 font-bold text-[#234d48]">Family Member's ID</div>
                            {
                                userData.map((data: any, index) => (
                                    <>
                                        {data.headStatus === "false" && (
                                            <div key={index} className="my-2 w-[70%] lg:w-[30%] bg-[#d3dfdd] h-[60px] flex justify-between px-4 items-center rounded">
                                                <div>
                                                    <div className="text-[#ffa377] font-bold text-[0.7rem]">
                                                        {data.refUserCustId}
                                                    </div>
                                                    <div className="text-[#0f3b36] font-bold text-[1rem]">
                                                        {data.refUserFname} {data.refUserLname}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="bg-[#fa3636] h-[1.4rem] w-[3rem] flex justify-around items-center rounded text-[#fff] cursor-pointer text-[0.8rem] font-normal" onClick={() => {
                                                        setModelNDelete({ status: true, id: data.refUserId, custId: data.refUserCustId })
                                                    }}>
                                                        Delete
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </>
                                ))
                            }
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default Dashboard
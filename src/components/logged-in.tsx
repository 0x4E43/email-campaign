import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState } from "react";

import 'react-toastify/dist/ReactToastify.css';

import { sendBulkEmail, fetchEmailTemplateList } from "../data/data-service";
import Toast from "./toast";
export default function LoggedIn() {
  const selectionList: string[] = [];
  const { user, logout } = useKindeAuth();

  const [templateList, setTemplateList] = useState<string[]>([]);
  const [template, setTemplate] = useState("");
  const [success, setSuccess] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    fetchEmailTemplateList().then((res) => {
      const selectList: string[] = [];
      res.forEach((item) => {
        selectList.push(item.Name);
      });
      setTemplateList(selectList);
      if(selectList.length > 0){
        setTemplate(selectList[0])
      }
    });
  }, []);
  const [myFile, setMyFile] = useState<File | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("Event", event.target.value);
    setTemplate(event.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMyFile(file);
    }
  };

  const handleSubmit = (event: React.MouseEvent) => {
    setIsLoading(true)
    event.preventDefault();

    if (!myFile) {
      alert("Please select a file.");
      return;
    }
    if (!templateList) {
      if (selectionList.length > 0) {
        setTemplate(selectionList[0]);
        // console.log("template set");
      } else {
        alert("Please create template in elastic email account");
      }
    }
    // Perform your file upload logic here
    // console.log("Template:", template);
    // console.log("File:", myFile);


    //call APIs
    sendBulkEmail(myFile, template).then((res) => {
      // console.log("response: ", res);

      if (res.TransactionID) {
        // console.log("SUCCESS");
        setSuccess(1);
      } else {
        setSuccess(2);
      }
    });
    setIsLoading(false)
  };

  return (
    <>
      {/* SideBar */}
      <div className="navbar bg-base-300 px-20">
        <div className="flex-1">
          <a className="text-2xl font-mono">Email App</a>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-circle btn-outline"
            title="logout"
            onClick={() => logout()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <main>
        <div className="container justify-center items-center my-10 mx-10 px-10">
          <p className="my-2">Hello, {user?.given_name}!</p>
          <h1 className="text-xl font-sans">Lets start Sending E-Mail</h1>
          {/* Forms starts here */}
          <form action="">
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">
                  Pick the template name you created on{" "}
                  <strong>Elastic Email</strong>
                </span>
              </div>
              <select
                className="select select-bordered"
                onChange={handleChange}
                value={template}
              >
                <option selected disabled>
                  Pick one
                </option>
                {templateList.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">
                  Pick a file with email list (
                  <a
                    href="/public/email.txt"
                    className="text-blue-500"
                    download={true}
                  >
                    sample-file
                  </a>
                  )
                </span>
              </div>
              <input
                type="file"
                accept=".txt,.csv"
                className="file-input file-input-bordered w-full max-w-md"
                onChange={handleFileUpload}
              />
            </label>
            <div className="form-control w-full max-w-md my-2">
              <button
                type="submit"
                className="btn btn-outline"
                onClick={handleSubmit}
              >
                {isLoading ? "Sending Emails..." : "Send Emails"}
              </button>
            </div>
          </form>
        </div>
        <Toast isSuccess={success} />
      </main>
    </>
  );
}

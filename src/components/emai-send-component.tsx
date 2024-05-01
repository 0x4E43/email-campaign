import { useEffect, useState } from "react";


import {fetchEmailTemplateList, EmailTemplateModel} from "../data/data-service";


export default function EmailSendComponent() {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplateModel[]>([]);
  useEffect(() => {
    fetchEmailTemplateList().then((data) => setEmailTemplate(data));
  }, []);
  return (
    <>
      <p>Email Works</p>
      <div>
      {emailTemplate.map((user) => (
        <div key={user.Name}>
          <h2>{user.Name}</h2>
          <p>{user.Subject}</p>
        </div>
      ))}
    </div>
    </>
  );
}

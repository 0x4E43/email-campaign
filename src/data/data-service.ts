import config from "../config";


export interface EmailTemplateModel{
    TemplateType : string,
    Name: string,
    Subject: string,
    Body: string,
    TemplateScope: string
}

export interface EmailAPIResponse{
    TransactionID?: string,
    MessageID?: string
}
export async function fetchEmailTemplateList(): Promise<EmailTemplateModel[]> {
    try {
        const url = config.BASE_URL + '/templates' + config.SCOPE;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-ElasticEmail-ApiKey': config.API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch email template list: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Error occurred:", error);
        // You might want to throw an error here or handle it accordingly
        throw error;
    }
}

export async function sendBulkEmail(myFile: File, myTemplate : string): Promise<EmailAPIResponse>{
    const recJSON = await processFile(myFile);
    const contacts: string[] = []
    // console.log("Contacts", contacts);
    // console.log(myTemplate)
    recJSON.forEach((contact) => {
        contacts.push(JSON.stringify(contact));
    }); 
    const contentBody = { 
        "From": "admin1@mobile360review.com",
        "TemplateName": myTemplate,
    };
    let apiResponse: EmailAPIResponse = {}
    if(recJSON.length > 0){
        const reqBody = {
            "Recipients" : recJSON,
            "Content": contentBody
        };
        try {
            const url = config.BASE_URL + '/emails';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-ElasticEmail-ApiKey': config.API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody)
            });
    
            // console.log("Response", response)
            if (!response.ok) {
                throw new Error(`Failed to fetch email template list: ${response.statusText}`);
            }
            const data = await response.json();
            apiResponse = {
                MessageID: data.MessageID,
                TransactionID: data.TransactionID
            }
            // console.log(apiResponse)
            return apiResponse;
        } catch (error) {
            console.error("Error occurred:", error);
            // You might want to throw an error here or handle it accordingly
        }
    }
    return apiResponse;
}

export async function processFile(myFile: File): Promise<{ Email: string }[]>{
    return new Promise<{ Email: string }[]>((resolve, reject) => {
        const emailList: string[] = [];
        const fileReader = new FileReader();
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target?.result) {
                const fileContent = event.target.result.toString();
                // console.log("File Content: " + fileContent.split(","));
                if(fileContent.match("\r")){
                    fileContent.split("\r").forEach((email) => {
                        emailList.push(email);
                    });
                }else{
                    fileContent.split(",").forEach((email) => {
                        emailList.push(email);
                    });
                }
            
                const emailObjects = emailList.map((email) => ({ Email: email.replace('\n', '') }));
                // console.log("Email Object" + emailList);
                resolve(emailObjects);
            } else {
                // console.log("Failed to read file");
                reject(new Error("Failed to read file"));
            }
        };
        fileReader.readAsText(myFile);
    });
}

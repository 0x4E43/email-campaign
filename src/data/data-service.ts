import config from "../config";


export interface EmailTemplateModel{
    TemplateType : string,
    Name: string,
    Subject: string,
    Body: string,
    TemplateScope: string
}



export async function fetchEmailTemplateList(): Promise<EmailTemplateModel[]> {
    const url = config.BASE_URL +'/templates'+config.SCOPE;
    const response = await fetch(
        url,{
            method: 'GET',
            headers: {
                'X-ElasticEmail-ApiKey': config.API_KEY,
                'Content-Type': 'application/json'
            }
        }
    );
    const data = await response.json();
    console.log(data)
    if(data.Error !== null){
        console.log("Errorr!!!")
    }
    return data;
}
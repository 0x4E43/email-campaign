import config from "../config";


export interface EmailTemplateModel{
    TemplateType : string,
    Name: string,
    Subject: string,
    Body: string,
    TemplateScope: string
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
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error occurred:", error);
        // You might want to throw an error here or handle it accordingly
        throw error;
    }
}

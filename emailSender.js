const sendEmail = async () => {
    const stringifiedJSON = JSON.stringify(
        {
            To: "catalin.achim@continental.com",
            Cc: "",
            Bcc: "",
            Subject: "Testing email sender from Nodejs",
            Body: "Hello, this is an automated email.",
            IsImportant: false,
            SenderDescription:"dummy description",
            Files: null
        }
    )
    const someEncodedString = Buffer.from(stringifiedJSON, 'utf-8').toString();

    await fetch("http://tmas336a:9005/api/glemse", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:someEncodedString 
    }).then((result) => result.json().then((resultJson) => {
        console.log(resultJson);
    }))
}

sendEmail();

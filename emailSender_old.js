const sendEmail = async () => {
    await fetch("http://tmas336a:9005/api/glemse", {
         method: "POST",
         mode: "cors",
         cache: "no-cache",
         credentials: "omit",
         headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(
             {
                 To: "catalin-gheorghe.achim@continental.com",
                 Cc: "",
                 Bcc: "",
                 Subject: "Testing email sender from Nodejs",
                 Body: "Hello, this is an automated email.",
                 IsImportant: 0
             }
         )
     }).then((result) => result.json().then((resultJson) => {
         console.log(resultJson);
     }))
}
 sendEmail();

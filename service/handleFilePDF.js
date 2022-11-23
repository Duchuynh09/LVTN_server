import https from 'https'
import path from 'path'
import fs from 'fs'

const readFilePDF = (linkPdf) => {
  // The authentication key (API Key).
  // Get your own by registering at https://app.pdf.co/documentation/api
  const API_KEY =
    "vancc86@gmail.com_f5ffd04772534aef8dab1d583dcc9bfb413e65562e470d16c54708c1f3f7d186b9ecf9d5";
// api key thay the: jemcovintage@gmail.com_ec4734a32460f2fbe6410bae151cbfec23df6085402afd8d638e70c414f5e5e02eacf71f

  const SourceFileUrl = linkPdf;

  const Pages = "";
  const Password = "";
  // Destination TXT file name
  const DestinationFile = "./result.txt";
  var queryPath = `/v1/pdf/convert/to/text`;

  // JSON payload for api request
  var jsonPayload = JSON.stringify({
    name: path.basename(DestinationFile),
    password: Password,
    pages: Pages,
    url: SourceFileUrl,
  });

  var reqOptions = {
    host: "api.pdf.co",
    method: "POST",
    path: queryPath,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(jsonPayload, "utf8"),
    },
  };
  // Send request
  var postRequest = https
    .request(reqOptions, (response) => {
      response.on("data", (d) => {
        // Parse JSON response
        var data = JSON.parse(d);
        if (data.error == false) {
          // Download TXT file
          var file = fs.createWriteStream(DestinationFile);
          https.get(data.url, (response2) => {
            response2.pipe(file).on("close", () => {
              console.log(
                `Generated TXT file saved as "${DestinationFile}" file.`
              );
            });
          });
        } else {
          // Service reported error
          console.log(data.message);
        }
      });
    })
    .on("error", (e) => {
      // Request error
      console.log(e);
    });

  // Write request data
  postRequest.write(jsonPayload);
  postRequest.end();
};

export {readFilePDF} ;

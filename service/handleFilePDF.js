import https from 'https'
import path from 'path'
import fs from 'fs'

const readFilePDF = async (linkPdf,namefile) => {
  // The authentication key (API Key).
  // Get your own by registering at https://app.pdf.co/documentation/api
  const API_KEY =
    "triuy2812@gmail.com_096a450f1089b9da89925c2a00a03f7666a8f21fa5c94a62c3004259302aed2dbc1a7e91";
// api key thay the: triuy2812@gmail.com_096a450f1089b9da89925c2a00a03f7666a8f21fa5c94a62c3004259302aed2dbc1a7e91
// jemcovintage@gmail.com_ec4734a32460f2fbe6410bae151cbfec23df6085402afd8d638e70c414f5e5e02eacf71f
  const SourceFileUrl = linkPdf;

  const Pages = "";
  const Password = "";
  // Destination TXT file name
  const DestinationFile = `./file/${namefile}.txt`;
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

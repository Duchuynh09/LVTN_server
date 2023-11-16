import https from "https";
import path from "path";
import fs from "fs";
const API_KEY =
  "tanghuynh09@gmail.com_3d6b624547ac7c0b9d5dfca437e9676accbbfa9dd86216040d9b9063c71a6d94f85eaa57";
const DestinationFile = `./file/resuft.json`;

function checkIfJobIsCompleted(jobId, resultFileUrl) {
  let queryPath = `/v1/job/check`;

  // JSON payload for api request
  let jsonPayload = JSON.stringify({
    jobid: jobId,
  });

  let reqOptions = {
    host: "api.pdf.co",
    path: queryPath,
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(jsonPayload, "utf8"),
    },
  };

  // Send request
  var postRequest = https.request(reqOptions, (response) => {
    response.on("data", (d) => {
      response.setEncoding("utf8");

      // Parse JSON response
      let data = JSON.parse(d);
      console.log(
        `Checking Job #${jobId}, Status: ${
          data.status
        }, Time: ${new Date().toLocaleString()}`
      );

      if (data.status == "working") {
        // Check again after 3 seconds
        setTimeout(function () {
          checkIfJobIsCompleted(jobId, resultFileUrl);
        }, 3000);
      } else if (data.status == "success") {
        // Download JSON file
        var file = fs.createWriteStream(DestinationFile);
        https.get(resultFileUrl, (response2) => {
          response2.pipe(file).on("close", () => {
            console.log(
              `Generated JSON file saved as "${DestinationFile}" file.`
            );
          });
        });
      } else {
        console.log(`Operation ended with status: "${data.status}".`);
      }
    });
  });

  // Write request data
  postRequest.write(jsonPayload);
  postRequest.end();
}
const readPDFToJson = async () => {
  // URL trực tiếp của tệp PDF nguồn.
  // Bạn cũng có thể tải lên tệp của riêng bạn lên PDF.co và sử dụng nó như một URL. Kiểm tra các ví dụ "Upload File" để biết đoạn mã: https://github.com/bytescout/pdf-co-api-samples/tree/master/File%20Upload/
  const SourceFileUrl =
    "https://daa.ctu.edu.vn/images/upload/DaoTao/TN/2023/DSSVTN_dot1_lan2_2023_web.pdf";

  // Danh sách chỉ mục trang (hoặc phạm vi) để xử lý, để trống để xử lý tất cả các trang. Ví dụ: '0,2-5,7-'.
  const Pages = "";

  // Mật khẩu tài liệu PDF. Để trống nếu tài liệu không có mật khẩu.
  const Password = "";

  // Tên tệp JSON đích

  // Để chạy quá trình một cách bất đồng bộ
  const async = "true";

  // Chuẩn bị yêu cầu tới điểm cuối API `PDF To JSON`
  // Prepare request to `PDF To JSON` API endpoint
  var queryPath = `/v1/pdf/convert/to/json`;

  // JSON payload for api request
  var jsonPayload = JSON.stringify({
    name: path.basename(DestinationFile),
    password: Password,
    pages: Pages,
    url: SourceFileUrl,
    async: true,
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
          console.log(`Job #${data.jobId} has been created!`);
          // Process returned job
          checkIfJobIsCompleted(data.jobId, data.url);
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

const readFilePDF = async (linkPdf, namefile) => {
  // // The authentication key (API Key).
  // // Get your own by registering at https://app.pdf.co/documentation/api
  // const API_KEY =
  //   "tanghuynh09@gmail.com_3d6b624547ac7c0b9d5dfca437e9676accbbfa9dd86216040d9b9063c71a6d94f85eaa57";
  // // api key thay the: triuy2812@gmail.com_096a450f1089b9da89925c2a00a03f7666a8f21fa5c94a62c3004259302aed2dbc1a7e91
  // // jemcovintage@gmail.com_ec4734a32460f2fbe6410bae151cbfec23df6085402afd8d638e70c414f5e5e02eacf71f
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

export { readFilePDF, readPDFToJson };

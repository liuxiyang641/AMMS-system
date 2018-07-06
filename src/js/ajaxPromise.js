const ajaxPromise = (param) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      "type": param.type || "GET",
      "async": param.async || true,
      "url": param.url,
      "data": param.data || "",
      "xhrFields": param.xhrFields || {},
      "crossDomain": param.crossDomain || false,
      "success": res => {
          resolve(res);
       },
       "error": err => {
          reject(err);
       }
    });
  })
};

export default {
  ajaxPromise
}

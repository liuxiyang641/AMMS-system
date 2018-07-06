const ajaxPromise = (param) => {
  return new Promise((resolve, reject) => {
    var _param = {
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
    };
    if(param.contentType) _param.contentType = param.contentType;
    $.ajax(_param);
  })
};

export default {
  ajaxPromise
}

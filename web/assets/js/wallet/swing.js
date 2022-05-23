



async function fetchSwingData( params) {
    return request(
      "GET",
      `https://swap.dev.swing.xyz/v0/transfer/quote?${formatParams(params)}`
     );
  }
